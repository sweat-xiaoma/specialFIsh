class PlayerInfo extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["PlayerInfo"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setNickName(v) {this.msgBodyIns.set("nickName", v);   }
   public getNickName() {return this.msgBodyIns.get("nickName");   }
   public setIconUrl(v) {this.msgBodyIns.set("iconUrl", v);   }
   public getIconUrl() {return this.msgBodyIns.get("iconUrl");   }
   public setGems(v) {this.msgBodyIns.set("gems", v);   }
   public getGems() {return this.msgBodyIns.get("gems");   }
   public setCoins(v) {this.msgBodyIns.set("coins", v);   }
   public getCoins() {return this.msgBodyIns.get("coins");   }
   public setPosition(v) {this.msgBodyIns.set("position", v);   }
   public getPosition() {return this.msgBodyIns.get("position");   }
   public setGunId(v) {this.msgBodyIns.set("gunId", v);   }
   public getGunId() {return this.msgBodyIns.get("gunId");   }
   public setMaxGunId(v) {this.msgBodyIns.set("maxGunId", v);   }
   public getMaxGunId() {return this.msgBodyIns.get("maxGunId");   }
   public setItems(v) {this.msgBodyIns.set("items", v);   }
   public getItems() {return this.msgBodyIns.get("items");   }
   public setLockRelation(v) {this.msgBodyIns.set("lockRelation", v);   }
   public getLockRelation() {return this.msgBodyIns.get("lockRelation");   }
   public setRoleLevel(v) {this.msgBodyIns.set("roleLevel", v);   }
   public getRoleLevel() {return this.msgBodyIns.get("roleLevel");   }
   public setRoleExp(v) {this.msgBodyIns.set("roleExp", v);   }
   public getRoleExp() {return this.msgBodyIns.get("roleExp");   }
   public setVipLevel(v) {this.msgBodyIns.set("vipLevel", v);   }
   public getVipLevel() {return this.msgBodyIns.get("vipLevel");   }
   public setBatterySkinId(v) {this.msgBodyIns.set("batterySkinId", v);   }
   public getBatterySkinId() {return this.msgBodyIns.get("batterySkinId");   }
   public setGunrestSkinId(v) {this.msgBodyIns.set("gunrestSkinId", v);   }
   public getGunrestSkinId() {return this.msgBodyIns.get("gunrestSkinId");   }
   public setCoupon(v) {this.msgBodyIns.set("coupon", v);   }
   public getCoupon() {return this.msgBodyIns.get("coupon");   }
   public setTotalChargeRMB(v) {this.msgBodyIns.set("totalChargeRMB", v);   }
   public getTotalChargeRMB() {return this.msgBodyIns.get("totalChargeRMB");   }
   public setMonthEndTime(v) {this.msgBodyIns.set("monthEndTime", v);   }
   public getMonthEndTime() {return this.msgBodyIns.get("monthEndTime");   }
   public setMonthLastGetTime(v) {this.msgBodyIns.set("monthLastGetTime", v);   }
   public getMonthLastGetTime() {return this.msgBodyIns.get("monthLastGetTime");   }
   public setGunPow(v) {this.msgBodyIns.set("gunPow", v);   }
   public getGunPow() {return this.msgBodyIns.get("gunPow");   }
   public setSignWeek(v) {this.msgBodyIns.set("signWeek", v);   }
   public getSignWeek() {return this.msgBodyIns.get("signWeek");   }
   public setSignLog(v) {this.msgBodyIns.set("signLog", v);   }
   public getSignLog() {return this.msgBodyIns.get("signLog");   }
   public setLastLoginDate(v) {this.msgBodyIns.set("lastLoginDate", v);   }
   public getLastLoginDate() {return this.msgBodyIns.get("lastLoginDate");   }
   public setReliefAvailableTime(v) {this.msgBodyIns.set("reliefAvailableTime", v);   }
   public getReliefAvailableTime() {return this.msgBodyIns.get("reliefAvailableTime");   }
}