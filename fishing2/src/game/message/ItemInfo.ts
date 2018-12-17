class ItemInfo extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["ItemInfo"];
  }
   public setItemId(v) {this.msgBodyIns.set("itemId", v);   }
   public getItemId() {return this.msgBodyIns.get("itemId");   }
   public setTotalCount(v) {this.msgBodyIns.set("totalCount", v);   }
   public getTotalCount() {return this.msgBodyIns.get("totalCount");   }
   public setExpried(v) {this.msgBodyIns.set("expried", v);   }
   public getExpried() {return this.msgBodyIns.get("expried");   }
}