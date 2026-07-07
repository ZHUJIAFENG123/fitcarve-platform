/**
 * 动作库肌肉名称 → body-muscles SVG ID 映射
 *
 * 动作库 (exercises_zh.json) 中的 targetMuscles / secondaryMuscles 使用中文名，
 * body-muscles 组件使用 SVG path ID（如 biceps-left, chest-upper-right）。
 * 本文件提供映射表和转换函数。
 */

// ============ 肌肉名称 → body-muscles ID 映射表 ============

export interface MuscleMapping {
  /** body-muscles SVG path ID 列表 */
  ids: string[]
  /** 中文显示名 */
  label: string
  /** 强度默认值（目标肌肉用高值，辅助肌肉用低值） */
  defaultIntensity: number
}

/**
 * 中文肌肉名 → body-muscles ID 映射
 * 覆盖动作库中所有出现的 targetMuscles 和 secondaryMuscles 值
 */
export const MUSCLE_NAME_MAP: Record<string, MuscleMapping> = {
  // ===== 目标肌肉 (targetMuscles) =====
  '胸肌': {
    ids: ['chest-upper-left', 'chest-upper-right', 'chest-lower-left', 'chest-lower-right'],
    label: '胸肌',
    defaultIntensity: 9
  },
  '肱二头肌': {
    ids: ['biceps-left', 'biceps-right'],
    label: '肱二头肌',
    defaultIntensity: 9
  },
  '肱三头肌': {
    ids: ['triceps-long-left', 'triceps-lateral-left', 'triceps-long-right', 'triceps-lateral-right'],
    label: '肱三头肌',
    defaultIntensity: 9
  },
  '腹肌': {
    ids: ['abs-upper-left', 'abs-upper-right', 'abs-lower-left', 'abs-lower-right'],
    label: '腹肌',
    defaultIntensity: 9
  },
  '臀肌': {
    ids: ['gluteus-maximus-left', 'gluteus-maximus-right', 'gluteus-medius-left', 'gluteus-medius-right'],
    label: '臀肌',
    defaultIntensity: 9
  },
  '三角肌': {
    ids: ['shoulder-front-left', 'shoulder-front-right', 'shoulder-side-left', 'shoulder-side-right', 'deltoid-rear-left', 'deltoid-rear-right'],
    label: '三角肌',
    defaultIntensity: 9
  },
  '背阔肌': {
    ids: ['lats-upper-left', 'lats-mid-left', 'lats-lower-left', 'lats-upper-right', 'lats-mid-right', 'lats-lower-right'],
    label: '背阔肌',
    defaultIntensity: 9
  },
  '上背部': {
    ids: ['traps-upper-left', 'traps-mid-left', 'traps-lower-left', 'traps-upper-right', 'traps-mid-right', 'traps-lower-right'],
    label: '上背部',
    defaultIntensity: 9
  },
  '小腿': {
    ids: ['calves-gastroc-medial-left', 'calves-gastroc-lateral-left', 'calves-soleus-left', 'calves-gastroc-medial-right', 'calves-gastroc-lateral-right', 'calves-soleus-right'],
    label: '小腿',
    defaultIntensity: 9
  },
  '股四头肌': {
    ids: ['quads-left', 'quads-right'],
    label: '股四头肌',
    defaultIntensity: 9
  },
  '前臂': {
    ids: ['forearm-left', 'forearm-right', 'forearm-flexors-left', 'forearm-extensors-left', 'forearm-flexors-right', 'forearm-extensors-right'],
    label: '前臂',
    defaultIntensity: 9
  },
  '腘绳肌': {
    ids: ['hamstrings-medial-left', 'hamstrings-lateral-left', 'hamstrings-medial-right', 'hamstrings-lateral-right'],
    label: '腘绳肌',
    defaultIntensity: 9
  },
  '脊柱': {
    ids: ['spine'],
    label: '脊柱',
    defaultIntensity: 9
  },
  '斜方肌': {
    ids: ['traps-upper-left', 'traps-mid-left', 'traps-lower-left', 'traps-upper-right', 'traps-mid-right', 'traps-lower-right'],
    label: '斜方肌',
    defaultIntensity: 9
  },
  '内收肌': {
    ids: ['adductors-left', 'adductors-right'],
    label: '内收肌',
    defaultIntensity: 9
  },
  '前锯肌': {
    ids: ['serratus-anterior-left', 'serratus-anterior-right'],
    label: '前锯肌',
    defaultIntensity: 9
  },
  '外展肌': {
    ids: ['gluteus-medius-left', 'gluteus-medius-right'],
    label: '外展肌',
    defaultIntensity: 9
  },
  '肩胛提肌': {
    ids: ['traps-upper-left', 'traps-upper-right'],
    label: '肩胛提肌',
    defaultIntensity: 9
  },
  'lats': {
    ids: ['lats-upper-left', 'lats-mid-left', 'lats-lower-left', 'lats-upper-right', 'lats-mid-right', 'lats-lower-right'],
    label: '背阔肌',
    defaultIntensity: 9
  },

  // ===== 次要肌肉 (secondaryMuscles) =====
  '肩部': {
    ids: ['shoulder-front-left', 'shoulder-front-right', 'shoulder-side-left', 'shoulder-side-right'],
    label: '肩部',
    defaultIntensity: 5
  },
  '核心': {
    ids: ['abs-upper-left', 'abs-upper-right', 'abs-lower-left', 'abs-lower-right'],
    label: '核心',
    defaultIntensity: 5
  },
  '下背部': {
    ids: ['lower-back-erectors-left', 'lower-back-ql-left', 'lower-back-erectors-right', 'lower-back-ql-right'],
    label: '下背部',
    defaultIntensity: 5
  },
  '腹斜肌': {
    ids: ['obliques-left', 'obliques-right'],
    label: '腹斜肌',
    defaultIntensity: 5
  },
  '髋屈肌': {
    ids: ['hip-flexor-left', 'hip-flexor-right'],
    label: '髋屈肌',
    defaultIntensity: 5
  },
  '菱形肌': {
    ids: ['traps-mid-left', 'traps-mid-right'],
    label: '菱形肌',
    defaultIntensity: 5
  },
  '后三角肌': {
    ids: ['deltoid-rear-left', 'deltoid-rear-right'],
    label: '后三角肌',
    defaultIntensity: 5
  },
  '肱肌': {
    ids: ['biceps-left', 'biceps-right'],
    label: '肱肌',
    defaultIntensity: 5
  },
  '背部': {
    ids: ['lats-upper-left', 'lats-mid-left', 'lats-lower-left', 'lats-upper-right', 'lats-mid-right', 'lats-lower-right'],
    label: '背部',
    defaultIntensity: 5
  },
  '胸部': {
    ids: ['chest-upper-left', 'chest-upper-right', 'chest-lower-left', 'chest-lower-right'],
    label: '胸部',
    defaultIntensity: 5
  },
  '脚踝': {
    ids: ['tibialis-anterior-left', 'tibialis-anterior-right'],
    label: '脚踝',
    defaultIntensity: 4
  },
  '双脚': {
    ids: ['foot-left', 'foot-right'],
    label: '双脚',
    defaultIntensity: 4
  },
  '肩袖': {
    ids: ['shoulder-front-left', 'shoulder-front-right', 'shoulder-side-left', 'shoulder-side-right'],
    label: '肩袖',
    defaultIntensity: 5
  },
  '手腕': {
    ids: ['forearm-left', 'forearm-right'],
    label: '手腕',
    defaultIntensity: 4
  },
  '踝关节稳定肌': {
    ids: ['tibialis-anterior-left', 'tibialis-anterior-right'],
    label: '踝关节稳定肌',
    defaultIntensity: 4
  },
  '上胸': {
    ids: ['chest-upper-left', 'chest-upper-right'],
    label: '上胸',
    defaultIntensity: 5
  },
  '腕伸肌': {
    ids: ['forearm-extensors-left', 'forearm-extensors-right'],
    label: '腕伸肌',
    defaultIntensity: 5
  },
  '胸锁乳突肌': {
    ids: ['neck-left', 'neck-right'],
    label: '胸锁乳突肌',
    defaultIntensity: 4
  },
  '双手': {
    ids: ['hand-left', 'hand-right'],
    label: '双手',
    defaultIntensity: 3
  },
  'biceps': {
    ids: ['biceps-left', 'biceps-right'],
    label: '肱二头肌',
    defaultIntensity: 5
  },
  'forearms': {
    ids: ['forearm-left', 'forearm-right', 'forearm-flexors-left', 'forearm-extensors-left', 'forearm-flexors-right', 'forearm-extensors-right'],
    label: '前臂',
    defaultIntensity: 5
  },
  '腹股沟': {
    ids: ['hip-flexor-left', 'hip-flexor-right'],
    label: '腹股沟',
    defaultIntensity: 4
  },
  '腕屈肌': {
    ids: ['forearm-flexors-left', 'forearm-flexors-right'],
    label: '腕屈肌',
    defaultIntensity: 5
  },
  '比目鱼肌': {
    ids: ['calves-soleus-left', 'calves-soleus-right'],
    label: '比目鱼肌',
    defaultIntensity: 5
  },
  '胫骨': {
    ids: ['tibialis-anterior-left', 'tibialis-anterior-right'],
    label: '胫骨',
    defaultIntensity: 5
  },
  '心血管系统': {
    ids: [],
    label: '心血管系统',
    defaultIntensity: 0
  }
}

