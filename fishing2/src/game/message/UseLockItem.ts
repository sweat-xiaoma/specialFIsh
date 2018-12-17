class UseLockItem extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["UseLockItem"];
  }
   public setItemId(v) {this.msgBodyIns.set("itemId", v);   }
   public getItemId() {return this.msgBodyIns.get("itemId");   }
   public setFishId(v) {this.msgBodyIns.set("fishId", v);   }
   public getFishId() {return this.msgBodyIns.get("fishId");   }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setGunIndex(v) {this.msgBodyIns.set("gunIndex", v);   }
   public getGunIndex() {return this.msgBodyIns.get("gunIndex");   }
}