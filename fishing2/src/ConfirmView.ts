class ConfirmView extends eui.Component {
	private _btnWrapList;
	private _pCall;

	private _callFun;
	private _callObj;
	private _parentView;

	private cfmCloseBtn:eui.Button;
	private okBtn;
	private cancleBtn;
	private okOneBtn;
	private showTips;
	private twoGroup;
	private oneGroup;

	public constructor(t=null) {
		super();
		this._btnWrapList = new Array,
        this._pCall = t,
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Confirm.exml", this.addResources, this);
	}

    public addResources(e, t) {
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Confirm.exml";
        var i = this.cfmCloseBtn;
        i.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        var n = this.okBtn;
        n.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        var a = this.cancleBtn;
        a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        var o = this.okOneBtn;
        o.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this);
        this._btnWrapList.push(new UIWrap(this.cfmCloseBtn));
        this._btnWrapList.push(new UIWrap(this.okOneBtn));
        this._btnWrapList.push(new UIWrap(this.cancleBtn));
        this._btnWrapList.push(new UIWrap(this.okBtn));
        // 修正UIWrap里的注册点偏移 
        i.x += i.width / 2;
		i.y += i.height / 2;
        n.x += n.width / 2;
		n.y += n.height / 2;
        a.x += a.width / 2;
		a.y += a.height / 2;
        o.x += o.width / 2;
		o.y += o.height / 2;

        this._pCall && this._pCall();
    }
    public setOkCallFun(e, t, i) {
        this._callFun = e;
        this._callObj = t;
        this._parentView = i;
    }
    public setTips(e) {
        this.showTips.text = e;
    }
    public setGroupTwo() {
        this.twoGroup.visible = !0;
        this.oneGroup.visible = !1;
    }
    public setGroupOne() {
        this.twoGroup.visible = !1;
        this.oneGroup.visible = !0;
    }
    public initView() {}
    public onClosttButtonClick(e) {
        this._parentView && this._parentView.removeChild(this);
    }
    public onOKButtonClick(e) {
        this._callFun && this._callObj && this._callFun(this._callObj);
        this._parentView && this._parentView.removeChild(this);
    }
    public onOKClickNoClose(e) {
        this._callFun && this._callObj && this._callFun(this._callObj);
    }
    public closePanel() {
        this._parentView && this._parentView.removeChild(this);
    }
    public destroy() {
        for (; this._btnWrapList.length > 0;) {
            var e = this._btnWrapList.pop();
            e.destroy()
        }
        this.cfmCloseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this),
        this.cancleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
        this.okOneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this),
        this.parent && this.parent.removeChild(this),
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Confirm.exml")
    }
}