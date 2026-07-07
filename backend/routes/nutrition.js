const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// 简单内存缓存（5分钟过期）
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() - item.time > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

function setCached(key, data) {
  cache.set(key, { data, time: Date.now() });
  if (cache.size > 100) {
    const now = Date.now();
    for (const [k, v] of cache) {
      if (now - v.time > CACHE_TTL) cache.delete(k);
    }
  }
}

// 带超时的 fetch
function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('请求超时')), timeoutMs)
    )
  ]);
}

// 将本地食物库数据转换为与 Open Food Facts 兼容的格式
function formatLocalFood(food) {
  return {
    code: `local_${food.id}`,
    product_name: food.name,
    brands: '薄荷食物库',
    quantity: '100g',
    image_url: food.image_url || '',
    image_front_small_url: food.image_url || '',
    categories: food.category,
    category_name: food.category_name || '',
    boohee_id: food.boohee_id || '',
    nutriments: {
      'energy-kcal_100g': food.calories_per_100g,
      proteins_100g: food.protein_per_100g,
      carbohydrates_100g: food.carbs_per_100g,
      fat_100g: food.fat_per_100g,
      fiber_100g: food.fiber_per_100g,
      vitamin_a_100g: food.vitamin_a,
      vitamin_c_100g: food.vitamin_c,
      vitamin_e_100g: food.vitamin_e,
      cholesterol_100g: food.cholesterol,
      calcium_100g: food.calcium,
      iron_100g: food.iron,
      sodium_100g: food.sodium,
      potassium_100g: food.potassium,
      phosphorus_100g: food.phosphorus,
      magnesium_100g: food.magnesium,
      zinc_100g: food.zinc,
      selenium_100g: food.selenium,
    },
    serving_units: food.serving_units ? JSON.parse(food.serving_units) : null,
    _source: 'local'
  };
}

// GET /api/nutrition/search?q=xxx&limit=24&category=xxx
router.get('/search', async (req, res) => {
  try {
    const { q, limit = 24, category } = req.query;
    if (!q || !q.trim()) {
      return res.json({ products: [], count: 0, source: 'local' });
    }

    const cacheKey = `search:${q}:${limit}:${category}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);

    let products = [];
    let source = 'local';

    // 优先搜索本地食物库（薄荷网数据，中文更精准）
    try {
      const localFoods = await Food.searchWithCategory(q, category, parseInt(limit));
      products = localFoods.map(formatLocalFood);
      source = 'local';
    } catch (localErr) {
      console.error('本地食物库搜索失败:', localErr.message);
    }

    // 如果本地结果不足，补充 Open Food Facts
    if (products.length < parseInt(limit)) {
      try {
        const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&search_simple=1&action=process&json=1&page=1&page_size=${parseInt(limit) - products.length}`;
        const response = await fetchWithTimeout(url, {}, 5000);
        if (response.ok) {
          const data = await response.json();
          const extProducts = (data.products || []).map(p => ({
            code: p.code,
            product_name: p.product_name,
            brands: p.brands,
            quantity: p.quantity,
            image_url: p.image_url || p.image_front_small_url,
            image_front_small_url: p.image_front_small_url,
            categories: p.categories,
            nutriments: p.nutriments ? {
              'energy-kcal_100g': p.nutriments['energy-kcal_100g'],
              proteins_100g: p.nutriments.proteins_100g,
              carbohydrates_100g: p.nutriments.carbohydrates_100g,
              fat_100g: p.nutriments.fat_100g,
              fiber_100g: p.nutriments.fiber_100g,
            } : null,
            _source: 'openfoodfacts'
          }));
          products = [...products, ...extProducts];
          if (extProducts.length > 0) source = 'mixed';
        }
      } catch (extErr) {
        console.log('Open Food Facts 不可达:', extErr.message);
      }
    }

    const result = { products, count: products.length, source };
    setCached(cacheKey, result);
    res.json(result);
  } catch (err) {
    console.error('Nutrition search error:', err.message);
    res.status(500).json({ message: '营养数据搜索失败', error: err.message });
  }
});

// GET /api/nutrition/categories
router.get('/categories', async (req, res) => {
  try {
    const cats = await Food.getCategoriesWithCount();
    res.json(cats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/nutrition/stats
router.get('/stats', async (req, res) => {
  try {
    const total = await Food.getTotalCount();
    const cats = await Food.getCategoriesWithCount();
    res.json({ total, categories: cats.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '服务器内部错误' });
  }
});

// GET /api/nutrition/barcode/:code
router.get('/barcode/:code', async (req, res) => {
  try {
    const { code } = req.params;
    if (!code || !/^\d{8,13}$/.test(code)) {
      return res.status(400).json({ message: '条形码格式不正确，应为8-13位数字' });
    }

    const cacheKey = `barcode:${code}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);

    try {
      const url = `https://world.openfoodfacts.org/api/v2/product/${code}.json`;
      const response = await fetchWithTimeout(url, {}, 5000);
      const data = await response.json();

      if (data.status === 0 || !data.product) {
        return res.json({ status: 0, message: '未找到该条形码对应的产品' });
      }

      const product = {
        code: data.product.code,
        product_name: data.product.product_name,
        brands: data.product.brands,
        quantity: data.product.quantity,
        image_url: data.product.image_url,
        categories: data.product.categories,
        ingredients_text: data.product.ingredients_text,
        nutriments: data.product.nutriments ? {
          'energy-kcal_100g': data.product.nutriments['energy-kcal_100g'],
          proteins_100g: data.product.nutriments.proteins_100g,
          carbohydrates_100g: data.product.nutriments.carbohydrates_100g,
          fat_100g: data.product.nutriments.fat_100g,
          fiber_100g: data.product.nutriments.fiber_100g,
          sugars_100g: data.product.nutriments.sugars_100g,
          salt_100g: data.product.nutriments.salt_100g,
          sodium_100g: data.product.nutriments.sodium_100g,
        } : null,
        _source: 'openfoodfacts'
      };

      const result = { status: 1, product };
      setCached(cacheKey, result);
      res.json(result);
    } catch (extErr) {
      console.log('Open Food Facts 条形码查询不可达:', extErr.message);
      res.json({
        status: 0,
        message: '在线条形码查询服务暂不可用，请尝试使用关键词搜索',
        _error: extErr.message
      });
    }
  } catch (err) {
    console.error('Barcode lookup error:', err.message);
    res.status(500).json({ message: '条形码查询失败', error: err.message });
  }
});

module.exports = router;
