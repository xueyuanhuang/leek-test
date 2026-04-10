// ===== 维度定义 =====
export interface Dimension {
  code: string;
  name: string;
  model: string;
  low: string;
  high: string;
}

export const dimensions: Dimension[] = [
  // 风险模型
  { code: "R1", name: "风险偏好", model: "风险模型", low: "稳定币躺平", high: "土狗梭哈" },
  { code: "R2", name: "仓位管理", model: "风险模型", low: "分散配置", high: "一把All in" },
  { code: "R3", name: "止损风格", model: "风险模型", low: "Paper Hands", high: "Diamond Hands" },
  // 认知模型
  { code: "C1", name: "信息来源", model: "认知模型", low: "DYOR独立研究", high: "跟单大V" },
  { code: "C2", name: "决策速度", model: "认知模型", low: "分析瘫痪", high: "Ape in秒冲" },
  { code: "C3", name: "叙事敏感度", model: "认知模型", low: "只认BTC", high: "追每个新叙事" },
  // 心理模型
  { code: "P1", name: "FOMO程度", model: "心理模型", low: "淡定旁观", high: "追涨买入" },
  { code: "P2", name: "亏损反应", model: "心理模型", low: "Cope自愈", high: "Revenge Trading" },
  { code: "P3", name: "贪婪程度", model: "心理模型", low: "及时止盈", high: "永远Wen Lambo" },
  // 链上风格
  { code: "O1", name: "玩法偏好", model: "链上风格", low: "现货躺平", high: "合约/DeFi套娃" },
  { code: "O2", name: "品种偏好", model: "链上风格", low: "BTC蓝筹", high: "Meme土狗" },
  { code: "O3", name: "链上活跃度", model: "链上风格", low: "CEX挂单", high: "链上科学家" },
  // 社交模型
  { code: "S1", name: "晒单倾向", model: "社交模型", low: "闷声发财", high: "全网直播P&L" },
  { code: "S2", name: "社群角色", model: "社交模型", low: "潜水Lurker", high: "Discord Mod" },
  { code: "S3", name: "影响力关系", model: "社交模型", low: "独狼Alpha Hunter", high: "付费进群跟单" },
];

// ===== 题目定义 =====
export interface Question {
  id: number;
  dimension: string; // R1, C1, etc. "HIDDEN" for trigger question
  text: string;
  options: {
    label: string;
    score: number; // 1=low, 2=mid, 3=high
  }[];
}

