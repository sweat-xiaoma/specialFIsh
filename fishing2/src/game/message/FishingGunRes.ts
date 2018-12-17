class FishingGunRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["FishingGunRes"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setGun(v) {this.msgBodyIns.set("gun", v);   }
   public getGun() {return this.msgBodyIns.get("gun");   }
}