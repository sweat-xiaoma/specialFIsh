class RoomInfoRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["RoomInfoRes"];
  }
   public setFlag(v) {this.msgBodyIns.set("flag", v);   }
   public getFlag() {return this.msgBodyIns.get("flag");   }
   public setPort(v) {this.msgBodyIns.set("port", v);   }
   public getPort() {return this.msgBodyIns.get("port");   }
   public setIp(v) {this.msgBodyIns.set("ip", v);   }
   public getIp() {return this.msgBodyIns.get("ip");   }
   public setRoomId(v) {this.msgBodyIns.set("roomId", v);   }
   public getRoomId() {return this.msgBodyIns.get("roomId");   }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
}