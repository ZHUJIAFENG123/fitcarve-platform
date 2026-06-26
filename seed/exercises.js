/**
 * 动作库种子数据 - 60个
 * 肌群: chest, back, legs, shoulders, arms, core, full_body
 * 分类: strength, cardio, flexibility
 * 难度: beginner, intermediate, advanced
 */

const exercises = [
  // ========== 胸 (chest) - 8个 ==========
  {
    id: 1, name: "杠铃卧推", category: "strength", muscle_group: "chest",
    equipment: "杠铃", difficulty: "intermediate",
    instructions: "仰卧于平板凳，双脚踩实地面，肩胛骨收紧下沉。双手握距略宽于肩，将杠铃从架子上取下，缓慢下放至胸部中下部，然后推起至手臂伸直。",
    tips: "手肘与身体呈45-60°，避免肩部过度外展；下放时控制离心2-3秒；始终保持肩胛骨后缩下沉。",
    calories_per_30min: 180
  },
  {
    id: 2, name: "哑铃飞鸟", category: "strength", muscle_group: "chest",
    equipment: "哑铃", difficulty: "intermediate",
    instructions: "仰卧于平板凳，双手持哑铃伸直举于胸部上方，掌心相对。肘关节微屈，像拥抱大树一样向两侧打开，感受胸肌拉伸，然后收缩胸肌将哑铃合拢。",
    tips: "肘关节保持固定微屈角度，不要完全伸直；动作底部感受胸肌拉伸但不超过肩关节舒适范围。",
    calories_per_30min: 150
  },
  {
    id: 3, name: "绳索夹胸", category: "strength", muscle_group: "chest",
    equipment: "绳索机", difficulty: "intermediate",
    instructions: "站在绳索机中间，双手握住D型把手，肘关节微屈。从身体两侧向前合拢双手，在体前交叉或接近交叉，感受胸肌收缩顶峰。",
    tips: "身体略微前倾，保持核心收紧；顶峰收缩保持1-2秒；选择适当重量确保能控制动作。",
    calories_per_30min: 140
  },
  {
    id: 4, name: "俯卧撑", category: "strength", muscle_group: "chest",
    equipment: "自重", difficulty: "beginner",
    instructions: "俯卧，双手撑地略宽于肩，身体从头到脚呈一条直线。屈肘下放身体至胸部接近地面，然后推起回到起始位置。",
    tips: "核心收紧防止塌腰或撅臀；手肘与身体呈45°；下放时胸部主动靠近地面。",
    calories_per_30min: 160
  },
  {
    id: 5, name: "上斜卧推", category: "strength", muscle_group: "chest",
    equipment: "杠铃", difficulty: "intermediate",
    instructions: "将训练凳调至30-45°上斜角度。仰卧，双手握杠铃略宽于肩，下放至锁骨下方，然后推起至手臂伸直。",
    tips: "角度不要超过45°，否则肩部参与过多；杠铃下放位置比平板卧推更高；保持臀部紧贴凳面。",
    calories_per_30min: 170
  },
  {
    id: 6, name: "双杠臂屈伸", category: "strength", muscle_group: "chest",
    equipment: "双杠", difficulty: "intermediate",
    instructions: "双手握住双杠撑起身体，身体前倾约30°。屈肘下放身体至大臂与地面平行或略低，然后推起回到起始位置。",
    tips: "身体前倾才能更多刺激下胸；下放时感受胸肌拉伸；避免过度下放造成肩关节压力过大。",
    calories_per_30min: 165
  },
  {
    id: 7, name: "器械推胸", category: "strength", muscle_group: "chest",
    equipment: "器械", difficulty: "beginner",
    instructions: "坐在推胸器械上，调整座椅高度使把手与胸部中部对齐。双手握住把手，将重量向前推出至手臂伸直，然后缓慢回放。",
    tips: "保持肩胛骨后缩；推出时呼气，回放时吸气；不要完全伸直肘关节锁定。",
    calories_per_30min: 130
  },
  {
    id: 8, name: "哑铃仰卧屈臂上拉", category: "strength", muscle_group: "chest",
    equipment: "哑铃", difficulty: "intermediate",
    instructions: "仰卧于平板凳，双手托住一只哑铃两端举于胸部上方。保持肘关节微屈，将哑铃缓慢下放至头部后方，感受胸肌和背阔肌拉伸，然后拉回原位。",
    tips: "动作幅度控制在舒适范围内；感受胸肌发力而非单纯用手臂拉；选择轻重量先熟悉动作。",
    calories_per_30min: 140
  },

  // ========== 背 (back) - 8个 ==========
  {
    id: 9, name: "引体向上", category: "strength", muscle_group: "back",
    equipment: "单杠", difficulty: "advanced",
    instructions: "双手正握单杠，握距略宽于肩。身体悬垂，肩胛骨下沉后缩，用力将身体上拉至下巴超过单杠，然后缓慢下放至手臂伸直。",
    tips: "启动时想象用肘部向下后方拉；避免摆动借力；全程控制离心下放。",
    calories_per_30min: 200
  },
  {
    id: 10, name: "杠铃划船", category: "strength", muscle_group: "back",
    equipment: "杠铃", difficulty: "intermediate",
    instructions: "双脚与肩同宽站立，屈髋俯身至躯干与地面约45°。双手正握杠铃，沿大腿拉向腹部，肘部向后上方移动，然后缓慢下放。",
    tips: "保持背部平直不要弓背；杠铃贴近身体拉动；顶峰收缩时肩胛骨后缩收紧。",
    calories_per_30min: 185
  },
  {
    id: 11, name: "高位下拉", category: "strength", muscle_group: "back",
    equipment: "器械", difficulty: "beginner",
    instructions: "坐在高位下拉器械上，大腿固定。双手宽握拉杆，肩胛骨下沉后将杆拉至上胸部，肘部向下后方移动，然后缓慢回放。",
    tips: "不要过度后仰借力；拉到胸部时停顿1秒；回放时控制速度感受背阔肌拉伸。",
    calories_per_30min: 155
  },
  {
    id: 12, name: "坐姿划船", category: "strength", muscle_group: "back",
    equipment: "器械", difficulty: "beginner",
    instructions: "坐在划船器械上，双脚踩实踏板，膝盖微屈。双手握住把手，肩胛骨后缩将把手拉向腹部，肘部贴紧身体两侧，然后缓慢回放。",
    tips: "回放时感受肩胛骨前伸和背阔肌拉伸；拉动时不要用身体前后晃动借力；保持脊柱中立。",
    calories_per_30min: 145
  },
  {
    id: 13, name: "硬拉", category: "strength", muscle_group: "back",
    equipment: "杠铃", difficulty: "advanced",
    instructions: "双脚与髋同宽站立，杠铃贴近小腿。屈髋俯身握住杠铃，保持背部挺直。伸髋伸膝将杠铃沿身体拉起至身体直立，然后缓慢下放。",
    tips: "杠铃始终贴近身体；启动时想象用脚蹬地；锁定时不要过度后仰；下放时主动屈髋。",
    calories_per_30min: 250
  },
  {
    id: 14, name: "单臂哑铃划船", category: "strength", muscle_group: "back",
    equipment: "哑铃", difficulty: "intermediate",
    instructions: "单手持哑铃，对侧手和膝支撑于训练凳上，背部保持平直。将哑铃拉向髋部，肘部向后上方移动，然后缓慢下放。",
    tips: "保持躯干稳定不要旋转；哑铃拉向髋部而非肩部；顶峰收缩时背部肌肉收紧。",
    calories_per_30min: 160
  },
  {
    id: 15, name: "面拉", category: "strength", muscle_group: "back",
    equipment: "绳索机", difficulty: "beginner",
    instructions: "将绳索调至面部高度，双手握住绳索两端。将绳索拉向面部两侧，肘部向外打开，肩胛骨后缩，然后缓慢回放。",
    tips: "重点刺激三角肌后束和上背部；回放时感受肩胛骨前伸；保持核心稳定身体不晃动。",
    calories_per_30min: 120
  },
  {
    id: 16, name: "山羊挺身", category: "strength", muscle_group: "back",
    equipment: "器械", difficulty: "beginner",
    instructions: "俯卧于罗马椅上，脚跟固定在挡板下，髋部位于垫子边缘。屈髋下放上半身至接近垂直，然后伸髋将身体挺直。",
    tips: "动作以髋为轴，不要过度弓背；下放时感受腘绳肌和臀肌拉伸；可抱哑铃或杠铃片增加难度。",
    calories_per_30min: 130
  },

  // ========== 腿 (legs) - 10个 ==========
  {
    id: 17, name: "深蹲", category: "strength", muscle_group: "legs",
    equipment: "杠铃", difficulty: "intermediate",
    instructions: "杠铃置于斜方肌上部，双脚与肩同宽或略宽，脚尖略微外展。屈髋屈膝下蹲至大腿至少与地面平行，然后伸膝伸髋站起。",
    tips: "膝盖对准第二脚趾方向；保持脊柱中立核心收紧；蹲起时想象头顶向上延伸；脚跟始终踩实地面。",
    calories_per_30min: 220
  },
  {
    id: 18, name: "腿举", category: "strength", muscle_group: "legs",
    equipment: "器械", difficulty: "beginner",
    instructions: "坐在腿举机上，双脚放在踏板上与肩同宽。屈髋屈膝将重量下放至膝关节约90°，然后用腿部力量将重量推回起始位置。",
    tips: "下放时腰部不要离开靠垫；膝盖不要过度内扣；不要完全伸直锁定膝关节。",
    calories_per_30min: 175
  },
  {
    id: 19, name: "箭步蹲", category: "strength", muscle_group: "legs",
    equipment: "哑铃", difficulty: "intermediate",
    instructions: "双手持哑铃于身体两侧，一脚向前迈出一大步。前膝弯曲至约90°，后膝接近地面，然后蹬地回到起始位置。",
    tips: "前膝不超过脚尖过多；躯干保持直立；后撤时感受臀肌发力；步幅以蹲下去舒适为准。",
    calories_per_30min: 190
  },
  {
    id: 20, name: "罗马尼亚硬拉", category: "strength", muscle_group: "legs",
    equipment: "杠铃", difficulty: "intermediate",
    instructions: "双脚与髋同宽站立，双手正握杠铃。保持膝盖微屈固定，屈髋俯身将杠铃沿大腿下放至腘绳肌拉伸感明显，然后伸髋站直。",
    tips: "膝盖角度基本不变；杠铃贴近身体；感受腘绳肌和臀肌拉伸；不要弓背。",
    calories_per_30min: 195
  },
  {
    id: 21, name: "腿弯举", category: "strength", muscle_group: "legs",
    equipment: "器械", difficulty: "beginner",
    instructions: "俯卧在腿弯举器械上，脚踝勾住滚轴。屈膝将滚轴向臀部方向卷起，收缩腘绳肌，然后缓慢回放。",
    tips: "臀部始终贴紧凳面；顶峰收缩保持1秒；回放时控制速度感受腘绳肌拉伸。",
    calories_per_30min: 125
  },
  {
    id: 22, name: "腿屈伸", category: "strength", muscle_group: "legs",
    equipment: "器械", difficulty: "beginner",
    instructions: "坐在腿屈伸器械上，背部贴紧靠垫，小腿前侧抵住滚轴。伸膝将小腿抬起至大腿接近伸直，收缩股四头肌，然后缓慢回放。",
    tips: "动作顶峰不要完全锁定膝关节；回放时控制速度；可尝试顶峰停顿增加刺激。",
    calories_per_30min: 120
  },
  {
    id: 23, name: "保加利亚分腿蹲", category: "strength", muscle_group: "legs",
    equipment: "哑铃", difficulty: "intermediate",
    instructions: "后脚脚背搭在训练凳上，前脚向前迈出约一腿长。双手持哑铃，屈髋屈膝下蹲至前腿大腿平行地面，然后站起。",
    tips: "前膝对准脚尖方向；躯干略微前倾；重心主要在前脚；对臀肌刺激极强。",
    calories_per_30min: 185
  },
  {
    id: 24, name: "臀桥", category: "strength", muscle_group: "legs",
    equipment: "自重", difficulty: "beginner",
    instructions: "仰卧屈膝，双脚踩地，膝盖弯曲约90°。臀部发力将髋部向上顶起至身体呈一条直线，顶峰收缩臀肌，然后缓慢下放。",
    tips: "顶峰时身体从肩到膝呈直线；不要过度顶腰；可用杠铃或哑铃增加负重。",
    calories_per_30min: 110
  },
  {
    id: 25, name: "哈克深蹲", category: "strength", muscle_group: "legs",
    equipment: "器械", difficulty: "intermediate",
    instructions: "站在哈克深蹲机上，肩背靠紧靠垫，双脚放在踏板上。屈膝下蹲至大腿至少平行地面，然后用腿部力量将重量推回。",
    tips: "身体始终贴紧靠垫；膝盖不要过度前移；对股四头肌刺激极强。",
    calories_per_30min: 180
  },
  {
    id: 26, name: "站姿提踵", category: "strength", muscle_group: "legs",
    equipment: "器械", difficulty: "beginner",
    instructions: "站在提踵器械上，前脚掌踩在踏板上，脚跟悬空。小腿发力将脚跟尽可能抬高，顶峰收缩腓肠肌，然后缓慢下放至脚跟低于踏板。",
    tips: "动作底部感受小腿充分拉伸；顶峰保持2秒；膝关节可微屈或伸直改变刺激重点。",
    calories_per_30min: 100
  },

  // ========== 肩 (shoulders) - 8个 ==========
  {
    id: 27, name: "哑铃推举", category: "strength", muscle_group: "shoulders",
    equipment: "哑铃", difficulty: "intermediate",
    instructions: "坐在训练凳上，双手持哑铃举于肩部两侧，掌心向前。将哑铃向上推起至手臂接近伸直，哑铃在头顶相碰，然后缓慢回放。",
    tips: "核心收紧防止腰部过度反弓；下放时哑铃略低于耳朵；推起时呼气。",
    calories_per_30min: 160
  },
  {
    id: 28, name: "侧平举", category: "strength", muscle_group: "shoulders",
    equipment: "哑铃", difficulty: "beginner",
    instructions: "站立，双手持哑铃于身体两侧，掌心相对。肘关节微屈，将哑铃向两侧抬起至与肩同高或略高，然后缓慢回放。",
    tips: "肘关节角度固定；抬至肩高即可，过高会增加肩峰撞击风险；控制离心下放。",
    calories_per_30min: 120
  },
  {
    id: 29, name: "前平举", category: "strength", muscle_group: "shoulders",
    equipment: "哑铃", difficulty: "beginner",
    instructions: "站立，双手持哑铃于大腿前方，掌心朝向大腿。将一只或两只哑铃向前上方抬起至与肩同高，然后缓慢回放。",
    tips: "躯干保持稳定不要晃动；抬至肩高即可；交替进行可减轻腰部压力。",
    calories_per_30min: 115
  },
  {
    id: 30, name: "阿诺德推举", category: "strength", muscle_group: "shoulders",
    equipment: "哑铃", difficulty: "intermediate",
    instructions: "坐姿，双手持哑铃举于肩部前方，掌心朝向自己。推起的同时旋转手臂，至顶端掌心朝前，然后反向旋转回放。",
    tips: "动作连贯流畅；旋转时感受前束和中束的衔接刺激；选择比标准推举更轻的重量。",
    calories_per_30min: 155
  },
  {
    id: 31, name: "杠铃提拉", category: "strength", muscle_group: "shoulders",
    equipment: "杠铃", difficulty: "intermediate",
    instructions: "站立，双手正握杠铃置于大腿前。将杠铃沿身体向上提拉至胸部下方，肘部向外上方抬起，然后缓慢回放。",
    tips: "肘部始终高于手腕；不要耸肩；选择较轻重量确保能控制动作轨迹。",
    calories_per_30min: 140
  },
  {
    id: 32, name: "蝴蝶机反向飞鸟", category: "strength", muscle_group: "shoulders",
    equipment: "器械", difficulty: "beginner",
    instructions: "面向蝴蝶机反向坐好，胸部贴紧靠垫，双手握住把手。将双臂向两侧打开，收缩三角肌后束，然后缓慢回放。",
    tips: "胸部始终贴紧靠垫；回放时感受后束拉伸；顶峰收缩保持1秒。",
    calories_per_30min: 110
  },
  {
    id: 33, name: "古巴推举", category: "strength", muscle_group: "shoulders",
    equipment: "哑铃", difficulty: "advanced",
    instructions: "站立，双手持哑铃于身体两侧。将哑铃侧平举至肩高，屈肘将哑铃转至面部前方（外旋），然后向上推举，再按相反顺序回放。",
    tips: "这是一个复合动作，对肩袖和三角肌刺激全面；选择轻重量，动作控制是关键。",
    calories_per_30min: 135
  },
  {
    id: 34, name: "面拉", category: "strength", muscle_group: "shoulders",
    equipment: "绳索机", difficulty: "beginner",
    instructions: "将绳索调至面部高度，双手握住绳索两端。将绳索拉向面部两侧，肘部向外打开，肩胛骨后缩，然后缓慢回放。",
    tips: "重点刺激三角肌后束和上背部；回放时感受肩胛骨前伸；保持核心稳定身体不晃动。",
    calories_per_30min: 120
  },

  // ========== 臂 (arms) - 8个 ==========
  {
    id: 35, name: "杠铃弯举", category: "strength", muscle_group: "arms",
    equipment: "杠铃", difficulty: "beginner",
    instructions: "站立，双手与肩同宽正握杠铃置于大腿前。保持上臂固定不动，屈肘将杠铃向上弯举至接近胸部，收缩肱二头肌，然后缓慢回放。",
    tips: "上臂始终贴紧身体两侧；不要借力晃动身体；回放时控制速度感受二头肌拉伸。",
    calories_per_30min: 130
  },
  {
    id: 36, name: "锤式弯举", category: "strength", muscle_group: "arms",
    equipment: "哑铃", difficulty: "beginner",
    instructions: "站立，双手持哑铃置于身体两侧，掌心相对。保持上臂固定，屈肘将哑铃向肩部方向弯举，然后缓慢回放。",
    tips: "掌心始终相对；对肱肌和肱桡肌刺激更强；可交替或同时进行。",
    calories_per_30min: 125
  },
  {
    id: 37, name: "绳索下压", category: "strength", muscle_group: "arms",
    equipment: "绳索机", difficulty: "beginner",
    instructions: "站在绳索机前，双手握住直杆或绳索。上臂固定于身体两侧，伸肘将杆向下压至手臂伸直，收缩肱三头肌，然后缓慢回放。",
    tips: "上臂不要前后移动；顶峰收缩时手臂完全伸直；回放至约90°即可，不要过度屈肘。",
    calories_per_30min: 120
  },
  {
    id: 38, name: "法式弯举", category: "strength", muscle_group: "arms",
    equipment: "杠铃", difficulty: "intermediate",
    instructions: "仰卧于平板凳，双手窄握曲杆杠铃举于胸部上方。保持上臂垂直固定，屈肘将杠铃缓慢下放至额头附近，然后伸肘推回。",
    tips: "上臂始终保持垂直指向天花板；选择较轻重量；下放时控制速度保护肘关节。",
    calories_per_30min: 115
  },
  {
    id: 39, name: "集中弯举", category: "strength", muscle_group: "arms",
    equipment: "哑铃", difficulty: "beginner",
    instructions: "坐在训练凳上，双腿分开，手肘内侧贴住大腿内侧。单手将哑铃向上弯举，顶峰收缩肱二头肌，然后缓慢回放。",
    tips: "手肘始终贴紧大腿；孤立刺激效果极好；顶峰可加入手腕旋后增加收缩。",
    calories_per_30min: 110
  },
  {
    id: 40, name: "窄距卧推", category: "strength", muscle_group: "arms",
    equipment: "杠铃", difficulty: "intermediate",
    instructions: "仰卧于平板凳，双手窄握杠铃（约肩宽），下放至胸部中下部，然后推起。重点刺激肱三头肌而非胸部。",
    tips: "握距与肩同宽或略窄；下放位置比标准卧推略低；手肘贴近身体两侧。",
    calories_per_30min: 150
  },
  {
    id: 41, name: "仰卧臂屈伸", category: "strength", muscle_group: "arms",
    equipment: "哑铃", difficulty: "intermediate",
    instructions: "仰卧于平板凳，双手各持一只哑铃举于胸部上方，掌心相对。保持上臂固定，屈肘将哑铃下放至耳朵两侧，然后伸肘推回。",
    tips: "上臂与地面垂直固定；下放时感受三头肌拉伸；动作与法式弯举类似但使用哑铃。",
    calories_per_30min: 120
  },
  {
    id: 42, name: "反握弯举", category: "strength", muscle_group: "arms",
    equipment: "杠铃", difficulty: "intermediate",
    instructions: "站立，双手反握（掌心向下）杠铃置于大腿前。保持上臂固定，屈肘将杠铃向上弯举，然后缓慢回放。",
    tips: "对前臂伸肌和肱肌刺激较强；选择比正握弯举更轻的重量；动作控制是关键。",
    calories_per_30min: 125
  },

  // ========== 核心 (core) - 8个 ==========
  {
    id: 43, name: "平板支撑", category: "strength", muscle_group: "core",
    equipment: "自重", difficulty: "beginner",
    instructions: "俯卧，用前臂和脚尖支撑身体，肘关节在肩部正下方。身体从头到脚呈一条直线，核心收紧，保持静止。",
    tips: "臀部不要抬高或塌陷；想象腹部向脊柱方向收紧；正常呼吸不要憋气。",
    calories_per_30min: 90
  },
  {
    id: 44, name: "卷腹", category: "strength", muscle_group: "core",
    equipment: "自重", difficulty: "beginner",
    instructions: "仰卧屈膝，双手轻放于耳侧或胸前。用腹肌力量将肩胛骨抬离地面，下背部保持贴地，然后缓慢回放。",
    tips: "不要用手拉头部；抬起时呼气；动作幅度不用太大，感受腹肌收缩即可。",
    calories_per_30min: 85
  },
  {
    id: 45, name: "悬垂举腿", category: "strength", muscle_group: "core",
    equipment: "单杠", difficulty: "advanced",
    instructions: "双手握住单杠悬垂，身体稳定不晃动。用腹肌力量将双腿向上抬起至与地面平行或更高，然后缓慢下放。",
    tips: "控制身体不前后摆动；抬腿时骨盆后倾；初学者可先练屈膝举腿降低难度。",
    calories_per_30min: 130
  },
  {
    id: 46, name: "俄罗斯转体", category: "strength", muscle_group: "core",
    equipment: "自重", difficulty: "intermediate",
    instructions: "坐姿，双脚抬离地面，躯干略微后倾。双手合十或持重物，从一侧转到另一侧，触碰地面或接近地面。",
    tips: "用脚接触地面降低难度；转体时感受腹斜肌收缩；保持核心收紧身体稳定。",
    calories_per_30min: 110
  },
  {
    id: 47, name: "死虫式", category: "strength", muscle_group: "core",
    equipment: "自重", difficulty: "beginner",
    instructions: "仰卧，手臂上举垂直地面，大腿抬起屈膝90°。对侧手臂和腿同时缓慢下放至接近地面，然后收回，交替进行。",
    tips: "下背部始终贴紧地面；动作越慢难度越大；是核心稳定性的经典训练动作。",
    calories_per_30min: 80
  },
  {
    id: 48, name: "鸟狗式", category: "strength", muscle_group: "core",
    equipment: "自重", difficulty: "beginner",
    instructions: "四点支撑，手腕在肩部下方，膝盖在髋部下方。对侧手臂和腿同时向前向后伸展，保持身体平衡，然后收回交替。",
    tips: "身体不要旋转或塌陷；伸展时保持脊柱中立；是下背痛康复的推荐动作。",
    calories_per_30min: 75
  },
  {
    id: 49, name: "健腹轮", category: "strength", muscle_group: "core",
    equipment: "健腹轮", difficulty: "advanced",
    instructions: "跪姿，双手握住健腹轮。在控制下将轮子向前滚动至身体接近地面，然后用腹肌力量将身体拉回起始位置。",
    tips: "不要塌腰；滚动距离量力而行；可用腹肌垫保护膝盖；是核心力量的高级挑战。",
    calories_per_30min: 140
  },
  {
    id: 50, name: "侧平板支撑", category: "strength", muscle_group: "core",
    equipment: "自重", difficulty: "intermediate",
    instructions: "侧卧，用一侧前臂和脚外侧支撑身体。髋部抬起使身体呈一条直线，保持静止。",
    tips: "髋部不要下沉；对侧手可指向天花板增加难度；是训练腹斜肌和侧向稳定的绝佳动作。",
    calories_per_30min: 85
  },

  // ========== 有氧/全身 (full_body) - 10个 ==========
  {
    id: 51, name: "波比跳", category: "cardio", muscle_group: "full_body",
    equipment: "自重", difficulty: "advanced",
    instructions: "站立开始，下蹲双手撑地，双脚向后跳至俯卧撑位置，做一个俯卧撑，双脚跳回双手之间，然后向上跳起双手过头。",
    tips: "保持动作连贯流畅；落地时屈膝缓冲；可根据体能省略俯卧撑或跳起部分。",
    calories_per_30min: 300
  },
  {
    id: 52, name: "开合跳", category: "cardio", muscle_group: "full_body",
    equipment: "自重", difficulty: "beginner",
    instructions: "站立，双脚并拢双手放于身体两侧。跳起时双脚分开略宽于肩，双手从两侧向上举过头顶击掌，再跳回起始位置。",
    tips: "落地轻盈用前脚掌着地；膝盖微屈缓冲；保持节奏稳定呼吸均匀。",
    calories_per_30min: 200
  },
  {
    id: 53, name: "高抬腿", category: "cardio", muscle_group: "full_body",
    equipment: "自重", difficulty: "beginner",
    instructions: "站立，交替快速抬起膝盖至髋部高度或更高，同时配合摆臂。保持核心收紧，原地或前进进行。",
    tips: "膝盖尽量抬高；核心收紧保持躯干稳定；用前脚掌着地快速转换。",
    calories_per_30min: 220
  },
  {
    id: 54, name: "登山跑", category: "cardio", muscle_group: "full_body",
    equipment: "自重", difficulty: "intermediate",
    instructions: "俯卧撑起始姿势，交替将膝盖快速提向胸部，像登山一样。保持核心收紧，臀部不要抬得过高。",
    tips: "核心收紧保持背部平直；速度越快强度越大；臀部不要过度抬高。",
    calories_per_30min: 250
  },
  {
    id: 55, name: "跳绳", category: "cardio", muscle_group: "full_body",
    equipment: "跳绳", difficulty: "beginner",
    instructions: "双手握住跳绳把手， rope置于身后。用手腕发力摇动绳子，双脚同时或交替跳起让绳子从脚下通过。",
    tips: "用手腕而非手臂摇绳；跳起高度刚好让绳子通过即可；保持呼吸节奏。",
    calories_per_30min: 280
  },
  {
    id: 56, name: "战绳", category: "cardio", muscle_group: "full_body",
    equipment: "战绳", difficulty: "intermediate",
    instructions: "双手各握住战绳一端，身体微蹲，核心收紧。通过手臂和肩部发力制造波浪状动作，交替或同时进行。",
    tips: "核心收紧身体稳定；动作来自肩部而非肘部；可尝试不同波浪模式（交替、同步、开合）。",
    calories_per_30min: 260
  },
  {
    id: 57, name: "壶铃摆荡", category: "cardio", muscle_group: "full_body",
    equipment: "壶铃", difficulty: "intermediate",
    instructions: "双脚略宽于肩站立，壶铃置于身前。屈髋俯身双手握住壶铃，然后伸髋发力将壶铃向前上方摆起至与肩同高，利用惯性摆回胯下。",
    tips: "动力来自髋部爆发而非手臂；保持背部平直；顶端时身体直立不要后仰。",
    calories_per_30min: 240
  },
  {
    id: 58, name: "农夫行走", category: "strength", muscle_group: "full_body",
    equipment: "哑铃", difficulty: "beginner",
    instructions: "双手各持重物（哑铃、壶铃或农夫行走专用把手），保持身体直立，核心收紧，在场地中行走指定距离或时间。",
    tips: "保持身体直立不要倾斜；小步快走；对握力、核心和斜方肌刺激全面。",
    calories_per_30min: 180
  },
  {
    id: 59, name: "熊爬", category: "cardio", muscle_group: "full_body",
    equipment: "自重", difficulty: "intermediate",
    instructions: "四点支撑，膝盖抬离地面约5cm。对侧手脚同时向前移动，保持背部平直和核心收紧，像熊一样爬行。",
    tips: "膝盖始终抬离地面；背部保持平直不要塌陷；动作越慢对核心挑战越大。",
    calories_per_30min: 190
  },
  {
    id: 60, name: "跳绳双摇", category: "cardio", muscle_group: "full_body",
    equipment: "跳绳", difficulty: "advanced",
    instructions: "在单次跳起中让绳子从脚下通过两次。需要更快的摇绳速度和更高的跳起高度，对协调性和爆发力要求极高。",
    tips: "用手腕快速摇绳；跳起高度比单摇更高但不要过度；可先练习连续单摇再尝试双摇。",
    calories_per_30min: 350
  }
];

module.exports = exercises;
