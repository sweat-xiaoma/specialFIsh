class OneKillMany {
   
    public static killMany(view, userId, fishUid, n, a, fishList, r, s) {
        var l = this,
        u = RoomUtil.getActionByUid(fishList, fishUid);

        if(a == OneKillManyType.BLACKHOLE){
            this.heidongFish(view, userId, fishUid, n, a, fishList, r, s);
            return;
        }

        if (null != u) {
            if (u.pause(), a == OneKillManyType.ELECTRIC) {
                this.lockedAllFish(view, userId, u, n, fishList, a, r, s);
            } else {
                var d = u.getActor();
                var h = this.getEffectByType(a);
                var c = RES.getRes(h + "_json");
                var p = RES.getRes(h + "_png"),
                g = new egret.MovieClipDataFactory(c, p),
                _ = new egret.MovieClip(g.generateMovieClipData(h));
                d.getEFFECT_LAYER().addChild(_);
                var y = d.rotation;
                0 != y && (d.getFISH_LAYER().rotation = y),
                d.rotation = 0,
                _.frameRate = 10,
                a == OneKillManyType.BOMB && (_.frameRate = 7),
                _.scaleX = _.scaleY = 4,
                _.gotoAndPlay("play", 1);
                var m = _.movieClipData,
                f = 0,
                v = new egret.Rectangle(m.frames[f].x, m.frames[f].y, 0, 0);
                _.anchorOffsetX = _.width / 2 + v.x,
                _.anchorOffsetY = _.height / 2 + v.y;
                var T = 0;
                _.addEventListener(egret.Event.COMPLETE,
                function(i) {
                    0 == T && l.lockedAllFish(view, userId, u, n, fishList, a, r, s),
                    d.getEFFECT_LAYER().removeChild(_),
                    _.stop()
                },
                this)
            } 
        } else {
            var E = RoomUtil.getFishById(fishList, fishUid),
            h = this.getEffectByType(a),
            c = RES.getRes(h + "_json"),
            p = RES.getRes(h + "_png"),
            g = new egret.MovieClipDataFactory(c, p),
            I = new egret.MovieClip(g.generateMovieClipData(h));

            if(E == null){
                egret.log('找不到鱼 fishUid=',fishUid);
                egret.log(fishList);
                return;
            }

            E.getEFFECT_LAYER().addChild(I);
            var y = E.rotation;
            0 != y && (E.getFISH_LAYER().rotation = y),
            E.rotation = 0,
            I.frameRate = 10,
            a == OneKillManyType.BOMB && (I.frameRate = 7),
            I.scaleX = I.scaleY = 4,
            I.gotoAndPlay("play", 1);
            var m = I.movieClipData,
            f = 0,
            v = new egret.Rectangle(m.frames[f].x, m.frames[f].y, 0, 0);
            I.anchorOffsetX = I.width / 2 + v.x,
            I.anchorOffsetY = I.height / 2 + v.y;
            for (var b = 0; b < n.length; b++) {
                var C = RoomUtil.getActionByUid(fishList, n[b].fishId);
                null != C && C.pause()
            }
            var x = Director.getModelByKey(RoomModel).getRoomerById(userId),
            w = view.getRoomUI().getGunPointByPos(x.getRoomPos(), r),
            R = new egret.Point(w.x, w.y);
            setTimeout(function() {
                RoomUtil.fishDeadHandler(fishList, E.getUniqId(), userId, R, null, s, view);
                for (var i = 0; i < n.length; i++) {
                    var a = RoomUtil.getActionByUid(fishList, n[i].fishId);
                    if (null != a) RoomUtil.fishDeadHandler(fishList, n[i].fishId, userId, R, n[i].items, s, view);
                    else {
                        var r = RoomUtil.getFishById(fishList, n[i].fishId);
                        null != r && RoomUtil.fishDeadHandler(fishList, n[i].fishId, userId, R, n[i].items, s, view)
                    }
                }
            }, 750);
            E.getEFFECT_LAYER().removeChild(I),
            I.stop();
        }
    }
    public static lockedAllFish = function(e, t, i, n, a, o, r, s) {
        for (var l = i.getActor().getUniqId(), u = 0; u < n.length; u++) {
            var d = RoomUtil.getActionByUid(a, n[u].fishId);
            null != d && (d.pause(), o != OneKillManyType.BOMB && this.addLineEffect(i, d, o, r))
        }
        if (o == OneKillManyType.ELECTRIC) {
            var h = RES.getRes("electric_qiu_json"),
            c = RES.getRes("electric_qiu_png"),
            p = i.getActor(),
            g = new egret.MovieClipDataFactory(h, c),
            _ = new egret.MovieClip(g.generateMovieClipData("electric_qiu")),
            y = _.movieClipData,
            m = 0,
            f = new egret.Rectangle(y.frames[m].x, y.frames[m].y, 0, 0);
            _.anchorOffsetX = _.width / 2 + f.x,
            _.anchorOffsetY = _.height / 2 + f.y,
            p.getEFFECT_LAYER().addChild(_),
            _.gotoAndPlay("play", -1),
            _.once(egret.Event.REMOVED_FROM_STAGE,
            function(e) {
                _.stop()
            },
            this)
        }
        var v = Director.getModelByKey(RoomModel).getRoomerById(t),
        T = e.getRoomUI().getGunPointByPos(v.getRoomPos(), r),
        E = new egret.Point(T.x, T.y);
        setTimeout(function() {
            RoomUtil.fishDeadHandler(a, l, t, E, null, s, e);
            for (var i = 0; i < n.length; i++) {
                var o = RoomUtil.getActionByUid(a, n[i].fishId);
                null != o && RoomUtil.fishDeadHandler(a, n[i].fishId, t, E, n[i].items, s, e)
            }
        },
        750)
    }
    
    /**
     *  添加闪电炮的闪电线效果
     */
     public static addLightGunLineEffect = function(net:netObj, fishActor:FishBase, i, isFlip) {
        // 播放连线特效
        var r = this.getEffectByType(i);
        var h = RES.getRes(r + "_line_json"),
        c = RES.getRes(r + "_line_png"),
        p = new egret.MovieClipDataFactory(h, c),
        g = new egret.MovieClip(p.generateMovieClipData(r + "_line"));
        // g.frameRate = 24;
        g.gotoAndPlay("play", 1);

        // 把闪电线放到子弹层上 和网在一层
        if (net.parent){
            net.parent.addChild(g);
            net.parent.swapChildren(net,g)
            g.x = net.x;
            g.y = net.y;
        }
        g.anchorOffsetY = g.height / 2,
        g.anchorOffsetX = 0;

        // 计算连线的角度和长度
        var y = new egret.Point(net.x,net.y),
        m = fishActor.localToGlobal(),
        f = FishUtil.getAngle(y.x, y.y, m.x, m.y);
        isFlip ? g.rotation = f + 90 : g.rotation = f - 90;
        var v = Math.abs(y.x - m.x),
        T = Math.abs(y.y - m.y),
        E = Math.sqrt(Math.pow(v, 2) + Math.pow(T, 2));
        g.scaleX = E / g.width,
        g.scaleY = 2,
        g.once(egret.Event.COMPLETE,
        function(e) {
            if (g.parent){
                g.parent.removeChild(g);
            }
        },
        this)
    }

    public static addLineEffect = function(e, t, i, n) {
        var a = t.getActor(),
        o = e.getActor(),
        r = this.getEffectByType(i),
        s = RES.getRes(r + "_json"),
        l = RES.getRes(r + "_png"),
        u = new egret.MovieClipDataFactory(s, l),
        d = new egret.MovieClip(u.generateMovieClipData(r));
        a.getEFFECT_LAYER().addChild(d),
        i == OneKillManyType.ELECTRIC && (d.anchorOffsetX = d.width / 2, d.anchorOffsetY = d.height / 2),
        d.gotoAndPlay("play", -1),
        d.once(egret.Event.REMOVED_FROM_STAGE,
        function(e) {
            d.stop()
        },
        this);
        var h = RES.getRes(r + "_line_json"),
        c = RES.getRes(r + "_line_png"),
        p = new egret.MovieClipDataFactory(h, c),
        g = new egret.MovieClip(p.generateMovieClipData(r + "_line"));
        g.gotoAndPlay("play", -1);
        var _ = o.rotation;
        0 != _ && (o.getFISH_LAYER().rotation = _),
        o.rotation = 0,
        o.getEFFECT_LAYER().addChild(g),
        g.anchorOffsetY = g.height / 2,
        g.anchorOffsetX = 0;
        var y = o.localToGlobal(),
        m = a.localToGlobal(),
        f = FishUtil.getAngle(y.x, y.y, m.x, m.y);
        n ? g.rotation = f + 90 : g.rotation = f - 90;
        var v = Math.abs(y.x - m.x),
        T = Math.abs(y.y - m.y),
        E = Math.sqrt(Math.pow(v, 2) + Math.pow(T, 2));
        g.scaleX = E / g.width,
        g.scaleY = 1.3,
        g.once(egret.Event.REMOVED_FROM_STAGE,
        function(e) {
            g.stop()
        },
        this)
    }
    public static getEffectByType = function(e) {
        switch (e) {
        case OneKillManyType.ELECTRIC:
            return "electric";
        case OneKillManyType.BOMB:
            return "bomb";
        case OneKillManyType.BLACKHOLE:
            return "heidong";
        case OneKillManyType.CATCH_WHOLE:
            return "electric";
        default:
            return "electric"
        }
    }
    private static heidongFish(view, userId, fishUid, n, a, fishList, r, s){
        view.playHeidong();

        var E = RoomUtil.getFishById(fishList, fishUid);
        if(E == null){
            egret.log('---heidongFish---', fishUid);
            // egret.log(n);
            // egret.log(fishList);
            return;
        }

        for (var b = 0; b < n.length; b++) {
            var C = RoomUtil.getActionByUid(fishList, n[b].fishId);
            null != C && C.pause()
        }
        var x = Director.getModelByKey(RoomModel).getRoomerById(userId),
        w = view.getRoomUI().getGunPointByPos(x.getRoomPos(), r),
        R = new egret.Point(w.x, w.y);
        setTimeout(function() {
            RoomUtil.fishDeadHandlerHeidong(fishList, E.getUniqId(), userId, R, null, s, view);
            for (var i = 0; i < n.length; i++) {
                var a = RoomUtil.getActionByUid(fishList, n[i].fishId);
                if (null != a) RoomUtil.fishDeadHandlerHeidong(fishList, n[i].fishId, userId, R, n[i].items, s, view);
                else {
                    var r = RoomUtil.getFishById(fishList, n[i].fishId);
                    null != r && RoomUtil.fishDeadHandlerHeidong(fishList, n[i].fishId, userId, R, n[i].items, s, view)
                }
            }
        }, 2200);
    }
}