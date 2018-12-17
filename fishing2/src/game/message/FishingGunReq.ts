class FishingGunReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["FishingGunReq"];
  }
   public setAngle(v) {this.msgBodyIns.set("angle", v);   }
   public getAngle() {return this.msgBodyIns.get("angle");   }
   public setGunIndex(v) {this.msgBodyIns.set("gunIndex", v);   }
   public getGunIndex() {return this.msgBodyIns.get("gunIndex");   }
   public setBulletId(v) {this.msgBodyIns.set("bulletId", v);   }
   public getBulletId() {return this.msgBodyIns.get("bulletId");   }
}