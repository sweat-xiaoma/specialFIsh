class GetReliefMoneyReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["GetReliefMoneyReq"];
  }
}