class LevelUp extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["LevelUp"];
  }
   public setOldLevel(v) {this.msgBodyIns.set("oldLevel", v);   }
   public getOldLevel() {return this.msgBodyIns.get("oldLevel");   }
   public setNewLevel(v) {this.msgBodyIns.set("newLevel", v);   }
   public getNewLevel() {return this.msgBodyIns.get("newLevel");   }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
}