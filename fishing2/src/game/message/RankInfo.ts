class RankInfo extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["RankInfo"];
  }
   public setRankOrder(v) {this.msgBodyIns.set("rankOrder", v);   }
   public getRankOrder() {return this.msgBodyIns.get("rankOrder");   }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setUserName(v) {this.msgBodyIns.set("userName", v);   }
   public getUserName() {return this.msgBodyIns.get("userName");   }
   public setHeadUrl(v) {this.msgBodyIns.set("headUrl", v);   }
   public getHeadUrl() {return this.msgBodyIns.get("headUrl");   }
   public setRankNum(v) {this.msgBodyIns.set("rankNum", v);   }
   public getRankNum() {return this.msgBodyIns.get("rankNum");   }
   public setAwardInfo(v) {this.msgBodyIns.set("awardInfo", v);   }
   public getAwardInfo() {return this.msgBodyIns.get("awardInfo");   }
}