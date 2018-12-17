class CommonStatus extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["CommonStatus"];
  }
   public setCode(v) {this.msgBodyIns.set("code", v);   }
   public getCode() {return this.msgBodyIns.get("code");   }
   public setMsg(v) {this.msgBodyIns.set("msg", v);   }
   public getMsg() {return this.msgBodyIns.get("msg");   }
}