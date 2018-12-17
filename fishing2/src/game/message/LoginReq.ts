class LoginReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["LoginReq"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setAccount(v) {this.msgBodyIns.set("account", v);   }
   public getAccount() {return this.msgBodyIns.get("account");   }
   public setPlatform(v) {this.msgBodyIns.set("platform", v);   }
   public getPlatform() {return this.msgBodyIns.get("platform");   }
   public setSecret(v) {this.msgBodyIns.set("secret", v);   }
   public getSecret() {return this.msgBodyIns.get("secret");   }
}