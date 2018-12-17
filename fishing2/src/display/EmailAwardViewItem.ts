class EmailAwardViewItem extends eui.Component {
	private iconImg;
	private countTxt;
	private _item;
	public constructor(value) {
		super();
		this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/EmailAwardItem.exml";
		this._item = this;
		this._item.countTxt.text = "x" + value.totalCount;
		var item=this._item;
		IconUtil.getIconByIdAsync(IconType.PROP, value.itemId,
			function (t) {
				if (t) {
					t.width = 70;
					t.height = 70;
					t.anchorOffsetX = t.width / 2;
					t.anchorOffsetY = t.height / 2;
					t.x = item.iconImg.width / 2;
					t.y = item.iconImg.height / 2;
					item.iconImg.addChild(t);
				}
			});
	}

}