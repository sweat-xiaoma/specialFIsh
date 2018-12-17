class UserLvUpView extends eui.Component {
	private _bPop;
	private _btnWrapList;
	private okBtn;
	private _lv;
	private _parentView;
	private showTips;
	private effct;
	private root;
	private scrolGroup;


	public constructor(lv, parent) {
		super();
		this._bPop = !1,
        this._btnWrapList = new Array,
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml",
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this),
        this._btnWrapList.push(new UIWrap(this.okBtn)),
        this._lv = lv,
        this._parentView = parent,
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml",
			function() {
				EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml", this.setData, this)
			}, this);
	}

	public setData() {
        var e = T_RoleLevel_Table.getVoByKey(this._lv);
        e || this.onOKButtonClick(null);
        var t = T_RoleLevel_Table.getVoByKey(this._lv - 1);
        if (t) {
            var i = t.levelUpAward, n = i.split(","), a = new Array();
            for (var o = 0; o < n.length; o++) {
                var r = n[o],
                s = r.split("_"),
                l = new Item(Number(s[0]), Number(s[1]));
                a.push(l)
            }
            this.setList(a),
            this.showTips.text = "lv." + this._lv;
            TweenTools.rotation(this.effct, 3e3),
            this._bPop || (UIUtil.popView(this.root), this._bPop = !0),
            this.effct.blendMode = egret.BlendMode.ADD;
        }
    }

    public setList(e) {
        if (e && e.length > 0) {
            for (var t = 0; t < e.length; t++) {
                var i = new BagViewItem(e[t].getItemId(), e[t].getCount());
                i.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml",
                i.name = e[t].getItemId() + "",
                i.scaleX = i.scaleY = .95,
                i.init(),
                this.scrolGroup.addChild(i)
            }
            var n = new eui.HorizontalLayout;
            n.gap = 10,
            n.horizontalAlign = egret.HorizontalAlign.CENTER,
            this.scrolGroup.layout = n,
            this.scrolGroup.anchorOffsetX = this.scrolGroup.width / 2,
            this.scrolGroup.anchorOffsetY = this.scrolGroup.height / 2
        }
    }

    public onOKButtonClick(e) {
        var t = Director.getModelByKey(UserModel);
        _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {
            userId: t.getUserId(),
            isTween: !0,
            count: t.getCoins()
        }),
        _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {
            userId: t.getUserId(),
            isTween: !0,
            count: t.getMoney()
        }),
        this._parentView && this._parentView.removeChild(this)
    }

    public destroy() {
        var e = this;
        UIUtil.closeView(e.root,
        function() {
            for (; e._btnWrapList.length > 0;) {
                var t = e._btnWrapList.pop();
                t.destroy()
            }
            e.parent && e.parent.removeChild(e),
            e.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onOKButtonClick, e)
        })
    }
}