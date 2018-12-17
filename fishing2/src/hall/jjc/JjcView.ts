class JjcView extends PopView{
    public _bPop;
	public _btnWrapList;
	public _uiDisplay;

	public constructor() {
		super();
		this._bPop = !1,
		this._btnWrapList = new Array();
	}

    public initView() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/JjcUI.exml", this.addBgResource, this);
    }
	public addBgResource(e, t) {
        var i = new eui.UILayer;
        this.addChild(i);
        this._uiDisplay = new eui.Component();
        this._uiDisplay.skinName = e;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        i.addChild(this._uiDisplay);
		
        this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._btnWrapList.push(new UIWrap(this._uiDisplay.closeBtn));

        this._bPop || (UIUtil.popView(this._uiDisplay.root), this._bPop = !0);
    }

    public onClosttButtonClick(e) {
        Director.popView();
    }

    public destroy() {
         var e = this;
        UIUtil.closeView(this._uiDisplay.root,
        function() {
            for (; e._btnWrapList.length > 0;) {
                var t = e._btnWrapList.pop();
                t.destroy()
            }
            e.parent && e.parent.removeChild(e);
            e._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onClosttButtonClick, e);
            e._bPop = !1;
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/JjcUI.exml");
        })
    }
}