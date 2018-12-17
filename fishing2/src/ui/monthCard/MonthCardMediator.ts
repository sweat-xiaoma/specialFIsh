class MonthCardMediator extends SimpleMediator{
   	public constructor(t) {
		super(t);
	}
    public onAdded () {
        super.onAdded.call(this),
        this.getView().initView();
        var i = this.getModel(UserModel);
        i.bOpenedMonthUI = !0;
        // MessageDispatcher.register(MsgActionDefine.CHARGEBACK,
        // function(e) {
        //     t.buyChargeItemBack(e)
        // })
    }

    
    public buyChargeItemBack(e) {
        var t = e.getState();
        if (1 == t) {
            for (var i = T_Charge_Table.getAllVo(), n = i.length, a = null, o = 0; n > o; o++) if (4 == i[o].type) {
                a = i[o];
                break
            }
            var r = a.price.split("_"),
            s = "";
            10012 == r[0] && (s = r[1] + "点券");
            var l = this;
            GameUtil.openConfirmByTwoButton(null,
            function() {
                var t = e.getChargeId(),
                i = (T_Charge_Table.getVoByKey(t), l.getModel(UserModel));
                if (i.getMonthEndTime() - TimeUtil.getCurrTime() > 0) GameUtil.openConfirm(null, null, this, Language.getText(2422));
                else {
                    // var n = new MonthCardRewardView(!0),
                    // a = new MonthCardRewardMediator(n);
                    // Director.pushView(a)
                }
                i.setTicket(e.getCurCoupon()),
                i.setMonthEndTime(e.getMonthEndTime());
                var o = l.getView();
                o.setData()
            },
            l, Language.getDynamicText(125, [s]))
        } else 3 == t && GameUtil.openConfirmByTwoButton(null,
        function() {
            // var e = new ChargeView(ChargeType.Ticket),
            // t = new ChargeMediator(e);
            // Director.pushView(t)
        },
        this, Language.getText(204));
        _Notification_.send(NotifyEnum.UPDATE_MAIN_DATA)
    }
    public init() {};
    public update () {
        // var e = this;
        // MessageDispatcher.unregister(ResponseType.CHARGEBACK),
        // MessageDispatcher.register(ResponseType.CHARGEBACK,
        // function(t) {
        //     e.buyChargeItemBack(t)
        // })
    }
    public destroy () {
        // MessageDispatcher.unregister(ResponseType.CHARGEBACK),
        // this.getView().destroy()
    }
}
