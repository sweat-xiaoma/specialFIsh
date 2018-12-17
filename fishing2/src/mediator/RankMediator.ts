class RankMediator extends SimpleMediator {
    public constructor(t) {
        super(t);
    }

    public onAdded() {
        var t = this;
        super.onAdded();
        this.subscrib(NotifyEnum.SET_RANK_LIST, this.showList),
            MessageDispatcher.register(MsgActionDefine.RankRes,
                function (e) {
                    t.getRankData(e)
                }),
            this.getView().initView()
    }

    public getRankData(e: RankRes) {
        console.log("接收到排行榜返回消息");

        var l: RankView = this.getView();
        l.changeList(e.getRankInfo());
        l.setUserInfo(e.getSelfRankInfo());
    }

    public showList(e, t) {
        var rankMsg = new RankReq();
        rankMsg.initData();
        rankMsg.setType(e.type);
        NetManager.send(rankMsg, MsgActionDefine.RankReq);
    }

    public init() { }

    public destroy() {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.SET_RANK_LIST);
        MessageDispatcher.unregister(MsgActionDefine.RankRes);
    }
}