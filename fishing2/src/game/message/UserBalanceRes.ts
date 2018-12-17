class UserBalanceRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["UserBalanceRes"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setCoins(v) {this.msgBodyIns.set("coins", v);   }
   public getCoins() {return this.msgBodyIns.get("coins");   }
   public setGems(v) {this.msgBodyIns.set("gems", v);   }
   public getGems() {return this.msgBodyIns.get("gems");   }
}