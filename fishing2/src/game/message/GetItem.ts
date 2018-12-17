class GetItem extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["GetItem"];
  }
   public setItemId(v) {this.msgBodyIns.set("itemId", v);   }
   public getItemId() {return this.msgBodyIns.get("itemId");   }
   public setCount(v) {this.msgBodyIns.set("count", v);   }
   public getCount() {return this.msgBodyIns.get("count");   }
   public setExpried(v) {this.msgBodyIns.set("expried", v);   }
   public getExpried() {return this.msgBodyIns.get("expried");   }
}