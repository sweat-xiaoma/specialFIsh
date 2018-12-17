class Director {
	public constructor() {
		throw new SimpleError("The burn.Director can't call constructor!");
	}

	public static _stage:egret.Stage;
	public static _uiMedList:Array<MediatorBase>;
	public static _modelList;
	public static _viewMed;

	public static initFramework(t) {
		this._stage = t;
		this._uiMedList = new Array();
		this._modelList = new Map();
	};
	public static repleaceView(med:MediatorBase) {
		var t = this._uiMedList.length;
		for (var i = 0; t > i; i++) {
			this._uiMedList[i].unsubscrib();
			this._uiMedList[i].destroy();
		}
		this._uiMedList = [];
		this._viewMed = med;
		this._stage.addChild(med.getView());
		this._uiMedList.push(med);
		med.onAdded();
		med.init();
	}

	public static repleaceViewWithTransform(e) {};

	public static pushView(med:MediatorBase) {
		if (this._uiMedList.length > 0) {
			var t = this._uiMedList[this._uiMedList.length - 1];
			if ("" != med.getName() && med.getName() == t.getName()) return
		}
		this._viewMed = med;
		this._stage.addChild(med.getView());
		this._uiMedList.push(med);
		med.onAdded();
		med.init()
	}
	
	public static popView() {
		var e = this._uiMedList.pop();
		// e.unsubscrib();
		e.destroy();
		// this._viewMed = this._uiMedList[this._uiMedList.length - 1];
		// this._viewMed.update()
	}

	public static getStage():egret.Stage {
		return this._stage
	}

	public static registerModel(cls, modelIns) {
		modelIns.init();
		var i = this._modelList.contains(cls);
		i ? console.warn("Model:" + cls + " have already exists!") : this._modelList.put(cls, modelIns);
	}

	public static getModelByKey(e) {
		return this._modelList.get(e)
	}

	public static clearAllModel() {
		for (var e = this._modelList.getList(), t = 0; t < e.length; t++) e[t].value.clear()
	};
}