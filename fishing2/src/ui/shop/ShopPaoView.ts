class ShopPaoView extends eui.Component {
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
    public gun_des_1;

	public constructor(t, i, n, a, o, r,item="") {
		super();
		this._type = t,
        this._id = i,
        this._itemId = n,
        this._priceType = a,
        this._price = o,
        this._num = r,
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/GunTtemShop.exml";
        this._btnWrapList = new Array;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/GunTtemShop.exml", this.addResource, this);
	}

	public addResource(e, t) {
        this.x = -100;
        var i = this,
        n = Language.getText(T_Item_Table.getVoByKey(this._priceType).name);
      if (1 == this._type) {
            IconUtil.getIconByIdAsync(IconType.PAO, this._itemId,
            function(e) {
                if(e!=null){
                    e.x = (i.icon_point.width - e.width  )/2>>0;
                    e.y = ( i.icon_point.height - e.height )/2>>0;
                    i.icon_point.addChild(e);
                }
            }),
            this.desTxt.text = "x" + this._num;
             var a = T_Item_Table.getVoByKey(this._itemId);
            this.item_name.text = Language.getText(a.name);
            this.gun_des_1.text = Language.getText(a.desc);

            this.priceTxt.text = this._price + n;
             this.buy.x = 746;
             this.buy.y = 128;
        }
        this.buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtn, this);
         this._btnWrapList.push(new UIWrap(this.buy));
        var o = Director.getModelByKey(UserModel),
        r = new Item(this._itemId, 1, 0);
   
    }

    public onBuyBtn(e) {
        _Notification_.send(NotifyEnum.SHOP_BUY_ITEM, {
            itemId: this._id
        })
    }
}