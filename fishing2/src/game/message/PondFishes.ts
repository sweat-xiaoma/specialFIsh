class PondFishes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["PondFishes"];
  }
   public setFishes(v) {this.msgBodyIns.set("fishes", v);   }
   public getFishes() {return this.msgBodyIns.get("fishes");   }
}