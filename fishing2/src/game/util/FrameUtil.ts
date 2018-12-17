
class FrameUtil {
    static playCaipan(view, roomer:Roomer, coinNum = 0, o = "-1", r = false) {
        var pos = roomer.getRoomPos(),
        l = view.getRoomUI().getGunPointByPos(pos, view.getIsFlip()),
        u = new egret.Point(l.x, l.y);
        u.x += CONFIG.adaptX,
        u.y += CONFIG.adaptY;
        var d = u.y;
        d = d > 360 ? 470 + CONFIG.adaptY: 250 + CONFIG.adaptY;
        var bulletLayer = view.getBulletLayer(),
        c = bulletLayer.getChildByName("caipan" + pos);
        c && bulletLayer.removeChild(c);
        var p = bulletLayer.getChildByName("caipanNum" + pos);
        p && bulletLayer.removeChild(p);
        var g = bulletLayer.getChildByName("movie" + pos);
        g && bulletLayer.removeChild(g);
        var _ = bulletLayer.getChildByName("caipanGuang" + pos);
        _ && bulletLayer.removeChild(_);
        var y = RES.getRes("ef_caipanBg_json"),
        m = RES.getRes("ef_caipanBg_png"),
        f = new egret.MovieClipDataFactory(y, m),
        fishMc = new MovieFish(f.generateMovieClipData("ef_caipanBg"), egret.Event.COMPLETE);
        fishMc.initEvent();
        var T = fishMc.movieClipData,
        E = 0,
        I = new egret.Rectangle(T.frames[E].x, T.frames[E].y, 0, 0);
        fishMc.frameRate = 14,
        fishMc.x = u.x,
        fishMc.y = d,
        fishMc.scaleX = 1.2,
        fishMc.scaleY = 1.2,
        fishMc.anchorOffsetX = fishMc.width / 2 + I.x,
        fishMc.anchorOffsetY = fishMc.height / 2 + I.y,
        fishMc.name = "movie" + pos,
        fishMc.visible = !1,
        bulletLayer.addChild(fishMc);
        var b = null;
        b = new egret.Bitmap(RES.getRes("ef_rotation_bg2_png")),
        b.name = "caipanGuang" + pos,
        b.anchorOffsetX = b.width >> 1,
        b.anchorOffsetY = b.height >> 1,
        b.x = u.x,
        b.y = d,
        b.visible = !1,
        bulletLayer.addChildAt(b, 1);
        var C = 400;
        if ("-1" == o) {
            var x = new egret.BitmapText;
            Director.getModelByKey(UserModel),
            Director.getModelByKey(RoomModel);
            roomer.getRoomPos() == pos ? (x.font = RES.getRes("bitmapNum_2_fnt"), SoundManager.playEffectSound("CoinLightMove"), SoundManager.playEffectSound("ubomb")) : (x.font = RES.getRes("bitmapNum_1_fnt"), SoundManager.playEffectSound("CoinLightMove_o"));
            var w = T_Config_Table.getVoByKey(30).value; //10
            r || (coinNum /= .01 * (100 - parseInt(w)));
            coinNum = Math.floor(coinNum);
            x.text = "" + coinNum;
            bulletLayer.addChildAt(x, 5);
            x.anchorOffsetX = x.width / 2,
            x.anchorOffsetY = x.height / 2,
            x.x = u.x,
            x.y = d + 4,
            x.name = "caipanNum" + pos,
            x.scaleX = .01,
            x.scaleY = .01,
            egret.Tween.get(x).to({
                scaleX: 1.75,
                scaleY: 1.75
            },
            300).to({
                scaleX: .2,
                scaleY: .2
            },
            200).to({
                scaleX: 1.2,
                scaleY: 1.2
            },
            200).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).call(function() {
                egret.Tween.removeTweens(x)
            })
        } else {
            var R = "warHead_" + o + "_png",
            A = new egret.Bitmap(RES.getRes(R));
            bulletLayer.addChildAt(A, 5),
            A.anchorOffsetX = A.width / 2,
            A.anchorOffsetY = A.height / 2,
            A.x = u.x,
            A.y = d - 14,
            A.name = "caipanNum" + pos,
            A.scaleX = .01,
            A.scaleY = .01,
            egret.Tween.get(A).to({
                scaleX: 1.75,
                scaleY: 1.75
            },
            300).to({
                scaleX: .2,
                scaleY: .2
            },
            200).to({
                scaleX: 1,
                scaleY: 1
            },
            200).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).call(function() {
                egret.Tween.removeTweens(A)
            })
        }
        var L = null,
        M = roomer.getCurSkinId(),
        S = T_Gun_skin_Table.getVoByKey(M),
        P = S.caipanUrl;
        RES.getResAsync(P,
        function() {
            var e = RES.getRes(P),
            t = new egret.Bitmap(e);
            t && (L = t, L.name = "caipan" + pos, L.anchorOffsetX = L.width >> 1, L.anchorOffsetY = L.height >> 1, L.x = u.x, L.y = d, bulletLayer.addChildAt(L, 2), L.scaleX = .01, L.scaleY = .01, egret.Tween.get(L).to({
                scaleX: 1.75,
                scaleY: 1.75
            },
            200).to({
                scaleX: .2,
                scaleY: .2
            },
            200).call(function() {
                fishMc.visible = !0,
                fishMc.gotoAndPlay("play", 1)
            }).to({
                scaleX: 1,
                scaleY: 1
            },
            100).call(function() {
                b.visible = !0,
                TweenTools.rotationFan(b, 3e3)
            }).to({
                rotation: 360
            },
            900).to({
                rotation: 720
            },
            900).to({
                rotation: 1080
            },
            900).to({
                rotation: 1440
            },
            900).wait(10).call(function() {
                var e = bulletLayer.getChildByName("caipan" + pos);
                e && bulletLayer.removeChild(e);
                var t = bulletLayer.getChildByName("caipanNum" + pos);
                t && bulletLayer.removeChild(t);
                var i = bulletLayer.getChildByName("caipanGuang" + pos);
                i && bulletLayer.removeChild(i),
                egret.Tween.removeTweens(L)
            }))
        },
        this)
    }
    
    static playHuluEffect(t, i, n, a, o, r, s, l, u, d) {
        var h = d,
        c = RoomUtil.getGunPointByPos(t, d.getIsFlip());
        d.getIsFlip() && (l = CONFIG.contentWidth - l, u = CONFIG.contentHeight - u);
        var p = c.x;
        c.y;
        p < CONFIG.contentWidth / 2 ? p -= 200 : p += 200;
        var g = !1;
        c.y < CONFIG.contentHeight / 2 && (g = !0);
        var _ = new egret.Point(l, u),
        y = new egret.Bitmap(RES.getRes("ef_hulu_png"));
        y.y = g ? 0 : 720,
        y.x = p,
        y.name = "hulu",
        y.anchorOffsetX = y.width / 2,
        y.anchorOffsetY = y.height / 2,
        h.getBulletLayer().addChild(y),
        egret.Tween.get(y).to({
            rotation: 270,
            y: g ? 820 : -100
        },
        1e3).to({
            scale: 1.5,
            rotation: 540,
            y: _.y,
            x: _.x
        },
        400).call(function() {
            if (null != y) {
                y.visible = !1,
                egret.Tween.removeTweens(y),
                h.getBulletLayer().removeChild(y),
                y = null;
                var t = RES.getRes("ef_hulu_bomb_json"),
                l = RES.getRes("ef_hulu_bomb_png"),
                u = new egret.MovieClipDataFactory(t, l),
                d = new MovieFish(u.generateMovieClipData("ef_hulu_bomb"), egret.Event.COMPLETE);
                d.initEvent(),
                d.scaleX = 2.2,
                d.scaleY = 2.2,
                d.frameRate = 9,
                d.gotoAndPlay("play", 1),
                d.x = _.x,
                d.y = _.y,
                h.getBulletLayer().addChild(d),
                SoundManager.playEffectSound("godlamp_end"),
                setTimeout(function() {
                    i > 0 && n > 0 && a > 0 && h.addUnitFish(AddFishType.FISH, [i], n, a, new egret.Point(r, s), 0, o)
                },
                500)
            }
        })
    }

    /** 枪特效 */
    static getEfGunPos() {
        //ef_gunPos
        var e = RES.getRes("ef_gunPos_json"),
        t = RES.getRes("ef_gunPos_png"),
        i = new egret.MovieClipDataFactory(e, t),
        n = new egret.MovieClip(i.generateMovieClipData("ef_gunPos"));
        return n.gotoAndPlay("play", -1),
        n.frameRate = 12,
        n
    }
    static getEfRacerGunPos() {
        var e = RES.getRes("ef_gunPos_json"),
        t = RES.getRes("ef_gunPos_png"),
        i = new egret.MovieClipDataFactory(e, t),
        n = new egret.MovieClip(i.generateMovieClipData("ef_gunPos"));
        return n.gotoAndPlay("play", -1),
        n.frameRate = 12,
        n
    }
    static getEfGunRagePos() {
        var e = RES.getRes("ef_gunPosRage_json"),
        t = RES.getRes("ef_gunPosRage_png"),
        i = new egret.MovieClipDataFactory(e, t),
        n = new egret.MovieClip(i.generateMovieClipData("ef_gunPosRage"));
        return n.gotoAndPlay("play", -1),
        n.frameRate = 12,
        n
    }

    static playAddCoinsEff(num:number, pt:egret.Point, root, userId) {
        var a = root ? root: egret.MainContext.instance.stage;
        var sp:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        var tex = null;
        var addBmp:egret.Bitmap = null;
        var btxt:egret.BitmapText = new egret.BitmapText();
        var userModel:UserModel = Director.getModelByKey(UserModel);
        if (userId == userModel.getUserId()) {
            btxt.font = RES.getRes("bitmapNum_2_fnt");
            tex = RES.getRes("bitmap2Add_png");
            addBmp = new egret.Bitmap(tex);
        } else {
            btxt.font = RES.getRes("bitmapNum_1_fnt");
            tex = RES.getRes("bitmap1Add_png");
            addBmp = new egret.Bitmap(tex);
        }
        addBmp.anchorOffsetY = addBmp.height >> 1;
        sp.addChild(addBmp);
        btxt.text = "" + num;
        sp.addChild(btxt);
        btxt.anchorOffsetX = 0;
        btxt.anchorOffsetY = btxt.height >> 1;
        btxt.x = addBmp.width;
        sp.x = pt.x;
        sp.y = pt.y;
        sp.anchorOffsetX = sp.width >> 1,
        sp.anchorOffsetY = sp.height >> 1,
        sp.cacheAsBitmap = !0,
        a.addChild(sp),
        sp.scaleX = .01,
        sp.scaleY = .01,
        egret.Tween.get(sp).to({
            scaleX: 1.4,
            scaleY: 1.4
        },
        30).to({
            scaleX: 1.32,
            scaleY: 1.32
        },
        60).to({
            scaleX: .96,
            scaleY: .96
        },
        180).to({
            scaleX: .8,
            scaleY: .8
        },
        60).to({
            scaleX: .96,
            scaleY: .96
        },
        200).to({
            scaleX: .8,
            scaleY: .8
        },
        200).to({
            alpha: 0
        },
        800).call(function() {
            egret.Tween.removeTweens(sp),
            a.removeChild(sp)
        })
    }

    static playAddCoinsOnLab(e, t, i) {
        var n;
        n = i ? i: egret.MainContext.instance.stage;
        var a = new egret.DisplayObjectContainer,
        o = null,
        r = null,
        s = new egret.BitmapText;
        Director.getModelByKey(UserModel);
        s.font = RES.getRes("bitmapNum_2_fnt"),
        o = RES.getRes("bitmap2Add_png"),
        r = new egret.Bitmap(o),
        r.anchorOffsetY = r.height >> 1,
        a.addChild(r),
        s.text = "" + e,
        a.addChild(s),
        s.anchorOffsetX = 0,
        s.anchorOffsetY = s.height >> 1,
        s.x = r.width,
        a.scaleX = .5,
        a.scaleY = .5,
        a.x = t.x + CONFIG.adaptX,
        a.y = t.y + CONFIG.adaptY,
        a.anchorOffsetX = a.width >> 1,
        a.anchorOffsetY = a.height >> 1,
        a.cacheAsBitmap = !0,
        n.addChild(a),
        a.scaleX = 0,
        a.scaleY = 0,
        egret.Tween.get(a).to({
            scaleX: .7,
            scaleY: .7
        },
        600, egret.Ease.quadIn).to({
            scaleX: .5,
            scaleY: .5
        },
        200, egret.Ease.quadInOut).call(function() {
            egret.Tween.removeTweens(a),
            n.removeChild(a)
        })
    }

    static playCaipanTest(i, n, a, o, r) {
        void 0 === a && (a = 0),
        void 0 === o && (o = "-1"),
        void 0 === r && (r = !1);
        var s = n.getRoomPos(),
        l = i.getRoomUI().getGunPointByPos(s, i.getIsFlip()),
        u = new egret.Point(l.x, l.y);
        u.x += CONFIG.adaptX,
        u.y += CONFIG.adaptY;
        var d = u.y;
        d = d > 360 ? 470 + CONFIG.adaptY: 250 + CONFIG.adaptY;
        var h = i.getBulletLayer(),
        c = h.getChildByName("caipan" + s);
        c && h.removeChild(c);
        var p = h.getChildByName("caipanNum" + s);
        p && h.removeChild(p);
        var g = h.getChildByName("movie" + s);
        g && h.removeChild(g);
        var _ = h.getChildByName("caipanGuang" + s);
        _ && h.removeChild(_);
        var y = RES.getRes("ef_caipanBg_json"),
        m = RES.getRes("ef_caipanBg_png"),
        f = new egret.MovieClipDataFactory(y, m),
        v = new MovieFish(f.generateMovieClipData("ef_caipanBg"), egret.Event.COMPLETE);
        v.initEvent();
        var T = v.movieClipData,
        E = 0,
        I = new egret.Rectangle(T.frames[E].x, T.frames[E].y, 0, 0);
        v.frameRate = 14,
        v.x = u.x,
        v.y = d,
        v.scaleX = 1.2,
        v.scaleY = 1.2,
        v.anchorOffsetX = v.width / 2 + I.x,
        v.anchorOffsetY = v.height / 2 + I.y,
        v.name = "movie" + s,
        v.visible = !1,
        h.addChild(v);
        var b = null;
        b = new egret.Bitmap(RES.getRes("ef_rotation_bg2_png")),
        b.name = "caipanGuang" + s,
        b.anchorOffsetX = b.width >> 1,
        b.anchorOffsetY = b.height >> 1,
        b.x = u.x,
        b.y = d,
        b.visible = !1,
        h.addChildAt(b, 1);
        var C = 400;
        if ("-1" == o) {
            var x = new egret.BitmapText,
            w = Director.getModelByKey(UserModel),
            R = Director.getModelByKey(RoomModel),
            A = R.getRoomerById(w.getUserId());
            A.getRoomPos() == s ? (x.font = RES.getRes("bitmapNum_2_fnt"), SoundManager.playEffectSound("CoinLightMove"), SoundManager.playEffectSound("ubomb")) : (x.font = RES.getRes("bitmapNum_1_fnt"), SoundManager.playEffectSound("CoinLightMove_o"));
            var L = T_Config_Table.getVoByKey(30).value;
            r || (a /= .01 * (100 - parseInt(L))),
            a = Math.floor(a),
            x.text = "" + a,
            h.addChildAt(x, 5),
            x.anchorOffsetX = x.width / 2,
            x.anchorOffsetY = x.height / 2,
            x.x = u.x,
            x.y = d + 4,
            x.name = "caipanNum" + s,
            x.scaleX = .01,
            x.scaleY = .01,
            egret.Tween.get(x).to({
                scaleX: 1.75,
                scaleY: 1.75
            },
            300).to({
                scaleX: .2,
                scaleY: .2
            },
            200).to({
                scaleX: 1.2,
                scaleY: 1.2
            },
            200).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).to({
                rotation: 20
            },
            C).to({
                rotation: -20
            },
            C).call(function() {
                egret.Tween.removeTweens(x)
            })
        }
        var M = null,
        S = n.getCurSkinId(),
        P = T_Gun_skin_Table.getVoByKey(S),
        B = P.caipanUrl;
        RES.getResAsync(B,
        function() {
            var e = RES.getRes(B),
            t = new egret.Bitmap(e);
            t && (M = t, M.name = "caipan" + s, M.anchorOffsetX = M.width >> 1, M.anchorOffsetY = M.height >> 1, M.x = u.x, M.y = d, h.addChildAt(M, 2), M.scaleX = .01, M.scaleY = .01, egret.Tween.get(M).to({
                scaleX: 1.75,
                scaleY: 1.75
            },
            200).to({
                scaleX: .2,
                scaleY: .2
            },
            200).call(function() {
                v.visible = !0,
                v.gotoAndPlay("play", 1)
            }).to({
                scaleX: 1,
                scaleY: 1
            },
            100).call(function() {
                b.visible = !0,
                TweenTools.rotationFan(b, 3e3)
            }).to({
                rotation: 360
            },
            900).to({
                rotation: 720
            },
            900).to({
                rotation: 1080
            },
            900).to({
                rotation: 1440
            },
            900).wait(10).call(function() {
                var e = h.getChildByName("caipan" + s);
                e && h.removeChild(e);
                var t = h.getChildByName("caipanNum" + s);
                t && h.removeChild(t);
                var i = h.getChildByName("caipanGuang" + s);
                i && h.removeChild(i),
                egret.Tween.removeTweens(M)
            }))
        },
        this)
    }

    // 播放激光头效果
    static playRacerHeadEffect(baseLayer){

        var dizuo = new egret.MovieClipDataFactory(RES.getRes("jiguang_dizuo_json"),RES.getRes("jiguang_dizuo_png")),
        mcD = new MovieFish(dizuo.generateMovieClipData("jiguang_dizuo"), egret.Event.COMPLETE,
            function() {
                if (mcD.parent){
                    mcD.parent.removeChild(mcD);
                }
            });
        mcD.initEvent();
        mcD.gotoAndPlay("play", 1);
        var mD = mcD.movieClipData;
        mcD.anchorOffsetX = mcD.width / 2 + mD.frames[0].x;
        mcD.anchorOffsetY = mcD.height/2  + mD.frames[0].y;
        mcD.frameRate = 12,
        mcD.scaleX = 2;
        mcD.scaleY = 2;
        baseLayer.addChild(mcD);
    }
}