export const questions: Question[] = [
  // R1-风险偏好
  {
    id: 1, dimension: "R1",
    text: "你刚入金1万U，第一笔打算买什么？",
    options: [
      { label: "大部分买BTC/ETH，小部分放稳定币理财", score: 1 },
      { label: "挑几个市值前50的山寨配置一下", score: 2 },
      { label: "找个刚上pump.fun的土狗，冲了再说", score: 3 },
    ],
  },
  {
    id: 2, dimension: "R1",
    text: "朋友给你一个「内部消息」说某新币即将拉盘，你？",
    options: [
      { label: "谢谢，但我不碰来路不明的信息", score: 1 },
      { label: "先看看合约地址、流动性，小仓位试试", score: 2 },
      { label: "管他真假，先冲一把，错过了更亏", score: 3 },
    ],
  },
  // R2-仓位管理
  {
    id: 3, dimension: "R2",
    text: "你特别看好一个项目，会投多少仓位？",
    options: [
      { label: "不超过总资金的10%，鸡蛋不放一个篮子", score: 1 },
      { label: "30-50%，看好就要敢重仓", score: 2 },
      { label: "All in，不梭哈怎么财富自由", score: 3 },
    ],
  },
  {
    id: 4, dimension: "R2",
    text: "你的持仓里有一个币涨了3倍，现在占总仓位的70%，你？",
    options: [
      { label: "卖掉一部分，重新平衡仓位", score: 1 },
      { label: "拿着不动，涨的就让它继续涨", score: 2 },
      { label: "再加点，强者恒强", score: 3 },
    ],
  },
  // R3-止损风格
  {
    id: 5, dimension: "R3",
    text: "你买的币跌了30%，你的操作是？",
    options: [
      { label: "早就挂好止损了，已经自动卖出了", score: 1 },
      { label: "重新评估一下基本面，看情况决定", score: 2 },
      { label: "跌了就是打折，不卖就不算亏", score: 3 },
    ],
  },
  {
    id: 6, dimension: "R3",
    text: "你重仓的项目创始人突然删了推特，你？",
    options: [
      { label: "第一时间全部卖出，保命要紧", score: 1 },
      { label: "先卖一半观望，等社区反应", score: 2 },
      { label: "说不定是被盗号了，再等等看", score: 3 },
    ],
  },
  // C1-信息来源
  {
    id: 7, dimension: "C1",
    text: "你一般怎么发现新项目？",
    options: [
      { label: "自己看链上数据、读白皮书、分析代码", score: 1 },
      { label: "综合看看KOL推荐和自己的研究", score: 2 },
      { label: "大V推什么我看什么，他们信息更灵通", score: 3 },
    ],
  },
  {
    id: 8, dimension: "C1",
    text: "一个你关注的KOL强烈推荐了某个币，你？",
    options: [
      { label: "他推他的，我自己做研究再决定", score: 1 },
      { label: "会参考他的观点，但还是会看看基本面", score: 2 },
      { label: "这个大V很准的，直接买", score: 3 },
    ],
  },
  // C2-决策速度
  {
    id: 9, dimension: "C2",
    text: "你发现了一个不错的新项目，你的买入节奏是？",
    options: [
      { label: "先研究一两周，看看数据、社区、团队再决定", score: 1 },
      { label: "花一天看看基本信息，差不多就进", score: 2 },
      { label: "打开DEX就买，研究个啥", score: 3 },
    ],
  },
  {
    id: 10, dimension: "C2",
    text: "群里突然有人发了一个新土狗的CA（合约地址），你？",
    options: [
      { label: "看都不看，这种消息太多了", score: 1 },
      { label: "先查一下流动性、持仓分布，再决定要不要小仓冲", score: 2 },
      { label: "手速决定一切，先买再说，晚了就没了", score: 3 },
    ],
  },
  // C3-叙事敏感度
  {
    id: 11, dimension: "C3",
    text: "市场上每隔几周就有新叙事（AI、RWA、DePIN…），你的态度是？",
    options: [
      { label: "我就拿着BTC/ETH，叙事来来去去不关我事", score: 1 },
      { label: "会关注，挑一两个真正有价值的参与", score: 2 },
      { label: "每个新叙事都要冲，错过就是罪过", score: 3 },
    ],
  },
  {
    id: 12, dimension: "C3",
    text: "SOL生态突然火了，一堆meme币暴涨，你？",
    options: [
      { label: "跟我没关系，我不碰这些", score: 1 },
      { label: "了解一下，配一小部分SOL仓位", score: 2 },
      { label: "马上桥资金过去，这波必须吃到", score: 3 },
    ],
  },
  // P1-FOMO程度
  {
    id: 13, dimension: "P1",
    text: "你没买的一个币三天涨了10倍，你的感受是？",
    options: [
      { label: "恭喜赚到的人，跟我无关", score: 1 },
      { label: "有点可惜，但不会追高", score: 2 },
      { label: "现在买还来得及吧？冲！", score: 3 },
    ],
  },
  {
    id: 14, dimension: "P1",
    text: "朋友圈/群里好几个人在晒某个币的收益截图，你？",
    options: [
      { label: "划走，别人赚钱是别人的事", score: 1 },
      { label: "心里有点痒，但控制住了", score: 2 },
      { label: "忍不了了，我也要上车", score: 3 },
    ],
  },
  // P2-亏损反应
  {
    id: 15, dimension: "P2",
    text: "你这周合约亏了5000U，现在你的状态是？",
    options: [
      { label: "调整心态，找找原因，休息几天", score: 1 },
      { label: "有点难受但还好，减小仓位继续", score: 2 },
      { label: "气死了，加大仓位打回来", score: 3 },
    ],
  },
  {
    id: 16, dimension: "P2",
    text: "凌晨3点被爆仓通知吵醒，账户亏损80%，你？",
    options: [
      { label: "认了，关掉手机先睡觉", score: 1 },
      { label: "失眠了，但不会马上操作", score: 2 },
      { label: "立马充钱开新仓，这个位置肯定反弹", score: 3 },
    ],
  },
  // P3-贪婪程度
  {
    id: 17, dimension: "P3",
    text: "你买的币涨了5倍，你怎么操作？",
    options: [
      { label: "卖掉大部分落袋为安", score: 1 },
      { label: "卖掉本金，利润继续跑", score: 2 },
      { label: "拿着！这才哪到哪，目标100倍", score: 3 },
    ],
  },
  {
    id: 18, dimension: "P3",
    text: "你的持仓今天浮盈了2万U，你的想法是？",
    options: [
      { label: "提一部分利润到银行卡，落袋为安", score: 1 },
      { label: "不提也不加，让子弹飞一会", score: 2 },
      { label: "浮盈不是盈，加仓干更大的", score: 3 },
    ],
  },
  // O1-玩法偏好
  {
    id: 19, dimension: "O1",
    text: "你最常用的交易方式是？",
    options: [
      { label: "交易所买现货，简单明了", score: 1 },
      { label: "现货为主，偶尔开个低倍合约", score: 2 },
      { label: "合约、DeFi套娃、杠杆借贷全都玩", score: 3 },
    ],
  },
  {
    id: 20, dimension: "O1",
    text: "有人给你介绍一个DeFi收益策略：质押→借贷→再质押→再借贷，你？",
    options: [
      { label: "太复杂了，我还是拿现货吧", score: 1 },
      { label: "研究一下风险，小资金试试", score: 2 },
      { label: "套娃是艺术，资金效率拉满！", score: 3 },
    ],
  },
  // O2-品种偏好
  {
    id: 21, dimension: "O2",
    text: "你的持仓里，meme币/土狗占比大概是？",
    options: [
      { label: "0%，我只持有主流币", score: 1 },
      { label: "10-20%，拿点小钱玩玩", score: 2 },
      { label: "50%以上，meme才是财富密码", score: 3 },
    ],
  },
  {
    id: 22, dimension: "O2",
    text: "一个新的meme币上线，叫$SHIBA2.0，你？",
    options: [
      { label: "meme币？不碰", score: 1 },
      { label: "如果社区够热就拿点零花钱冲", score: 2 },
      { label: "名字好笑就是理由，冲！", score: 3 },
    ],
  },
  // O3-链上活跃度
  {
    id: 23, dimension: "O3",
    text: "你平时在链上的活跃程度是？",
    options: [
      { label: "只用CEX（币安/OKX），链上太麻烦", score: 1 },
      { label: "偶尔用DEX换换币、领领空投", score: 2 },
      { label: "每天链上冲浪，钱包比交易所用得多", score: 3 },
    ],
  },
  {
    id: 24, dimension: "O3",
    text: "听说某个新L2链上有早期机会，你？",
    options: [
      { label: "等上了大交易所再说", score: 1 },
      { label: "桥点资金过去交互一下，万一有空投", score: 2 },
      { label: "第一时间部署，写脚本批量交互", score: 3 },
    ],
  },
  // S1-晒单倾向
  {
    id: 25, dimension: "S1",
    text: "你今天赚了一大笔，你会？",
    options: [
      { label: "闷声发财，谁都不告诉", score: 1 },
      { label: "跟几个好朋友分享一下", score: 2 },
      { label: "截图发推/发群，让大家感受一下", score: 3 },
    ],
  },
  {
    id: 26, dimension: "S1",
    text: "你爆仓亏了很多钱，你会？",
    options: [
      { label: "自己消化，不想让人知道", score: 1 },
      { label: "找朋友倾诉一下", score: 2 },
      { label: "发出来，亏钱也要亏得有排面", score: 3 },
    ],
  },
  // S2-社群角色
  {
    id: 27, dimension: "S2",
    text: "你在各种币圈群/Discord/TG里一般是什么角色？",
    options: [
      { label: "潜水党，只看不说", score: 1 },
      { label: "偶尔聊几句，看到好信息会分享", score: 2 },
      { label: "活跃分子/管理员，每天都在输出", score: 3 },
    ],
  },
  {
    id: 28, dimension: "S2",
    text: "有人在群里问「现在该买什么」，你？",
    options: [
      { label: "不回，这种问题没法回答", score: 1 },
      { label: "说说自己的看法但注明NFA", score: 2 },
      { label: "洋洋洒洒分析一通，顺便推荐几个", score: 3 },
    ],
  },
  // S3-影响力关系
  {
    id: 29, dimension: "S3",
    text: "你做交易决策的时候，别人的观点对你影响有多大？",
    options: [
      { label: "完全不看别人的，自己研究自己做决定", score: 1 },
      { label: "会参考但不会盲从，最终自己判断", score: 2 },
      { label: "主要看几个信任的大V怎么说", score: 3 },
    ],
  },
  {
    id: 30, dimension: "S3",
    text: "有个付费alpha群，月费500U，据说信息很准，你？",
    options: [
      { label: "不可能花钱买信息，我自己能找", score: 1 },
      { label: "先观望一下，看看群里质量再决定", score: 2 },
      { label: "500U算什么，一个alpha就回本了，加！", score: 3 },
    ],
  },
  // 隐藏触发题
  {
    id: 31, dimension: "HIDDEN",
    text: "最后一个问题：你觉得中本聪是谁？",
    options: [
      { label: "不知道也不关心", score: 1 },
      { label: "可能是某个密码学家团队", score: 2 },
      { label: "是我", score: 3 },
    ],
  },
];

