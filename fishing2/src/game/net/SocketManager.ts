class SocketManager {
	public constructor() {
	}

	public static _socket:egret.WebSocket = null;
	public static _onOpen = null;
	public static _onClosed = null;
	public static _onReceive = null;

	public static initSocket(server, port, i= egret.WebSocket.TYPE_BINARY, onOpen=null, onRcv=null, onClose=null) {
		SocketManager._onOpen = onOpen;
		SocketManager._onClosed = onClose;
		SocketManager._onReceive = onRcv;
		SocketManager._socket = new egret.WebSocket();
		SocketManager._socket.type = i;
		SocketManager._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, SocketManager.onReceiveMessage, this);
		SocketManager._socket.addEventListener(egret.Event.CONNECT, SocketManager.onSocketOpen, this);
		SocketManager._socket.addEventListener(egret.Event.CLOSE, SocketManager.onSocketClosed, this);
		// SocketManager._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, SocketManager.onError, this);
		let url = CONFIG.PROTOCOL + server ;
		SocketManager._socket.connectByUrl(url);
		CONFIG.IS_PRINT_LOG && console.log("connect to: "+url);
	}

	public static resetSocket() {
		SocketManager._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, SocketManager.onReceiveMessage, this),
		SocketManager._socket.removeEventListener(egret.Event.CONNECT, SocketManager.onSocketOpen, this),
		SocketManager._socket.removeEventListener(egret.Event.CLOSE, SocketManager.onSocketClosed, this),
		SocketManager._socket.close();
	}

	public static send(e) {
		// console.log(e);
		SocketManager._socket.writeBytes(e);
	}

	public static onSocketOpen() { 
		var bytes = new egret.ByteArray();
		bytes.writeInt(1234);
		bytes.position = 0;
		SocketManager._socket.writeBytes(bytes);
		SocketManager._socket.flush();
		SocketManager._onOpen && SocketManager._onOpen()
	}

	public static onReceiveMessage(e) {
		var t = new egret.ByteArray();
		SocketManager._socket.readBytes(t);
		SocketManager._onReceive && SocketManager._onReceive(t);
	}
	
	public static onSocketClosed() {
		CONFIG.IS_PRINT_LOG && console.log("*****socket closed.");
		SocketManager._onClosed && SocketManager._onClosed();
	}

	public static onError() {
		console.log("*****socket error.");
		SocketManager.resetSocket();
		SocketManager._onClosed && SocketManager._onClosed();
	}

	public static isConnected():boolean {
		return SocketManager._socket.connected;
	}
}