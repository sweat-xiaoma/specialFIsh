class HttpManager {
	public constructor() {
	}

	public static _httpRequest;
	public static _responseType;
	public static _requestUrl;
	public static _method;
	public static _succCallback;
	public static _failCallback;
	public static _paramList;

	public static init(url, n = egret.HttpResponseType.TEXT, a = egret.HttpMethod.GET, o = null, r = null) {
		HttpManager._responseType = n,
		HttpManager._requestUrl = url,
		HttpManager._method = a,
		HttpManager._succCallback = o,
		HttpManager._failCallback = r,
		HttpManager._paramList = new Map();
	}
	public static addParam(e, i) {
		HttpManager._paramList.put(e, i)
	}
	public static send() {
		HttpManager._httpRequest = new egret.HttpRequest,
		HttpManager._httpRequest.responseType = HttpManager._responseType;
		var e = HttpManager._getParamStr();
		HttpManager._method == egret.HttpMethod.GET ? (HttpManager._httpRequest.open(HttpManager._requestUrl + "?" + e, HttpManager._method), HttpManager._httpRequest.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this), HttpManager._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this), HttpManager._httpRequest.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this), HttpManager._httpRequest.send()) : HttpManager._method == egret.HttpMethod.POST && (HttpManager._httpRequest.open(HttpManager._requestUrl, HttpManager._method), HttpManager._httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), HttpManager._httpRequest.send(e), HttpManager._httpRequest.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this), HttpManager._httpRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this), HttpManager._httpRequest.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this)),
		HttpManager._paramList.clear()
	}
	public static onPostComplete(e) {
		var i = e.target.response;
		HttpManager._succCallback && HttpManager._succCallback(i)
	}
	public static onPostIOError(e) {
		HttpManager._failCallback && HttpManager._failCallback()
	}
	public static onPostProgress(e) {};
	
	public static _getParamStr() {
		for (var e = "",
		i = HttpManager._paramList.getList(), n = 0; n < i.length; n++) {
			var a = i[n].key,
			o = i[n].value;
			e = e + a + "=" + o + "&"
		}
		return e = e.substr(0, e.length - 1)
	}
}