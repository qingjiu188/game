// 游戏数据 - 所有卡池信息

const gameData = {
    // 常驻池
    permanent: {
        name: "常驻卡池",
        ssr: [
            { name: "午后小憩", character: "艾因" },
            { name: "黑色战车", character: "艾因" },
            { name: "往昔之囚", character: "艾因" },
            { name: "天空之城", character: "路辰" },
            { name: "星辰破碎", character: "路辰" },
            { name: "静夜思绪", character: "路辰" },
            { name: "上流社会", character: "罗夏" },
            { name: "狮子大猫", character: "罗夏" },
            { name: "北地少主", character: "罗夏" },
            { name: "猫咪停驻", character: "司岚" },
            { name: "冰蝶环绕", character: "司岚" },
            { name: "责任之牢", character: "司岚" },
            { name: "执棋者", character: "叶瑄" },
            { name: "月与晨星", character: "路辰" },
            { name: "星与彩虹", character: "叶瑄" }
        ],
        sr: [
            { name: "夜色霓虹", character: "艾因" },
            { name: "庭院相逢", character: "艾因" },
            { name: "明日荣光", character: "艾因" },
            { name: "锋芒毕露", character: "艾因" },
            { name: "雪地孤狼", character: "艾因" },
            { name: "水之私语", character: "艾因" },
            { name: "盛装舞步", character: "艾因" },
            { name: "花与锁链", character: "艾因" },
            { name: "电子猫", character: "艾因" },
            { name: "丝路清音", character: "艾因" },
            { name: "白棋骑士", character: "路辰" },
            { name: "观星者", character: "路辰" },
            { name: "布偶猫", character: "路辰" },
            { name: "高塔传承", character: "路辰" },
            { name: "荆棘之笼", character: "路辰" },
            { name: "宴会之遇", character: "路辰" },
            { name: "风之航路", character: "路辰" },
            { name: "庆典晨光", character: "路辰" },
            { name: "晨与昏", character: "路辰" },
            { name: "静候春归", character: "罗夏" },
            { name: "自然气息", character: "罗夏" },
            { name: "棋局之王", character: "罗夏" },
            { name: "马球公子", character: "罗夏" },
            { name: "香槟玫瑰", character: "罗夏" },
            { name: "鲜花巷口", character: "罗夏" },
            { name: "雪与远方", character: "罗夏" },
            { name: "温泉密会", character: "罗夏" },
            { name: "雪与火焰", character: "罗夏" },
            { name: "黄金之槛", character: "罗夏" },
            { name: "登临", character: "罗夏" },
            { name: "道馆练习", character: "司岚" },
            { name: "记忆长河", character: "司岚" },
            { name: "律令之长", character: "司岚" },
            { name: "阅读者", character: "司岚" },
            { name: "指尖光华", character: "司岚" },
            { name: "临泽", character: "司岚" },
            { name: "求索", character: "司岚" },
            { name: "欧洲纪行", character: "司岚" },
            { name: "嘤嘤鸟鸣", character: "司岚" },
            { name: "冰湖之誓", character: "司岚" },
            { name: "紫藤花下", character: "叶瑄" },
            { name: "静心阅读", character: "叶瑄" },
            { name: "温雅侍从", character: "叶瑄" },
            { name: "专属执事", character: "路辰" },
            { name: "女仆服务", character: "陈子涵" }
        ],
        r: [
            { name: "战之时", character: "艾因" },
            { name: "小王子", character: "艾因" },
            { name: "倾心音律", character: "艾因" },
            { name: "树下回眸", character: "艾因" },
            { name: "王冠之重", character: "艾因" },
            { name: "镜像风景", character: "路辰" },
            { name: "青青草地", character: "路辰" },
            { name: "晋升之刻", character: "路辰" },
            { name: "雪地引路", character: "路辰" },
            { name: "星之愈", character: "路辰" },
            { name: "泉水叮咚", character: "路辰" },
            { name: "晴风", character: "路辰" },
            { name: "闲暇时光", character: "罗夏" },
            { name: "财团演说", character: "罗夏" },
            { name: "驰骋", character: "罗夏" },
            { name: "来跳舞吧", character: "罗夏" },
            { name: "睡眼惺忪", character: "罗夏" },
            { name: "临时模特", character: "司岚" },
            { name: "休息时间", character: "司岚" },
            { name: "实习工作", character: "司岚" },
            { name: "代价", character: "司岚" },
            { name: "遗落枫叶", character: "司岚" },
            { name: "暮之海", character: "叶瑄" },
            { name: "大白", character: "叶瑄" },
            { name: "静谧海岛", character: "叶瑄" },
            { name: "临别赠礼", character: "叶瑄" },
            { name: "小径回眸", character: "叶瑄" },
            { name: "聚光灯下", character: "艾莉丝" },
            { name: "祈愿", character: "苏西" },
            { name: "足球小子", character: "陈子涵" },
            { name: "网球小将", character: "封君皓" }
        ]
    },

    // 限定池
    limited: {
        "庄园诡戏": {
            ssr: [
                { name: "坠时伪生", character: "艾因" },
                { name: "心渊渡梦", character: "路辰" },
                { name: "明日将至", character: "罗夏" },
                { name: "不归漫流", character: "司岚" },
                { name: "永无匣子", character: "叶瑄" }
            ]
        },
        "书中童话：魔女的冒险": {
            ssr: [
                { name: "兔子茶会", character: "艾因" },
                { name: "夜莺玫瑰", character: "路辰" },
                { name: "深海之心", character: "司岚" },
                { name: "远大梦想", character: "罗夏" },
                { name: "冰雪镜灯", character: "叶瑄" }
            ]
        },
        "书中童话II：魔女的复苏": {
            ssr: [
                { name: "不熔锡心", character: "路辰" },
                { name: "未完棋局", character: "罗夏" }
            ]
        },
        "命运回廊": {
            ssr: [
                { name: "乐梦人间", character: "艾因" },
                { name: "一往而深", character: "路辰" },
                { name: "命定城堡", character: "罗夏" },
                { name: "匣中心约", character: "司岚" },
                { name: "凡尘烟火", character: "叶瑄" }
            ]
        },
        "天若有情·千秋渡": {
            ssr: [
                { name: "天若有情", character: "艾因" },
                { name: "又见青山", character: "路辰" },
                { name: "万象浮生", character: "罗夏" },
                { name: "刹那芳华", character: "司岚" },
                { name: "四时如歌", character: "叶瑄" }
            ]
        },
        "雾隐都市": {
            ssr: [
                { name: "予我之名", character: "艾因" },
                { name: "心茧迷境", character: "路辰" },
                { name: "光暗两辨", character: "罗夏" },
                { name: "深匿寂影", character: "司岚" },
                { name: "簇梦新息", character: "叶瑄" }
            ]
        },
        "瑰梦奇境·上篇": {
            ssr: [
                { name: "万籁绝响", character: "艾因" },
                { name: "渡越辉空", character: "司岚" }
            ]
        },
        "瑰梦奇境·下篇": {
            ssr: [
                { name: "深幕呢喃", character: "路辰" },
                { name: "直至诸海", character: "罗夏" },
                { name: "星陨绮梦", character: "叶瑄" }
            ]
        },
        "二分的荆棘路": {
            ssr: [
                { name: "何所归去", character: "艾因" },
                { name: "长风遗诏", character: "罗夏" }
            ]
        },
        "醉梦浮汤": {
            ssr: [
                { name: "目及唯你", character: "艾因" },
                { name: "清梦入怀", character: "路辰" },
                { name: "迷濛心动", character: "罗夏" },
                { name: "温澜潮生", character: "司岚" },
                { name: "暖雾长情", character: "叶瑄" }
            ]
        },
        "神陨纪元·第一阶段": {
            ssr: [
                { name: "神使指令", character: "司岚" },
                { name: "完型生命", character: "艾因" },
                { name: "醒狮年代", character: "罗夏" }
            ]
        },
        "神陨纪元·第二阶段": {
            ssr: [
                { name: "终极解析", character: "路辰" },
                { name: "日光融雪", character: "叶瑄" }
            ]
        },
        "理想乡的黄昏": {
            ssr: [
                { name: "踏我前行", character: "路辰" },
                { name: "未化之茧", character: "司岚" }
            ]
        },
        "目标：战争都市": {
            ssr: [
                { name: "遗落战迹", character: "路辰" },
                { name: "猎隼之刃", character: "司岚" },
                { name: "金属狂潮", character: "罗夏" },
                { name: "霓虹光影", character: "艾因" }
            ]
        },
        "今夕长相守": {
            ssr: [
                { name: "霜刃寒", character: "艾因" },
                { name: "十里莲华", character: "罗夏" },
                { name: "花开盛时", character: "叶瑄" },
                { name: "云水间", character: "司岚" }
            ]
        },
        "与卿书": {
            ssr: [
                { name: "生死与君同", character: "艾因" },
                { name: "但使飞将在", character: "路辰" },
                { name: "挥洒合昏昼", character: "罗夏" },
                { name: "照室红龙鸾", character: "司岚" },
                { name: "若算机筹处", character: "叶瑄" }
            ]
        },
        "湛蓝海岛": {
            ssr: [
                { name: "白桃苏打", character: "艾因" },
                { name: "运动奶橙", character: "路辰" },
                { name: "草莓圣代", character: "叶瑄" },
                { name: "西瓜冰沙", character: "司岚" },
                { name: "冰椰海盐", character: "罗夏" }
            ]
        },
        "圣塞西尔魔法学院·上篇": {
            ssr: [
                { name: "霜糖魔影", character: "艾因" },
                { name: "翔翼晴霄", character: "罗夏" }
            ]
        },
        "圣塞西尔魔法学院·下篇": {
            ssr: [
                { name: "折叠世界", character: "路辰" },
                { name: "空谷回响", character: "司岚" },
                { name: "霰雪无垠", character: "叶瑄" }
            ]
        },
        "遗落的血脉": {
            ssr: [
                { name: "光明纪元", character: "罗夏" },
                { name: "悼海千川", character: "司岚" },
                { name: "群狼夜歌", character: "艾因" },
                { name: "悖反迷局", character: "叶瑄" },
                { name: "心海缠藤", character: "路辰" }
            ]
        },
        "绘梦平安京": {
            ssr: [
                { name: "戏面云烟", character: "艾因" },
                { name: "心初天净", character: "路辰" },
                { name: "江山渡火", character: "罗夏" },
                { name: "苍海樱流", character: "司岚" },
                { name: "祭舞形华", character: "叶瑄" }
            ]
        },
        "诸界归一": {
            ssr: [
                { name: "憾恨之世", character: "艾因" },
                { name: "不凋华庭", character: "路辰" },
                { name: "逸乐飨宴", character: "罗夏" },
                { name: "永恒不灭", character: "司岚" },
                { name: "落幕华章", character: "叶瑄" }
            ]
        },
        "录异记": {
            ssr: [
                { name: "翔于千仞", character: "艾因" },
                { name: "青丘月远", character: "路辰" },
                { name: "徒梦生花", character: "罗夏" },
                { name: "溟海潜歌", character: "司岚" },
                { name: "于风衔愿", character: "叶瑄" }
            ]
        },
        "珠宝之心": {
            ssr: [
                { name: "盛心永燃", character: "艾因" },
                { name: "致伊甸", character: "路辰" },
                { name: "第十二夜", character: "罗夏" },
                { name: "二律背反", character: "司岚" },
                { name: "惑色匿踪", character: "叶瑄" }
            ]
        },
        "漫长的箴言": {
            ssr: [
                { name: "天幕行旅", character: "艾因" },
                { name: "黎明乍泄", character: "路辰" },
                { name: "情定日落", character: "罗夏" },
                { name: "穹歌无辩", character: "司岚" },
                { name: "贪恋天国", character: "叶瑄" }
            ]
        },
        "漆灯夜照": {
            ssr: [
                { name: "执迷蛊心", character: "艾因" },
                { name: "冥逢幽路", character: "路辰" },
                { name: "尽处天光", character: "罗夏" },
                { name: "六出诡事", character: "司岚" },
                { name: "人间不识", character: "叶瑄" }
            ]
        },
        "人间画外": {
            ssr: [
                { name: "焚枝犹灵窍", character: "艾因" },
                { name: "绿玉弄疏影", character: "路辰" },
                { name: "南浦待君归", character: "罗夏" },
                { name: "并蒂尽河清", character: "司岚" },
                { name: "幽客映梦鸣", character: "叶瑄" }
            ]
        },
        "繁花之吻": {
            ssr: [
                { name: "悸动余音", character: "艾因" },
                { name: "不纯物", character: "路辰" },
                { name: "樊棘笼月", character: "罗夏" },
                { name: "葳蕤生光", character: "司岚" },
                { name: "极乐之渊", character: "叶瑄" }
            ]
        },
        "罪印残响": {
            ssr: [
                { name: "惊痛奇观", character: "艾因" },
                { name: "宵暗之渊", character: "路辰" },
                { name: "睚眦执刃", character: "罗夏" },
                { name: "无餍无终", character: "司岚" },
                { name: "永劫轮回", character: "叶瑄" }
            ]
        },
        "昨日晴空": {
            ssr: [
                { name: "游鲸频率", character: "艾因" },
                { name: "触光可及", character: "路辰" },
                { name: "清晓雏声", character: "罗夏" },
                { name: "如风有信", character: "司岚" },
                { name: "悬铃木下", character: "叶瑄" }
            ]
        },
        "若最后之梦熄灭": {
            ssr: [
                { name: "铸乐无间", character: "艾因" },
                { name: "牵缚花期", character: "路辰" },
                { name: "蒴果潮生", character: "罗夏" },
                { name: "承梦潆洄", character: "司岚" },
                { name: "行至镜明", character: "叶瑄" }
            ]
        },
        "与你的杯间漫游": {
            ssr: [
                { name: "符号裂隙", character: "艾因" },
                { name: "蔓生虚像", character: "路辰" },
                { name: "落差娱戏", character: "罗夏" },
                { name: "永坠无间", character: "司岚" },
                { name: "丝网缚生", character: "叶瑄" }
            ]
        },
        "风蚀之歌": {
            ssr: [
                { name: "倾世惊鸿", character: "艾因" },
                { name: "浮沤一春", character: "路辰" },
                { name: "炳如日星", character: "罗夏" },
                { name: "此身何渡", character: "司岚" },
                { name: "逆轨归心", character: "叶瑄" }
            ]
        }
    }
};
