class UpgradeOrForgeRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["UpgradeOrForgeRes"];
  }
   public setState(v) {this.msgBodyIns.set("state", v);   }
   public getState() {return this.msgBodyIns.get("state");   }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setAfterGunId(v) {this.msgBodyIns.set("afterGunId", v);   }
   public getAfterGunId() {return this.msgBodyIns.get("afterGunId");   }
   public setItemProto(v) {this.msgBodyIns.set("itemProto", v);   }
   public getItemProto() {return this.msgBodyIns.get("itemProto");   }
}