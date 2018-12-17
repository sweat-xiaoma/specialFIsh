class Coordinate extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["Coordinate"];
  }
   public setXvalue(v) {this.msgBodyIns.set("xvalue", v);   }
   public getXvalue() {return this.msgBodyIns.get("xvalue");   }
   public setYvalue(v) {this.msgBodyIns.set("yvalue", v);   }
   public getYvalue() {return this.msgBodyIns.get("yvalue");   }
}