class LotteryUI extends eui.Component {

    private currTab;
    private currSucTag;
    private _bGuide;
    private _btnWrapList;
    private closeBtn;
    private _to;
    private arrTitle;
    private _currClickItem:string;
    // private title_0;
    // private title_1;
    // private title_2;
    // private title_3;
    // private title_4;
    // private title_5;

    private num_1;
    private num_2;
    private num_3;
    private num_4;
    private num_5;
    private num_6;

    private count_txt1:egret.BitmapText;
    private count_txt2:egret.BitmapText;
    private count_txt3:egret.BitmapText;
    private count_txt4:egret.BitmapText;
    private count_txt5:egret.BitmapText;
    private count_txt6:egret.BitmapText;

    private root;
    private lottery;
    private tabBar:eui.TabBar;
    private getBtn;
    private sureBtn;
    private fish;
    private chou;

    private score_txt;
    private tips_txt;
    private progressBar;
    private lotteryBtn;

    private currMaxTab;
    private back_1;
    private item_1;
    private back_2;
    private item_2;
    private back_3;
    private item_3;
    private back_4;
    private item_4;
    private back_5;
    private item_5;
    private back_6;
    private item_6;
    private playAction;

    private max_tips_txt;

    constructor(e){
        super();
        this.currTab = 1,
        this.currSucTag = 1,
        this._bGuide = !1,
        this._btnWrapList = new Array;
        this._to = this.globalToLocal(e.x, e.y);

        this.init();
    }

    private init() {
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Lottery.exml";
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/LotteryItem.exml", this.addBgResource, this),
        
        this.arrTitle = new Array();
        this.arrTitle.push("普通抽奖"),
        this.arrTitle.push("青铜抽奖"),
        this.arrTitle.push("白银抽奖"),
        this.arrTitle.push("黄金抽奖"),
        this.arrTitle.push("白金抽奖"),
        this.arrTitle.push("钻石抽奖"),
        this._currClickItem = "",
        this.setCountFont();
    }
   
    public setCountFont() {
        this.num_1.name = "num_1",
        this.num_2.name = "num_2",
        this.num_3.name = "num_3",
        this.num_4.name = "num_4",
        this.num_5.name = "num_5",
        this.num_6.name = "num_6",
        this.count_txt1 = new egret.BitmapText,
        this.count_txt1.font = RES.getRes("mini_num_font_fnt"),
        this.count_txt1.name = "txt1",
        this.count_txt1.text = String("1"),
        this.num_1.addChildAt(this.count_txt1, 1),
        this.count_txt1.textAlign = egret.HorizontalAlign.CENTER,
        this.count_txt1.anchorOffsetX = this.count_txt1.width / 2,
        this.count_txt1.anchorOffsetY = this.count_txt1.height / 2;
        this.count_txt1.letterSpacing = -4;
        this.count_txt2 = new egret.BitmapText,
        this.count_txt2.font = RES.getRes("mini_num_font_fnt"),
        this.count_txt2.name = "txt2",
        this.count_txt2.text = String("1"),
        this.num_2.addChildAt(this.count_txt2, 1),
        this.count_txt2.textAlign = egret.HorizontalAlign.CENTER,
        this.count_txt2.anchorOffsetX = this.count_txt2.width / 2,
        this.count_txt2.anchorOffsetY = this.count_txt2.height / 2;
        this.count_txt2.letterSpacing = -4;
        this.count_txt3 = new egret.BitmapText,
        this.count_txt3.font = RES.getRes("mini_num_font_fnt"),
        this.count_txt3.name = "txt3",
        this.count_txt3.text = String("1"),
        this.num_3.addChildAt(this.count_txt3, 1),
        this.count_txt3.textAlign = egret.HorizontalAlign.CENTER,
        this.count_txt3.anchorOffsetX = this.count_txt3.width / 2,
        this.count_txt3.anchorOffsetY = this.count_txt3.height / 2;
        this.count_txt3.letterSpacing = -4;
        this.count_txt4 = new egret.BitmapText,
        this.count_txt4.font = RES.getRes("mini_num_font_fnt"),
        this.count_txt4.name = "txt4",
        this.count_txt4.text = String("1"),
        this.num_4.addChildAt(this.count_txt4, 1),
        this.count_txt4.textAlign = egret.HorizontalAlign.CENTER,
        this.count_txt4.anchorOffsetX = this.count_txt4.width / 2,
        this.count_txt4.anchorOffsetY = this.count_txt4.height / 2;
        this.count_txt4.letterSpacing = -4;
        this.count_txt5 = new egret.BitmapText,
        this.count_txt5.font = RES.getRes("mini_num_font_fnt"),
        this.count_txt5.name = "txt5",
        this.count_txt5.text = String("1"),
        this.num_5.addChildAt(this.count_txt5, 1),
        this.count_txt5.textAlign = egret.HorizontalAlign.CENTER,
        this.count_txt5.anchorOffsetX = this.count_txt5.width / 2,
        this.count_txt5.anchorOffsetY = this.count_txt5.height / 2;
        this.count_txt5.letterSpacing = -4;
        this.count_txt6 = new egret.BitmapText,
        this.count_txt6.font = RES.getRes("mini_num_font_fnt"),
        this.count_txt6.name = "txt6",
        this.count_txt6.text = String("1"),
        this.num_6.addChildAt(this.count_txt6, 1),
        this.count_txt6.textAlign = egret.HorizontalAlign.CENTER,
        this.count_txt6.anchorOffsetX = this.count_txt6.width / 2,
        this.count_txt6.anchorOffsetY = this.count_txt6.height / 2;
        this.count_txt6.letterSpacing = -4;
    }

