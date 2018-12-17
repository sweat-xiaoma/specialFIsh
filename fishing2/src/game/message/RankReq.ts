class RankReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["RankReq"];
  }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
}