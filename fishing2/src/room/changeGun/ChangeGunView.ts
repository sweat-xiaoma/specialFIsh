 class ChangeGunView extends PopView {
      
    private _btnWrapList;
    private _uiDisplay:ChangeGunUI;
	public constructor() {
        super();
        this._btnWrapList = new Array;
        UIUtil.startLoading();
    }
    public addBgResource (e, t) {
        UIUtil.closeLoading();

        var n = new eui.UILayer;
        this.addChild(n);

        // 换炮UI
        this._uiDisplay = new ChangeGunUI;
        this._uiDisplay.skinName = e,
        this._uiDisplay.horizontalCenter = 0,
        this._uiDisplay.verticalCenter = 0,
        this._uiDisplay.scaleX = this._uiDisplay.scaleY = 1.6;
        n.addChild(this._uiDisplay);

        UIUtil.popView(this._uiDisplay.root);
        var o = this._uiDisplay.closeBtn;
        o.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.closeBtn)),
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/changeGun/ChangeGunItem.exml",
        function() {
            this.send(NotifyEnum.CHANGE_GUN_UI_LOADED)
        },
        this)
    }
    public initView () {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/changeGun/ChangeGun.exml", this.addBgResource, this)
    }
    public showList (e) {
        for (var t = this._uiDisplay.listGroup.numChildren,i = 0; t > i; i++) {
            var n:ChangeGunUI = <ChangeGunUI>this._uiDisplay.listGroup.getElementAt(i);
            n.clearItem()
        }
        this._uiDisplay.listGroup.removeChildren();

        for (var a = e.length,i = 0; a > i; i++) {
            var o:ChangeGunItemItem = new ChangeGunItemItem();
            o.setData(e[i]),
            this._uiDisplay.listGroup.addChild(o)
        }
        var r = new eui.HorizontalLayout;
        this._uiDisplay.listGroup.layout = r
    }
    public onClosttButtonClick = function(e) {
        Director.popView()
    }
    public destroy () {
        var e = this;
        UIUtil.closeView(this._uiDisplay.root,
        function() {
            for (; e._btnWrapList.length > 0;) {
                var t = e._btnWrapList.pop();
                t.destroy()
            }
            e._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onClosttButtonClick, e),
            e.parent && e.parent.removeChild(e),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/changeGun/ChangeGun.exml"),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/changeGun/ChangeGunItem.exml")
        })
    }
 }
 
 