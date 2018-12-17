class NoticeViewItem extends eui.Component {
	private _noticeId;
	private titleTxt;
	private selectImg;
	private unSelectImg;
	private _noticeContent;
	public constructor(value) {
			super();
			this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/notice/NoticeItemBtnUI.exml";
			this._noticeId=value.noticeId;
			this._noticeContent=value.noticeContent;
			this.titleTxt.text=value.noticeTitle;
	}
	public getNoticeId()
	{
		return this._noticeId;
	}
	public getNoticeContent()
	{
		return this._noticeContent;
	}
	public selected(value)
	{
		this.selectImg.visible=value;
		this.unSelectImg.visible=!value;
	}
}