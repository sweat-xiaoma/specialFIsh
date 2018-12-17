class UnlockGunUpdateUI extends eui.Component {
    private isOpenGunUpdateGroup;
    private isCanUnlock;
    private goldLab_num_1;
    private numGroup;
    private send;
    private updateGunCost;
    private updateGunCostGroup;
    private gunUpdateBg;
    private icon;
    private gunUpdateTips;
	public constructor(t) {
		super();
        var i = this;
        i.skinName = t;
        i.isOpenGunUpdateGroup = !1,
        i.isCanUnlock = !1,
        i.addEventListener(egret.TouchEvent.TOUCH_TAP, i.sendMsg, i),
        i.goldLab_num_1 = new egret.BitmapText,
        i.goldLab_num_1.font = RES.getRes("bitmapNum_2_fnt"),
        i.goldLab_num_1.text = "1",
        i.goldLab_num_1.scaleX = .5,
        i.goldLab_num_1.scaleY = .5,
        i.numGroup.addChild(i.goldLab_num_1),
        i.goldLab_num_1.textAlign = egret.HorizontalAlign.CENTER,
        i.goldLab_num_1.anchorOffsetX = i.goldLab_num_1.width / 2,
        i.goldLab_num_1.anchorOffsetY = i.goldLab_num_1.height / 2,
        i.send.visible = !1,
        i.updateGunCost = new egret.BitmapText,
        i.updateGunCost.font = RES.getRes("bitmapNum_4_fnt"),
        i.updateGunCost.text = "1",
        i.updateGunCostGroup.addChild(i.updateGunCost),
        i.updateGunCost.textAlign = egret.HorizontalAlign.CENTER,
        i.updateGunCost.anchorOffsetX = i.updateGunCost.width / 2,
        i.updateGunCost.anchorOffsetY = i.updateGunCost.height / 2;
    }
    public sendMsg = function(e) {
        if (!this.isCanUnlock) {
            var t = new UnlockGunView,
            i = new UnlockGunMediator(t);
            return void Director.pushView(i)
        }
        var n = new UpgradeOrForgeReq;
        n.initData(),
        n.setType(GunUpdateType.UNLOCK),
        NetManager.send(n,MsgActionDefine.UpgradeOrForgeReq)
    }
    
    public setUpdateGunNum (e, t, i) {
        var n = new Array,
        a =T_Gun_Table.getVoByKey(e + 1);
        if (a) if (n.push(a.bulletNum + ""), this.gunUpdateTips.text = Language.getDynamicText(24, n), this.updateGunCost.text = t + "/" + i, this.updateGunCost.anchorOffsetX = this.updateGunCost.width / 2, this.updateGunCost.anchorOffsetY = this.updateGunCost.height / 2, t >= i && 0 != i) {
            this.isCanUnlock = !0,
            this.send.visible = !0;
            var o = T_Gun_Table.getVoByKey(e),
            r = o.upgradeOrForgeAward,
            s = r.split("_"),
            l = parseInt(s[1]);
            this.goldLab_num_1.text = "" + l,
            this.goldLab_num_1.anchorOffsetX = this.goldLab_num_1.width / 2,
            this.goldLab_num_1.anchorOffsetY = this.goldLab_num_1.height / 2,
            this.gunUpdateBg.visible = !1,
            this.icon.visible = !1,
            this.updateGunCost.visible = !1,
            this.gunUpdateTips.visible = !0
        } else this.gunUpdateBg.visible = !0,
        this.icon.visible = !0,
        this.send.visible = !1,
        this.updateGunCost.visible = !0,
        this.gunUpdateTips.visible = !0,
        this.isCanUnlock = !1
    }
    public openGunUpdateGroup = function() {
        var e = this,
        t = Director.getModelByKey(UserModel),
        i = t.getCurGunID(),
        n = T_Gun_Table.getVoByKey(i),
        a = T_Config_Table.getVoByKey(52).value;
        if (!this.gunUpdateBg.visible && n.bulletNum <= Number(a)) {
            if (e.isOpenGunUpdateGroup) return void this.checkEnough();
            egret.Tween.removeTweens(e),
            e.scaleX = 0,
            e.x = 0,
            e.isOpenGunUpdateGroup = !0;
            var o = egret.Tween.get(this, {
                loop: !1
            });
            return void o.to({
                scaleX: 1
            },
            200).call(function() {
                egret.Tween.removeTweens(e)
            })
        }
        if (egret.Tween.removeTweens(e), e.isOpenGunUpdateGroup) {
            e.isOpenGunUpdateGroup = !1;
            var o = egret.Tween.get(this, {
                loop: !1
            });
            o.to({
                scaleX: 0
            },
            200).call(function() {
                egret.Tween.removeTweens(e),
                e.x = -400,
                e.scaleX = 1
            })
        } else {
            e.scaleX = 0,
            e.x = 0,
            e.isOpenGunUpdateGroup = !0;
            var o = egret.Tween.get(this, {
                loop: !1
            });
            o.to({
                scaleX: 1
            },
            200).call(function() {
                egret.Tween.removeTweens(e)
            })
        }
        this.checkEnough()
    }
    public openGunUpdateGroupByEnough = function() {
        var e = this;
        if (e.isOpenGunUpdateGroup || 1 == e.scaleX) return void this.checkEnough();
        egret.Tween.removeTweens(e),
        e.scaleX = 0,
        e.x = 0,
        e.isOpenGunUpdateGroup = !0;
        var t = egret.Tween.get(this, {
            loop: !1
        });
        t.to({
            scaleX: 1
        },
        200).call(function() {
            egret.Tween.removeTweens(e)
        }),
        this.checkEnough()
    }
    public openGunUpdateGroupByNoEnough = function() {
        var e = this;
        if (!e.isOpenGunUpdateGroup || 0 == e.scaleX) return void this.checkEnough();
        egret.Tween.removeTweens(e),
        e.isOpenGunUpdateGroup = !1;
        var t = egret.Tween.get(this, {
            loop: !1
        });
        t.to({
            scaleX: 0
        },
        200).call(function() {
            egret.Tween.removeTweens(e),
            e.scaleX = 1,
            e.x = -400
        }),
        this.checkEnough()
    }
    public openGunUpdateByGuide = function() {
        var e = this;
        egret.Tween.removeTweens(e),
        e.scaleX = 0,
        e.x = 0,
        e.isOpenGunUpdateGroup = !0;
        var t = egret.Tween.get(this, {
            loop: !1
        });
        t.to({
            scaleX: 1
        },
        200).call(function() {
            egret.Tween.removeTweens(e)
        });
        var i = this.root.getChildByName("hint_effect");
        if (!i) {
            var n = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
            n.name = "hint_effect",
            n.anchorOffsetX = 0,
            n.anchorOffsetY = n.height / 2,
            n.width = 272,
            n.height = 94,
            n.x = 12,
            n.y = n.height / 2 - 1,
            n.blendMode = egret.BlendMode.ADD,
            e.root.addChild(n)
        }
        this.checkEnough()
    }
    public checkEnough = function() {
        var e = Director.getModelByKey(UserModel),
        t = (e.getUserId(), e.getCurGunID()),
        i = T_Gun_Table.getVoByKey(t),
        n = !0;
        if (i) {
            var a = i.upgradeOrForgeCost,
            o = a.split(","),
            r = 0,
            s = 0;
            if (o.length > 1) return void(n = !1);
            for (var l = 0; 1 > l; l++) {
                var u = o[l],
                d = u.split("_"),
                h = parseInt(d[0]),
                c = parseInt(d[1]);
                new Item(h, 0);
                if (r = c, s = e.getMoney(), c > s) {
                    n = !1;
                    break
                }
            }
        }
        if (n) {
            var p = this.root.getChildByName("hint_effect");
            if (!p) {
                var g = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
                g.name = "hint_effect",
                g.anchorOffsetX = 0,
                g.anchorOffsetY = g.height / 2,
                g.width = 272,
                g.height = 94,
                g.x = 12,
                g.y = g.height / 2 - 1,
                g.blendMode = egret.BlendMode.ADD,
                this.root.addChild(g),
                TweenTools.showOutAndIn(g, 1500)
            }
        } else {
            var p = this.root.getChildByName("hint_effect");
            p && this.root.removeChild(p)
        }
    }
    public destory = function() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendMsg, this)
    }

} 