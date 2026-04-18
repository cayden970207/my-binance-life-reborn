// 年龄到事件池的映射 - 0~100岁

// 工具函数: 生成事件ID列表
function range(start, end) {
  const arr = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

// 各年龄段事件池
const BIRTH_POOL = [10001, 10002, 10003, 10005, 10006, 10008, 10010, 10011, 10012, 10013, 10014, 10015, 10016, 10017, 10018, 10020, 10021, 10022, 10023, 10024, 10028, 10029];
const EVENTS_2025_POOL = range(12000, 12299); // 2025-2026 最新币圈事件
const DEATH_NATURAL = range(13000, 13019); // 自然死亡事件
const DEATH_TRIGGER = range(13050, 13068); // 触发式死亡
const ILLNESS_POOL_ENDGAME = range(13100, 13109); // 重病(可能死可能活)
const DEATH_PEACEFUL = range(13200, 13209); // 平静终结(可随机触发)
// 低龄随机意外死亡池(无年龄限制,可任何年龄触发)
const DEATH_YOUNG = [13050, 13052, 13057, 13060, 13062, 13068, 13209];

// 抉择事件 — 特定年龄必触发(高权重保证出现)
const CHOICE_AT_AGE = {
  18: 15000, 25: 15001, 30: 15002, 35: 15003, 37: 15004,
  40: 15005, 41: 15006, 42: 15007, 45: 15008, 46: 15009,
  50: 15010, 55: 15011,
};
const TODDLER_POOL = range(10030, 10105); // 幼年
const CHILD_POOL = range(10030, 10199).concat(range(11900, 11910)); // 童年可能大病/意外
const TEEN_POOL = range(10200, 10299);
const COLLEGE_POOL = range(10300, 10399);
const EARLY_CAREER_POOL = range(10700, 10799);
const ALT_LIFE_POOL = range(10780, 10799); // 鬼畜alt
const SHANGHAI_POOL = range(10800, 10899);
const CRYPTO_AWAKEN_POOL = range(10900, 10999);
const BINANCE_RISE_POOL = range(11000, 11199);
const REGULATION_POOL = range(11300, 11499);
const XU_MINGXING_POOL = [12300, 12301, 12302, 12303, 12304, 12305];
const HEYI_POOL = [12306, 12307, 12308, 12309];
const SUN_YUCHEN_POOL = [12310, 12311, 12312, 12313];
const DAILY_POOL = range(11800, 11899);
const OLD_AGE_POOL = range(11880, 11899).concat(range(11900, 11940));
const ILLNESS_POOL = range(11900, 11940);
const DEATH_BRANCH = [10000];

export function buildAges() {
  const ages = {};
  // 死亡节点 (age 500 触发)
  ages["500"] = { age: 500, event: DEATH_BRANCH };

  for (let age = 0; age <= 120; age++) {
    let pool = [];
    let cameo = [];
    if (age === 0) {
      // 出生
      pool = [
        "10001*120", "10002*100",
        ...BIRTH_POOL.filter(id => id !== 10001 && id !== 10002).map(id => `${id}*10`),
      ];
    } else if (age >= 1 && age <= 4) {
      // 幼年
      pool = [
        ...TODDLER_POOL.map(id => `${id}*5`),
        "11900*2", "11901*1"  // 普通疾病
      ];
    } else if (age >= 5 && age <= 10) {
      // 童年 - 极低意外死亡(0.3%/年)
      pool = [
        ...CHILD_POOL.map(id => `${id}*4`),
        ...ILLNESS_POOL.slice(0, 5).map(id => `${id}*1`),
        '13052*1', // 车祸(不看年龄)
      ];
    } else if (age >= 11 && age <= 17) {
      // 青春期 - 偶发意外(1%/年)
      pool = [
        ...TEEN_POOL.map(id => `${id}*4`),
        ...DAILY_POOL.slice(0, 30).map(id => `${id}*1`),
        '13052*1','13057*1','13060*1', // 意外/打劫/抑郁
      ];
    } else if (age >= 18 && age <= 22) {
      // 大学 - 低意外(1-2%/年)
      pool = [
        ...COLLEGE_POOL.map(id => `${id}*5`),
        ...DAILY_POOL.slice(0, 40).map(id => `${id}*1`),
        ...ALT_LIFE_POOL.map(id => `${id}*2`),
        '13052*2','13060*1','13062*1', // 车祸/抑郁/邪教
      ];
    } else if (age >= 23 && age <= 30) {
      // 工作期 - 早期可能进圈
      pool = [
        ...EARLY_CAREER_POOL.map(id => `${id}*4`),
        ...DAILY_POOL.slice(20, 60).map(id => `${id}*2`),
        ...ALT_LIFE_POOL.map(id => `${id}*3`),
        ...CRYPTO_AWAKEN_POOL.map(id => `${id}*2`),  // 早早进圈可能
        ...BINANCE_RISE_POOL.map(id => `${id}*1`),   // 年轻创业可能
        ...EVENTS_2025_POOL.map(id => `${id}*1`),
        '13050*1','13052*1','13060*1','13062*1','13068*1','13064*2',
      ];
    } else if (age >= 31 && age <= 36) {
      // 创业期 - crypto 入圈概率高
      pool = [
        ...SHANGHAI_POOL.map(id => `${id}*4`),
        ...CRYPTO_AWAKEN_POOL.map(id => `${id}*5`),
        ...BINANCE_RISE_POOL.map(id => `${id}*2`),
        ...EVENTS_2025_POOL.map(id => `${id}*2`),
        ...DAILY_POOL.slice(20, 60).map(id => `${id}*2`),
        '13050*2','13052*1','13053*1','13060*1','13061*1','13064*2','13065*1','13067*1',
      ];
    } else if (age >= 37 && age <= 44) {
      // 加密黄金期 - 入圈/创业/成名/爆雷都有可能
      pool = [
        ...CRYPTO_AWAKEN_POOL.map(id => `${id}*5`),
        ...BINANCE_RISE_POOL.map(id => `${id}*5`),
        ...EVENTS_2025_POOL.map(id => `${id}*4`),
        ...REGULATION_POOL.map(id => `${id}*2`),
        ...DAILY_POOL.slice(0, 30).map(id => `${id}*1`),
        '13050*2','13051*1','13053*2','13063*1','13064*3','13065*2','13101*1',
      ];
      cameo = [
        ...XU_MINGXING_POOL.map(id => `${id}*6`),
        ...HEYI_POOL.map(id => `${id}*5`),
        ...SUN_YUCHEN_POOL.map(id => `${id}*1`),
      ];
    } else if (age >= 45 && age <= 55) {
      // 事业中后期 - 监管/特赦/新阶段
      pool = [
        ...REGULATION_POOL.map(id => `${id}*4`),
        ...BINANCE_RISE_POOL.map(id => `${id}*2`),
        ...EVENTS_2025_POOL.map(id => `${id}*4`),
        ...CRYPTO_AWAKEN_POOL.map(id => `${id}*1`),
        ...DAILY_POOL.slice(0, 30).map(id => `${id}*2`),
        '13050*2','13051*2','13059*1','13063*2','13064*3','13100*2','13101*2',
      ];
      cameo = [
        ...XU_MINGXING_POOL.map(id => `${id}*7`),
        ...HEYI_POOL.map(id => `${id}*5`),
        ...SUN_YUCHEN_POOL.map(id => `${id}*1`),
      ];
    } else if (age >= 51 && age <= 60) {
      // 50代 - 极低死亡(1%)
      pool = [
        ...DAILY_POOL.map(id => `${id}*8`),
        ...OLD_AGE_POOL.map(id => `${id}*4`),
        ...ILLNESS_POOL.map(id => `${id}*3`),
        ...DEATH_TRIGGER.slice(0, 3).map(id => `${id}*1`),
      ];
    } else if (age >= 61 && age <= 70) {
      // 60代 - 低死亡(3%)
      pool = [
        ...DAILY_POOL.slice(40).map(id => `${id}*5`),
        ...OLD_AGE_POOL.map(id => `${id}*4`),
        ...ILLNESS_POOL.map(id => `${id}*4`),
        ...ILLNESS_POOL_ENDGAME.slice(0, 3).map(id => `${id}*1`),
        ...DEATH_TRIGGER.slice(0, 5).map(id => `${id}*1`),
      ];
    } else if (age >= 71 && age <= 80) {
      // 70代 - 中等死亡(7%)
      pool = [
        ...OLD_AGE_POOL.map(id => `${id}*4`),
        ...ILLNESS_POOL.map(id => `${id}*5`),
        ...ILLNESS_POOL_ENDGAME.map(id => `${id}*2`),
        ...DEATH_TRIGGER.map(id => `${id}*1`),
        ...DEATH_NATURAL.slice(0, 5).map(id => `${id}*1`),
      ];
    } else if (age >= 81 && age <= 90) {
      // 80代 - 高死亡(20%)
      pool = [
        ...OLD_AGE_POOL.map(id => `${id}*2`),
        ...ILLNESS_POOL_ENDGAME.map(id => `${id}*3`),
        ...DEATH_TRIGGER.map(id => `${id}*2`),
        ...DEATH_NATURAL.map(id => `${id}*2`),
        ...DEATH_PEACEFUL.map(id => `${id}*2`),
      ];
    } else if (age >= 91 && age <= 99) {
      // 90代 - 死亡主导(50%)
      pool = [
        ...OLD_AGE_POOL.slice(0, 10).map(id => `${id}*1`),
        ...ILLNESS_POOL_ENDGAME.map(id => `${id}*3`),
        ...DEATH_TRIGGER.map(id => `${id}*4`),
        ...DEATH_NATURAL.map(id => `${id}*5`),
        ...DEATH_PEACEFUL.map(id => `${id}*5`),
      ];
    } else {
      // 100+ 强制死亡
      pool = [
        ...DEATH_PEACEFUL.map(id => `${id}*50`),
        ...DEATH_TRIGGER.map(id => `${id}*10`),
      ];
    }
    ages[String(age)] = cameo.length ? { age, event: pool, cameo } : { age, event: pool };
  }

  // 在指定年龄插入高权重抉择事件,保证必触发
  for (const [age, choiceId] of Object.entries(CHOICE_AT_AGE)) {
    if (ages[age]) {
      // 权重设为9999,压倒其他事件,必触发
      ages[age].event.unshift(`${choiceId}*9999`);
    }
  }

  return ages;
}
