class ChangeGunRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["ChangeGunRes"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
   public setGunId(v) {this.msgBodyIns.set("gunId", v);   }
   public getGunId() {return this.msgBodyIns.get("gunId");   }
   public setSkinId(v) {this.msgBodyIns.set("skinId", v);   }
   public getSkinId() {return this.msgBodyIns.get("skinId");   }
   public setState(v) {this.msgBodyIns.set("state", v);   }
   public getState() {return this.msgBodyIns.get("state");   }
   public setPower(v) {this.msgBodyIns.set("power", v);   }
   public getPower() {return this.msgBodyIns.get("power");   }
}