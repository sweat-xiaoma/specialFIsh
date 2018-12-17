class ActiveConfigMessage extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["ActiveConfigMessage"];
  }
   public setId(v) {this.msgBodyIns.set("id", v);   }
   public getId() {return this.msgBodyIns.get("id");   }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
   public setStartTime(v) {this.msgBodyIns.set("startTime", v);   }
   public getStartTime() {return this.msgBodyIns.get("startTime");   }
   public setEndTime(v) {this.msgBodyIns.set("endTime", v);   }
   public getEndTime() {return this.msgBodyIns.get("endTime");   }
   public setActiveState(v) {this.msgBodyIns.set("activeState", v);   }
   public getActiveState() {return this.msgBodyIns.get("activeState");   }
   public setParameter1(v) {this.msgBodyIns.set("parameter1", v);   }
   public getParameter1() {return this.msgBodyIns.get("parameter1");   }
   public setParameter2(v) {this.msgBodyIns.set("parameter2", v);   }
   public getParameter2() {return this.msgBodyIns.get("parameter2");   }
   public setDescVip(v) {this.msgBodyIns.set("descVip", v);   }
   public getDescVip() {return this.msgBodyIns.get("descVip");   }
   public setNameUrl(v) {this.msgBodyIns.set("nameUrl", v);   }
   public getNameUrl() {return this.msgBodyIns.get("nameUrl");   }
   public setOrder(v) {this.msgBodyIns.set("order", v);   }
   public getOrder() {return this.msgBodyIns.get("order");   }
}