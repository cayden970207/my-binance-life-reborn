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

function formatEntry(entry) {
  const prefix = classifyEvent(entry);
  const body = normalizeDescription(entry);
  const postEvent = entry.postEvent ? `\n↳ ${entry.postEvent}` : '';
  return `${prefix}${body}${postEvent}`;
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
