class RoomInfo extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["RoomInfo"];
  }
   public setRoomId(v) {this.msgBodyIns.set("roomId", v);   }
   public getRoomId() {return this.msgBodyIns.get("roomId");   }
   public setUserCount(v) {this.msgBodyIns.set("userCount", v);   }
   public getUserCount() {return this.msgBodyIns.get("userCount");   }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
}