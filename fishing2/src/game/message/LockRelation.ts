class LockRelation extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["LockRelation"];
  }
   public setGunIndex(v) {this.msgBodyIns.set("gunIndex", v);   }
   public getGunIndex() {return this.msgBodyIns.get("gunIndex");   }
   public setFishId(v) {this.msgBodyIns.set("fishId", v);   }
   public getFishId() {return this.msgBodyIns.get("fishId");   }
}