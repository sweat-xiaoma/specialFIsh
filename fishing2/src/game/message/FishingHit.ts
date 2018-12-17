class FishingHit extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["FishingHit"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setFishId(v) {this.msgBodyIns.set("fishId", v);   }
   public getFishId() {return this.msgBodyIns.get("fishId");   }
   public setGetItems(v) {this.msgBodyIns.set("getItems", v);   }
   public getGetItems() {return this.msgBodyIns.get("getItems");   }
}