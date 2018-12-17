
class ForgeView extends PopView {
	public loadErrorCount;
	public _btnWrapList;
	public _uiDisplay:ForgeUI;
	public _bIsRunning:boolean; //锻造中
	public _arrImage;
	public _arrLab;
	public _isUseEns;
	public _bEnough:boolean;
	public _curRate; 

	public constructor() {
		super();

		this.loadErrorCount = 0,
		this._btnWrapList = new Array(),
        UIUtil.startLoading()
	}

    public initView() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Forge.exml", this.addBgResource, this)
    }

	public addBgResource(e, t) {
        UIUtil.closeLoading();

        var baseLayer = new eui.UILayer;
        this.addChild(baseLayer);

        this._uiDisplay = new ForgeUI();
        this._uiDisplay.skinName = e,
        this._uiDisplay.horizontalCenter = 0,
        this._uiDisplay.verticalCenter = 0,
        baseLayer.addChild(this._uiDisplay),

        UIUtil.popView(this._uiDisplay.root),
        this._bIsRunning = false;
        this._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnClose)),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.okBtn)),
        this._uiDisplay.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKButtonClick, this),
        this._uiDisplay.useEns.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeUse, this),
        this._arrImage = new Array,
        this._arrImage.push(this._uiDisplay.ensIcon0),
        this._arrImage.push(this._uiDisplay.ensIcon1),
        this._arrImage.push(this._uiDisplay.ensIcon2),
        this._arrImage.push(this._uiDisplay.ensIcon3),
        this._arrLab = new Array,
        this._arrLab.push(this._uiDisplay.costEnsLab1),
        this._arrLab.push(this._uiDisplay.costEnsLab2),
        this._arrLab.push(this._uiDisplay.costEnsLab3),
        this._arrLab.push(this._uiDisplay.costEnsLab4),
        this._isUseEns = false,
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
        RES.loadGroup("forge")
    };

    public onResourceLoadComplete(e) {
        if ("forge" == e.groupName){
            // 资源加载完成，通知Mediator
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
            this.send(NotifyEnum.CHECK_FORGEUI_LOADED)
        }    
    }

    public onResourceLoadError(e) {
        this.loadErrorCount += 1,
        console.warn("Group:" + e.groupName + " has failed to load"),
        this.loadErrorCount < 5 && RES.loadGroup(e.groupName)
    }

    public setUIData(e, t, i) {
        void 0 === t && (t = !1),
        void 0 === i && (i = !1);
        var n = this;
        this._bEnough = i;
        var a = Director.getModelByKey(UserModel),
        o = T_Gun_Table.getVoByKey(e),
        r = T_Gun_Table.getVoByKey(e + 1),
        s = o.bulletNum;
        if (this._curRate = s + "", this._uiDisplay.paobeiNum.text = s + "", r) {
            var l = r.bulletNum,
            u = new Array;
            u.push(l + ""),
            this._uiDisplay.titleShow.text = Language.getDynamicText(30, u)
        } else {
            this._uiDisplay.titleShow.text = T_Language_Table.getVoByKey(25).value;
        }

        IconUtil.getIconByIdAsync(IconType.PAO, a.getCurSkinId(),
        function(e) {
            if (e){
                n._uiDisplay.gunImgGroup.removeChildren(),
                e.anchorOffsetX = e.width / 2, 
                e.anchorOffsetY = e.height / 2, 
                e.scale = 2,
                n._uiDisplay.gunImgGroup.addChild(e)
            } 
        });

        var d = o.upgradeOrForgeCost,
        h = o.forgeSuccessAlsoCost,
        c = h.split("_"),
        p = d.split(",");
        p.length <= 1 && (p = "80001_10,80002_10,80003_10,80004_10".split(","), c = "80005_1800".split("_"));
        for (var g = function(t) {
            var i = p[t],
            o = i.split("_"),
            r = parseInt(o[0]),
            s = parseInt(o[1]),
            l = 0,
            u = new Item(r, 0);
            a.isExist(u) && (l = a.getItemById(r).getCount()),
            54 == e ? _._arrLab[t].text = l + "": _._arrLab[t].text = l + "/" + s,
            function(e) {
                IconUtil.getIconByIdAsync(IconType.PROP, r,
                function(t) {
                    t.anchorOffsetX = t.width / 2,
                    t.anchorOffsetY = t.height / 2,
                    t.x = e.width / 2,
                    t.y = e.height / 2,
                    e.addChild(t)
                })
            } (n._arrImage[t])
        },
        _ = this, y = 0; y < p.length; y++) g(y);
        var m = parseInt(c[0]),
        f = parseInt(c[1]),
        v = new Array;
        v.push(f + ""),
        this._uiDisplay.costEnsLab.text = Language.getDynamicText(31, v);
        var T = 0,
        E = new Item(m, 0);
        return a.isExist(E) && (T = a.getItemById(m).getCount()),
        54 == e ? this._uiDisplay.costEnsLab0.text = T + "": this._uiDisplay.costEnsLab0.text = T + "/" + f,
        IconUtil.getIconByIdAsync(IconType.PROP, m,
        function(e) {
            e.anchorOffsetX = e.width / 2,
            e.anchorOffsetY = e.height / 2,
            e.x = n._uiDisplay.ensIcon.width / 2,
            e.y = n._uiDisplay.ensIcon.height / 2,
            n._uiDisplay.ensIcon.addChild(e);
        }),
        54 == e ? (this._uiDisplay.useEns.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeUse, this), void(this._uiDisplay.costEnsLab.text = T_Language_Table.getVoByKey(25).value)) : (this._isUseEns = t, void this.changeUseEns())
    }

    public changeUseEns() {
        this._isUseEns ? (this._uiDisplay.useEnsImag.visible = !0, this._uiDisplay.useEnsImag.touchEnabled = !1) : (this._uiDisplay.useEnsImag.visible = !1, this._uiDisplay.useEnsImag.touchEnabled = !1)
    }

    public onClosttButtonClick(e) {
        Director.popView();
    }

    public onChangeUse(e) {
        this.send(NotifyEnum.SET_USEENSENCE_FLAG);
    }

    /**点击锻造按钮 */
    public onOKButtonClick(e) {
        if (!this._bIsRunning) if (this._bEnough) {
            this._bIsRunning = !0;
            var t = new UpgradeOrForgeReq();
            t.initData(),
            this._isUseEns ? t.setType(GunUpdateType.USE_ESSENCE_FORGE_TYPE) : t.setType(GunUpdateType.NO_ESSENCE_FORGE_TYPE),
            NetManager.send(t, MsgActionDefine.UpgradeOrForgeReq);
            for (var i = 0; i < this._arrImage.length; i++) !
            function(e) {
                var t = RES.getRes("ef_forge_json"),
                i = RES.getRes("ef_forge_png"),
                n = new egret.MovieClipDataFactory(t, i),
                a = new MovieFish(n.generateMovieClipData("ef_forge"), egret.Event.COMPLETE);
                a.initEvent();
                var o = a.movieClipData,
                r = 0,
                s = new egret.Rectangle(o.frames[r].x, o.frames[r].y, 0, 0);
                a.gotoAndPlay("play", 1),
                e.addChild(a),
                a.anchorOffsetX = a.width / 2 + s.x,
                a.anchorOffsetY = a.height / 2 + s.y,
                a.x = 50,
                a.y = 50,
                a.frameRate = 9
            } (this._arrImage[i])
        } else this._uiDisplay.useEns.touchEnabled = !1,
        this._uiDisplay.okBtn.touchEnabled = !1,
        GameUtil.openConfirm(this, this.callFun, this, "材料不足");
    }

    public setEffect(e) {
        var t = this;
        if (1 != e) {
            var i = RES.getRes("ef_forge_lost_png"),
            n = new egret.Bitmap(i);
            this._uiDisplay.gunGroup.addChild(n),
            n.anchorOffsetX = n.width / 2,
            n.anchorOffsetY = n.height / 2,
            n.x = 80,
            n.y = 90;
            var a = egret.Tween.get(n);
            n.alpha = 0;
            var o = this;
            a.to({
                alpha: .5
            },
            300).to({
                alpha: .8
            },
            300).to({
                alpha: 0
            },
            300).to({
                alpha: .5
            },
            300).to({
                alpha: .25
            },
            300).to({
                alpha: 0
            },
            300).call(function() {
                egret.Tween.removeTweens(n),
                o._uiDisplay.gunGroup.removeChild(n),
                o._bIsRunning = !1,
                e == UpdateOrForgeType.TYPE_MAX ? GameUtil.popTips(Language.getText(29)) : e == UpdateOrForgeType.TYPE_NOENOUGH ? GameUtil.popTips(Language.getText(29)) : e == UpdateOrForgeType.TYPE_NULL ? GameUtil.popTips(Language.getText(29)) : e == UpdateOrForgeType.TYPE_FAIL && GameUtil.popTips(Language.getText(29))
            })
        } else if (1 == e) {
            // if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
            //     var r = new ShareZiYou(ShareType.Forge_Succ, this._curRate);
            //     return this.addChild(r),
            //     void(this._bIsRunning = !1)
            // }
            var s = RES.getRes("ef_forge_win_json"),
            i = RES.getRes("ef_forge_win_png"),
            l = new egret.MovieClipDataFactory(s, i),
            u = new MovieFish(l.generateMovieClipData("ef_forge_win"), egret.Event.COMPLETE,
            function() {
                GameUtil.popTips("锻造成功"),
                t._bIsRunning = !1
            });
            u.initEvent();
            var d = u.movieClipData,
            h = 0,
            c = new egret.Rectangle(d.frames[h].x, d.frames[h].y, 0, 0);
            u.gotoAndPlay("play", 1),
            this._uiDisplay.gunGroup.addChild(u),
            u.frameRate = 9,
            u.anchorOffsetX = u.width / 2 + c.x,
            u.anchorOffsetY = u.height / 2 + c.y,
            u.x = 67,
            u.y = 90
        }
    }

    public callFun(e) {
        e._uiDisplay.useEns.touchEnabled = !0,
        e._uiDisplay.okBtn.touchEnabled = !0
    }

    public destroy() {
        var e = this;
        UIUtil.closeView(this._uiDisplay.root,
        function() {
            for (; e._btnWrapList.length > 0;) {
                var t = e._btnWrapList.pop();
                t.destroy()
            }
            e._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onClosttButtonClick, e),
            e._uiDisplay.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onOKButtonClick, e),
            e.parent && e.parent.removeChild(e),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Forge.exml")
        })
    }
}