class ChangeGunReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["ChangeGunReq"];
  }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
   public setSkinId(v) {this.msgBodyIns.set("skinId", v);   }
   public getSkinId() {return this.msgBodyIns.get("skinId");   }
   public setChangeValue(v) {this.msgBodyIns.set("changeValue", v);   }
   public getChangeValue() {return this.msgBodyIns.get("changeValue");   }
}