// ===== 人格定义 =====
export interface Personality {
  code: string;
  name: string;
  tagline: string;
  description: string;
  traits: string[];
  rarity: "common" | "uncommon" | "rare" | "legendary";
  rarityLabel: string;
  // 15-dimension ideal vector [R1,R2,R3,C1,C2,C3,P1,P2,P3,O1,O2,O3,S1,S2,S3]
  vector: number[];
  emoji: string;
  quote: string;
  special?: "fallback" | "hidden";
}

export const personalities: Personality[] = [
  {
    code: "HODL", name: "钻石手", tagline: "跌90%？加仓，下辈子见",
    description: "你是币圈的定海神针。无论市场如何暴跌，你都岿然不动。你相信时间是最好的朋友，而你的持仓是你的信仰。别人恐慌抛售的时候，你在默默加仓。",
    traits: ["死拿不卖", "高风险偏好", "BTC信仰", "闷声发财"],
    rarity: "uncommon", rarityLabel: "中等 ~4%",
    vector: [2, 2, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1],
    emoji: "💎", quote: "不到100万不卖，这辈子都不卖",
  },
  {
    code: "FOMO", name: "追高战士", tagline: "别人都在赚钱我不能没有！",
    description: "你的最大敌人不是市场，是FOMO。每当看到绿色K线和别人晒的收益截图，你就忍不住冲进去。你买在最高点的次数比任何人都多，但你依然充满热情。",
    traits: ["严重FOMO", "Ape in", "跟风", "追叙事"],
    rarity: "common", rarityLabel: "常见 ~7%",
    vector: [2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2],
    emoji: "🏃", quote: "这波不上车真的来不及了！",
  },
  {
    code: "YOLO", name: "梭哈战神", tagline: "100x合约开！LFG！",
    description: "你是币圈的亡命徒。对你来说，不开100倍杠杆的交易不叫交易。你的账户余额像过山车，今天10万明天归零后天又10万。你活着就是为了那一把翻盘。",
    traits: ["极致激进", "梭哈", "合约上瘾", "贪婪到底"],
    rarity: "uncommon", rarityLabel: "中等 ~3%",
    vector: [3, 3, 3, 2, 3, 2, 3, 3, 3, 3, 2, 2, 3, 2, 2],
    emoji: "🎰", quote: "这把赢了我就收手（才怪）",
  },
  {
    code: "REKT", name: "永恒爆仓人", tagline: "又爆了，充钱再来",
    description: "你和爆仓通知是老朋友了。每次被清算之后，你都发誓这是最后一次，然后充钱开出更大的仓。你的交易记录就是一部希腊悲剧。",
    traits: ["合约上瘾", "Revenge Trading", "高杠杆", "屡败屡战"],
    rarity: "uncommon", rarityLabel: "中等 ~4%",
    vector: [3, 3, 2, 2, 3, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2],
    emoji: "💀", quote: "这个位置肯定反弹（每次都这么说）",
  },
  {
    code: "DGEN", name: "纯血Degen", tagline: "这土狗CA谁发来的？冲了",
    description: "你是链上的冲浪者，DEX Screener是你的主页。你追逐每一个新发射的土狗，在pump.fun上寻找下一个百倍币。你的钱包里有几百个代币，大部分已经归零。",
    traits: ["土狗专家", "秒冲", "链上活跃", "meme信仰"],
    rarity: "uncommon", rarityLabel: "中等 ~4%",
    vector: [3, 2, 2, 2, 3, 3, 3, 2, 3, 2, 3, 3, 2, 2, 2],
    emoji: "🐕", quote: "dev based，community strong，冲就完了",
  },
  {
    code: "SHILL", name: "野生KOL", tagline: "兄弟们这个百倍起步",
    description: "你是币圈的意见领袖（至少你自己这么认为）。每次发现一个项目，你都忍不住要在群里、推特上喊单。你的粉丝叫你老师，你叫他们家人们。",
    traits: ["喊单达人", "全网直播", "社群核心", "高调张扬"],
    rarity: "uncommon", rarityLabel: "中等 ~3%",
    vector: [2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 1],
    emoji: "📢", quote: "家人们，这个项目我已经研究了（5分钟）",
  },
  {
    code: "COPY", name: "抄作业的", tagline: "大佬钱包地址给我看看",
    description: "你的交易策略很简单：找到最厉害的人，然后抄他的作业。你关注了几十个KOL，加了好几个付费群，你的每一笔交易都有据可循——据的是别人的作业。",
    traits: ["跟单", "跟大V", "付费群", "不DYOR"],
    rarity: "common", rarityLabel: "常见 ~6%",
    vector: [2, 2, 2, 3, 2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 3],
    emoji: "📋", quote: "这个大V很准的，跟就完事了",
  },
  {
    code: "MONK", name: "佛系躺平", tagline: "买完删App，明年再看",
    description: "你是币圈的隐士。买完币就把App删了，一年看一次账户。涨了你不激动，跌了你也不慌。你的内心平静得像一个已经看透一切的修行者。",
    traits: ["极致淡定", "长线现货", "闷声", "CEX"],
    rarity: "common", rarityLabel: "常见 ~6%",
    vector: [1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    emoji: "🧘", quote: "别@我，三年后再说",
  },
  {
    code: "NERD", name: "链上科学家", tagline: "我写了个bot抢跑",
    description: "你是币圈的技术极客。你读合约代码比读白皮书多，你的alpha来自链上数据而不是推特。你跑着自己的MEV bot、sniper bot，用代码碾压一切手动交易者。",
    traits: ["技术至上", "独立研究", "链上原住民", "闷声搞钱"],
    rarity: "rare", rarityLabel: "稀有 ~2%",
    vector: [2, 1, 2, 1, 2, 2, 1, 1, 2, 3, 2, 3, 1, 1, 1],
    emoji: "🤓", quote: "你在追热点的时候，我在看mempool",
  },
  {
    code: "MAXI", name: "BTC原教旨", tagline: "除了BTC都是shitcoin",
    description: "你是比特币的虔诚信徒。在你眼里，山寨币都是垃圾，DeFi是骗局，NFT是笑话。你只持有BTC，你能背诵中本聪白皮书的每一段。",
    traits: ["只认BTC", "Diamond Hands", "DYOR", "鄙视山寨"],
    rarity: "uncommon", rarityLabel: "中等 ~3%",
    vector: [1, 1, 3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
    emoji: "₿", quote: "Have fun staying poor",
  },
  {
    code: "FARM", name: "DeFi农民", tagline: "这个池子APY 2000%冲不冲",
    description: "你是DeFi的辛勤农夫。你在各种协议之间耕作，追逐最高的APY。你的资金在借贷、质押、LP之间来回套娃，每一分钱都不能闲着。",
    traits: ["DeFi套娃", "追收益", "分散配置", "链上活跃"],
    rarity: "uncommon", rarityLabel: "中等 ~3%",
    vector: [2, 1, 2, 1, 2, 2, 2, 1, 2, 3, 1, 3, 1, 2, 1],
    emoji: "🌾", quote: "impermanent loss不算亏（自我催眠中）",
  },
  {
    code: "DROP", name: "撸毛专业户", tagline: "这协议没发币，交互一下",
    description: "你是空投猎人中的职业选手。你有十几个钱包，每天的工作就是交互各种没发币的协议。你比任何人都了解女巫检测规则，你的Excel表格比项目方的还详细。",
    traits: ["空投猎人", "多钱包", "链上活跃", "ROI精算"],
    rarity: "uncommon", rarityLabel: "中等 ~3%",
    vector: [1, 1, 2, 1, 2, 2, 1, 1, 2, 2, 1, 3, 1, 2, 1],
    emoji: "🪂", quote: "女巫检测越来越严了，但我更严谨",
  },
  {
    code: "FLIP", name: "NFT翻转机", tagline: "地板价在涨，白单到手了",
    description: "你是NFT市场的快枪手。你追白名单、抢mint、看地板价、快速翻转。你加了无数Discord群，每天GM打卡做任务，只为那一个翻倍mint的机会。",
    traits: ["快进快出", "NFT专家", "Discord刷活跃", "追白名单"],
    rarity: "uncommon", rarityLabel: "中等 ~3%",
    vector: [2, 2, 1, 2, 3, 3, 2, 1, 2, 2, 2, 3, 2, 3, 2],
    emoji: "🖼️", quote: "GM GM，这个项目roadmap很强",
  },
  {
    code: "COPE", name: "Copium上瘾者", tagline: "这只是暂时调整，机构在吸筹",
    description: "你是自我安慰的大师。无论亏多少，你都能找到理由说服自己还在。你的持仓已经跌了90%，但你说这是「价值投资」，是「长期持有」。你的Copium浓度已经超标。",
    traits: ["套牢不割", "自我安慰", "确认偏差", "长期主义（被迫）"],
    rarity: "common", rarityLabel: "常见 ~6%",
    vector: [1, 2, 3, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 2],
    emoji: "🫠", quote: "长期看好，短期波动不影响（已经套了一年）",
  },
  {
    code: "MOON", name: "Moonboy", tagline: "这个币年底1000刀",
    description: "你是永恒的乐观主义者。在你的世界里，每个币都要to the moon。你随口就是百倍目标价，你的K线只有向上的箭头。熊市？不存在的。",
    traits: ["极度乐观", "贪婪", "喊目标价", "Hopium上瘾"],
    rarity: "uncommon", rarityLabel: "中等 ~4%",
    vector: [2, 2, 3, 2, 2, 3, 2, 1, 3, 2, 2, 2, 3, 3, 2],
    emoji: "🌙", quote: "Wen Lambo? Soon ser, soon",
  },
  {
    code: "WAIT", name: "永远在观望", tagline: "再等等，还没到我的买点",
    description: "你是最谨慎的投资者——谨慎到从来没有买过任何东西。你在分析、等待、再分析、再等待。当你终于决定入场的时候，已经涨了10倍了。",
    traits: ["分析瘫痪", "极致淡定", "稳定币大户", "错过一切"],
    rarity: "uncommon", rarityLabel: "中等 ~4%",
    vector: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    emoji: "⏳", quote: "这个位置不太好，我再等等",
  },
  {
    code: "PAPR", name: "纸手哥", tagline: "跌了3%赶紧跑！",
    description: "你的手比纸还薄。一点点波动就让你心跳加速，一根红色K线就让你全部卖出。你经常卖在最低点，然后看着币价反弹怀疑人生。",
    traits: ["Paper Hands", "FOMO卖出", "超短线", "心态崩"],
    rarity: "common", rarityLabel: "常见 ~5%",
    vector: [1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2],
    emoji: "📄", quote: "不对劲，先跑为敬",
  },
  {
    code: "ALFA", name: "Alpha猎手", tagline: "我比CT早知道两天",
    description: "你是信息差的猎手。当别人还在看KOL推荐的时候，你已经从链上数据、Discord内部频道、开发者社区里挖到了alpha。你闷声布局，等大众入场时悄悄离开。",
    traits: ["独立挖掘", "信息差", "闷声", "提前布局"],
    rarity: "rare", rarityLabel: "稀有 ~2%",
    vector: [2, 1, 2, 1, 2, 2, 1, 1, 2, 2, 2, 3, 1, 2, 1],
    emoji: "🦅", quote: "你看到的热点，是我两周前的仓位",
  },
  {
    code: "LOAN", name: "借贷战士", tagline: "抵押ETH借U再买ETH",
    description: "你是DeFi杠杆的艺术家。你把套娃借贷玩到了极致——抵押、借贷、再抵押、再借贷，直到清算价近在咫尺。你的仓位就像一个精密的多米诺骨牌阵。",
    traits: ["极致杠杆", "DeFi套娃", "贪婪", "高风险"],
    rarity: "rare", rarityLabel: "稀有 ~2%",
    vector: [3, 3, 2, 1, 2, 2, 2, 2, 3, 3, 1, 3, 1, 1, 1],
    emoji: "🏦", quote: "健康系数1.05，稳得很（并不）",
  },
  {
    code: "CULT", name: "信仰充值", tagline: "这个项目会改变世界",
    description: "你不是在投资，你是在信仰。你选中的那个项目就是你的宗教，创始人就是你的神。你在社区里传教布道，把每一个质疑者都当作异教徒。",
    traits: ["极度确信", "死拿", "社群活跃", "单一持仓"],
    rarity: "uncommon", rarityLabel: "中等 ~3%",
    vector: [2, 3, 3, 2, 1, 1, 1, 1, 3, 2, 2, 2, 2, 3, 1],
    emoji: "⛪", quote: "你们不懂，这个项目的愿景是...",
  },
  {
    code: "ROAM", name: "叙事游牧民", tagline: "AI完了，下一个RWA",
    description: "你是叙事的游牧民。哪里有热度你就去哪里，从DeFi Summer到NFT到AI到RWA到DePIN，你从不缺席任何一个叙事。唯一的问题是，你总是在叙事冷却时才到场。",
    traits: ["追叙事", "快速轮动", "跟风", "多品种"],
    rarity: "common", rarityLabel: "常见 ~5%",
    vector: [2, 1, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2],
    emoji: "🏕️", quote: "下一个叙事是什么？我要提前布局（每次都晚）",
  },
  {
    code: "SAGE", name: "老韭菜", tagline: "17年入圈，经历过九四和五一九",
    description: "你是币圈的老兵。经历过2017年的疯狂，扛过了94禁令，见证了519大崩盘。你满身伤疤但依然在场内。新人来问你建议，你只说四个字：「别玩合约」。",
    traits: ["OG", "见多识广", "分散配置", "淡定但伤痕累累"],
    rarity: "uncommon", rarityLabel: "中等 ~4%",
    vector: [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
    emoji: "🧓", quote: "币圈一天，人间一年。我已经活了好几辈子",
  },
  {
    code: "NOOB", name: "纯新韭菜", tagline: "朋友说牛市来了让我开户",
    description: "你是币圈的新鲜血液。你分不清现货和合约，不知道什么是钱包，BTC和ETH的区别你还在学。你是朋友带进来的，带着满满的期待和零碎的知识。",
    traits: ["新人", "跟风", "FOMO", "什么都不懂"],
    rarity: "common", rarityLabel: "常见 ~7%",
    vector: [2, 2, 2, 3, 2, 2, 3, 2, 2, 1, 2, 1, 2, 2, 3],
    emoji: "🌱", quote: "老师，现在买什么好？",
  },
  {
    code: "WHALE", name: "闷声巨鲸", tagline: "亏了也不影响生活",
    description: "你是币圈的隐形大佬。你的资金体量是别人的百倍，但你从不炫耀。你的交易策略保守稳健，因为你知道保住本金比什么都重要。链上分析师追踪的那个巨鲸钱包，可能就是你的。",
    traits: ["大资金", "保守稳健", "闷声", "长线"],
    rarity: "rare", rarityLabel: "稀有 ~2%",
    vector: [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
    emoji: "🐋", quote: "这个金额对我来说就是个零头",
  },
  {
    code: "RAGE", name: "情绪交易员", tagline: "气死了反手做空！",
    description: "你的交易完全由情绪驱动。赚了就膨胀，亏了就暴怒，然后在暴怒中做出更疯狂的交易。你的交易记录不是账本，是一本情绪日记。",
    traits: ["情绪驱动", "Revenge Trading", "冲动", "合约"],
    rarity: "uncommon", rarityLabel: "中等 ~3%",
    vector: [2, 2, 2, 2, 3, 2, 2, 3, 2, 3, 2, 1, 2, 2, 2],
    emoji: "🤬", quote: "这个市场就是针对我！",
  },
  // === 特殊人格 ===
  {
    code: "NGMI", name: "归零者", tagline: "你是哪种韭菜？你是所有韭菜",
    description: "恭喜你，你的答案独一无二到系统都匹配不了。你不属于任何一种韭菜类型——或者说，你属于每一种。你就是混沌本身。",
    traits: ["无法归类", "混沌中立", "薛定谔的韭菜"],
    rarity: "legendary", rarityLabel: "传说 <0.1%",
    vector: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    emoji: "👻", quote: "NGMI... or are we?",
    special: "fallback",
  },
  {
    code: "SATOSHI", name: "中本聪附体", tagline: "你不是韭菜，你是镰刀",
    description: "你选了「中本聪是我」。好吧，中本聪本聪，你好。你已经超越了韭菜的范畴，你是这个游戏的创造者。去吧，去创造下一个区块。",
    traits: ["创世者", "超越韭菜", "不可名状"],
    rarity: "legendary", rarityLabel: "传说 <1%",
    vector: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    emoji: "👁️", quote: "If you don't believe me or don't understand, I don't have time to try to convince you, sorry.",
    special: "hidden",
  },
];
