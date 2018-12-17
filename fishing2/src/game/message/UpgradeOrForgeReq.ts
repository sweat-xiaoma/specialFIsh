class UpgradeOrForgeReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["UpgradeOrForgeReq"];
  }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
}