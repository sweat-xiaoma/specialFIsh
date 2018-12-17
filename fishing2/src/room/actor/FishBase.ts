class FishBase extends ActorBase {

    private _isGroupFish:boolean;
    private _preLoadMaxCount;
    private _preLoadCount;
    private _loadCallback;
    private _bIsBling;
    private _bModifed;
    private _rectList:egret.Shape[];

    private _bViewFlip;
    private _fishScore;
    private _groupFishList;
    private _groupChasisArr;
    private _chasisModify;
    private _groupChasisLen;
    private _modifyRect;
    private _shield;
    private _blingTimer;

    public constructor(fishId, loadCallBack = null, n = false) {
        super();

        this._isGroupFish = false;
        this._preLoadMaxCount = 1;
        this._preLoadCount = 0;
        this._loadCallback = loadCallBack;
        this._bIsBling = false;
        this._bModifed = false;
        // this._bFlipY = false;

        this._rectList = new Array;
    
        this.CHASIS_LAYER = new egret.DisplayObjectContainer;
        this.CHASIS_LAYER.anchorOffsetX = this.CHASIS_LAYER.width / 2;
        this.CHASIS_LAYER.anchorOffsetY = this.CHASIS_LAYER.height / 2;
        this.addChild(this.CHASIS_LAYER);
        this.FISH_LAYER = new egret.DisplayObjectContainer;
        this.FISH_LAYER.anchorOffsetX = this.FISH_LAYER.width / 2;
        this.FISH_LAYER.anchorOffsetY = this.FISH_LAYER.height / 2;
        this.addChild(this.FISH_LAYER);
        this.EFFECT_LAYER = new egret.DisplayObjectContainer;
        this.EFFECT_LAYER.anchorOffsetX = this.EFFECT_LAYER.width / 2;
        this.EFFECT_LAYER.anchorOffsetY = this.EFFECT_LAYER.height / 2;
        this.addChild(this.EFFECT_LAYER);
        this.FISH_POP_LAYER = new egret.DisplayObjectContainer;
        this.FISH_POP_LAYER.anchorOffsetX = this.FISH_POP_LAYER.width / 2;
        this.FISH_POP_LAYER.anchorOffsetY = this.FISH_POP_LAYER.height / 2;
        this.addChild(this.FISH_POP_LAYER);
        this._bViewFlip = n;
        this.init(fishId);
    }

    public init(fishId) {
        this._fid = fishId;
        var fish:T_Fish = T_Fish_Table.getVoByKey(fishId);
        if (null == fish) return void console.log("Warnning!!!the fish data is null,id--->", fishId);

        this._fishScore = fish.score;
        this._groupFishList = new Array;
        if (fish.groupId <= 0) 
            // 单条鱼
            this.preLoadData(fish.resRunUrl, 0, 0, fish.frameRate);
        else {
            // 组合鱼
            this._isGroupFish = !0;
            var n = T_FishGroup_Table.getVoByKey(fish.groupId);
            if (n) {
                this._groupChasisArr = new Array;
                var a = n.pos,
                    o = a.split("|"),
                    r = o.length;
                this._chasisModify = new Array,
                    this._preLoadMaxCount = r;
                for (var s = function (e) {
                    var n = o[e].split("_"),
                        a = n[0].split(","),
                        r = n[1].split(","),
                        s = T_Fish_Table.getVoByKey(Number(a[0]));
                    l.preLoadData(s.resRunUrl, Number(r[0]), Number(r[1]), fish.frameRate);
                    var u = RoomUtil.getChasisByType(ChasisFish.GROUP_FISH, Number(a[1]));
                    RES.getResAsync(u,
                        function (e, i) {
                            var n = new egret.Bitmap(e);
                            this.CHASIS_LAYER.addChild(n),
                                n.scaleX = n.scaleY = Number(a[2]),
                                n.anchorOffsetX = n.width / 2,
                                n.anchorOffsetY = n.height / 2,
                                n.x = Number(a[3]),
                                n.y = Number(a[4]),
                                TweenTools.rotationFan(n, 2e3),
                                this._groupChasisArr.push(n),
                                this._chasisModify.push(Number(a[4]) - Number(r[1]))
                        },
                        l)
                },
                    l = this, u = 0; r > u; u++) s(u);
                this._groupChasisLen = this._groupChasisArr.length
            } else console.error("没有这个组合鱼！")
        }
    }

    public preLoadData(e, t, i, n) {
        RES.getResAsync(e + "_json",
            function () {
                RES.getResAsync(e + "_png",
                    function () {
                        if (RES.hasRes(e + "_rect_json")){
                            RES.getResAsync(e + "_rect_json",
                                function () {
                                    this.initFishData(e, t, i, n),
                                    this._preLoadCount++ ,
                                    this._preLoadCount >= this._preLoadMaxCount && this._loadCallback && this._loadCallback()
                                },
                            this)
                        }else{
                            this.initFishData(e, t, i, n), 
                            this._preLoadCount++ , 
                            this._preLoadCount >= this._preLoadMaxCount && this._loadCallback && this._loadCallback()
                        }
                    },
                    this)
            },
            this)
    }
    /**
     *  初始化鱼
     *  单条鱼的(x，y)=(0,0)
     */
    public initFishData(fishName, x, y, frameRate) {
        //播放序列帧动画
        var a = this,
        o = RES.getRes(fishName + "_json"),
        r = RES.getRes(fishName + "_png");
        if (void 0 == o || void 0 == r) {
            // var s = Director.getModelByKey(UserModel);
            // console.error("类型为" + s.getMatchRoomLevel() + "的房间不存在这条鱼：" + fishName);
            console.error("找不到鱼的动画文件：" + fishName);
            o = RES.getRes("xiaochouyu_json");
            r = RES.getRes("xiaochouyu_png");
            fishName = "xiaochouyu";
        }
       
        var fish:T_Fish = T_Fish_Table.getVoByKey(this._fid);
        if (null == fish) {
            CONFIG.IS_PRINT_LOG && console.log("Warnning!!!the fish data is null,id--->", this._fid);
            return;
        }

        var mcFactory = new egret.MovieClipDataFactory(o, r);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData(fishName));
        var d = mc.movieClipData;
        this._modifyRect = new egret.Rectangle(d.frames[0].x, d.frames[0].y, 0, 0);
        mc.anchorOffsetX = mc.width / 2,
        mc.anchorOffsetY = mc.height / 2,
        mc.x = x,
        mc.y = y,
        mc.scaleX = mc.scaleY = fish.scale ;//1.5;
        
        this.FISH_LAYER.addChild(mc),
        this._groupFishList.push(mc),
        CONFIG.DEBUG && CONFIG.TEST_fishFrameRate > 0 ? mc.frameRate = CONFIG.TEST_fishFrameRate : frameRate > 0 ? mc.frameRate = frameRate : mc.frameRate = CONFIG.defaultFishFrameRate,
        mc.gotoAndPlay("run", -1);
        // 绘制碰撞区域   
        var c = RES.getRes(fishName + "_rect_json");
        if (null != c) {
             for (var i = 0; i < c.rect.length ; i++) {
                var rect = c.rect[i];
                var shape:egret.Shape = new egret.Shape;
                shape.graphics.beginFill(0xff0000, 0),
                CONFIG.DEBUG ? (shape.graphics.lineStyle(2, 0), shape.visible = true) : (shape.graphics.lineStyle(2, 0, 0), shape.visible = false),
                shape.graphics.drawRect(rect.x, rect.y, rect.w, rect.h),
                shape.graphics.endFill(),
                shape.x = x,
                shape.y = y,
                this.FISH_LAYER.addChild(shape);
                this._rectList.push(shape);
            }
        }
        else{
            // 加上所有鱼的碰撞矩形  
            var shape:egret.Shape = new egret.Shape;
            shape.graphics.beginFill(0xff0000, 0),
            CONFIG.DEBUG ? (shape.graphics.lineStyle(2, 0), shape.visible = true) : (shape.graphics.lineStyle(2, 0, 0), shape.visible = false);
            var fishRect:egret.Rectangle = mc.getTransformedBounds(this.FISH_LAYER);
            shape.graphics.drawRect(fishRect.x, fishRect.y, fishRect.width, fishRect.height),
            // shape.x = x,
            // shape.y = y,
            shape.graphics.endFill(),
            this.FISH_LAYER.addChild(shape),
            this._rectList.push(shape)
        }
       
        var f = this;
        if ("fenghuang" == fishName) {
            var v = (Director.getModelByKey(UserModel), Director.getModelByKey(RoomModel));
            if (v.getPhoenix()) {
                var T = v.getPhoenix(),
                    E = T.getCurShield(),
                    I = T.getMaxShield();
                if (0 >= I - E) return
            }
            RES.getResAsync("boss_shield_png",
                function () {
                    f._shield = new egret.Bitmap(RES.getRes("boss_shield_png"));
                    var e = T_Fish_Table.getVoByKey(f._fid),
                        t = e.posLocked,
                        i = t.split(","),
                        n = f.isFlipY(),
                        a = f.getIsGroupFish();
                    f._shield.x = parseInt(i[0]) + f.getModifyRect().x,
                        f._shield.y = parseInt(i[1]) + f.getModifyRect().y,
                        n && (a ? f.getChasisModify() && (f._shield.y -= 2 * f.getChasisModify()) : f._shield.y = -f._shield.y),
                        f._shield.anchorOffsetX = f._shield.width / 2,
                        f._shield.anchorOffsetY = f._shield.height / 2,
                        f._shield.name = "boss_shield_png",
                        f.addEffect(f._shield, "boss_shield_png")
                },
                f)
        }
        "guanyu" == fishName && RES.getResAsync("GuanYu_Tips_png",
            function () {
                var e = new egret.Bitmap(RES.getRes("GuanYu_Tips_png")),
                    t = T_Fish_Table.getVoByKey(f._fid),
                    i = t.posLocked,
                    n = i.split(","),
                    o = f.isFlipY();
                f.getIsGroupFish();
                e.x = parseInt(n[0]) + f.getModifyRect().x - 20,
                    e.y = parseInt(n[1]) + f.getModifyRect().y - 200,
                    o && (e.y = -e.y, a._bFlipY != a._bViewFlip ? a._bFlipY ? (e.scaleY = -e.scaleY, e.scaleX = -e.scaleX) : (e.scaleY = e.scaleY, e.scaleX = e.scaleX) : a._bFlipY ? (e.scaleY = e.scaleY, e.scaleX = e.scaleX) : (e.scaleY = -e.scaleY, e.scaleX = -e.scaleX)),
                    e.anchorOffsetX = e.width / 2,
                    e.anchorOffsetY = e.height,
                    e.name = "GuanYu_Tips_png",
                    f.FISH_POP_LAYER.addChild(e)
            },
            this)
    }

    public setFishPosition(e) {
        this.x = e.x,
        this.y = e.y
    }

    public hitRect(e, t): number {
        var i = -1,
            n = this._rectList.length;
        if (n > 0) {
            for (var a = 0; n > a; a++) {
                let o = this._rectList[a].hitTestPoint(e, t);
                if (o) {
                    i = this.getUniqId();
                    break
                }
            }
        }

        return i;
        // let o = this.hitTestPoint(e, t);
        // return o && (i = this.getUniqId()), i
    }

    /** 检测网和鱼的碰撞  采用obb包围盒碰撞 
     *  net 网(激光炮代表子弹)
     */
    public getHitFishByNet(net):any{
        if (this._rectList.length <= 0) return;

        // 网的obb
        var obbNet = this.getOBBObject(net,net.getRect(),false);
        // 鱼的obb
        var fishUniId = -1;
        for (var a = 0; a < this._rectList.length; a++) {
            var rect:egret.Rectangle = this._rectList[a].getTransformedBounds(this.FISH_LAYER);
            var obbFish = this.getOBBObject(this._rectList[a],rect,true);
            // 碰撞
            if (obbFish.isCollidWithOBB(obbNet)){
                fishUniId = this.getUniqId();
                break;
            }
        }

        return fishUniId;
    }

    /**获取obb对象 */
    private getOBBObject(object:any,rect:egret.Rectangle,isFish:boolean){
        var obb = new OBB();
        var points = [
            new egret.Point(rect.x, rect.y),
            new egret.Point(rect.x, rect.height+rect.y),
            new egret.Point(rect.width+rect.x, rect.height+rect.y),
            new egret.Point(rect.x+rect.width, rect.y)
        ];

        var pointsWorld = [];
        for (var i = 0; i < points.length; i++) {
            var point:egret.Point = points[i];
            var pw:egret.Point = new egret.Point(0,0);
            object.localToGlobal(point.x, point.y, pw);
            obb.setVertex(i, pw.x, pw.y);
            pointsWorld.push(pw);
        }

        // 框框
        if (CONFIG.DEBUG){
            var sprite = this.drawSprite(pointsWorld,isFish);
            var n = Director.getStage();
            n.addChild(sprite);
            setTimeout(function() {
                n.removeChild(sprite);
            },
            500)
        }
        
        return obb;
    }

    /**
     * 获取随机的颜色
     */
    private randomColor(): number {
        // return Food.colorList[Math.round(Math.random() * Food.colorList.length)];
        return parseInt("0x" + ("000000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6));
    }

    private drawSprite(points:Array<egret.Point>,isFish):egret.Shape {
        var startPoint:egret.Point = points[0];
        var sprite = new egret.Shape();
        
        sprite.graphics.clear();

        if (isFish){
            sprite.graphics.lineStyle(2, this.randomColor());
        }else{
            sprite.graphics.lineStyle(3,0xFF0000);
        }
        sprite.graphics.moveTo( startPoint.x, startPoint.y );
        for (var i = 0; i < points.length ; i++) {
            var point = points[i];
            sprite.graphics.lineTo( point.x, point.y );
        }
         sprite.graphics.lineTo( startPoint.x, startPoint.y);
        
        sprite.graphics.endFill();

        return sprite;
    }
    

    public addEffect(e, t) {
        var i = this.EFFECT_LAYER.getChildByName(t);
        return null == i ? (this.EFFECT_LAYER.addChildAt(e, 7), !0) : !1
    }

    public removeEffect(e) {
        var t = this.EFFECT_LAYER.getChildByName(e);
        t && this.EFFECT_LAYER.removeChild(t)
    }

    public playHitEffect() {
        var e = T_Fish_Table.getVoByKey(this._fid);
        var t = FilterEnmu.getFilter(FilterEnmu.LESS_LIGTH);
        e.Matrix == FilterEnmu.FISH_TYPE_MATRIX_1 ? t = FilterEnmu.getFilter(FilterEnmu.FISH_TYPE_1) : e.Matrix == FilterEnmu.FISH_TYPE_MATRIX_2 && (t = FilterEnmu.getFilter(FilterEnmu.FISH_TYPE_2));
        this.getFISH_LAYER().filters = t;
        if (!this._bIsBling) {
            this._blingTimer = new egret.Timer(300, 1);
            this._blingTimer.addEventListener(egret.TimerEvent.TIMER, this.timeFun, this);
            this._blingTimer.start();
            this._bIsBling = true;
        }
    }

    public timeFun() {
        this._blingTimer && (this._blingTimer.removeEventListener(egret.TimerEvent.TIMER, this.timeFun, this), this.getFISH_LAYER().filters = null, this._bIsBling = false)
    }

    public playDead(e = !1) {
        void 0 === e && (e = !1);
        SoundManager.playFishDeathSound(this._fid);
        if (e)
            this.destory();
        else {
            egret.Tween.removeTweens(this);
            var t = this,
                i = this.getFISH_LAYER(),
                n = T_Fish_Table.getVoByKey(this._fid);
            if (n.deadType == FishDeadType.RotationAndScale) {
                var a = egret.Tween.get(i, {
                    loop: !1
                });
                a.to({
                    scaleX: 1.8,
                    scaleY: 1.8
                },
                    200).to({
                        rotation: i.rotation + 360
                    },
                    800).to({
                        alpha: 0
                    },
                    200).call(function () {
                        egret.Tween.removeTweens(t.getFISH_LAYER()),
                            t.poolPushFish()
                    })
            } else if (n.deadType == FishDeadType.Speed) {
                for (var o = 0; o < this._groupFishList.length; o++) this._groupFishList[o].frameRate = 25;
                var a = egret.Tween.get(i, {
                    loop: !1
                });
                a.wait(1e3).to({
                    alpha: 0
                },
                    200).call(function () {
                        egret.Tween.removeTweens(t.getFISH_LAYER()),
                            t.poolPushFish()
                    })
            } else if (n.deadType == FishDeadType.SpeedAndScale) {
                for (var o = 0; o < this._groupFishList.length; o++) this._groupFishList[o].frameRate = 25;
                var a = egret.Tween.get(i, {
                    loop: !1
                });
                a.to({
                    scaleX: 1.5,
                    scaleY: 1.5
                },
                    200).wait(1e3).to({
                        alpha: 0
                    },
                    200).call(function () {
                        egret.Tween.removeTweens(t.getFISH_LAYER()),
                            t.poolPushFish()
                    })
            } else if (n.deadType == FishDeadType.DeadAtOnce) t.poolPushFish();
            else if (n.deadType == FishDeadType.N_1) {
                i.scaleX = 1.3,
                    i.scaleY = 1.3;
                for (var o = 0; o < this._groupFishList.length; o++) this._groupFishList[o].frameRate = 25;
                var a = egret.Tween.get(i, {
                    loop: !1
                });
                a.wait(500).to({
                    scaleX: 1.2,
                    scaleY: 1.2
                },
                    100).to({
                        scaleX: 1.3,
                        scaleY: 1.3
                    },
                    100).to({
                        scaleX: 1.2,
                        scaleY: 1.2
                    },
                    100).to({
                        scaleX: 1.3,
                        scaleY: 1.3
                    },
                    100).to({
                        scaleX: 1.2,
                        scaleY: 1.2
                    },
                    100).to({
                        scaleX: 1.3,
                        scaleY: 1.3
                    },
                    100).to({
                        scaleX: .2,
                        scaleY: .2,
                        alpha: 0,
                        rotation: i.rotation - 360
                    },
                    1200).call(function () {
                        egret.Tween.removeTweens(t.getFISH_LAYER()),
                            t.poolPushFish()
                    })
            } else if (n.deadType == FishDeadType.N_2) {
                var a = egret.Tween.get(i, {
                    loop: !1
                });
                a.wait(180).call(function () {
                    i.rotation -= 120
                }).wait(180).call(function () {
                    i.rotation -= 120
                }).wait(180).call(function () {
                    i.rotation -= 120
                }).wait(180).call(function () {
                    i.rotation -= 150,
                        i.alpha -= .125
                }).wait(180).call(function () {
                    i.rotation -= 150,
                        i.alpha -= .125
                }).wait(180).call(function () {
                    i.rotation -= 150,
                        i.alpha -= .125
                }).wait(180).call(function () {
                    i.rotation -= 150,
                        i.alpha -= .125
                }).wait(180).call(function () {
                    i.rotation -= 150,
                        i.alpha -= .25
                }).wait(180).call(function () {
                    i.rotation -= 150,
                        i.alpha -= .25
                }).call(function () {
                    egret.Tween.removeTweens(t.getFISH_LAYER()),
                        t.poolPushFish()
                })
            } else if (n.deadType == FishDeadType.Alpha) {
                var a = egret.Tween.get(i, {
                    loop: !1
                });
                a.to({
                    alpha: 0
                },
                    416).call(function () {
                        egret.Tween.removeTweens(t.getFISH_LAYER()),
                            t.poolPushFish()
                    })
            }
        }
        this.EFFECT_LAYER && this.EFFECT_LAYER.removeChildren()
    }
    public playDeadHeidong() {
        SoundManager.playFishDeathSound(this._fid);

        egret.Tween.removeTweens(this);
        var t = this;
        var a = egret.Tween.get(this, {
            loop: !1
        });
        var tx = CONFIG.contentWidth / 2 + CONFIG.adaptX;
        var ty = CONFIG.contentHeight / 2 + CONFIG.adaptY;
        a.to({
            scaleX: 0,
            scaleY: 0,
            x:tx,
            y:ty
        }, 1300).call(function () {
            egret.Tween.removeTweens(t),
            t.poolPushFish()
        })

        this.EFFECT_LAYER && this.EFFECT_LAYER.removeChildren()
    }

    public poolPushFish() {
        FishingObjPool.getInstance().insertFishPool(this)
    }

    public getFishScore() {
        return this._fishScore
    }

    public getModifyRect() {
        return this._modifyRect
    }
    public getIsGroupFish() {
        return this._isGroupFish
    }

    public fishflipY() {
        if (this._isGroupFish) return void (this.scaleY = -this.scaleY);
        for (var e = this.FISH_LAYER.numChildren,
            t = 0; e > t; t++) {
            var i = this.FISH_LAYER.getChildAt(t);
            i.scaleY = -i.scaleY,
                i.scaleY < 0 ? this._bFlipY = !0 : this._bFlipY = !1
        }
        for (var n = this.CHASIS_LAYER.numChildren,
            a = !1,
            t = 0; n > t; t++) {
            var o = this.CHASIS_LAYER.getChildAt(t);
            this._isGroupFish ? (o.scaleY = -o.scaleY, this._chasisModify[t] && (this._bModifed ? o.y += 2 * this._chasisModify[t] : o.y -= 2 * this._chasisModify[t], a = !0)) : o.y = -o.y
        }
        for (var r = this.EFFECT_LAYER.numChildren,
            t = 0; r > t; t++) {
            var o = this.EFFECT_LAYER.getChildAt(t);
            this._isGroupFish ? this._chasisModify[0] && (this._bModifed ? o.y += 2 * this._chasisModify[0] : o.y -= 2 * this._chasisModify[0]) : o.y = -o.y
        }
        if (100 == this._fid) for (var s = this.FISH_POP_LAYER.numChildren,
            t = 0; s > t; t++) {
            var o = this.FISH_POP_LAYER.getChildAt(t);
            o.y = -o.y,
                this._bFlipY != this._bViewFlip ? this._bFlipY ? (o.scaleY = -o.scaleY, o.scaleX = -o.scaleX) : (o.scaleY = o.scaleY, o.scaleX = o.scaleX) : this._bFlipY ? (o.scaleY = o.scaleY, o.scaleX = o.scaleX) : (o.scaleY = -o.scaleY, o.scaleX = -o.scaleX)
        }
        a && (this._bModifed = !this._bModifed)
    }

    public getChasisModify() {
        return this._chasisModify[0]
    }

    public resetData() {
        this.scaleX = 1,
            this.scaleY = 1,
            this.getFISH_LAYER().alpha = 1,
            this.getFISH_LAYER().scaleX = 1,
            this.getFISH_LAYER().scaleY = 1,
            this.rotation = 0;
        var e = T_Fish_Table.getVoByKey(this._fid),
            t = e.frameRate;
        0 >= t && (t = CONFIG.defaultFishFrameRate);
        for (var i = 0; i < this._groupFishList.length; i++) this._groupFishList[i].frameRate = t;
        for (var n = this.numChildren,
            i = 0; n > i; i++) {
            var a = this.getChildAt(i);
            a.alpha = 1,
                a.rotation = 0
        }
        this._bFlipY && this.fishflipY(),
            this.EFFECT_LAYER && this.EFFECT_LAYER.removeChildren();
        for (var o = this.CHASIS_LAYER.numChildren,
            i = 0; o > i; i++) TweenTools.rotationFan(this.CHASIS_LAYER.getChildAt(i), 2e3)
    }

    public destory() {
        for (var e = this.numChildren,
            t = 0; e > t; t++) {
            var i = this.getChildAt(t);
            i.alpha = 0
        }
        this.timeFun();
        for (var n = this.CHASIS_LAYER.numChildren,
            t = 0; n > t; t++) egret.Tween.removeTweens(this.CHASIS_LAYER.getChildAt(t));
        egret.Tween.removeTweens(this.getFISH_LAYER()),
            egret.Tween.removeTweens(this),
            this.parent && this.parent.removeChild(this)
    }

}