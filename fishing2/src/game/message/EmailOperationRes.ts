class EmailOperationRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["EmailOperationRes"];
  }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
   public setEmailId(v) {this.msgBodyIns.set("emailId", v);   }
   public getEmailId() {return this.msgBodyIns.get("emailId");   }
}