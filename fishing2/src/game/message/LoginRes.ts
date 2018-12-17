class LoginRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["LoginRes"];
  }
   public setPlayerInfo(v) {this.msgBodyIns.set("playerInfo", v);   }
   public getPlayerInfo() {return this.msgBodyIns.get("playerInfo");   }
   public setTaskInfo(v) {this.msgBodyIns.set("taskInfo", v);   }
   public getTaskInfo() {return this.msgBodyIns.get("taskInfo");   }
   public setItemInfo(v) {this.msgBodyIns.set("itemInfo", v);   }
   public getItemInfo() {return this.msgBodyIns.get("itemInfo");   }
   public setSystemTime(v) {this.msgBodyIns.set("systemTime", v);   }
   public getSystemTime() {return this.msgBodyIns.get("systemTime");   }
   public setCanReliefTime(v) {this.msgBodyIns.set("canReliefTime", v);   }
   public getCanReliefTime() {return this.msgBodyIns.get("canReliefTime");   }
   public setEverydayActive(v) {this.msgBodyIns.set("everydayActive", v);   }
   public getEverydayActive() {return this.msgBodyIns.get("everydayActive");   }
   public setEveryWeekActive(v) {this.msgBodyIns.set("everyWeekActive", v);   }
   public getEveryWeekActive() {return this.msgBodyIns.get("everyWeekActive");   }
   public setNewbieGuideId(v) {this.msgBodyIns.set("newbieGuideId", v);   }
   public getNewbieGuideId() {return this.msgBodyIns.get("newbieGuideId");   }
   public setMonthSignActiveInfo(v) {this.msgBodyIns.set("monthSignActiveInfo", v);   }
   public getMonthSignActiveInfo() {return this.msgBodyIns.get("monthSignActiveInfo");   }
   public setIsTodayFirstLogin(v) {this.msgBodyIns.set("isTodayFirstLogin", v);   }
   public getIsTodayFirstLogin() {return this.msgBodyIns.get("isTodayFirstLogin");   }
   public setIsTodayDraw(v) {this.msgBodyIns.set("isTodayDraw", v);   }
   public getIsTodayDraw() {return this.msgBodyIns.get("isTodayDraw");   }
   public setSelfInviteCode(v) {this.msgBodyIns.set("selfInviteCode", v);   }
   public getSelfInviteCode() {return this.msgBodyIns.get("selfInviteCode");   }
}