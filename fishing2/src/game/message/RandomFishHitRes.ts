class RandomFishHitRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["RandomFishHitRes"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setFishFunctionType(v) {this.msgBodyIns.set("fishFunctionType", v);   }
   public getFishFunctionType() {return this.msgBodyIns.get("fishFunctionType");   }
   public setFishId(v) {this.msgBodyIns.set("fishId", v);   }
   public getFishId() {return this.msgBodyIns.get("fishId");   }
   public setFishingHitback(v) {this.msgBodyIns.set("fishingHitback", v);   }
   public getFishingHitback() {return this.msgBodyIns.get("fishingHitback");   }
}