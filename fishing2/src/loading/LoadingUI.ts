class LoadingUI extends egret.Sprite  {
    public _tipsIdx;
    public _loadingUI:FishLoadingUI;
    
    public _tipsArr;
    public _tipsTxt:eui.Label;
    public _timer;

    private skin;

    public constructor(skinClz) {
        super();
        this._tipsIdx = 0;
        this.skin = skinClz;
    }

    public initView() {
        // 加载背景图
        // var t = new egret.Bitmap(RES.getRes("loading_jpg"));
        // this.addChildAt(t, 0);
        // t.x = CONFIG.adaptX;
        // t.y = CONFIG.adaptY;

        // 加载loading exml
        // var i = new eui.UILayer();
        // this.addChildAt(i, 2);
        this._loadingUI = new FishLoadingUI();
        // this._loadingUI.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Loading.exml";
        this._loadingUI.skinName = this.skin;
        this._loadingUI.horizontalCenter = 0;
        this._loadingUI.verticalCenter = 0;
        this.addChild(this._loadingUI);


        // this._loadingUI.play.play(0);
       

        //暂时没有logo
        // var n = "logo_png";
        // CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET && (n = "logo_eggs_png"),
        // RES.getResAsync(n,
        // function(t, i) {
        //     var n = new egret.Bitmap(t);
        //     n.anchorOffsetX = n.width >> 1,
        //     n.anchorOffsetY = n.height >> 1,
        //     n.x = (CONFIG.contentWidth >> 1) + CONFIG.adaptX,
        //     n.y = CONFIG.contentHeight - 300 + CONFIG.adaptY,
        //     this.addChildAt(n, 10)
        // },
        // this);

        //tips
        var a = T_Config_Table.getVoByKey(24);
        this._tipsArr = a.value.split(",");
        this._tipsTxt = this._loadingUI.tipText;
        this._tipsTxt.text = Language.getText(Number(this._tipsArr[this._tipsIdx]));
        this._tipsIdx++;

        this._timer = new egret.Timer(3000, 0);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._timer.start();
        UIUtil.screenAdapter(this._loadingUI, this.stage.stageWidth, this.stage.stageHeight);
    }

    public timerFunc() {
        if (this._tipsIdx < this._tipsArr.length){
            this._tipsTxt.text = Language.getText(Number(this._tipsArr[this._tipsIdx]));
        }else{
            this._tipsIdx = 0;
            this._tipsTxt.text = Language.getText(Number(this._tipsArr[this._tipsIdx]))
        }
        this._tipsIdx++
    }

    public setProgress(e, t) {
        this._loadingUI.progressBar.value = e;
        this._loadingUI.progressBar.maximum = t;

        this._loadingUI.changeFishAnimPos(e/t);
    }

    public destroy() {
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this),
        this.parent && this.parent.removeChild(this)
    }
}
