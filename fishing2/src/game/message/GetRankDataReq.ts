class GetRankDataReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["GetRankDataReq"];
  }
   public setRankType(v) {this.msgBodyIns.set("rankType", v);   }
   public getRankType() {return this.msgBodyIns.get("rankType");   }
}