// 主生成器 - 输出所有JSON到 public/data/zh-cn/
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildTalents } from './talents.mjs';
import { buildAchievements } from './achievements.mjs';
import { buildCharacters } from './characters.mjs';
import { buildAges } from './age-map.mjs';
import { allEventsEarly } from './events-early.mjs';
import { allEventsCareer } from './events-career.mjs';
import { allEventsBinance } from './events-binance.mjs';
import { allEventsFiller } from './events-filler.mjs';
import { allEventsBulk } from './events-bulk.mjs';
import { events2025 } from './events-2025.mjs';
import { eventsDeath } from './events-death.mjs';
import { choiceEvents } from './events-choices.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outDir = resolve(__dirname, '..', 'public', 'data', 'zh-cn');

// ---- 构建事件 ----
// 主线剧情事件ID范围 — 这些事件会自动放开 TLT?[] 硬门槛,让CZ剧情对所有玩家都能触发
const STORYLINE_RANGES = [
  [10900, 10999], // 加密觉醒
  [11000, 11199], // 币安崛起
  [11300, 11499], // 监管战争
];

// 需要自动去重(每个事件最多触发一次)的ID范围
const DEDUP_RANGES = [
  [10900, 11499], // 所有主线剧情
  [12300, 12319], // 中年角色 cameo
  [11900, 11940], // 重大人生变故(父母去世/离婚/坐牢等)
  [12000, 12299], // 2025-2026 热点事件
  [13000, 13209], // 死亡事件(自然只会触发一次,但以防万一)
  [20000, 20099], // 结局分岔
];

function inRanges(id, ranges) {
  return ranges.some(([lo, hi]) => id >= lo && id <= hi);
}
function isStoryline(id) { return inRanges(id, STORYLINE_RANGES); }
function needsDedup(id) { return inRanges(id, DEDUP_RANGES); }

function sanitizeTimelineText(text) {
  if (!text) return text;

  let s = `${text}`;

  // Strip leading absolute dates so event copy no longer clashes with the
  // player's current run age.
  s = s.replace(
    /^(?:[12]\d{3}(?:[./-]\d{1,2}){0,2}|[12]\d{3}年(?:\d{1,2}月(?:\d{1,2}日?)?)?|\d{1,2}\.\d{1,2})(?:\s*\d{1,2}(?::\d{2})?点?)?\s*/u,
    ''
  );

  // Remove embedded calendar years / full dates, but keep amounts and counts.
  s = s
    .replace(/[12]\d{3}-[12]\d{3}/gu, '')
    .replace(/[12]\d{3}(?:[./-]\d{1,2}){1,2}/gu, '')
    .replace(/[12]\d{3}年(?:\d{1,2}月(?:\d{1,2}日?)?)?/gu, '')
    .replace(/(^|[，,。；;、\s])\d{1,2}\.\d{1,2}(?=[，,。；;、\s])/gu, '$1');

  // Remove explicit player-age wording like "你35岁那年" / "你50岁了".
  s = s
    .replace(/你\d+岁那年[，,]?/gu, '你当时,')
    .replace(/你\d+岁时[，,]?/gu, '你当时,')
    .replace(/你\d+岁第一次/gu, '你第一次')
    .replace(/你\d+岁(?:了)?[，,]?/gu, '你')
    .replace(/\d+岁那年/gu, '那时')
    .replace(/\d+岁时/gu, '当时')
    .replace(/^\d+岁那年[，,]?/gu, '')
    .replace(/^\d+岁[，,]?/gu, '');

  // Collapse punctuation artifacts left behind by the removals.
  s = s
    .replace(/^[，,、。；;\s]+/gu, '')
    .replace(/【抉择】[，,]/gu, '【抉择】')
    .replace(/^(【抉择】)?凌晨[，,]\s*/u, '$1')
    .replace(/^你当时,/gu, '后来,')
    .replace(/([，,])当时才/gu, '$1后来才')
    .replace(/你[，,]/gu, '你')
    .replace(/[，,]\s*[，,]/gu, '，')
    .replace(/[，,]\s*([。！？；;])/gu, '$1')
    .replace(/\s{2,}/gu, ' ')
    .trim();

  return s || text;
}

