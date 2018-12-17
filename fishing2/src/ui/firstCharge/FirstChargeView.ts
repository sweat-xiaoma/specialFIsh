class FirstChargeView extends PopView {
    private _bPop;
    private _btnWrapList;
    private _uiDisplay;
    public constructor() {
        super();
        this._bPop = !1,
        this._btnWrapList = new Array;
    }
    public addBgResource (e, t) {
        var i = new eui.UILayer;
        this.addChild(i);
        var n = new FirstChargeCom;
        this._uiDisplay = n,
        this._uiDisplay.skinName = e,
        this._uiDisplay.horizontalCenter = 0,
        this._uiDisplay.verticalCenter = 0,
        i.addChild(this._uiDisplay),
        this._bPop || (UIUtil.popView(this._uiDisplay.root), this._bPop = !0);
        var a = this._uiDisplay.btnClose;
        a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
        this._uiDisplay.chargeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharge, this),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnClose)),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.chargeGroup)),
        this._uiDisplay.listGroup.removeChildren();
        for (var o = T_Config_Table.getVoByKey(53).value, r = o.split(","), s = r.length, l = 0; s > l; l++) {
            var u = r[l].split("_"),
            d = Number(u[0]),
            h = Number(u[1]),
            c = new BagViewItem(d, h);
            c.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml",
            c.init(),
            this._uiDisplay.listGroup.addChild(c)
        }
        var p = new BagViewItem(1, 1);
        p.initAutoGun(),
        this._uiDisplay.listGroup.addChild(p);
        var g = new eui.HorizontalLayout;
        g.gap = 50,
        // g.horizontalAlign = egret.HorizontalAlign.LEFT;
        this._uiDisplay.listGroup.layout = g,
        this._uiDisplay.listGroup.anchorOffsetX = this._uiDisplay.listGroup.width / 2,
        this._uiDisplay.listGroup.anchorOffsetY = this._uiDisplay.listGroup.height / 2
    }
    public onClosttButtonClick (e) {
        Director.popView()
    }
    public onCharge (e) {
        Director.popView();
        var t = new ChargeView(ChargeType.Ticket),
        i = new ChargeMediator(t);
        Director.pushView(i)
    }
    public initView () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/firstCharge/firstChargeUI.exml", this.addBgResource, this)
    }
    public destroy () {
        var e = this;
        this._bPop = !1,
        UIUtil.closeView(e._uiDisplay.root,
        function() {
            for (; e._btnWrapList.length > 0;) {
                var t = e._btnWrapList.pop();
                t.destroy()
            }
            e._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onClosttButtonClick, e),
            e._uiDisplay.chargeGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onCharge, e),
            e.parent && e.parent.removeChild(e),
            e.send(NotifyEnum.CHECK_POP),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/firstCharge/firstChargeUI.exml")
        })
    }
    
}