class ChargeMediator extends SimpleMediator {
    public constructor(t) {
		super(t);
	}
    public onAdded () {
         super.onAdded.call(this);
        this.getView().initView()
    }
    public init () {
        // var e = this;
        // this.subscrib(NotifyEnum.BUY_CHARGE_ITEM, this.buyChargeItem);
        // MessageDispatcher.unregister(ResponseType.CHARGEBACK),
        // MessageDispatcher.register(ResponseType.CHARGEBACK,
        // function(t) {
        //     e.buyChargeItemBack(t)
        // }),
        // MessageDispatcher.register(ResponseType.CHANGEGUNBACK,
        // function(t) {
        //     e.changeGunBack(t)
        // })
    }
    public showList (e, t) {
        // var i = t.getView();
        // return null == e ? void i.showListByType(ChargeType.Gold) : void i.showListByType(Number(e))
    }
    public buyChargeItem (e, t) {
        // if (e.type == ChargeType.Ticket) if (CONFIG.PLATFORM_ID > 0) {
        //     var i = T_Charge_Table.getVoByKey(e.id);
        //     PaymentManager.pay(e.id, Number(i.price))
        // } else {
        //     var n = new ChargeSendMessage;
        //     n.initData(),
        //     n.setChargeId(e.id),
        //     NetManager.send(n)
        // } else {
        //     var a = T_Charge_Table.getVoByKey(e.id);
        //     if (a) {
        //         var o = Director.getModelByKey(UserModel),
        //         r = Number(a.price.split("_")[1]);
        //         if (o.getTicket() < r) GameUtil.openConfirmByTwoButton(null,
        //         function() {
        //             var e = t.getView();
        //             e.showListByType(ChargeType.Ticket)
        //         },
        //         t, Language.getText(204));
        //         else {
        //             var n = new ChargeSendMessage;
        //             n.initData(),
        //             n.setChargeId(e.id),
        //             NetManager.send(n)
        //         }
        //     }
        // }
    }
    public buyChargeItemBack (e) {
        // CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET && IsInPC() && CONFIG.IS_WEB && closeQrPayPanel();
        // var t = e.getState();
        // if (1 == t) {
        //     var i = e.getChargeId(),
        //     n = e.getIsFirst(),
        //     a = T_Charge_Table.getVoByKey(i),
        //     o = new Array,
        //     r = a.award.split("_"),
        //     s = Number(r[1]);
        //     if (1 == n && "0" != a.firstAward) {
        //         var l = a.firstAward.split("_"),
        //         u = new Item(Number(l[0]), Number(l[1]));
        //         o.push(u)
        //     }
        //     var d = new Item(Number(r[0]), s);
        //     o.push(d);
        //     var h = Number(e.getVipLevel()),
        //     c = T_VipLevel_Table.getVoByKey(h);
        //     if (c && "0" != c.couponBuyAdditionRatioByType) {
        //         var p = c.couponBuyAdditionRatioByType.split("_");
        //         if (Number(p[0]) == a.type) {
        //             var g = void 0;
        //             1 == a.type ? g = new Item(PropEnum.GOLD, Math.floor(s * Number(p[1]) / 100)) : 2 == a.type ? g = new Item(PropEnum.GEM, Math.floor(s * Number(p[1]) / 100)) : 3 == a.type && (g = new Item(PropEnum.TICKET, Math.floor(s * Number(p[1]) / 100))),
        //             o.push(g)
        //         }
        //     }
        //     GameUtil.openCommongain(null, o);
        //     var _ = Director.getModelByKey(UserModel);
        //     if (3 == a.type) {
        //         if (0 == _.getTatolChargeRMB()) {
        //             for (var y = T_Config_Table.getVoByKey(53).value, m = y.split(","), f = m.length, v = new Array, T = 0; f > T; T++) {
        //                 var I = m[T].split("_"),
        //                 E = Number(I[0]),
        //                 b = Number(I[1]),
        //                 C = new Item(E, b);
        //                 v.push(C);
        //                 var w = m[m.length - 1].split("_"),
        //                 x = new ChangeGunSendMessage;
        //                 x.initData(),
        //                 x.setType(ChangeGunState.CHANGE_SKIN),
        //                 x.setSkinId(Number(w[0])),
        //                 NetManager.send(x)
        //             }
        //             GameUtil.openCommongain(null, v),
        //             _.setTatolChargeRMB(s)
        //         }
        //         _.setTicket(e.getCurCoupon())
        //     }
        //     _.setVipLevel(h),
        //     _.setTatolChargeRMB(Number(e.getVipExp())),
        //     _.addChargedGears(i);
        //     var R = this.getView();
        //     R.showListByType(R._toType, !0),
        //     _Notification_.send(NotifyEnum.CHECN_VIP_ITEM)
        // } else GameUtil.popTips(Language.getText(173));
        // _Notification_.send(NotifyEnum.UPDATE_MAIN_DATA),
        // _Notification_.send(NotifyEnum.SET_PROP_NUM)
    }
    public changeGunBack (e) {
        // var t = e.getType(),
        // i = e.getState();
        // if (1 == i) {
        //     var n = Director.getModelByKey(UserModel);
        //     if (t != ChangeGunState.CHANGE_SKIN) return void(t == ChangeGunState.UNLOAD_ZUO && n.setCurGunBgId(0));
        //     var a = e.getSkinId(),
        //     o = T_Item_Table.getVoByKey(a);
        //     o.type == BagItemType.BATTERY ? n.setCurSkinId(a) : o.type == BagItemType.BARBETTE && n.setCurGunBgId(a)
        // }
    }
    public destroy () {
        this.getView().destroy(),
        this.unsubscribByType(NotifyEnum.BUY_CHARGE_ITEM);
        // MessageDispatcher.unregister(ResponseType.CHARGEBACK),
        // MessageDispatcher.unregister(ResponseType.CHANGEGUNBACK),
        // _Notification_.send(NotifyEnum.RE_REGIST_CHANGEGUNBACK)
    }
    
} 