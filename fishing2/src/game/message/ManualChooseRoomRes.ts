class ManualChooseRoomRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["ManualChooseRoomRes"];
  }
   public setServerInfo(v) {this.msgBodyIns.set("serverInfo", v);   }
   public getServerInfo() {return this.msgBodyIns.get("serverInfo");   }
   public setRoomInfo(v) {this.msgBodyIns.set("roomInfo", v);   }
   public getRoomInfo() {return this.msgBodyIns.get("roomInfo");   }
}