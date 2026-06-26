/**
 * 健身资讯网站 - 完整种子数据入口
 * 
 * 数据汇总:
 * - news: 12篇资讯 (knowledge×2, nutrition×2, recovery×4, equipment×4)
 * - exercises: 60个动作 (chest×8, back×8, legs×10, shoulders×8, arms×8, core×8, full_body×10)
 * - foods: 120种食物 (staple×20, meat×20, vegetable×25, fruit×15, dairy×10, snack×10, drink×10, condiment×10)
 * - training_plans: 12套训练计划 (增肌×3, 减脂×3, 耐力×2, 柔韧×2, 综合×2)
 * - diet_plans: 8套饮食方案 (增肌×3, 减脂×3, 维持×2)
 */

const news = require('./news');
const exercises = require('./exercises');
const foods = require('./foods');
const trainingPlans = require('./training_plans');
const dietPlans = require('./diet_plans');

// 统计数据
const stats = {
  news: { count: news.length, categories: {} },
  exercises: { count: exercises.length, muscleGroups: {} },
  foods: { count: foods.length, categories: {} },
  trainingPlans: { count: trainingPlans.length, goals: {} },
  dietPlans: { count: dietPlans.length, goals: {} }
};

// 统计资讯分类
news.forEach(item => {
  stats.news.categories[item.category] = (stats.news.categories[item.category] || 0) + 1;
});

// 统计动作肌群
exercises.forEach(item => {
  stats.exercises.muscleGroups[item.muscle_group] = (stats.exercises.muscleGroups[item.muscle_group] || 0) + 1;
});

// 统计食物分类
foods.forEach(item => {
  stats.foods.categories[item.category] = (stats.foods.categories[item.category] || 0) + 1;
});

// 统计训练计划目标
trainingPlans.forEach(item => {
  stats.trainingPlans.goals[item.goal] = (stats.trainingPlans.goals[item.goal] || 0) + 1;
});

// 统计饮食方案目标
dietPlans.forEach(item => {
  stats.dietPlans.goals[item.goal] = (stats.dietPlans.goals[item.goal] || 0) + 1;
});

module.exports = {
  news,
  exercises,
  foods,
  trainingPlans,
  dietPlans,
  stats
};