// 把 include 里的 "TLT?[xxx]" 条件全部去掉,只保留 EVT?[]/AGE?/属性条件
function relaxGates(includeStr) {
  if (!includeStr) return includeStr;
  let s = includeStr;
  // 反复删除所有 TLT?/TLT! 片段以及其前后的 &/|
  // 先删除 TLT?[...] | 或 TLT?[...] & 这种(片段后面有操作符)
  while (/TLT[?!]\[[0-9,\s]*\]\s*[&|]/.test(s)) {
    s = s.replace(/TLT[?!]\[[0-9,\s]*\]\s*[&|]\s*/, '');
  }
  // 再删除 | TLT?[...] 或 & TLT?[...] 这种(片段前面有操作符)
  while (/[&|]\s*TLT[?!]\[[0-9,\s]*\]/.test(s)) {
    s = s.replace(/\s*[&|]\s*TLT[?!]\[[0-9,\s]*\]/, '');
  }
  // 最后删除单独的 TLT?[...] 或整个 ( ... ) 包裹
  s = s.replace(/\(\s*TLT[?!]\[[0-9,\s]*\]\s*\)/g, '');
  s = s.replace(/TLT[?!]\[[0-9,\s]*\]/g, '');
  // 清理多余的空括号和前后操作符
  s = s.replace(/\(\s*\)/g, '').replace(/^\s*[&|]\s*/, '').replace(/\s*[&|]\s*$/, '').trim();
  return s || null;
}

function buildEvents() {
  const allEvents = [
    ...allEventsEarly,
    ...allEventsCareer,
    ...allEventsBinance,
    ...allEventsFiller,
    ...allEventsBulk,
    ...events2025,
    ...eventsDeath,
    ...choiceEvents,
  ];
  const out = {};
  const seen = new Set();
  let relaxed = 0;
  for (const [id, event, extras = {}] of allEvents) {
    if (seen.has(id)) {
      console.warn(`⚠️  重复事件ID: ${id}, 跳过`);
      continue;
    }
    seen.add(id);
    const entry = { id, event: sanitizeTimelineText(event) };
    if (extras.effect) entry.effect = extras.effect;
    if (extras.NoRandom) entry.NoRandom = extras.NoRandom;
    if (extras.branch) entry.branch = extras.branch;
    if (extras.include) entry.include = extras.include;
    if (extras.exclude) entry.exclude = extras.exclude;
    if (extras.postEvent) entry.postEvent = sanitizeTimelineText(extras.postEvent);
    if (extras.grade !== undefined) entry.grade = extras.grade;
    if (extras.choices) {
      entry.choices = extras.choices.map(choice => ({
        ...choice,
        label: sanitizeTimelineText(choice.label),
      }));
    }
    // 主线剧情: 放开 include 里的 TLT?[] 硬门槛
    if (isStoryline(id) && entry.include) {
      const original = entry.include;
      const cleaned = relaxGates(original);
      if (cleaned !== original) {
        if (cleaned) entry.include = cleaned;
        else delete entry.include;
        relaxed++;
      }
    }
    // 自动去重: 把自身ID加入exclude,确保每个重要事件最多触发一次
    if (needsDedup(id)) {
      const selfRef = `EVT?[${id}]`;
      if (!entry.exclude) {
        entry.exclude = selfRef;
      } else if (!entry.exclude.includes(`EVT?[${id}]`) && !entry.exclude.includes(`EVT?[${id},`) && !entry.exclude.includes(`,${id}]`) && !entry.exclude.includes(`,${id},`)) {
        // 合并到现有exclude: 用 | 连接(OR逻辑 — 任一条件满足就排除)
        entry.exclude = `(${entry.exclude})|${selfRef}`;
      }
    }
    out[String(id)] = entry;
  }
  if (relaxed) console.log(`🔓 主线剧情放开门槛: ${relaxed} 个事件`);
  return out;
}

const talents = buildTalents();
const events = buildEvents();
const achievements = buildAchievements();
const characters = buildCharacters();
let ages = buildAges();

// Filter out age pool entries referencing non-existent events
const eventIdSet = new Set(Object.keys(events));
let pruned = 0;
for (const a in ages) {
  const before = ages[a].event.length;
  ages[a].event = ages[a].event.filter(e => {
    const eid = String(e).split('*')[0];
    if (!eventIdSet.has(eid)) { pruned++; return false; }
    return true;
  });
  if (Array.isArray(ages[a].cameo)) {
    ages[a].cameo = ages[a].cameo.filter(e => {
      const eid = String(e).split('*')[0];
      if (!eventIdSet.has(eid)) { pruned++; return false; }
      return true;
    });
  }
}
if (pruned) console.log(`🔧 修复: 从age pool移除了${pruned}个不存在的event引用`);

function dump(name, data) {
  const path = resolve(outDir, `${name}.json`);
  writeFileSync(path, JSON.stringify(data));
  console.log(`✓ ${name}.json  (${Object.keys(data).length} entries)  → ${path}`);
}

dump('talents', talents);
dump('events', events);
dump('achievement', achievements);
dump('character', characters);
dump('age', ages);

console.log('\n🎮 数据生成完成!');
console.log(`   Talents:      ${Object.keys(talents).length}`);
console.log(`   Events:       ${Object.keys(events).length}`);
console.log(`   Achievements: ${Object.keys(achievements).length}`);
console.log(`   Characters:   ${Object.keys(characters).length}`);
console.log(`   Ages:         ${Object.keys(ages).length}`);
