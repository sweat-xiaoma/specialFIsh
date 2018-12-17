class MajorParameterChange extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["MajorParameterChange"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setCoins(v) {this.msgBodyIns.set("coins", v);   }
   public getCoins() {return this.msgBodyIns.get("coins");   }
   public setGems(v) {this.msgBodyIns.set("gems", v);   }
   public getGems() {return this.msgBodyIns.get("gems");   }
   public setLevel(v) {this.msgBodyIns.set("level", v);   }
   public getLevel() {return this.msgBodyIns.get("level");   }
   public setItem(v) {this.msgBodyIns.set("item", v);   }
   public getItem() {return this.msgBodyIns.get("item");   }
   public setCoupon(v) {this.msgBodyIns.set("coupon", v);   }
   public getCoupon() {return this.msgBodyIns.get("coupon");   }
   public setSignWeek(v) {this.msgBodyIns.set("signWeek", v);   }
   public getSignWeek() {return this.msgBodyIns.get("signWeek");   }
   public setSignLog(v) {this.msgBodyIns.set("signLog", v);   }
   public getSignLog() {return this.msgBodyIns.get("signLog");   }
   public setReliefAvailableTime(v) {this.msgBodyIns.set("reliefAvailableTime", v);   }
   public getReliefAvailableTime() {return this.msgBodyIns.get("reliefAvailableTime");   }
   public setMonthEndTime(v) {this.msgBodyIns.set("monthEndTime", v);   }
   public getMonthEndTime() {return this.msgBodyIns.get("monthEndTime");   }
   public setMonthLastGetTime(v) {this.msgBodyIns.set("monthLastGetTime", v);   }
   public getMonthLastGetTime() {return this.msgBodyIns.get("monthLastGetTime");   }
}