class TaskInfo extends MessageBase {
   public constructor() {
      super();
      if (!MessageBase.appModel) MessageBase.initModule();
      this.msgBodyCls = MessageBase.appModel["TaskInfo"];
  }
   public setTaskId(v) {this.msgBodyIns.set("taskId", v);   }
   public getTaskId() {return this.msgBodyIns.get("taskId");   }
   public setTaskStatus(v) {this.msgBodyIns.set("taskStatus", v);   }
   public getTaskStatus() {return this.msgBodyIns.get("taskStatus");   }
   public setCurParameterValue(v) {this.msgBodyIns.set("curParameterValue", v);   }
   public getCurParameterValue() {return this.msgBodyIns.get("curParameterValue");   }
}