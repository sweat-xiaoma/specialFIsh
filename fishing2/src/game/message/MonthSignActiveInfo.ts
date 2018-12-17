class MonthSignActiveInfo extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["MonthSignActiveInfo"];
  }
   public setCumulativeSignTimes(v) {this.msgBodyIns.set("cumulativeSignTimes", v);   }
   public getCumulativeSignTimes() {return this.msgBodyIns.get("cumulativeSignTimes");   }
   public setRemainMakeUpTimes(v) {this.msgBodyIns.set("remainMakeUpTimes", v);   }
   public getRemainMakeUpTimes() {return this.msgBodyIns.get("remainMakeUpTimes");   }
   public setIsTodaySign(v) {this.msgBodyIns.set("isTodaySign", v);   }
   public getIsTodaySign() {return this.msgBodyIns.get("isTodaySign");   }
   public setIsTodayMakeUp(v) {this.msgBodyIns.set("isTodayMakeUp", v);   }
   public getIsTodayMakeUp() {return this.msgBodyIns.get("isTodayMakeUp");   }
   public setCurMonth(v) {this.msgBodyIns.set("curMonth", v);   }
   public getCurMonth() {return this.msgBodyIns.get("curMonth");   }
}