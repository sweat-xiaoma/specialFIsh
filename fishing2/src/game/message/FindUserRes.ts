class FindUserRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["FindUserRes"];
  }
   public setState(v) {this.msgBodyIns.set("state", v);   }
   public getState() {return this.msgBodyIns.get("state");   }
   public setReceiveUserName(v) {this.msgBodyIns.set("receiveUserName", v);   }
   public getReceiveUserName() {return this.msgBodyIns.get("receiveUserName");   }
}