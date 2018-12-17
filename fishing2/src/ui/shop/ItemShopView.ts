class ItemShopView extends PopView {
	public _bPop;
	public _nIdx;
	public _btnWrapList;
	public _uiDisplay;
    public gold_txt;

	public constructor() {
		super();
		this._bPop = !1,
        this._nIdx = -1;
	}

	public initView() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/ItemShopUI.exml", this.addUIResource, this),
        this._btnWrapList = new Array();

    }

    public addUIResource(e, t) {
        var i = this,
        n = new eui.UILayer;//ItemShopUI
        this.addChild(n);
		this._uiDisplay = new ItemShopViewUI();
        this._uiDisplay.skinName = e;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        n.addChild(this._uiDisplay);
        this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this._uiDisplay.gunBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSideBtnClick, this);
        this._uiDisplay.itemBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSideBtnClick, this);
        this._btnWrapList.push(new UIWrap(this._uiDisplay.closeBtn));
        this._bPop = !0;
        UIUtil.popView(this._uiDisplay);
        this._uiDisplay.itemBtn.enabled = !1;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/GunShopTtem.exml",
            function() {
            i.updateViewByIndex(2);
        },
       this);

        var userModel = Director.getModelByKey(UserModel);
        this._uiDisplay.dou_txt.text= ""+userModel.getCoins();
        this._uiDisplay.gold_txt.text= ""+userModel.getTicket();

    }

    public onSideBtnClick(e) {
        var t = e.target;
        if(t == this._uiDisplay.gunBtn){
            this._uiDisplay.gunBtn.enabled = !1;
            this._uiDisplay.itemBtn.enabled = !0;
           this.updateViewByIndex(1);
        } else if(t == this._uiDisplay.itemBtn){
            this._uiDisplay.gunBtn.enabled = !0;
           this._uiDisplay.itemBtn.enabled = !1;
            this.updateViewByIndex(2);
        }
    }

    public updateViewByIndex(e) {
        if (this._nIdx != e) if (this._nIdx = e, 2 == e) {
            this._uiDisplay.item_group.removeChildren();
            for (var t = T_Shop_Table.getAllVo(), i = !1, n = 0; n < t.length; n++) {
                var a = t[n];
                if (a.shopType == e) {
                    var o = a.price.split("_"),
                    r = new GunShopItemView(e, a.id, a.itemId, Number(o[0]), Number(o[1]), a.num);
                    r.scaleX = r.scaleY = .96,
                    this._uiDisplay.item_group.addChild(r),
                    r.name = a.itemId + "";
                    r.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLeft, this);
                }
            }
            this._uiDisplay.itemList_scroll.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this),
            this._uiDisplay.itemList_scroll.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
            var s = new eui.TileLayout;
            s.paddingTop = 20,
            s.paddingLeft = 0,
            s.paddingRight = 0,
            s.paddingBottom = 0,
            this._uiDisplay.item_group.layout = s
        } else if (1 == e) {
            this._uiDisplay.item_group.removeChildren();
            for (var t = T_Shop_Table.getAllVo(), l = function(i) {
                var n = t[i];
                if (n.shopType == e) {
                    var a = n.price.split("_");
                    var o = new ShopPaoView(e, n.id, n.itemId, Number(a[0]), Number(a[1]), n.num);
                    if (o.name = n.itemId + "", u._uiDisplay.item_group.addChild(o), o.addEventListener(egret.TouchEvent.TOUCH_TAP, u.showLeft, u), 0 == i) {
                        
                    }
                }
            },
            u = this, n = 0; n < t.length; n++) l(n);
            this._uiDisplay.itemList_scroll.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this),
            this._uiDisplay.itemList_scroll.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
            var s = new eui.TileLayout;
            s.paddingTop = 10,
            s.paddingLeft = 15,
            s.paddingRight = 15,
            s.paddingBottom = 20;
            this._uiDisplay.item_group.layout = s
        }
    }

    public showLeft(e) {
        var t = e.target.name;
        if ("" != t) {
            var i = this;
            if (1 == this._nIdx) {
                i._uiDisplay.gun_contaner.removeChildren(),
                IconUtil.getIconByIdAsync(IconType.PAOSHOW, Number(t),
                function(e) {
                    e && i._uiDisplay.gun_contaner.addChild(e)
                });
                var n = T_Item_Table.getVoByKey(Number(t));
                n && (this._uiDisplay.gun_des.text = Language.getText(n.desc));
                for (var a = this._uiDisplay.gun_group.numChildren,
                o = 0; a > o; o++) {
                    var r = this._uiDisplay.gun_group.getChildAt(o);
                    r.name == t ? (r.select.visible = !0, TweenTools.showOutAndIn(r.select, 1500)) : (r.select.visible = !1, egret.Tween.removeTweens(r.select))
                }
            } else if (2 == this._nIdx) for (var a = this._uiDisplay.item_group.numChildren,
            o = 0; a > o; o++) {
                var r = this._uiDisplay.item_group.getChildAt(o);
                r.name == t ? (r.select.visible = !0, TweenTools.showOutAndIn(r.select, 1500)) : (r.select.visible = !1, egret.Tween.removeTweens(r.select))
            }
        }
    }

    public rollOverCall(e) {}
    public onCloseBtn(e) {
        Director.popView();
    }

    public destroy() {
        var e = this;
        for (this._bPop = !1; e._btnWrapList.length > 0;) {
            var t = e._btnWrapList.pop();
            t.destroy()
        }
        UIUtil.closeView(this._uiDisplay,
        function() {
            e._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onCloseBtn, e),
            e._uiDisplay.gunBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onSideBtnClick, e),
            e._uiDisplay.itemBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onSideBtnClick, e),
            e.parent && e.parent.removeChild(e),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/GunShopItem.exml"),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/shop/ItemShopUI.exml")
        })
    }
}