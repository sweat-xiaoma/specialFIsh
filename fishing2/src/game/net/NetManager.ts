class NetManager {
	public constructor() {
		throw new SimpleError("NetManager can't call constructor!")
	}

    private static lastIp:string;
    private static lastPort:number;
    private static reconnNum:number = 0;

	public static initNet(server, port, onOpen) {
        MsgActionDefine.init();
        CONFIG.IS_PRINT_LOG && console.log("initNet: ip="+server, "port="+port);
        SocketManager.initSocket(server, port, egret.WebSocket.TYPE_BINARY, onOpen, NetManager.onReceive, NetManager.onClosed);
        NetManager.lastIp = server;
        NetManager.lastPort = port;
    }

    public static resetNet(server, port, onOpen) {
        SocketManager.resetSocket();
        CONFIG.IS_PRINT_LOG && console.log("resetNet: ip="+server, "port="+port);
        SocketManager.initSocket(server, port, egret.WebSocket.TYPE_BINARY, onOpen, NetManager.onReceive, NetManager.onClosed);
        NetManager.lastIp = server;
        NetManager.lastPort = port;
    }

    /** 发送消息 单条 */
    public static send(e:MessageBase, act) {
        // var ms:Msgs = new Msgs();
        // ms.initData();

        // var msg:Msg[] = [];
        var m:Msg = new Msg();
        m.initData();
        m.setAction(act);
        m.setToken(CONFIG.msgToken);
        m.setChannelId(CONFIG.CHANNEL_ID);
        m.setLiveRoomId(CONFIG.liveRoomId);
        m.setBody(e);
        // msg.push(m);
        // ms.setMsgs(msg);
        CONFIG.IS_PRINT_LOG && console.log(">>>snd"+egret.getTimer()+": act="+act,"token="+m.getToken(),e.toJson());
        SocketManager.send(m.toByteArray());
    }

    public static onOpen() {}

    public static reconn2server() {
        NetManager.reconnNum = 0;
        GameUtil.openConfirm(null,
                function() {
                    CONFIG.IS_PRINT_LOG && console.log("reconn2server: ip="+CONFIG.SERVER_IP, "port="+CONFIG.SERVER_PORT);
                    NetManager.resetNet(CONFIG.SERVER_IP, CONFIG.SERVER_PORT,
                        function() {
                            GlobalManager.getInstance().reConnect2Server();
                        });
                }, this, Language.getText(64));
    }

    public static reconn2room() {
        //不提示, 5秒自动重连
        setTimeout(
            function() {
                CONFIG.IS_PRINT_LOG && console.log("reconn2room: ip="+NetManager.lastIp, "port="+NetManager.lastPort);
                NetManager.resetNet(NetManager.lastIp, NetManager.lastPort,
                    function() {
                        GlobalManager.getInstance().reConnect2Room();
                    });
        }, 5000);
    }

    public static onClosed() {
        CONFIG.IS_PRINT_LOG && console.log("*****onClosed..."+NetManager.lastIp +":"+ CONFIG.SERVER_IP);
        if (NetManager.lastIp != CONFIG.SERVER_IP || NetManager.lastPort != CONFIG.SERVER_PORT) {
            NetManager.reconnNum++;
            if (NetManager.reconnNum > 3) {
                NetManager.reconnNum = 0;
                NetManager.reconn2server();
            } else {
                NetManager.reconn2room();
            }
        } else {
            NetManager.reconnNum = 0;
            NetManager.reconn2server();
        }
    }

    /**接收消息 数组 */
    public static onReceive(e) {
        var buf:egret.ByteArray = new egret.ByteArray();
        e.readBytes(buf);
        var m:Msgs = new Msgs();
        m.setData(buf.rawBuffer);
        var msgs:any[] = m.getMsgs();
        for (var i= 0; i<msgs.length;i++){
            NetManager.onReceiveMsg(msgs[i]);
        }
    }

    public static onReceiveMsg(e) {
        var m:Msg = e;
        if (!m.getMsgBody()) m.setMsgBody(new ArrayBuffer(0));
        var act = m.getAction();
        var cls = MsgActionDefine.responseList.get(act);
        var d;
        if (cls instanceof MessageBase) {
            d = cls;
        } else {
            d = new cls();
        }
		d.setData(m.getMsgBody());
        (CONFIG.IS_PRINT_LOG) && console.log("<<<rcv"+egret.getTimer()+": act="+act,d.toJson());
        // (CONFIG.IS_PRINT_LOG && act!=1037) && console.log("<<<rcv:act="+act,d.toJson());
        // (CONFIG.IS_PRINT_LOG && act!=1037 && act!=1032) && console.log("<<<rcv:act="+act,d.toJson());
        MessageDispatcher.dispatch(act, d);
    }

	public static _net = null;
	public static MESSAGE_LEN = 131072;
}