class EmailView extends FullView {
	public constructor() {
		super();
	}
	//所有按钮的集合
	private _btnWrapList;
	/**左边列表的集合 */
	private _itemList;
	private _email;
	public _bPop;
	/**选中的item */
	private _selItem: EmailViewItem;
	/**初始化页面 */
	public initView(e) {
		var t = this;
		/**加载邮件ui界面 */
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/EmailUI.exml",
			function (i, n) {
				t.loadComplete(i, n, e)
			},
			this),
			this._btnWrapList = new Array,
			this._itemList = new Array
	}
	/**页面加载成功回调*/
	public loadComplete(e, t, i) {
		var n = this;
		//关闭loading
		UIUtil.closeLoading();
		//清除页面内容
		this.removeChildren();
		//添加页面上的内容
		var a = new eui.UILayer;
		this.addChild(a);
		var o = new eui.Component;
		this._email = o;
		this._email.skinName = e;
		this._email.horizontalCenter = 0;
		this._email.verticalCenter = 0;
		a.addChild(this._email);
		this._bPop || (UIUtil.popView(this._email.root), this._bPop = !0);
		this._btnWrapList.push(new UIWrap(this._email.closeBtn));
		this._btnWrapList.push(new UIWrap(this._email.delAllBtn));
		this._btnWrapList.push(new UIWrap(this._email.getAllBtn));
		this._btnWrapList.push(new UIWrap(this._email.delBtn));
		this._btnWrapList.push(new UIWrap(this._email.getBtn));

		this._email.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseEvent, this);
		this._email.delBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDelBtnEvent, this);
		this._email.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetBtnEvent, this);
		this._email.delAllBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDelAllBtnEvent, this);
		this._email.getAllBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetAllBtnEvent, this);
		this._email.noneEmailLal.visible = false;
		//加载成功回调
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/EmailItem.exml",
			function () {
				EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/EmailAwardItem.exml",
					function () {
						this.send(NotifyEnum.EMAIL_GET_EMAIL_LIST);
					},
					this)
			},
			this)
	}
	//==========================================页面中各按钮点击事件begin==============================
	/**删除邮件点击事件*/
	private onDelBtnEvent(e) {
		if (this._selItem) {
			this.send(NotifyEnum.EMAIL_OPERATION, { type: EmailOperationTypeEnum.EMAIL_DELETE, emailId: [this._selItem.getEmailId()] });
		}
	}
	/**一键删除 点击事件*/
	private onDelAllBtnEvent(e) {
		this.send(NotifyEnum.EMAIL_OPERATION, { type: EmailOperationTypeEnum.EMAIL_DELETE, emailId: this.getEmaillistId() });
	}

	/**领取奖励 点击事件*/
	private onGetBtnEvent(e) {
		if (this._selItem) {
			this.send(NotifyEnum.EMAIL_OPERATION, { type: EmailOperationTypeEnum.EMAIL_GET, emailId: [this._selItem.getEmailId()] });
		}

	}
	/**一键领取 点击事件*/
	private onGetAllBtnEvent(e) {
		this.send(NotifyEnum.EMAIL_OPERATION, { type: EmailOperationTypeEnum.EMAIL_GET, emailId: this.getEmaillistId() });
	}
	/**关闭按钮点击事件 */
	private onCloseEvent(e): void {
		Director.popView();
	}
	/**item点击事件 */
	private touchItemEvent(event) {
		this.itemClickHandler(event.currentTarget as EmailViewItem);
	}
	//========================页面中各按钮点击事件end===================================

	//========================设置页面的 各种显示begin==================================
	/**item点击事件的处理*/
	private itemClickHandler(item: EmailViewItem) {
		this._selItem = item;
		for (var i = 0; i < this._itemList.length; i++) {
			if (item != this._itemList[i]) {
				this._itemList[i].select(false);
			} else {
				if (!item.getSelected()) {
					item.select(true);
					this.setRewardList(item.getData().itemInfo);
					this.setEmailInfo(item);
					if (item.getType() == 0) {
						this.send(NotifyEnum.EMAIL_OPERATION, { type: EmailOperationTypeEnum.EMAIL_READ, emailId: [item.getEmailId()] });
					}
				}
			}
		}
	}
	/**设置邮件列表的显示 */
	public setEmailList(value: Array<EmailInfo>) {
		this._email.emailList.removeChildren();
		this._itemList = new Array();
		var haveReward = false;
		if (value.length == 0) {
			this._email.getAllBtn.visible = false;
			this._email.delAllBtn.visible = false;
			this._email.getBtn.visible = false;
			this._email.delBtn.visible = false;
			this._email.getStateLal.text = "";
			this._email.expireTimeLal.text = "";
			this._email.emailInfoLal.text = "";
			this._email.rewardlList.removeChildren();
			this._email.noneEmailLal.visible = true;
		} else {
			this._email.noneEmailLal.visible = false;
			for (var i = 0; i < value.length; i++) {
				var item: EmailViewItem = new EmailViewItem(value[i]);
				this._email.emailList.addChild(item);
				if (item.getItemType() == 1) {
					haveReward = true;
				}
				item.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this);
				this._itemList.push(item);
			}

			if (haveReward) {
				this._email.getAllBtn.visible = true;
			} else {
				this._email.getAllBtn.visible = false;
			}
			if (this._itemList.length > 0) {
				this.itemClickHandler(this._itemList[0]);
			}
		}
	}


	/**设置邮件右侧的显示信息 */
	private setEmailInfo(value) {
		if (this._selItem) {
			this._email.emailInfoLal.text = this._selItem.getEmailContent();
			this._email.expireTimeLal.text = TimeUtil.longToDateStr(this._selItem.getExpire());
			if (this._selItem.getItemType() == 1) {
				this._email.getStateLal.visible = true;
				this._email.getBtn.visible = true;
				this._email.getStateLal.text = "未领取奖励";

			} else {
				this._email.getBtn.visible = false;
				this._email.getStateLal.text = "";
				if (this._selItem.getData().itemInfo.length != null && this._selItem.getData().itemInfo.length > 0) {
					this._email.getStateLal.text = "奖励已领取";
				}
			}
		}
	}
	/**设置邮件的奖励物品list */
	private setRewardList(value: Array<any> = null) {
		this._email.rewardlList.removeChildren();
		if (value == null || value.length == 0)
			return;

		for (var i = 0; i < value.length; i++) {
			var item = new EmailAwardViewItem(value[i]);
			this._email.rewardlList.addChild(item);
		}
	}
	//========================设置页面的 各种显示end==================================


	//==============================与服务端交互返回消息的处理 begin===================
	/**删除邮件 返回消息的处理*/
	public delEmailBack(value = null) {
		if (value == null)
			return;
		var idAry = (value as EmailOperationRes).getEmailId();
		for (var i = 0; i < idAry.length; i++) {
			this.delItemForItemListByID(idAry[i]);
		}
		var itemList = [];
		for (var q = 0; q < this._itemList.length; q++) {
			itemList.push((this._itemList[q] as EmailViewItem).getData());
		}
		this.setEmailList(itemList);
	}
	/**领取邮件奖励 返回消息的处理*/
	public getRewardBack(value = null) {
		var emailIdAry = (value as EmailOperationRes).getEmailId();
		for (var i = 0; i < emailIdAry.length; i++) {
			for (var q = 0; q < this._itemList.length; q++) {
				if ((this._itemList[q] as EmailViewItem).getEmailId() == emailIdAry[i]) {
					(this._itemList[q] as EmailViewItem).setItemType(0);
				}
			}
			if (this._selItem && this._selItem.getEmailId() == emailIdAry[i]) {
				this._selItem.setItemType(0);
				this.setEmailInfo(this._selItem);
			}
		}
	}
	/**查看邮件返回消息的处理*/
	public readEmailBack(value: EmailOperationRes) {
		if (this._selItem) {
			if (value.getEmailId() == this._selItem.getEmailId()) {
				this._selItem.setType(value.getType());
			}
		}
	}
	//==============================与服务端交互返回消息的处理 end=====================================
	//==============================对页面中的数据处理begin===========================================
	/**根据邮件id删除邮件list中的内容 */
	public delItemForItemListByID(value) {
		if (this._itemList.length <= 0) {
			return;
		}
		for (var i = 0; i < this._itemList.length; i++) {
			if ((this._itemList[i] as EmailViewItem).getEmailId() == value) {
				this._itemList.splice(i, 1);
				return;
			}
		}
	}
	/** 获取所有邮件的id的集合*/
	private getEmaillistId() {
		var emailIdAry = [];
		for (var i = 0; i < this._itemList.length; i++) {
			emailIdAry.push((this._itemList[i] as EmailViewItem).getEmailId());
		}
		return emailIdAry;
	}
	//==============================对页面中的数据处理end==================================================
	/**
	* 销毁
	* （移除监听事件、以及ui页面等)
	*/
	public destroy() {
		var e = this;
		this._bPop = !1;
		UIUtil.closeView(this._email.root,
			function () {
				for (; e._btnWrapList.length > 0;) {
					var t = e._btnWrapList.pop();
					t.destroy()
				}
				e._email.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onCloseEvent, e);

				e.parent.removeChild(e);
				this._itemList = [];
				RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/EmailUI.exml");
				RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/EmailItem.exml");
				RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/EmailAwardItem.exml");
			});
	}

}