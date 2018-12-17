class Msgs extends MessageBase {
	
	private static msgProtoStr = "message Msgs{repeated Msg msgList = 1;}";
    private MsgCls; // 消息类
    private msgIns; // 消息对象

    private msgList:any[];  // 消息字段

	public constructor() {
        super();
        if (!MessageBase.appModel) MessageBase.initModule();
        this.msgBodyCls = MessageBase.appModel["Msgs"];
	}

   public setMsgs(v) {
       this.msgBodyIns.msgList = v;  
    }
   public getMsgs() {
       return this.msgBodyIns.msgList;
    } 
}