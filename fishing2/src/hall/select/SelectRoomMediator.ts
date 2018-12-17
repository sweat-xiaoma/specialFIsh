class SelectRoomMediator extends SimpleMediator {
    
    constructor(t) {
       super(t);
    }

    public onAdded() {
        super.onAdded();
        this.getView().initView(),
        this.subscrib(NotifyEnum.ROOMLIST_RESOUCE_LOADED, this.onResouceLoaded)
    }

    public onResouceLoaded(e:any, t:SelectRoomMediator) {
        MessageDispatcher.register(MsgActionDefine.ManualChooseRoomRes,
        function(e:any) {
            t.getRoomList(e)
        }),
        t.sendLeftRoom(-1)
    }

    /** 发送选择房间消息 */
    public sendLeftRoom = function(e) {
        var t = new ManualChooseRoomReq;
        t.initData(),
        t.setServerId(e),
        NetManager.send(t,MsgActionDefine.ManualChooseRoomReq)
    }

    /** 接收选择房间消息 */
    public getRoomList(e) {
        let view:SelectRoomView = this.getView();
        let serverInfo = e.getServerInfo();
        let roomInfo = e.getRoomInfo();
        if (serverInfo.length != 0){
            view.showLeftList(serverInfo);
            view.showRightList(roomInfo);
        } else if (1 == roomInfo.length){
            view.updateRightItem(roomInfo[0]);
        } 
        else {
            for (let o = 0; o < roomInfo.lenght; o++){
                view.updateRightItem(roomInfo[o])
            }    
        }
    }

    public destroy() {
        this.getView().destroy(),
        MessageDispatcher.unregister(MsgActionDefine.ManualChooseRoomRes),
        this.unsubscribByType(NotifyEnum.ROOMLIST_RESOUCE_LOADED)
    }
}