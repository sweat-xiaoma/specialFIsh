class VipLevelUp extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["VipLevelUp"];
  }
   public setOldLevel(v) {this.msgBodyIns.set("oldLevel", v);   }
   public getOldLevel() {return this.msgBodyIns.get("oldLevel");   }
   public setNewLevel(v) {this.msgBodyIns.set("newLevel", v);   }
   public getNewLevel() {return this.msgBodyIns.get("newLevel");   }
}