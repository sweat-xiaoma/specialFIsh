class BulletLayer extends egret.DisplayObjectContainer {
	private _bInitBoss;
    private _bInitFrozen;
    private _frozenBg;
    private _frozenMove;
    private _isFlip;
    private _callback;
    private _movie;
    private _bossComing;
    private _nBossComID;

	public constructor() {
		super();

		this._bInitBoss = false,
        this._bInitFrozen = false;
	}

	public playFrozenEffect() {
        null != this._frozenBg && (egret.Tween.removeTweens(this._frozenBg), this.removeChild(this._frozenBg)),
        this._frozenBg = new egret.Bitmap(RES.getRes("frozen_mask_png")),
        this._frozenBg.touchEnabled = false,
        this._frozenBg.width = CONFIG.contentWidth,
        this._frozenBg.height = CONFIG.contentHeight,
        this._frozenBg.anchorOffsetX = this._frozenBg.width >> 1,
        this._frozenBg.anchorOffsetY = this._frozenBg.height >> 1,
        this._frozenBg.x = CONFIG.contentWidth / 2 + CONFIG.adaptX,
        this._frozenBg.y = CONFIG.contentHeight / 2 + CONFIG.adaptY,
        this._frozenBg.alpha = 0,
        this.addChild(this._frozenBg);
        var e = egret.Tween.get(this._frozenBg);
        e.wait(300).to({
            alpha: .8
        },
        1e3)
    }
    public clearFrozenEffect() {
        if (this._frozenBg) {
            var e = this,
            t = egret.Tween.get(this._frozenBg);
            t.to({
                alpha: 0
            },
            500).call(function() {
                egret.Tween.removeTweens(e._frozenBg),
                e.removeChild(e._frozenBg),
                e._frozenBg = null
            })
        }
    }
    // 显示冰冻提示
    public showFrozen() {
        this._bInitFrozen || (this._bInitFrozen = !0, this._frozenMove && this.onFrozenAninmComplete(), EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/FrozenAnim.exml", this.onFrozenAnimLoaded, this))
    }
    public onFrozenAnimLoaded() {
        var e = this;
        this._frozenMove = new FrozenAnimUI,
        this._frozenMove.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/FrozenAnim.exml",
        this.addChildAt(this._frozenMove, 1);
        var t = egret.Tween.get(this._frozenMove.Zi, {
            loop: !1
        });
        this._frozenMove.Zi.x = 640,
        this._frozenMove.Zi.y = 360,
        this._frozenMove.Zi.alpha = 0,
        this._frozenMove.Zi.scaleX = 2.5,
        this._frozenMove.Zi.scaleY = 2.5,
        t.to({
            scaleX: 1,
            scaleY: 1,
            alpha: 1
        },
        250, egret.Ease.backOut).to({
            scaleX: 1.2,
            scaleY: 1.2
        },
        100, egret.Ease.backOut).to({
            scaleX: 1,
            scaleY: 1
        },
        100, egret.Ease.backOut).wait(300).to({
            alpha: 0,
            y: 188
        },
        500, egret.Ease.backOut).call(function() {
            e.onFrozenAninmComplete()
        });
        var i = egret.Tween.get(this._frozenMove.XuLie_1, {
            loop: !1
        });
        this._frozenMove.XuLie_1.alpha = 0,
        i.wait(250).to({
            x: 640,
            y: 373.3,
            alpha: 1
        },
        0, egret.Ease.backOut).wait(50).to({
            scaleX: 1.1,
            scaleY: 1.1,
            alpha: 1
        },
        0, egret.Ease.backOut);
        var n = egret.Tween.get(this._frozenMove.XuLie_2, {
            loop: !1
        });
        this._frozenMove.XuLie_2.alpha = 0,
        n.wait(300).to({
            x: 630.05,
            y: 371.49,
            alpha: 1,
            scaleX: 1,
            scaleY: 1
        },
        0, egret.Ease.backOut).wait(50).to({
            scaleX: 1,
            scaleY: 1,
            alpha: 0
        },
        0, egret.Ease.backOut);
        var a = egret.Tween.get(this._frozenMove.XuLie_3, {
            loop: !1
        });
        this._frozenMove.XuLie_3.alpha = 0,
        a.wait(350).to({
            x: 636,
            y: 368.83,
            alpha: 1
        },
        350, egret.Ease.backOut).wait(50).to({
            alpha: 0
        },
        0, egret.Ease.backOut);
        var o = egret.Tween.get(this._frozenMove.XuLie_4, {
            loop: !1
        });
        this._frozenMove.XuLie_4.alpha = 0,
        o.wait(400).to({
            x: 639.14,
            y: 361.95,
            alpha: 0
        },
        350, egret.Ease.backOut).wait(50).to({
            alpha: 1
        },
        0, egret.Ease.backOut).wait(50).to({
            alpha: 0
        },
        0, egret.Ease.backOut);
        var r = egret.Tween.get(this._frozenMove.BaoGuang, {
            loop: !1
        });
        this._frozenMove.BaoGuang.alpha = 0,
        this._frozenMove.BaoGuang.x = 636,
        this._frozenMove.BaoGuang.y = 363.51,
        r.wait(250).to({
            alpha: 1
        },
        0, egret.Ease.backOut).to({
            x: 639.14,
            y: 361.95,
            alpha: 0
        },
        0, egret.Ease.backOut).wait(50).to({
            x: 636,
            y: 363.51,
            alpha: 1,
            scaleX: 1.3,
            scaleY: 1.3
        },
        0, egret.Ease.backOut).to({
            alpha: 0
        },
        250, egret.Ease.backOut);
        var s = egret.Tween.get(this._frozenMove.GuangTiao, {
            loop: !1
        });
        this._frozenMove.GuangTiao.alpha = 0,
        s.wait(250).to({
            alpha: 1,
            x: 192.69,
            y: 363.33,
            width: 1064
        },
        0, egret.Ease.backOut).to({
            x: -313.94,
            y: 216.7,
            alpha: 0,
            width: 2064,
            height: 330
        },
        450, egret.Ease.backOut),
        this._bInitFrozen = !1,
        this._frozenMove.touchEnabled = !1,
        this._frozenMove.Zi.touchEnabled = !1,
        this._frozenMove.GuangTiao.touchEnabled = !1,
        this._frozenMove.XuLie_1.touchEnabled = !1,
        this._frozenMove.XuLie_2.touchEnabled = !1,
        this._frozenMove.XuLie_3.touchEnabled = !1,
        this._frozenMove.XuLie_4.touchEnabled = !1,
        this._frozenMove.Zi.touchEnabled = !1,
        this._frozenMove.BaoGuang.touchEnabled = !1
    }
    public onFrozenAninmComplete() {
        egret.Tween.removeTweens(this._frozenMove.XuLie_1),
        egret.Tween.removeTweens(this._frozenMove.GuangTiao),
        egret.Tween.removeTweens(this._frozenMove.BaoGuang),
        egret.Tween.removeTweens(this._frozenMove.XuLie_4),
        egret.Tween.removeTweens(this._frozenMove.XuLie_3),
        egret.Tween.removeTweens(this._frozenMove.XuLie_2),
        egret.Tween.removeTweens(this._frozenMove.Zi),
        this._frozenMove.parent && this._frozenMove.parent.removeChild(this._frozenMove),
        this._frozenMove = null,
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/FrozenAnim.exml")
    }
    public showWave(e, t) {
        var i = this.getChildByName("blackBg");
        i && this.removeChild(i),
        this._isFlip = t,
        this._callback = e,
        SoundManager.playEffectSound("changefishzhen");
        var n = new egret.Shape;
        n.graphics.beginFill(0, .5),
        n.graphics.drawRect(0, 0, CONFIG.contentWidth, CONFIG.contentHeight),
        n.graphics.endFill(),
        n.name = "blackBg",
        this.addChildAt(n, 1),
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/WaveComing.exml", this.onWaveComingLoaded, this)
    }
    public onWaveComingLoaded() {
        var e = this;
        this._movie = new WaveComingAnimUI,
        this._movie.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/WaveComing.exml",
        this.addChildAt(this._movie, 2);
        // var t = egret.Tween.get(this._movie.image, {
        //     loop: !1
        // });
        // this._movie.image.x = 430,
        // this._movie.image.y = 226.33,
        // this._movie.image.width = 855,
        // this._movie.image.height = 34,
        // this._movie.image.scaleX = -1,
        // this._movie.image.scaleY = 1,
        // this._movie.image.alpha = .75,
        // t.to({
        //     x: 1081.51
        // },
        // 550, egret.Ease.backOut).wait(1500).to({
        //     alpha: 0
        // },
        // 1100, egret.Ease.backOut);
        // var i = egret.Tween.get(this._movie.image0, {
        //     loop: !1
        // });
        // this._movie.image0.x = 800,
        // this._movie.image0.y = 392.33,
        // this._movie.image0.width = 855,
        // this._movie.image0.height = 34,
        // this._movie.image0.alpha = .75,
        // i.to({
        //     x: 209.1
        // },
        // 550, egret.Ease.backOut).wait(1500).to({
        //     alpha: 0
        // },
        // 1100, egret.Ease.backOut);
        var n = egret.Tween.get(this._movie.image1, {
            loop: !1
        });
        this._movie.image1.x = -1280,
        this._movie.image1.y = 200,
        n.to({
            x: 0
        },
        550, egret.Ease.backOut).wait(1500).to({
            alpha: 0
        },
        1100, egret.Ease.backOut);
        var a = egret.Tween.get(this._movie.image2, {
            loop: !1
        });
        this._movie.image2.x = 1280,
        this._movie.image2.y = 200,
        a.to({
            x: 0
        },
        350, egret.Ease.backOut).to({
            alpha: 0,
            scaleX: 1.25,
            scaleY: 1.25
        },
        350, egret.Ease.backOut).wait(1820).call(function() {
            e.onTweenGroupComplete()
        })
    }
    public onTweenGroupComplete() {
        var e = this,
        t = this.getChildByName("blackBg");
        t && this.removeChild(t),
        // egret.Tween.removeTweens(this._movie.image),
        egret.Tween.removeTweens(this._movie.image2),
        egret.Tween.removeTweens(this._movie.image1),
        // egret.Tween.removeTweens(this._movie.image0),
        this._movie.parent && this._movie.parent.removeChild(this._movie),
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/WaveComing.exml"),
        RES.getResAsync("wave_json",
        function(t, i) {
            RES.getResAsync("wave_png",
            function(i, n) {
                var a = new egret.MovieClipDataFactory(t, i),
                o = new egret.MovieClip(a.generateMovieClipData("wave"));
                o.gotoAndPlay("play", -1);
                var r = -500;
                e._isFlip ? o.x = 1280 : (o.rotation = 180, o.x = 0, o.y = 720, r = 1280),
                o.scaleX = o.scaleY = 2,
                e.addChild(o);
                var s = egret.Tween.get(o, {
                    loop: !1
                });
                s.to({
                    x: r
                },
                1e3).call(function() {
                    egret.Tween.removeTweens(o),
                    e.removeChild(o)
                })
            },
            e)
        },
        this),
        this._callback()
    }
    public showNum(e) {
        var t = new egret.BitmapText;
        t.font = RES.getRes("number_fnt"),
        t.text = "" + e,
        t.x = CONFIG.contentWidth / 2 + CONFIG.adaptX,
        t.y = CONFIG.contentHeight / 2 + CONFIG.adaptY,
        t.anchorOffsetX = t.width / 2,
        t.anchorOffsetY = t.height / 2,
        t.scaleX = 3.6,
        t.scaleY = 3.6,
        this.addChild(t);
        var i = this,
        n = egret.Tween.get(t, {
            loop: !1
        });
        n.to({
            scaleX: 1.8,
            scaleY: 1.8
        },
        300).to({
            scaleX: 2.2,
            scaleY: 2.21
        },
        200).to({
            scaleX: 1.9,
            scaleY: 1.9
        },
        150).call(function() {
            egret.Tween.removeTweens(t),
            i.removeChild(t)
        })
    }

    // 子弹层 -->添加网
    public addBulletNet(n:T_Gun_skin, bulletX, bulletY, poolInstance):netObj{
        var net:netObj = poolInstance.getFishingNetById(n);
        this.addChild(net);
        net.x = bulletX;
        net.y = bulletY;

        return net;
    }

    // 显示子弹爆炸效果 
    public showBulletBomb(net:netObj, poolInstance) {
        if (net.gunType > GunType.Normal){
            // 播放特效网
            net.playMovie(1,
            function() {
                net.parent && net.parent.removeChild(net),
                net.bInPool && poolInstance.nFishingNetPool.push(net)
            })
        }
        else {
            var o = egret.Tween.get(net, {
                loop: false
            }),
            r = this;
            o.to({
                scaleX: 1.2,
                scaleY: 1.2
            },
            100).to({
                scaleX: 1,
                scaleY: 1
            },
            100).to({
                alpha: 0
            },
            150).call(function() {
                egret.Tween.removeTweens(net),
                net.alpha = 1;
                r.removeChild(net),
                
                net.bInPool && poolInstance.nFishingNetPool.push(net)
            }),
            o.play()
        }
    }
    public bossComing(e) {
        if (!this._bInitBoss) {
            this._bInitBoss = !0;
            var t = this;
            var fish:T_Fish = T_Fish_Table.getVoByKey(e);
            var bossImg = "Boss_" + fish.resRunUrl + "_png";
            var bossScoreImg = "Boss_" + fish.score + "_png";
            return 100 == e ? void EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/BossComing.exml",
            function(i, o) {
                t._bossComing = new BossComingUI(),
                t._bossComing.skinName = i,
                t._bossComing.L.visible = !0,
                t._bossComing.R.visible = !0,
                t._bossComing.N.visible = !0,
                t._nBossComID = e,
                t.anchorOffsetX = CONFIG.contentWidth >> 1,
                t.anchorOffsetY = CONFIG.contentHeight >> 1,
                t.x = egret.MainContext.instance.stage.stageWidth >> 1,
                t.y = egret.MainContext.instance.stage.stageHeight >> 1,
                t.addChild(t._bossComing),
                t._bossComing.setData(bossImg, bossScoreImg);
                var r = egret.Tween.get(t._bossComing.L, {
                    loop: !1
                });
                t._bossComing.L.x = -60.64,
                r.to({
                    x: 651.36
                },
                350, egret.Ease.backOut).wait(1400).to({
                    alpha: 0
                },
                750, egret.Ease.backOut);
                var s = egret.Tween.get(t._bossComing.heiDi, {
                    loop: !1
                });
                t._bossComing.heiDi.alpha = 0,
                s.to({
                    alpha: 1
                },
                350, egret.Ease.backOut).wait(1400).to({
                    alpha: 0
                },
                750, egret.Ease.backOut);
                var l = egret.Tween.get(t._bossComing.R, {
                    loop: !1
                });
                t._bossComing.R.x = 1186.36,
                l.to({
                    x: 651.36
                },
                350, egret.Ease.backOut).wait(1400).to({
                    alpha: 0
                },
                750, egret.Ease.backOut);
                var u = egret.Tween.get(t._bossComing.N, {
                    loop: !1
                });
                t._bossComing.N.alpha = 0,
                u.wait(350).to({
                    alpha: 1
                },
                0, egret.Ease.backOut).to({
                    alpha: 0,
                    scaleX: 1.25,
                    scaleY: 1.25
                },
                350, egret.Ease.backOut).wait(1050).to({
                    alpha: 0
                },
                750, egret.Ease.backOut);
                var d = egret.Tween.get(t._bossComing.Danger_2, {
                    loop: !1
                });
                t._bossComing.Danger_2.x = 896.2,
                d.to({
                    x: 21.51
                },
                350, egret.Ease.backOut).wait(1400).to({
                    alpha: 0
                },
                750, egret.Ease.backOut);
                var h = egret.Tween.get(t._bossComing.Danger_1, {
                    loop: !1
                });
                t._bossComing.Danger_1.x = -603.8,
                h.to({
                    x: 18.89,
                    y: 222.33
                },
                350, egret.Ease.backOut).wait(1400).to({
                    alpha: 0
                },
                750, egret.Ease.backOut);
                var c = egret.Tween.get(t._bossComing.bg, {
                    loop: !1
                });
                t._bossComing.bg.alpha = 0,
                c.to({
                    alpha: .75
                },
                0, egret.Ease.backOut).wait(2550).call(function() {
                    egret.Tween.removeTweens(t._bossComing.bg),
                    egret.Tween.removeTweens(t._bossComing.L),
                    egret.Tween.removeTweens(t._bossComing.Danger_1),
                    egret.Tween.removeTweens(t._bossComing.Danger_2),
                    egret.Tween.removeTweens(t._bossComing.N),
                    egret.Tween.removeTweens(t._bossComing.Zi_2),
                    egret.Tween.removeTweens(t._bossComing.heiDi),
                    t._bossComing && t.removeChild(t._bossComing),
                    t._bossComing = null,
                    RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/BossComing.exml"),
                    t._bInitBoss = !1
                })
            },
            this) : void EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/BossComing.exml",
            function(i, o) {
                return RES.hasRes(bossImg) ? void RES.getResAsync(bossImg,
                function() {
                    return RES.hasRes(bossScoreImg) ? void RES.getResAsync(bossScoreImg,
                    function() {
                        t._bossComing = new BossComingUI,
                        t._bossComing.skinName = i,
                        t._bossComing.Zi_1.visible = !0,
                        t._bossComing.Zi_2.visible = !0,
                        t._bossComing.Zi_3.visible = !0,
                        t._nBossComID = e,
                        t.anchorOffsetX = CONFIG.contentWidth >> 1,
                        t.anchorOffsetY = CONFIG.contentHeight >> 1,
                        t.x = egret.MainContext.instance.stage.stageWidth >> 1,
                        t.y = egret.MainContext.instance.stage.stageHeight >> 1,
                        t.addChild(t._bossComing),
                        t._bossComing.setData(bossImg, bossScoreImg);
                        var o = egret.Tween.get(t._bossComing.Danger_2, {
                            loop: !1
                        });
                        t._bossComing.Danger_2.x = 896.2,
                        o.to({
                            x: 21.51
                        },
                        350, egret.Ease.backOut).wait(1400).to({
                            alpha: 0
                        },
                        750, egret.Ease.backOut);
                        var r = egret.Tween.get(t._bossComing.Danger_1, {
                            loop: !1
                        });
                        t._bossComing.Danger_1.x = -603.8,
                        r.to({
                            x: 18.89,
                            y: 222.33
                        },
                        350, egret.Ease.backOut).wait(1400).to({
                            alpha: 0
                        },
                        750, egret.Ease.backOut);
                        var s = egret.Tween.get(t._bossComing.Zi_1, {
                            loop: !1
                        });
                        t._bossComing.Zi_1.x = -141,
                        s.to({
                            x: 530
                        },
                        350, egret.Ease.backOut).wait(1400).to({
                            alpha: 0
                        },
                        750, egret.Ease.backOut);
                        var l = egret.Tween.get(t._bossComing.Zi_2, {
                            loop: !1
                        });
                        t._bossComing.Zi_2.x = 1139,
                        l.to({
                            x: 530
                        },
                        350, egret.Ease.backOut).wait(1400).to({
                            alpha: 0
                        },
                        750, egret.Ease.backOut);
                        var u = egret.Tween.get(t._bossComing.heiDi, {
                            loop: !1
                        });
                        t._bossComing.heiDi.alpha = 0,
                        u.to({
                            alpha: 1
                        },
                        350, egret.Ease.backOut).wait(1400).to({
                            alpha: 0
                        },
                        750, egret.Ease.backOut);
                        var d = egret.Tween.get(t._bossComing.Zi_3, {
                            loop: !1
                        });
                        t._bossComing.Zi_3.alpha = 0,
                        d.wait(350).to({
                            alpha: 1,
                            x: 669.99
                        },
                        0, egret.Ease.backOut).to({
                            alpha: 0,
                            scaleX: 1.25,
                            scaleY: 1.25
                        },
                        350, egret.Ease.backOut);
                        var h = egret.Tween.get(t._bossComing.group0, {
                            loop: !1
                        });
                        t._bossComing.heiDi.x = 1186.36,
                        t._bossComing.heiDi.y = 342,
                        h.to({
                            x: 650,
                            y: 372
                        },
                        350, egret.Ease.backOut).wait(1400).to({
                            alpha: 0
                        },
                        750, egret.Ease.backOut);
                        var c = egret.Tween.get(t._bossComing.group, {
                            loop: !1
                        });
                        t._bossComing.group.x = -60.64,
                        t._bossComing.group.y = 348,
                        c.to({
                            x: 605,
                            y: 372
                        },
                        350, egret.Ease.backOut).wait(1400).to({
                            alpha: 0
                        },
                        750, egret.Ease.backOut);
                        var p = egret.Tween.get(t._bossComing.group1, {
                            loop: !1
                        });
                        t._bossComing.group.alpha = 0,
                        p.to({
                            x: 605,
                            y: 372
                        },
                        350, egret.Ease.backOut).to({
                            alpha: 1,
                            x: 605,
                            y: 372
                        },
                        350, egret.Ease.backOut).to({
                            alpha: 0,
                            scaleX: 1.25,
                            scaleY: 1.25
                        },
                        350, egret.Ease.backOut);
                        var g = egret.Tween.get(t._bossComing.bg, {
                            loop: !1
                        });
                        t._bossComing.bg.alpha = 0,
                        g.to({
                            alpha: .75
                        },
                        0, egret.Ease.backOut).wait(2550).call(function() {
                            egret.Tween.removeTweens(t._bossComing.Danger_2),
                            egret.Tween.removeTweens(t._bossComing.Danger_1),
                            egret.Tween.removeTweens(t._bossComing.Zi_1),
                            egret.Tween.removeTweens(t._bossComing.Zi_2),
                            egret.Tween.removeTweens(t._bossComing.group1),
                            egret.Tween.removeTweens(t._bossComing.group),
                            egret.Tween.removeTweens(t._bossComing.bg),
                            egret.Tween.removeTweens(t._bossComing.Zi_3),
                            egret.Tween.removeTweens(t._bossComing.heiDi),
                            egret.Tween.removeTweens(t._bossComing.group0),
                            t._bossComing && t.removeChild(t._bossComing),
                            t._bossComing = null,
                            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/BossComing.exml")
                        }),
                        t._bInitBoss = !1
                    },
                    t) : void console.log(bossScoreImg + ":不存在！！！！")
                },
                t) : void console.log(bossImg + ":不存在！！！！")
            },
            this)
        }
    }
    public destroy() {}
}