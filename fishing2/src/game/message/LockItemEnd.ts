class LockItemEnd extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["LockItemEnd"];
  }
   public setItemId(v) {this.msgBodyIns.set("itemId", v);   }
   public getItemId() {return this.msgBodyIns.get("itemId");   }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
}