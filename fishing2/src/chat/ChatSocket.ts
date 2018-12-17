class ChatSocket {
	private static disp:egret.EventDispatcher = new egret.EventDispatcher();
	// private static tmpByteArr:egret.ByteArray = new egret.ByteArray();

	private static pingMsg;
	private static intervalHandle;
	

	public constructor() {
	}

	public static _socket:egret.WebSocket = null;

	public static initSocket(server, port, i= egret.WebSocket.TYPE_STRING) {
		ChatSocket._socket = new egret.WebSocket();
		ChatSocket._socket.type = i;
		ChatSocket._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, ChatSocket.onReceiveMessage, ChatSocket);
		ChatSocket._socket.addEventListener(egret.Event.CONNECT, ChatSocket.onSocketOpen, ChatSocket);
		ChatSocket._socket.addEventListener(egret.Event.CLOSE, ChatSocket.onSocketClosed, ChatSocket);
		// ChatSocket._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, ChatSocket.onError, ChatSocket);
		ChatSocket._socket.connectByUrl("wss://" + server);
		console.log("Chat Server ==> wss://" + server);
	}

	public static resetSocket() {
		ChatSocket._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, ChatSocket.onReceiveMessage, ChatSocket),
		ChatSocket._socket.removeEventListener(egret.Event.CONNECT, ChatSocket.onSocketOpen, ChatSocket),
		ChatSocket._socket.removeEventListener(egret.Event.CLOSE, ChatSocket.onSocketClosed, ChatSocket),
		ChatSocket._socket.close();
	}

	public static send(msg:any) {
		if (!msg || !msg.action || !ChatSocket._socket) return;
		var s = JSON.stringify(msg);
		CONFIG.IS_PRINT_LOG && console.log("chat send>>"+s);
		ChatSocket._socket.writeUTF(s);
	}

	public static onSocketOpen() {
		console.log("Chat Server login...");
		var msg = {"msgbody": {"identity": CONFIG.IDENDTITY},
  				   "action": "login"};
		ChatSocket.send(msg);

		ChatSocket.pingMsg = {
				"msgbody": {
					"user_id": CONFIG.USER_ID
				},
				"action": "ping"
			};

		ChatSocket.intervalHandle = setInterval(ChatSocket.onSocketPing, 29000);
	}

	private static onSocketPing(){
		
		if (ChatSocket._socket.connected){
			// console.log("Chat Server ping_send...");
			ChatSocket.send(ChatSocket.pingMsg);
		}else{
			// console.log("Chat Server clear_ping...");
			clearInterval(ChatSocket.intervalHandle);
		}
	}

	public static onReceiveMessage(e) {
		var s = ChatSocket._socket.readUTF();
		CONFIG.IS_PRINT_LOG && console.log("Chat rcv<<"+s);
		var msg = JSON.parse(s);
		if (msg.action == "response" && msg.msgbody.opt == "horn_message") {
			ChatSocket.dispatcher(MsgEvent.RCV_RESULT, msg);
		} else {
			ChatSocket.dispatcher(MsgEvent.RCV_DATA, msg);
		}
	}
	
	public static onSocketClosed() {
		CONFIG.IS_PRINT_LOG && console.log("Chat Server onSocketClosed...");
		// ChatSocket.initSocket(Const.CHAT_SERVER, Const.CHAT_PORT);
		setTimeout(ChatSocket.initSocket, 5000, CONFIG.WSS_CHAT_HOST, CONFIG.CHAT_PORT);
	}

	public static onError() {
		console.log("Chat Server onError...");
		ChatSocket.resetSocket();
		setTimeout(ChatSocket.initSocket, 5000, CONFIG.WSS_CHAT_HOST, CONFIG.CHAT_PORT);
		// ChatSocket.initSocket(Const.CHAT_SERVER, Const.CHAT_PORT);
	}

	public static isConnected():boolean {
		return ChatSocket._socket.connected;
	}

	public static dispatcher(type:string, msg:any) {
		var msgEvent:MsgEvent = new MsgEvent(type, msg);
		ChatSocket.disp.dispatchEvent(msgEvent);
	}

	public static addEventListener (type:string, listener :Function, ChatSocketObject :any):void {
		ChatSocket.disp.addEventListener(type, listener, ChatSocketObject, false);
	}

	public static removeEventListener (type:string, listener :Function, ChatSocketObject :any):void {
		ChatSocket.disp.removeEventListener(type, listener, ChatSocketObject, false);
	}
}
