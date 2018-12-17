class Chat {

	private static ins:Chat;

	// public static labaNum:number = 0;

	/**主界面 */
	private panel:ChatPanelView;
	private root:egret.DisplayObjectContainer;
	private inited:boolean = false;
	
	public constructor() {
		
	}

	public static getins():Chat {
		if (!Chat.ins) {
			Chat.ins = new Chat();
		}
		return Chat.ins;
	}

	public init(root:egret.DisplayObjectContainer) {
		if (this.inited) return;

		this.inited = true;
		this.root = root;
		
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/ChatPanel.exml", this.loadedUi, this);
	}

	private loadedUi(clazz: any, url: string) {
		this.panel = new ChatPanelView();
		this.panel.skinName = clazz;
		this.panel.init();
		this.root.addChild(this.panel);

		// websocket
		ChatSocket.initSocket(CONFIG.WSS_CHAT_HOST, CONFIG.CHAT_PORT);
		ChatSocket.addEventListener(MsgEvent.RCV_DATA, this.rcvChatMsg, this);
	}

	private rcvChatMsg(e:MsgEvent) {
		var arr = e.data;
		var t = this;
		if (Array.isArray(arr)) {
			arr.forEach(function(v,i,a) {
				t.panel.rcvMsg(v);
			});
		} else {
			this.panel.rcvMsg(arr);
		}
	}

	/**打开界面 */
	// public open(type:any ,point:egret.Point):void {
		// if(this.mainPanel == null)
		// 	return;

		// 获得喇叭数量
		// this.mainPanel.setData(Chat.labaNum);
		// this.mainPanel.openPanel(point);
	// }
}
