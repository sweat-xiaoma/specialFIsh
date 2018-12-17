class LoopExchangeRecord extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["LoopExchangeRecord"];
  }
   public setExchangeGoodsId(v) {this.msgBodyIns.set("exchangeGoodsId", v);   }
   public getExchangeGoodsId() {return this.msgBodyIns.get("exchangeGoodsId");   }
   public setPhone(v) {this.msgBodyIns.set("phone", v);   }
   public getPhone() {return this.msgBodyIns.get("phone");   }
   public setTime(v) {this.msgBodyIns.set("time", v);   }
   public getTime() {return this.msgBodyIns.get("time");   }
}