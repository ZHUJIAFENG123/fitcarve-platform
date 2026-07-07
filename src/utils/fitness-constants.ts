/**
 * 健身模块共享常量
 * 统一维护训练目标、难度、肌群、分类、器材等映射表
 */

// ===== 训练目标 =====
export const GOAL_MAP: Record<string, string> = {
  build_muscle: '增肌',
  lose_fat: '减脂',
  endurance: '耐力',
  flexibility: '柔韧',
  general: '综合'
}

export const GOALS = Object.entries(GOAL_MAP).map(([value, label]) => ({ value, label }))

// ===== 难度等级 =====
export const LEVEL_MAP: Record<string, string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级'
}

export const LEVELS = Object.entries(LEVEL_MAP).map(([value, label]) => ({ value, label }))

// ===== 肌群 =====
export const MUSCLE_MAP: Record<string, string> = {
  chest: '胸部',
  back: '背部',
  legs: '腿部',
  shoulders: '肩部',
  arms: '手臂',
  core: '核心',
  full_body: '全身'
}

export const MUSCLE_DISPLAY: Record<string, { label: string; color: string; order: number }> = {
  chest:      { label: '胸部', color: '#E53E3E', order: 1 },
  back:       { label: '背部', color: '#3182CE', order: 2 },
  legs:       { label: '腿部', color: '#38A169', order: 3 },
  shoulders:  { label: '肩部', color: '#D69E2E', order: 4 },
  arms:       { label: '手臂', color: '#805AD5', order: 5 },
  core:       { label: '核心', color: '#00B5D8', order: 6 },
  full_body:  { label: '全身', color: '#4A5568', order: 7 }
}

// ===== 训练分类 =====
export const FITNESS_CATEGORY_MAP: Record<string, string> = {
  strength: '力量',
  cardio: '有氧',
  flexibility: '柔韧'
}

// ===== 器材中英映射 =====
export const EQUIP_MAP: Record<string, string> = {
  'body weight': '自重',
  barbell: '杠铃',
  dumbbell: '哑铃',
  cable: '绳索',
  machine: '器械',
  'resistance band': '弹力带',
  band: '弹力带',
  kettlebell: '壶铃',
  'medicine ball': '药球',
  'stability ball': '健身球',
  assisted: '辅助',
  'ez barbell': 'EZ杠',
  'olympic barbell': '奥杠',
  'trap bar': '六角杠',
  'bosu ball': 'Bosu球',
  roller: '泡沫轴',
  rope: '绳索',
  tire: '轮胎',
  sled: '雪橇',
  hammer: '战锤',
  weighted: '负重',
  'leverage machine': '杠杆器械',
  'stationary bike': '动感单车',
  'elliptical machine': '椭圆机',
  'stepmill machine': '楼梯机',
  'skierg machine': '滑雪机',
  'wheel roller': '健腹轮',
  '绳索机': '绳索机',
  '双杠': '双杠',
  '器械': '器械',
  '哑铃': '哑铃',
  '杠铃': '杠铃',
  '自重': '自重',
  '弹力带': '弹力带',
  '壶铃': '壶铃',
  '健身球': '健身球',
  '战绳': '战绳',
  'trx': 'TRX',
  '泡沫轴': '泡沫轴',
  '药球': '药球',
  '引体向上器': '引体向上器',
  '腹肌轮': '腹肌轮',
  '登山者': '登山者',
  '跳箱': '跳箱',
  '哑铃,杠铃': '哑铃/杠铃',
  '杠铃,哑铃': '杠铃/哑铃'
}
