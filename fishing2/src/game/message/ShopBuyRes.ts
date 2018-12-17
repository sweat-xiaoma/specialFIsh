class ShopBuyRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["ShopBuyRes"];
  }
   public setState(v) {this.msgBodyIns.set("state", v);   }
   public getState() {return this.msgBodyIns.get("state");   }
}