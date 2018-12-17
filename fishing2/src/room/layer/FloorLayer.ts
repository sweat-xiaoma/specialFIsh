class FloorLayer extends egret.DisplayObjectContainer {

	private _timer;
    private _heidong:egret.Bitmap;
    private _scaleBig:boolean = true;
    private _scaleVal = 0;
    private _count =0;

	public constructor() {
		super();
		this.addBubble();
        // this.addHeidong();
	}

    public addHeidong(){
        this.clearHeidong();

        this._heidong = new egret.Bitmap(RES.getRes("heidong_png")),
        this._heidong.touchEnabled = false,
        this._heidong.width = CONFIG.contentWidth,
        this._heidong.height = CONFIG.contentWidth,
        this._heidong.anchorOffsetX = this._heidong.width >> 1,
        this._heidong.anchorOffsetY = this._heidong.height >> 1,
        this._heidong.x = CONFIG.contentWidth / 2 + CONFIG.adaptX,
        this._heidong.y = CONFIG.contentHeight / 2 + CONFIG.adaptY,
        this._heidong.rotation = 0;
        this._heidong.scaleX = this._scaleVal;
        this._heidong.scaleY = this._scaleVal;
        this.addChild(this._heidong);

        this._scaleBig = true;
        this._scaleVal = 0;
        this._count = 0;

        // this._t = egret.getTimer();
        
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnter, this);
    }
    // private _t = 0;
    private onEnter(){
        if(this._heidong){
            this._heidong.rotation += 3;

            if(this._scaleBig){
                if(this._scaleVal > 0.6 && this._count < 40){
                    this._count++;
                    // if(this._count == 1){
                    //     var t = egret.getTimer();
                    //     var dt = t - this._t;
                    //     this._t = t;
                    //     egret.log('-------1----', dt);
                    // }
                    // if(this._count == 40){
                    //     var t = egret.getTimer();
                    //     var dt = t - this._t;
                    //     this._t = t;
                    //     egret.log('-------2----', dt);
                    // }
                    return;
                }
                this._scaleVal += 0.01;
            }else this._scaleVal -= 0.06;

            if(this._scaleBig && this._scaleVal > 1){
                this._scaleBig = false;
                this._scaleVal = 1;
                this._count = 0;
            }else if(!this._scaleBig && this._scaleVal < 0){
                this._scaleBig = true;
                this._scaleVal = 0;

                this.clearHeidong();

                // var t = egret.getTimer();
                // var dt = t - this._t;
                // this._t = 0;
                // egret.log('-------3----', dt);
            }
            
            if(this._heidong){
                this._heidong.scaleX = this._scaleVal;
                this._heidong.scaleY = this._scaleVal;
            }
        }
    }
    public clearHeidong(){
        if(this._heidong && this._heidong.parent){
            this._heidong.parent.removeChild(this._heidong);
            this._heidong = null;
        }
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnter, this);
    }

	public addBubble() {
        var e = this;
        // game.util.GorgeousManager.getState() ? RES.getResAsync("stage_bubble_png",
        // function(t, i) {
        //     RES.getResAsync("stage_bubble_json",
        //     function(i, n) {
        //         e._mcFactory = new egret.MovieClipDataFactory(i, t),
        //         e._timer = new egret.Timer(3e3, 0),
        //         e._timer.addEventListener(egret.TimerEvent.TIMER, e.timerFunc, e),
        //         e._timer.start()
        //     },
        //     e)
        // },
        // this) : this._timer && this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this)
    }

    public timerFunc() {
        // var e = (CONFIG.contentWidth - 400) * Math.random() + 200,
        // t = (CONFIG.contentHeight - 400) * Math.random() + 200,
        // i = new MovieFish(this._mcFactory.generateMovieClipData("stageBubble"), egret.Event.COMPLETE);
        // i.initEvent(),
        // i.gotoAndPlay("play", 1),
        // i.frameRate = 8,
        // i.scaleX = i.scaleY = 2,
        // i.x = e,
        // i.y = t,
        // this.addChild(i)
    }

    public destory() {
      // this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this)
      this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnter, this);
    }
}