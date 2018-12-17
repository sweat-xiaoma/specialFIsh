class FishingHitReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["FishingHitReq"];
  }
   public setFishId(v) {this.msgBodyIns.set("fishId", v);   }
   public getFishId() {return this.msgBodyIns.get("fishId");   }
   public setBulletId(v) {this.msgBodyIns.set("bulletId", v);   }
   public getBulletId() {return this.msgBodyIns.get("bulletId");   }
   public setNettingFishs(v) {this.msgBodyIns.set("nettingFishs", v);   }
   public getNettingFishs() {return this.msgBodyIns.get("nettingFishs");   }
}