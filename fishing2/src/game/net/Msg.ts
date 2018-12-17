class Msg {
	
	private static msgProtoStr = "message Msg{uint32 action=1; bytes msgBody=2; string token=3;string channelId = 4;uint32 liveRoomId = 5;}";
    private static MsgCls;
    private msgIns;

	private body;

	public constructor() {
		if (!Msg.MsgCls) {
            Msg.MsgCls = dcodeIO.ProtoBuf.loadProto(Msg.msgProtoStr).build("Msg");
        }
	}

	public toByteArray() {
        this.body && (this.msgIns.msgBody = this.body.toByteArray());
        var b = this.msgIns.toArrayBuffer();
        return new egret.ByteArray(b)
    }

	public initData() {
		this.msgIns = new Msg.MsgCls();
	}

    public setData(buf) {
        this.msgIns = Msg.MsgCls.decode(buf);
    }

	public setAction(e) {
        this.msgIns.action = e;
    }

    public getAction() {
        return this.msgIns.action;
    }

	public setMsgBody(e) {
        this.msgIns.msgBody = e;
    }

    public getMsgBody() {
        return this.msgIns.msgBody;
    }

	public setBody(e) {
        this.body = e;
    }

    public setToken(e) {
        this.msgIns.token = e;
    }

    public getToken() {
        return this.msgIns.token;
    }

    public setChannelId(e) {
        this.msgIns.channelId = e;
    }
    public getChannelId() {
        return this.msgIns.channelId;
    }

    public setLiveRoomId(e) {
        this.msgIns.liveRoomId = e;
    }
    public getLiveRoomId(e) {
        return this.msgIns.liveRoomId;
    }

}