class ItemShopMediator extends SimpleMediator {
	public constructor(t) {
		super(t);
	}

	public onAdded() {
		super.onAdded();
        this.getView().initView();
    }

    public init() {
        var e = this;
        this.subscrib(NotifyEnum.SHOP_BUY_ITEM, this.buyItem);
        MessageDispatcher.register(MsgActionDefine.ShopBuyRes,
        function(t) {
            e.shopBuyBack(t)
        })
    }

    public buyItem(e, t) {
        var i:ShopBuyReq = new ShopBuyReq();
        i.initData(),
        i.setShopId(Number(e.itemId)),
        NetManager.send(i, MsgActionDefine.ShopBuyReq);
    }

    public shopBuyBack(e) {
        var t = e.getState();
        switch (t) {
        case 0:
            GameUtil.openConfirmByTwoButton(null,
            function() {
                // var e = new ChargeView(ChargeType.Ticket),
                // t = new ChargeMediator(e);
                // Director.pushView(t);
            },
            this, Language.getText(204));   //点券不足，是否前往去购买点券
            break;
        case 1:
            GameUtil.popTips("购买成功"),
            _Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
            break;
        case 2:
            GameUtil.popTips("背包已满")
        }
        _Notification_.send(NotifyEnum.UPDATE_MAIN_DATA)
    }

    public destroy() {
        this.unsubscribByType(NotifyEnum.SHOP_BUY_ITEM);
        MessageDispatcher.unregister(MsgActionDefine.ShopBuyRes);
        this.getView().destroy();
    }
}