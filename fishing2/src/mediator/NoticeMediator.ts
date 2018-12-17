class NoticeMediator extends SimpleMediator {
	public constructor(t) {
		super(t);
	}
	/**初始化邮件页面 */
	public onAdded() {
		super.onAdded();
		this.getView().initView();
	}
	public init() {
		var e = this;
		//注册SOCKET消息
		//获取公告list
		MessageDispatcher.register(MsgActionDefine.NoticeListRes,
			function (t) {
				e.setMoticeListBack(t);
			});
		this.subscrib(NotifyEnum.NOTICE_GET_NOTICE_LIST, this.sendGetNoticeList);//获取公告list
	}
	/** 发送获取公告list请求*/
	public sendGetNoticeList() {
		var noticeLisemsg: NoticeListReq = new NoticeListReq();
		noticeLisemsg.initData();
		NetManager.send(noticeLisemsg, MsgActionDefine.NoticeListReq);
	}
	public setMoticeListBack(value) {
		var res=(value as NoticeListRes).getNoticeInfo();
		this.getView().setNoticeList(res);
		console.log("收到公告list返回消息 ");
	
	}

	/**销毁 */
	public destroy() {
		MessageDispatcher.unregister(MsgActionDefine.NoticeListRes);
		this.getView().destroy();
	}
}