class QuitRoom extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["QuitRoom"];
  }
   public setPosition(v) {this.msgBodyIns.set("position", v);   }
   public getPosition() {return this.msgBodyIns.get("position");   }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
}