class LoginView extends FullView {
	private _loginBtn = null;
    private _username = null;
    private _isNew = !1;
    private _thm;
    private _fishLoginUI;
    //  private static bLoadTHM;
    private _movie;
    private loadingView;
    
    private _username_bg;
    private _loginBtnWrap;

	public constructor() {
		super();
	}

    public initView() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/FishLogin.exml", this.addBgResource, this);
    }

    public addBgResource(e, t) {
        var i = this;
        var n = new egret.Bitmap;
        n.texture = RES.getRes("loading_jpg");
        this.addChildAt(n, 0);
        n.x = CONFIG.adaptX,
        n.y = CONFIG.adaptY;
        var a = new eui.UILayer;
        this._fishLoginUI = new FishLoginUI();
        this._fishLoginUI.horizontalCenter = 0;
        this._fishLoginUI.verticalCenter = 0;
        this._fishLoginUI.skinName = e;
        this._fishLoginUI.change_id_btn.visible = !1;
        a.addChild(this._fishLoginUI);
        
        // EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/LoadingAnim.exml",
        // function() {
        //     i._movie = new LoadingAnimUI,
        //     i._movie.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/LoadingAnim.exml",
        //     i.addChildAt(i._movie, 1);
        //     // i._movie.startAction()
        // },
        // this),
        // this.addChildAt(a, 10);
        // var o;
        // if(o = CONFIG.PLATFORM_ID == PlatformTypeEnum.ZI_YOU ) {
        //     o = new egret.Bitmap(RES.getRes("logo_png"))
        // } else{
        //     if(CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET){
        //         o = new egret.Bitmap(RES.getRes("logo_eggs_png"));
        //     }
        //     else{
        //        o =  new egret.Bitmap(RES.getRes("logo_png"));
        //     }
        // }

        // o.anchorOffsetX = o.width >> 1,
        // o.anchorOffsetY = o.height >> 1,
        // o.x = (CONFIG.contentWidth >> 1) + CONFIG.adaptX,
        // o.y = CONFIG.contentHeight - 310 + CONFIG.adaptY,
        // this.addChildAt(o, 11);
        // this._username = this._fishLoginUI.username,
        // this._loginBtn = this._fishLoginUI.login_btn,
        // this._username_bg = this._fishLoginUI.username_bg;
        // this._loginBtnWrap = new UIWrap(this._loginBtn);

        // //// 输入用户密码
        // this._username.visible = false;
        // this._fishLoginUI.login_input.visible = true;
        // this._loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameInLogin, this);

        // if (game.platform.PlatformManager.isThirdPartyLogin) {
        //     this._username.visible = !1, this._username_bg.visible = !1, this._fishLoginUI.login_btn.visible = !1,
        //     this._fishLoginUI.login_group.visible = !0,
        //     isWeixin() || IsInPC() || (this._fishLoginUI.wechat_btn.includeInLayout = !1, this._fishLoginUI.wechat_btn.touchEnabled = !1, this._fishLoginUI.wechat_btn.visible = !1),
        //     this._fishLoginUI.qq_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.thirdPartyLogin, this),
        //     this._fishLoginUI.wechat_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.thirdPartyLogin, this)
        // } else {
            // if (game.platform.PlatformManager.isPlatform) {
            //     this._username.visible = !1, this._username_bg.visible = !1;
            //     if (game.platform.PlatformManager.isAutoLogin) {
            //         this._loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoLoginFun, this)
            //     } else {
            //         (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) && (isWeixin() || (this._fishLoginUI.change_id_btn.visible = !0, this._fishLoginUI.change_id_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeButtonClick, this))), this._loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoAutoLogin, this)
            //     }
            // } else {
            //     this._loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.loginFun, this), CONFIG.isOpenMusic && RES.loadGroup("ui_sound"), game.util.UIUtil.screenAdapter(this._fishLoginUI), this.send(NotifyEnum.OPEN_NOTICE_UI)
            // }
        // }

    }

    // public thirdPartyLogin(e) {
    //     e.currentTarget == this._fishLoginUI.wechat_btn ? game.platform.PlatformManager.thirdPartyLogin(CONFIG.PLATFORM_ID, ThirdPartyType.WECHAT) : e.currentTarget == this._fishLoginUI.qq_btn && game.platform.PlatformManager.thirdPartyLogin(CONFIG.PLATFORM_ID, ThirdPartyType.QQ)
    // }

    // public onChangeButtonClick(e) {
    //     game.util.GameUtil.openConfirmByTwoButton(null,
    //     function() {
    //         CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG ? deleteCookie4YWT() : deleteCookie4ChangeAccount()
    //     },
    //     this, game.table.T_Language_Table.getVoByKey(2439).value)
    // }

    public gotoLoginFun(e) {
        return CONFIG.SERVER_USER_STATE == ServerState.BAN ? void GameUtil.openConfirm(null, null, this, Language.getText(6001)) : CONFIG.SERVER_USER_STATE == ServerState.CLOSED ? void GameUtil.openConfirm(null, null, this, Language.getText(6002)) : (UIUtil.startLoading(), this._loginBtn.visible = !1, void NetManager.initNet(CONFIG.SERVER_IP, CONFIG.SERVER_PORT,
        function() {
            var e = new LoginReq();
            e.initData(),
            e.setUserId(CONFIG.USER_ID),
            e.setAccount(CONFIG.ACCOUNT),
            e.setPlatform(CONFIG.PLATFORM_ID),
            e.setSecret(CONFIG.IDENDTITY),
            NetManager.send(e, MsgActionDefine.LoginReq);
        }))
    }

    public gameInLogin() {
        this.updateLoginBtnState(!1);
        var name = this._fishLoginUI.login_user.text;
        var pwd = this._fishLoginUI.login_pwd.text;
        CONFIG.ACCOUNT = name;
        HttpManager.init(CONFIG.LOGIN_ADDR + "login.php", egret.HttpResponseType.TEXT, egret.HttpMethod.POST, this.httpSuccFunc, this.httpFailFunc);
        HttpManager.addParam("account", name);
        HttpManager.addParam("password", pwd);
        HttpManager.addParam("platform", "" + CONFIG.PLATFORM_ID);
        HttpManager.send();
        UIUtil.startLoading();
    }

    // public gotoAutoLogin(e) {
    //     return CONFIG.SERVER_USER_STATE == ServerState.BAN ? void GameUtil.openConfirm(null, null, this, Language.getText(6001)) : CONFIG.SERVER_USER_STATE == ServerState.CLOSED ? void GameUtil.openConfirm(null, null, this, Language.getText(6002)) : (this.updateLoginBtnState(!1), game.platform.PlatformManager.gotoLoginByPlatform(CONFIG.PLATFORM_ID, this.httpSuccFunc, this.httpFailFunc), void UIUtil.startLoading())
    // }

    // public loginFun(e) {
    //     var t = this._username.text;
    //     if ("" == t) return void GameUtil.popTips("请输入数字ID");
    //     var i = new RegExp("^[0-9a-zA-Z]*$");
    //     i.test(t) ? (this.updateLoginBtnState(!1), CONFIG.ACCOUNT = t, HttpManager.init(CONFIG.LOGIN_ADDR + "login.action", egret.HttpResponseType.TEXT, egret.HttpMethod.POST, this.httpSuccFunc, this.httpFailFunc), burn.net.HttpManager.addParam("account", CONFIG.ACCOUNT), burn.net.HttpManager.addParam("password", CONFIG.ACCOUNT), burn.net.HttpManager.addParam("platform", "" + CONFIG.PLATFORM_ID), burn.net.HttpManager.send(), game.util.UIUtil.startLoading()) : (this._username.text = "", game.util.GameUtil.popTips("只能输入数字"))
    // }

    public updateLoginBtnState(e) {
        this._loginBtn.visible = e
    }

    public httpSuccFunc(e) {
        var t = JSON.parse(e),
        i = t.retcode;
        if (i == ServerState.SUCC) {
            var n = t.userId;
            CONFIG.SERVER_IP = t.host,
            CONFIG.SERVER_PORT = t.port,
            CONFIG.IDENDTITY = t.secret,
            NetManager.initNet(CONFIG.SERVER_IP, CONFIG.SERVER_PORT,
            function() {
                var e = new LoginReq;
                e.initData(),
                e.setUserId(n),
                e.setAccount(CONFIG.ACCOUNT),
                e.setPlatform(CONFIG.PLATFORM_ID),
                e.setSecret(CONFIG.IDENDTITY),
                NetManager.send(e, MsgActionDefine.LoginReq);
            })
        } else {
            if (i == ServerState.BAN) {
                GameUtil.openConfirm(null,
                    function() {
                        _Notification_.send(NotifyEnum.UPDATE_LOGIN_BTN, !0)
                    },
                    this, Language.getText(6001));
            } else {
                if (i == ServerState.CLOSED) {
                    GameUtil.openConfirm(null, null, this, Language.getText(6002));
                //  } else {
                //      GameUtil.openConfirm(null,
                //         function() {
                //             CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG ? deleteCookie4YWT() : deleteCookie4ChangeAccount()
                //         },
                //         this, Language.getText(65));
                }
            }
        }
    }

    public httpFailFunc() {
        UIUtil.closeLoading(),
        GameUtil.openConfirm(null, null, this, Language.getText(64))
    }

    /////  进入大厅 ///////////
    public enterMainView(isNew) {
        // LogUtil.timestamp = (new Date).getTime();
        // var thmFile = "resource/default.thm.json";
        // if (CONFIG.LANGUAGE == LanguageType.TW_Chinese) {
        //     thmFile = "resource/default_tw.thm.json";
        //     GlobalManager.SkinPath = "fish_skins_tw";
        // } else if (CONFIG.LANGUAGE == LanguageType.English) {
        //     thmFile = "resource/default_en.thm.json";
        //     GlobalManager.SkinPath = "fish_skins_en";
        // }
        // this._isNew = isNew;
        // this._thm = new eui.Theme(CONFIG.RES_PATH_PREFIX + thmFile, this.stage);
        // this._thm.addEventListener(eui.UIEvent.COMPLETE, this.onLoginThemeLoadComplete, this);
        // LoginView.bLoadTHM && this.initMainView();
        // this.initMainView();

        var _me = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Loading.exml",
            function(skinClz) {
                _me.initMainView(skinClz);
            }, this);
    }

    // public onLoginThemeLoadComplete() {
    //     var e = this;
    //     this._thm.removeEventListener(eui.UIEvent.COMPLETE, this.onLoginThemeLoadComplete, this),
    //     EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Loading.exml",
    //         function(skinClz) {
    //             e.initMainView(skinClz);
    //         }, this);
    // }

    public initMainView(skinClz) {
        // LoginView.bLoadTHM = !0;
        UIUtil.closeLoading();
        this.loadingView = new LoadingUI(skinClz);
        this.stage.addChild(this.loadingView);
        this.loadingView.initView();
        this.thmLoadComplete(this._isNew);
    }

    public thmLoadComplete(isNew) {
        // CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET && "7" != CONFIG.SUB_PLATFORM_ID && (isNew = false);
        if (isNew) {
            var t = Director.getModelByKey(UserModel);
            var msg:RoomInfoReq = new RoomInfoReq();
            msg.initData();
            msg.setUserId(t.getUserId());
            msg.setType(RequesetRoomState.QuickGame);
            NetManager.send(msg, RoomInfoReq);
        } else {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onConfigComplete, this),
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this),
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this),
            RES.createGroup("firstLoad", ["mainUI", "common"]);
            RES.loadGroup("firstLoad");
        }
    }

    public onConfigComplete(e) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onConfigComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        if ("firstLoad" == e.groupName) {
            var t = new FishMainView();
            var i = new FishMainMediator(t);
            Director.repleaceView(i);
            // var n = Director.getModelByKey(UserModel);
            // if (n.isTodayFirstLogin()) {
            //     var a = (new Date).getTime() - game.util.LogUtil.timestamp,
            //     o = {
            //         duration: a
            //     };
            //     game.util.LogUtil.sendLogicalLog(game.util.LogEnum.LOGIN_LOADING_TIME, o)
            // }
        }
    }


    public onItemLoadError(e) {
        console.warn("Url:" + e.resItem.url + " has failed to load");
    }

    public onResourceLoadError(e) {
        console.warn("Group:" + e.groupName + " has failed to load");
    }

    public onResourceProgress(e) {
        this.updateResProgress(e.itemsLoaded, e.itemsTotal);
    }

    public updateResProgress(e, t) {
        this.loadingView.setProgress(e, t);
    }

    public destroy() {
        // this._movie && this._movie.clearAction();
        // this._loginBtnWrap.destroy();
        // this._loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.loginFun, this),
        // this._fishLoginUI.change_id_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeButtonClick, this),
        // this.loadingView.destroy();
        this.parent && this.parent.removeChild(this);
        //console.log("LoginView destory!")
    }
}