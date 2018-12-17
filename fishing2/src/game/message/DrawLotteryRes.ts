class DrawLotteryRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["DrawLotteryRes"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setState(v) {this.msgBodyIns.set("state", v);   }
   public getState() {return this.msgBodyIns.get("state");   }
   public setItemIndex(v) {this.msgBodyIns.set("itemIndex", v);   }
   public getItemIndex() {return this.msgBodyIns.get("itemIndex");   }
}