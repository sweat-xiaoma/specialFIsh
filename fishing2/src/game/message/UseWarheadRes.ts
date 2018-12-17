class UseWarheadRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["UseWarheadRes"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setUniId(v) {this.msgBodyIns.set("uniId", v);   }
   public getUniId() {return this.msgBodyIns.get("uniId");   }
   public setAddCoins(v) {this.msgBodyIns.set("addCoins", v);   }
   public getAddCoins() {return this.msgBodyIns.get("addCoins");   }
}