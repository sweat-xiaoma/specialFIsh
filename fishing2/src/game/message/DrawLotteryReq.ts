class DrawLotteryReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["DrawLotteryReq"];
  }
   public setGear(v) {this.msgBodyIns.set("gear", v);   }
   public getGear() {return this.msgBodyIns.get("gear");   }
}