/**
 * 饮食方案种子数据 - 8套
 * 目标: build_muscle(增肌), lose_fat(减脂), maintenance(维持)
 */

const dietPlans = [
  // ========== 增肌方案 ==========
  {
    id: 1,
    title: "增肌高蛋白2500kcal方案",
    description: "适合体重60-70kg的初级增肌者，蛋白质充足支持肌肉修复与生长，碳水提供训练能量，脂肪保证激素合成。配合力量训练使用效果更佳。",
    goal: "build_muscle",
    daily_calories: 2500,
    protein_g: 160,
    carbs_g: 280,
    fat_g: 80,
    author: "营养师小王",
    meals: [
      {
        meal: "早餐",
        time: "7:30",
        recipes: [
          { name: "燕麦牛奶粥", ingredients: "即食燕麦60g + 全脂牛奶250ml + 蓝莓40g + 蜂蜜10g", calories: 480, protein: 18, carbs: 72, fat: 12 },
          { name: "水煮蛋×3", ingredients: "鸡蛋3个（去壳约150g）", calories: 210, protein: 18, carbs: 3, fat: 15 }
        ]
      },
      {
        meal: "午餐",
        time: "12:00",
        recipes: [
          { name: "鸡胸肉糙米饭", ingredients: "鸡胸肉180g + 糙米150g + 西兰花150g + 橄榄油10ml", calories: 620, protein: 52, carbs: 68, fat: 14 },
          { name: "西红柿蛋汤", ingredients: "西红柿150g + 鸡蛋1个 + 香油3ml", calories: 110, protein: 7, carbs: 8, fat: 6 }
        ]
      },
      {
        meal: "加餐",
        time: "15:30",
        recipes: [
          { name: "蛋白奶昔", ingredients: "乳清蛋白粉25g + 香蕉1根(约120g) + 脱脂牛奶200ml", calories: 340, protein: 30, carbs: 42, fat: 3 },
          { name: "坚果混合", ingredients: "坚果混合20g", calories: 120, protein: 4, carbs: 4, fat: 11 }
        ]
      },
      {
        meal: "晚餐",
        time: "18:30",
        recipes: [
          { name: "牛腱子红薯餐", ingredients: "牛腱子180g + 红薯250g + 生菜100g + 橄榄油8ml", calories: 620, protein: 45, carbs: 83, fat: 19 }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "增肌高蛋白2800kcal方案",
    description: "适合体重70-80kg的中级增肌者，总热量和蛋白质进一步提升，满足高强度训练后的恢复需求。训练日严格执行，休息日可适当减少碳水。",
    goal: "build_muscle",
    daily_calories: 2800,
    protein_g: 180,
    carbs_g: 320,
    fat_g: 70,
    author: "营养师小王",
    meals: [
      {
        meal: "早餐",
        time: "7:00",
        recipes: [
          { name: "全麦鸡蛋三明治", ingredients: "全麦面包3片(约90g) + 鸡蛋2个 + 奶酪片1片 + 生菜50g", calories: 520, protein: 26, carbs: 58, fat: 18 },
          { name: "全脂牛奶", ingredients: "全脂牛奶300ml", calories: 195, protein: 10, carbs: 14, fat: 11 }
        ]
      },
      {
        meal: "午餐",
        time: "12:00",
        recipes: [
          { name: "鸡腿肉荞麦面", ingredients: "鸡腿肉(去皮)200g + 荞麦面(干)120g + 西葫芦150g + 橄榄油10ml", calories: 780, protein: 52, carbs: 92, fat: 20 },
          { name: "酸奶", ingredients: "希腊酸奶150g + 蓝莓50g", calories: 180, protein: 16, carbs: 18, fat: 6 }
        ]
      },
      {
        meal: "加餐",
        time: "16:00",
        recipes: [
          { name: "增肌奶昔", ingredients: "乳清蛋白粉30g + 燕麦40g + 全脂牛奶250ml + 花生酱10g", calories: 480, protein: 35, carbs: 48, fat: 14 },
          { name: "香蕉", ingredients: "香蕉1根(约120g)", calories: 105, protein: 1, carbs: 27, fat: 0 }
        ]
      },
      {
        meal: "晚餐",
        time: "19:00",
        recipes: [
          { name: "三文鱼糙米饭", ingredients: "三文鱼180g + 糙米180g + 芦笋150g + 橄榄油10ml", calories: 740, protein: 42, carbs: 68, fat: 20 },
          { name: "紫菜蛋花汤", ingredients: "紫菜10g + 鸡蛋1个 + 香油3ml", calories: 80, protein: 8, carbs: 4, fat: 4 }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "增肌高蛋白3200kcal方案",
    description: "适合体重80kg以上的高级增肌者或高强度训练日。总热量充裕，蛋白质达到最大化合成阈值，碳水充足保证糖原储备，适合大训练量周期。",
    goal: "build_muscle",
    daily_calories: 3200,
    protein_g: 200,
    carbs_g: 380,
    fat_g: 85,
    author: "营养师小王",
    meals: [
      {
        meal: "早餐",
        time: "7:00",
        recipes: [
          { name: "燕麦鸡蛋碗", ingredients: "即食燕麦80g + 全脂牛奶300ml + 鸡蛋3个 + 牛油果半个(约50g) + 蜂蜜15g", calories: 820, protein: 32, carbs: 82, fat: 34 },
          { name: "橙子", ingredients: "橙子1个(约150g)", calories: 70, protein: 1, carbs: 18, fat: 0 }
        ]
      },
      {
        meal: "午餐",
        time: "12:00",
        recipes: [
          { name: "牛里脊土豆餐", ingredients: "牛里脊200g + 土豆300g + 西兰花150g + 橄榄油12ml + 酱油10ml", calories: 920, protein: 52, carbs: 98, fat: 28 },
          { name: "米饭", ingredients: "白米饭150g", calories: 175, protein: 4, carbs: 39, fat: 0 }
        ]
      },
      {
        meal: "加餐",
        time: "15:30",
        recipes: [
          { name: "大份蛋白奶昔", ingredients: "乳清蛋白粉35g + 燕麦50g + 全脂牛奶300ml + 香蕉1根 + 花生酱15g", calories: 650, protein: 42, carbs: 72, fat: 18 },
          { name: "奶酪片", ingredients: "奶酪片2片(约40g)", calories: 120, protein: 8, carbs: 1, fat: 9 }
        ]
      },
      {
        meal: "晚餐",
        time: "19:00",
        recipes: [
          { name: "鸡胸肉意大利面", ingredients: "鸡胸肉220g + 意大利面(干)120g + 西红柿200g + 橄榄油15ml + 洋葱50g", calories: 880, protein: 62, carbs: 95, fat: 28 },
          { name: "酸奶", ingredients: "希腊酸奶200g", calories: 195, protein: 20, carbs: 7, fat: 10 }
        ]
      }
    ]
  },

  // ========== 减脂方案 ==========
  {
    id: 4,
    title: "减脂低碳水1500kcal方案",
    description: "适合小基数体重或减脂冲刺期使用。严格控制总热量和碳水摄入，提高蛋白质比例防止肌肉流失。建议配合每周4-5次训练。初期可能有轻微饥饿感，可多喝水缓解。",
    goal: "lose_fat",
    daily_calories: 1500,
    protein_g: 120,
    carbs_g: 120,
    fat_g: 50,
    author: "营养师小李",
    meals: [
      {
        meal: "早餐",
        time: "7:30",
        recipes: [
          { name: "水煮蛋+脱脂奶", ingredients: "鸡蛋2个 + 脱脂牛奶250ml", calories: 240, protein: 19, carbs: 13, fat: 12 },
          { name: "全麦面包", ingredients: "全麦面包1片(约30g)", calories: 75, protein: 4, carbs: 12, fat: 1 }
        ]
      },
      {
        meal: "午餐",
        time: "12:00",
        recipes: [
          { name: "鸡胸肉蔬菜沙拉", ingredients: "鸡胸肉150g + 生菜100g + 黄瓜100g + 西红柿100g + 橄榄油8ml + 沙拉酱5g", calories: 340, protein: 47, carbs: 12, fat: 14 },
          { name: "红薯", ingredients: "红薯150g", calories: 130, protein: 2, carbs: 30, fat: 0 }
        ]
      },
      {
        meal: "加餐",
        time: "15:30",
        recipes: [
          { name: "蛋白粉", ingredients: "乳清蛋白粉25g + 水300ml", calories: 100, protein: 20, carbs: 2, fat: 1 }
        ]
      },
      {
        meal: "晚餐",
        time: "18:30",
        recipes: [
          { name: "清蒸鱼+蔬菜", ingredients: "鲈鱼150g + 西兰花150g + 胡萝卜50g + 橄榄油5ml + 酱油10ml", calories: 280, protein: 30, carbs: 14, fat: 9 },
          { name: "小米粥", ingredients: "小米粥200g", calories: 95, protein: 3, carbs: 19, fat: 1 }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "减脂均衡1800kcal方案",
    description: "适合大多数健身者的日常减脂方案，热量缺口适中，营养均衡不易暴食。蛋白质充足维持肌肉量，适量碳水保证训练质量。是可持续性最强的减脂饮食方案。",
    goal: "lose_fat",
    daily_calories: 1800,
    protein_g: 140,
    carbs_g: 160,
    fat_g: 55,
    author: "营养师小李",
    meals: [
      {
        meal: "早餐",
        time: "7:30",
        recipes: [
          { name: "燕麦鸡蛋早餐", ingredients: "即食燕麦50g + 脱脂牛奶200ml + 鸡蛋2个 + 蓝莓30g", calories: 420, protein: 24, carbs: 48, fat: 12 },
          { name: "全麦面包", ingredients: "全麦面包1片(约30g)", calories: 75, protein: 4, carbs: 12, fat: 1 }
        ]
      },
      {
        meal: "午餐",
        time: "12:00",
        recipes: [
          { name: "鸡胸肉杂粮饭", ingredients: "鸡胸肉180g + 糙米100g + 西兰花150g + 橄榄油10ml", calories: 520, protein: 52, carbs: 50, fat: 14 },
          { name: "西红柿蛋汤", ingredients: "西红柿100g + 鸡蛋1个", calories: 90, protein: 7, carbs: 5, fat: 5 }
        ]
      },
      {
        meal: "加餐",
        time: "15:30",
        recipes: [
          { name: "蛋白奶昔", ingredients: "乳清蛋白粉25g + 脱脂牛奶200ml", calories: 170, protein: 28, carbs: 10, fat: 1 },
          { name: "苹果", ingredients: "苹果1个(约200g)", calories: 105, protein: 1, carbs: 28, fat: 0 }
        ]
      },
      {
        meal: "晚餐",
        time: "18:30",
        recipes: [
          { name: "虾仁荞麦面", ingredients: "虾仁150g + 荞麦面(干)80g + 西葫芦150g + 橄榄油8ml + 酱油10ml", calories: 430, protein: 26, carbs: 68, fat: 10 }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "减脂维持2000kcal方案",
    description: "适合体重较大或训练量较高的减脂者。热量缺口较小但可持续，不会因为过度饥饿影响训练表现和生活质量。适合长期执行，每月减脂2-3kg的健康速度。",
    goal: "lose_fat",
    daily_calories: 2000,
    protein_g: 150,
    carbs_g: 190,
    fat_g: 60,
    author: "营养师小李",
    meals: [
      {
        meal: "早餐",
        time: "7:30",
        recipes: [
          { name: "燕麦牛奶鸡蛋", ingredients: "即食燕麦60g + 全脂牛奶250ml + 鸡蛋2个 + 香蕉半根(约60g)", calories: 520, protein: 26, carbs: 60, fat: 16 },
          { name: "全麦面包", ingredients: "全麦面包1片(约30g) + 花生酱5g", calories: 120, protein: 5, carbs: 13, fat: 5 }
        ]
      },
      {
        meal: "午餐",
        time: "12:00",
        recipes: [
          { name: "鸡腿糙米饭", ingredients: "鸡腿肉(去皮)180g + 糙米120g + 花菜150g + 橄榄油10ml", calories: 580, protein: 48, carbs: 60, fat: 18 },
          { name: "紫菜蛋花汤", ingredients: "紫菜5g + 鸡蛋1个 + 香油2ml", calories: 80, protein: 7, carbs: 2, fat: 4 }
        ]
      },
      {
        meal: "加餐",
        time: "16:00",
        recipes: [
          { name: "蛋白奶昔", ingredients: "乳清蛋白粉25g + 脱脂牛奶200ml", calories: 170, protein: 28, carbs: 10, fat: 1 },
          { name: "猕猴桃", ingredients: "猕猴桃1个(约100g)", calories: 60, protein: 1, carbs: 15, fat: 0 }
        ]
      },
      {
        meal: "晚餐",
        time: "18:30",
        recipes: [
          { name: "清蒸鱼配薯", ingredients: "鲈鱼200g + 土豆200g + 生菜100g + 橄榄油8ml + 酱油10ml", calories: 470, protein: 38, carbs: 38, fat: 16 }
        ]
      }
    ]
  },

  // ========== 维持方案 ==========
  {
    id: 7,
    title: "维持体重2000kcal方案",
    description: "适合已达到目标体重、希望长期维持的健身者。营养均衡不极端，三大营养素比例合理，既可维持训练表现又可保持身材。是健康生活方式的饮食模板。",
    goal: "maintenance",
    daily_calories: 2000,
    protein_g: 130,
    carbs_g: 220,
    fat_g: 55,
    author: "营养师小王",
    meals: [
      {
        meal: "早餐",
        time: "7:30",
        recipes: [
          { name: "燕麦鸡蛋早餐碗", ingredients: "即食燕麦50g + 全脂牛奶250ml + 鸡蛋2个 + 蓝莓30g + 蜂蜜10g", calories: 480, protein: 24, carbs: 60, fat: 14 },
          { name: "全麦面包", ingredients: "全麦面包1片(约30g)", calories: 75, protein: 4, carbs: 12, fat: 1 }
        ]
      },
      {
        meal: "午餐",
        time: "12:00",
        recipes: [
          { name: "瘦肉蔬菜饭", ingredients: "猪瘦肉150g + 白米饭150g + 西兰花150g + 胡萝卜50g + 橄榄油10ml", calories: 650, protein: 38, carbs: 70, fat: 18 },
          { name: "西红柿蛋汤", ingredients: "西红柿100g + 鸡蛋1个", calories: 90, protein: 7, carbs: 5, fat: 5 }
        ]
      },
      {
        meal: "加餐",
        time: "15:30",
        recipes: [
          { name: "酸奶水果杯", ingredients: "希腊酸奶150g + 香蕉半根(约60g) + 蓝莓20g", calories: 200, protein: 16, carbs: 22, fat: 6 }
        ]
      },
      {
        meal: "晚餐",
        time: "18:30",
        recipes: [
          { name: "鸡胸肉红薯餐", ingredients: "鸡胸肉160g + 红薯200g + 芦笋100g + 橄榄油10ml + 酱油10ml", calories: 505, protein: 42, carbs: 51, fat: 11 }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "维持体重2200kcal方案",
    description: "适合体重70kg左右、训练量中等的维持期健身者。比基础维持方案多200kcal，可支持更高频率的训练而不至于减脂或增脂。适合作为日常饮食基准灵活调整。",
    goal: "maintenance",
    daily_calories: 2200,
    protein_g: 140,
    carbs_g: 250,
    fat_g: 60,
    author: "营养师小王",
    meals: [
      {
        meal: "早餐",
        time: "7:00",
        recipes: [
          { name: "燕麦牛奶鸡蛋", ingredients: "即食燕麦60g + 全脂牛奶250ml + 鸡蛋2个 + 牛油果40g + 蜂蜜10g", calories: 560, protein: 26, carbs: 58, fat: 22 },
          { name: "全麦面包", ingredients: "全麦面包1片(约30g) + 花生酱5g", calories: 120, protein: 5, carbs: 13, fat: 5 }
        ]
      },
      {
        meal: "午餐",
        time: "12:00",
        recipes: [
          { name: "牛肉土豆饭", ingredients: "牛里脊160g + 土豆250g + 西兰花150g + 橄榄油12ml + 酱油10ml", calories: 680, protein: 40, carbs: 78, fat: 20 },
          { name: "米饭", ingredients: "白米饭100g", calories: 115, protein: 3, carbs: 26, fat: 0 }
        ]
      },
      {
        meal: "加餐",
        time: "16:00",
        recipes: [
          { name: "蛋白奶昔", ingredients: "乳清蛋白粉25g + 脱脂牛奶200ml + 香蕉半根(约60g)", calories: 250, protein: 29, carbs: 24, fat: 2 },
          { name: "坚果", ingredients: "坚果混合15g", calories: 90, protein: 3, carbs: 3, fat: 8 }
        ]
      },
      {
        meal: "晚餐",
        time: "19:00",
        recipes: [
          { name: "鸡腿杂粮餐", ingredients: "鸡腿肉(去皮)180g + 糙米100g + 红薯100g + 西葫芦150g + 橄榄油10ml", calories: 620, protein: 42, carbs: 68, fat: 16 },
          { name: "酸奶", ingredients: "希腊酸奶100g", calories: 100, protein: 10, carbs: 4, fat: 5 }
        ]
      }
    ]
  }
];

module.exports = dietPlans;
