class SellItemReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["SellItemReq"];
  }
   public setSellitemId(v) {this.msgBodyIns.set("sellitemId", v);   }
   public getSellitemId() {return this.msgBodyIns.get("sellitemId");   }
   public setSellCount(v) {this.msgBodyIns.set("sellCount", v);   }
   public getSellCount() {return this.msgBodyIns.get("sellCount");   }
}