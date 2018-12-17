class ExchangeGoodsRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["ExchangeGoodsRes"];
  }
   public setItemList(v) {this.msgBodyIns.set("itemList", v);   }
   public getItemList() {return this.msgBodyIns.get("itemList");   }
}