class BroadcastMessageList extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["BroadcastMessageList"];
  }
   public setMessageList(v) {this.msgBodyIns.set("messageList", v);   }
   public getMessageList() {return this.msgBodyIns.get("messageList");   }
}