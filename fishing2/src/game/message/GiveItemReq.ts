class GiveItemReq extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["GiveItemReq"];
  }
   public setReceiveUserId(v) {this.msgBodyIns.set("receiveUserId", v);   }
   public getReceiveUserId() {return this.msgBodyIns.get("receiveUserId");   }
   public setItemId(v) {this.msgBodyIns.set("itemId", v);   }
   public getItemId() {return this.msgBodyIns.get("itemId");   }
   public setTotalCount(v) {this.msgBodyIns.set("totalCount", v);   }
   public getTotalCount() {return this.msgBodyIns.get("totalCount");   }
}