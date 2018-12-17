class ActiveConfigMessageListRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["ActiveConfigMessageListRes"];
  }
   public setMessageList(v) {this.msgBodyIns.set("messageList", v);   }
   public getMessageList() {return this.msgBodyIns.get("messageList");   }
}