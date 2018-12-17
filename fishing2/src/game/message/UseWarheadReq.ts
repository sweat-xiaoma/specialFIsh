class UseWarheadReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["UseWarheadReq"];
  }
   public setItemId(v) {this.msgBodyIns.set("itemId", v);   }
   public getItemId() {return this.msgBodyIns.get("itemId");   }
   public setUniId(v) {this.msgBodyIns.set("uniId", v);   }
   public getUniId() {return this.msgBodyIns.get("uniId");   }
}