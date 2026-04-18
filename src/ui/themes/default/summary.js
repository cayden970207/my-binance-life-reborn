import { mountShareButton, unmountShareButton } from '../../share-card.js';
import { formatUsdShort, getCurrentUniverseResult } from '../../universe-result.js';

export default class Summary extends ui.view.DefaultTheme.SummaryUI {
    constructor() {
        super();
        this.listSummary.renderHandler = Laya.Handler.create(this, this.renderSummary, null, false);
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

        this.title.text = '平行宇宙结果';

        this.listSummary.array = [
            {
                label: `${universe.czCode} · 享年 ${universe.age}`,
                grade: universe.rarityGrade,
            },
            {
                label: `这个平行宇宙的你 · ${universe.title}`,
                grade: universe.rarityGrade,
            },
            {
                label: `终局资产: ${formatUsdShort(universe.finalNetWorth)}`,
                grade: universe.finalNetWorth < 0 ? 0 : Math.max(1, universe.rarityGrade),
            },
            {
                label: `峰值资产: ${formatUsdShort(universe.peakNetWorth)}`,
                grade: Math.max(1, universe.rarityGrade),
            },
            {
                label: `蒸发资产: ${formatUsdShort(universe.drawdown)}`,
                grade: universe.drawdown > 0 ? Math.max(1, universe.rarityGrade) : 0,
            },
            {
                label: `这个版本: ${universe.tags.join(' / ')}`,
                grade: Math.min(3, Math.max(1, universe.rarityGrade)),
            },
            {
                label: `评语: ${universe.epitaph}`,
                grade: Math.min(3, universe.rarityGrade),
            },
        ];

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
    renderSummary(box) {
        const {label, grade} = box.dataSource;
        box.label = label;
        $_.deepMapSet(box, $ui.common.summary[Math.min(3, grade || 0)]);
    }
    renderTalent(box) {
        const dataSource = box.dataSource;
        box.label = $_.format($lang.F_TalentSelection, dataSource);
        const style = $ui.common.card[dataSource.grade];
        $_.deepMapSet(box, dataSource.id == this.#selectedTalent? style.selected: style.normal);
        box.getChildByName('blank').pause = dataSource.id != this.#selectedTalent;
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
