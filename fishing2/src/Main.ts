
declare var fileSystem;

class Main extends eui.UILayer {

    public isThemeLoadEnd:boolean = false;
    public isResourceLoadEnd:boolean = false;

    public _thm:eui.Theme;

    public loadingView:LoadingUI;

    public constructor() {
        super();

        CommonLib.setServerConfigData();

        // 资源版本号
        RES.VersionController.prototype.getVirtualUrl = function(url:string):string {
            return url + "?v=" + CONFIG.VERSION;
        }

        CommonLib.ExternalJS.registerCallback();
        CommonLib.ExternalJS.jumpOrientation(1);

        var scStr = window.location.search;
        if (scStr.indexOf("plog=true") > 0) {
            CONFIG.IS_PRINT_LOG = true;
        }
        if (scStr.indexOf("j=1") > 0) {
            CONFIG.PROTOCOL = "ws://";
        }
    }

    protected createChildren() {
        super.createChildren();
        var t = new AssetAdapter;
        this.stage.registerImplementation("eui.IAssetAdapter", t);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter);
        egret.ImageLoader.crossOrigin = "anonymous";
        if (CONFIG.RES_PATH_PREFIX && CONFIG.RES_PATH_PREFIX.toLowerCase().indexOf("http") == 0) {
            EXML.prefixURL = CONFIG.RES_PATH_PREFIX;
        }
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onFirstComplete, this);
        var i = "resource/default.res.json";
        RES.loadConfig(CONFIG.RES_PATH_PREFIX + i, CONFIG.RES_PATH_PREFIX + "resource/");
    }

    public onFirstComplete(e) {
        RES.setMaxLoadingThread(3);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onFirstComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadingComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    }

    public onLoadingComplete(e) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadingComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        
        var thmFile = "resource/default.thm.json";
        this._thm = new eui.Theme(CONFIG.RES_PATH_PREFIX + thmFile, this.stage);
        this._thm.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Loading.exml",
                function(skinClz) {
                    this.loadingView = new LoadingUI(skinClz);
                    this.stage.addChild(this.loadingView);
                    this.loadingView.initView();
                    if (CONFIG.HAS_LOGIN_VIEW) {
                        RES.createGroup("firstLoad", ["login"]);
                    } else {
                        RES.createGroup("firstLoad", ["mainUI", "common"]);
                    }
                    RES.loadGroup("firstLoad");
                }, this);
    }

    public onThemeLoadComplete() {
        this.isThemeLoadEnd = true;
        this._thm.removeEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        this.createScene();
    }

    public onResourceLoadComplete(e) {
        if ("firstLoad" == e.groupName ) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    
    public createScene() {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    }

    public onItemLoadError(e) {
        console.warn("Url:" + e.resItem.url + " has failed to load");
    }

    public onResourceLoadError(e) {
        console.warn("Group:" + e.groupName + " has failed to load");
        this.onResourceLoadComplete(e);
    }

    public onResourceProgress(e) {
        if ("firstLoad" == e.groupName) {
            this.loadingView.setProgress(e.itemsLoaded, e.itemsTotal);
        }
    }

    public startCreateScene() {
        Director.initFramework(this.stage);
        this.registModel();
        SoundManager.init();
        GCBroadcastManager.init();
        this.addGlobalListener();
        ProtobufUtil.getInstance().initCacheProto();

        if (CONFIG.HAS_LOGIN_VIEW) {
            var loginView = new LoginView();
            var loginMed = new LoginMediator(loginView);
            Director.repleaceView(loginMed);
        } else {
            GlobalManager.getInstance().login2hall(this.loadingView);
        }
        
        this.parent && this.parent.removeChild(this);
    }

    public registModel() {
        Director.registerModel(UserModel, new UserModel);
        Director.registerModel(RoomModel, new RoomModel);
        // Director.registerModel(EmailModel, new EmailModel),
        Director.registerModel(LotteryModel, new LotteryModel);
        // Director.registerModel(TaskModel, new TaskModel),
        // Director.registerModel(ExchangeModel, new ExchangeModel),
        // Director.registerModel(ActiveModel, new ActiveModel)
    }

    public addGlobalListener() {
        this.stage.addEventListener(egret.Event.ACTIVATE, this.activateHandler, this),
        this.stage.addEventListener(egret.Event.DEACTIVATE, this.deactivateHandler, this)
    }

    public activateHandler() {
        egret.log("activateHandler");
        CONFIG.isDeactivate = false;
        SoundManager.getBackgroundMusicState() && SoundManager.setBackgroundMusicState(!0, !1);
        SoundManager.getSoundEffectState() && SoundManager.setSoundEffectState(!0, !1);
    }
    
    public deactivateHandler() {
        egret.log("deactivateHandler");
        CONFIG.isDeactivate = true;
        var e = SoundManager.getBackgroundMusicState();
        var t = SoundManager.getSoundEffectState();
        SoundManager.setBackgroundMusicState(!1, !1);
        SoundManager.setSoundEffectState(!1, !1);
        SoundManager.resetBackgroundMusicState(e);
        SoundManager.resetSoundEffectState(t);
    }

    public onRotationHandler(e) {}
 
}
