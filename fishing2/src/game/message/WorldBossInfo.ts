class WorldBossInfo extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["WorldBossInfo"];
  }
   public setBossId(v) {this.msgBodyIns.set("bossId", v);   }
   public getBossId() {return this.msgBodyIns.get("bossId");   }
   public setFishId(v) {this.msgBodyIns.set("fishId", v);   }
   public getFishId() {return this.msgBodyIns.get("fishId");   }
   public setState(v) {this.msgBodyIns.set("state", v);   }
   public getState() {return this.msgBodyIns.get("state");   }
   public setTime(v) {this.msgBodyIns.set("time", v);   }
   public getTime() {return this.msgBodyIns.get("time");   }
   public setShieldMax(v) {this.msgBodyIns.set("shieldMax", v);   }
   public getShieldMax() {return this.msgBodyIns.get("shieldMax");   }
   public setCurShieldValue(v) {this.msgBodyIns.set("curShieldValue", v);   }
   public getCurShieldValue() {return this.msgBodyIns.get("curShieldValue");   }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setItems(v) {this.msgBodyIns.set("items", v);   }
   public getItems() {return this.msgBodyIns.get("items");   }
}