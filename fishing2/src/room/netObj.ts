
/**
 * 捕鱼用的网
 * 包含图片网和特效网
 */
class netObj extends egret.DisplayObjectContainer{

    public bInPool:boolean;
    public nId:string;
    public gunType:GunType;
    private movieClip:egret.MovieClip;
    private _range:number;  // 范围半径

    constructor (gunSkin:T_Gun_skin) {
        super();

        this.nId = gunSkin.net;
        this.gunType = gunSkin.gunType;

        this._range = gunSkin.range;

        this.createNet();
    }

    /**
     * 创建网.分为普通网(图片）,特殊网(mc)
     */
    public createNet(){

        // 普通炮的网使用网id
        var netName = "bullet_bomb_" + this.nId;
        // 闪电炮的网特例
        if (this.gunType == GunType.Light){
            netName = "electric_qiu";
        }
        // 加载网图片
        var n = RES.getRes(netName + "_png");
        if (n){
             this.bInPool = true;
        }else{
            n = RES.getRes("bullet_bomb_20000_png");
            RES.getResAsync(netName + "_png",function() {},this)
            this.bInPool = false;
        }

        // 如果是特殊炮,加载网特效
        if (this.gunType > GunType.Normal){
            var j = RES.getRes(netName + "_json");
            var g = new egret.MovieClipDataFactory(j,n);
            this.movieClip = new egret.MovieClip(g.generateMovieClipData(netName));
            
            var m = this.movieClip.movieClipData;
            this.addChild(this.movieClip);

            this.movieClip.anchorOffsetX = this.movieClip.width/2 + m.frames[0].x;
            this.movieClip.anchorOffsetY = this.movieClip.height/2 + m.frames[0].y;

            this.movieClip.scaleX = this.movieClip.scaleY = 2;
            this.movieClip.frameRate = 12;
        }else{
            var netImage = new egret.Bitmap(n);
            netImage.anchorOffsetX = netImage.width/2;
            netImage.anchorOffsetY = netImage.height/2;
            this.addChild(netImage)
        }
    }

    /** 播放网特效 */
    public playMovie(t, i) {
        
        this.movieClip.gotoAndPlay("play", t);

        this.movieClip.addEventListener(egret.Event.COMPLETE,
        function(e) {
            i && i()
        },
        this)
    };

    /** 网rect */
    public getRect(){
       return new egret.Rectangle(-this._range,-this._range,2*this._range,2*this._range);
    }
} 