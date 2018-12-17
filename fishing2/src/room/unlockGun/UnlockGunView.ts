class UnlockGunView extends PopView {

    private _bPop;
    private _bShow;
    private _btnWrapList;
    private _uiDisplay;

    constructor(t=false){
        super();
        this._bPop = !1,
        this._bShow = t,
        this._btnWrapList = new Array;
        UIUtil.startLoading();
    }
    
    public addBgResource(e, t) {
        UIUtil.closeLoading();
        var i = new eui.UILayer;
        this.addChild(i);
        var n = new UnLockGunCom;
        if (this._uiDisplay = n, this._uiDisplay.skinName = e, this._uiDisplay.horizontalCenter = 0, this._uiDisplay.verticalCenter = 0, i.addChild(this._uiDisplay), !this._bPop) {
            UIUtil.popView(this._uiDisplay.root),
            this._bPop = !0;
            var a = this;
            setTimeout(function() {
                TweenTools.hopOnce(a._uiDisplay.suo_0, .05, 250),
                TweenTools.hopOnce(a._uiDisplay.suo_1, .05, 250),
                TweenTools.hopOnce(a._uiDisplay.suo_2, .05, 250)
            },
            1e3)
        }
        var o = this._uiDisplay.btnClose;
        o.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnClose)),
        this.setData()
    }
    public setData() {
        var e = Director.getModelByKey(UserModel),
        t = e.getCurGunID(),
        i = T_Gun_Table.getVoByKey(t + 1);
        this._uiDisplay.curRateLab.text = i.bulletNum + "";
        var n = i.upgradeOrForgeAward.split("_");
        this._uiDisplay.zengLab.text = n[1] + "";
        var a = T_Gun_Table.getVoByKey(t),
        o = a.upgradeOrForgeCost.split("_");
        this._uiDisplay.curRateLab.textAlign = egret.HorizontalAlign.CENTER,
        this._uiDisplay.zengLab.textAlign = egret.HorizontalAlign.CENTER,
        this._uiDisplay.zengLab0.textAlign = egret.HorizontalAlign.CENTER,
        this._uiDisplay.zengLab0.text = o[1] + "",
        a ? (this._uiDisplay.lastRate_0.textAlign = egret.HorizontalAlign.CENTER, this._uiDisplay.lastRate_0.text = a.bulletNum + "") : this._uiDisplay.last_0.visible = !1;
        var r = T_Gun_Table.getVoByKey(t - 1);
        r ? (this._uiDisplay.lastRate_1.textAlign = egret.HorizontalAlign.CENTER, this._uiDisplay.lastRate_1.text = r.bulletNum + "") : this._uiDisplay.last_1.visible = !1;
        var s = T_Gun_Table.getVoByKey(t + 2);
        s ? (this._uiDisplay.nextRate_0.textAlign = egret.HorizontalAlign.CENTER, this._uiDisplay.nextRate_0.text = s.bulletNum + "") : this._uiDisplay.next_0.visible = !1;
        var l = T_Gun_Table.getVoByKey(t + 3);
        l ? (this._uiDisplay.nextRate_1.textAlign = egret.HorizontalAlign.CENTER, this._uiDisplay.nextRate_1.text = l.bulletNum + "") : this._uiDisplay.next_1.visible = !1,
        TweenTools.showOutAndIn(this._uiDisplay.select, 1500),
        this.showGun(e.getCurSkinId()),
        this._uiDisplay.cur.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tipCharge, this)
    }
    public showGun(e) {
        var t = this;
        RES.getResAsync("goodsicon_" + e + "_png",
        function() {
            var i = new egret.Bitmap(RES.getRes("goodsicon_" + e + "_png")),
            n = new egret.Bitmap(RES.getRes("goodsicon_" + e + "_png")),
            a = new egret.Bitmap(RES.getRes("goodsicon_" + e + "_png")),
            o = new egret.Bitmap(RES.getRes("goodsicon_" + e + "_png")),
            r = new egret.Bitmap(RES.getRes("goodsicon_" + e + "_png"));
            i.anchorOffsetX = n.anchorOffsetX = a.anchorOffsetX = o.anchorOffsetX = r.anchorOffsetX = i.width / 2,
            i.anchorOffsetY = n.anchorOffsetY = a.anchorOffsetY = o.anchorOffsetY = r.anchorOffsetY = i.height / 2,
            t._uiDisplay.icon_0.addChild(i),
            t._uiDisplay.iconLast_0.addChild(n),
            t._uiDisplay.iconLast_1.addChild(a),
            t._uiDisplay.iconNext_0.addChild(o),
            t._uiDisplay.iconNext_1.addChild(r)
        },
        this)
    }
    public tipCharge(e) {
        Director.popView(),
        this.send(NotifyEnum.POP_CHARGE, {
            type: ChargeType.Gem
        })
    }
    public onClosttButtonClick(e) {
        Director.popView()
    }
    public initView() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/unlockGun/UnlockGunUI.exml", this.addBgResource, this)
    }
    public destroy() {
        var e = this;
        this._bPop = !1,
        UIUtil.closeView(this._uiDisplay.root,
        function() {
            for (; e._btnWrapList.length > 0;) {
                var t = e._btnWrapList.pop();
                t.destroy()
            }
            e._uiDisplay.cur.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.tipCharge, e),
            e._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onClosttButtonClick, e),
            e.parent.removeChild(e),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/unlockGun/UnlockGunUI.exml")
        })
    }
}