class SignMediator extends SimpleMediator{
   	public constructor(t) {
		super(t);
	}
    public onAdded() {
        super.onAdded.call(this);
        this.getView().initView();
        // var  n =  this.getModel(UserModel);
        // var a = n.getSignObj();
        // this.getView().setListData(a);
        
        // this.subscrib(NotifyEnum.SIGN_UI_LOADED, this.uiLoadEnd);
        // MessageDispatcher.register(MsgActionDefine.MONTHSIGNBACK,
        // function(e) {
        //     t.signBack(e)
        // })
      
    }
    public uiLoadEnd (e, t) {
        var i = t.getView();
        var  n = t.getModel(UserModel);
        var a = n.getSignObj();
        i.setListData(a)
    }
    public signBack (e) {
        var t = e.getState();
        if (1 == t || 2 == t) {
            var i = e.getMonthSignActiveInfo(),
            n = this.getModel(UserModel);
            n.setSignObj(i);
            var a = n.getSignObj(),
            o = this.getView();
            o.setListData(a);
            // 配置表修改
            // for (var r = a.getCumulativeSignTimes(), s = T_MonthSign_Table.getAllVo(), l = a.CurMonth(), u = s.length, d = null, h = 0; u > h; h++) s[h].month == l && s[h].date == r && (d = s[h]);
            // if (!d) return;
            // var c = d.award,
            // p = new Array,
            // g = c.split(",");
            // u = g.length;
            // for (var _ = d.vipMin,
            // y = Director.getModelByKey(UserModel), h = 0; u > h; h++) {
            //     var m = g[h].split("_");
            //     y.getVipLevel() >= _ && _ > 0 ? p.push(new Item(Number(m[0]), 2 * Number(m[1]), 0)) : p.push(new Item(Number(m[0]), Number(m[1]), 0))
            // }
            // return GameUtil.openCommongain(null, p),
            void _Notification_.send(NotifyEnum.CHECK_MAIN_ALERT)
        }
        if (0 == t) {
            var i = e.getMonthSignActiveInfo(),
            n = this.getModel(UserModel);
            n.setSignObj(i);
            var a = n.getSignObj(),
            o = this.getView();
            return void o.setListData(a)
        }
        switch (t) {
        case Sign_State.ACTIVE_MONTH_SIGN_STATE_NO_TOKEN_MAKED_UP:
            // GameUtil.openConfirmByTwoButton(null,
            // function() {
            //     var e = new ChargeView(ChargeType.Gem),
            //     t = new ChargeMediator(e);
            //     Director.pushView(t)
            // },
            // this, Language.getText(222));
            break;
        case Sign_State.ACTIVE_MONTH_SIGN_STATE_TYPE_ERROR:
            GameUtil.popTips(Language.getText(96));
            break;
        case Sign_State.ACTIVE_MONTH_SIGN_STATE_MAKED_UP_ERROR:
            GameUtil.popTips(Language.getText(97));
            break;
        case Sign_State.ACTIVE_MONTH_SIGN_STATE_MAKED_UP_TIMES_ERROR:
            GameUtil.popTips(Language.getText(98));
            break;
        case Sign_State.ACTIVE_MONTH_SIGN_STATE_MAKED_UP_BEFORE_SIGN_ERROR:
            GameUtil.popTips(Language.getText(109));
            break;
        case Sign_State.ACTIVE_MONTH_SIGN_STATE_MAKED_UP:
            GameUtil.popTips(Language.getText(110));
            break;
        case Sign_State.ACTIVE_MONTH_SIGN_STATE_SIGNED:
            GameUtil.popTips(Language.getText(111))
        }
    }
    public init () {}
    public destroy () {
        this.unsubscribByType(NotifyEnum.SIGN_UI_LOADED),
        // MessageDispatcher.unregisterByType(MsgActionDefine.MONTHSIGNBACK),
        this.getView().destroy()
    }
    
} 