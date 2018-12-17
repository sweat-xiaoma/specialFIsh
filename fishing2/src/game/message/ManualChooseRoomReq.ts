class ManualChooseRoomReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["ManualChooseRoomReq"];
  }
   public setServerId(v) {this.msgBodyIns.set("serverId", v);   }
   public getServerId() {return this.msgBodyIns.get("serverId");   }
}