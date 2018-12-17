class NoticeView extends FullView {
	private _btnWrapList;
	private _itemList;
	private _notice;
	private _bPop;
	public constructor() {
		super();
	}
	/**初始化页面 */
	public initView(e) {
		var t = this;
		/**加载邮件ui界面 */
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeUI.exml",
			function (i, n) {
				t.loadComplete(i, n, e)
			},
			this),
			this._btnWrapList = new Array();
		this._itemList = new Array();
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
		this._notice = o;
		this._notice.skinName = e;
		this._notice.horizontalCenter = 0;
		this._notice.verticalCenter = 0;
		a.addChild(this._notice);
		if (!this._bPop) {
			UIUtil.popView(this._notice.root);
			this._bPop = !0;
		}
		// this._bPop || (UIUtil.popView(this._notice.root), this._bPop = !0);
		this._btnWrapList.push(new UIWrap(this._notice.closeBtn));
		this._notice.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseEvent, this);
		//加载成功回调
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeItemBtnUI.exml",
			function () {
				this.send(NotifyEnum.NOTICE_GET_NOTICE_LIST);
			},
			this)
	}
	/**关闭按钮点击事件 */
	private onCloseEvent(e): void {
		Director.popView();
	}
	private setNoticeList(value) {
		if (value == null) {
			return;
		}
		this._itemList = new Array();
		this._notice.left_group.removeChildren();
		for (var i = 0; i < value.length; i++) {
			var item: NoticeViewItem = new NoticeViewItem(value[i]);
			this._notice.left_group.addChild(item);
			this._itemList.push(item);
			if (i == 0) {
				item.selected(true);
				this.setNoticeInfoHandler(item);
			} else {
				item.selected(false);
			}
			item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.noticeItemClickHandler, this);
		}
	}
	private noticeItemClickHandler(event) {
		this.setNoticeInfoHandler(event.currentTarget as NoticeViewItem);
	}
	/**设置右侧公告详细信息 */
	private setNoticeInfoHandler(item: NoticeViewItem) {
		if (this._itemList == null || item == null) {
			return;
		}
		for (var i = 0; i < this._itemList.length; i++) {
			if (this._itemList[i].getNoticeId() == item.getNoticeId()) {
				this._itemList[i].selected(true);
			} else {
				this._itemList[i].selected(false);
			}
		}
		this._notice.noticeInfoLal.text = item.getNoticeContent();

	}
	/**
	* 销毁
	* （移除监听事件、以及ui页面等)
	*/
	public destroy() {
		var e = this;
		this._bPop = !1;
		UIUtil.closeView(this._notice.root,
			function () {
				for (; e._btnWrapList.length > 0;) {
					var t = e._btnWrapList.pop();
					t.destroy()
				}
				e._notice.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onCloseEvent, e);
				
				e.parent.removeChild(e);
				this._itemList = [];
				RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeUI.exml");
				RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeItemBtnUI.exml");
			});
	}
}