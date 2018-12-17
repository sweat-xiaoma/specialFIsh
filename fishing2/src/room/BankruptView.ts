class BankruptView extends eui.Component{

    private _timer;
    private  getBtn;
    private _parent;
    private timeTxt;

    constructor(){
        super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BankruptUI.exml",
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getCoinsBtn, this);
        this._timer = new egret.Timer(1e3, 0);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._parent = null;
    }
  
    public setText = function(e) {
        this.timeTxt.text = e
    }
    public setParent = function(e) {
        this.getBtn.visible = !1,
        this.bg.visible = !1,
        this._parent = e
    }
    public startTick(){
        this._timer.start()
    }
    public timerFunc(){
        var e = Director.getModelByKey(UserModel),
        t = e.getBankruptTime(),
        i = t - TimeUtil.getCurrTime(),
        n = TimeUtil.sceonds2MinStr(i),
        a = Language.getDynamicText(36, [n]);
        return this._parent && (a = n),
        this.timeTxt.text = a,
        0 >= i ? (this._timer.stop(), void(this.timeTxt.text = "可以领取救济金")) : void 0
    }
    public getCoinsBtn(e) {
        var t = new Bankrupt();
        t.initData(),
        t.setState(7),
        NetManager.send(t, MsgActionDefine.Bankrupt);
    }
    public destroy(){
        this._timer.stop(),
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this),
        this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getCoinsBtn, this)
    }
} 