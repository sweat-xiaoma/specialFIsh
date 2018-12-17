class IntoRoomReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["IntoRoomReq"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setAccount(v) {this.msgBodyIns.set("account", v);   }
   public getAccount() {return this.msgBodyIns.get("account");   }
   public setIdentity(v) {this.msgBodyIns.set("identity", v);   }
   public getIdentity() {return this.msgBodyIns.get("identity");   }
   public setRoomId(v) {this.msgBodyIns.set("roomId", v);   }
   public getRoomId() {return this.msgBodyIns.get("roomId");   }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
   public setPassword(v) {this.msgBodyIns.set("password", v);   }
   public getPassword() {return this.msgBodyIns.get("password");   }
}