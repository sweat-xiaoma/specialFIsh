class UIWrap {
	private _btn;
	public constructor(e) {
		this._btn = e;
		this._btn.anchorOffsetX = this._btn.width / 2;
		this._btn.anchorOffsetY = this._btn.height / 2;
		this._btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this._btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
	}
	public get btn()
	{
		return this._btn;
	}
	public onTouchBegin(e) {
		this._btn.scaleX = this._btn.scaleY = 1.1,
		SoundManager.playUISound("B06");
	}
	public onTouchEnd(e) {
		this._btn.scaleX = this._btn.scaleY = 1
	}
	public destroy() {
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this),
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this),
		this._btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this)
	}
}