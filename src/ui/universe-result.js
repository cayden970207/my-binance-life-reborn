const COLLECTION_KEY = 'cz_multiverse_collection_v1';

const rarityPalette = {
  common: { label: '普通宇宙', color: '#9ca3af', grade: 0 },
  rare: { label: '稀有宇宙', color: '#60a5fa', grade: 1 },
  epic: { label: '史诗宇宙', color: '#c084fc', grade: 2 },
  legendary: { label: '传说宇宙', color: '#fbbf24', grade: 3 },
  anomaly: { label: '异常宇宙', color: '#fb7185', grade: 3 },
};

const categoryLabels = {
  canon: '正史神话',
  success: '平行成功',
  comedy: '黑色喜剧',
  tragedy: '黑色悲剧',
  anomaly: '异常宇宙',
  ordinary: '普通人生',
};

const universeTemplates = [
  {
    key: 'cz-myth',
    rarity: 'legendary',
    category: 'canon',
    match: ({ achievementIds }) => achievementIds.has(401),
    titles: ['CZ神话', '原典建造者', '正史封神版CZ'],
    subtitles: ['你几乎把原版宇宙完整走完了。', '这条时间线里,你活成了大家脑海中的CZ。'],
    tags: ['Binance', '正史', '封神', '教育遗产'],
    finalRange: [38_000_000_000, 92_000_000_000],
    peakRange: [92_000_000_000, 180_000_000_000],
    epitaphs: ['你没有只是赚钱。你把自己活成了这个行业的原型。'],
  },
  {
    key: 'crypto-savior',
    rarity: 'legendary',
    category: 'canon',
    match: ({ achievementIds, events }) =>
      achievementIds.has(301) || achievementIds.has(406) || (events.has(11000) && events.has(11427)),
    titles: ['加密救世主CZ', 'Giggle Academy校长', '扛雷建造者CZ'],
    subtitles: ['这一条宇宙里,你把危机都熬成了遗产。', '你扛住了审判,最后去教别人怎么开始。'],
    tags: ['SAFU', 'Giggle', '扛雷', '教育'],
    finalRange: [16_000_000_000, 56_000_000_000],
    peakRange: [48_000_000_000, 130_000_000_000],
    epitaphs: ['人们记住的不只是你的交易所,还有你留下来的下一代。'],
  },
  {
    key: 'eth-partner',
    rarity: 'legendary',
    category: 'success',
    match: ({ achievementIds, events }) =>
      achievementIds.has(305) || achievementIds.has(408) || events.has(20027) || events.has(10909),
    titles: ['以太坊合伙人CZ', 'ETH联合创始宇宙', 'V神搭子CZ'],
    subtitles: ['你没有去做币安,而是把另一条链直接点亮了。', '拉斯维加斯那一夜之后,你的人生改从ETH开始。'],
    tags: ['ETH', '平行成功', '技术派', '老钱'],
    finalRange: [52_000_000_000, 220_000_000_000],
    peakRange: [90_000_000_000, 320_000_000_000],
    epitaphs: ['你没当交易所之王,但你站在了另一座山的山顶。'],
  },
  {
    key: 'okcoin-successor',
    rarity: 'epic',
    category: 'success',
    match: ({ achievementIds, events }) =>
      achievementIds.has(307) || events.has(20041) || events.has(20040),
    titles: ['OKCoin接班人CZ', '老牌大所掌舵人', '留守交易所宇宙'],
    subtitles: ['你没有另起炉灶,却接住了另一座旧帝国。', '有时候平行宇宙不是冒险,而是留下。'],
    tags: ['OKCoin', '接班', '老牌大所', '平行成功'],
    finalRange: [350_000_000, 3_600_000_000],
    peakRange: [1_200_000_000, 7_500_000_000],
    epitaphs: ['你没有写下Binance,但你仍然把交易所做成了自己的名字。'],
  },
  {
    key: 'bloomberg-md',
    rarity: 'epic',
    category: 'success',
    match: ({ achievementIds, events }) =>
      achievementIds.has(306) || events.has(20029),
    titles: ['彭博MD CZ', 'Web2高管宇宙', '没入圈的成功者'],
    subtitles: ['这条宇宙里,你把稳定职业走成了高配版本。', '你没碰到加密风暴,却在旧世界里升到了顶。'],
    tags: ['Bloomberg', 'Web2', '高管', '平行成功'],
    finalRange: [12_000_000, 85_000_000],
    peakRange: [20_000_000, 160_000_000],
    epitaphs: ['你错过了狂潮,也避开了深渊。平稳,也是一种罕见命运。'],
  },
  {
    key: 'ramen-king',
    rarity: 'epic',
    category: 'comedy',
    match: ({ achievementIds, events }) =>
      achievementIds.has(302) || achievementIds.has(310) || events.has(20021) || events.has(10786) || events.has(10787),
    titles: ['兰州拉面王CZ', '餐饮帝国CZ', '拉面宇宙建造者'],
    subtitles: ['你没有建交易所,你建了连锁。', '这条宇宙里,币圈少了一个传奇,拉面界多了一个暴君。'],
    tags: ['拉面', '喜剧', '创业', '民间传奇'],
    finalRange: [3_000_000, 58_000_000],
    peakRange: [8_000_000, 96_000_000],
    epitaphs: ['有人记得你没做币安,更多人记得你那碗面真的很顶。'],
  },
  {
    key: 'wsop',
    rarity: 'epic',
    category: 'comedy',
    match: ({ achievementIds, events }) => achievementIds.has(303) || events.has(20023),
    titles: ['WSOP冠军CZ', '扑克脸之神', '赌桌版CZ'],
    subtitles: ['你没做交易所,你把人生全压在了牌桌上。', '有些宇宙里,你看穿的是人,不是K线。'],
    tags: ['WSOP', '扑克', '喜剧', '赌徒'],
    finalRange: [6_000_000, 35_000_000],
    peakRange: [20_000_000, 180_000_000],
    epitaphs: ['你在赌桌上赢得很干净,只是这局人生不再需要K线。'],
  },
  {
    key: 'top-streamer',
    rarity: 'epic',
    category: 'comedy',
    match: ({ achievementIds, events }) => achievementIds.has(304) || events.has(20025),
    titles: ['币圈顶流主播CZ', '全网整活版CZ', '推特流量怪CZ'],
    subtitles: ['这条宇宙里,你靠镜头而不是撮合系统封神。', '你没有拯救市场,但你拯救了观众的无聊。'],
    tags: ['主播', '流量', '喜剧', 'KOL'],
    finalRange: [1_200_000, 26_000_000],
    peakRange: [3_000_000, 65_000_000],
    epitaphs: ['你把币圈当成了综艺。笑声和流量,也能变成资产。'],
  },
  {
    key: 'monk',
    rarity: 'legendary',
    category: 'anomaly',
    match: ({ achievementIds, events }) => achievementIds.has(403) || events.has(20071),
    titles: ['南山和尚CZ', '出世隐退宇宙', '看破版CZ'],
    subtitles: ['这条宇宙里,你从建造者变成了旁观者。', '你最后放下的不是公司,是整个执念。'],
    tags: ['隐退', '修行', '异常', '悟道'],
    finalRange: [-120_000, 120_000],
    peakRange: [25_000_000, 6_000_000_000],
    epitaphs: ['资产归零也没关系。你终于不用再跟世界解释自己。'],
  },
  {
    key: 'pardoned-builder',
    rarity: 'legendary',
    category: 'canon',
    match: ({ achievementIds, events }) =>
      achievementIds.has(407) || events.has(11425) || (events.has(11424) && events.has(11427)),
    titles: ['特赦归来CZ', '走出审判宇宙', '4大师终章版'],
    subtitles: ['你穿过了整场风暴,最后带着赦免回来了。', '这条线里的你没被打垮,只是被重新命名。'],
    tags: ['特赦', '4', '回归', '争议遗产'],
    finalRange: [8_000_000_000, 42_000_000_000],
    peakRange: [36_000_000_000, 110_000_000_000],
    epitaphs: ['你走出来时,所有人对你的定义都变了,但你还在。'],
  },
  {
    key: 'binance-builder',
    rarity: 'epic',
    category: 'canon',
    match: ({ events }) => events.has(11000) || events.has(11011) || events.has(11014),
    titles: ['币安建造者CZ', '极速建所宇宙', '逃离9.4的创业者'],
    subtitles: ['你至少把那座交易所真正建起来了。', '即使主线不完整,你也已经进入了那个最像CZ的宇宙群。'],
    tags: ['Binance', '建所', '创业', '主线'],
    finalRange: [1_600_000_000, 18_000_000_000],
    peakRange: [5_000_000_000, 46_000_000_000],
    epitaphs: ['不是每条线都能封神,但只要交易所真的站起来了,这条线就有分量。'],
  },
  {
    key: 'btc-awakened',
    rarity: 'rare',
    category: 'ordinary',
    match: ({ events }) => events.has(10900),
    titles: ['初见BTC者', '牌桌觉醒宇宙', '入圈前夜CZ'],
    subtitles: ['你已经碰到了命运的入口,只是后面怎么走还不确定。', '这条宇宙可能通向神话,也可能只是一次擦肩而过。'],
    tags: ['BTC', '入圈', '早期', '机会'],
    finalRange: [180_000, 12_000_000],
    peakRange: [600_000, 48_000_000],
    epitaphs: ['有些传奇不是失败了,只是停在还没完全展开的时候。'],
  },
  {
    key: 'bankrupt',
    rarity: 'anomaly',
    category: 'tragedy',
    match: ({ achievementIds, minMoney }) => achievementIds.has(115) || minMoney < 0,
    titles: ['归零宇宙CZ', '负债版CZ', '黑洞资产线'],
    subtitles: ['你把财富曲线做成了悬崖。', '这条宇宙里,你不是没赚过,而是最后全吐回去了。'],
    tags: ['负债', '悲剧', '归零', '异常'],
    finalRange: [-12_000_000, -20_000],
    peakRange: [500_000, 14_000_000_000],
    epitaphs: ['真正让人难忘的,往往不是你赚到多少,而是你最后欠了多少。'],
  },
  {
    key: 'early-death',
    rarity: 'anomaly',
    category: 'tragedy',
    match: ({ achievementIds, age }) => achievementIds.has(114) || age < 30,
    titles: ['未见牛市者', '起飞前夜终止线', '短篇宇宙CZ'],
    subtitles: ['有些宇宙来不及展开,就已经结束。', '这把很短,但它仍然是一个完整版本的你。'],
    tags: ['早夭', '短篇', '异常', '悲剧'],
    finalRange: [-30_000, 90_000],
    peakRange: [0, 350_000],
    epitaphs: ['你甚至没来得及真正入局,但这也是某个宇宙的完整答案。'],
  },
  {
    key: 'ordinary-office',
    rarity: 'common',
    category: 'ordinary',
    match: () => true,
    titles: ['普通上岸CZ', '还没失控的宇宙', '低波动版CZ'],
    subtitles: ['这条宇宙里,你还没有活成梗图,也没有活成神话。', '不是每一局都要极端,普通本身就是稀缺体验。'],
    tags: ['普通人生', '低波动', '过渡线', '再开一把'],
    finalRange: [40_000, 3_600_000],
    peakRange: [120_000, 12_000_000],
    epitaphs: ['这局不够离谱,但它正好提醒你:下一把可能就会失控。'],
  },
];

