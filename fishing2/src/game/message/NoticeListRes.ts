class NoticeListRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["NoticeListRes"];
  }
   public setNoticeInfo(v) {this.msgBodyIns.set("noticeInfo", v);   }
   public getNoticeInfo() {return this.msgBodyIns.get("noticeInfo");   }
}