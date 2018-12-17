/** 子弹类 */
class BulletBase extends egret.DisplayObjectContainer {
	    public _bulletId:number;  // 子弹的自增id
        public _bUpdate:boolean;  // 是否更新
        public _nAniType;
        public _nReboundTimes;   // 反弹次数
        public _nCloneTag;
        public isPushPool:boolean; // 是否放入子弹池
        public bePos;   // 对应的皮肤id
        private gunType; // 炮类型
        private _enumType;   // 同子弹id
        private _bDead;     // 是否销毁
        public _logicMove:MoveLogicBase;  // 移动
        public belongGun;  // 哪个位置的炮
        public nGunIndex;  // 炮的下标
        public totalReboundTimes;  // 总的反弹次数

        private _range:number;

        private _laserEffect;  //

	public constructor(gunSkin:T_Gun_skin) {
		super();

        console.log("创建子弹");
        this.gunType = gunSkin.gunType;
        this._enumType = gunSkin.bulletId;
        this._range = gunSkin.range;
	    this._bulletId = -1;
        this._nAniType = -1;
        this._nCloneTag = -1;
        this.totalReboundTimes = 0;

        this.bePos = Number(T_Config_Table.getVoByKey(51).value);

        this.resetData();

        if (this.gunType == GunType.Laser){
             this.createRacerEffect();
        }else{
            this.createBulletImage();
        }
	}

    /**创建子弹图片 */
    private createBulletImage(){
        var i = "bullet_" + this._enumType + "_png";
        var n = RES.getRes(i);
        if (n) {
            var a = new egret.Bitmap(n);
            this.addChild(a),
            this.isPushPool = true;
        } else {
            var a = new egret.Bitmap(RES.getRes("bullet_20000_png"));
            this.addChild(a),
            // RES.getResAsync(i,
            // function() {},
            // this),
            this.isPushPool = true;
        }
        this.cacheAsBitmap = true;
        this.anchorOffsetX = this.width / 2,
        this.anchorOffsetY = this.height / 2;
    }

     /** 创建激光效果 */
    private createRacerEffect(){
        var mcData = new egret.MovieClipDataFactory(RES.getRes("jiguang_json"),RES.getRes("jiguang_png"));
        var mc = new egret.MovieClip(mcData.generateMovieClipData("jiguang"));
        var m = mc.movieClipData;
        mc.anchorOffsetX = mc.width / 2 + m.frames[0].x;
        mc.anchorOffsetY = mc.height  + m.frames[0].y;
        mc.frameRate = 12,
        mc.rotation =+ 180;
        mc.scaleX = 2;
        mc.scaleY = 2 * 2.1;
        this.addChild(mc);
        this._laserEffect = mc;

        this.isPushPool = true;
    }

    /** 播放激光特效 */
    public playLaserEffect(callback){
        if (!this._laserEffect) return;
        this._laserEffect.gotoAndPlay("play", 1);
        this._laserEffect.once(egret.Event.COMPLETE,
        function(e) {
            callback && callback();
        },
        this);
    }

    /**子弹rect 用来计算碰撞 */
    public getRect(){
        var bulletRect:egret.Rectangle = this._laserEffect.getTransformedBounds(this);
        bulletRect.x = -this._range;
        bulletRect.width = this._range * 2;

        return bulletRect;
    }

    /** 重置数据状态 */
    public resetData() {
         // 激光不更新子弹位置
        if (this.gunType == GunType.Laser){
            this._bUpdate = false;
        }else{
            this._bUpdate = true;
        }

        this._bDead = false;
        this._logicMove && (this._logicMove.end(), this._logicMove = null);
        this._nReboundTimes = 0
    }

    // 子弹位置
    public setBulletPos(e, t, i) {
        this.rotation = i - 180;
        var n = Math.PI / 180 * (this.rotation + 90),
        a = e + 85 * Math.cos(n),
        o = t + 85 * Math.sin(n);
        this.x = a,
        this.y = o
    }

    /** 绑定移动逻辑 */
    public moveLogicBind(e) {
        if (this._logicMove){
            this._logicMove.end();
            this._logicMove = null;
        }
        this._logicMove = e;
         // 激光不开启移动
        if (this.gunType != GunType.Laser){
            this._logicMove.start()
        }
    }

    // 如果子弹碰到边缘，反弹子弹
    public logicUpdate() {
        if (this._bUpdate) {
            var e = !1,
            t = FishUtil.GET_FISHING_RECT();
            this.x <= t.x && (this.x = t.x, e = !0),
            this.x >= t.width && (this.x = t.width, e = !0),
            this.y <= t.y && (this.y = t.y, e = !0),
            this.y >= t.height && (this.y = t.height, e = !0),
            e && (this._logicMove.end(), this.reboundBullet())
        }
    }
    public getBDead() {
        return this._bDead
    }
    public setBDead(e) {
        this._logicMove.end(),
        this._bUpdate = false,
        this._bDead = true
    }
    public getBUpdate() {
        return this._bUpdate
    }
    public reboundBullet() {
        var e = FishUtil.GET_FISHING_RECT();
        if (this.rotation < 0 && this.rotation > -90 ? (this.x >= e.width && (this.rotation = -this.rotation), this.y >= e.height && (this.rotation = 180 - this.rotation)) : this.rotation < -90 && this.rotation > -180 ? (this.x >= e.width && (this.rotation = -this.rotation), this.y <= e.y && (this.rotation = 180 - this.rotation)) : this.rotation < 90 && this.rotation > 0 ? (this.y >= e.height && (this.rotation = 180 - this.rotation), this.x <= e.x && (this.rotation = -this.rotation)) : this.rotation < 180 && this.rotation > 90 ? (this.x <= e.x && (this.rotation = -this.rotation), this.y <= e.y && (this.rotation = 180 - this.rotation)) : (0 == this.rotation || 90 == this.rotation || -90 == this.rotation || 180 == this.rotation || -180 == this.rotation) && (this.rotation += 180), this.rotation > 360) {
            var t = this.rotation / 360;
            this.rotation -= 360 * t
        } else if (this.rotation < -360) {
            var t = this.rotation / 360;
            this.rotation += 360 * t
        }
        this.setNewLogicMove()
    } 
    public setNewLogicMove() {
        
        // console.log("this._nReboundTimes",this._nReboundTimes);
        if (this._nReboundTimes >= this.totalReboundTimes) {
            if (this.setBDead(!0), this._bulletId > 0) {
                // var e = game.util.ProtobufUtil.getInstance().getBulletDisappear();
                // e.setBulletId(this._bulletId),
                // NetManager.send(e)
            }
        } else {
            // console.log("_nReboundTimes",this._nReboundTimes);
            this._nReboundTimes++;
            var t = Math.PI / 180 * (this.rotation - 270),
            i = this.x,
            n = this.y,
            a = i + 2e3 * Math.cos(t),
            o = n + 2e3 * Math.sin(t),
            r = new egret.Point(a, o),
            s = egret.Point.distance(new egret.Point(this.x, this.y), r) / CONFIG.BULLET_SPEED;
            this.moveLogicBind(FishUtil.GET_BULLET_MOVELOGIC(this, a, o, 1, s))
        }
    }
    public getBulletId() {
        return this._bulletId
    }
    public setBulletId(e) {
        this._bulletId = e
    }
    public getBulletType() {
        return this._enumType
    }
    public getBulletTag() {
        return this._nCloneTag
    }
    public setBulletTag(e) {
        this._nCloneTag = e
    }
    public getReboundTimes() {
        return this._nReboundTimes
    }
    public resUpdate() {}
}