class EmailListRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["EmailListRes"];
  }
   public setTotalNum(v) {this.msgBodyIns.set("totalNum", v);   }
   public getTotalNum() {return this.msgBodyIns.get("totalNum");   }
   public setEmailInfo(v) {this.msgBodyIns.set("emailInfo", v);   }
   public getEmailInfo() {return this.msgBodyIns.get("emailInfo");   }
}