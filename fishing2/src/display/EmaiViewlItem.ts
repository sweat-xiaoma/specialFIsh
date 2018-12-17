class EmailViewItem extends eui.Component {
	/**邮件数据 邮件id */
	private _emailId;
	/**邮件数据 邮件名称 */
	private _emailTitle;
	/**邮件数据 邮件内容 */
	private _emailContent;
	/**邮件数据 邮件奖励是否领取 */
	private _itemType;
	/**邮件数据 邮件奖励数据 */
	private _itemInfo;
	/**邮件数据 邮件是否被读取 */
	private _type;
	/**过期时间 */
	private _expire;
	
	private _data;
	private _selected = false;
	private _item;
	private bg_select_img;
	private bg_default_Img;
	public constructor(value) {
		super();
		this._data=value;
		this._emailId = value.emailId;
		this._emailTitle = value.emailTitle;
		this._emailContent = value.emailContent;
		this._itemType = value.itemType;
		this._type = value.type;
		this._expire=value.expire;
		this._itemInfo = value.itemInfo;
		this.init();
	}
	/**初始化 */
	public init() {
		this._item = this;
		this.setItemInfo();
	}
	/**设置item的显示内容 */
	private setItemInfo() {
		this._item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/EmailItem.exml";
		this._item.emailNameLal.text = this._emailTitle;
	
	}

	/**选中item */
	public select(value) {
		this._selected = value;
		this.bg_select_img.visible = this._selected;
		this.bg_default_Img.visible = !this._selected;

	}

	/**设置当前邮件是否读取的状态 0已读  1未读 */
	public setType(value) {
		this._type = value;
	}
	/**设置当前邮件中的奖励是否已领取 */
	public setItemType(value) {
		this._itemType = value;
	}
	/**获取当前邮件中的奖励是否已领取的状态  0:没有要领取附件 1:有需要领取附件*/
	public getItemType() {
		return this._itemType;
	}
	/**获取当前item选中状态 */
	public getSelected() {
		return this._selected;
	}
	/**获取邮件id */
	public getEmailId() {
		return this._emailId;
	}

	/**获取当前邮件是否读取的状态 0已读  1未读 */
	public getType() {
		return this._type;
	}
	/**获取当前邮件的内容 */
	public getEmailContent() {
		return this._emailContent;
	}
	/**获取当前item中的数据 */
	public getData()
	{
		return this._data;
	}
	/**获取当前item的过期时间 */
	public getExpire()
	{
		return this._expire;
	}
	public destroy() {

	}
}