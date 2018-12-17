class GunShopItemView extends eui.Component {
	public _type;
	public _id;
	public _itemId;
	public _priceType;
	public _price;
	public _num;
	public skinName;
	public _btnWrapList;
	public desTxt;
	public item_name;
	public priceTxt;
	public icon_point;
	public timeImg;
	public buy;
	public xufeiIcon;
	public buyIcon;
    public select;

	public constructor(t, i, n, a, o, r) {
		super();
		this._type = t,
        this._id = i,
        this._itemId = n,
        this._priceType = a,
        this._price = o,
        this._num = r,
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/GunShopItem.exml",
        this._btnWrapList = new Array,
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/GunShopItem.exml", this.addResource, this);
	}

	public addResource(e, t) {
        var i = this,
        n = Language.getText(T_Item_Table.getVoByKey(this._priceType).name);
        if (2 == this._type) {
            IconUtil.getIconByIdAsync(IconType.PROP, this._itemId,
            function(e) {
                e && (e.anchorOffsetX = e.width , e.anchorOffsetY = e.height , i.icon_point.addChild(e))
            }),
            this.desTxt.text = "x" + this._num;
            var a = T_Item_Table.getVoByKey(this._itemId);
            if(a == null){
                console.log("道具没有配置："+this._itemId);
            }else{
                 this.item_name.text = Language.getText(a.name),
                this.priceTxt.text = this._price + n;
            }
           
        } 
        this.buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtn, this),
        this._btnWrapList.push(new UIWrap(this.buy));
        var o = Director.getModelByKey(UserModel),
        r = new Item(this._itemId, 1, 0);
       // o.isExist(r) && 3 != this._type ? (this.xufeiIcon.visible = !0, this.buyIcon.visible = !1) : (this.xufeiIcon.visible = !1, this.buyIcon.visible = !0)
    }

    public onBuyBtn(e) {
        _Notification_.send(NotifyEnum.SHOP_BUY_ITEM, {
            itemId: this._id
        })
    }
}