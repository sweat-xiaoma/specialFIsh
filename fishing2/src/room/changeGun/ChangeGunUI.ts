class ChangeGunUI extends eui.Component{

    public listGroup:eui.Group;
    public closeBtn:eui.Button;
    public root:eui.Group;

    public constructor() {
		super();
	}

    public setData = function(e) {
        var t = this;
        if (e) {
            this._nChargeID = e.id;
            var i = Director.getModelByKey(UserModel);
            if (this.sendLab.textAlign = egret.HorizontalAlign.CENTER, i.isCharged(this._nChargeID) || "0" == e.firstAward) 
                this.firstGroup.visible = !1;
            else {
                this.firstGroup.visible = !0;
                var n = e.firstAward.split("_"),
                a = Number(n[0]),
                o = Number(n[1]);
                switch (a) {
                case PropEnum.GOLD:
                    this.img_10001.visible = !0,
                    this.img_10002.visible = !1,
                    this.img_10012.visible = !1,
                    o > 1e4 ? CONFIG.LANGUAGE == LanguageType.TW_Chinese ? this.sendLab.text = o / 1e4 + "萬": this.sendLab.text = o / 1e4 + "万": this.sendLab.text = o + "";
                    break;
                case PropEnum.GEM:
                    this.img_10001.visible = !1,
                    this.img_10002.visible = !0,
                    this.img_10012.visible = !1,
                    this.sendLab.text = o + "";
                    break;
                case PropEnum.TICKET:
                    this.img_10001.visible = !1,
                    this.img_10002.visible = !1,
                    this.img_10012.visible = !0,
                    this.sendLab.text = o + ""
                }
            }
            this._nType = e.type,
            IconUtil.getIconByIdAsync(IconType.CHARGE, Number(e.res),
            function(e) {
                e.anchorOffsetX = e.width / 2,
                e.anchorOffsetY = e.height / 2,
                e.x = t.iconGroup.width / 2 + 5,
                e.y = t.iconGroup.height / 2 + 5,
                t.iconGroup.addChild(e)
            }),
            this.desc.text = Language.getText(e.desc),
            this.sureGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this),
            this._touchObj = new UIWrap(this.sureGroup);
            var r = new egret.BitmapText;
            RES.getResAsync("chargeNum_fnt",
            function(i, n) {
                if (r.font = i, 3 == e.type) {
                    RES.getResAsync("R_FuHao_png",
                    function() {
                        var e = new egret.Bitmap(RES.getRes("R_FuHao_png"));
                        e.anchorOffsetX = e.width >> 1,
                        e.anchorOffsetY = e.height >> 1,
                        t.priceTypeGroup.addChild(e)
                    },
                    t),
                    r.text = Number(e.price) / 100 + "",
                    r.textAlign = egret.HorizontalAlign.LEFT,
                    r.anchorOffsetX = r.width >> 1,
                    r.anchorOffsetY = r.height >> 1,
                    t.priceGroup.addChild(r);
                    var a = e.price.split("_"),
                    o = Number(a[0]),
                    s = Number(a[1]);
                    if (PropEnum.GOLD == o) {
                        var l = new egret.Bitmap(RES.getRes("common_coins_png"));
                        l.anchorOffsetX = l.width >> 1,
                        l.anchorOffsetY = l.height >> 1,
                        l.scaleX = l.scaleY = .4,
                        t.priceTypeGroup.addChild(l)
                    } else if (PropEnum.GEM == o) {
                        var l = new egret.Bitmap(RES.getRes("common_diamond_png"));
                        l.anchorOffsetX = l.width >> 1,
                        l.anchorOffsetY = l.height >> 1,
                        l.scaleX = l.scaleY = .4,
                        t.priceTypeGroup.addChild(l)
                    } else if (PropEnum.TICKET == o) {
                        var l = new egret.Bitmap(RES.getRes("common_point_ticket_png"));
                        l.anchorOffsetX = l.width >> 1,
                        l.anchorOffsetY = l.height >> 1,
                        l.scaleX = l.scaleY = .4,
                        t.priceTypeGroup.addChild(l)
                    }
                } else {
                    var a = e.price.split("_"),
                    o = Number(a[0]),
                    s = Number(a[1]);
                    if (PropEnum.GOLD == o) {
                        var l = new egret.Bitmap(RES.getRes("common_coins_png"));
                        l.anchorOffsetX = l.width >> 1,
                        l.anchorOffsetY = l.height >> 1,
                        l.scaleX = l.scaleY = .4,
                        t.priceTypeGroup.addChild(l)
                    } else if (PropEnum.GEM == o) {
                        var l = new egret.Bitmap(RES.getRes("common_diamond_png"));
                        l.anchorOffsetX = l.width >> 1,
                        l.anchorOffsetY = l.height >> 1,
                        l.scaleX = l.scaleY = .4,
                        t.priceTypeGroup.addChild(l)
                    } else if (PropEnum.TICKET == o) {
                        var l = new egret.Bitmap(RES.getRes("common_point_ticket_png"));
                        l.anchorOffsetX = l.width >> 1,
                        l.anchorOffsetY = l.height >> 1,
                        l.scaleX = l.scaleY = .4,
                        t.priceTypeGroup.addChild(l)
                    }
                    r.text = s + "",
                    r.textAlign = egret.HorizontalAlign.LEFT,
                    r.anchorOffsetX = r.width >> 1,
                    r.anchorOffsetY = r.height >> 1,
                    t.priceGroup.addChild(r)
                }
            },
            this)
        }
    }
    private sureGroup;
    private _nType;
    private _nChargeID;
    public onBuyClick(e) {
        // if (4 == this._nType) {
        //     Director.popView();
        //     var t = new MonthCardView,
        //     i = new MonthCardMediator(t);
        //     return void Director.pushView(i)
        // }
       _Notification_.send(NotifyEnum.BUY_CHARGE_ITEM, {
            id: this._nChargeID,
            type: this._nType
        })
    }
    public clearItem () {
        this.sureGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this)
    }
}

