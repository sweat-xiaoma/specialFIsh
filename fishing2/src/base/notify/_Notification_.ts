class _Notification_ {
	
	private static _callbackList = new Map();

	public constructor() {
		throw new SimpleError("The Notification can't call constructor!")
	}

	public static init() {};

	public static subscrib(e, t, i) {
		void 0 === i && (i = null);
		var n = this._callbackList.contains(e);
		if (n) {
			var a = this._callbackList.get(e);
			a.push([t, i])
		} else {
			var o = new Array;
			o.push([t, i]),
			this._callbackList.put(e, o)
		}
	}

	public static unsubscrib(e, t) {
		var i = this._callbackList.contains(e);
		if (i) {
			for (var n = this._callbackList.get(e), a = n.length, o = 0; a > o; o++) if (n[o][0] == t) return n.splice(o, 1),
			!0;
			return ! 1
		}
		return ! 1
	}

	public static removebByType(e) {
		var t = this._callbackList.contains(e);
		return t ? this._callbackList.remove(e) : !1
	}

	public static removeAll() {
		this._callbackList.clear()
	}
	
	public static send(e, t=null) {
		var i = this._callbackList.contains(e);
		if (i) for (var n = this._callbackList.get(e), a = n.length, o = 0; a > o; o++) {
			var r = n[o];
			if (r) {
				r[0](t, r[1]);
				break
			}
		}
	}
}