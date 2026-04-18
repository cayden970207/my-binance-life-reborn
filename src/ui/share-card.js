// 分享卡片模块 — viral传播核心功能
// 当summary页面激活时注入分享按钮,点击生成精美卡片

const GAME_TITLE = '转生之我的币安人生';
const GAME_URL = 'my-binance-life-reborn.vercel.app';

const cardQuotes = [
  '继续走,就能出来。',
  '外面没有别人。',
  '别浪费时间。',
  '做正确的事,而不是容易的事。',
  '时间比钱紧多了。',
  '4.',
  '保护用户,永远对的。',
  '风险因人而异,不参与才是更大的冒险。',
  '网络给了信息自由,区块链将带来金钱自由。',
  '你专注到愿意纹身吗?',
  '别光砌墙,要想着你在盖教堂。',
  '成功长期攒出来。',
  '未来的机会,永远比过去更多。',
];

// ============ 每个成就/结局的专属结语 ============
// 好结局严肃感人,坏结局搞笑鬼畜,中等结局平淡带梗
const achievementEpilogues = {
  // ===== 传说结局 (严肃/燃) =====
  301: '你挡住了整个行业的子弹,让无数人获得了金钱自由。币圈永远记得你。',
  302: '『面好了,加辣吗?』——这一生,你救了300家店的家庭。',
  303: 'Poker face永远是最贵的。你在拉斯维加斯赢了每一手牌,除了人生。',
  304: '屏幕前的500万粉丝,有的人因你发家,有的人因你归零,有的人只是笑一笑。',
  305: '你和V神握过的那只手,让以太坊成了这个时代。',
  306: 'Bloomberg终身成就奖。你从未遇见过CZ——但CZ错过了你。',
  307: 'OKCoin变成了你的OK。徐明星的故事,有另一个结局。',
  308: '邮币卡的那个时代结束了。你留下的30家交易所,是那个时代最后的传说。',
  309: '『您的订单已送达,请给好评。』——这辈子跑了27万单,没中过BTC。',
  310: '『一碗兰州拉面,救过我一生。』——你在店门口贴上这句话。',
  311: '义乌小商品批发大王。你卖出了一亿只9.9包邮的发圈。',
  312: '『保险,还是得买。』你成了朋友圈里行走的巴菲特。',
  313: '『4』已经不是字,是一种生活方式。',
  314: '你招的人,没一个跑路。你建的教堂,至今仍在。',
  315: '你把《创新之栈》读了七遍。',
  401: '你活成了传说。活成了CZ。活成了『外面没有别人』。',
  402: '你在100岁那年悟了:这一切,也许本就是一场模拟。',
  403: '南山寺的晨钟响了,你披着袈裟,心中无一字。',
  404: '死过一次,再活一次——你成了这个游戏的BUG,也成了它的传奇。',
  405: '独一无二的你,在6000万玩家中闪闪发光。',
  406: 'GiggleAcademy的15万学生,每个都知道你的名字。',
  407: '『4』。你最后说的这一个字,让全球币圈破防。',
  408: '2013年那个拉斯维加斯的夜晚,V神坐在你对面,笑了笑。',
  409: '半神CZ。所有属性拉满,这是神的恩赐,不是人力所能。',
  410: '一千次重开,你看见了自己所有的可能性。',
  // ===== 稀有结局 (中二/热血) =====
  201: '你是真的币圈原住民,连狗都懂你。',
  202: '2017.7.14那天,你按下了开始的按钮。',
  203: '凌晨3点的上海,你把硬盘拆下来装进背包。从此,世界变了。',
  204: '600万美金,你眉头没皱一下就出了。后面发生的,都和那一刻有关。',
  205: '全球第一。服务器都快冒烟了,你的团队还在加班。',
  206: '《富比士》的摄影师让你『做自己』。你穿了件连帽衫,被P掉了logo。',
  207: '32小时没合眼。每两小时一条推特,你赢回了全世界。',
  208: '红杉美国输了。那四大箱文件,成了你最贵的一课。',
  209: '7000个比特币,你替用户扛了下来。后来大家都管你叫SAFU。',
  210: '百慕达短裤+连帽衫+人字拖——你重新定义了亿万富翁。',
  211: '一双人字拖走遍世界。CEO的形象,你管它去死。',
  212: '收购CMC那天,Brandon问你:他在你眼里值多少?你回:无价。',
  213: '你看了SBF三秒,心里就知道他有问题。后来,你是对的。',
  214: '飞了41个国家,600小时在飞机上。你不是在工作,是在传教。',
  215: '16亿美金清零,你没卖。理由是:我是大玩家,不能只盯利润。',
  216: '140亿美金挤兑压不垮你。这一战,你证明了什么叫SAFU。',
  218: '你走过了安检门。全世界都在看你,你只说了一句:我尽力了。',
  219: '120天,你瘦了12斤,写了一本书。狱友Jay帮你换了牢房。',
  220: '10.21那天,你在吉尔吉斯山里。网络很差,你是最后一个知道的。',
  221: 'GiggleAcademy,15万学生已经在用。你说这只是开始。',
  222: '胳膊上那个币安logo,有三个人在新加坡一起纹的。',
  // ===== 史诗结局 (梗/魔幻) =====
  // (already covered above)
  // ===== 普通结局 =====
  101: '重开10次。你已经不再是当初那个怕归零的你。',
  102: '重开50次。你对加密的理解,已经超过99%的人。',
  103: '重开200次。孟婆看见你都叹气:又来了。',
  104: '重开500次。你比FTX的债务还能撑。',
  105: '第一次重开,挺好。下一次你会更像CZ。',
  111: '活到80岁,该看的你都看过了。',
  112: '活到90岁。你孙子问你BTC是啥,你笑笑没说话。',
  113: '活到100岁。五代同堂。你桌上仍放着一台交易终端。',
  114: '早夭。命运弄人,但你来过。',
  115: '归零人生。但归零即永恒。',
  116: '孤独终老。你这辈子只和代码谈过恋爱。',
  117: '社恐之王。你靠推特活过了70岁,连超市都不用去。',
  118: '学渣逆袭。班主任当年说你没救了,你现在给她递名片。',
  119: '14岁在麦当劳打过工的人,后来都混得不错。',
  120: '口吃治愈。那位退休语言治疗师,改变了你的一生。',
  121: '省队弹跳差3公分。但你打好了人生这副牌。',
  122: '麦基尔奖学金。你在蒙特娄的冬天写下了第一个Python程序。',
  123: '生物转CS那年,你彻底自由了。',
};

