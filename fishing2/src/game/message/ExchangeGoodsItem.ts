class ExchangeGoodsItem extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["ExchangeGoodsItem"];
  }
   public setId(v) {this.msgBodyIns.set("id", v);   }
   public getId() {return this.msgBodyIns.get("id");   }
   public setName(v) {this.msgBodyIns.set("name", v);   }
   public getName() {return this.msgBodyIns.get("name");   }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
   public setExchangePriceId(v) {this.msgBodyIns.set("exchangePriceId", v);   }
   public getExchangePriceId() {return this.msgBodyIns.get("exchangePriceId");   }
   public setExchangePrice(v) {this.msgBodyIns.set("exchangePrice", v);   }
   public getExchangePrice() {return this.msgBodyIns.get("exchangePrice");   }
   public setInstruction(v) {this.msgBodyIns.set("instruction", v);   }
   public getInstruction() {return this.msgBodyIns.get("instruction");   }
   public setMarketPrice(v) {this.msgBodyIns.set("marketPrice", v);   }
   public getMarketPrice() {return this.msgBodyIns.get("marketPrice");   }
   public setUrl(v) {this.msgBodyIns.set("url", v);   }
   public getUrl() {return this.msgBodyIns.get("url");   }
   public setMinVip(v) {this.msgBodyIns.set("minVip", v);   }
   public getMinVip() {return this.msgBodyIns.get("minVip");   }
   public setGoodsId(v) {this.msgBodyIns.set("goodsId", v);   }
   public getGoodsId() {return this.msgBodyIns.get("goodsId");   }
   public setGoodsNum(v) {this.msgBodyIns.set("goodsNum", v);   }
   public getGoodsNum() {return this.msgBodyIns.get("goodsNum");   }
   public setServerNum(v) {this.msgBodyIns.set("serverNum", v);   }
   public getServerNum() {return this.msgBodyIns.get("serverNum");   }
   public setLoopRecordColor(v) {this.msgBodyIns.set("loopRecordColor", v);   }
   public getLoopRecordColor() {return this.msgBodyIns.get("loopRecordColor");   }
   public setOrders(v) {this.msgBodyIns.set("orders", v);   }
   public getOrders() {return this.msgBodyIns.get("orders");   }
   public setMinGunId(v) {this.msgBodyIns.set("minGunId", v);   }
   public getMinGunId() {return this.msgBodyIns.get("minGunId");   }
   public setIsBling(v) {this.msgBodyIns.set("isBling", v);   }
   public getIsBling() {return this.msgBodyIns.get("isBling");   }
}