class FishKindsView extends PopView {

    private _btnWrapList;
    private _uiDisplay:FishKindsUI;
    private _roomListGroup;

    constructor(){
        super();
        this._btnWrapList = new Array;
    }

    public addBgResource(e, t) {
        var i = new eui.UILayer;
        this.addChild(i);
        this._uiDisplay = new FishKindsUI,
        this._uiDisplay.skinName = e,
        this._uiDisplay.horizontalCenter = 0,
        this._uiDisplay.verticalCenter = 0,
        i.addChild(this._uiDisplay);


        var a = this._uiDisplay.btnClose;
        a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnClose));

        var o = Director.getModelByKey(UserModel);
        this._roomListGroup = this._uiDisplay.scrollerGroup;
        var r = new eui.Group;
        r.width = 930;

        var s = T_Fish_Table.getAllVo(), l = new Array, u = new Array, d = new Array;
        for (var h = 0; h < s.length; h++) 
            for (var c = s[h].containRoomId, p = c.split(","), g = p.length - 1; g >= 0; g--) 
                if (Number(p[g]) == o.getMatchRoomLevel()) {
                    d.push(s[h]);
                    break;
                }
        // for (var h = 0; h < d.length; h++) d[h].type >= 2 ? l.push(d[h]) : u.push(d[h]);
        for (var h = 0; h < d.length; h++) 
            d[h].functionType >= 2 ? l.push(d[h]) : u.push(d[h]);
        // 特殊鱼种
        for (var h = 0; h < l.length; h++) {
            var fishKindsItemUI = new FishKindsItemUI;
            fishKindsItemUI.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindItem.exml";
            fishKindsItemUI.iconBtn.name = "" + h;
            fishKindsItemUI.labname.text = Language.getDynamicText(13, [l[h].score]);
            fishKindsItemUI.imageicon.source = "fishkind_" + l[h].fishkindIcon + "_png";
            2 == l[h].quality ? (fishKindsItemUI.imageHuang.visible = !0, fishKindsItemUI.imageZi.visible = !1) : 3 == l[h].quality ? (fishKindsItemUI.imageHuang.visible = !1, fishKindsItemUI.imageZi.visible = !0) : (fishKindsItemUI.imageHuang.visible = !1, fishKindsItemUI.imageZi.visible = !1),
            r.addChild(fishKindsItemUI)
        }

    
        var y = new eui.TileLayout;
        if (y.paddingTop = 10, y.paddingLeft = 10, y.paddingRight = 10, y.paddingBottom = 10, r.layout = y, l.length > 0) {
            var m = new FishKindsTypeItemUI;
            m.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindTypeItem.exml",
            m.titlePutong.visible = !1,
            m.titleTeshu.visible = !0,
            this._roomListGroup.addChild(m),
            this._roomListGroup.addChild(r)
        }
        var f = new eui.Group;
        f.width = 930;
        // type ==1 
        for (var h = 0; h < u.length; h++) {
            var fishKindsItemUI = new FishKindsItemUI;
            fishKindsItemUI.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindItem.exml",
            fishKindsItemUI.iconBtn.name = "" + h;
            // var v = new Array;
            // v.push(u[h].score + ""),
            fishKindsItemUI.labname.text = Language.getDynamicText(13, [u[h].score]);
            fishKindsItemUI.imageicon.source = "fishkind_" + u[h].fishkindIcon + "_png",
            2 == u[h].quality ? (fishKindsItemUI.imageHuang.visible = !0, fishKindsItemUI.imageZi.visible = !1) : 3 == u[h].quality ? (fishKindsItemUI.imageHuang.visible = !1, fishKindsItemUI.imageZi.visible = !0) : (fishKindsItemUI.imageHuang.visible = !1, fishKindsItemUI.imageZi.visible = !1),
            f.addChild(fishKindsItemUI)
        }
        var T = new eui.TileLayout;
        T.paddingTop = 10,
        T.paddingLeft = 10,
        T.paddingRight = 10,
        T.paddingBottom = 10,
        f.layout = T;
        var E = new FishKindsTypeItemUI;
        E.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindTypeItem.exml",
        E.titlePutong.visible = !0,
        E.titleTeshu.visible = !1,
        this._roomListGroup.addChild(E),
        this._roomListGroup.addChild(f);
        var I = new eui.VerticalLayout;
        I.paddingTop = 10,
        this._roomListGroup.layout = I
    }

    public selectRightItem(e) {
        console.log("#---------------------name---->", e.target.name)
    }

    public onClosttButtonClick(e) {
        Director.popView()
    }

    public initView() {
        var e = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindItem.exml",
        function() {
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindTypeItem.exml",
            function() {
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKinds.exml", e.addBgResource, e)
            },
            e)
        },
        this)
}

    public destroy() {
        for (; this._btnWrapList.length > 0;) {
            var e = this._btnWrapList.pop();
            e.destroy()
        }
        this._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
        this.parent && this.parent.removeChild(this),
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindItem.exml"),
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKindTypeItem.exml"),
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishKinds.exml")
    }
}