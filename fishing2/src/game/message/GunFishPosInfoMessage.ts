class GunFishPosInfoMessage extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["GunFishPosInfoMessage"];
  }
   public setFishPostList(v) {this.msgBodyIns.set("fishPostList", v);   }
   public getFishPostList() {return this.msgBodyIns.get("fishPostList");   }
}