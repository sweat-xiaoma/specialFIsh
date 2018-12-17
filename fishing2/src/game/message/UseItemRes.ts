class UseItemRes extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["UseItemRes"];
  }
   public setUserId(v) {this.msgBodyIns.set("userId", v);   }
   public getUserId() {return this.msgBodyIns.get("userId");   }
   public setItemId(v) {this.msgBodyIns.set("itemId", v);   }
   public getItemId() {return this.msgBodyIns.get("itemId");   }
   public setAddFish(v) {this.msgBodyIns.set("addFish", v);   }
   public getAddFish() {return this.msgBodyIns.get("addFish");   }
   public setState(v) {this.msgBodyIns.set("state", v);   }
   public getState() {return this.msgBodyIns.get("state");   }
   public setFrozenFishIds(v) {this.msgBodyIns.set("frozenFishIds", v);   }
   public getFrozenFishIds() {return this.msgBodyIns.get("frozenFishIds");   }
}