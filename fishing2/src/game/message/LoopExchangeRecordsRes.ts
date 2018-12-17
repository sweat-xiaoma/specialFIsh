class LoopExchangeRecordsRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["LoopExchangeRecordsRes"];
  }
   public setRecordList(v) {this.msgBodyIns.set("recordList", v);   }
   public getRecordList() {return this.msgBodyIns.get("recordList");   }
}