// ============ body-muscles ID → 中文显示名 ============

export const BODY_MUSCLE_LABELS: Record<string, string> = {
  // 头颈
  'head': '头部', 'face': '面部', 'head-back': '头部(后)', 'nape': '后颈',
  'neck-left': '左颈', 'neck-right': '右颈',
  // 肩部
  'shoulder-front-left': '左前三角肌', 'shoulder-front-right': '右前三角肌',
  'shoulder-side-left': '左中三角肌', 'shoulder-side-right': '右中三角肌',
  'deltoid-rear-left': '左后三角肌', 'deltoid-rear-right': '右后三角肌',
  // 手臂
  'biceps-left': '左肱二头肌', 'biceps-right': '右肱二头肌',
  'triceps-long-left': '左肱三头肌(长头)', 'triceps-lateral-left': '左肱三头肌(外侧头)',
  'triceps-long-right': '右肱三头肌(长头)', 'triceps-lateral-right': '右肱三头肌(外侧头)',
  'forearm-left': '左前臂', 'forearm-right': '右前臂',
  'forearm-flexors-left': '左前臂屈肌', 'forearm-extensors-left': '左前臂伸肌',
  'forearm-flexors-right': '右前臂屈肌', 'forearm-extensors-right': '右前臂伸肌',
  'elbow-left': '左肘', 'elbow-right': '右肘',
  // 胸部
  'chest-upper-left': '左上胸肌', 'chest-upper-right': '右上胸肌',
  'chest-lower-left': '左下胸肌', 'chest-lower-right': '右下胸肌',
  // 背部
  'lats-upper-left': '左背阔肌(上)', 'lats-mid-left': '左背阔肌(中)', 'lats-lower-left': '左背阔肌(下)',
  'lats-upper-right': '右背阔肌(上)', 'lats-mid-right': '右背阔肌(中)', 'lats-lower-right': '右背阔肌(下)',
  'traps-upper-left': '左斜方肌(上)', 'traps-mid-left': '左斜方肌(中)', 'traps-lower-left': '左斜方肌(下)',
  'traps-upper-right': '右斜方肌(上)', 'traps-mid-right': '右斜方肌(中)', 'traps-lower-right': '右斜方肌(下)',
  'lower-back-erectors-left': '左竖脊肌', 'lower-back-erectors-right': '右竖脊肌',
  'lower-back-ql-left': '左腰方肌', 'lower-back-ql-right': '右腰方肌',
  'spine': '脊柱',
  // 腹部
  'abs-upper-left': '左上腹肌', 'abs-upper-right': '右上腹肌',
  'abs-lower-left': '左下腹肌', 'abs-lower-right': '右下腹肌',
  'serratus-anterior-left': '左前锯肌', 'serratus-anterior-right': '右前锯肌',
  'obliques-left': '左腹斜肌', 'obliques-right': '右腹斜肌',
  // 臀部
  'gluteus-maximus-left': '左臀大肌', 'gluteus-maximus-right': '右臀大肌',
  'gluteus-medius-left': '左臀中肌', 'gluteus-medius-right': '右臀中肌',
  // 腿部
  'quads-left': '左股四头肌', 'quads-right': '右股四头肌',
  'hamstrings-medial-left': '左腘绳肌(内侧)', 'hamstrings-lateral-left': '左腘绳肌(外侧)',
  'hamstrings-medial-right': '右腘绳肌(内侧)', 'hamstrings-lateral-right': '右腘绳肌(外侧)',
  'adductors-left': '左内收肌', 'adductors-right': '右内收肌',
  'tibialis-anterior-left': '左胫骨前肌', 'tibialis-anterior-right': '右胫骨前肌',
  'calves-gastroc-medial-left': '左腓肠肌(内侧)', 'calves-gastroc-lateral-left': '左腓肠肌(外侧)',
  'calves-soleus-left': '左比目鱼肌',
  'calves-gastroc-medial-right': '右腓肠肌(内侧)', 'calves-gastroc-lateral-right': '右腓肠肌(外侧)',
  'calves-soleus-right': '右比目鱼肌',
  'hip-flexor-left': '左髋屈肌', 'hip-flexor-right': '右髋屈肌',
  'knee-left': '左膝', 'knee-right': '右膝',
  'knee-back-left': '左膝(后)', 'knee-back-right': '右膝(后)',
  // 手脚
  'hand-left': '左手', 'hand-right': '右手',
  'hand-back-left': '左手(背)', 'hand-back-right': '右手(背)',
  'foot-left': '左脚', 'foot-right': '右脚',
  'foot-back-left': '左脚(背)', 'foot-back-right': '右脚(背)'
}

