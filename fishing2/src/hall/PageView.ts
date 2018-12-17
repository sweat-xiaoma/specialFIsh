class PageView extends egret.DisplayObjectContainer {
	private _isTouchBegin;
	private _isInTouch;

	private _viewWidth;
	private _viewHeight;
	private _itemWidth;
	private _interval;
	private _loop;
	private SHOW_NUMBER;
	private _dataList;
	private _container;
	private _beginPoint;

	public constructor() {
		super();
		this._isTouchBegin = !1,
        this._isInTouch = !1
	}

	public init(width, height, itemWidth, interval, isLoop = !1) {
		this._viewWidth = width;
		this._viewHeight = height;
		this._itemWidth = itemWidth;
		this._interval = interval; // 间隔
		this._loop = isLoop;
		var o = new egret.Rectangle(0, 0, width, height);
		this.mask = o;
		this.touchEnabled = true;
		this.SHOW_NUMBER = Math.ceil(width / (itemWidth + interval));
	}

	public startRegistEvent() {
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this),
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this),
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this)
	}

	public setData(e) {
		this._dataList = e;
		this._container = new egret.DisplayObjectContainer();
		this.addChild(this._container);
		// this.sortData();
		this.showView();
	}

	public sortData() {
		var e = this._dataList.pop();
		this._dataList.unshift(e)
	}

	public showView() {
		var e = -10;//-(this._itemWidth + this._interval);
		var t = 0;
		for (var i = 0; i < this._dataList.length; i++) {
			var n = this._dataList[i];
			this._container.addChild(n);
			n.x = e;
			n.y = t;
			e = e + this._itemWidth + this._interval;
		}
	}

	public touchBegin(e) {
		this._isTouchBegin || (this._isTouchBegin = !0, this._beginPoint = e.target.localToGlobal(e.localX, e.localX))
	}

	public touchEnd(e) {
		if (!this._isInTouch && null != this._beginPoint) {
			var t = e.target.localToGlobal(e.localX, e.localX);
			if (Math.abs(t.x - this._beginPoint.x) > 40) 
				t.x - this._beginPoint.x > 0 ? this.nextPosition() : this.prevPosition();
			else {
				for (var i = 0; i < this._dataList.length; i++) {
					var n = this._dataList[i];
					if (n.touchRect.hitTestPoint(t.x, t.y)) {
						n.clicked();
						break;
					}
				}
			}
			null == this._beginPoint
		}
	}

	public nextPosition(t = !0) {
		this._isInTouch = !0;
		var i = this._dataList[0],
		n = this._dataList.pop();
		n.x = i.x - (this._itemWidth + this._interval),
		this._dataList.unshift(n);
		for (var a = this._itemWidth + this._interval,
		o = 0; o < this._dataList.length; o++) !
		function(e, t, i) {
			var n = egret.Tween.get(e, {
				loop: !1
			}),
			a = e.x + t;
			i ? n.to({
				x: a
			},
			150).call(function() {
				egret.Tween.removeTweens(e)
			}) : e.x = a
		} (this._dataList[o], a, t);
		var r = this;
		t ? setTimeout(function() {
			var t = new PageEvent(PageEvent.SCROLL_END);
			t.scrollType = "right",
			r.dispatchEvent(t),
			r._isInTouch = !1,
			r._isTouchBegin = !1
		},
		150) : (r._isInTouch = !1, r._isTouchBegin = !1)
	}

	public prevPosition(t = !0) {
		this._isInTouch = !0;
		var i = this._dataList[this._dataList.length - 1],
		n = this._dataList.shift();
		n.x = i.x + (this._itemWidth + this._interval),
		this._dataList.push(n);
		for (var a = this._itemWidth + this._interval,
		o = 0; o < this._dataList.length; o++) !
		function(e, t, i) {
			var n = egret.Tween.get(e, {
				loop: !1
			}),
			a = e.x - t;
			i ? n.to({
				x: a
			},
			150).call(function() {
				egret.Tween.removeTweens(e)
			}) : e.x = a
		} (this._dataList[o], a, t);
		var r = this;
		t ? setTimeout(function() {
			var t = new PageEvent(PageEvent.SCROLL_END);
			t.scrollType = "left",
			r.dispatchEvent(t),
			r._isInTouch = !1,
			r._isTouchBegin = !1
		},
		150) : (r._isInTouch = !1, r._isTouchBegin = !1)
	}

	public gotoPage(e) {
		if (e <= this.getVos().length && e > 2) 
			for (var t = 2; e > t; t++) 
				this.prevPosition(!1);
		else 
			2 > e && e >= 1 && this.nextPosition(!1)
	}

	public getVos() {
		return this._dataList;
	}

	public getVisibleItems() {
		var arr = new Array();
		for (var t = 0; t < this._dataList.length; t++) {
			var i = this._dataList[t];
			if (i.x >= -10 && arr.length <= this.SHOW_NUMBER) {
				arr.push(i);
			}
		}
		return arr;
	}

	public destroy() {
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this),
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this),
		this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
	}
}