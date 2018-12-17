class MediatorBase {

	private _view;
	private _callback;
	private _name;
	
	public constructor(e, t="") {
		this._name = "";
		this._view = e;
		this._name = t;
		this._callback = new Array();
	}

	public onAdded() {}

	public init() {}

	public update() {}

	public getView() {
		return this._view
	}

	public subscrib(t, i) {
		_Notification_.subscrib(t, i, this),
		this._callback.push(t)
	}

	public unsubscrib() {
		for (var t = this._callback.length, i = 0; t > i; i++) 
			_Notification_.removebByType(this._callback[i]);
		this._callback = null;
	}

	public unsubscribByType(t) {
		_Notification_.removebByType(t)
	}

	public getModel(t) {
		return Director.getModelByKey(t)
	}

	public getName() {
		return this._name
	}

	public destroy() {
		throw new SimpleError("Subclass must be override destory!")
	}
}