class Bankrupt extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["Bankrupt"];
  }
   public setState(v) {this.msgBodyIns.set("state", v);   }
   public getState() {return this.msgBodyIns.get("state");   }
   public setCanReliefTime(v) {this.msgBodyIns.set("canReliefTime", v);   }
   public getCanReliefTime() {return this.msgBodyIns.get("canReliefTime");   }
   public setCoins(v) {this.msgBodyIns.set("coins", v);   }
   public getCoins() {return this.msgBodyIns.get("coins");   }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
}