class EmailMediator extends SimpleMediator {
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
		//获取邮件list
		MessageDispatcher.register(MsgActionDefine.EmailListRes,
			function (t) {
				e.setEmailListBack(t);
			});
		//领取、删除、一键领取、一键删除
		MessageDispatcher.register(MsgActionDefine.EmailOperationRes,
			function (t) {
				e.emailOperationResBack(t);
			});
		//添加页面中自定义事件的监听
		this.subscrib(NotifyEnum.EMAIL_OPERATION, this.sendEmailOperation);//背包物品item点击
		this.subscrib(NotifyEnum.EMAIL_GET_EMAIL_LIST, this.sendGetEmailList);//获取邮件list
	}
	/** 发送获取邮件list请求*/
	public sendGetEmailList() {
		var emailLisemsg: EmailListReq = new EmailListReq();
		emailLisemsg.initData();
		NetManager.send(emailLisemsg, MsgActionDefine.EmailListReq);
	}
	/**发送删除邮件or领取奖励请求 */
	public sendEmailOperation(value, event) {
		var emailO: EmailOperationReq = new EmailOperationReq();
		emailO.initData();
		emailO.setEmailId(value.emailId);
		emailO.setType(value.type);
		NetManager.send(emailO, MsgActionDefine.EmailOperationReq);
	}
	/**删除邮件or 领取奖励接口返回 */
	public emailOperationResBack(value) {
		console.log("对邮件的操作返回:");
		var res = value as EmailOperationRes;
		console.log(res.getType());
		var emailView: EmailView = this.getView();
		switch (res.getType()) {
			case EmailOperationTypeEnum.EMAIL_DELETE:
				emailView.delEmailBack(res);
				break;
			case EmailOperationTypeEnum.EMAIL_GET:
				emailView.getRewardBack(res);
				break;
			case EmailOperationTypeEnum.EMAIL_READ:
				emailView.readEmailBack(res);
				break;

		}


	}
	/**获取邮件list接口返回 */
	public setEmailListBack(value) {
		var res = value as EmailListRes
		var info: Array<EmailInfo> = res.getEmailInfo();
		(this.getView() as EmailView).setEmailList(info)
	}


	/**销毁 */
	public destroy() {
		this.unsubscribByType(NotifyEnum.EMAIL_OPERATION);
		MessageDispatcher.unregister(MsgActionDefine.EmailOperationRes);
		MessageDispatcher.unregister(MsgActionDefine.EmailListRes);
		this.getView().destroy();
	}
}