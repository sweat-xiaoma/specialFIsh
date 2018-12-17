class RankDataMessage extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["RankDataMessage"];
  }
   public setRankType(v) {this.msgBodyIns.set("rankType", v);   }
   public getRankType() {return this.msgBodyIns.get("rankType");   }
   public setRank(v) {this.msgBodyIns.set("rank", v);   }
   public getRank() {return this.msgBodyIns.get("rank");   }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setRoleLevel(v) {this.msgBodyIns.set("roleLevel", v);   }
   public getRoleLevel() {return this.msgBodyIns.get("roleLevel");   }
   public setVipLevel(v) {this.msgBodyIns.set("vipLevel", v);   }
   public getVipLevel() {return this.msgBodyIns.get("vipLevel");   }
   public setRankValue(v) {this.msgBodyIns.set("rankValue", v);   }
   public getRankValue() {return this.msgBodyIns.get("rankValue");   }
   public setName(v) {this.msgBodyIns.set("name", v);   }
   public getName() {return this.msgBodyIns.get("name");   }
   public setIconUrl(v) {this.msgBodyIns.set("iconUrl", v);   }
   public getIconUrl() {return this.msgBodyIns.get("iconUrl");   }
}