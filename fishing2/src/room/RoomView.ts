
// 捕鱼房间层
class RoomView extends RoomBase {

    private _preGunTime;
    private _arrLockedObj;
    private _nAvaGunIndex;
    private _inHandWarHeadFish;
    private _isBgInit;
    private _frameCount;
    private _gunToPos;
    private _isFlip;
    private _myPositon;
    private _isInFire;
    private _autoFire;
    private _selectFishState;
    private _nGunNum;
    private _bulletId;
    private BULLET_MAX_COUNT;
    private _userModel:UserModel;
    private _roomModel:RoomModel;

    public _bgLayer;
    public _floorLayer;
    public _objectLayer;
    public _bulletLayer:BulletLayer;
    public _tipsLayer;

    public _offsetWidth;
    public _timeOnEnterFrame;
    public _roomUI:RoomUI;
    public _isLocked;
    public _isRage;
    public _isClone;

    public constructor() {
        super();

        this._preGunTime = 0,
        this._arrLockedObj = null,
        this._nAvaGunIndex = 0,
        this._inHandWarHeadFish = -1,
        this._isBgInit = !1,
        this._frameCount = 0,
        this.initFishList(),
        this.initBulletList(),
        this._gunToPos = new egret.Point();
        this._isFlip = !1,
        this._myPositon = 0,
        this._isInFire = !1,
        this._autoFire = false,
        this._selectFishState = !1,
        this._nGunNum = 2,
        this._bulletId = 0,
        this.BULLET_MAX_COUNT = Number(T_Config_Table.getVoByKey(29).value);
        this._userModel = Director.getModelByKey(UserModel);
        this._roomModel = Director.getModelByKey(RoomModel);
    }

    public initView() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/GameFishing.exml", this.addBgResource, this),
        this._bgLayer = new egret.DisplayObjectContainer,
        this.addChildAt(this._bgLayer, 10),
        this._floorLayer = new FloorLayer,
        this.addChildAt(this._floorLayer, 20),
        this._objectLayer = new ObjectLayer();
        this.addChildAt(this._objectLayer, 50),
        this._bulletLayer = new BulletLayer,
        this.addChildAt(this._bulletLayer, 60),
        this._tipsLayer = new egret.DisplayObjectContainer,
        this.addChildAt(this._tipsLayer, 99);
        
        var t = "background_" + this._userModel.getMatchRoomLevel() + "_jpg";
        // var t = "background_new1_jpg";

