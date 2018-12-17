class IntoRoomRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["IntoRoomRes"];
  }
   public setFlag(v) {this.msgBodyIns.set("flag", v);   }
   public getFlag() {return this.msgBodyIns.get("flag");   }
   public setPlayerInfo(v) {this.msgBodyIns.set("playerInfo", v);   }
   public getPlayerInfo() {return this.msgBodyIns.get("playerInfo");   }
}