// ============ 转换函数 ============

export interface BodyMuscleState {
  intensity: number
  selected: boolean
}

export interface ActiveMuscle {
  id: string
  name: string
  intensity: number
}

/**
 * 将动作的 targetMuscles 和 secondaryMuscles 转换为 body-muscles 的 bodyState
 * @param targetMuscles 目标肌肉名数组（如 ['胸肌', '肱三头肌']）
 * @param secondaryMuscles 次要肌肉名数组
 * @param targetMusclesStr 如果传入的是逗号分隔字符串，先拆分
 * @returns { bodyState, activeMuscles }
 */
export function buildMuscleState(
  targetMuscles: string[] | string | undefined,
  secondaryMuscles: string[] | string | undefined
): { bodyState: Record<string, BodyMuscleState>; activeMuscles: ActiveMuscle[] } {
  const bodyState: Record<string, BodyMuscleState> = {}
  const activeMuscles: ActiveMuscle[] = []
  const seen = new Set<string>()

  // 统一转为数组
  const targets = normalizeMuscleList(targetMuscles)
  const secondaries = normalizeMuscleList(secondaryMuscles)

  // 目标肌肉 → 高强度
  for (const name of targets) {
    const mapping = MUSCLE_NAME_MAP[name.trim()]
    if (!mapping) continue
    for (const id of mapping.ids) {
      if (!seen.has(id)) {
        seen.add(id)
        bodyState[id] = { intensity: mapping.defaultIntensity, selected: true }
        activeMuscles.push({
          id,
          name: BODY_MUSCLE_LABELS[id] || id,
          intensity: mapping.defaultIntensity
        })
      }
    }
  }

  // 次要肌肉 → 较低强度（不覆盖已有更高强度）
  for (const name of secondaries) {
    const mapping = MUSCLE_NAME_MAP[name.trim()]
    if (!mapping) continue
    for (const id of mapping.ids) {
      if (!seen.has(id)) {
        seen.add(id)
        bodyState[id] = { intensity: mapping.defaultIntensity, selected: true }
        activeMuscles.push({
          id,
          name: BODY_MUSCLE_LABELS[id] || id,
          intensity: mapping.defaultIntensity
        })
      }
    }
  }

  return { bodyState, activeMuscles }
}

/** 将字符串或数组统一为去重后的数组 */
function normalizeMuscleList(input: string[] | string | undefined): string[] {
  if (!input) return []
  if (Array.isArray(input)) return input
  return input.split(',').map(s => s.trim()).filter(Boolean)
}

/** 根据 body-muscles ID 获取中文显示名 */
export function getMuscleLabel(id: string): string {
  return BODY_MUSCLE_LABELS[id] || id
}
