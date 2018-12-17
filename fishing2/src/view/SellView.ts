class SellView extends eui.Component {
	public _id;
	public _nReceiveId;
	public _btnWrapList;
	public _parent;
	public closeBtn;
	public _userModel;
	public okBtnGroup;
	public backBtnGroup;
	public nCurNumber;
	private numLab;
	private addBtn;
	private resouceBtn;
	private maxW = 254;
	private thumb;
	/**物品数量 */
	private itemCountTxt;
	/**物品名称 */
	private itemNameTxt;
	/**出售价格 */
	private itemTypeTxt;
	private iconGroup;
	public constructor(t, i) {
		super();
		this._id = t;
		this._nReceiveId = i;
		this._btnWrapList = new Array;
		this._userModel = Director.getModelByKey(UserModel);
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SellUI.exml";

		this.addBgResource();
	}
	public onOkBtnClick(e) {
		_Notification_.send(NotifyEnum.SELL_ITEM, {
			itemId: this._id, itemNum: 40
		})
	}
	public onClosttButtonClick(e) {
		this._parent && this._parent.removeChild(this)
	}
	public addBgResource() {
		var e = T_Item_Table.getVoByKey(this._id);
		var t: Item = this._userModel.getItemById(this._id);

		this.nCurNumber = e.everyTimeLimit;
		this.itemCountTxt.text = "x" + t.getCount();
		this.itemNameTxt.text = Language.getText(e.name);
		this.itemTypeTxt.text = "价格:" + e.worth.toString().split("_")[1];
		this.numLab.text = this.nCurNumber + "/" + t.getCount();
		var q = this.maxW * (this.nCurNumber / t.getCount())
		if (q < 60) {
			q = 60 + q;
		}
		this.thumb.width = q;
		(this.iconGroup as eui.Group).removeChildren();
		var sellView = this;
		IconUtil.getIconByIdAsync(IconType.PROP, e.id,
			function (t) {
				if (t) {
					t.width = 70;
					t.height = 70;
					t.anchorOffsetX = t.width / 2;
					t.anchorOffsetY = t.height / 2;
					t.x = sellView.iconGroup.width / 2;
					t.y = sellView.iconGroup.height / 2;
					sellView.iconGroup.addChild(t);
				}
			});

		this._btnWrapList.push(new UIWrap(this.closeBtn));
		this._btnWrapList.push(new UIWrap(this.okBtnGroup));
		this._btnWrapList.push(new UIWrap(this.addBtn));
		this._btnWrapList.push(new UIWrap(this.resouceBtn));
		this._btnWrapList.push(new UIWrap(this.backBtnGroup));
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this.okBtnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkBtnClick, this);
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addResource, this);
		this.resouceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resouce, this);
		this.backBtnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
	}
	public resouce(e) {
		var t = T_Item_Table.getVoByKey(this._id);
		var i = this._userModel.getItemById(this._id);
		this.nCurNumber != t.everyTimeLimit && (this.nCurNumber -= t.everyTimeLimit, this.numLab.text = this.nCurNumber + "/" + i.getCount())
		var q = this.maxW * (this.nCurNumber / i.getCount())
		if (q <= this.thumb.width && this.thumb.width > 60) {
			this.thumb.width = this.thumb.width - q;
		}

	}
	public addResource(e) {
		var t = T_Item_Table.getVoByKey(this._id),
			i = this._userModel.getItemById(this._id);
		i.getCount() < this.nCurNumber + t.everyTimeLimit || (this.nCurNumber += t.everyTimeLimit, this.numLab.text = this.nCurNumber + "/" + i.getCount())
		var q = this.maxW * (this.nCurNumber / i.getCount())
		if (q < 60) {
			q = 60 + q;
		}
		this.thumb.width = q;
	}
	public setParent(e) {
		this._parent = e
	}

	public destroy() {
		for (; this._btnWrapList.length > 0;) {
			var e = this._btnWrapList.pop();
			e.destroy()
		}
		this.parent && this.parent.removeChild(this);
		this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		this.okBtnGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkBtnClick, this);
		this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addResource, this);
		this.resouceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.resouce, this);
		this.backBtnGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
		console.log("LoginView destory!");
	}
}