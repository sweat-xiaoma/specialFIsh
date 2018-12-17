class GunTempleUI extends eui.Component {
    private nGunX:number;
    private nGunY:number;
    private bRage:boolean;
    private bLocked:boolean;
    private nRoomerPos:number;
    private gunType:number;
    
    private _gunEffect:egret.MovieClip;
    private _gunRageEffect:egret.MovieClip;

    private gunEffect:eui.Group;
    private chakan:eui.Button;
    private lockGroup:eui.Group;
    private gunPoint:eui.Group;
    private gunImageGroup:eui.Group;
    private gunImage:eui.Image;

	public constructor(t) {
		super();
        var i = this;
        i.nGunX = 45,
        i.nGunY = 90,
        i.bRage = false,
        i.bLocked = false,
        i.skinName = t,
        i.gunEffect.rotation = 0,
        i.lockGroup.visible = false,
        i.bLocked = false,
        i.gunPoint.cacheAsBitmap = true;
        i.nRoomerPos = -1;
        i.chakan.addEventListener(egret.TouchEvent.TOUCH_TAP, i.chakanClick, i);
        i.addChild(i.chakan);
	}

    // 点击查看按钮
    public chakanClick (e) {
        _Notification_.send(NotifyEnum.SHOW_CHAKAN_PANEL, this.nRoomerPos)
    }
    public setRoomerPos (e) {
        this.nRoomerPos = e
    }
    /**设置炮图片 */
    public setGunNorData (e) {
        var t = this;
        IconUtil.getIconByIdAsync(IconType.PAO, e,
        function(i) {
            i && (t.gunImage.source = "gunsicon_" + e + "_png");
        })
    }
    public setGunData (e) {
        var t = T_Gun_skin_Table.getVoByKey(e),
        i = this;
       IconUtil.getIconByIdAsync(IconType.PAO_CLONE, t.id,
        function(e) {
            if (e) {
                i.gunImageGroup.removeChildren();
                e.anchorOffsetX = e.width / 2;
                e.anchorOffsetY = e.height - 15;
                i.gunImageGroup.addChild(e);
            }
        })
    }

    /** 设置炮类型和锚点 */
    public setGunTypeAndImageAnchor (e) {
        var t = T_Gun_skin_Table.getVoByKey(e);
        this.gunType = t.gunType;

        if(t == null){
            console.error("T_Gun_skin_Table.getVoByKey(e)::e:"+e);
            return;
        }
       var i = t.anchor,
        n = i.split("_"),
        a = (parseInt(n[0]), parseInt(n[1]));
        this.anchorOffsetX = this.width / 2,
        this.anchorOffsetY = this.height - a;
        var o = t.gunPos,
        r = o.split("_"),
        s = parseInt(r[0]),
        l = parseInt(r[1]);
        this.nGunX = s;
        this.nGunY = l;
    }
    public setRage (e) {
        this.bRage = e
    }
    public gunFireTw(e) {
        this.rotation = e;
        var t = this,
        i = null;

        //如果是激光，播放激光头特效
        if (this.gunType == GunType.Laser){
           FrameUtil.playRacerHeadEffect(this.gunEffect);
        } 

        if (this.bRage){
            if (!this._gunRageEffect){
               this._gunRageEffect = this.getEfGunRagePos();
               this.gunEffect.addChild(this._gunRageEffect);
            } 
            i = this._gunRageEffect;
        }else{
            if (!this._gunEffect){
               this._gunEffect = this.getEfGunPos();
               this.gunEffect.addChild(this._gunEffect) ;
            }
            i = this._gunEffect; 
        }
        i.alpha = 1;

        var n = egret.Tween.get(t.gunPoint, {
            loop: !1
        });
        n.to({
            bottom: -10,
            scaleY: .9,
            scaleX: 1.1
        },
        100).to({
            bottom: 0,
            scaleY: 1,
            scaleX: 1
        },
        90).call(function() {
            egret.Tween.removeTweens(t.gunPoint)
        });
        var a = egret.Tween.get(t.gunEffect, {
            loop: !1
        });
        a.wait(50).call(function() {
            egret.Tween.removeTweens(t.gunEffect),
            i.alpha = 0
        }),
        this.bRage = !1
    }

    /** 播放换枪特效 */
    public playGunChangeEff() {
        var e = this,
        t = egret.Tween.get(e.gunPoint, {
            loop: !1
        });
        t.to({
            scaleY: .2
        },
        100).to({
            scaleY: 1
        },
        90).call(function() {
            egret.Tween.removeTweens(e.gunPoint)
        })
    }
    public gunFirePos () {
        return this.gunImageGroup.getChildAt(0).localToGlobal(this.nGunX, this.nGunY)
    }
    public getEfGunPos () {
        return FrameUtil.getEfGunPos()
    }
    public getEfGunRagePos () {
        return FrameUtil.getEfGunRagePos()
    }
    public setLocked (e) {
        this.lockGroup.visible = e,
        this.bLocked = e
    }
    public getGunLocked () {
        return this.bLocked
    }
    public destroy () {
        this._gunEffect && this.gunEffect.removeChild(this._gunEffect),
        this._gunRageEffect && this.gunEffect.removeChild(this._gunRageEffect),
        this.chakan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.chakanClick, this)
    }

}