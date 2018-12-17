class ViewBase extends egret.DisplayObjectContainer {
	public constructor() {
		super();
	}

	public show() {}
	public setLayout(t) {
		var i = this.stage.width,
		n = this.stage.height;
		// t == ViewEnum.CENTER && (this.x = i / 2, this.y = n / 2)
	}
	public send(t, i=null) {
		_Notification_.send(t, i)
	}
	public destroy() {
		throw new SimpleError("Subclass must be override destory!")
	}
}