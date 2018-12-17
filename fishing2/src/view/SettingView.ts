class SettingView extends PopView {
    public _bPop;
    public _btnWrapList;
    public _uiDisplay;

    public constructor() {
        super();
        this._bPop = !1,
            this._btnWrapList = new Array();
    }

    public addBgResource(e, t) {
        var i = new eui.UILayer;
        this.addChild(i);
        var n = new SettingUI();
        this._uiDisplay = n,
            this._uiDisplay.skinName = e,
            this._uiDisplay.horizontalCenter = 0,
            this._uiDisplay.verticalCenter = 0,
            i.addChild(this._uiDisplay);
        var a = this._uiDisplay.closeBtn;
        a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
            (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) && (this._uiDisplay.icon_change.visible = !0, this._uiDisplay.icon_change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onchangIdBtn, this)),
            this._uiDisplay.groupMus.name = "groupMus",
            this._uiDisplay.groupSel.name = "groupSel",
            this._uiDisplay.groupShake.name = "shake";
        this._uiDisplay.groupMus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeState, this);
        this._uiDisplay.groupSel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeState, this);
        this._uiDisplay.groupShake.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeState, this);
        this.send(NotifyEnum.CHANGE_SETTING);
        this._bPop || (UIUtil.popView(this._uiDisplay.root), this._bPop = !0);
        this._btnWrapList.push(new UIWrap(this._uiDisplay.closeBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.yinsiBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.weiguiBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.backBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.cutBtn));
    }

    public changeMusicState(e) {
        this._uiDisplay.music_sel.visible = e,
            this._uiDisplay.bg_1.visible = !e,
            this._uiDisplay.icon0.visible = !e,
            this._uiDisplay.iconKai0.visible = !e
    }

    public changeSoundState(e) {
        this._uiDisplay.sound_sel.visible = e,
            this._uiDisplay.bg_2.visible = !e,
            this._uiDisplay.icon1.visible = !e,
            this._uiDisplay.iconKai1.visible = !e
    }
    public changeShakeState(e) {
        this._uiDisplay.shake.visible = e,
            this._uiDisplay.bg_0.visible = !e,
            this._uiDisplay.icon3.visible = !e,
            this._uiDisplay.iconKai3.visible = !e
    }

    public changeState(e) {
        var t = e.target;

        if (t.name == "groupMus") {
            this.send(NotifyEnum.CHANGE_SETTING, { type: "music" });
        } else if (t.name == "groupSel") {
            this.send(NotifyEnum.CHANGE_SETTING, { type: "sound" });
        } else if (t.name == "groupShake") {
            this.send(NotifyEnum.CHANGE_SETTING, { type: "shake" });
        }
    }

    public onchangIdBtn(e) {
        GameUtil.openConfirmByTwoButton(null,
            function () {
                // CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG ? deleteCookie4YWT() : deleteCookie4ChangeAccount()
            },
            this, T_Language_Table.getVoByKey(2439).value)
    }

    public onClosttButtonClick(e) {
        Director.popView()
    }

    public initView() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/setting/SettingUI.exml", this.addBgResource, this)
    }

    public destroy() {
        var e = this;
        UIUtil.closeView(this._uiDisplay.root,
            function () {
                for (; e._btnWrapList.length > 0;) {
                    var t = e._btnWrapList.pop();
                    t.destroy()
                }
                e.parent && e.parent.removeChild(e),
                    e._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onClosttButtonClick, e),
                    e._uiDisplay.groupMus.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.changeState, e),
                    e._uiDisplay.groupSel.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.changeState, e),
                    e._uiDisplay.icon_change.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onchangIdBtn, e),
                    e._bPop = !1,
                    RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/setting/SettingUI.exml")
            })
    }
}