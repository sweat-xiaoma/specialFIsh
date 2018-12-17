class RoomServerInfo extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["RoomServerInfo"];
  }
   public setServerId(v) {this.msgBodyIns.set("serverId", v);   }
   public getServerId() {return this.msgBodyIns.get("serverId");   }
   public setState(v) {this.msgBodyIns.set("state", v);   }
   public getState() {return this.msgBodyIns.get("state");   }
}