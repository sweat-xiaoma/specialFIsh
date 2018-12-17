class FishingHitRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["FishingHitRes"];
  }
   public setFishingHit(v) {this.msgBodyIns.set("fishingHit", v);   }
   public getFishingHit() {return this.msgBodyIns.get("fishingHit");   }
}