function hashString(input = '') {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seeded01(seed, salt = 0) {
  const value = Math.sin((seed + salt + 1) * 12.9898) * 43758.5453123;
  return value - Math.floor(value);
}

function sampleRange([min, max], seed, salt = 0) {
  if (min === max) return min;
  return Math.round(min + (max - min) * seeded01(seed, salt));
}

function choose(list, seed, salt = 0) {
  return list[Math.floor(seeded01(seed, salt) * list.length) % list.length];
}

function randomVariationKey() {
  if (globalThis.crypto?.getRandomValues) {
    const buffer = new Uint32Array(1);
    globalThis.crypto.getRandomValues(buffer);
    return buffer[0];
  }
  return Math.floor(Math.random() * 0xffffffff);
}

function inferCategoryTags(template, { age, eventCount, choiceCount, achievementCount, finalNetWorth }) {
  const tags = [...template.tags];
  if (age < 30) tags.push('短命分支');
  if (eventCount > 45) tags.push('长篇宇宙');
  if (choiceCount > 4) tags.push('高分歧');
  if (achievementCount > 6) tags.push('高完成度');
  if (finalNetWorth < 0) tags.push('负债结局');
  return Array.from(new Set(tags)).slice(0, 4);
}

function readCollection() {
  try {
    return JSON.parse(localStorage.getItem(COLLECTION_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeCollection(collection) {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

export function formatUsdShort(value) {
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(abs >= 100_000_000_000 ? 0 : 1)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(abs >= 100_000_000 ? 0 : 1)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(abs >= 100_000 ? 0 : 1)}K`;
  return `${sign}$${Math.round(abs)}`;
}

export function formatUsdLong(value) {
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(Math.round(value));
  return `${sign}$${abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

function getRunSnapshot(core) {
  if (!core?.request) return null;
  const property = core.request(core.Module.PROPERTY);
  if (!property) return null;

  const summary = core.summary;
  const events = (property.get(core.PropertyTypes.EVT) || []).map(Number);
  const achievements = (core.achievements || []).filter(a => a.isAchieved);
  const achievementIds = new Set(achievements.map(a => Number(a.id)));
  const eventIds = new Set(events);
  const age = summary?.[core.PropertyTypes.HAGE]?.value || property.get(core.PropertyTypes.HAGE) || 0;

  return {
    age,
    summary,
    events,
    eventIds,
    achievements,
    achievementIds,
    eventCount: events.length,
    choiceCount: events.filter(id => id >= 15800 && id < 16000).length,
    achievementCount: achievements.length,
    topAchievement: achievements
      .slice()
      .sort((a, b) => (b.grade - a.grade) || (Number(b.id) - Number(a.id)))[0] || null,
    maxMoney: property.get(core.PropertyTypes.HMNY) || 0,
    minMoney: property.get(core.PropertyTypes.LMNY) || 0,
    times: core.times || 0,
  };
}

function resolveTemplate(snapshot) {
  return universeTemplates.find(template => template.match({
    age: snapshot.age,
    events: snapshot.eventIds,
    achievements: snapshot.achievements,
    achievementIds: snapshot.achievementIds,
    maxMoney: snapshot.maxMoney,
    minMoney: snapshot.minMoney,
  })) || universeTemplates[universeTemplates.length - 1];
}

function buildSignature(template, snapshot) {
  const achievementSig = Array.from(snapshot.achievementIds).sort((a, b) => a - b).slice(0, 8).join('.');
  const eventSig = snapshot.events.slice(-12).join('.');
  return [template.key, snapshot.age, snapshot.eventCount, snapshot.choiceCount, achievementSig, eventSig].join('|');
}

function computeWealth(template, snapshot, seed) {
  let finalNetWorth = sampleRange(template.finalRange, seed, 11);
  let peakNetWorth = sampleRange(template.peakRange, seed, 17);
  const volatility = 0.65 + seeded01(seed, 23) * 1.55;
  const peakBoost = 0.85 + seeded01(seed, 29) * 1.9;

  finalNetWorth = Math.round(finalNetWorth * volatility);
  peakNetWorth = Math.round(peakNetWorth * peakBoost);

  if (seeded01(seed, 31) > 0.86) finalNetWorth = Math.round(finalNetWorth * 0.22);
  if (seeded01(seed, 37) > 0.9) peakNetWorth = Math.round(peakNetWorth * 1.6);

  if (snapshot.choiceCount > 4) finalNetWorth = Math.round(finalNetWorth * 1.08);
  if (snapshot.achievementCount > 6) finalNetWorth = Math.round(finalNetWorth * 1.12);
  if (snapshot.age < 30 && finalNetWorth > 0) finalNetWorth = Math.round(finalNetWorth * 0.35);

  if (template.category === 'canon' && snapshot.eventIds.has(11425)) {
    finalNetWorth = Math.round(finalNetWorth * 1.1);
  }
  if (template.category === 'tragedy' && finalNetWorth > 0) {
    finalNetWorth = -Math.round(finalNetWorth * 0.15);
  }

  peakNetWorth = Math.max(peakNetWorth, finalNetWorth > 0 ? finalNetWorth : 0);
  const drawdown = Math.max(0, peakNetWorth - finalNetWorth);
  return { finalNetWorth, peakNetWorth, drawdown };
}

export function buildUniverseResult(core, { persist = false, variationKey = 0 } = {}) {
  const snapshot = getRunSnapshot(core);
  if (!snapshot) return null;

  const template = resolveTemplate(snapshot);
  const signature = buildSignature(template, snapshot);
  const runtimeSignature = `${signature}|${variationKey}`;
  const seed = hashString(runtimeSignature);
  const rarity = rarityPalette[template.rarity];
  const { finalNetWorth, peakNetWorth, drawdown } = computeWealth(template, snapshot, seed);
  const cgId = `CG-${String((hashString(`cg:${runtimeSignature}`) % 997) + 1).padStart(3, '0')}`;
  const czCode = cgId.replace(/^CG-/, 'CZ-');
  const title = choose(template.titles, seed, 2);
  const subtitle = choose(template.subtitles, seed, 3);
  const epitaph = choose(template.epitaphs, seed, 4);
  const tags = inferCategoryTags(template, {
    age: snapshot.age,
    eventCount: snapshot.eventCount,
    choiceCount: snapshot.choiceCount,
    achievementCount: snapshot.achievementCount,
    finalNetWorth,
  });

  const collection = readCollection();
  const isNew = !collection[cgId];
  let collectionCount = Object.keys(collection).length;

  if (persist && isNew) {
    collection[cgId] = {
      title,
      rarity: rarity.label,
      unlockedAt: Date.now(),
    };
    writeCollection(collection);
    collectionCount = Object.keys(collection).length;
  }

  return {
    signature,
    variationKey,
    cgId,
    czCode,
    title,
    subtitle,
    epitaph,
    tags,
    category: categoryLabels[template.category] || categoryLabels.ordinary,
    rarity: rarity.label,
    rarityColor: rarity.color,
    rarityGrade: rarity.grade,
    finalNetWorth,
    peakNetWorth,
    drawdown,
    age: snapshot.age,
    eventCount: snapshot.eventCount,
    choiceCount: snapshot.choiceCount,
    achievementCount: snapshot.achievementCount,
    times: snapshot.times,
    isNew,
    collectionCount,
    persisted: persist,
    topAchievement: snapshot.topAchievement,
  };
}

export function getCurrentUniverseResult(core, { persist = false } = {}) {
  const base = buildUniverseResult(core, { persist: false, variationKey: 0 });
  if (!base) return null;
  const cache = globalThis.__czUniverseResult;
  if (cache?.signature === base.signature) {
    if (persist && !cache.persisted) {
      const collection = readCollection();
      if (!collection[cache.cgId]) {
        collection[cache.cgId] = {
          title: cache.title,
          rarity: cache.rarity,
          unlockedAt: Date.now(),
        };
        writeCollection(collection);
      }
      cache.collectionCount = Object.keys(collection).length;
      cache.persisted = true;
    }
    return cache;
  }

  const fresh = buildUniverseResult(core, {
    persist,
    variationKey: randomVariationKey(),
  });
  globalThis.__czUniverseResult = fresh;
  return fresh;
}
