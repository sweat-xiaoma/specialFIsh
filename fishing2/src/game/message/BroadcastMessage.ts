class BroadcastMessage extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["BroadcastMessage"];
  }
   public setBroadType(v) {this.msgBodyIns.set("broadType", v);   }
   public getBroadType() {return this.msgBodyIns.get("broadType");   }
   public setMsg(v) {this.msgBodyIns.set("msg", v);   }
   public getMsg() {return this.msgBodyIns.get("msg");   }
   public setLangId(v) {this.msgBodyIns.set("langId", v);   }
   public getLangId() {return this.msgBodyIns.get("langId");   }
   public setParams(v) {this.msgBodyIns.set("params", v);   }
   public getParams() {return this.msgBodyIns.get("params");   }
   public setPriority(v) {this.msgBodyIns.set("priority", v);   }
   public getPriority() {return this.msgBodyIns.get("priority");   }
}