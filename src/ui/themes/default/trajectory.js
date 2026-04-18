import { showChoiceModal } from '../../choice-modal.js';
import { openShareCard } from '../../share-card.js';

export default class Trajectory extends ui.view.DefaultTheme.TrajectoryUI {
    constructor() {
        super();
        let pos1 = [0, 0];
        this.panelTrajectory.on(Laya.Event.MOUSE_DOWN, this, e => pos1 = [e.stageX, e.stageY]);
        this.panelTrajectory.on(Laya.Event.MOUSE_UP, this, e => {
            const distanceX = e.stageX - pos1[0];
            const distanceY = e.stageY - pos1[1];
            if(Math.sqrt(Math.abs(distanceX) + Math.abs(distanceY)) > 10) {
                return;
            }
            this.onNext();
        });
        this.btnSummary.on(Laya.Event.CLICK, this, this.onSummary);

        this.panelTrajectory.vScrollBar.elasticDistance = 150;
        this.scbSpeed.on(Laya.Event.CHANGE, this, () => this.speed = this.scbSpeed.value);
        this.scbSpeed.on(Laya.Event.MOUSE_UP, this, () => this.onNext());
    }
    #pausedForChoice = false;

    #speed;
    #auto;

    static load() {
        return [
            "images/atlas/images/progress.atlas",
            'images/atlas/images/slider.atlas',
        ];
    }

    static #createComponent = Laya.plugin.extractComponents(Trajectory.uiView, ['boxTrajectoryItem']);
    #createTrajectoryItem() {
        const item = Trajectory.#createComponent('boxTrajectoryItem');
        item.labContent = item.getChildByName('labContent');
        item.labAge = item.getChildByName('hboxAge').getChildByName('labAge');
        const config = $ui.common.trajectoryItem;
        $_.deepMapSet(item, config.box);
        item.grade = grade => {
            $_.deepMapSet(item, config.grade[grade || 0]);
        }
        item.getChildByName('hboxAge')._childs.forEach(child => child.color = config.ageColor);
        item.labContent.color = config.contentColor;
        return item;
    }
    #isEnd;
    #trajectoryItems;
    #talents;
    #enableExtend;

    hidePropertyPanel() {
        const header = this.getChildAt(0);
        if(header) header.visible = false;
        this.boxTrajectory.top = 80;
    }

    init({propertyAllocate, talents, enableExtend}) {
        this.#enableExtend = enableExtend;
        this.boxParticle.visible = false;
        this.boxSpeed.visible = true;
        this.btnSummary.visible = false;
        this.#trajectoryItems = [];
        this.#isEnd = false;
        this.#talents = talents;
        this.hidePropertyPanel();
        core.start(propertyAllocate);
        this.onNext();
    }

    close() {
        this.scbSpeed.value = 0;
        this.speed = 0;
        this.#trajectoryItems.forEach(item => {
            item.removeSelf();
            item.destroy();
        });
        this.#trajectoryItems = null;
    }

    updateProperty() {
        // Player-facing attributes are intentionally hidden.
    }

    onNext() {
        if(this.#isEnd) return;
        if(this.#pausedForChoice) return;

        const { age, content, isEnd } = core.next();
        this.#isEnd = isEnd;

        if(isEnd) {
            this.boxSpeed.visible = false;
            this.btnSummary.visible = true;
            Laya.timer.frameOnce(1,this,()=>{
                this.panelTrajectory.scrollTo(0, this.panelTrajectory.contentHeight);
            });
        }
        this.panelTrajectory.scrollTo(0, this.panelTrajectory.contentHeight);
        this.renderTrajectory(age, content);

        if(age >= 100) {
            this.boxParticle.visible = true;
        }
        this.updateProperty();

        // 检测 choices - 暂停并弹窗
        const choiceItem = content.find(c => c && c.choices && c.choices.length);
        if (choiceItem) {
            this.#pausedForChoice = true;
            const savedSpeed = this.speed;
            this.speed = 0; // 暂停自动模式
            showChoiceModal({
                age,
                question: choiceItem.description.replace(/^【抉择】\s*/, ''),
                choices: choiceItem.choices,
            }, (picked) => {
                core.applyChoice(picked);
                // 在轨迹上追加一行"你选择了:xxx"
                this.renderTrajectory(age, [{
                    type: 'EVT',
                    description: `→ 你选择了:${picked.label}`,
                    grade: choiceItem.grade || 2,
                }]);
                this.updateProperty();
                this.#pausedForChoice = false;
                // 恢复速度
                if (savedSpeed > 0) {
                    this.speed = savedSpeed;
                }
            });
        }
    }

    renderTrajectory(age, content) {
        const item = this.#createTrajectoryItem();
        const grade = content.reduce((max, { grade = 0 }) => Math.max(max, grade), 0);
        item.labAge.text = ''+age;
        item.labContent.text = content.map(
            ({type, description, grade, name, postEvent}) => {
                switch(type) {
                    case 'TLT':
                        return `天赋【${name}】发动：${description}`;
                    case 'EVT':
                        return description + (postEvent?`\n${postEvent}`:'');
                }
            }
        ).join('\n');
        item.grade(grade);
        this.vboxTrajectory.addChild(item);
        this.#trajectoryItems.push(item);
        item.y = this.vboxTrajectory.height;
    }

    onSummary() {
        // 跳过SUMMARY页,直接显示分享卡 + 再来一把按钮
        openShareCard({
            onRestart: () => {
                core.talentExtend(null); // 不继承天赋,每次新开
                core.times ++;
                $ui.switchView(UI.pages.MAIN);
            }
        });
    }

    get speed() {
        return this.#speed;
    }

    set speed(speed) {
        this.#speed = speed;
        this.prgSpeed.value = speed / this.scbSpeed.max;
        clearInterval(this.#auto);
        this.#auto = null;
        if(!speed) return;
        this.#auto = setInterval(
            () => this.onNext(),
            3000 * (1 - this.prgSpeed.value) + 300
        );
    }
}