// 按成就稀有度的通用结语(当没有专属结语时fallback)
const fallbackByGrade = {
  0: '这一生不算传奇,但也踏实。',
  1: '你走过了一段不平凡的路。',
  2: '你的故事值得被记住。',
  3: '你,活成了传说。',
};
const noAchEpilogue = '这一把普普通通,但每个重开都是一次修行。下一把,也许你就是CZ。';

// 成就稀有度映射颜色
const gradeColors = {
  0: '#9ca3af', // 普通 灰
  1: '#60a5fa', // 稀有 蓝
  2: '#c084fc', // 史诗 紫
  3: '#fbbf24', // 传说 金
};

const judgeColors = {
  0: '#ef4444', 1: '#f97316', 2: '#f59e0b', 3: '#84cc16',
  4: '#22c55e', 5: '#06b6d4', 6: '#8b5cf6', 7: '#fbbf24',
};

function bar(value, max = 20) {
  const filled = Math.max(0, Math.min(max, Math.round(value)));
  const empty = max - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

function injectStyles() {
  if (document.getElementById('share-card-styles')) return;
  const style = document.createElement('style');
  style.id = 'share-card-styles';
  style.textContent = `
    .bsc-btn-share {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99990;
      background: linear-gradient(135deg, #F0B90B 0%, #FCD535 100%);
      color: #0B1020;
      border: 3px solid #0B1020;
      padding: 10px 20px;
      font-family: monospace, sans-serif;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 4px 4px 0 #000;
      letter-spacing: 1px;
      transition: transform 0.1s;
    }
    .bsc-btn-share:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #000; }
    .bsc-btn-share:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 #000; }

    .bsc-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow-y: auto;
      font-family: 'SimHei', '方正像素12', monospace, sans-serif;
    }

    .bsc-modal {
      max-width: 540px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    #bsc-card {
      width: 500px;
      max-width: 100%;
      background: linear-gradient(160deg, #0B1020 0%, #1a1f2e 100%);
      border: 4px solid #F0B90B;
      border-radius: 8px;
      padding: 28px;
      color: #fff;
      position: relative;
      box-shadow: 0 0 40px rgba(240,185,11,0.3);
      box-sizing: border-box;
    }

    #bsc-card::before {
      content: '';
      position: absolute;
      inset: 8px;
      border: 1px dashed rgba(240,185,11,0.4);
      border-radius: 4px;
      pointer-events: none;
    }

    /* 传说结局特效 */
    #bsc-card.bsc-legendary {
      border-color: #fbbf24;
      background: linear-gradient(160deg, #1a0e02 0%, #3d2408 50%, #0B1020 100%);
      animation: bsc-legendary-glow 2.5s ease-in-out infinite alternate;
      box-shadow: 0 0 60px rgba(251,191,36,0.6), 0 0 100px rgba(240,185,11,0.4);
    }
    @keyframes bsc-legendary-glow {
      from { box-shadow: 0 0 60px rgba(251,191,36,0.5), 0 0 100px rgba(240,185,11,0.3); }
      to { box-shadow: 0 0 90px rgba(251,191,36,0.9), 0 0 150px rgba(240,185,11,0.6); }
    }
    #bsc-card.bsc-legendary .bsc-title {
      background: linear-gradient(90deg, #fbbf24, #fef08a, #fbbf24);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: bsc-gold-shine 2s linear infinite;
    }
    @keyframes bsc-gold-shine {
      from { background-position: 0% 50%; }
      to { background-position: 200% 50%; }
    }
    /* 烟花粒子 */
    .bsc-firework {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 2;
    }
    @keyframes bsc-firework-burst {
      0% { transform: translate(0,0) scale(0.5); opacity: 1; }
      100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
    }
    .bsc-epilogue {
      margin-top: 14px;
      padding: 12px 14px;
      background: rgba(240,185,11,0.08);
      border-left: 3px solid #F0B90B;
      border-radius: 3px;
      font-size: 13px;
      line-height: 1.6;
      color: #fef3c7;
      font-style: italic;
    }
    .bsc-legendary .bsc-epilogue {
      background: rgba(251,191,36,0.18);
      border-left-color: #fbbf24;
      color: #fff7db;
      font-weight: bold;
    }
    .bsc-top-ending {
      text-align: center;
      margin: 10px 0 6px;
      padding: 10px 0;
      background: rgba(240,185,11,0.12);
      border-radius: 4px;
      border: 1px solid rgba(240,185,11,0.3);
    }
    .bsc-top-ending-label {
      font-size: 10px;
      color: #a1a1aa;
      letter-spacing: 3px;
      margin-bottom: 4px;
    }
    .bsc-top-ending-name {
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .bsc-legendary .bsc-top-ending {
      background: linear-gradient(90deg, rgba(251,191,36,0.15), rgba(254,240,138,0.25), rgba(251,191,36,0.15));
      background-size: 200% 100%;
      animation: bsc-gold-shine 3s linear infinite;
      border-color: #fbbf24;
    }

    .bsc-head { text-align: center; margin-bottom: 16px; }
    .bsc-title {
      font-size: 24px;
      font-weight: bold;
      color: #F0B90B;
      letter-spacing: 2px;
      margin-bottom: 4px;
    }
    .bsc-subtitle { font-size: 11px; color: #a1a1aa; letter-spacing: 1px; }
    .bsc-section { border-top: 2px dashed #F0B90B66; margin: 14px 0 10px; padding-top: 10px; }
    .bsc-section-title { font-size: 11px; color: #F0B90B; letter-spacing: 2px; margin-bottom: 8px; text-align: center; }
    .bsc-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 14px; }
    .bsc-row-label { color: #a1a1aa; }
    .bsc-row-value { color: #fff; font-weight: bold; }
    .bsc-stat {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 6px 0;
      font-size: 12px;
      font-family: monospace;
    }
    .bsc-stat-name { width: 50px; color: #a1a1aa; }
    .bsc-stat-bar { flex: 1; color: #F0B90B; letter-spacing: -1px; }
    .bsc-stat-val { width: 30px; text-align: right; color: #fff; }

    .bsc-ach { padding: 4px 0; font-size: 13px; }
    .bsc-ach-icon { display: inline-block; width: 20px; }
    .bsc-ach-grade0 { color: #9ca3af; }
    .bsc-ach-grade1 { color: #60a5fa; }
    .bsc-ach-grade2 { color: #c084fc; }
    .bsc-ach-grade3 { color: #fbbf24; font-weight: bold; }

    .bsc-quote {
      text-align: center;
      font-size: 14px;
      color: #F0B90B;
      padding: 14px 8px 4px;
      font-style: italic;
    }

    .bsc-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px solid rgba(255,255,255,0.1);
      font-size: 10px;
      color: #71717a;
    }
    .bsc-footer .bsc-url { color: #F0B90B; }

    .bsc-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .bsc-action {
      flex: 1;
      min-width: 120px;
      background: #F0B90B;
      color: #0B1020;
      border: 2px solid #0B1020;
      padding: 10px 14px;
      font-family: monospace;
      font-size: 13px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 4px;
      letter-spacing: 1px;
      box-shadow: 3px 3px 0 #000;
      transition: transform 0.1s;
    }
    .bsc-action:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0 #000; }
    .bsc-action-sec {
      background: transparent;
      color: #F0B90B;
      border-color: #F0B90B;
      box-shadow: 3px 3px 0 rgba(240,185,11,0.3);
    }
    .bsc-action-primary {
      background: linear-gradient(135deg, #F0B90B 0%, #FCD535 100%);
      color: #0B0E11;
      font-size: 15px;
      padding: 12px 16px;
      min-width: 100%;
      box-shadow: 4px 4px 0 #000;
    }
    .bsc-action-primary:hover {
      box-shadow: 6px 6px 0 #000;
    }
    .bsc-close {
      position: absolute;
      top: 12px;
      right: 16px;
      color: #F0B90B;
      font-size: 22px;
      cursor: pointer;
      background: transparent;
      border: none;
      z-index: 1;
    }
    .bsc-toast {
      position: fixed;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: #F0B90B;
      color: #000;
      padding: 10px 20px;
      border-radius: 4px;
      font-family: monospace;
      z-index: 100000;
      box-shadow: 3px 3px 0 #000;
    }
  `;
  document.head.appendChild(style);
}

function getRunData() {
  try {
    const summary = globalThis.core.summary;
    const achievements = globalThis.core.achievements || [];
    const props = globalThis.core.propertys || {};

    return {
      age: summary.HAGE?.value || 0,
      ageJudge: globalThis.$lang?.[summary.HAGE?.judge] || '',
      total: summary.SUM?.value || 0,
      totalGrade: summary.SUM?.grade || 0,
      totalJudge: globalThis.$lang?.[summary.SUM?.judge] || '',
      chr: summary.HCHR?.value || 0,
      int: summary.HINT?.value || 0,
      str: summary.HSTR?.value || 0,
      mny: summary.HMNY?.value || 0,
      spr: summary.HSPR?.value || 0,
      achievements: achievements
        .filter(a => a.isAchieved)
        .sort((a, b) => b.grade - a.grade)
        .slice(0, 5),
      times: globalThis.core.times || 0,
    };
  } catch (e) {
    console.warn('[ShareCard] getRunData failed', e);
    return null;
  }
}

function renderCard(data) {
  const quote = cardQuotes[Math.floor(Math.random() * cardQuotes.length)];
  const achs = data.achievements.length > 0
    ? data.achievements.map(a => `<div class="bsc-ach bsc-ach-grade${a.grade}"><span class="bsc-ach-icon">🏆</span>${a.name}</div>`).join('')
    : '<div class="bsc-ach" style="color:#71717a">本次重开无新成就解锁</div>';

  const topAch = data.achievements[0];
  const epilogue = topAch
    ? (achievementEpilogues[topAch.id] || fallbackByGrade[topAch.grade] || fallbackByGrade[0])
    : noAchEpilogue;

  const topEndingBlock = topAch
    ? `
    <div class="bsc-top-ending">
      <div class="bsc-top-ending-label">══ 人生结局 ══</div>
      <div class="bsc-top-ending-name bsc-ach-grade${topAch.grade}">${topAch.name}</div>
    </div>`
    : '';

  return `
    <div class="bsc-head">
      <div class="bsc-title">${GAME_TITLE}</div>
      <div class="bsc-subtitle">MY BINANCE LIFE · REBORN</div>
    </div>

    ${topEndingBlock}

    <div class="bsc-row"><span class="bsc-row-label">享年</span><span class="bsc-row-value" style="color:${judgeColors[data.totalGrade]}">${data.age} 岁 · ${data.ageJudge}</span></div>
    <div class="bsc-row"><span class="bsc-row-label">总评</span><span class="bsc-row-value" style="color:${judgeColors[data.totalGrade]}">${data.totalJudge}</span></div>
    <div class="bsc-row"><span class="bsc-row-label">重开次数</span><span class="bsc-row-value">第 ${data.times} 次</span></div>

    <div class="bsc-section">
      <div class="bsc-section-title">——— 属性终结值 ———</div>
      <div class="bsc-stat"><span class="bsc-stat-name">魅力</span><span class="bsc-stat-bar">${bar(data.chr)}</span><span class="bsc-stat-val">${data.chr}</span></div>
      <div class="bsc-stat"><span class="bsc-stat-name">技术</span><span class="bsc-stat-bar">${bar(data.int)}</span><span class="bsc-stat-val">${data.int}</span></div>
      <div class="bsc-stat"><span class="bsc-stat-name">道德</span><span class="bsc-stat-bar">${bar(data.str)}</span><span class="bsc-stat-val">${data.str}</span></div>
      <div class="bsc-stat"><span class="bsc-stat-name">商嗅</span><span class="bsc-stat-bar">${bar(data.mny)}</span><span class="bsc-stat-val">${data.mny}</span></div>
      <div class="bsc-stat"><span class="bsc-stat-name">快乐</span><span class="bsc-stat-bar">${bar(data.spr)}</span><span class="bsc-stat-val">${data.spr}</span></div>
    </div>

    <div class="bsc-section">
      <div class="bsc-section-title">——— 解锁成就 ———</div>
      ${achs}
    </div>

    <div class="bsc-epilogue">${epilogue}</div>

    <div class="bsc-quote">「${quote}」</div>

    <div class="bsc-footer">
      <span>#转生之我的币安人生</span>
      <span class="bsc-url">${GAME_URL}</span>
    </div>
  `;
}

function spawnFireworks(cardEl) {
  const colors = ['#fbbf24','#fef08a','#F0B90B','#f97316','#fff'];
  for (let i = 0; i < 40; i++) {
    const fw = document.createElement('div');
    fw.className = 'bsc-firework';
    fw.style.background = colors[i % colors.length];
    fw.style.left = (40 + Math.random() * 20) + '%';
    fw.style.top = (30 + Math.random() * 10) + '%';
    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 200;
    fw.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    fw.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    fw.style.animation = `bsc-firework-burst ${1 + Math.random()}s ease-out ${Math.random() * 0.5}s forwards`;
    cardEl.appendChild(fw);
    setTimeout(() => fw.remove(), 2500);
  }
}

// 使用Canvas API把card渲染成图片(兼容所有浏览器)
async function cardToImage(cardEl) {
  const rect = cardEl.getBoundingClientRect();
  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = rect.width * scale;
  canvas.height = rect.height * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  // 尝试使用 foreignObject SVG 方法
  try {
    const data = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'SimHei', monospace, sans-serif;">
          ${cardEl.outerHTML}
        </div>
      </foreignObject>
    </svg>`;
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(data)));
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      setTimeout(reject, 3000);
    });
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
  } catch (e) {
    // 后备: 直接画一个简易卡片
    return renderCardCanvas(canvas, ctx, rect);
  }
}

function renderCardCanvas(canvas, ctx, rect) {
  const data = getRunData() || {};
  // 渐变背景
  const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
  gradient.addColorStop(0, '#0B1020');
  gradient.addColorStop(1, '#1a1f2e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);
  // 边框
  ctx.strokeStyle = '#F0B90B';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, rect.width - 4, rect.height - 4);
  // 标题
  ctx.fillStyle = '#F0B90B';
  ctx.font = 'bold 26px "SimHei", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(GAME_TITLE, rect.width / 2, 50);
  ctx.fillStyle = '#a1a1aa';
  ctx.font = '11px monospace';
  ctx.fillText('MY BINANCE LIFE · REBORN', rect.width / 2, 72);
  // 主体文本
  ctx.textAlign = 'left';
  ctx.fillStyle = '#fff';
  ctx.font = '14px "SimHei", monospace';
  let y = 110;
  ctx.fillText(`享年: ${data.age} 岁`, 30, y); y += 24;
  ctx.fillText(`总评: ${data.totalJudge || '-'}`, 30, y); y += 24;
  ctx.fillText(`重开次数: 第 ${data.times} 次`, 30, y); y += 30;
  ctx.fillStyle = '#F0B90B';
  ctx.fillText('──── 属性终结值 ────', 30, y); y += 26;
  ctx.fillStyle = '#fff';
  const stats = [
    ['魅力', data.chr], ['技术', data.int], ['道德', data.str],
    ['商嗅', data.mny], ['快乐', data.spr],
  ];
  for (const [n, v] of stats) {
    ctx.fillText(`${n}: ${bar(v)} ${v}`, 30, y); y += 20;
  }
  y += 10;
  ctx.fillStyle = '#F0B90B';
  ctx.fillText('──── 解锁成就 ────', 30, y); y += 26;
  ctx.fillStyle = '#fff';
  for (const a of (data.achievements || []).slice(0, 5)) {
    ctx.fillStyle = gradeColors[a.grade] || '#fff';
    ctx.fillText(`🏆 ${a.name}`, 30, y); y += 22;
  }
  y += 10;
  ctx.fillStyle = '#F0B90B';
  ctx.font = 'italic 14px "SimHei", monospace';
  ctx.textAlign = 'center';
  const quote = cardQuotes[Math.floor(Math.random() * cardQuotes.length)];
  ctx.fillText(`「${quote}」`, rect.width / 2, y + 20);
  // 底部
  ctx.font = '10px monospace';
  ctx.fillStyle = '#71717a';
  ctx.textAlign = 'left';
  ctx.fillText('#转生之我的币安人生', 30, rect.height - 20);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#F0B90B';
  ctx.fillText(GAME_URL, rect.width - 30, rect.height - 20);

  return canvas.toDataURL('image/png');
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'bsc-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

export function openShareCard({ onRestart } = {}) {
  const data = getRunData();
  if (!data) {
    showToast('尚无本局数据,请先完成一次人生');
    return;
  }

  injectStyles();

  const topAch = data.achievements[0];
  const isLegendary = topAch && topAch.grade === 3;

  const overlay = document.createElement('div');
  overlay.className = 'bsc-overlay';
  overlay.innerHTML = `
    <div class="bsc-modal">
      <div id="bsc-card" class="${isLegendary ? 'bsc-legendary' : ''}">
        ${onRestart ? '' : '<button class="bsc-close" aria-label="close">×</button>'}
        ${renderCard(data)}
      </div>
      <div class="bsc-actions">
        ${onRestart ? '<button class="bsc-action bsc-action-primary" id="bsc-restart">↻ 再来一把</button>' : ''}
        <button class="bsc-action" id="bsc-download">📥 下载PNG</button>
        <button class="bsc-action" id="bsc-tweet">🐦 发到推特</button>
        <button class="bsc-action bsc-action-sec" id="bsc-copy">📋 复制文字</button>
      </div>
    </div>
  `;

  // 只有在非"结局卡"模式下才能点击外部关闭
  if (!onRestart) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
    overlay.querySelector('.bsc-close')?.addEventListener('click', () => overlay.remove());
  }

  overlay.querySelector('#bsc-restart')?.addEventListener('click', () => {
    overlay.remove();
    onRestart();
  });

  overlay.querySelector('#bsc-download').addEventListener('click', async () => {
    const cardEl = overlay.querySelector('#bsc-card');
    try {
      const dataUrl = await cardToImage(cardEl);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `币安人生_第${data.times}次.png`;
      a.click();
      showToast('卡片已下载');
    } catch (e) {
      console.error(e);
      showToast('下载失败,请截图');
    }
  });

  overlay.querySelector('#bsc-tweet').addEventListener('click', () => {
    const topAch = data.achievements[0]?.name || '普通一生';
    const text = encodeURIComponent(
      `我在《转生之我的币安人生》活到${data.age}岁,解锁结局:${topAch}\n总评:${data.totalJudge}\n\n#转生之我的币安人生 #CZ #Binance\n${GAME_URL}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  });

  overlay.querySelector('#bsc-copy').addEventListener('click', () => {
    const topAch = data.achievements[0]?.name || '普通一生';
    const text = `我在《${GAME_TITLE}》活到${data.age}岁,解锁结局: ${topAch}\n总评: ${data.totalJudge} · 第${data.times}次重开\n属性: 魅${data.chr}/技${data.int}/道${data.str}/商${data.mny}/乐${data.spr}\n\n${GAME_URL}`;
    navigator.clipboard.writeText(text).then(
      () => showToast('已复制到剪贴板'),
      () => showToast('复制失败')
    );
  });

  document.body.appendChild(overlay);

  // 传说结局特效: 烟花
  if (isLegendary) {
    const cardEl = overlay.querySelector('#bsc-card');
    setTimeout(() => spawnFireworks(cardEl), 200);
    setTimeout(() => spawnFireworks(cardEl), 1200);
    setTimeout(() => spawnFireworks(cardEl), 2200);
  }
}

// ===== 公开API: 在summary view创建时调用 =====
let shareBtnInjected = false;
export function mountShareButton() {
  if (shareBtnInjected) return;
  shareBtnInjected = true;
  injectStyles();
  const btn = document.createElement('button');
  btn.className = 'bsc-btn-share';
  btn.textContent = '📸 生成分享卡';
  btn.addEventListener('click', openShareCard);
  document.body.appendChild(btn);
  // 暴露给控制台使用
  globalThis.$$shareCard = openShareCard;
}

export function unmountShareButton() {
  shareBtnInjected = false;
  document.querySelector('.bsc-btn-share')?.remove();
}
