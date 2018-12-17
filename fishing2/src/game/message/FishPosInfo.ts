class FishPosInfo extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["FishPosInfo"];
  }
   public setGroupId(v) {this.msgBodyIns.set("groupId", v);   }
   public getGroupId() {return this.msgBodyIns.get("groupId");   }
   public setFishId(v) {this.msgBodyIns.set("fishId", v);   }
   public getFishId() {return this.msgBodyIns.get("fishId");   }
   public setPos(v) {this.msgBodyIns.set("pos", v);   }
   public getPos() {return this.msgBodyIns.get("pos");   }
}