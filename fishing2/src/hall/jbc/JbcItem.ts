class JbcItem extends eui.Component{
    private _index;
    private _data;

    public icon:eui.Image;
    public index:eui.Label;
    public head:eui.Image;
    public uname:eui.Label;
    public award_icon:eui.Image;
    public award_txt:eui.Label;

    public constructor(index,data) {
        super();
        this._index = index;
        this._data = data;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/JbcItemUI.exml", this.addBgResource, this);
    }
	public addBgResource(e, t) {
        this.skinName = e;

        this.icon.visible = this._index < 3;
        this.index.visible = this._index > 2;
        
        this.y = this._index*70;
    }
}