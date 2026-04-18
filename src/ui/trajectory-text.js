const AGE_CHAPTERS = {
  0: ['起源', '你来到这个宇宙,故事从这里开始。'],
  18: ['离家', '你第一次要替自己决定以后的人生。'],
  23: ['起步', '世界开始按成年人的方式考验你。'],
  31: ['转场', '旧生活开始松动,新的野心慢慢冒头。'],
  35: ['入圈前夜', '命运开始把你往加密宇宙那边推。'],
  40: ['建所时刻', '从这一段开始,很多选择都会改写后半生。'],
  45: ['风暴中心', '监管、舆论、风险,都开始一起扑过来。'],
  50: ['遗产分岔', '你已经不只是在赚钱,也在决定自己会被怎样记住。'],
  60: ['余波', '高光和代价都慢慢沉淀成余生。'],
};

const COMMENTARY_POOLS = {
  partner: [
    '你负责往前冲,有人替你把身后的线重新拧紧了。',
    '有些宇宙能成事,不是因为你一个人强,而是因为有人一直在托底。',
    '真正的伙伴不会抢你的戏,只会让你的下一步更稳。',
  ],
  person: [
    '币圈像个巨大饭局,总有几张熟脸隔几年又会重新坐回来。',
    '有些人出现不是为了改命,是为了提醒你这仍然是同一个江湖。',
    '这行最魔幻的地方是,你永远不知道下次聊天会不会变成下一段剧情。',
  ],
  crisis: [
    '风暴从来不先打招呼,它只会先改掉你的睡眠。',
    '从这一刻开始,你已经不只是在创业,也是在扛雷。',
    '麻烦真正可怕的地方,不是它大,是它总在你刚忙完的时候再来一次。',
  ],
  highlight: [
    '高光会让人误以为一切都开始站在你这边了。',
    '这类时刻最危险,因为它太容易让人忘了代价还在后面排队。',
    '掌声一多,命运就喜欢顺手往桌上再加一道更难的题。',
  ],
  choice: [
    '宇宙没有给你标准答案,只给了后果。',
    '按钮按下去以后,这条线就开始往另一个版本偏了。',
    '很多年后再回头看,你会发现分叉往往就长这样。',
  ],
  key: [
    '这一年最好记住,以后很多事都会从这里倒着长出来。',
    '有些节点当下看只是普通一天,后来却会变成整条线的分水岭。',
    '命运真正拐弯的时候,通常都不会提前给你预告片。',
  ],
};

function hashString(input = '') {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickCommentary(pool, key) {
  if (!pool?.length) return '';
  return pool[hashString(key) % pool.length];
}

function formatChapter(age) {
  const chapter = AGE_CHAPTERS[age];
  if (!chapter) return '';
  const [title, subtitle] = chapter;
  return `【阶段】${title}\n${subtitle}`;
}

function classifyEvent({ type, description = '', eventId, grade }) {
  if (type === 'TLT') return '【天赋】';
  if (description.startsWith('→ 你选择了:')) return '【你的选择】';
  if (eventId >= 12306 && eventId <= 12309) return '【伙伴】';
  if ((eventId >= 12300 && eventId <= 12305) || (eventId >= 12310 && eventId <= 12313)) return '【人物】';
  if (eventId >= 13000 && eventId <= 13209) return '【终局】';
  if (/被盗|起诉|调查|认罪|入狱|禁令|爆雷|崩盘|提币潮|罚款|拘留|脱锚|通缉/u.test(description)) return '【危机】';
  if (/上线|加入|成立|成为|特赦|胜诉|回归|捐|慈善|里程碑|封面|合作|涨到/u.test(description)) return '【高光】';
  if (grade >= 3) return '【关键】';
  return '【经历】';
}

function normalizeDescription(entry) {
  const { type, description = '', name } = entry;
  if (type === 'TLT') return `${name}：${description}`;
  if (description.startsWith('→ 你选择了:')) {
    return description.replace(/^→\s*/u, '');
  }
  return description.replace(/^【抉择】\s*/u, '');
}

function commentaryCategory(entry, prefix) {
  if (prefix === '【伙伴】') return 'partner';
  if (prefix === '【人物】') return 'person';
  if (prefix === '【危机】') return 'crisis';
  if (prefix === '【高光】') return 'highlight';
  if (prefix === '【你的选择】') return 'choice';
  if ((entry.grade || 0) >= 3) return 'key';
  return null;
}

function formatEntry(entry) {
  const prefix = classifyEvent(entry);
  const body = normalizeDescription(entry);
  const postEvent = entry.postEvent ? `\n↳ ${entry.postEvent}` : '';
  const commentaryType = commentaryCategory(entry, prefix);
  const commentary = commentaryType
    ? pickCommentary(
        COMMENTARY_POOLS[commentaryType],
        `${entry.eventId || body}-${entry.description || body}-${entry.grade || 0}`
      )
    : '';
  const aside = commentary ? `\n旁白：${commentary}` : '';
  return `${prefix}${body}${postEvent}${aside}`;
}

export function buildTrajectoryText(age, content) {
  const sections = [];
  const chapter = formatChapter(age);
  if (chapter) sections.push(chapter);
  sections.push(
    ...content
      .filter(Boolean)
      .map(formatEntry)
      .filter(Boolean)
  );
  return sections.join('\n\n');
}
