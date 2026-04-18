import { unmountShareButton } from '../../share-card.js';

export default class CyberMain extends ui.view.CyberTheme.CyberMainUI {
    constructor() {
        super();
        this.btnRemake.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.TALENT));
        this.btnAchievement.on(Laya.Event.CLICK, this, ()=>$ui.switchView(UI.pages.ACHIEVEMENT));
        this.btnThemes.on(Laya.Event.CLICK, this, ()=>$ui.showDialog(UI.pages.THEMES));
        this.btnGithub?.destroy();
        this.btnDiscord?.destroy();
        this.btnSaveLoad?.destroy();
        this.btnThanks?.destroy();
        this.on(Laya.Event.RESIZE, this, () => {
            const scale = Math.max(
                this.width / this.imgBg.width,
                this.height / this.imgBg.height
            );
            this.imgBg.scale(scale, scale);
        });
    }

    static load() {
        return [
            "fonts/方正像素12.ttf",
            "images/atlas/images/accessories.atlas",
            "images/atlas/images/border.atlas",
            "images/atlas/images/button.atlas",
            "images/atlas/images/icons.atlas",
            "images/atlas/images/progress.atlas",
            "images/atlas/images/slider.atlas",
        ]
    }

    init() {
        unmountShareButton();
        this.banner.visible =
        this.btnAchievement.visible = !!core.times;
    }

    startCZ() {
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