// 关键抉择弹窗 — 覆盖在Laya canvas之上的DOM overlay
// 检测到事件带 choices[] 时,暂停游戏,弹窗让玩家选A/B/C/D

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const s = document.createElement('style');
  s.textContent = `
    .bc-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.82);
      z-index: 99900;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      font-family: 'SimHei','方正像素12',monospace,sans-serif;
      animation: bc-fadein 0.25s ease-out;
    }
    @keyframes bc-fadein { from { opacity: 0; } to { opacity: 1; } }
    .bc-modal {
      max-width: 520px;
      width: 100%;
      background: linear-gradient(160deg, #0B0E11 0%, #181A20 100%);
      border: 4px solid #F0B90B;
      border-radius: 6px;
      padding: 24px;
      color: #EAECEF;
      box-shadow: 0 0 50px rgba(240,185,11,0.5);
      position: relative;
      animation: bc-slidein 0.35s ease-out;
    }
    @keyframes bc-slidein {
      from { transform: translateY(30px) scale(0.96); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }
    .bc-modal::before {
      content: '';
      position: absolute;
      inset: 6px;
      border: 1px dashed rgba(240,185,11,0.35);
      border-radius: 3px;
      pointer-events: none;
    }
    .bc-badge {
      display: inline-block;
      background: #F0B90B;
      color: #0B0E11;
      padding: 4px 10px;
      font-size: 12px;
      letter-spacing: 3px;
      font-weight: bold;
      border-radius: 2px;
      margin-bottom: 14px;
    }
    .bc-age {
      font-size: 12px;
      color: #848E9C;
      float: right;
      letter-spacing: 1px;
      padding-top: 6px;
    }
    .bc-question {
      font-size: 18px;
      line-height: 1.6;
      color: #EAECEF;
      margin-bottom: 22px;
      padding-bottom: 14px;
      border-bottom: 1px dashed rgba(240,185,11,0.25);
    }
    .bc-choice {
      display: block;
      width: 100%;
      text-align: left;
      background: #181A20;
      color: #EAECEF;
      border: 2px solid #2B2F36;
      padding: 14px 16px;
      margin-bottom: 10px;
      font-size: 15px;
      font-family: inherit;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.15s;
      position: relative;
    }
    .bc-choice:hover {
      background: #2B2F36;
      border-color: #F0B90B;
      transform: translateX(4px);
      box-shadow: -4px 0 0 #F0B90B;
    }
    .bc-choice-label {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .bc-choice-index {
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 24px;
      text-align: center;
      background: transparent;
      color: #F0B90B;
      border: 2px solid #F0B90B;
      border-radius: 50%;
      font-weight: bold;
      font-size: 14px;
      flex-shrink: 0;
    }
    .bc-choice:hover .bc-choice-index {
      background: #F0B90B;
      color: #0B0E11;
    }
    .bc-choice-effect {
      display: inline-block;
      margin-left: 8px;
      font-size: 11px;
      color: #848E9C;
      letter-spacing: 1px;
    }
    .bc-effect-pos { color: #0ECB81; }
    .bc-effect-neg { color: #F6465D; }
  `;
  document.head.appendChild(s);
}

// 属性标签映射
const PROP_LABELS = { CHR: '魅', INT: '技', STR: '道', MNY: '商', SPR: '乐', LIF: '命' };

function formatEffect(effect) {
  if (!effect) return '';
  const parts = [];
  for (const [k, v] of Object.entries(effect)) {
    if (v === 0) continue;
    const label = PROP_LABELS[k] || k;
    const sign = v > 0 ? '+' : '';
    const cls = v > 0 ? 'bc-effect-pos' : 'bc-effect-neg';
    parts.push(`<span class="${cls}">${label}${sign}${v}</span>`);
  }
  return parts.join(' ');
}

export function showChoiceModal({ age, question, choices }, onPick) {
  injectStyles();
  const overlay = document.createElement('div');
  overlay.className = 'bc-overlay';

  const choicesHtml = choices.map((c, i) => `
    <button class="bc-choice" data-idx="${i}">
      <span class="bc-choice-label">
        <span class="bc-choice-index">${String.fromCharCode(65 + i)}</span>
        <span>${c.label}</span>
      </span>
      <div class="bc-choice-effect">${formatEffect(c.effect)}</div>
    </button>
  `).join('');

  overlay.innerHTML = `
    <div class="bc-modal">
      <span class="bc-age">${age != null ? `${age} 岁` : ''}</span>
      <div class="bc-badge">⚡ 人 生 抉 择</div>
      <div class="bc-question">${question}</div>
      <div class="bc-choices">${choicesHtml}</div>
    </div>
  `;

  overlay.querySelectorAll('.bc-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.idx);
      const chosen = choices[idx];
      overlay.remove();
      if (onPick) onPick(chosen, idx);
    });
  });

  document.body.appendChild(overlay);
}
