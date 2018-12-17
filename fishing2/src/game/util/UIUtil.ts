class UIUtil {
    public static _isOpenLoading;
    public static _loadingImg;
    public static _loadingTimer;
    
    public static popView = function(t, i = null) {
        SoundManager.playUISound("B02"),
        t.scaleX = t.scaleY = 1.25;
        var n = egret.Tween.get(t);
        n.to({
            scaleX: .9,
            scaleY: .9
        },
        200).to({
            scaleX: 1,
            scaleY: 1
        },
        70).call(function() {
            egret.Tween.removeTweens(t),
            i && i()
        })
    }
    public static closeView = function(e, t) {
        var i = egret.Tween.get(e);
        i.to({
            scaleX: 0,
            scaleY: 0
        },
        200).call(function() {
            egret.Tween.removeTweens(e),
            t && t()
        })
    }
        public static popViewCircle = function(t, i) {
            void 0 === i && (i = null),
            SoundManager.playUISound("B02"),
            t.y = -720;
            var n = egret.Tween.get(t);
            n.to({
                y: 60
            },
            300, egret.Ease.backOut).call(function() {
                egret.Tween.removeTweens(t),
                i && i()
            })
        }
        public static popViewDJS = function(t, i) {
            void 0 === i && (i = null),
            SoundManager.playUISound("B02"),
            t.y = -720;
            var n = egret.Tween.get(t);
            n.to({
                y: 120
            },
            300, egret.Ease.backOut).call(function() {
                egret.Tween.removeTweens(t),
                i && i()
            })
        }
        public static closeViewCircle = function(t, i = null) {
            SoundManager.playUISound("B02");
            var n = egret.Tween.get(t);
            n.to({
                y: -720
            },
            300).call(function() {
                egret.Tween.removeTweens(t),
                i && i()
            })
        }
        public static startLoading() {
            if (!UIUtil._isOpenLoading) {
                UIUtil._isOpenLoading = !0;
                UIUtil._loadingImg = new egret.DisplayObjectContainer,
                UIUtil._loadingImg.touchEnabled = !0;
                var e = new egret.Shape;
                e.graphics.beginFill(0, 0),
                e.graphics.drawRect(0, 0, CONFIG.contentWidth, CONFIG.contentHeight),
                e.graphics.endFill(),
                UIUtil._loadingImg.addChild(e);
                var i = new egret.Bitmap(RES.getRes("common_loading_png"));
                i.name = "common_loading_png";
                var n = Director.getStage();
                UIUtil._loadingImg.addChild(i);
                n.addChildAt(UIUtil._loadingImg, 9999);
                i.anchorOffsetX = i.width >> 1;
                i.anchorOffsetY = i.height >> 1;
                i.x = CONFIG.contentWidth >> 1;
                i.y = CONFIG.contentHeight >> 1;
                TweenTools.rotation(i, 1000);
                UIUtil._loadingTimer = new egret.Timer(10000, 1);
                UIUtil._loadingTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                UIUtil._loadingTimer.start();
            }
        }

        public static closeLoading() {
            if (UIUtil._isOpenLoading) {
                if (UIUtil._loadingImg) {
                    UIUtil._loadingTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                    var e = UIUtil._loadingImg.getChildByName("common_loading_png");
                    TweenTools.clearTween(e),
                    UIUtil._loadingImg.parent && UIUtil._loadingImg.parent.removeChild(UIUtil._loadingImg)
                }
                UIUtil._isOpenLoading = !1;
            } else {
                UIUtil._isOpenLoading = !0;
            }
        }

        public static timerFunc() {
            UIUtil.closeLoading()
        }

        public static screenAdapter(e, t=0, i=0, n=0, a=0) {
        }
        public static listTween = function(e, t) {
            e.visible = !1,
            e.scaleX = 1.8,
            e.scaleY = 1.8,
            function(e, t) {
                egret.Tween.get(e, {
                    loop: !1
                }).wait(100 * t).call(function() {
                    e.visible = !0
                }).to({
                    scaleX: 1,
                    scaleY: 1
                },
                150).to({
                    scaleX: .95,
                    scaleY: .95
                },
                100).to({
                    scaleX: 1,
                    scaleY: 1
                },
                100).call(function() {
                    egret.Tween.removeTweens(e)
                })
            } (e, t)
        }
        public static listTweenFly = function(e, t, i) {
            e.x = -650;
            var n = 500; !
            function(e, t) {
                var a = 0;
                a = Math.floor(t / i) > 0 ? (Math.floor(t / i) + 1) * n: n,
                egret.Tween.get(e, {
                    loop: !1
                }).call(function() {}).to({
                    x: 20
                },
                a, egret.Ease.backOut).call(function() {
                    egret.Tween.removeTweens(e)
                })
            } (e, t)
        }
        public static listTweenFast = function(e, t, i) {
            e.visible = !1,
            e.scaleX = 1.8,
            e.scaleY = 1.8;
            var n = 100; !
            function(e, t) {
                var a = 0;
                a = Math.floor(t / i) > 0 ? Math.floor(t / i) * n + Math.ceil(t % i) * n: t * n,
                egret.Tween.get(e, {
                    loop: !1
                }).wait(a).call(function() {
                    e.visible = !0
                }).to({
                    scaleX: 1,
                    scaleY: 1
                },
                150).to({
                    scaleX: .95,
                    scaleY: .95
                },
                100).to({
                    scaleX: 1,
                    scaleY: 1
                },
                100).call(function() {
                    egret.Tween.removeTweens(e)
                })
            } (e, t)
        }
    } 