        RES.getResAsync(t,
            function (t, i) {
                var n = new egret.Bitmap(t);
                this._bgLayer.addChild(n);
                this._bgLayer.anchorOffsetX = n.width >> 1;
                this._bgLayer.anchorOffsetY = n.height >> 1;
                this._bgLayer.x = egret.MainContext.instance.stage.stageWidth >> 1;
                this._bgLayer.y = egret.MainContext.instance.stage.stageHeight >> 1;
                if (this._isBgInit){
                    this._bgLayer.touchEnabled = !0;
                    this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
                    this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchCacel, this);
                    this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
                    this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
                }
                this.addBoguang();
                this._isBgInit = true;
            }, this);
        this._offsetWidth = egret.MainContext.instance.stage.stageWidth - CONFIG.contentWidth >> 1;
    }

    //播放黑洞效果
    public playHeidong(){
        if(this._floorLayer){
            this._floorLayer.addHeidong();
        }
    }

    // 加上水波纹
    public addBoguang() {
        var _me = this;
        if (GorgeousManager.getState()) RES.getResAsync("ef_boguang_json",
            function() {
                RES.getResAsync("ef_boguang_png",
                    function() {
                        var t = new egret.MovieClipDataFactory(RES.getRes("ef_boguang_json"), RES.getRes("ef_boguang_png"));
                        var mv = new egret.MovieClip(t.generateMovieClipData("ef_boguang"));
                        mv.name = "bowen";
                        _me._bgLayer.addChild(mv);
                        mv.scaleX = 6.8;
                        mv.scaleY = 6.8;
                        mv.frameRate = 7;
                        mv.alpha = .5;
                        mv.blendMode = egret.BlendMode.ADD;
                        mv.gotoAndPlay("play", -1);
                    }, self);
            }, self);
        else {
            var t = this._bgLayer.getChildByName("bowen");
            t && this._bgLayer.removeChild(t);
        }
    }

    public startRoom() {
        this._isBgInit = true;
        this._objectLayer.touchEnabled = false;
        this._objectLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.fishTouchEnd, this);
        if (this._isBgInit){
            this._bgLayer.touchEnabled = true;
            this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
            this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchCacel, this);
            this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
            this._bgLayer.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this._preGunTime = 0;
            this._timeOnEnterFrame = egret.getTimer();
        }        
    }

    public addBgResource(e, t) {
        this._roomUI = new DajiangsaiRoomUI(e);
        this._roomUI.y += 10;
        this.addChildAt(this._roomUI, 80);
        this._roomUI.touchEnabled = !1;
        // UIUtil.screenAdapter(this._roomUI);
    }

    public resetView(isFlip, roomerList, roomerPos) {
        this._isFlip = isFlip;
        this._myPositon = roomerPos;
        if (this._isFlip) {
            this._objectLayer.rotation = 180;
            this._objectLayer.x = egret.MainContext.instance.stage.stageWidth;
            this._objectLayer.y = egret.MainContext.instance.stage.stageHeight;
        }
        for (var n = 0; n < roomerList.length; n++) {
            var a = roomerList[n];
            this._isFlip ? this._roomUI.setGunVisableByPos(RoomUtil.getPosByFlip(a.getRoomPos(), this._isFlip), true) : this._roomUI.setGunVisableByPos(a.getRoomPos(), true);
        }
    }

    public showYourPos(e) {
        var t = RoomUtil.getMyPosByFlip(e);
        this._roomUI.showYourPos(t)
    }

    public hideYourPos(e) {
        var t = RoomUtil.getMyPosByFlip(e);
        this._roomUI.hideYourPos(t)
    }

    public touchBegin(e) {
        this._isInFire = true;
        this._timeOnEnterFrame = egret.getTimer();
        this._gunToPos.x = e.stageX;
        this._gunToPos.y = e.stageY;
        var t = new egret.DisplayObjectContainer;
        var i = new egret.Bitmap(RES.getRes("fish_click_png"));
        i.scaleX = .1,
        i.scaleY = .1,
        i.anchorOffsetX = i.width / 2,
        i.anchorOffsetY = i.height / 2,
        t.addChild(i);
        var n = new egret.Bitmap(RES.getRes("fish_click_png"));
        n.scaleX = .3,
        n.scaleY = .3,
        n.anchorOffsetX = n.width / 2,
        n.anchorOffsetY = n.height / 2,
        t.addChild(n),
        t.x = e.stageX,
        t.y = e.stageY;
        var a = 1.5,
        o = egret.Tween.get(i),
        r = this;
        o.to({
                scaleX: a,
                scaleY: a,
                alpha: .1
            },
            400).call(function () {
                egret.Tween.removeTweens(i)
            });
        var s = egret.Tween.get(n);
        n.visible = !1,
        s.wait(190).call(function () {
                n.visible = !0
            }).to({
                scaleX: a,
                scaleY: a,
                alpha: .1
            }, 400).call(function () {
                    egret.Tween.removeTweens(n),
                        r._tipsLayer.removeChild(t)
                }),
        this._tipsLayer.addChild(t)
    }

    public touchMove(e) {
        this._gunToPos.x = e.stageX;
        this._gunToPos.y = e.stageY;
    }

    public touchCacel(e) {
        this._isInFire = false;
    }

    public touchEnd(e) {
        // egret.log(this._preGunTime);
        if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME){
            this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), this._gunToPos.x, this._gunToPos.y);
            this._preGunTime = 0;
        }
        this._isInFire = false;
        this.getRoomUI().getIsChakan() && this.getRoomUI().setHideChakan();
    }

    public fishTouchEnd(e) {
        for (var t = null,
        i = this.getFishList().length, n = 0; i > n; n++) {
            var a = this.getFishList()[n].getActor();
            if (a.getType() == AddFishType.FISH || a.getType() == AddFishType.CATCH_WHOLE_FISH) {
                if (a.hitTestPoint(e.stageX, e.stageY)) {
                    this.send(NotifyEnum.SEND_CLICK_FISH, a.getUniqId()),
                    t = a;
                    break
                }
            } else if (a.getType() == AddFishType.FISH_GROUP) for (var o = a.getFishList(), r = o.length, s = 0; r > s; s++) if (o[s].hitTestPoint(e.stageX, e.stageY)) {
                this.send(NotifyEnum.SEND_CLICK_FISH, o[s].getUniqId()),
                t = o[s];
                break
            }
        }
        if (null != t && (this._isLocked || this._isRage || this._isClone)) if (this._isClone) this._nAvaGunIndex == this._nGunNum && (this._nAvaGunIndex = 0),
        this.changeLockedFish(this._userModel.getUserId(), t, this._nAvaGunIndex),
        this._nAvaGunIndex++,
        this.send(NotifyEnum.LOCKED_FISH_CHANGE, {
            fishId: t.getUniqId(),
            gunIndex: this._nAvaGunIndex
        });
        else {
            var l = this._userModel.getGuideID();
            if (8 > l && CONFIG.openGuide) return;
            this.changeLockedFish(this._userModel.getUserId(), t),
            this.send(NotifyEnum.LOCKED_FISH_CHANGE, {
                fishId: t.getUniqId(),
                gunIndex: 0
            })
        }
    }

    public onEnterFrame(dt:number) {
        if (this._frameCount == 2){
            this._frameCount = 0;
        }else{
            this._frameCount++ ;
            if (this._isLocked || this._isRage || this._isClone){
                this._objectLayer.touchEnabled = true;
                this._bgLayer.touchEnabled = false;
            }
            this.hitUpdate();
            this.bulletLogicUpdate();
            this.updateGunStatus();
        }
    }

    /**
     *  更新炮的状态 发射子弹gunFire
     */
    public updateGunStatus() {
        var e = egret.getTimer(),
        t = this._timeOnEnterFrame,
        i = e - t;
        this._timeOnEnterFrame = egret.getTimer();
        this._preGunTime += i;
        if (this._isLocked || this._isRage || this._isClone) {
            if (this._isClone) {
                if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
                    for (var n = this._userModel.getUserId(), a = this._nGunNum, o = 0; a > o; o++) {
                        var r = this.getLockedFishId(n, o),
                        s = RoomUtil.getFishById(this.getFishList(), r);
                        if (!s) return void this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, {
                            index: o,
                            simple: !1
                        });
                        var l = s.getEFFECT_LAYER().getChildByName("locked");
                        if (l) {
                            var u = s.localToGlobal(l.x, l.y);
                            this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), u.x, u.y, o)
                        } else this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, {
                            index: o,
                            simple: !1
                        });
                        this._preGunTime = 0
                    }
                }
            } else if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME) {
                var n = this._userModel.getUserId(),
                s = RoomUtil.getFishById(this.getFishList(), this.getLockedFishId(n));
                if (!s) return void this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, {
                    index: 0,
                    simple: !0
                });
                var l = s.getEFFECT_LAYER().getChildByName("locked");
                if (l) {
                    var u = s.localToGlobal(l.x, l.y);
                    this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), u.x, u.y)
                } else this.send(NotifyEnum.LOCKED_FISH_DISAPPEAR, {
                    index: 0,
                    simple: !0
                });
                this._preGunTime = 0
            }
        } else {
            if (this._isRage){
                if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME){
                    this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), this._gunToPos.x, this._gunToPos.y);
                    this._preGunTime = 0;
                }
            }else{
                if (this._isInFire || this._autoFire){
                    // 开火
                    if (this._preGunTime >= GlobalManager.getInstance().GUN_FRAME_TIME){
                        this.gunFire(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), this._gunToPos.x, this._gunToPos.y);
                        this._preGunTime = 0;
                    }
                }
            }
        }
    }

    /** 
     * 更新子弹状态  (子弹的生命周期)
     * 1 更新子弹位置  getBUpdate
     * 2 移除子弹,放入子弹池 getBDead
     */
    public bulletLogicUpdate() {
        var e = this.getBulletList();
        var t = e.length;
        var a = new Array;
        if (e) {
            for (let i = 0; t > i; i++) {
                let n:BulletBase = e[i];
                n && n.logicUpdate()
                n.getBDead() && a.push(n)
            }
            let o = a.length;
            for (let i = 0; o > i; i++) {
                let n = a[i],
                r = e.indexOf(n);
                if (e.splice(r, 1), this._bulletLayer.removeChild(n), n.isPushPool) {
                    // 放入子弹池
                    var s = FishingObjPool.getInstance().insertBulletPool(n);
                    s || this._bulletLayer.removeChild(n)

                }
            }
        }
    }

    /** 
     * 更新击中状态 子弹和鱼发生碰撞 getBUpdate
     * 1 碰撞检测
     * 2 张开网 发送消息
     * */
    public hitUpdate() {
        var e = this.getFishList().length;
        for (var t = 0; e > t; t++) {
            var i = this.getFishList()[t];
            var n = this.getBulletList().length;
            for (var a = 0; n > a; a++) {
                var bullet:BulletBase = this.getBulletList()[a];
                if (bullet.getBUpdate()) {
                    var r = i.getActor(),fishType = r.getType();
                    if (this.isBulletLocked(bullet.belongGun) && 0 == bullet.getReboundTimes()) {
                        //被锁定
                        var l = -1;
                        if (l = -1 != bullet.nGunIndex ? this.getBulletLockedId(bullet.belongGun)[bullet.nGunIndex] : this.getBulletLockedId(bullet.belongGun)[0], fishType == AddFishType.FISH || fishType == AddFishType.CATCH_WHOLE_FISH) {
                            if (r.getUniqId() == l) {
                                var u = r.localToGlobal();
                                if (u.x + (r.measuredWidth >> 1) >= 0 && u.x - (r.measuredWidth >> 1) <= 1280 && u.y + (r.measuredHeight >> 1) >= 0 && u.y - (r.measuredHeight >> 1) <= 720) {
                                    var fishUniId = RoomUtil.hitRect(bullet, r, AddFishType.FISH);
                                    if (this.sendHitFish(bullet, fishUniId, r)) return
                                }
                            }
                        } else if (fishType == AddFishType.FISH_GROUP) {
                            for (var h = r.getFishList(), c = h.length, p = 0; c > p; p++) 
                                if (h[p].getUniqId() == l) {
                                    var u = r.localToGlobal();
                                    if (u.x + r.measuredWidth / 2 >= 0 && u.x - r.measuredWidth / 2 <= 1280 && u.y + r.measuredHeight / 2 >= 0 && u.y - r.measuredHeight / 2 <= 720) {
                                        var fishUniId = RoomUtil.hitRect(bullet, h[p], AddFishType.FISH);
                                        if (this.sendHitFish(bullet, fishUniId, h[p])) return
                                    }
                                }
                        }
                    } else if (fishType == AddFishType.FISH || fishType == AddFishType.CATCH_WHOLE_FISH) {
                        var fishUniId = RoomUtil.hitRect(bullet, i.getActor(), fishType);
                        if (this.sendHitFish(bullet, fishUniId, i.getActor())) return
                    } else if (fishType == AddFishType.FISH_GROUP){
                        for (var h = r.getFishList(), c = h.length, p = 0; c > p; p++) {
                            var fishUniId = RoomUtil.hitRect(bullet, h[p], AddFishType.FISH);
                            if (this.sendHitFish(bullet, fishUniId, h[p])) return
                        }
                    }
                }
            }
        }
    }

    /** 子弹击中鱼 */
    public sendHitFish(bullet:BulletBase, fishUniId:Number, fish:FishBase) {
        if (fishUniId > 0) {
            var n = T_Gun_skin_Table.getVoByKey(bullet.bePos);
            // 张开网
            let net:netObj = this._bulletLayer.addBulletNet(n, bullet.x, bullet.y, FishingObjPool.getInstance());
            // 播放网的动画
            this._bulletLayer.showBulletBomb(net, FishingObjPool.getInstance());
            // 检测碰撞
            switch (net.gunType){
                case GunType.Light:
                    // 闪电炮
                    if (bullet.belongGun == this._myPositon) {
                        this.sendHitFishesByLightGun(bullet,fishUniId,net,n.num);
                    }else{
                        this.getLightingFishesAndPlay(n.num,fishUniId,net,false);
                    }
                    break;
                default:
                    if (bullet.belongGun == this._myPositon) {
                        this.sendHitFishesByNet(bullet,fishUniId,net);
                    }
            }

            // 销毁子弹
            bullet.setBDead(true);

            return true;
        }
        return false;
    }

    /**
     *  闪电炮 发送击中鱼的消息 (只有自己发送)
     *  1 包含子弹打中的鱼和闪电波及到的鱼
     *  2 闪电炮产生的网，不计算网的碰撞，只是显示效果
     */
    private sendHitFishesByLightGun(bullet:BulletBase,fishUniId:Number,net:netObj,spreadNum){
        // 子弹击中鱼的效果
        var fishActor = RoomUtil.getFishById(this.getFishList(), fishUniId);
        fishActor.playHitEffect();

        var spreadFishList = this.getLightingFishesAndPlay(spreadNum,fishUniId,net,true);
        if (!spreadFishList.indexOf(fishUniId)){
             spreadFishList.push(fishUniId)
        }
        // 发送击中鱼的消息
        this.send(NotifyEnum.HIT_FISH, { fId: fishUniId, bId: bullet.getBulletId(), nettingFishs:spreadFishList });
    }

    /**
     *  普通炮 发送普通炮击中鱼的消息  (只有自己发送)
     *  1 包含打中的鱼和网波及到的鱼
     *  2 击中鱼会产生网，计算鱼和网的碰撞
     *  3 特殊情况:如果是激光炮，没有fishUniId和net
     */
    private sendHitFishesByNet(bullet:BulletBase,fishUniId:Number = -1,net:netObj = null){

        var nettingFishList = new Array; // 网到的鱼
        for (var i = 0; i < this.getFishList().length; i++) {
            var fishAction:PointsAction = <PointsAction>this.getFishList()[i];
            var fish = fishAction.getActor();
            var fishType = fish.getType();
            if (fishType == AddFishType.FISH || fishType == AddFishType.CATCH_WHOLE_FISH) {
                if (!FishUtil.isFishInScreen(fish)){
                    continue;
                }
                // 单条鱼
                var nettingFishUniId = RoomUtil.hitRectByNet(bullet,net, fish, fishType);
                if (nettingFishUniId > 0){
                    nettingFishList.push(nettingFishUniId);
                    // 击中效果
                    fish.playHitEffect();  
                }
            } else if (fishType == AddFishType.FISH_GROUP){
                // 鱼群
                for (var h = fish.getFishList(), c = h.length, p = 0; c > p; p++) {
                    if (!FishUtil.isFishInScreen(h[p])){
                        continue;
                    }
                    var netHitFishUniId = RoomUtil.hitRectByNet(bullet,net, h[p], AddFishType.FISH);
                    if (netHitFishUniId > 0){
                        nettingFishList.push(netHitFishUniId);
                        // 击中效果
                        h[p].playHitEffect();
                    }
                }
            }
        }

        // 如果fishUniId不存在，取数组第一个值
        if (fishUniId == -1){
            if (nettingFishList.length > 0){
                fishUniId = nettingFishList[0];
            }else{
                return;
            }
        }

        // 发送消息  nettingFishList是网波及到的鱼的数组
        this.send(NotifyEnum.HIT_FISH, {   
            fId: fishUniId, 
            bId: bullet.getBulletId(),
            nettingFishs:nettingFishList 
        });
    }

    /** 获取闪电波及到的鱼数组并播放闪电 */
    private getLightingFishesAndPlay(spreadNum,fishUniId,net,isSelf){
        //  闪电波及到的鱼数组，规则：按照波及个数uid从大到小排
        var spreadFishList = [];
        for (var i = this.getFishList().length - 1; i > 0; i--){
            let fishAction:PointsAction = <PointsAction>this.getFishList()[i];
            let fish = fishAction.getActor();
            if (spreadFishList.length >= spreadNum){
                break;
            }
            if (fish.getType() == AddFishType.FISH ){
                if (fish.getUniqId() != fishUniId && FishUtil.isFishInScreen(fish)) {
                    // 不是本鱼,并且在屏幕内,加入闪电
                    spreadFishList.push(fish.getUniqId());
                    OneKillMany.addLightGunLineEffect(net,fish,3,this.getIsFlip());
                    // 我自己才有击中效果
                    if (isSelf) fish.playHitEffect();  
                }
            } else if (fish.getType() == AddFishType.FISH_GROUP){
                let fishList = fish.getFishList()
                for (let i = fishList.length - 1; i > 0; i--) {
                    let fish = fishList[i];
                    if (fish.getUniqId() != fishUniId && FishUtil.isFishInScreen(fish)) {
                        // 不是本鱼,并且在屏幕内,加入闪电
                        spreadFishList.push(fish.getUniqId());
                        OneKillMany.addLightGunLineEffect(net,fish,OneKillManyType.ELECTRIC,this.getIsFlip());
                        // 我自己才有击中效果
                        if (isSelf) fish.playHitEffect();  
                    }
                }
            }
        }

        return spreadFishList;
    }

     /**
     * 自己发射子弹 
     * 1 开火动画
     * 2 创建子弹
     * 3 发送消息
     */
    public gunFire(pos, tox, toy, n=2) {
        // if (this._userModel.getCoins() <= 0) {
        //     this.cleanBuff();
        //     _Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
        //     this.send(NotifyEnum.POP_CHARGE, { type: ChargeType.Gold });
        //     return;
        // }
        var hasBulletNum = this.getBulletNumByPos(pos, this._isFlip);
        this.checkBankrupt();
        if (!(hasBulletNum >= this.BULLET_MAX_COUNT && this._userModel.getCoins() > 0)) {
            // 子弹总数量不满，并且有钱
            var roomer:Roomer = this._roomModel.getRoomerById(this._userModel.getUserId());
            if (roomer) {
                var gun:T_Gun = T_Gun_Table.getVoByKey(roomer.getGunRate());
                var s = this._userModel.getMatchRoomLevel();
                // if (GameUtil.isKss(s) && roomer.getDjsObj().grandPrixBulletNum <= 0) {
                //     this._autoFire && (this._autoFire = !1);
                //     GameUtil.popTips(Language.getText(180));
                //     this.cleanBuff();
                //     return;
                // }
                // if (s == RequesetRoomState.DjsRoom || s == RequesetRoomState.QmsRoom) {
                    // if (o.getDjsObj()) {
                    //     if (0 == o.getDjsObj().grandPrixSignUp) return this._autoFire && (this._autoFire = !1),
                    //     void this.getRoomUI().openArenaSignView();
                    //     if (o.getDjsObj().grandPrixBulletNum <= 0) return 0 >= a ? (_Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1), _Notification_.send(NotifyEnum.DJS_RESULT_SEND), void this.cleanBuff()) : void this.cleanBuff()
                    // }
                    // var l = GameUtil.isEnough(CurrencyEnum.COINS, r.bulletNum, !1);
                    // if (!l) {
                    //     if (GameUtil.popTips(Language.getText(2)), 0 == a && this._userModel.getCoins() <= 0 && this._userModel.getBankruptTime() <= 0) {
                    //         // var u = new BankruptMessage;
                    //         // u.initData(),
                    //         // u.setState(0),
                    //         // Ne·tManager.send(u),
                    //         // this.cleanBuff()
                    //     }
                    //     return
                    // }
                // }
                // var d = GameUtil.getNeedGunByRoomType(this._userModel.getMatchRoomLevel(), roomer.getGunRate());
                // if ( - 1 != d) {
                //     var h = GameUtil.getMaxGunRateByGold(this._userModel.getCoins());
                //     if ( - 1 != h && gun.id < h && this._userModel.getCoins() > 0) {
                //         var c = new ChangeGunReq();
                //         c.initData();
                //         c.setType(ChangeGunState.AUTO_CHANGE);
                //         NetManager.send(c, MsgActionDefine.ChangeGunReq);
                //         return;
                //     }
                // }
                var isEnough = GameUtil.isEnough(CurrencyEnum.COINS, gun.bulletNum * roomer.getGunPow(), false);
                if (isEnough) {
                    if (roomer.getBankrupt()) { //解除破产状态
                        this.send(NotifyEnum.FISHING_UNLOCK_STATUS, 1);
                    }

                    var g = this._roomUI.gunList[pos];
                    if (g && g.getGunLocked()) {
                        // 解锁
                        this.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED, !0);
                        g.setLocked(!1);
                        return;
                    }
                    var gunComp = this.getRoomUI().getGunByPos(pos, this._isClone, n);
                    gunComp.x -= CONFIG.adaptX;
                    var angle = FishUtil.getAngle(gunComp.x + this._offsetWidth, gunComp.y, tox, toy);
                    var m = T_Gun_skin_Table.getVoByKey(this._userModel.getCurSkinId());
                    
                    var curSkinId = roomer.getCurSkinId()
                    // this._isRage && (f = m.rageBulletId, this._roomUI.setGunRageEff(pos, !0, this._isClone, n));
                    // 开炮效果
                    this._roomUI.gunfire(pos, angle, this._isClone, n);
                    // 创建开炮子弹
                    var bullet = this.createFireBullet(m,angle,gunComp,pos,tox,toy,curSkinId);
                    // 发消息
                    this.send(NotifyEnum.GUN_SEND, {
                        angle: RoomUtil.getAngleByFlip(angle, this._isFlip),
                        gunIndex: n,
                        bulletId: this._bulletId
                    })

                    if (m.gunType == GunType.Scatter){
                        // 散弹
                        this.createFireBullet(m,angle - 30,gunComp,pos,tox,toy,curSkinId);
                        this.createFireBullet(m,angle + 30,gunComp,pos,tox,toy,curSkinId);
                    }else if (m.gunType == GunType.Laser){
                        // 激光
                        bullet.playLaserEffect(function(){
                            bullet.setBDead(true);
                        })

                        egret.setTimeout(function(){
                            this.sendHitFishesByNet(bullet);
                            }, this, 300,
                        );
                    }
                } else {
                    // 关闭自动开炮
                    this.cleanBuff();
                    _Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
                    this.send(NotifyEnum.POP_CHARGE, { type: ChargeType.Gold });
                    return;

                    // var g = this._roomUI.gunList[pos];
                    // if (g && g.getGunLocked()) {
                    //     this.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED, !0);
                    //     g.setLocked(!1);
                    //     return;
                    // }
                    // var x = GameUtil.isEnough(CurrencyEnum.COINS, 0, false);
                    // if (x && this._userModel.getCoins() > 0) {
                    //     var c = new ChangeGunReq();
                    //     c.initData(),
                    //     c.setType(ChangeGunState.AUTO_CHANGE),
                    //     NetManager.send(c, MsgActionDefine.ChangeGunReq);
                    // }
                    // if (0 == a && this._userModel.getCoins() <= 0 && this._userModel.getBankruptTime() <= 0) {
                    //     GameUtil.popTips(Language.getText(2));
                        // var u = new BankruptMessage;
                        // u.initData(),
                        // u.setState(0),
                        // NetManager.send(u),
                        // this.cleanBuff()
                    // }
                    // if (0 == hasBulletNum && this._userModel.getCoins() <= 0 && this._userModel.getBankruptTime() > 0) {
                    //     this.cleanBuff();
                    //     _Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
                    //     this.send(NotifyEnum.POP_CHARGE, { type: ChargeType.Gold });
                    // }
                }
            }
        }
    }

    /** 创建子弹 */
    private createFireBullet(m,angle,gunComp,pos,tox,toy,curSkinId,isSelf=true){
        // 创建子弹
        var bulletObj:BulletBase = null;
        if (FishingObjPool.getInstance()){
            bulletObj = FishingObjPool.getInstance().getBulletObj(m);
        }else{
            bulletObj = new BulletBase(m);
        }
        // 设置子弹属性
        bulletObj.belongGun = RoomUtil.getPosByFlip(pos, this._isFlip);
        bulletObj.bePos = curSkinId;
        bulletObj.nGunIndex = -1;
        bulletObj.totalReboundTimes = m.rebound;
        bulletObj.setBulletPos(gunComp.x + this._offsetWidth, gunComp.y, angle);
        var T = Math.PI / 180 * (bulletObj.rotation - 270);
        var E = tox + 2000 * Math.cos(T);
        var I = toy + 2000 * Math.sin(T);
        var b = new egret.Point(E, I);
        var C = egret.Point.distance(new egret.Point(gunComp.x + this._offsetWidth, gunComp.y), b) / CONFIG.BULLET_SPEED;
        // 加入子弹层
        bulletObj.moveLogicBind(FishUtil.GET_BULLET_MOVELOGIC(bulletObj, E, I, 1, C)),
        this._bulletLayer.addChild(bulletObj);
        this.getBulletList().push(bulletObj);
        
        if (isSelf == true){
            // 自己设置子弹id
            this._bulletId++;
            bulletObj.setBulletId(this._bulletId);
        }

        return bulletObj;
    }

    /**
     * 别人发射子弹
     * 1 收到消息
     * 2 开火动画
     * 3 创建子弹
     */
    public otherGunFire(pos, angle, i=false, n=0, a=false, curSkinId) {
        var r = this.getBulletNumByPos(pos, this._isFlip);
        if (! (r >= this.BULLET_MAX_COUNT)) {
            var gunComp = this.getRoomUI().getGunByPos(pos, i, n);
            gunComp.x -= CONFIG.adaptX;
            var m = T_Gun_skin_Table.getVoByKey(curSkinId);
            this._roomUI.gunfire(pos, angle, i, n);

            // 创建子弹
            var bullet = this.createFireBullet(m,angle,gunComp,pos,gunComp.x,gunComp.y,curSkinId,false);
           
            if (m.gunType == GunType.Scatter){
                 // 散弹
                this.createFireBullet(m,angle - 30,gunComp,pos,gunComp.x,gunComp.y,curSkinId);
                this.createFireBullet(m,angle + 30,gunComp,pos,gunComp.x,gunComp.y,curSkinId);
            }else if (m.gunType == GunType.Laser){
                 // 激光
                bullet.playLaserEffect(function(){
                    bullet.setBDead(true);
                })
            }
        }
    }

    /**
     *  添加单条鱼
     *  1 创建鱼actor
     *  2 创建鱼action
     */
    public addUnitFish(fishType, fishUid, fishId, pathId, coordinate:egret.Point, alive = 0, r = -1) {
        // type,uniId,fishId,pathId,coordinate,alive
        // console.log("type:%d uniId:%d fishId:%d pathId:%d x:%f y:%f",e,t[0],i,n,a.x,a.y);
        CONFIG.DEBUG && (CONFIG.TEST_FISH_ID > 0 && (fishId = CONFIG.TEST_FISH_ID, fishType = AddFishType.FISH), CONFIG.TEST_PATH_ID > 0 && (pathId = CONFIG.TEST_PATH_ID));

        var fish;
        var _me = this;
        var path:Array<PathPoint> = RoomUtil.getFishPathById(pathId);
        
        let playFish = function():void {
            var angle = 0;
            var isFlip = !1;
            if (alive > 0) {
                var retArr = RoomUtil.getPointsAndPos(path, alive);
                path = retArr[0];
                coordinate.x = coordinate.x + retArr[1].x;
                coordinate.y = coordinate.y + retArr[1].y;
                angle = retArr[2];
                isFlip = retArr[3];
            }
            if (r >= 0) {
                var retArr = RoomUtil.getPointsAndPosByCala(path, r);
                path = retArr[0];
                coordinate.x = coordinate.x + retArr[1].x;
                coordinate.y = coordinate.y + retArr[1].y;
                angle = retArr[2];
                isFlip = retArr[3];
            }

            coordinate.x += CONFIG.adaptX;
            coordinate.y += CONFIG.adaptY;
            fish.setFishPosition(coordinate);
            fish.rotation = angle;
            (alive > 0 || r >= 0) && (_me._isFlip ? isFlip && fish.fishflipY() : isFlip && fish.fishflipY());
                            
            if (fishType == AddFishType.FISH || fishType == AddFishType.CATCH_WHOLE_FISH) {
                var h = T_Fish_Table.getVoByKey(fishId);
                _me._objectLayer.addFishAt(fish, h.layer)
            } else if (fishType == AddFishType.FISH_GROUP) {
                var c = T_FishGroup_Table.getVoByKey(fishId);
                var h = T_Fish_Table.getVoByKey(c.fishId);
                _me._objectLayer.addFishAt(fish, h.layer)
            } else
                _me._objectLayer.addFishAt(fish, 1);
            var p = new PointsAction(fish);
            p.runByData(path);
            _me.getFishList().push(p);
        };

        // 创建鱼
        if (fishType == AddFishType.FISH) { 
            fish = FishingObjPool.getInstance().getFishById(fishId);
            if (null == fish) {
                fish = new FishBase(fishId,
                    function () {
                        _me._isFlip && fish.fishflipY();
                        fish.setType(fishType);
                        playFish();
                    });
                fish.setUniqId(fishUid[0]);
             } else {
                 _me._isFlip && fish.fishflipY();
                 fish.setType(fishType);
                 playFish();
                 fish.setUniqId(fishUid[0]);
             }
         } else if (fishType == AddFishType.FISH_GROUP) {
              fish = new FishGroup(fishId, fishUid,
                    function () {
                        _me._isFlip && fish.fishflipY();
                        fish.setType(fishType);
                        playFish();
                    });
          } else if (fishType == AddFishType.CATCH_WHOLE_FISH) {
              fish = FishingObjPool.getInstance().getFishById(fishId);
              if (null == fish) {
                  fish = new FishBase(fishId,
                    function () {
                        fish.setUniqId(fishUid[0]);
                        // s.addChassis(i);
                        _me._isFlip && fish.fishflipY();
                        fish.setType(fishType);
                        playFish();
                    }, _me._isFlip);
               } else {
                    fish.setUniqId(fishUid[0]);
                    // fish.addChassis(fishId);
                    _me._isFlip && fish.fishflipY();
                    fish.setType(fishType);
                    playFish();
               }
        }
    }

    // 检查破产
    public checkBankrupt() {
        var e = this._userModel.getBankruptTime();
        if (e > 0) {
            var t = TimeUtil.getCurrTime(),
            i = e - t;
            if (0 >= i) {
                var n = new Bankrupt();
                n.initData(),
                n.setState(7),
                NetManager.send(n, MsgActionDefine.Bankrupt);
            }
        }
    }

    public frozen(e) {
        this._bulletLayer.playFrozenEffect();
        for (var t = this.getFishList().length, i = 0; t > i; i++) {
            // 暂停鱼
            var n = this.getFishList()[i];
            if (n.getActor().getUniqId() != Especial_Fish.Phoenix){
                n.pause()
            }
        }
    }

    public unfrozen() {
        this._bulletLayer.clearFrozenEffect();
        for (var e = this.getFishList().length, t = 0; e > t; t++) {
            var i = this.getFishList()[t];
            i.resume()
        }
    }

    public bossComing(e) {
        this._bulletLayer.bossComing(e)
    }

    public showWave(e) {
        this._bulletLayer.showWave(e, this._isFlip)
    }

    // public useCalabash(e, t, i, n, a, o, r, s, l) {
        // T_FishPath_Table.getVoByKey(n);
        // r += CONFIG.adaptX,
        // s += CONFIG.adaptY,
        // FrameUtil.playHuluEffect(e, t, i, n, l, a, o, r, s, this)
    // }

    public openLotteryTips(e, t, i) {
        this._roomUI.openLotteryGroupWithData(e, t, i)
    }

    public setGunUpdateContains(e, t, i) {
        this._roomUI.setUpdateGunNum(e, t, i)
    }

    public openGunUpdateTips() {
        this._roomUI.openGunUpdateGroup(null)
    }

    public openGunUpdateGroupByEnough() {
        this._roomUI.openGunUpdateGroupByEnough();
    }

    public openLotteryUI(e) {
        var t = new LotteryUI(e);
        t.x += CONFIG.adaptX,
        t.y += CONFIG.adaptY,
        this.addChildAt(t, 82)
    }

    public setRoomerCoins(e, t, i=false) {
        var n = RoomUtil.getPosByFlip(e, this._isFlip);
        this._roomUI.updateRoomerCoins(n, t, i)
    }

    public setRoomerBullet(e, t, i=false) {
        var n = RoomUtil.getPosByFlip(e, this._isFlip);
        this._roomUI.updateRoomerCoins(n, t, i)
    }

    public changeGunSkin(e) {
        this._roomUI.changeGunSkin(e, this._isFlip);
    }

    public setRoomerMoney(e, t) {
        var i = RoomUtil.getPosByFlip(e, this._isFlip);
        this._roomUI.updateRoomerMoney(i, t);
    }

    public setRoomerGunPow(pos, pow, i=false) {
        var n = RoomUtil.getPosByFlip(pos, this._isFlip);
        this._roomUI.updateGunPow(n, pow, i);
    }

    public setRoomerGunRate(pos, rate, i=false) {
        var n = RoomUtil.getPosByFlip(pos, this._isFlip);
        this._roomUI.updateGunRate(n, rate, i);
    }

    public setGunRateListData(arr:Array<T_Gun>) {
        this._roomUI.changeGunRateListData(arr);
    }

    public setPropNum(frozenCnt, lockCnt, cloneCnt, rageCnt, calabashCnt, o, r, s, l) {
        if (!this._roomUI || !this._roomUI.getFrozenAndLockUI) return;
        this._roomUI.getFrozenAndLockUI() && (this._roomUI.getFrozenAndLockUI().setFrozenTxt("" + frozenCnt), this._roomUI.getFrozenAndLockUI().setLockTxt("" + lockCnt));
        this._roomUI.getSidePropUI() && (this._roomUI.getSidePropUI().setCloneTxt("" + cloneCnt), this._roomUI.getSidePropUI().setRageTxt("" + rageCnt), this._roomUI.getSidePropUI().setCalabashTxt("" + calabashCnt));
        this._roomUI.getGoldBtn() && this._roomUI.getGoldBtn().setNum("" + o);
        this._roomUI.getSilverBtn() && this._roomUI.getSilverBtn().setNum("" + r);
        this._roomUI.getBronzeBtn() && this._roomUI.getBronzeBtn().setNum("" + s);
        this._roomUI.getNuclearBtn() && this._roomUI.getNuclearBtn().setNum("" + l);
    }

    public setObjPool() {
        FishingObjPool.getInstance().reset()
    }

    public getBulletLayer() {
        return this._bulletLayer
    }

    // public getCeilingLayer() {
    //     return this._ceilingLayer
    // }

    public getRoomUI() {
        return this._roomUI
    }

    public getIsFlip() {
        return this._isFlip
    }

    public setLocked(e) {
        this._isLocked = e
    }

    public getLocked() {
        return this._isLocked
    }

    public setRage(e) {
        this._isRage = e
    }

    public setRageEffect(e, t) {
        if (e) {
            var i = this.getBulletLayer().getChildByName("fazhen" + t);
            i && this.getBulletLayer().removeChild(i);
            var n = this._roomUI.getGunPointByPos(t, this.isFlip()),
            a = new egret.Point(n.x, n.y),
            o = a.x + CONFIG.adaptX,
            r = a.y + CONFIG.adaptY,
            s = RoomUtil.getPosByFlip(t, this._isFlip);
            GameUtil.cloneEffect(this.getBulletLayer(), this, o, r, s)
        } else {
            var s = RoomUtil.getPosByFlip(t, this._isFlip),
            i = this.getBulletLayer().getChildByName("clone" + s);
            i && this.getBulletLayer().removeChild(i)
        }
    }

    public setCloneEffect(e, t) {
        if (e) {
            var i = this.getBulletLayer().getChildByName("fazhen" + t);
            i && this.getBulletLayer().removeChild(i);
            var n = this.getBulletLayer().getChildByName("kuangbao" + t);
            n && this.getBulletLayer().removeChild(n);
            var a = this._roomUI.getGunPointByPos(t, this.isFlip()),
            o = new egret.Point(a.x, a.y),
            r = o.x + CONFIG.adaptX,
            s = o.y + CONFIG.adaptY;
            GameUtil.cloneEffect(this.getBulletLayer(), this, r, s, t)
        } else {
            var i = this.getBulletLayer().getChildByName("clone" + t);
            i && this.getBulletLayer().removeChild(i)
        }
    }

    public setLockedEffect(e, t) {
        if (e) {
            var i = this._roomUI.getGunPointByPos(t, this.isFlip()),
            n = new egret.Point(i.x, i.y),
            a = n.x + CONFIG.adaptX,
            o = n.y + CONFIG.adaptY;
            GameUtil.fazhenEffect(this.getBulletLayer(), this, a, o, t)
        } else {
            var r = this.getBulletLayer().getChildByName("fazhen" + t);
            r && this.getBulletLayer().removeChild(r)
        }
    }

    public getRage() {
        return this._isRage
    }

    // 设定锁定对象
    public setLockedObj(e) {
        null == this._arrLockedObj && (this._arrLockedObj = new Array);
        for (var t = this._arrLockedObj.length,
            i = 0; t > i; i++) if (this._arrLockedObj[i].getLockedPos() == e.getLockedPos()) return void (this._arrLockedObj[i] = e);
        this._arrLockedObj.push(e)
    }

    //删除锁定对象
    public deleteLockedObj(e, t) {
        void 0 === t && (t = !0),
            null == this._arrLockedObj && (this._arrLockedObj = new Array);
        for (var i = -1,
            n = this._arrLockedObj.length,
            a = 0; n > a; a++) if (this._arrLockedObj[a].getUserId() == e) {
                i = a;
                break
            }
        if (- 1 != i) {
            var o = this._userModel.getUserId();
            if (e == o && t && this.setSelectFishState(!1), null != this._arrLockedObj[i]) for (var r = this._arrLockedObj[i].getLockedID(), a = 0; a < r.length; a++) {
                var s = RoomUtil.getFishById(this.getFishList(), r[a]);
                s && s.removeEffect("locked")
            }
            t ? this._arrLockedObj.splice(i, 1) : this._arrLockedObj[i].spliceLockedID()
        }
    }

    public isLockedMine() {
        if (this._arrLockedObj) {
            var e = this._arrLockedObj.length;
            if (0 == e) return !1;
            for (var t = this._userModel.getUserId(), i = 0; e > i; i++) if (this._arrLockedObj[i].getUserId() == t) return !0
        }
        return !1
    }

    public setLockedFishMindeId(e, t, i) {
        if (null != this._arrLockedObj && 0 != this._arrLockedObj.length) for (var n = this._arrLockedObj.length,
            a = 0; n > a; a++) if (this._arrLockedObj[a].getUserId() == e) {
                this._arrLockedObj[a].setLockedId(t, i);
                break
            }
    }

    public getLockedFishId(e, t=0) {
        if (null == this._arrLockedObj) return - 1;
        var i = this._arrLockedObj.length;
        if (0 == i) return - 1;
        for (var n = 0; i > n; n++) {
            var a = this._arrLockedObj[n];
            if (a.getUserId() == e) return a.getLockedID()[t]
        }
        return - 1
    }

    public changeLockedFish(e, t, i=0) {
        var n = RoomUtil.getFishById(this.getFishList(), this.getLockedFishId(e, i));
        if (n && e == this._userModel.getUserId() && n.removeEffect("locked"), null != t) {
            var a = t.getUniqId();
            this.setLockedFishMindeId(e, a, i),
            e == this._userModel.getUserId() && GameUtil.setLockedEffect(t, "locked", "locked_circle_png")
        }
    }

    public isBulletLocked(e) {
        var t = false;
        var i = this._arrLockedObj;
        if (i) {
            var n = i.length;
            if (n > 0) for (var a = 0; n > a; a++) if (i[a].getLockedPos() == e) return !0
        }
        return t
    }

    public getBulletLockedId(e) {
        var t = this._arrLockedObj;
        if (t) {
            var i = t.length;
            if (i > 0) for (var n = 0; i > n; n++) if (t[n].getLockedPos() == e) return t[n].getLockedID()
        }
        return null
    }

    public setClone(e) {
        this._isClone = e,
            this._isClone ? this.getRoomUI().setGunState(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), !0, 3, this._myPositon) : this.getRoomUI().setGunState(RoomUtil.getPosByFlip(this._myPositon, this._isFlip), !1, 3, this._myPositon)
    }

    public setGunNum(e) {
        this._nGunNum = e
    }

    public getClone() {
        return this._isClone
    }

    public setPaobeiAddState(e) {
        if (e) {
            this._roomUI.addRateBtn_0.visible = !0;
            this._roomUI.reduceRateBtn_0.visible = !0;
            this._roomUI.addRateBtn_1.visible = !1;
            this._roomUI.reduceRateBtn_1.visible = !1;
            this._roomUI.addRateBtn_1.touchEnabled = !1;
            this._roomUI.reduceRateBtn_1.touchEnabled = !1;
            this._roomUI.gunRateBtnGroup0.touchEnabled = true;
            this._roomUI.gunRateBtnGroup1.touchEnabled = false;
            this._roomUI.autoFire_btn0.visible = true;
            this._roomUI.autoFire_btn1.visible = false;
            this._roomUI.autoFireImg0.visible = !this._autoFire;
            this._roomUI.stopAutoFireImg0.visible = this._autoFire;
        } else {
            this._roomUI.addRateBtn_0.visible = !1;
            this._roomUI.reduceRateBtn_0.visible = !1;
            this._roomUI.addRateBtn_0.touchEnabled = !1;
            this._roomUI.reduceRateBtn_0.touchEnabled = !1;
            this._roomUI.addRateBtn_1.visible = !0;
            this._roomUI.reduceRateBtn_1.visible = !0;
            this._roomUI.gunRateBtnGroup0.touchEnabled = false;
            this._roomUI.gunRateBtnGroup1.touchEnabled = true;
            this._roomUI.autoFire_btn0.visible = false;
            this._roomUI.autoFire_btn1.visible = true;
            this._roomUI.autoFireImg1.visible = !this._autoFire;
            this._roomUI.stopAutoFireImg1.visible = this._autoFire;
        }
    }

    public getInHandWarHeadFish() {
        return this._inHandWarHeadFish
    }

    public setInHandWarheadFish(e) {
        this._inHandWarHeadFish = e
    }

    public resetInHandWarHeadFish() {
        this._inHandWarHeadFish = -1
    }

    public setSelectFishState(e) {
        this._selectFishState = e,
            this._selectFishState ? (this._objectLayer.touchEnabled = !0, this._bgLayer.touchEnabled = !1) : (this._objectLayer.touchEnabled = !1, this._bgLayer.touchEnabled = !0)
    }

    public updateStageBubble() {
        this._floorLayer.addBubble()
    }

    public cleanBuff() {
        var e = this._roomModel.getRoomerById(this._userModel.getUserId());
        e.setIsLock(!1),
        this.setLockedEffect(!1, e.getRoomPos()),
        this.setLocked(!1),
        e.setIsClone(!1),
        this.setCloneEffect(!1, e.getRoomPos()),
        this.setClone(!1),
        e.setIsRage(!1),
        this.setRageEffect(!1, e.getRoomPos()),
        this.setRage(!1),
        this.deleteLockedObj(this._userModel.getUserId(), !0)
    }

    public setBackrupt(pos, tipTxt, isMe = false) {
        var viewPos = RoomUtil.getPosByFlip(pos, this._isFlip);
        this._roomUI.setBankrupt(viewPos, tipTxt, isMe);
    }

    public removeBankrupt(e) {
        var viewPos = RoomUtil.getPosByFlip(e, this._isFlip);
        this._roomUI.removeBankrupt(viewPos);
    }

    public showNum(e) {
        this._bulletLayer.showNum(e)
    }

    public showChakan(e) {
        this.getRoomUI().chakanUI && this.getRoomUI().setShowChakan(e, this.isFlip())
    }

    public getMyPosition() {
        return this._myPositon
    }

    public getOffsetWidth() {
        return this._offsetWidth
    }

    public isFlip() {
        return this._isFlip
    }

    public setAutoGunFire(e) {
        if (e) {
            this._autoFire = false;
            this._roomUI.autoFireImg0.visible = true;
            this._roomUI.autoFireImg1.visible = true;
            this._roomUI.stopAutoFireImg0.visible = false;
            this._roomUI.stopAutoFireImg1.visible = false;
        } else {
            if (this._autoFire) {
                this._autoFire = false;
                this._roomUI.autoFireImg0.visible = true;
                this._roomUI.autoFireImg1.visible = true;
                this._roomUI.stopAutoFireImg0.visible = false;
                this._roomUI.stopAutoFireImg1.visible = false;
            } else {
                this._autoFire = true;
                this._roomUI.autoFireImg0.visible = false;
                this._roomUI.autoFireImg1.visible = false;
                this._roomUI.stopAutoFireImg0.visible = true;
                this._roomUI.stopAutoFireImg1.visible = true;
            }
        }
    }

    public guide_addFish() {
        var e = new FishBase(22);
        e.setUniqId(Especial_Fish.Guide_Fish);
        var t = AddFishType.FISH;
        e.setType(t);
        if (this.isFlip()) {
            e.fishflipY();
            var i = new egret.Point(CONFIG.contentWidth / 2 - 100, CONFIG.contentHeight / 2 + 120);
            i.x += CONFIG.adaptX,
            i.y += CONFIG.adaptY,
            e.setFishPosition(i)
        } else {
            var i = new egret.Point(CONFIG.contentWidth / 2 - 100, CONFIG.contentHeight / 2 - 50);
            i.x += CONFIG.adaptX,
            i.y += CONFIG.adaptY,
            e.setFishPosition(i)
        }
        var n = egret.Tween.get(e, {
            loop: !1
        });
        n.to({
            scaleX: 1.7,
            scaleY: 1.7
        },
        400).call(function() {
            egret.Tween.removeTweens(e)
        }),
        this._objectLayer.addFishAt(e, 3);
        var a = new PointsAction(e);
        a.setActionAlive(!0),
        this.getFishList().push(a)
    }

    public destroy() {
        this._roomUI && this._roomUI.destory();
        this._floorLayer.destory();
        this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this),
        this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this),
        this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this),
        this._bgLayer.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchCacel, this),
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this),
        this.removeChildren();
        this.parent && this.parent.removeChild(this);
    }

}