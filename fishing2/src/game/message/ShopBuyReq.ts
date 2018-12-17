class ShopBuyReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["ShopBuyReq"];
  }
   public setShopId(v) {this.msgBodyIns.set("shopId", v);   }
   public getShopId() {return this.msgBodyIns.get("shopId");   }
}