class NoticeInfo extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["NoticeInfo"];
  }
   public setNoticeId(v) {this.msgBodyIns.set("noticeId", v);   }
   public getNoticeId() {return this.msgBodyIns.get("noticeId");   }
   public setNoticeTitle(v) {this.msgBodyIns.set("noticeTitle", v);   }
   public getNoticeTitle() {return this.msgBodyIns.get("noticeTitle");   }
   public setNoticeContent(v) {this.msgBodyIns.set("noticeContent", v);   }
   public getNoticeContent() {return this.msgBodyIns.get("noticeContent");   }
   public setNoticeType(v) {this.msgBodyIns.set("noticeType", v);   }
   public getNoticeType() {return this.msgBodyIns.get("noticeType");   }
}