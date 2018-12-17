class LotteryConditonAccumulate extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["LotteryConditonAccumulate"];
  }
   public setIntegral(v) {this.msgBodyIns.set("integral", v);   }
   public getIntegral() {return this.msgBodyIns.get("integral");   }
   public setKillNum(v) {this.msgBodyIns.set("killNum", v);   }
   public getKillNum() {return this.msgBodyIns.get("killNum");   }
   public setTodayDrawTimes(v) {this.msgBodyIns.set("todayDrawTimes", v);   }
   public getTodayDrawTimes() {return this.msgBodyIns.get("todayDrawTimes");   }
}