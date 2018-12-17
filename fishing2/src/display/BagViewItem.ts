class BagViewItem extends eui.Component {
    public _itemId;
    public _count;
    public _selected;
    public selectedBg;
    public itemBg;
    public numBg;
    public countTxt;
    public equipState;

    public constructor(t, i, n = false) {
        super();
        this._itemId = t,
            this._count = i,
            this._selected = n;
    }

    public init() {
        var e = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml",
            function () {
                e.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml",
                    IconUtil.getIconByIdAsync(IconType.PROP, e._itemId,
                        function (t) {
                            t && (t.width = 70, t.height = 70, t.anchorOffsetX = t.width / 2, t.anchorOffsetY = t.height / 2, t.x = e.itemBg.width / 2, t.y = e.itemBg.height / 2, e.itemBg.addChild(t), e._itemId == PropEnum.FISH_TICKIT ? e.countTxt.text = e._count / 10 + "元" : e.countTxt.text = "x" + e._count)
                        });
                var t = Director.getModelByKey(UserModel),
                    i = T_Item_Table.getVoByKey(e._itemId);



                if (e._itemId == t.getCurGunBgId() || e._itemId == t.getCurSkinId()) {
                    if (e._itemId == t.getCurSkinId()) {
                        (e.equipState.visible = !0, e.numBg.visible = !0);
                    }
                } else {
                    (i.type == BagItemType.BATTERY || i.type == BagItemType.BARBETTE) && (e.numBg.visible = !1),
                        (i.type == BagItemType.BATTERY || i.type == BagItemType.BARBETTE) && (e.countTxt.visible = !1);
                }
                e.selected(e._selected);
            },
            this)
    }

    public initAutoGun() {
        var e = this,
            t = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml",
            function () {
                t.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
                var i = "ZiDong_png";
                RES.getResAsync(i,
                    function () {
                        var e = RES.getRes(i),
                            n = new egret.Bitmap(e);
                        n && (n.anchorOffsetX = n.width / 2, n.anchorOffsetY = n.height / 2, n.x = t.itemBg.width / 2, n.y = t.itemBg.height / 2, t.itemBg.addChild(n), t.countTxt.text = "自动开炮")
                    },
                    e)
            },
            this)
    }

    public selected(e) {
        e ? this.selectedBg.visible = !0 : this.selectedBg.visible = !1
    }

    public setNull() {
        this.itemBg.visible = !1,
            this.numBg.visible = !1,
            this.countTxt.visible = !1
    }

    public getItemId() {
        return this._itemId;
    }
}