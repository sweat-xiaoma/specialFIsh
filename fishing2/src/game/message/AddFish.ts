class AddFish extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["AddFish"];
  }
   public setType(v) {this.msgBodyIns.set("type", v);   }
   public getType() {return this.msgBodyIns.get("type");   }
   public setFishId(v) {this.msgBodyIns.set("fishId", v);   }
   public getFishId() {return this.msgBodyIns.get("fishId");   }
   public setPathId(v) {this.msgBodyIns.set("pathId", v);   }
   public getPathId() {return this.msgBodyIns.get("pathId");   }
   public setUniId(v) {this.msgBodyIns.set("uniId", v);   }
   public getUniId() {return this.msgBodyIns.get("uniId");   }
   public setCoordinate(v) {this.msgBodyIns.set("coordinate", v);   }
   public getCoordinate() {return this.msgBodyIns.get("coordinate");   }
   public setAliveTime(v) {this.msgBodyIns.set("aliveTime", v);   }
   public getAliveTime() {return this.msgBodyIns.get("aliveTime");   }
}