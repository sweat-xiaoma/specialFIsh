class NewProgresButton extends eui.Component {

    public lockedImg;
    
    private time:any;
    private _bClick;
    private angle;
    private _bSwrap;
    private _str;
    private root;
    private numFont;
    private numGroup;
    private gemCostFont;
    private gemCostGroup;
    private bNoGem;
    private coverLeftR;
    private coverRightR;
    private cover;
    private gemGroup;
    private rect;
    private gemIcon;
    private _imageRight;
    private  _imageLeft;
    private icon;
    private _Leftshape;
    private _Rightshape;
    private _nTimeTotal;
    private _funCall;


	public constructor(t,i) {
        super();
        this.time = 0;
        var n = this;
         n._bClick = !0,
        n.angle = 0,
        n._bSwrap = !1,
        n.skinName = t,
        n._str = i,
        n.root.addEventListener(egret.TouchEvent.TOUCH_END, n.click, n),
        n.scaleX = 1,
        n.scaleY = 1,
        n.numFont = new egret.BitmapText,
        n.numFont.font = RES.getRes("iconNum_1_fnt"),
        n.numFont.text = "0",
        n.numFont.scaleX = 1.04,
        n.numFont.scaleY = 1.03,
        n.numFont.anchorOffsetX = n.numFont.width,
        n.numFont.anchorOffsetY = n.numFont.height / 2,
        n.numGroup.addChild(n.numFont),
        n.gemCostFont = new egret.BitmapText,
        n.gemCostFont.font = RES.getRes("iconNum_1_fnt"),
        n.gemCostFont.text = "0",
        n.gemCostFont.scaleX = 1.04,
        n.gemCostFont.scaleY = 1.03,
        n.gemCostFont.anchorOffsetX = n.gemCostFont.width,
        n.gemCostFont.anchorOffsetY = n.gemCostFont.height / 2,
        n.gemCostGroup.addChild(n.gemCostFont),
        n.bNoGem = !1,
        n.initOld();
	}

 


    public setTypeSide() {
        this.scaleX = .7,
        this.scaleY = .7,
        this.coverLeftR.scaleX = .85,
        this.coverLeftR.scaleY = .85,
        this.coverRightR.scaleX = .85,
        this.coverRightR.scaleY = .85,
        this.cover.visible = !1,
        this.gemGroup.right = 0,
        this.gemGroup.bottom = 0,
        this.gemGroup.width = 75,
        this.rect.width = 90,
        this.rect.x -= 15,
        this.rect.bottom = 8,
        this.gemIcon.y -= 5,
        this.gemCostGroup.y -= 5,
        this.numGroup.right = 3,
        this.numGroup.bottom = 15
    }
    public setTypeWar() {
        this.scaleX = .75,
        this.scaleY = .75,
        this.coverLeftR.scaleX = .85,
        this.coverLeftR.scaleY = .85,
        this.coverRightR.scaleX = .85,
        this.coverRightR.scaleY = .85,
        this.cover.visible = !1,
        this.gemGroup.right = 5,
        this.gemGroup.bottom = 5,
        this.gemGroup.width = 90,
        this.rect.width = 90,
        this.rect.height = 30,
        this.rect.x -= 6,
        this.rect.bottom = 4,
        this.gemIcon.y -= 5,
        this.gemIcon.x -= 8,
        this.gemCostGroup.y -= 5,
        this.numGroup.right = 8,
        this.numGroup.bottom = 20
    }
    public setNum(e) {
        return this.bNoGem ? (this.numFont.text = e, this.numFont.anchorOffsetX = this.numFont.width, this.numFont.anchorOffsetY = this.numFont.height / 2, this.gemGroup.visible = !1, void(this.numGroup.visible = !0)) : ("0" == e && "-1" != this.gemCostFont.text ? (this.gemGroup.visible = !0, this.numGroup.visible = !1) : (this.gemGroup.visible = !1, this.numGroup.visible = !0), this.numFont.text = e, this.numFont.anchorOffsetX = this.numFont.width, void(this.numFont.anchorOffsetY = this.numFont.height / 2))
    }
    public setGemCost(e) {
        return void 0 == e ? (this.gemCostGroup.visible = !1, "-1" != this.gemCostFont.text, void(this.bNoGem = !0)) : (this.gemCostFont.text = e, this.gemCostFont.anchorOffsetX = this.gemCostFont.width, void(this.gemCostFont.anchorOffsetY = this.gemCostFont.height / 2))
    }
    public initOld() {
        this._imageRight && this.icon.removeChild(this._imageRight),
        this._imageLeft && this.icon.removeChild(this._imageLeft),
        this.icon.getChildByName("_Leftshape") && this.icon.removeChild(this._Leftshape),
        this.icon.getChildByName("_Rightshape") && this.icon.removeChild(this._Rightshape),
        this._imageRight = new egret.Bitmap(RES.getRes(this._str + "_2_png")),
        this._imageRight.anchorOffsetX = 0,
        this._imageRight.anchorOffsetY = this._imageRight.height >> 1,
        this._imageLeft = new egret.Bitmap(RES.getRes(this._str + "_1_png")),
        this._imageLeft.anchorOffsetX = this._imageLeft.width,
        this._imageLeft.anchorOffsetY = this._imageLeft.height >> 1,
        this.icon.addChildAt(this._imageRight, 0),
        this.icon.addChildAt(this._imageLeft, 2)
    }
    public setIcon(e) {}
    public initObj() {
        this._bClick = !0,
        this._bSwrap = !1,
        this._imageRight && this.icon.removeChild(this._imageRight),
        this._imageLeft && this.icon.removeChild(this._imageLeft),
        this.icon.getChildByName("_Leftshape") && this.icon.removeChild(this._Leftshape),
        this.icon.getChildByName("_Rightshape") && this.icon.removeChild(this._Rightshape),
        this._imageRight = new egret.Bitmap(RES.getRes(this._str + "_2_png")),
        this._imageRight.anchorOffsetX = 0,
        this._imageRight.anchorOffsetY = this._imageRight.height >> 1,
        this._imageLeft = new egret.Bitmap(RES.getRes(this._str + "_1_png")),
        this._imageLeft.anchorOffsetX = this._imageLeft.width,
        this._imageLeft.anchorOffsetY = this._imageLeft.height >> 1,
        this._imageLeft.x = 0,
        this._Leftshape = new eui.Rect,
        this._Leftshape.alpha = .7,
        this._Leftshape.width = 139,
        this._Leftshape.height = 139,
        this._Leftshape.name = "_Leftshape",
        this._Leftshape.anchorOffsetX = this._Leftshape.width,
        this._Leftshape.anchorOffsetY = this._Leftshape.height >> 1,
        this._Leftshape.mask = this.coverLeftR,
        this._Leftshape.x = 0,
        this._Rightshape = new eui.Rect,
        this._Rightshape.alpha = .7,
        this._Rightshape.width = 139,
        this._Rightshape.height = 139,
        this._Rightshape.name = "_Rightshape",
        this._Rightshape.anchorOffsetX = 0,
        this._Rightshape.anchorOffsetY = this._Rightshape.height >> 1,
        this._Rightshape.mask = this.coverRightR,
        this.icon.addChild(this._imageRight),
        this.icon.addChild(this._Rightshape),
        this.icon.addChild(this._imageLeft),
        this.icon.addChild(this._Leftshape)
    }

   

    public setTimeTotal(e) {
        e += 1,
        this._nTimeTotal = 360 / (1e3 * e)
    }
    public setButtonClickFun(e) {
        this._funCall = e
    }
    public click(e) {
        this.icon.filters = null,
        this._bClick && this._funCall(e)
    }
    public startBtnTick() {
        this.initObj(),
        this._bClick = !1,
        this.angle = 0,
        this.time = egret.getTimer();
        egret.startTick(this.fun, this)
    }
    public fun(e) {
        if (!this._bClick) {
            var t = e,
            i = this.time,
            n = t - i;
            return this.time = t,
            this.angle += this._nTimeTotal * n,
            this.changeGraphics(this.angle),
            Math.floor(this.angle) >= 180 && !this._bSwrap && this.changeWrap(),
            Math.floor(this.angle) >= 360 && (this.changeGraphics( - 1), egret.stopTick(this.fun, this), this._bClick = !0),
            !0
        }
    }
    public changeGraphics(e) {
        return 0 != e ? -1 == e ? void this.initOld() : void(this._bSwrap ? this._Leftshape.rotation = e - 180 : this._Rightshape.rotation = e) : void 0
    }
    public changeWrap() {
        this._bSwrap = !0,
        this.icon.swapChildrenAt(0, 2),
        this.icon.swapChildrenAt(1, 3),
        this._Rightshape.visible = !1,
        this._imageLeft.x = 0,
        this._Leftshape.x = 0
    }
    public stopBtnTick() {
        this.changeGraphics( - 1),
        this._bClick = !0
    }
    public isClick() {
        return this._bClick
    }
    public destory() {
        this.root.removeEventListener(egret.TouchEvent.TOUCH_END, this.click, this),
        this._bClick && egret.stopTick(this.fun, this)
    }
}

