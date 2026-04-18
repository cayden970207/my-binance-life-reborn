import { unmountShareButton } from '../../share-card.js';

export default class Main extends ui.view.DefaultTheme.MainUI {
    constructor() {
        super();
        this.btnRemake.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.TALENT));
        this.btnAchievement.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.ACHIEVEMENT));
        this.btnThemes.on(Laya.Event.CLICK, this, ()=>$ui.showDialog(UI.pages.THEMES));
        // 彻底销毁无用按钮(github/discord/存档/感谢)
        this.btnGithub?.destroy();
        this.btnDiscord?.destroy();
        this.btnSaveLoad?.destroy();
        this.btnThanks?.destroy();
    }

    static load() {
        return [
            "images/atlas/images/icons.atlas",
        ]
    }

    init() {
        unmountShareButton();
        this.banner.visible =
        this.btnAchievement.visible = !!core.times;

        // 黑金主题: 标题染金, 副标题暖灰
        const titles = this._getChildsByName('title');
        if (titles && titles.length > 0) {
            // 第一个是大标题
            if (titles[0]) titles[0].color = '#F0B90B';
            // 后续可能是副标题(name重复)
            for (let i = 1; i < titles.length; i++) {
                titles[i].color = '#848E9C';
            }
        }
        if (this.labSubTitle) this.labSubTitle.color = '#848E9C';

        const text = this.labSubTitle.text;
        this.labSubTitle.text = ' ';
        this.labSubTitle.text = text;
    }

    _getChildsByName(name) {
        const result = [];
        const walk = (node) => {
            if (!node) return;
            if (node.name === name) result.push(node);
            const children = node._childs || node._children || [];
            for (const c of children) walk(c);
        };
        walk(this);
        return result;
    }

    startCZ() {
        // 直接以 CZ 真身 (character id=1) 开始,跳过所有选择
        const cz = core.characterById('1');
        if (!cz) return $ui.switchView(UI.pages.CELEBRITY);
        const { property: propertyAllocate, talent: talents } = cz;
        core.remake(talents.map(t => t.id));
        $ui.switchView(
            UI.pages.TRAJECTORY,
            { propertyAllocate, talents, enableExtend: false }
        );
    }
}