    public addBgResource(e, t) {
        this.root.visible = !0,
        this.lottery.visible = !1,
        this.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this),
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetReward, this),
        this.fish.visible = !1,
        this.chou.visible = !1,
        this._btnWrapList.push(new UIWrap(this.getBtn)),
        this._btnWrapList.push(new UIWrap(this.closeBtn)),
        this._btnWrapList.push(new UIWrap(this.sureBtn));
        var lm:LotteryModel = Director.getModelByKey(LotteryModel), n = lm.getScore(), a = T_Lottery_Table.getAllVo();
        for (var o = 0, r = 0; r < a.length; r++) {
            var s = a[r].integral;
            if (! (n >= s)) break;
            o = r
        }
        var l = lm.getKillNum(),
        u = lm.getMaxKill(lm.getTodayCount()),
        tipStr = "",
        h = T_Lottery_Table.getVoByKey(1);
        if (l >= u && n >= h.integral) {
            if (this.currSucTag = o + 1, this.setData(this.currSucTag), this.initView(), this.tabBar.selectedIndex = o, this.currSucTag == this.currTab) {
                var c = T_Lottery_Table.getVoByKey(this.currTab + 1);
                c || this.currTab == T_Lottery_Table.getAllVo().length && (c = T_Lottery_Table.getVoByKey(this.currTab)),
                this.setProgress(lm.getScore(), c.integral),
                this.getBtn.label = Language.getText(9),
                this.fish.visible = !1,
                this.chou.visible = !0
            } else {
                var p = T_Lottery_Table.getVoByKey(this.currTab);
                this.setProgress(lm.getScore(), p.integral),
                this.getBtn.label = Language.getText(8),
                this.fish.visible = !0,
                this.chou.visible = !1
            }
            tipStr = this.arrTitle[o];//.text
        } else this.currSucTag = 1,
        this.setData(1),
        this.getBtn.label = Language.getText(8),
        this.fish.visible = !0,
        this.chou.visible = !1,
        tipStr = Language.getText(6),
        l >= u ? this.setProgress(n, h.integral) : this.setProgress(l, u);
        this.setScore(lm.getScore()),
        this.setTipsTxt(tipStr),
        this.visibleTitle(!1);
        var g = this;
        MessageDispatcher.register(MsgActionDefine.DrawLotteryRes,
        function(e) {
            g.lotteryDataBack(e);
        }),
        this._bGuide && (this.setScore(2222), this.setTipsTxt(Language.getText(9)), this.setProgress(2e3, 2e3), this.getBtn.label = Language.getText(9), this.fish.visible = !1, this.chou.visible = !0)
    }
    public initView() {};
    public onBarItemTap(e) {
        this.setData(e.itemIndex + 1);
        var lm:LotteryModel = Director.getModelByKey(LotteryModel),
        i = lm.getKillNum(),
        n = lm.getMaxKill(lm.getTodayCount()),
        a = T_Lottery_Table.getVoByKey(1);
        if (i >= n && lm.getScore() >= a.integral) if (this.currSucTag == this.currTab) {
            this.visibleTitle(!1);
            var o = T_Lottery_Table.getVoByKey(this.currTab + 1);
            o || this.currTab == T_Lottery_Table.getAllVo().length && (o = T_Lottery_Table.getVoByKey(this.currTab)),
            this.setProgress(lm.getScore(), o.integral),
            this.getBtn.label = Language.getText(9),
            this.fish.visible = !1,
            this.chou.visible = !0
        } else if (this.currSucTag < this.currTab) {
            this.visibleTitle(!1);
            var r = T_Lottery_Table.getVoByKey(this.currTab);
            this.setProgress(lm.getScore(), r.integral),
            this.getBtn.label = Language.getText(8),
            this.fish.visible = !0,
            this.chou.visible = !1
        } else this.visibleTitle(!0)
    }
    public visibleTitle(e) {
        e ? (this.getBtn.visible = !1, this.tips_txt.visible = !1, this.progressBar.visible = !1, this.max_tips_txt.visible = !0) : (this.getBtn.visible = !0, this.tips_txt.visible = !0, this.progressBar.visible = !0, this.max_tips_txt.visible = !1)
    }
    public setData(t) {
        this.currTab = t;
        var i = T_Lottery_Table.getVoByKey(t),
        n = i.award1.split("_"),
        a = this.root.getChildByName("item_1");
        null == a ? (a = new LotteryItemUI(Number(n[0]), Number(n[1])), a.name = "item_1", a.x = 180 + a.width / 2, a.y = 255 + a.height / 2, this.root.addChild(a)) : a.setData(Number(n[0]), Number(n[1]));
        var o = i.award2.split("_"),
        r = this.root.getChildByName("item_2");
        null == r ? (r = new LotteryItemUI(Number(o[0]), Number(o[1])), r.name = "item_2", r.x = 331 + a.width / 2, r.y = 255 + a.height / 2, this.root.addChild(r)) : r.setData(Number(o[0]), Number(o[1]));
        var s = i.award3.split("_"),
        l = this.root.getChildByName("item_3");
        null == l ? (l = new LotteryItemUI(Number(s[0]), Number(s[1])), l.name = "item_3", l.x = 482 + a.width / 2, l.y = 255 + a.height / 2, this.root.addChild(l)) : l.setData(Number(s[0]), Number(s[1]));
        var u = i.award4.split("_"),
        d = this.root.getChildByName("item_4");
        null == d ? (d = new LotteryItemUI(Number(u[0]), Number(u[1])), d.name = "item_4", d.x = 633 + a.width / 2, d.y = 255 + a.height / 2, this.root.addChild(d)) : d.setData(Number(u[0]), Number(u[1]));
        var h = i.award5.split("_"),
        c = this.root.getChildByName("item_5");
        null == c ? (c = new LotteryItemUI(Number(h[0]), Number(h[1])), c.name = "item_5", c.x = 784 + a.width / 2, c.y = 255 + a.height / 2, this.root.addChild(c)) : c.setData(Number(h[0]), Number(h[1]));
        var p = i.award6.split("_"),
        g = this.root.getChildByName("item_6");
        null == g ? (g = new LotteryItemUI(Number(p[0]), Number(p[1])), g.name = "item_6", g.x = 935 + a.width / 2, g.y = 255 + a.height / 2, this.root.addChild(g)) : g.setData(Number(p[0]), Number(p[1]));
        var arr = new Array();
        arr.push(g),
        arr.push(c),
        arr.push(d),
        arr.push(l),
        arr.push(r),
        arr.push(a),
        GameUtil.playWarAction(arr);
    }

    public setScore(e) {
        this.score_txt.text = String(e)
    }
    public setTipsTxt(e) {
        this.tips_txt.text = e
    }
    public setProgress(e, t) {
        this.progressBar.maximum = t;
        this.progressBar.value = e;
    }
    public onGetReward(e) {
        this.sureBtn.visible = !1;
        var t = Director.getModelByKey(LotteryModel),
        i = t.getKillNum(),
        n = t.getMaxKill(t.getTodayCount()),
        a = T_Lottery_Table.getVoByKey(1);
        if (i >= n && t.getScore() >= a.integral) {
            if (this.currSucTag != this.currTab) {
                var o = new FishKindsView,
                r = new FishKindsMediator(o);
                return void Director.pushView(r)
            }
            if (6 != this.currSucTag) {
                var s = this.arrTitle[this.currSucTag];//.text,
                var l = T_Lottery_Table.getVoByKey(this.currSucTag + 1);
                if (l) {
                    var u = Director.getModelByKey(LotteryModel),
                    d = Number(l.integral) - u.getScore(),
                    h = new Array;
                    h.push(s),
                    h.push(d + "");
                    var c = this;
                    GameUtil.openConfirmByTwoButton(null,
                    function() {
                        c.root.visible = !1,
                        c.lottery.visible = !0,
                        c.setItems(),
                        c.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, c.startToLottery, c)
                    },
                    this, Language.getDynamicText(79, h))
                }
                return
            }
            this.root.visible = !1,
            this.lottery.visible = !0,
            this.setItems(),
            this.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startToLottery, this)
        } else {
            var o = new FishKindsView,
            r = new FishKindsMediator(o);
            Director.pushView(r)
        }
    }

    public setItems() {
        var e = Director.getModelByKey(LotteryModel),
        t = e.getScore(),
        i = T_Lottery_Table.getAllVo();
        this.currMaxTab = 1;
        for (var n = 0; n < i.length; n++) 
            t >= i[n].integral && (this.currMaxTab = i[n].id);
        var a = T_Lottery_Table.getVoByKey(this.currMaxTab),
        o = a.award1.split("_"),
        r = T_Item_Table.getVoByKey(Number(o[0]));
        Number(o[0]) == PropEnum.FISH_TICKIT ? this.count_txt1.text = Number(o[1]) / 10 + "元": this.count_txt1.text = o[1],
        this.count_txt1.anchorOffsetX = this.count_txt1.width / 2,
        this.count_txt1.anchorOffsetY = this.count_txt1.height / 2,
        this.count_txt1.name = "count_1",
        this.back_1.name = "back_1";
        var s = GameUtil.getIconById(IconType.PROP, r.id, Number(o[1]));
        s.width = 76,
        s.height = 76,
        s.anchorOffsetX = s.width / 2,
        s.anchorOffsetY = s.height / 2,
        s.x = 98,
        s.y = 95,
        s.name = "icon",
        this.item_1.addChildAt(s, 2);
        var l = a.award2.split("_"),
        u = T_Item_Table.getVoByKey(Number(l[0]));
        Number(l[0]) == PropEnum.FISH_TICKIT ? this.count_txt2.text = Number(l[1]) / 10 + "元": this.count_txt2.text = l[1],
        this.count_txt2.anchorOffsetX = this.count_txt2.width / 2,
        this.count_txt2.anchorOffsetY = this.count_txt2.height / 2,
        this.count_txt2.name = "count_2",
        this.back_2.name = "back_2";
        var d = GameUtil.getIconById(IconType.PROP, u.id, Number(l[1]));
        d.width = 76,
        d.height = 76,
        d.anchorOffsetX = d.width / 2,
        d.anchorOffsetY = d.height / 2,
        d.x = 98,
        d.y = 95,
        d.name = "icon",
        this.item_2.addChildAt(d, 2);
        var h = a.award3.split("_"),
        c = T_Item_Table.getVoByKey(Number(h[0]));
        Number(h[0]) == PropEnum.FISH_TICKIT ? this.count_txt3.text = Number(h[1]) / 10 + "元": this.count_txt3.text = h[1],
        this.count_txt3.anchorOffsetX = this.count_txt3.width / 2,
        this.count_txt3.anchorOffsetY = this.count_txt3.height / 2,
        this.count_txt3.name = "count_3",
        this.back_3.name = "back_3";
        var p = GameUtil.getIconById(IconType.PROP, c.id, Number(h[1]));
        p.width = 76,
        p.height = 76,
        p.anchorOffsetX = p.width / 2,
        p.anchorOffsetY = p.height / 2,
        p.x = 98,
        p.y = 95,
        p.name = "icon",
        this.item_3.addChildAt(p, 2);
        var g = a.award4.split("_"),
        _ = T_Item_Table.getVoByKey(Number(g[0]));
        Number(g[0]) == PropEnum.FISH_TICKIT ? this.count_txt4.text = Number(g[1]) / 10 + "元": this.count_txt4.text = g[1],
        this.count_txt4.anchorOffsetX = this.count_txt4.width / 2,
        this.count_txt4.anchorOffsetY = this.count_txt4.height / 2,
        this.count_txt4.name = "count_4",
        this.back_4.name = "back_4";
        var y = GameUtil.getIconById(IconType.PROP, _.id, Number(g[1]));
        y.width = 76,
        y.height = 76,
        y.anchorOffsetX = y.width / 2,
        y.anchorOffsetY = y.height / 2,
        y.x = 98,
        y.y = 95,
        y.name = "icon",
        this.item_4.addChildAt(y, 2);
        var m = a.award5.split("_"),
        f = T_Item_Table.getVoByKey(Number(m[0]));
        Number(m[0]) == PropEnum.FISH_TICKIT ? this.count_txt5.text = Number(m[1]) / 10 + "元": this.count_txt5.text = m[1],
        this.count_txt5.anchorOffsetX = this.count_txt5.width / 2,
        this.count_txt5.anchorOffsetY = this.count_txt5.height / 2,
        this.count_txt5.name = "count_5",
        this.back_5.name = "back_5";
        var v = GameUtil.getIconById(IconType.PROP, f.id, Number(m[1]));
        v.width = 76,
        v.height = 76,
        v.anchorOffsetX = v.width / 2,
        v.anchorOffsetY = v.height / 2,
        v.x = 98,
        v.y = 95,
        v.name = "icon",
        this.item_5.addChildAt(v, 2);
        var T = a.award6.split("_"),
        E = T_Item_Table.getVoByKey(Number(T[0]));
        Number(T[0]) == PropEnum.FISH_TICKIT ? this.count_txt6.text = Number(T[1]) / 10 + "元": this.count_txt6.text = T[1],
        this.count_txt6.anchorOffsetX = this.count_txt6.width / 2,
        this.count_txt6.anchorOffsetY = this.count_txt6.height / 2,
        this.count_txt6.name = "count_6",
        this.back_6.name = "back_6";
        var I = GameUtil.getIconById(IconType.PROP, E.id, Number(T[1]));
        I.width = 76;
        I.height = 76;
        I.anchorOffsetX = I.width / 2,
        I.anchorOffsetY = I.height / 2,
        I.x = 98,
        I.y = 95,
        I.name = "icon",
        this.item_6.addChildAt(I, 2);
    }

    public startToLottery(e) {
        var t = this,
        i = egret.Tween.get(this, {
            loop: !1
        });
        this.playAction.addEventListener(egret.Event.COMPLETE, t.onTweenGroupComplete, this),
        i.wait(600).call(function() {
            t.playAction.play(),
            egret.Tween.removeTweens(t)
        }),
        this.item_1.getChildByName("icon").visible = !1,
        this.item_2.getChildByName("icon").visible = !1,
        this.item_3.getChildByName("icon").visible = !1,
        this.item_4.getChildByName("icon").visible = !1,
        this.item_5.getChildByName("icon").visible = !1,
        this.item_6.getChildByName("icon").visible = !1,
        this.lotteryBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startToLottery, this),
        this.lotteryBtn.visible = !1,
        this.playFlip(this.item_1, this.count_txt1, this.back_1),
        this.playFlip(this.item_2, this.count_txt2, this.back_2),
        this.playFlip(this.item_3, this.count_txt3, this.back_3),
        this.playFlip(this.item_4, this.count_txt4, this.back_4),
        this.playFlip(this.item_5, this.count_txt5, this.back_5),
        this.playFlip(this.item_6, this.count_txt6, this.back_6)
    }
    public playFlip(e, t, i) {
        var n = egret.Tween.get(e, {
            loop: !1
        });
        n.to({
            scaleX: 0
        },
        300).call(function() {
            t.visible = !1,
            i.visible = !0
        }).to({
            scaleX: 1
        },
        300).call(function() {
            egret.Tween.removeTweens(e)
        })
    }
    public onTweenGroupComplete() {
        this.item_1.name = "lottery_1",
        this.item_2.name = "lottery_2",
        this.item_3.name = "lottery_3",
        this.item_4.name = "lottery_4",
        this.item_5.name = "lottery_5",
        this.item_6.name = "lottery_6",
        this.item_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this),
        this.item_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this),
        this.item_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this),
        this.item_4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this),
        this.item_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this),
        this.item_6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendToLottery, this);
        var e = this,
        t = e.item_1.getChildByName("ef_lottery_1");
        if (!t) {
            var i = function(t) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, i, e);
                var n = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                n.anchorOffsetX = n.width / 2,
                n.anchorOffsetY = n.height / 2,
                n.x = e.item_1.width / 2,
                n.y = e.item_1.height / 2 - 4,
                n.blendMode = egret.BlendMode.ADD,
                n.name = "ef_lottery_1",
                e.item_1.addChild(n);
                var a = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                a.anchorOffsetX = a.width / 2,
                a.anchorOffsetY = a.height / 2,
                a.x = e.item_1.width / 2,
                a.y = e.item_1.height / 2 - 4,
                a.blendMode = egret.BlendMode.ADD,
                a.name = "ef_lottery_1",
                e.item_2.addChild(a);
                var o = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                o.anchorOffsetX = o.width / 2,
                o.anchorOffsetY = o.height / 2,
                o.x = e.item_1.width / 2,
                o.y = e.item_1.height / 2 - 4,
                o.blendMode = egret.BlendMode.ADD,
                o.name = "ef_lottery_1",
                e.item_3.addChild(o);
                var r = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                r.anchorOffsetX = r.width / 2,
                r.anchorOffsetY = r.height / 2,
                r.x = e.item_1.width / 2,
                r.y = e.item_1.height / 2 - 4,
                r.blendMode = egret.BlendMode.ADD,
                r.name = "ef_lottery_1",
                e.item_4.addChild(r);
                var s = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                s.anchorOffsetX = s.width / 2,
                s.anchorOffsetY = s.height / 2,
                s.x = e.item_1.width / 2,
                s.y = e.item_1.height / 2 - 4,
                s.blendMode = egret.BlendMode.ADD,
                s.name = "ef_lottery_1",
                e.item_5.addChild(s);
                var l = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                l.anchorOffsetX = l.width / 2,
                l.anchorOffsetY = l.height / 2,
                l.x = e.item_1.width / 2,
                l.y = e.item_1.height / 2 - 4,
                l.blendMode = egret.BlendMode.ADD,
                l.name = "ef_lottery_1",
                e.item_6.addChild(l),
                TweenTools.showOutAndInHalf(n, 1e3),
                TweenTools.showOutAndInHalf(a, 1e3),
                TweenTools.showOutAndInHalf(o, 1e3),
                TweenTools.showOutAndInHalf(r, 1e3),
                TweenTools.showOutAndInHalf(s, 1e3),
                TweenTools.showOutAndInHalf(l, 1e3)
            };
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, i, this),
            RES.createGroup("ef_lottery_1_group", ["ef_lottery_1_png"]),
            RES.loadGroup("ef_lottery_1_group")
        }
        setTimeout(function() {
            if ("" == e._currClickItem && !e._bGuide) {
                e._currClickItem = "lottery_1",
                e.deleteEffect();
                var t = new DrawLotteryReq();
                t.initData(),
                t.setGear(e.currMaxTab);
                NetManager.send(t, MsgActionDefine.DrawLotteryReq);
            }
        }, 1e4);
    }

    public deleteEffect() {
        var e = this.item_1.getChildByName("ef_lottery_1");
        e && this.item_1.removeChild(e);
        var t = this.item_2.getChildByName("ef_lottery_1");
        t && this.item_2.removeChild(t);
        var i = this.item_3.getChildByName("ef_lottery_1");
        i && this.item_3.removeChild(i);
        var n = this.item_4.getChildByName("ef_lottery_1");
        n && this.item_4.removeChild(n);
        var a = this.item_5.getChildByName("ef_lottery_1");
        a && this.item_5.removeChild(a);
        var o = this.item_6.getChildByName("ef_lottery_1");
        o && this.item_6.removeChild(o)
    }

    public sendToLottery(e) {
        if (this._bGuide) {
            this._currClickItem = e.currentTarget.name,
            this.deleteEffect(),
            this.lotteryDataBackGuide();
            var t = this;
            return t.item_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, t.sendToLottery, t),
            t.item_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, t.sendToLottery, t),
            t.item_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, t.sendToLottery, t),
            t.item_4.removeEventListener(egret.TouchEvent.TOUCH_TAP, t.sendToLottery, t),
            t.item_5.removeEventListener(egret.TouchEvent.TOUCH_TAP, t.sendToLottery, t),
            void t.item_6.removeEventListener(egret.TouchEvent.TOUCH_TAP, t.sendToLottery, t)
        }
        this._currClickItem = e.currentTarget.name,
        this.deleteEffect();
        var msg = new DrawLotteryReq();
        msg.initData(),
        msg.setGear(this.currMaxTab),
        NetManager.send(msg, MsgActionDefine.DrawLotteryReq);
        var n = this;
        n.item_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, n.sendToLottery, n),
        n.item_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, n.sendToLottery, n),
        n.item_3.removeEventListener(egret.TouchEvent.TOUCH_TAP, n.sendToLottery, n),
        n.item_4.removeEventListener(egret.TouchEvent.TOUCH_TAP, n.sendToLottery, n),
        n.item_5.removeEventListener(egret.TouchEvent.TOUCH_TAP, n.sendToLottery, n),
        n.item_6.removeEventListener(egret.TouchEvent.TOUCH_TAP, n.sendToLottery, n);
    }

    public lotteryDataBack(msg:DrawLotteryRes) {
        var t = this,
        i = msg.getState();
        if (GetLotteryState.GET_SUCC == i) {
            var n = msg.getItemIndex(),
            a = this._currClickItem.substr(8, 1),
            o = this.lottery.getChildByName(this._currClickItem),
            r = egret.Tween.get(o, {loop: !1});
            r.to({scaleX: 0}, 300).call(function() {
                var e = o.getChildByName("num_" + a),
                i = o.getChildByName("back_" + a),
                r = o.getChildByName("icon");
                r && (r.visible = !0),
                e.visible = !0,
                i.visible = !1;
                var s = (T_Lottery_Table.getVoByKey(t.currMaxTab), t.getAwardByIdx(n)),
                l = s.split("_");
                o.removeChildAt(2);
                var u = T_Item_Table.getVoByKey(Number(l[0])),
                d = e.getChildByName("count_" + a);
                Number(l[0]) == PropEnum.FISH_TICKIT ? d.text = Number(l[1]) / 10 + "元": d.text = l[1],
                d.visible = !0,
                d.anchorOffsetX = d.width / 2,
                d.anchorOffsetY = d.height / 2;
                var h = GameUtil.getIconById(IconType.PROP, u.id, Number(l[1]));
                h.width = 76;
                h.height = 76;
                h.anchorOffsetX = h.width / 2,
                h.anchorOffsetY = h.height / 2,
                h.x = 98,
                h.y = 95,
                o.addChildAt(h, 2),
                10001 == Number(l[0])
            }).to({scaleX: 1}, 300).call(function() {
                t.playEnd(n, Number(a)),
                t.sureBtn.visible = !0,
                t.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, t.getLotteryEnd, t);
                var e = o.getChildByName("ef_lottery");
                if (!e) {
                    var i = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                    i.anchorOffsetX = i.width / 2,
                    i.anchorOffsetY = i.height / 2,
                    i.x = t.item_1.width / 2,
                    i.y = t.item_1.height / 2 - 4,
                    i.blendMode = egret.BlendMode.ADD,
                    i.name = "ef_lottery_1",
                    o.addChild(i),
                    TweenTools.showOutAndInHalf(i, 1e3);
                    var r = RES.getRes("ef_lottery_bao_json"),
                    s = RES.getRes("ef_lottery_bao_png"),
                    l = new egret.MovieClipDataFactory(r, s),
                    u = new MovieFish(l.generateMovieClipData("ef_lottery_bao"), egret.Event.COMPLETE);
                    u.initEvent();
                    var d = u.movieClipData,
                    h = 0,
                    c = new egret.Rectangle(d.frames[h].x, d.frames[h].y, 0, 0);
                    u.gotoAndPlay("play", 1),
                    u.frameRate = 14,
                    u.anchorOffsetX = u.width / 2,
                    u.anchorOffsetY = u.height / 2,
                    u.x = o.width / 2 - c.x,
                    u.y = o.height / 2 - c.y,
                    u.blendMode = egret.BlendMode.ADD,
                    u.name = "ef_lottery_bao",
                    o.addChild(u);
                    var p = egret.Tween.get(e, {
                        loop: !1
                    });
                    p.wait(3500).call(function() {
                        var t = o.getChildByName("ef_lottery_1");
                        null != t && o.removeChild(t);
                        var i = o.getChildByName("ef_lottery_bao");
                        null != i && o.removeChild(i),
                        egret.Tween.removeTweens(e)
                    })
                }
            }),
            this.sureBtn.visible = !0,
            this.lotteryBtn.visible = !1
        } else GameUtil.popTips(i)
    }
    public playEnd(e, t) {
        for (var i = new Array,
        n = 0; 6 > n; n++) n != e && i.push(n);
        for (var a = 0,
        n = 1; 7 > n; n++) n != t && (e = i[a], a++,
        function(e, t, i) {
            var n = t.lottery.getChildByName("lottery_" + e),
            a = egret.Tween.get(n, {loop: !1});
            a.to({scaleX: 0}, 300).call(function() {
                var a = n.getChildByName("num_" + e),
                o = n.getChildByName("back_" + e),
                r = n.getChildByName("icon_lottery");
                r && (r.visible = !0),
                a.visible = !0,
                o.visible = !1;
                var s = (T_Lottery_Table.getVoByKey(t.currMaxTab), t.getAwardByIdx(i)),
                l = s.split("_"),
                u = T_Item_Table.getVoByKey(Number(l[0])),
                d = a.getChildByName("count_" + e);
                Number(l[0]) == PropEnum.FISH_TICKIT ? d.text = Number(l[1]) / 10 + "元": d.text = l[1],
                d.visible = !0,
                d.anchorOffsetX = d.width / 2,
                d.anchorOffsetY = d.height / 2;
                var h = GameUtil.getIconById(IconType.PROP, u.id, Number(l[1]));
                h.width = 76;
                h.height = 76;
                h.anchorOffsetX = h.width / 2,
                h.anchorOffsetY = h.height / 2,
                h.x = 98,
                h.y = 95,
                n.addChildAt(h, 2)
            }).to({scaleX: 1}, 300).call(function() {
                egret.Tween.removeTweens(n)
            })
        } (n, this, e));
    }
    public getAwardByIdx(e) {
        var t = T_Lottery_Table.getVoByKey(this.currMaxTab),
        i = "";
        switch (e) {
        case 0:
            i = t.award1;
            break;
        case 1:
            i = t.award2;
            break;
        case 2:
            i = t.award3;
            break;
        case 3:
            i = t.award4;
            break;
        case 4:
            i = t.award5;
            break;
        case 5:
            i = t.award6
        }
        return i
    }
    public getLotteryEnd(e) {
        this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getLotteryEnd, this);
        var t = this,
        i = this.lottery.getChildByName(this._currClickItem);
        setTimeout(function() {
            var e = egret.Tween.get(i, {
                loop: !1
            });
            e.to({
                x: t._to.x,
                y: t._to.y,
                scaleX: .2,
                scaleY: .2
            },
            300).call(function() {
                egret.Tween.removeTweens(i),
                t.closeUI(null);
                var e = Director.getModelByKey(UserModel);
                _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {
                    userId: e.getUserId(),
                    isTween: !0
                }),
                _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {
                    userId: e.getUserId()
                }),
                _Notification_.send(NotifyEnum.SET_PROP_NUM)
            })
        },
        600)
    }
    public setGuide() {
        this._bGuide = !0
    }
    public startLottery() {
        return this.sureBtn.visible = !1,
        6 != this.currSucTag ? (this.root.visible = !1, this.lottery.visible = !0, this.setItems(), void this.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startToLottery, this)) : void 0
    }
    public lotteryDataBackGuide() {
        var e = this,
        t = 0,
        i = this._currClickItem.substr(8, 1),
        n = this.lottery.getChildByName(this._currClickItem),
        a = egret.Tween.get(n, {
            loop: !1
        });
        a.to({
            scaleX: 0
        },
        300).call(function() {
            var a = n.getChildByName("num_" + i),
            o = n.getChildByName("back_" + i),
            r = n.getChildByName("icon");
            r && (r.visible = !0),
            a.visible = !0,
            o.visible = !1;
            var s = (T_Lottery_Table.getVoByKey(e.currMaxTab), e.getAwardByIdx(t)),
            l = s.split("_");
            n.removeChildAt(2);
            var u = T_Item_Table.getVoByKey(Number(l[0])),
            d = a.getChildByName("count_" + i);
            d.text = Number(l[1]) / 10 + "元",
            d.visible = !0,
            d.anchorOffsetX = d.width / 2,
            d.anchorOffsetY = d.height / 2;
            var h = GameUtil.getIconById(IconType.PROP, u.id, Number(l[1]));
            h.width = 76;
            h.height = 76;
            h.anchorOffsetX = h.width / 2,
            h.anchorOffsetY = h.height / 2,
            h.x = 98,
            h.y = 96,
            n.addChildAt(h, 2),
            10001 == Number(l[0])
        }).to({
            scaleX: 1
        },
        300).call(function() {
            e.sureBtn.visible = !0,
            e.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, e.getLotteryEnd, e);
            var t = n.getChildByName("ef_lottery");
            if (!t) {
                var i = new egret.Bitmap(RES.getRes("ef_lottery_1_png"));
                i.anchorOffsetX = i.width / 2,
                i.anchorOffsetY = i.height / 2,
                i.x = e.item_1.width / 2,
                i.y = e.item_1.height / 2 - 4,
                i.blendMode = egret.BlendMode.ADD,
                i.name = "ef_lottery_1",
                n.addChild(i),
                TweenTools.showOutAndInHalf(i, 1e3);
                var a = RES.getRes("ef_lottery_bao_json"),
                o = RES.getRes("ef_lottery_bao_png"),
                r = new egret.MovieClipDataFactory(a, o),
                s = new MovieFish(r.generateMovieClipData("ef_lottery_bao"), egret.Event.COMPLETE);
                s.initEvent();
                var l = s.movieClipData,
                u = 0,
                d = new egret.Rectangle(l.frames[u].x, l.frames[u].y, 0, 0);
                s.gotoAndPlay("play", 1),
                s.frameRate = 14,
                s.anchorOffsetX = s.width / 2,
                s.anchorOffsetY = s.height / 2,
                s.x = n.width / 2 - d.x,
                s.y = n.height / 2 - d.y,
                s.blendMode = egret.BlendMode.ADD,
                s.name = "ef_lottery_bao",
                n.addChild(s);
                var h = egret.Tween.get(t, {
                    loop: !1
                });
                h.wait(3500).call(function() {
                    var e = n.getChildByName("ef_lottery_1");
                    null != e && n.removeChild(e);
                    var i = n.getChildByName("ef_lottery_bao");
                    null != i && n.removeChild(i),
                    egret.Tween.removeTweens(t)
                })
            }
        }),
        this.sureBtn.visible = !0,
        this.lotteryBtn.visible = !1
    }
    public closeUI(e) {
        for (; this._btnWrapList.length > 0;) {
            var t = this._btnWrapList.pop();
            t.destroy()
        }
        this.num_1 && this.num_1.removeChildren(),
        this.num_2 && this.num_2.removeChildren(),
        this.num_3 && this.num_3.removeChildren(),
        this.num_4 && this.num_4.removeChildren(),
        this.num_5 && this.num_5.removeChildren(),
        this.num_6 && this.num_6.removeChildren(),
        this.item_1 && this.item_1.removeChildren(),
        this.item_2 && this.item_2.removeChildren(),
        this.item_3 && this.item_3.removeChildren(),
        this.item_4 && this.item_4.removeChildren(),
        this.item_5 && this.item_5.removeChildren(),
        this.item_6 && this.item_6.removeChildren(),
        this.root && this.root.removeChildren(),
        this.removeChildren(),
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeUI, this),
        this.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onBarItemTap, this),
        this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetReward, this),
        MessageDispatcher.unregister(MsgActionDefine.DrawLotteryRes),
        this.parent.removeChild(this),
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Lottery.exml"),
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/LotteryItem.exml"),
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/TabButton.exml"),
        _Notification_.send(NotifyEnum.LOTTERY_UI_LOAD_END)
    }
}