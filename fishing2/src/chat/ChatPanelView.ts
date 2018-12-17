class ChatPanelView extends eui.Component {

	public static MAX_SHOW_QUEUE_NUM = 15;
	public static SPEED = 120
	// private lastMsg:any = {};

	private chatGroup:eui.Group;
	private bannerTxt:eui.Label;
	private chatTextGroup:eui.Group;
	private msgList:Array<string>;

	private isRun:boolean = false;

	public constructor() {
		super();
		// var btn:fairygui.GButton = this._view.getChild("sendBtn").asButton;
		// btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.send, this);
		// var closeBtn:fairygui.GButton = this._view.getChild("closeBtn").asButton;
		// closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
		
		// ChatSocket.addEventListener(MsgEvent.RCV_RESULT, this.sendResult, this);
		this.msgList = [];
	}

	public init() {
		var m:egret.Shape = new egret.Shape();
		m.graphics.beginFill(0);
		m.graphics.drawRect(0,0,this.chatTextGroup.width, this.chatTextGroup.height);
		m.graphics.endFill();
		this.chatTextGroup.addChild(m);
		this.bannerTxt.mask = m;
	}

	public rcvMsg(msg) {
		if (!msg || !msg.action) return;
		if (this.msgList.length > ChatPanelView.MAX_SHOW_QUEUE_NUM) return;

		var action:string = msg.action;
		var msgbody = msg.msgbody;
		var value:string = msgbody.content;
		if (!value || value.length == 0) return;
		var f = null;
		var list = this.msgList;
		if (action == "system_message") {
			let s = value;
			list.push(s);
		} else if (action == "user_message" || action == "horn_message") {
			if (msgbody.user_id != CONFIG.USER_ID) {
				let s = msgbody.nickname + "：" + value;
				list.push(s);
			}
		} else if (action == "myMsg") {
			var user:UserModel = Director.getModelByKey(UserModel);
			var userName = user.getUserName();
			let s = userName + "：" + value;
			list.push(s);
		}
		this.setNextText();
	}

	/**设置文本显示 */
	public setNextText():void {
		if (!this.bannerTxt || this.msgList.length == 0) {
			this.chatGroup.visible = false;
			return;
		}
		if (this.isRun) return;
		this.chatGroup.visible = true;
		this.parent && this.parent.addChildAt(this, this.parent.numChildren-1);
		this.bannerTxt.text = this.msgList.shift();
		this.bannerTxt.x = this.chatTextGroup.width;
		// console.log(this.chatTextGroup.width+"+++++"+this.bannerTxt.textWidth);
		this.run();
	}

	private run():void {
		this.isRun = true;
		var _my = this;
		var tw:egret.Tween = egret.Tween.get(this.bannerTxt, {loop: !1});
		var d:number = (this.chatTextGroup.width + this.bannerTxt.textWidth) / ChatPanelView.SPEED;
		tw.to({x:-this.bannerTxt.textWidth}, d*1000).call(function() {
				_my.isRun = false;
				egret.Tween.removeTweens(_my.bannerTxt);
				_my.setNextText();
			});
	}

	// public setData(labaNum):void {
        // this._view.getChild("labaNumText").text =  labaNum + "";
		// this.lastMsg = this._view.getChild("chatText").text = "";
	// }

	// private send(e) {
		// this.lastMsg = this._view.getChild("chatText").text;

		// var data:GameSelfData = GameData.getInstance()._gameSelfData;
		// var msg = {
		// 			"msgbody": {
		// 				"user_id": data.id,
		// 				"nickname": data.nickname,
		// 				"user_level": data.user_level,
		// 				"vip_level": data.vip_level,
		// 				"content": this.lastMsg
		// 			},
		// 			"action": "horn_message"
		// 		};
		// ChatSocket.send(msg);
	// }

	// private sendResult(e) {
		// var msg = e.data
		// var msgbody = msg.msgbody;
		// if (msgbody.code == 0) {
		// 	var myMsg = {"msgbody":{"content": this.lastMsg}, "action": "myMsg"};
		// 	ChatSocket.dispatcher(MsgEvent.RCV_DATA, myMsg);
		// 	this._view.getChild("chatText").text =  "";
		// } else {
		// 	// if (msgbody.code == 5004) {
		// 	var btn:fairygui.GButton = this._view.getChild("sendBtn").asButton;
		// 	this.popTips(msgbody.msg);
		// }
	// }

	public closePanel():void{
		// super.closePanel();
	}

	// public popTips(msgText:string, pos:egret.Point=null) {
	// 	var sp:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
	// 	var txt:egret.TextField = new egret.TextField();
	// 	txt.size = 35;
	// 	txt.text = msgText;
	// 	txt.textColor = 0xff9900;
	// 	txt.cacheAsBitmap = !0;
	// 	txt.anchorOffsetX = txt.width >> 1;
	// 	txt.anchorOffsetY = txt.height >> 1;
	// 	txt.textAlign = egret.HorizontalAlign.CENTER;
		// var o = RES.getRes("tipsBg_png");
		// var bg:egret.Bitmap = new egret.Bitmap(o);
		// bg.scale9Grid = new egret.Rectangle(83, 0, 6, 42);
		// bg.width = txt.width + 70;
		// bg.anchorOffsetX = bg.width >> 1;
		// bg.anchorOffsetY = bg.height >> 1;
		// sp.addChild(bg);
		// sp.addChild(txt);

		// var stage:egret.DisplayObjectContainer = this._view.displayListContainer;
		// stage.addChildAt(sp, 9999);
		// if (!pos) {
		// 	pos = new egret.Point(this._view.width/2, this._view.height/2); 
		// }
		// sp.x = pos.x;
		// sp.y = pos.y;
		// sp.cacheAsBitmap = !0;
		// var tw = egret.Tween.get(sp, {loop: !1});
		// tw.to({y: sp.y - 100, alpha: 0}, 2000).call(function() {
		// 		egret.Tween.removeTweens(sp);
		// 		stage.removeChild(sp);
		// 	});
	// }
}
