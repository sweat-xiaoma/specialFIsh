class UseItemReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["UseItemReq"];
  }
   public setItemId(v) {this.msgBodyIns.set("itemId", v);   }
   public getItemId() {return this.msgBodyIns.get("itemId");   }
}