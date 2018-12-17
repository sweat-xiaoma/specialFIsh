class MessageDispatcher {

	private static responseList = new Map();

	public constructor() {
	}

	public static register (e, t) {
		this.responseList.contains(e) ? console.warn("【" + e + "】该消息已经注册!") : this.responseList.put(e, t)
	}

	public static unregister (e, t=null) {
		this.responseList.remove(e)
	}

	public static unregisterByType (e) {
		this.responseList.remove(e)
	}

	public static removeAll() {
		this.responseList.clear()
	}

	public static dispatch(actId, t) {
		var fun = this.responseList.get(actId);
		if (fun) {
			fun(t);
		} else {
			console.warn("消息[" + actId + "]未被注册过!");
		}
	}
}