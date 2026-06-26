const trainingPlans = [
  {
    "id": 1,
    "title": "4周增肌入门计划",
    "description": "专为增肌初学者设计的4周训练计划，采用上下半身分化训练法。每周训练4天，重点掌握基础复合动作，建立正确的动作模式。通过杠铃卧推、深蹲、硬拉等经典动作刺激大肌群生长，配合适当的孤立动作完善肌肉线条。适合有基础训练经验但希望系统增肌的训练者。",
    "goal": "build_muscle",
    "level": "beginner",
    "duration_weeks": 4,
    "days_per_week": 4,
    "equipment": "哑铃,杠铃,弹力带",
    "coach": "李教练",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "上半身（推+拉）",
            "warmup": "5分钟跳绳 + 肩关节环绕20次 + 弹力带扩胸15次",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制离心",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉至锁骨",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "感受拉伸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩胛后收",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×2 + 背阔肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "下半身（腿+臀）",
            "warmup": "5分钟跳绳 + 髋关节环绕20次 + 自重深蹲15次",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "8-10次",
                "rest": 120,
                "notes": "膝盖对准脚尖",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "感受腘绳肌拉伸",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧10-12次",
                "rest": 75,
                "notes": "步幅适中",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿发力",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×2 + 腘绳肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "上半身（肩+臂）",
            "warmup": "5分钟跳绳 + 肩关节环绕20次 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 4,
                "reps": "8-12次",
                "rest": 90,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制幅度",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "肘部固定",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×2 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "全身基础",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-15次",
                "rest": 60,
                "notes": "全程控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 45,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "30-40米",
                "rest": 60,
                "notes": "挺胸收腹",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "上半身（推+拉）",
            "warmup": "5分钟跳绳 + 肩关节环绕20次 + 弹力带扩胸15次",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 4,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制离心",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "可用辅助带",
                "video_url": ""
              },
              {
                "name": "哑铃仰卧屈臂上拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "感受拉伸",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩胛后收",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×2 + 背阔肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "下半身（腿+臀）",
            "warmup": "5分钟跳绳 + 髋关节环绕20次 + 自重深蹲15次",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "8-10次",
                "rest": 120,
                "notes": "膝盖对准脚尖",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "感受腘绳肌拉伸",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧10-12次",
                "rest": 75,
                "notes": "步幅适中",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿发力",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×2 + 腘绳肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "上半身（肩+臂）",
            "warmup": "5分钟跳绳 + 肩关节环绕20次 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "阿诺德推举",
                "sets": 4,
                "reps": "8-12次",
                "rest": 90,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制幅度",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "肘部固定",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×2 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "全身基础",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "10-15次",
                "rest": 60,
                "notes": "全程控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "30-40米",
                "rest": 60,
                "notes": "挺胸收腹",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "上半身（推+拉）",
            "warmup": "5分钟跳绳 + 肩关节环绕20次 + 弹力带扩胸15次",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 90,
                "notes": "冲击重量",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "拉至锁骨",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "感受拉伸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "肩胛后收",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×2 + 背阔肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "下半身（腿+臀）",
            "warmup": "5分钟跳绳 + 髋关节环绕20次 + 自重深蹲15次",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "膝盖对准脚尖",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "感受腘绳肌拉伸",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧10-12次",
                "rest": 75,
                "notes": "步幅适中",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿发力",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×2 + 腘绳肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "上半身（肩+臂）",
            "warmup": "5分钟跳绳 + 肩关节环绕20次 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 4,
                "reps": "6-8次",
                "rest": 90,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制幅度",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "8-10次",
                "rest": 60,
                "notes": "肘部固定",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×2 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "全身基础",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-15次",
                "rest": 60,
                "notes": "全程控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 45,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "30-40米",
                "rest": 60,
                "notes": "挺胸收腹",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "上半身（推+拉）",
            "warmup": "5分钟跳绳 + 肩关节环绕20次 + 弹力带扩胸15次",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 90,
                "notes": "冲击重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "可用辅助带",
                "video_url": ""
              },
              {
                "name": "哑铃仰卧屈臂上拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "感受拉伸",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "肩胛后收",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×2 + 背阔肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "下半身（腿+臀）",
            "warmup": "5分钟跳绳 + 髋关节环绕20次 + 自重深蹲15次",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "膝盖对准脚尖",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "感受腘绳肌拉伸",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧10-12次",
                "rest": 75,
                "notes": "步幅适中",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿发力",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×2 + 腘绳肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "上半身（肩+臂）",
            "warmup": "5分钟跳绳 + 肩关节环绕20次 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "阿诺德推举",
                "sets": 4,
                "reps": "6-8次",
                "rest": 90,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制幅度",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 60,
                "notes": "肘部固定",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×2 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "全身基础",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "10-15次",
                "rest": 60,
                "notes": "全程控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "30-40米",
                "rest": 60,
                "notes": "挺胸收腹",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "8周增肌进阶计划",
    "description": "为中阶训练者打造的8周增肌计划，采用经典的推拉腿（PPL）五分化训练法。每周训练5天，训练量和强度显著提升。推日集中训练胸、肩、三头，拉日专注背、二头，腿日全面刺激下肢。通过渐进超负荷原则，系统提升肌肉围度和力量水平。",
    "goal": "build_muscle",
    "level": "intermediate",
    "duration_weeks": 8,
    "days_per_week": 5,
    "equipment": "哑铃,杠铃,绳索器械,史密斯机",
    "coach": "张教练",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "推日-胸+肩+三头",
            "warmup": "5分钟椭圆机 + 肩关节环绕20次 + 弹力带扩胸15次 + 墙壁俯卧撑15次",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 1,
                "reps": "6-10次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸/挤压",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×3 + 三角肌拉伸30秒×2 + 肱三头肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "拉日-背+二头",
            "warmup": "5分钟椭圆机 + 肩胛激活 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "引体向上",
                "sets": 1,
                "reps": "6-10次",
                "rest": 120,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 4,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "前臂",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×3 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日-下肢全面",
            "warmup": "5分钟椭圆机 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 1,
                "reps": "6-10次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "8-12次",
                "rest": 90,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×3 + 腘绳肌拉伸30秒×3 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢补充+核心",
            "warmup": "5分钟椭圆机 + 肩关节环绕 + 核心激活",
            "exercises": [
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "旋转/控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "6-10次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "推日-胸+肩+三头",
            "warmup": "5分钟椭圆机 + 肩关节环绕20次 + 弹力带扩胸15次 + 墙壁俯卧撑15次",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 1,
                "reps": "6-10次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索夹胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸/挤压",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "窄距卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×3 + 三角肌拉伸30秒×2 + 肱三头肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "拉日-背+二头",
            "warmup": "5分钟椭圆机 + 肩胛激活 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 1,
                "reps": "6-10次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 4,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "集中弯举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "前臂",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×3 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日-下肢全面",
            "warmup": "5分钟椭圆机 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 1,
                "reps": "6-10次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "8-12次",
                "rest": 90,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "哈克深蹲",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×3 + 腘绳肌拉伸30秒×3 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢补充+核心",
            "warmup": "5分钟椭圆机 + 肩关节环绕 + 核心激活",
            "exercises": [
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "旋转/控制",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "6-10次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "推日-胸+肩+三头",
            "warmup": "5分钟椭圆机 + 肩关节环绕20次 + 弹力带扩胸15次 + 墙壁俯卧撑15次",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 1,
                "reps": "6-10次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸/挤压",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×3 + 三角肌拉伸30秒×2 + 肱三头肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "拉日-背+二头",
            "warmup": "5分钟椭圆机 + 肩胛激活 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "引体向上",
                "sets": 1,
                "reps": "6-10次",
                "rest": 120,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 4,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "前臂",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×3 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日-下肢全面",
            "warmup": "5分钟椭圆机 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 1,
                "reps": "6-10次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "8-12次",
                "rest": 90,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×3 + 腘绳肌拉伸30秒×3 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢补充+核心",
            "warmup": "5分钟椭圆机 + 肩关节环绕 + 核心激活",
            "exercises": [
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "旋转/控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "6-10次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "推日-胸+肩+三头",
            "warmup": "5分钟椭圆机 + 肩关节环绕20次 + 弹力带扩胸15次 + 墙壁俯卧撑15次",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 1,
                "reps": "5-8次",
                "rest": 150,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 4,
                "reps": "5-8次",
                "rest": 150,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索夹胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸/挤压",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "窄距卧推",
                "sets": 3,
                "reps": "6-10次",
                "rest": 120,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×3 + 三角肌拉伸30秒×2 + 肱三头肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "拉日-背+二头",
            "warmup": "5分钟椭圆机 + 肩胛激活 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 1,
                "reps": "5-8次",
                "rest": 150,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "集中弯举",
                "sets": 3,
                "reps": "6-10次",
                "rest": 120,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "前臂",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×3 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日-下肢全面",
            "warmup": "5分钟椭圆机 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 1,
                "reps": "5-8次",
                "rest": 150,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "哈克深蹲",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×3 + 腘绳肌拉伸30秒×3 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢补充+核心",
            "warmup": "5分钟椭圆机 + 肩关节环绕 + 核心激活",
            "exercises": [
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "旋转/控制",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "5-8次",
                "rest": 150,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 5,
        "days": [
          {
            "day": 1,
            "title": "推日-胸+肩+三头",
            "warmup": "5分钟椭圆机 + 肩关节环绕20次 + 弹力带扩胸15次 + 墙壁俯卧撑15次",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 1,
                "reps": "5-8次",
                "rest": 150,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 4,
                "reps": "5-8次",
                "rest": 150,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸/挤压",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "递减组",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "6-10次",
                "rest": 120,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×3 + 三角肌拉伸30秒×2 + 肱三头肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "拉日-背+二头",
            "warmup": "5分钟椭圆机 + 肩胛激活 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "引体向上",
                "sets": 1,
                "reps": "5-8次",
                "rest": 150,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "6-10次",
                "rest": 120,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "前臂",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×3 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日-下肢全面",
            "warmup": "5分钟椭圆机 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 1,
                "reps": "5-8次",
                "rest": 150,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×3 + 腘绳肌拉伸30秒×3 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢补充+核心",
            "warmup": "5分钟椭圆机 + 肩关节环绕 + 核心激活",
            "exercises": [
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "旋转/控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "5-8次",
                "rest": 150,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 6,
        "days": [
          {
            "day": 1,
            "title": "推日-胸+肩+三头",
            "warmup": "5分钟椭圆机 + 肩关节环绕20次 + 弹力带扩胸15次 + 墙壁俯卧撑15次",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 1,
                "reps": "3-6次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 4,
                "reps": "3-6次",
                "rest": 240,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索夹胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸/挤压",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "递减组",
                "video_url": ""
              },
              {
                "name": "窄距卧推",
                "sets": 3,
                "reps": "4-6次",
                "rest": 150,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×3 + 三角肌拉伸30秒×2 + 肱三头肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "拉日-背+二头",
            "warmup": "5分钟椭圆机 + 肩胛激活 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 1,
                "reps": "3-6次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 4,
                "reps": "4-6次",
                "rest": 150,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "集中弯举",
                "sets": 3,
                "reps": "4-6次",
                "rest": 150,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "前臂",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×3 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日-下肢全面",
            "warmup": "5分钟椭圆机 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 1,
                "reps": "3-6次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "4-6次",
                "rest": 150,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "哈克深蹲",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×3 + 腘绳肌拉伸30秒×3 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢补充+核心",
            "warmup": "5分钟椭圆机 + 肩关节环绕 + 核心激活",
            "exercises": [
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "旋转/控制",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "3-6次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 7,
        "days": [
          {
            "day": 1,
            "title": "推日-胸+肩+三头",
            "warmup": "5分钟椭圆机 + 肩关节环绕20次 + 弹力带扩胸15次 + 墙壁俯卧撑15次",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 1,
                "reps": "3-6次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 4,
                "reps": "3-6次",
                "rest": 240,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸/挤压",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "递减组",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "4-6次",
                "rest": 150,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×3 + 三角肌拉伸30秒×2 + 肱三头肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "拉日-背+二头",
            "warmup": "5分钟椭圆机 + 肩胛激活 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "引体向上",
                "sets": 1,
                "reps": "3-6次",
                "rest": 240,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 4,
                "reps": "4-6次",
                "rest": 150,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "4-6次",
                "rest": 150,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "前臂",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×3 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日-下肢全面",
            "warmup": "5分钟椭圆机 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 1,
                "reps": "3-6次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "4-6次",
                "rest": 150,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×3 + 腘绳肌拉伸30秒×3 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢补充+核心",
            "warmup": "5分钟椭圆机 + 肩关节环绕 + 核心激活",
            "exercises": [
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "旋转/控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "3-6次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 8,
        "days": [
          {
            "day": 1,
            "title": "推日-胸+肩+三头",
            "warmup": "5分钟椭圆机 + 肩关节环绕20次 + 弹力带扩胸15次 + 墙壁俯卧撑15次",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 1,
                "reps": "3-6次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 4,
                "reps": "3-6次",
                "rest": 240,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索夹胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸/挤压",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "递减组",
                "video_url": ""
              },
              {
                "name": "窄距卧推",
                "sets": 3,
                "reps": "4-6次",
                "rest": 150,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×3 + 三角肌拉伸30秒×2 + 肱三头肌拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "拉日-背+二头",
            "warmup": "5分钟椭圆机 + 肩胛激活 + 弹力带面拉15次",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 1,
                "reps": "3-6次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 4,
                "reps": "4-6次",
                "rest": 150,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "集中弯举",
                "sets": 3,
                "reps": "4-6次",
                "rest": 150,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "前臂",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×3 + 肱二头肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日-下肢全面",
            "warmup": "5分钟椭圆机 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 1,
                "reps": "3-6次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "4-6次",
                "rest": 150,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "哈克深蹲",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×3 + 腘绳肌拉伸30秒×3 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢补充+核心",
            "warmup": "5分钟椭圆机 + 肩关节环绕 + 核心激活",
            "exercises": [
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "旋转/控制",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "3-6次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "title": "12周增肌精英计划",
    "description": "面向高阶训练者的12周系统增肌计划，采用胸/背/腿/肩/臂/核心的六分化训练法。每周训练6天，每个肌群得到充分刺激和恢复。训练强度和容量达到高水平，包含多种进阶训练技巧如递减组、超级组等。需要2年以上的系统训练经验，适合备赛或突破平台期。",
    "goal": "build_muscle",
    "level": "advanced",
    "duration_weeks": 12,
    "days_per_week": 6,
    "equipment": "哑铃,杠铃,绳索器械,史密斯机,腿举机",
    "coach": "王教练",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 4,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "绳索夹胸",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 1,
                "reps": "5-8次",
                "rest": 180,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "递减组",
                "video_url": ""
              },
              {
                "name": "前平举",
                "sets": 4,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "杠铃弯举",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "集中弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "窄距卧推",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60-90秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "8-10次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃仰卧屈臂上拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "杠铃划船",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 1,
                "reps": "5-8次",
                "rest": 180,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哈克深蹲",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "阿诺德推举",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "递减组",
                "video_url": ""
              },
              {
                "name": "蝴蝶机反向飞鸟",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "锤式弯举",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "反握弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "仰卧臂屈伸",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "8-10次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 4,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "绳索夹胸",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 1,
                "reps": "5-8次",
                "rest": 180,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "递减组",
                "video_url": ""
              },
              {
                "name": "前平举",
                "sets": 4,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "杠铃弯举",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "集中弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "窄距卧推",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60-90秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "8-10次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃仰卧屈臂上拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "杠铃划船",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 1,
                "reps": "5-8次",
                "rest": 180,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哈克深蹲",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "阿诺德推举",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "递减组",
                "video_url": ""
              },
              {
                "name": "蝴蝶机反向飞鸟",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "锤式弯举",
                "sets": 5,
                "reps": "5-8次",
                "rest": 180,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "反握弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "仰卧臂屈伸",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "8-10次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 5,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 4,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "绳索夹胸",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 1,
                "reps": "3-5次",
                "rest": 240,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "递减组",
                "video_url": ""
              },
              {
                "name": "前平举",
                "sets": 4,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "杠铃弯举",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "集中弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "窄距卧推",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60-90秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "8-10次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 6,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃仰卧屈臂上拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "杠铃划船",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 1,
                "reps": "3-5次",
                "rest": 240,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哈克深蹲",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "阿诺德推举",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "递减组",
                "video_url": ""
              },
              {
                "name": "蝴蝶机反向飞鸟",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "锤式弯举",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "反握弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "仰卧臂屈伸",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "8-10次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 7,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 4,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "绳索夹胸",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 1,
                "reps": "3-5次",
                "rest": 240,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "超级递减",
                "video_url": ""
              },
              {
                "name": "前平举",
                "sets": 4,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "杠铃弯举",
                "sets": 5,
                "reps": "3-5次",
                "rest": 240,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "集中弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "窄距卧推",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60-90秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 8,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃仰卧屈臂上拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "杠铃划船",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "测试极限",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 1,
                "reps": "2-4次",
                "rest": 300,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "测试极限",
                "video_url": ""
              },
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哈克深蹲",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "阿诺德推举",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "超级递减",
                "video_url": ""
              },
              {
                "name": "蝴蝶机反向飞鸟",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "锤式弯举",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "反握弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "仰卧臂屈伸",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 9,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 4,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "绳索夹胸",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "测试极限",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 1,
                "reps": "2-4次",
                "rest": 300,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "测试极限",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "超级递减",
                "video_url": ""
              },
              {
                "name": "前平举",
                "sets": 4,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "杠铃弯举",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "集中弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "窄距卧推",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60-90秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 10,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃仰卧屈臂上拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "杠铃划船",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "测试极限",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 1,
                "reps": "2-4次",
                "rest": 300,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "测试极限",
                "video_url": ""
              },
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哈克深蹲",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "阿诺德推举",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "超级递减",
                "video_url": ""
              },
              {
                "name": "蝴蝶机反向飞鸟",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "锤式弯举",
                "sets": 5,
                "reps": "2-4次",
                "rest": 300,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "反握弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "仰卧臂屈伸",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 11,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 5,
                "reps": "1-3次",
                "rest": 360,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 4,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "绳索夹胸",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 5,
                "reps": "1-3次",
                "rest": 360,
                "notes": "测试极限",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 1,
                "reps": "1-3次",
                "rest": 360,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "1-3次",
                "rest": 360,
                "notes": "测试极限",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 5,
                "reps": "1-3次",
                "rest": 360,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "阿诺德推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "超级递减",
                "video_url": ""
              },
              {
                "name": "前平举",
                "sets": 4,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "杠铃弯举",
                "sets": 5,
                "reps": "1-3次",
                "rest": 360,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "锤式弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "集中弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "窄距卧推",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60-90秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 12,
        "days": [
          {
            "day": 1,
            "title": "胸日",
            "warmup": "5分钟跑步机 + 弹力带扩胸20次 + 墙壁俯卧撑15次 + 肩关节环绕",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 5,
                "reps": "1-3次",
                "rest": 360,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-8次",
                "rest": 150,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哑铃飞鸟",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃仰卧屈臂上拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "挤压",
                "video_url": ""
              },
              {
                "name": "双杠臂屈伸",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "胸",
                "video_url": ""
              },
              {
                "name": "器械推胸",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "胸大肌拉伸30秒×4 + 三角肌前束拉伸30秒×2"
          },
          {
            "day": 2,
            "title": "背日",
            "warmup": "5分钟划船机 + 肩胛激活 + 弹力带面拉20次 + 悬挂放松",
            "exercises": [
              {
                "name": "杠铃划船",
                "sets": 5,
                "reps": "1-3次",
                "rest": 360,
                "notes": "测试极限",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 1,
                "reps": "1-3次",
                "rest": 360,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 4,
                "reps": "6-8次",
                "rest": 120,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "下背",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 60,
                "notes": "后束",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸30秒×4 + 竖脊肌拉伸30秒×2"
          },
          {
            "day": 3,
            "title": "腿日",
            "warmup": "5分钟单车 + 髋关节环绕 + 自重深蹲20次 + 腿部摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 5,
                "reps": "1-3次",
                "rest": 360,
                "notes": "测试极限",
                "video_url": ""
              },
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-6次",
                "rest": 180,
                "notes": "加重",
                "video_url": ""
              },
              {
                "name": "哈克深蹲",
                "sets": 4,
                "reps": "10-12次",
                "rest": 120,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 75,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "腿弯举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "收缩",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 4,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "股四头肌拉伸30秒×4 + 腘绳肌拉伸30秒×4 + 小腿拉伸30秒×2"
          },
          {
            "day": 4,
            "title": "肩日",
            "warmup": "5分钟跑步机 + 肩袖激活 + 弹力带外旋20次 + 轻重量侧平举",
            "exercises": [
              {
                "name": "阿诺德推举",
                "sets": 5,
                "reps": "1-3次",
                "rest": 360,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 90,
                "notes": "旋转",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 1,
                "reps": "12-15次",
                "rest": 60,
                "notes": "超级递减",
                "video_url": ""
              },
              {
                "name": "蝴蝶机反向飞鸟",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "前束/后束",
                "video_url": ""
              },
              {
                "name": "杠铃提拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "古巴推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "肩袖",
                "video_url": ""
              }
            ],
            "cooldown": "三角肌拉伸30秒×4 + 肩袖拉伸30秒×2"
          },
          {
            "day": 5,
            "title": "臂日",
            "warmup": "5分钟椭圆机 + 肘关节环绕 + 轻重量弯举预热",
            "exercises": [
              {
                "name": "锤式弯举",
                "sets": 5,
                "reps": "1-3次",
                "rest": 360,
                "notes": "冲击极限",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "8-10次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "反握弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "孤立/前臂",
                "video_url": ""
              },
              {
                "name": "法式弯举",
                "sets": 4,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "仰卧臂屈伸",
                "sets": 3,
                "reps": "6-8次",
                "rest": 90,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "力竭",
                "video_url": ""
              }
            ],
            "cooldown": "肱二头肌拉伸30秒×4 + 肱三头肌拉伸30秒×4"
          },
          {
            "day": 6,
            "title": "核心+有氧",
            "warmup": "5分钟跳绳 + 核心激活",
            "exercises": [
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 60,
                "notes": "下腹/侧腹",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "腹斜肌/稳定",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "稳定/上腹",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸 + 全身放松"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "4周减脂入门计划",
    "description": "专为减脂初学者设计的4周全身循环训练计划。每周训练4天，将力量训练与有氧运动科学结合（约60:40）。每天安排20-30分钟有氧训练提升热量消耗，同时通过全身性的力量动作维持肌肉量。适合刚开始健身、希望有效降低体脂的训练者。",
    "goal": "lose_fat",
    "level": "beginner",
    "duration_weeks": 4,
    "days_per_week": 4,
    "equipment": "哑铃,弹力带,跳绳",
    "coach": "李教练",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "全身力量循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-15次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "上腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "30秒",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "拉至锁骨",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "HIIT全身燃脂",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "全身力量循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-15次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "上腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "30秒",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "拉至锁骨",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "HIIT全身燃脂",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "全身力量循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-15次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "上腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "30秒",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "拉至锁骨",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "HIIT全身燃脂",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "全身力量循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-15次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "上腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "30秒",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "拉至锁骨",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "HIIT全身燃脂",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10-12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "title": "8周减脂进阶计划",
    "description": "中阶减脂训练计划，采用上半身+下半身+全身HIIT的五天分化模式。每周5天训练，力量与有氧比例约60:40。训练强度较初级计划明显提升，引入HIIT间歇训练加速燃脂。通过复合动作与高强度有氧的结合，在保持肌肉的同时最大化脂肪消耗。",
    "goal": "lose_fat",
    "level": "intermediate",
    "duration_weeks": 8,
    "days_per_week": 5,
    "equipment": "哑铃,杠铃,壶铃,跳绳",
    "coach": "张教练",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "上半身力量+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "下半身力量+有氧",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "40秒",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢循环+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "20米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "上半身力量+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "下半身力量+有氧",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "40秒",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢循环+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "20米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "上半身力量+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "下半身力量+有氧",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "40秒",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢循环+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "20米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "上半身力量+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "下半身力量+有氧",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "40秒",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢循环+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "20米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 5,
        "days": [
          {
            "day": 1,
            "title": "上半身力量+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "下半身力量+有氧",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "40秒",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢循环+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "20米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 6,
        "days": [
          {
            "day": 1,
            "title": "上半身力量+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "下半身力量+有氧",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "40秒",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢循环+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "20米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 7,
        "days": [
          {
            "day": 1,
            "title": "上半身力量+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "下半身力量+有氧",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "40秒",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢循环+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "20米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 8,
        "days": [
          {
            "day": 1,
            "title": "上半身力量+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "下半身力量+有氧",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "12次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "40秒",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "上肢循环+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "20米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  },
  {
    "id": 6,
    "title": "8周减脂精英计划",
    "description": "高阶减脂训练计划，采用推拉腿分化结合全身HIIT的六天训练模式。每周6天训练，力量与有氧比例约60:40。训练容量和密度极高，包含战绳、波比跳等高消耗动作，每天20-30分钟高强度有氧。适合有训练基础、追求高效减脂的进阶训练者。",
    "goal": "lose_fat",
    "level": "advanced",
    "duration_weeks": 8,
    "days_per_week": 6,
    "equipment": "哑铃,杠铃,壶铃,战绳,跳绳",
    "coach": "王教练",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "推日+HIIT",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "15次",
                "rest": 90,
                "notes": "HIIT",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "拉日+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 3,
                "reps": "6-10次",
                "rest": 90,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "腿日+HIIT",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "HIIT",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 4,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "15次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 5,
            "title": "肩臂+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "25次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "8次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "推日+HIIT",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "15次",
                "rest": 90,
                "notes": "HIIT",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "拉日+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 3,
                "reps": "6-10次",
                "rest": 90,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "腿日+HIIT",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "HIIT",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 4,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "15次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 5,
            "title": "肩臂+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "25次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "8次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "推日+HIIT",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "15次",
                "rest": 90,
                "notes": "HIIT",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "拉日+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 3,
                "reps": "6-10次",
                "rest": 90,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "腿日+HIIT",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "HIIT",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 4,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "15次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 5,
            "title": "肩臂+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "25次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "8次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "推日+HIIT",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "15次",
                "rest": 90,
                "notes": "HIIT",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "拉日+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 3,
                "reps": "6-10次",
                "rest": 90,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "腿日+HIIT",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "HIIT",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 4,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "15次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 5,
            "title": "肩臂+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "25次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "8次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 5,
        "days": [
          {
            "day": 1,
            "title": "推日+HIIT",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "15次",
                "rest": 90,
                "notes": "HIIT",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "拉日+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 3,
                "reps": "6-10次",
                "rest": 90,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "腿日+HIIT",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "HIIT",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 4,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "15次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 5,
            "title": "肩臂+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "25次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "8次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 6,
        "days": [
          {
            "day": 1,
            "title": "推日+HIIT",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "15次",
                "rest": 90,
                "notes": "HIIT",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "拉日+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 3,
                "reps": "6-10次",
                "rest": 90,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "腿日+HIIT",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "HIIT",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 4,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "15次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 5,
            "title": "肩臂+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "25次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "8次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 7,
        "days": [
          {
            "day": 1,
            "title": "推日+HIIT",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "15次",
                "rest": 90,
                "notes": "HIIT",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "拉日+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 3,
                "reps": "6-10次",
                "rest": 90,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "腿日+HIIT",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "HIIT",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 4,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "15次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 5,
            "title": "肩臂+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "25次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "8次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 8,
        "days": [
          {
            "day": 1,
            "title": "推日+HIIT",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 4,
                "reps": "6-10次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "15次",
                "rest": 90,
                "notes": "HIIT",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 2,
            "title": "拉日+有氧",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 4,
                "reps": "5-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "引体向上",
                "sets": 3,
                "reps": "6-10次",
                "rest": 90,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸 + 有氧放松"
          },
          {
            "day": 3,
            "title": "腿日+HIIT",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "6-10次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "HIIT",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 有氧放松"
          },
          {
            "day": 4,
            "title": "全身HIIT燃脂",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "波比跳",
                "sets": 4,
                "reps": "15次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "深蹲",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 4,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "1分钟",
                "rest": 45,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 5,
            "title": "肩臂+核心",
            "warmup": "5分钟椭圆机 + 动态拉伸",
            "exercises": [
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "杠铃弯举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "不借力",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "25次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身代谢训练",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "8次",
                "rest": 120,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  },
  {
    "id": 7,
    "title": "4周耐力入门计划",
    "description": "专为提升心肺耐力设计的4周入门计划。每周训练4天，以有氧训练为主，力量训练为辅。包含长跑、间歇跑、跳绳、战绳等多样化有氧形式，逐步提升心肺功能和运动持久力。配合轻量力量训练维持基础体能，适合跑步爱好者和耐力运动初学者。",
    "goal": "endurance",
    "level": "beginner",
    "duration_weeks": 4,
    "days_per_week": 4,
    "equipment": "跳绳,弹力带",
    "coach": "陈教练",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "有氧长跑",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "3分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "3分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "间歇跑训练",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "有氧耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "有氧长跑",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "3分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "3分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "间歇跑训练",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "有氧耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "有氧长跑",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "3分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "3分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "间歇跑训练",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "有氧耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "有氧长跑",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "3分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "3分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "间歇跑训练",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 4,
                "reps": "30秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "30秒",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "有氧耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  },
  {
    "id": 8,
    "title": "8周耐力进阶计划",
    "description": "中阶耐力提升计划，每周训练5天。训练以有氧为核心，加入更多间歇训练和功能性力量动作。通过逐步提高训练时长和强度，有效提升最大摄氧量和乳酸阈值。包含长跑、间歇跑、战绳循环等多样化训练内容，适合希望突破耐力瓶颈的训练者。",
    "goal": "endurance",
    "level": "intermediate",
    "duration_weeks": 8,
    "days_per_week": 5,
    "equipment": "跳绳,壶铃,弹力带",
    "coach": "陈教练",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "长跑耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 2,
            "title": "间歇跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "变速跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 6,
                "reps": "1分钟",
                "rest": 30,
                "notes": "变速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "长跑耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 2,
            "title": "间歇跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "变速跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 6,
                "reps": "1分钟",
                "rest": 30,
                "notes": "变速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "长跑耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 2,
            "title": "间歇跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "变速跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 6,
                "reps": "1分钟",
                "rest": 30,
                "notes": "变速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "长跑耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 2,
            "title": "间歇跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "变速跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 6,
                "reps": "1分钟",
                "rest": 30,
                "notes": "变速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 5,
        "days": [
          {
            "day": 1,
            "title": "长跑耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 2,
            "title": "间歇跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "变速跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 6,
                "reps": "1分钟",
                "rest": 30,
                "notes": "变速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 6,
        "days": [
          {
            "day": 1,
            "title": "长跑耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 2,
            "title": "间歇跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "变速跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 6,
                "reps": "1分钟",
                "rest": 30,
                "notes": "变速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 7,
        "days": [
          {
            "day": 1,
            "title": "长跑耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 2,
            "title": "间歇跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "变速跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 6,
                "reps": "1分钟",
                "rest": 30,
                "notes": "变速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 8,
        "days": [
          {
            "day": 1,
            "title": "长跑耐力",
            "warmup": "5分钟快走 + 动态拉伸",
            "exercises": [
              {
                "name": "开合跳",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "热身",
                "video_url": ""
              },
              {
                "name": "高抬腿",
                "sets": 1,
                "reps": "5分钟",
                "rest": 0,
                "notes": "激活",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 2,
            "title": "间歇跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "冲刺",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "登山跑",
                "sets": 5,
                "reps": "45秒",
                "rest": 30,
                "notes": "快速",
                "video_url": ""
              },
              {
                "name": "波比跳",
                "sets": 3,
                "reps": "10次",
                "rest": 90,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸 + 放松"
          },
          {
            "day": 3,
            "title": "力量辅助",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "20次",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "变速跑",
            "warmup": "5分钟慢跑 + 动态拉伸",
            "exercises": [
              {
                "name": "高抬腿",
                "sets": 6,
                "reps": "1分钟",
                "rest": 30,
                "notes": "变速",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "2分钟",
                "rest": 60,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "跳绳",
                "sets": 3,
                "reps": "3分钟",
                "rest": 60,
                "notes": "节奏",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "50米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "速度",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "战绳",
                "sets": 3,
                "reps": "45秒",
                "rest": 60,
                "notes": "爆发",
                "video_url": ""
              },
              {
                "name": "熊爬",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  },
  {
    "id": 9,
    "title": "4周柔韧入门计划",
    "description": "专为改善身体柔韧性设计的4周瑜伽入门计划。每周训练3天，以瑜伽体式、静态拉伸和轻量力量训练为主。动作以低强度、长时间保持为特点，重点改善髋部、肩背和下肢的柔韧性。配合呼吸练习放松身心，适合久坐人群和瑜伽初学者。",
    "goal": "flexibility",
    "level": "beginner",
    "duration_weeks": 4,
    "days_per_week": 3,
    "equipment": "瑜伽垫,弹力带",
    "coach": "刘瑜伽师",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "瑜伽流A-髋腿伸展",
            "warmup": "5分钟深呼吸 + 颈部环绕",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "缓慢下蹲",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "髋部下沉",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "顶峰保持3秒",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "核心稳定",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 30,
                "notes": "腰部贴地",
                "video_url": ""
              }
            ],
            "cooldown": "髋屈肌拉伸60秒 + 腘绳肌拉伸60秒 + 臀肌拉伸60秒"
          },
          {
            "day": 2,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 3,
            "title": "瑜伽流B-肩背伸展",
            "warmup": "5分钟深呼吸 + 肩部环绕",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 2,
                "reps": "8-10次",
                "rest": 45,
                "notes": "缓慢控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 2,
                "reps": "12-15次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "肩胛后收",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 30,
                "notes": "脊柱稳定",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 2,
                "reps": "20秒",
                "rest": 30,
                "notes": "侧腹",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸60秒 + 胸大肌拉伸60秒 + 三角肌拉伸60秒"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身放松拉伸",
            "warmup": "5分钟冥想 + 深呼吸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "深度放松",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 2,
                "reps": "15次",
                "rest": 30,
                "notes": "缓慢控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "呼吸均匀",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "轻重量",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "瑜伽流A-髋腿伸展",
            "warmup": "5分钟深呼吸 + 颈部环绕",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "缓慢下蹲",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "髋部下沉",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "顶峰保持3秒",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "核心稳定",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 30,
                "notes": "腰部贴地",
                "video_url": ""
              }
            ],
            "cooldown": "髋屈肌拉伸60秒 + 腘绳肌拉伸60秒 + 臀肌拉伸60秒"
          },
          {
            "day": 2,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 3,
            "title": "瑜伽流B-肩背伸展",
            "warmup": "5分钟深呼吸 + 肩部环绕",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 2,
                "reps": "8-10次",
                "rest": 45,
                "notes": "缓慢控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 2,
                "reps": "12-15次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "肩胛后收",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 30,
                "notes": "脊柱稳定",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 2,
                "reps": "20秒",
                "rest": 30,
                "notes": "侧腹",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸60秒 + 胸大肌拉伸60秒 + 三角肌拉伸60秒"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身放松拉伸",
            "warmup": "5分钟冥想 + 深呼吸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "深度放松",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 2,
                "reps": "15次",
                "rest": 30,
                "notes": "缓慢控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "呼吸均匀",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "轻重量",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "瑜伽流A-髋腿伸展",
            "warmup": "5分钟深呼吸 + 颈部环绕",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "缓慢下蹲",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "髋部下沉",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "顶峰保持3秒",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "核心稳定",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 30,
                "notes": "腰部贴地",
                "video_url": ""
              }
            ],
            "cooldown": "髋屈肌拉伸60秒 + 腘绳肌拉伸60秒 + 臀肌拉伸60秒"
          },
          {
            "day": 2,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 3,
            "title": "瑜伽流B-肩背伸展",
            "warmup": "5分钟深呼吸 + 肩部环绕",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 2,
                "reps": "8-10次",
                "rest": 45,
                "notes": "缓慢控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 2,
                "reps": "12-15次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "肩胛后收",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 30,
                "notes": "脊柱稳定",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 2,
                "reps": "20秒",
                "rest": 30,
                "notes": "侧腹",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸60秒 + 胸大肌拉伸60秒 + 三角肌拉伸60秒"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身放松拉伸",
            "warmup": "5分钟冥想 + 深呼吸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "深度放松",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 2,
                "reps": "15次",
                "rest": 30,
                "notes": "缓慢控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "呼吸均匀",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "轻重量",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "瑜伽流A-髋腿伸展",
            "warmup": "5分钟深呼吸 + 颈部环绕",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "缓慢下蹲",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "髋部下沉",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "顶峰保持3秒",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "核心稳定",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 30,
                "notes": "腰部贴地",
                "video_url": ""
              }
            ],
            "cooldown": "髋屈肌拉伸60秒 + 腘绳肌拉伸60秒 + 臀肌拉伸60秒"
          },
          {
            "day": 2,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 3,
            "title": "瑜伽流B-肩背伸展",
            "warmup": "5分钟深呼吸 + 肩部环绕",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 2,
                "reps": "8-10次",
                "rest": 45,
                "notes": "缓慢控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 2,
                "reps": "12-15次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "肩胛后收",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 30,
                "notes": "脊柱稳定",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 2,
                "reps": "20秒",
                "rest": 30,
                "notes": "侧腹",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸60秒 + 胸大肌拉伸60秒 + 三角肌拉伸60秒"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身放松拉伸",
            "warmup": "5分钟冥想 + 深呼吸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "深度放松",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 2,
                "reps": "15次",
                "rest": 30,
                "notes": "缓慢控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "呼吸均匀",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 2,
                "reps": "10次",
                "rest": 45,
                "notes": "轻重量",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  },
  {
    "id": 10,
    "title": "6周柔韧进阶计划",
    "description": "中阶柔韧性提升计划，每周训练4天。在初级基础上增加训练频率和动作难度，引入更多进阶瑜伽体式和动态拉伸。通过系统训练提升关节活动度和肌肉弹性，改善身体姿态。配合核心稳定性训练，帮助在更大活动范围内保持控制力。",
    "goal": "flexibility",
    "level": "intermediate",
    "duration_weeks": 6,
    "days_per_week": 4,
    "equipment": "瑜伽垫,弹力带",
    "coach": "刘瑜伽师",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "瑜伽流A-髋腿深度",
            "warmup": "5分钟深呼吸 + 髋部环绕",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "缓慢到底",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 45,
                "notes": "髋部下沉",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 45,
                "notes": "深度拉伸",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "顶峰保持5秒",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "腰部贴地",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "核心稳定",
                "video_url": ""
              }
            ],
            "cooldown": "髋屈肌拉伸90秒 + 腘绳肌拉伸90秒 + 臀肌拉伸90秒"
          },
          {
            "day": 2,
            "title": "瑜伽流B-肩背深度",
            "warmup": "5分钟深呼吸 + 肩胛激活",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "全程控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "后束发力",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "旋转拉伸",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "脊柱稳定",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "侧腹",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸90秒 + 胸大肌拉伸90秒 + 三角肌拉伸90秒"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "核心+脊柱",
            "warmup": "5分钟冥想 + 脊柱滚动",
            "exercises": [
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15次",
                "rest": 30,
                "notes": "缓慢卷起",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 30,
                "notes": "控制旋转",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 2,
                "reps": "8-10次",
                "rest": 45,
                "notes": "轻量",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "稳定",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 2,
                "reps": "6-8次",
                "rest": 45,
                "notes": "控制幅度",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "下背拉伸",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸60秒 + 下背拉伸60秒 + 侧腰拉伸60秒"
          },
          {
            "day": 5,
            "title": "全身流动",
            "warmup": "5分钟深呼吸 + 全身摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 45,
                "notes": "流动",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10次",
                "rest": 45,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "轻重量",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "呼吸",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "髋部",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "瑜伽流A-髋腿深度",
            "warmup": "5分钟深呼吸 + 髋部环绕",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "缓慢到底",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 45,
                "notes": "髋部下沉",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 45,
                "notes": "深度拉伸",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "顶峰保持5秒",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "腰部贴地",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "核心稳定",
                "video_url": ""
              }
            ],
            "cooldown": "髋屈肌拉伸90秒 + 腘绳肌拉伸90秒 + 臀肌拉伸90秒"
          },
          {
            "day": 2,
            "title": "瑜伽流B-肩背深度",
            "warmup": "5分钟深呼吸 + 肩胛激活",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "全程控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "后束发力",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "旋转拉伸",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "脊柱稳定",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "侧腹",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸90秒 + 胸大肌拉伸90秒 + 三角肌拉伸90秒"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "核心+脊柱",
            "warmup": "5分钟冥想 + 脊柱滚动",
            "exercises": [
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15次",
                "rest": 30,
                "notes": "缓慢卷起",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 30,
                "notes": "控制旋转",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 2,
                "reps": "8-10次",
                "rest": 45,
                "notes": "轻量",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "稳定",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 2,
                "reps": "6-8次",
                "rest": 45,
                "notes": "控制幅度",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "下背拉伸",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸60秒 + 下背拉伸60秒 + 侧腰拉伸60秒"
          },
          {
            "day": 5,
            "title": "全身流动",
            "warmup": "5分钟深呼吸 + 全身摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 45,
                "notes": "流动",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10次",
                "rest": 45,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "轻重量",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "呼吸",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "髋部",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "瑜伽流A-髋腿深度",
            "warmup": "5分钟深呼吸 + 髋部环绕",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "缓慢到底",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 45,
                "notes": "髋部下沉",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 45,
                "notes": "深度拉伸",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "顶峰保持5秒",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "腰部贴地",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "核心稳定",
                "video_url": ""
              }
            ],
            "cooldown": "髋屈肌拉伸90秒 + 腘绳肌拉伸90秒 + 臀肌拉伸90秒"
          },
          {
            "day": 2,
            "title": "瑜伽流B-肩背深度",
            "warmup": "5分钟深呼吸 + 肩胛激活",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "全程控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "后束发力",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "旋转拉伸",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "脊柱稳定",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "侧腹",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸90秒 + 胸大肌拉伸90秒 + 三角肌拉伸90秒"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "核心+脊柱",
            "warmup": "5分钟冥想 + 脊柱滚动",
            "exercises": [
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15次",
                "rest": 30,
                "notes": "缓慢卷起",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 30,
                "notes": "控制旋转",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 2,
                "reps": "8-10次",
                "rest": 45,
                "notes": "轻量",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "稳定",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 2,
                "reps": "6-8次",
                "rest": 45,
                "notes": "控制幅度",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "下背拉伸",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸60秒 + 下背拉伸60秒 + 侧腰拉伸60秒"
          },
          {
            "day": 5,
            "title": "全身流动",
            "warmup": "5分钟深呼吸 + 全身摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 45,
                "notes": "流动",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10次",
                "rest": 45,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "轻重量",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "呼吸",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "髋部",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "瑜伽流A-髋腿深度",
            "warmup": "5分钟深呼吸 + 髋部环绕",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "缓慢到底",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 45,
                "notes": "髋部下沉",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 45,
                "notes": "深度拉伸",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "顶峰保持5秒",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "腰部贴地",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "核心稳定",
                "video_url": ""
              }
            ],
            "cooldown": "髋屈肌拉伸90秒 + 腘绳肌拉伸90秒 + 臀肌拉伸90秒"
          },
          {
            "day": 2,
            "title": "瑜伽流B-肩背深度",
            "warmup": "5分钟深呼吸 + 肩胛激活",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "全程控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "后束发力",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "旋转拉伸",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "脊柱稳定",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "侧腹",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸90秒 + 胸大肌拉伸90秒 + 三角肌拉伸90秒"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "核心+脊柱",
            "warmup": "5分钟冥想 + 脊柱滚动",
            "exercises": [
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15次",
                "rest": 30,
                "notes": "缓慢卷起",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 30,
                "notes": "控制旋转",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 2,
                "reps": "8-10次",
                "rest": 45,
                "notes": "轻量",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "稳定",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 2,
                "reps": "6-8次",
                "rest": 45,
                "notes": "控制幅度",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "下背拉伸",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸60秒 + 下背拉伸60秒 + 侧腰拉伸60秒"
          },
          {
            "day": 5,
            "title": "全身流动",
            "warmup": "5分钟深呼吸 + 全身摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 45,
                "notes": "流动",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10次",
                "rest": 45,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "轻重量",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "呼吸",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "髋部",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 5,
        "days": [
          {
            "day": 1,
            "title": "瑜伽流A-髋腿深度",
            "warmup": "5分钟深呼吸 + 髋部环绕",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "缓慢到底",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 45,
                "notes": "髋部下沉",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 45,
                "notes": "深度拉伸",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "顶峰保持5秒",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "腰部贴地",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "核心稳定",
                "video_url": ""
              }
            ],
            "cooldown": "髋屈肌拉伸90秒 + 腘绳肌拉伸90秒 + 臀肌拉伸90秒"
          },
          {
            "day": 2,
            "title": "瑜伽流B-肩背深度",
            "warmup": "5分钟深呼吸 + 肩胛激活",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "全程控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "后束发力",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "旋转拉伸",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "脊柱稳定",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "侧腹",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸90秒 + 胸大肌拉伸90秒 + 三角肌拉伸90秒"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "核心+脊柱",
            "warmup": "5分钟冥想 + 脊柱滚动",
            "exercises": [
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15次",
                "rest": 30,
                "notes": "缓慢卷起",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 30,
                "notes": "控制旋转",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 2,
                "reps": "8-10次",
                "rest": 45,
                "notes": "轻量",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "稳定",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 2,
                "reps": "6-8次",
                "rest": 45,
                "notes": "控制幅度",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "下背拉伸",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸60秒 + 下背拉伸60秒 + 侧腰拉伸60秒"
          },
          {
            "day": 5,
            "title": "全身流动",
            "warmup": "5分钟深呼吸 + 全身摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 45,
                "notes": "流动",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10次",
                "rest": 45,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "轻重量",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "呼吸",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "髋部",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 6,
        "days": [
          {
            "day": 1,
            "title": "瑜伽流A-髋腿深度",
            "warmup": "5分钟深呼吸 + 髋部环绕",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "缓慢到底",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 45,
                "notes": "髋部下沉",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 2,
                "reps": "每侧8次",
                "rest": 45,
                "notes": "深度拉伸",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 45,
                "notes": "顶峰保持5秒",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "腰部贴地",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "核心稳定",
                "video_url": ""
              }
            ],
            "cooldown": "髋屈肌拉伸90秒 + 腘绳肌拉伸90秒 + 臀肌拉伸90秒"
          },
          {
            "day": 2,
            "title": "瑜伽流B-肩背深度",
            "warmup": "5分钟深呼吸 + 肩胛激活",
            "exercises": [
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-12次",
                "rest": 45,
                "notes": "全程控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "12-15次",
                "rest": 45,
                "notes": "轻重量拉伸",
                "video_url": ""
              },
              {
                "name": "面拉",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "后束发力",
                "video_url": ""
              },
              {
                "name": "单臂哑铃划船",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "旋转拉伸",
                "video_url": ""
              },
              {
                "name": "鸟狗式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "脊柱稳定",
                "video_url": ""
              },
              {
                "name": "侧平板支撑",
                "sets": 2,
                "reps": "30秒",
                "rest": 30,
                "notes": "侧腹",
                "video_url": ""
              }
            ],
            "cooldown": "背阔肌拉伸90秒 + 胸大肌拉伸90秒 + 三角肌拉伸90秒"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "核心+脊柱",
            "warmup": "5分钟冥想 + 脊柱滚动",
            "exercises": [
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15次",
                "rest": 30,
                "notes": "缓慢卷起",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 30,
                "notes": "控制旋转",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 2,
                "reps": "8-10次",
                "rest": 45,
                "notes": "轻量",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 2,
                "reps": "每侧10次",
                "rest": 30,
                "notes": "稳定",
                "video_url": ""
              },
              {
                "name": "健腹轮",
                "sets": 2,
                "reps": "6-8次",
                "rest": 45,
                "notes": "控制幅度",
                "video_url": ""
              },
              {
                "name": "山羊挺身",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "下背拉伸",
                "video_url": ""
              }
            ],
            "cooldown": "腹部拉伸60秒 + 下背拉伸60秒 + 侧腰拉伸60秒"
          },
          {
            "day": 5,
            "title": "全身流动",
            "warmup": "5分钟深呼吸 + 全身摆动",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "12次",
                "rest": 45,
                "notes": "流动",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10次",
                "rest": 45,
                "notes": "拉伸",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "轻重量",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 2,
                "reps": "15次",
                "rest": 45,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 2,
                "reps": "45秒",
                "rest": 30,
                "notes": "呼吸",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 2,
                "reps": "12次",
                "rest": 45,
                "notes": "髋部",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸15分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  },
  {
    "id": 11,
    "title": "4周综合入门计划",
    "description": "全面提升身体素质的4周入门计划。每周训练4天，力量、有氧和核心训练均衡发展。采用全身性复合动作建立基础力量，配合跳绳等有氧训练提升心肺，核心动作增强躯干稳定性。适合希望全面提升体能、不追求专项突破的健身初学者。",
    "goal": "general",
    "level": "beginner",
    "duration_weeks": 4,
    "days_per_week": 4,
    "equipment": "哑铃,弹力带,跳绳",
    "coach": "李教练",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "全身力量A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "上腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "全身力量A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "上腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "全身力量A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "上腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "全身力量A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "全程",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "30-45秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 2,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "15分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "卷腹",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "上腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 3,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 4,
            "title": "全身力量B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 5,
            "title": "全身循环",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "12次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "30米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  },
  {
    "id": 12,
    "title": "8周综合进阶计划",
    "description": "中阶综合体能提升计划，每周训练5天。在初级基础上增加训练量和动作多样性，采用上下半身分化结合全身循环的训练模式。力量、有氧和核心训练更加均衡深入，全面提升力量、耐力和灵活性。适合希望拥有全面运动能力的健身爱好者。",
    "goal": "general",
    "level": "intermediate",
    "duration_weeks": 8,
    "days_per_week": 5,
    "equipment": "哑铃,杠铃,壶铃,跳绳",
    "coach": "张教练",
    "syllabus": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "title": "上半身力量",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "背部挺直",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸10分钟"
          },
          {
            "day": 2,
            "title": "下半身力量",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸10分钟"
          },
          {
            "day": 3,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "全身循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "6-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 2,
        "days": [
          {
            "day": 1,
            "title": "上半身力量",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "背部挺直",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸10分钟"
          },
          {
            "day": 2,
            "title": "下半身力量",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸10分钟"
          },
          {
            "day": 3,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "全身循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "6-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 3,
        "days": [
          {
            "day": 1,
            "title": "上半身力量",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "背部挺直",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸10分钟"
          },
          {
            "day": 2,
            "title": "下半身力量",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸10分钟"
          },
          {
            "day": 3,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "全身循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "6-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 4,
        "days": [
          {
            "day": 1,
            "title": "上半身力量",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "背部挺直",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸10分钟"
          },
          {
            "day": 2,
            "title": "下半身力量",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸10分钟"
          },
          {
            "day": 3,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "全身循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "6-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 5,
        "days": [
          {
            "day": 1,
            "title": "上半身力量",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "背部挺直",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸10分钟"
          },
          {
            "day": 2,
            "title": "下半身力量",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸10分钟"
          },
          {
            "day": 3,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "全身循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "6-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 6,
        "days": [
          {
            "day": 1,
            "title": "上半身力量",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "背部挺直",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸10分钟"
          },
          {
            "day": 2,
            "title": "下半身力量",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸10分钟"
          },
          {
            "day": 3,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "全身循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "6-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 7,
        "days": [
          {
            "day": 1,
            "title": "上半身力量",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "背部挺直",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸10分钟"
          },
          {
            "day": 2,
            "title": "下半身力量",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸10分钟"
          },
          {
            "day": 3,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "全身循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "6-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      },
      {
        "week": 8,
        "days": [
          {
            "day": 1,
            "title": "上半身力量",
            "warmup": "5分钟划船机 + 动态拉伸",
            "exercises": [
              {
                "name": "杠铃卧推",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "高位下拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "哑铃推举",
                "sets": 3,
                "reps": "8-12次",
                "rest": 75,
                "notes": "核心收紧",
                "video_url": ""
              },
              {
                "name": "杠铃划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "背部挺直",
                "video_url": ""
              },
              {
                "name": "绳索下压",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "三头",
                "video_url": ""
              }
            ],
            "cooldown": "上半身拉伸10分钟"
          },
          {
            "day": 2,
            "title": "下半身力量",
            "warmup": "5分钟单车 + 动态拉伸",
            "exercises": [
              {
                "name": "深蹲",
                "sets": 3,
                "reps": "8-12次",
                "rest": 90,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "罗马尼亚硬拉",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "腘绳肌",
                "video_url": ""
              },
              {
                "name": "腿举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 75,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "保加利亚分腿蹲",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 60,
                "notes": "负重",
                "video_url": ""
              },
              {
                "name": "站姿提踵",
                "sets": 3,
                "reps": "15-20次",
                "rest": 45,
                "notes": "小腿",
                "video_url": ""
              }
            ],
            "cooldown": "下肢拉伸10分钟"
          },
          {
            "day": 3,
            "title": "有氧+核心",
            "warmup": "5分钟慢跑 + 核心激活",
            "exercises": [
              {
                "name": "跳绳",
                "sets": 1,
                "reps": "20分钟",
                "rest": 0,
                "notes": "保持节奏",
                "video_url": ""
              },
              {
                "name": "悬垂举腿",
                "sets": 3,
                "reps": "10-12次",
                "rest": 60,
                "notes": "下腹",
                "video_url": ""
              },
              {
                "name": "俄罗斯转体",
                "sets": 3,
                "reps": "20次",
                "rest": 45,
                "notes": "腹斜肌",
                "video_url": ""
              },
              {
                "name": "平板支撑",
                "sets": 3,
                "reps": "45-60秒",
                "rest": 45,
                "notes": "核心",
                "video_url": ""
              },
              {
                "name": "死虫式",
                "sets": 3,
                "reps": "每侧10次",
                "rest": 45,
                "notes": "稳定",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 4,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          },
          {
            "day": 5,
            "title": "全身循环A",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "上斜卧推",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "上胸",
                "video_url": ""
              },
              {
                "name": "坐姿划船",
                "sets": 3,
                "reps": "10-12次",
                "rest": 75,
                "notes": "后收",
                "video_url": ""
              },
              {
                "name": "箭步蹲",
                "sets": 3,
                "reps": "每侧12次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "侧平举",
                "sets": 3,
                "reps": "12-15次",
                "rest": 60,
                "notes": "控制",
                "video_url": ""
              },
              {
                "name": "壶铃摆荡",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "髋部发力",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 6,
            "title": "全身循环B",
            "warmup": "5分钟跳绳 + 动态拉伸",
            "exercises": [
              {
                "name": "硬拉",
                "sets": 3,
                "reps": "6-8次",
                "rest": 120,
                "notes": "大重量",
                "video_url": ""
              },
              {
                "name": "俯卧撑",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "深度",
                "video_url": ""
              },
              {
                "name": "臀桥",
                "sets": 3,
                "reps": "15次",
                "rest": 60,
                "notes": "顶峰收缩",
                "video_url": ""
              },
              {
                "name": "开合跳",
                "sets": 3,
                "reps": "1分钟",
                "rest": 45,
                "notes": "有氧",
                "video_url": ""
              },
              {
                "name": "农夫行走",
                "sets": 3,
                "reps": "40米",
                "rest": 60,
                "notes": " grip",
                "video_url": ""
              }
            ],
            "cooldown": "全身静态拉伸10分钟"
          },
          {
            "day": 7,
            "title": "休息日",
            "warmup": "",
            "exercises": [],
            "cooldown": ""
          }
        ]
      }
    ]
  }
];

module.exports = trainingPlans;
