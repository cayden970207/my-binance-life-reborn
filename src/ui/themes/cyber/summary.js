import { mountShareButton, unmountShareButton } from '../../share-card.js';
import { formatUsdShort, getCurrentUniverseResult } from '../../universe-result.js';

function makeLabel({
    text = '',
    x = 0,
    y = 0,
    width,
    fontSize = 40,
    color = '#ffffff',
    bold = false,
    align = 'left',
    valign = 'middle',
    wordWrap = false,
    leading = 0,
} = {}) {
    const label = new Laya.Label();
    label.text = text;
    label.pos(x, y);
    if(width !== undefined) label.width = width;
    label.fontSize = fontSize;
    label.color = color;
    label.bold = bold;
    label.align = align;
    label.valign = valign;
    label.wordWrap = wordWrap;
    label.leading = leading;
    label.font = 'SimHei';
    return label;
}

function makeCard({ x, y, width, height, title, value, valueColor = '#55fffe' }) {
    const box = new Laya.Box();
    box.pos(x, y);
    box.size(width, height);
    box.graphics.drawRect(0, 0, width, height, '#101827', '#97ffe6', 2);
    box.addChild(makeLabel({
        text: title,
        x: 20,
        y: 16,
        width: width - 40,
        fontSize: 24,
        color: '#8ddce5',
    }));
    box.addChild(makeLabel({
        text: value,
        x: 20,
        y: 56,
        width: width - 40,
        fontSize: 34,
        color: valueColor,
        bold: true,
    }));
    return box;
}

function renderUniversePanel(view, universe) {
    const summaryBox = view.getChildByName('summary');
    if(!summaryBox) return;

    for(let i = 1; i < summaryBox.numChildren; i++) {
        summaryBox.getChildAt(i).visible = false;
    }

    summaryBox.getChildByName('universePanel')?.removeSelf();

    const panel = new Laya.Box();
    panel.name = 'universePanel';
    panel.pos(55, 58);
    panel.size(summaryBox.width - 110, summaryBox.height - 116);

    panel.addChild(makeLabel({
        text: 'PARALLEL CZ RESULT',
        width: panel.width,
        fontSize: 22,
        color: universe.rarityColor,
        bold: true,
        align: 'center',
    }));
    panel.addChild(makeLabel({
        text: universe.czCode,
        y: 32,
        width: panel.width,
        fontSize: 60,
        color: '#ffffff',
        bold: true,
        align: 'center',
    }));
    panel.addChild(makeLabel({
        text: `享年 ${universe.age}`,
        y: 98,
        width: panel.width,
        fontSize: 30,
        color: '#fef08a',
        bold: true,
        align: 'center',
    }));
    panel.addChild(makeLabel({
        text: '这个平行宇宙的你',
        y: 138,
        width: panel.width,
        fontSize: 24,
        color: '#8ddce5',
        align: 'center',
    }));
    panel.addChild(makeLabel({
        text: universe.title,
        x: 10,
        y: 176,
        width: panel.width - 20,
        fontSize: 36,
        color: universe.rarityColor,
        bold: true,
        align: 'center',
    }));
    panel.addChild(makeLabel({
        text: universe.subtitle,
        x: 10,
        y: 230,
        width: panel.width - 20,
        fontSize: 22,
        color: '#cbd5f5',
        align: 'center',
        wordWrap: true,
        leading: 8,
    }));

    const cardWidth = Math.floor((panel.width - 24) / 2);
    const topY = 308;
    panel.addChild(makeCard({
        x: 0,
        y: topY,
        width: cardWidth,
        height: 118,
        title: '终局资产',
        value: formatUsdShort(universe.finalNetWorth),
        valueColor: universe.finalNetWorth < 0 ? '#fb7185' : '#55fffe',
    }));
    panel.addChild(makeCard({
        x: cardWidth + 24,
        y: topY,
        width: cardWidth,
        height: 118,
        title: '峰值资产',
        value: formatUsdShort(universe.peakNetWorth),
        valueColor: '#fbbf24',
    }));
    panel.addChild(makeCard({
        x: 0,
        y: topY + 136,
        width: cardWidth,
        height: 118,
        title: '蒸发资产',
        value: formatUsdShort(universe.drawdown),
        valueColor: universe.drawdown > 0 ? '#c084fc' : '#55fffe',
    }));
    panel.addChild(makeCard({
        x: cardWidth + 24,
        y: topY + 136,
        width: cardWidth,
        height: 118,
        title: '这个版本',
        value: universe.category,
        valueColor: '#9ae6b4',
    }));

    panel.addChild(makeLabel({
        text: `这个版本: ${universe.tags.join(' / ')}`,
        x: 6,
        y: topY + 278,
        width: panel.width - 12,
        fontSize: 24,
        color: '#97ffe6',
        wordWrap: true,
        leading: 8,
    }));
    panel.addChild(makeLabel({
        text: '评语',
        x: 6,
        y: topY + 332,
        width: panel.width - 12,
        fontSize: 22,
        color: '#F0B90B',
        bold: true,
        align: 'center',
    }));
    panel.addChild(makeLabel({
        text: universe.epitaph,
        x: 6,
        y: topY + 372,
        width: panel.width - 12,
        fontSize: 24,
        color: '#fef3c7',
        wordWrap: true,
        leading: 10,
    }));

    summaryBox.addChild(panel);

    const titleBox = view.getChildByName('title');
    const titleLabel = titleBox?.getChildAt?.(1)?.getChildAt?.(1);
    if(titleLabel) titleLabel.text = '平行宇宙结果';
}

