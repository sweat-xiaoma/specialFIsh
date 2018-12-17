class PhoenixTop extends eui.Component {

    private timeLab_0;
    private timeLab_1;
    private _timer;
    private time;

    constructor(){
        super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/worldBossTips.exml";
        this.timeLab_0.textAlign = egret.HorizontalAlign.RIGHT;
        this.timeLab_1.textAlign = egret.HorizontalAlign.LEFT;
    }
    
    public start(){
        this._timer && (this._timer.stop(), this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this), this._timer = null),
        this._timer = new egret.Timer(1e3, 0),
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this),
        this._timer.start();
        var e = Director.getModelByKey(RoomModel);
        this.time = e.getPhoenix().getTime()
    }
    public timerFunc(){
        var e = this.time - TimeUtil.getCurrTime();
        if (0 >= e) return this._timer && (this._timer.stop(), this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this), this._timer = null),
        this.timeLab_0.text = "00",
        void(this.timeLab_1.text = "00");
        var t = TimeUtil.sceonds2MinStr(e),
        i = t.split(":");
        this.timeLab_0.text = i[0],
        this.timeLab_1.text = i[1]
    }
    public destroy(){
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this)
    }
} 