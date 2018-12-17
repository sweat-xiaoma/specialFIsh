class RankRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["RankRes"];
  }
   public setSelfRankInfo(v) {this.msgBodyIns.set("selfRankInfo", v);   }
   public getSelfRankInfo() {return this.msgBodyIns.get("selfRankInfo");   }
   public setRankInfo(v) {this.msgBodyIns.set("rankInfo", v);   }
   public getRankInfo() {return this.msgBodyIns.get("rankInfo");   }
}