export default class CyberSummary extends ui.view.CyberTheme.CyberSummaryUI {
    constructor() {
        super();
        this.listSelectedTalents.renderHandler = Laya.Handler.create(this, this.renderTalent, null, false);
        this.btnAgain.on(Laya.Event.CLICK, this, this.onAgain);
    }

    #selectedTalent;
    #enableExtend;

    onAgain() {
        unmountShareButton();
        core.talentExtend(this.#selectedTalent);
        core.times ++;
        $ui.switchView(UI.pages.MAIN);
    }

    init({talents, enableExtend}) {
        const {lastExtendTalent} = core;
        this.#enableExtend = enableExtend;
        const universe = getCurrentUniverseResult(core, { persist: true });
        renderUniversePanel(this, universe);

        talents.sort(({id:a, grade:ag}, {id:b, grade:bg},)=>{
            if(a == lastExtendTalent) return -1;
            if(b == lastExtendTalent) return 1;
            return bg - ag;
        });
        if(this.#enableExtend) {
            this.#selectedTalent = talents[0].id;
        } else {
            this.#selectedTalent = lastExtendTalent;
        }
        this.listSelectedTalents.array = talents;
        mountShareButton();
    }

    renderTalent(box) {
        const dataSource = box.dataSource;

        const labTitle = box.getChildByName("labTitle");
        const grade1 = box.getChildByName("grade1");
        const grade2 = box.getChildByName("grade2");
        const grade3 = box.getChildByName("grade3");
        const labDescription = box.getChildByName("labDescription");
        const selected = box.getChildByName("selected");
        const unselected = box.getChildByName("unselected");

        labTitle.text = dataSource.name;
        labDescription.text = dataSource.description;
        switch (dataSource.grade) {
            case 1:
                grade1.visible = true;
                grade2.visible = false;
                grade3.visible = false;
                break;
            case 2:
                grade1.visible = false;
                grade2.visible = true;
                grade3.visible = false;
                break;
            case 3:
                grade1.visible = false;
                grade2.visible = false;
                grade3.visible = true;
                break;
            default:
                grade1.visible = false;
                grade2.visible = false;
                grade3.visible = false;
                break;
        }

        selected.visible = dataSource.id == this.#selectedTalent;
        unselected.visible = !selected.visible;
        box.off(Laya.Event.CLICK, this, this.onSelectTalent);
        box.on(Laya.Event.CLICK, this, this.onSelectTalent, [dataSource.id]);
    }

    onSelectTalent(talentId) {
        if(!this.#enableExtend) {
            return $$event('message', ['M_DisableExtendTalent']);
        }
        if(talentId == this.#selectedTalent) {
            this.#selectedTalent = null;
        } else {
            this.#selectedTalent = talentId;
        }

        this.listSelectedTalents.refresh();
    }
}
