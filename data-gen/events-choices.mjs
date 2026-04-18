// 关键抉择事件 (ID 15000-15099)
// 这些事件在特定年龄触发,弹窗让玩家选择 A/B/C,每个选项有不同后果
// Format: [id, text, { choices: [{label, effect, flag?, postText?}], include }]

export const choiceEvents = [
  // ===== 18岁: 大学专业选择 =====
  [15000, "【抉择】你要上大学了,选什么专业?", {
    include: "AGE?[18]",
    exclude: "EVT?[15000]",
    choices: [
      { label: "生物 (父母期望的医生路线)", effect: {INT: 2, SPR: -1}, flag: 15800 },
      { label: "计算机科学 (程序员路线)", effect: {INT: 3, MNY: 1}, flag: 15801 },
      { label: "金融 (华尔街梦)", effect: {MNY: 2, INT: 1}, flag: 15802 },
      { label: "退学去创业", effect: {INT: -2, MNY: -2, CHR: 2}, flag: 15803 },
    ],
    grade: 2,
  }],

  // ===== 25岁: 第一份工作 =====
  [15001, "【抉择】毕业了,你的第一份工作?", {
    include: "AGE?[25]",
    exclude: "EVT?[15001]",
    choices: [
      { label: "华尔街大厂 (稳定高薪)", effect: {MNY: 3, INT: 1, SPR: -1}, flag: 15810 },
      { label: "东京小公司 (锻炼)", effect: {MNY: 1, INT: 2, CHR: 1}, flag: 15811 },
      { label: "上海创业 (搏一把)", effect: {MNY: -2, INT: 2, STR: 1}, flag: 15812 },
      { label: "裸辞去旅行", effect: {SPR: 3, MNY: -2}, flag: 15813 },
    ],
    grade: 2,
  }],

  // ===== 30岁: 扑克 vs 事业 =====
  [15002, "【抉择】朋友Eric直言:再不戒扑克,你就毁了。", {
    include: "AGE?[30]",
    exclude: "EVT?[15002]",
    choices: [
      { label: "彻底戒掉,回归正途", effect: {INT: 3, SPR: 2}, flag: 15820 },
      { label: "继续打,顺便研究赌场心理学", effect: {MNY: 2, INT: -1, SPR: 1}, flag: 15821 },
      { label: "全职打职业扑克", effect: {MNY: -2, CHR: 2, STR: -1}, flag: 15822 },
    ],
    grade: 2,
  }],

  // ===== 35岁: BTC入圈决定性时刻 =====
  [15003, "【抉择】李启元在牌桌上说比特币是未来,你?", {
    include: "AGE?[35]",
    exclude: "EVT?[15003]",
    choices: [
      { label: "卖房all in BTC (60刀一枚)", effect: {MNY: -3, INT: 3, STR: 2}, flag: 15830 },
      { label: "10%仓位试水", effect: {MNY: -1, INT: 2}, flag: 15831 },
      { label: "嘲笑他:又想带我传销", effect: {CHR: 1, INT: -2, MNY: 1}, flag: 15832 },
      { label: "借他5000刀,啥都没说", effect: {MNY: -1, CHR: 1}, flag: 15833 },
    ],
    grade: 3,
  }],

  // ===== 37岁: Mt.Gox邀请 =====
  [15004, "【抉择】Mt.Gox的Mark Karpeles邀你当中国区CEO。", {
    include: "AGE?[37]",
    exclude: "EVT?[15004]",
    choices: [
      { label: "接受 (日薪5000刀)", effect: {MNY: 3, STR: -2}, flag: 15840 },
      { label: "拒绝 (这公司有问题)", effect: {INT: 2, STR: 1}, flag: 15841 },
      { label: "先讨价还价,要股权", effect: {MNY: 1, CHR: 1, INT: 1}, flag: 15842 },
    ],
    grade: 3,
  }],

  // ===== 40岁: ICO 做不做 =====
  [15005, "【抉择】2017年,全世界都在ICO,你要不要?", {
    include: "AGE?[40]",
    exclude: "EVT?[15005]",
    choices: [
      { label: "做!注册币安,搞1500万ICO", effect: {MNY: 5, CHR: 3, STR: 2}, flag: 15850 },
      { label: "做但只做技术供应商(比捷科技)", effect: {MNY: 2, INT: 2}, flag: 15851 },
      { label: "不做,ICO是泡沫,迟早被查", effect: {STR: 3, INT: 1, MNY: -1}, flag: 15852 },
      { label: "发个空气币跑路", effect: {MNY: 4, STR: -5, CHR: -3}, flag: 15853 },
    ],
    grade: 3,
  }],

  // ===== 40岁: 9.4禁令当晚 =====
  [15006, "【抉择】2017.9.4凌晨,七部委禁令下来了。你?", {
    include: "AGE?[41]",
    exclude: "EVT?[15006]",
    choices: [
      { label: "拆硬盘,凌晨6点飞东京", effect: {STR: 3, INT: 3, SPR: -1}, flag: 15860 },
      { label: "留中国,跟监管配合清算", effect: {STR: 2, MNY: -4, SPR: -2}, flag: 15861 },
      { label: "先躲新加坡看风向", effect: {INT: 2, MNY: -2}, flag: 15862 },
      { label: "干脆不做交易所了,解散团队", effect: {SPR: 2, MNY: -3, STR: -2}, flag: 15863 },
    ],
    grade: 3,
  }],

  // ===== 42岁: SBF拜访 =====
  [15007, "【抉择】SBF抱着FTX白皮书来找你融资。", {
    include: "AGE?[42]",
    exclude: "EVT?[15007]",
    choices: [
      { label: "投他!赌一个未来交易所", effect: {MNY: 2, STR: -3}, flag: 15870 },
      { label: "拒绝,他有问题", effect: {INT: 3, STR: 2}, flag: 15871 },
      { label: "灌醉他,让合作告吹", effect: {CHR: 2, SPR: 2, STR: 1}, flag: 15872 },
      { label: "挖角他的Alameda团队", effect: {MNY: 2, CHR: 2, STR: -1}, flag: 15873 },
    ],
    grade: 3,
  }],

  // ===== 45岁: LUNA崩盘前夜 =====
  [15008, "【抉择】你的LUNA从300万涨到16亿美金,UST正在脱锚。", {
    include: "AGE?[45]",
    exclude: "EVT?[15008]",
    choices: [
      { label: "全部卖掉,落袋为安", effect: {MNY: 5, INT: 2}, flag: 15880 },
      { label: "作为大玩家支持Do Kwon,不卖", effect: {STR: 3, MNY: -5, CHR: 2}, flag: 15881 },
      { label: "继续加仓,抄底", effect: {MNY: -5, STR: -2, SPR: -3}, flag: 15882 },
      { label: "顺便做空,赚双边", effect: {MNY: 3, STR: -2, CHR: -1}, flag: 15883 },
    ],
    grade: 3,
  }],

  // ===== 46岁: 美国司法部最后通牒 =====
  [15009, "【抉择】美国司法部给你最后通牒:要么认罪赴美,要么国际通缉。", {
    include: "AGE?[46]",
    exclude: "EVT?[15009]",
    choices: [
      { label: "飞美认罪,120天监狱换清白", effect: {STR: 5, SPR: -3, MNY: -5}, flag: 15890 },
      { label: "逃杜拜,硬扛国际通缉", effect: {MNY: 2, SPR: -1, STR: -2}, flag: 15891 },
      { label: "假装生病拖3年", effect: {SPR: -2, INT: 2}, flag: 15892 },
      { label: "公开宣战,对喷司法部", effect: {CHR: 3, STR: 3, SPR: -3, MNY: -3}, flag: 15893 },
    ],
    grade: 3,
  }],

  // ===== 50岁: 退休方向 =====
  [15010, "【抉择】你50岁了,辞去币安CEO。接下来?", {
    include: "AGE?[50]",
    exclude: "EVT?[15010]",
    choices: [
      { label: "启动GiggleAcademy慈善教育", effect: {STR: 5, CHR: 3, SPR: 3, MNY: -2}, flag: 15900 },
      { label: "继续投资Web3新项目", effect: {MNY: 3, INT: 2, STR: -1}, flag: 15901 },
      { label: "写回忆录,隐退", effect: {INT: 3, SPR: 3, CHR: 2}, flag: 15902 },
      { label: "突然去学厨艺,开兰州拉面", effect: {CHR: 2, MNY: -1, SPR: 2}, flag: 15903 },
      { label: "出家当和尚", effect: {SPR: 5, MNY: -5, STR: -1}, flag: 15904 },
    ],
    grade: 3,
  }],

  // ===== 55岁: 是否复出 =====
  [15011, "【抉择】特朗普特赦你后,要不要回来管币安?", {
    include: "AGE?[55]",
    exclude: "EVT?[15011]",
    choices: [
      { label: "回来!继续掌舵加密", effect: {MNY: 3, CHR: 3, STR: -1}, flag: 15910 },
      { label: "只做顾问,不再负责具体事务", effect: {SPR: 3, CHR: 2}, flag: 15911 },
      { label: "彻底退休,享受生活", effect: {SPR: 5, MNY: -1}, flag: 15912 },
      { label: "创办新公司 vs 币安", effect: {MNY: 2, STR: -2, CHR: 1}, flag: 15913 },
    ],
    grade: 3,
  }],
];
