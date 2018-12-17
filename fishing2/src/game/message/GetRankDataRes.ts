class GetRankDataRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["GetRankDataRes"];
  }
   public setRanklist(v) {this.msgBodyIns.set("ranklist", v);   }
   public getRanklist() {return this.msgBodyIns.get("ranklist");   }
}