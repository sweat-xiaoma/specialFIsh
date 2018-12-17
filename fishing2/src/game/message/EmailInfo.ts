class EmailInfo extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["EmailInfo"];
  }
   public setEmailId(v) {this.msgBodyIns.set("emailId", v);   }
   public getEmailId() {return this.msgBodyIns.get("emailId");   }
   public setEmailTitle(v) {this.msgBodyIns.set("emailTitle", v);   }
   public getEmailTitle() {return this.msgBodyIns.get("emailTitle");   }
   public setEmailContent(v) {this.msgBodyIns.set("emailContent", v);   }
   public getEmailContent() {return this.msgBodyIns.get("emailContent");   }
   public setItemType(v) {this.msgBodyIns.set("itemType", v);   }
   public getItemType() {return this.msgBodyIns.get("itemType");   }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
   public setItemInfo(v) {this.msgBodyIns.set("itemInfo", v);   }
   public getItemInfo() {return this.msgBodyIns.get("itemInfo");   }
   public setExpire(v) {this.msgBodyIns.set("expire", v);   }
   public getExpire() {return this.msgBodyIns.get("expire");   }
}