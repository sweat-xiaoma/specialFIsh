class FishMainView extends FullView {

    private MAIN_ITEM_COUNT = 4;
    private _bIsbackRuptJump:boolean = false;
    private loadErrorCount = 0;
    private _nExchangeActIndex = 0;

    private _mainStep1:boolean = true;
    private _uiDisplay;
    private _arrMainItem;
    // private _btnStartGame;
    private _loadingUI:LoadingUI;
    private _scrollView:PageView;
    private _bgMusicName;
    private _btnWrapList:Array<any>;

	public constructor() {
		super();
	}

	public initView() {
        
        // var e = Director.getModelByKey(UserModel);
        // e.isTodayFirstLogin() || UIUtil.startLoading();
        // Director.getModelByKey(UserModel);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/MainView.exml", this.addBgResource, this);
        this._btnWrapList = new Array();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    }

    public onResourceLoadError(e) {
		if ("currBgMusic" == e.groupName) {
			console.warn("Group:" + e.groupName + " has failed to load");
			this.loadErrorCount += 1;
			this.loadErrorCount < 3 && RES.loadGroup(e.groupName);
		}
    }

    public onResourceLoadComplete(e) {
		if ("ui_sound" == e.groupName) {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			SoundManager.uiSoundLoadEnd = !0;
			if (CONFIG.isOpenMusic) {
				this._bgMusicName = "bgm_lobby_mp3";
				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
				RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
				RES.createGroup("currBgMusic", [this._bgMusicName]);
				RES.loadGroup("currBgMusic");
			}
		}
		if ("currBgMusic" == e.groupName) {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			SoundManager.playBackgroundMusic(this._bgMusicName);
		}
    }

    public addBgResource(e, i) {
        ///////////////
        var chat:Chat = Chat.getins();
        chat.init(this.stage);
        ///////////////

        var n = new eui.UILayer;
        this.addChild(n);
		this._uiDisplay = new MainViewUI();
        this._uiDisplay.skinName = e;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        n.addChild(this._uiDisplay);
        this.send(NotifyEnum.MAIN_UI_INIT);
        var itemArr = new Array();
        this._arrMainItem = new Array;

        var o = 0;
        var callBackFun = function() {
            o++;
            if (o > 3) {
                UIUtil.closeLoading();
                var e = Director.getModelByKey(UserModel);
                if (e.getGuideID() >= 1) {
                    LoaderUtil.startMainSilentLoad();
                    CONFIG.isOpenMusic && RES.loadGroup("ui_sound");
                }
            }
        };
        for (var s = 1; s < this.MAIN_ITEM_COUNT; s++) {
			if (s == GlobalManager.getInstance().MAIN_ENTR_IDX) {
				var l = new MainItem(s, true, callBackFun);
				// l.scaleX = l.scaleY = .8,
				itemArr.push(l);
				4 > s && this._arrMainItem.push(l);
			} else {
				var l = new MainItem(s, false, callBackFun);
				// l.scaleX = l.scaleY = .8,
				itemArr.push(l);
				4 > s && this._arrMainItem.push(l);
			}
		}

        this._scrollView = new PageView();
        this._scrollView.init(1140, 640, 340, 10);
        this._scrollView.setData(itemArr);
        this._scrollView.x = 50;
        this._scrollView.y = -100;
        this._uiDisplay.mainItemGroup.addChild(this._scrollView);
        this._scrollView.gotoPage(GlobalManager.getInstance().MAIN_ENTR_IDX);
        this._scrollView.addEventListener(ScrollEvent.SCROLL_END, this.scrollEnd, this);

        this._uiDisplay.mainItemGroup.visible = false;
        this._uiDisplay.mainItem.visible = true;
        this._uiDisplay.mainItemBlc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.mainItemJjc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.mainItemJbc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.mainItemSwc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        this._uiDisplay.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.firstChargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.monthBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        this._uiDisplay.bankruptBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.signinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this),
        this._uiDisplay.taskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this),

        this._uiDisplay.exchangeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.gonggaoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.emailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.bagBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.makeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.charge_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        // this._uiDisplay.aquariumBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this), //游戏厅 
        // this._uiDisplay.roleAvaGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this),
        // this._uiDisplay.activityBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this),
        // this._uiDisplay.vipLotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this),
        this._uiDisplay.vipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.btnAddGem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.btnAddTicket.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        
        // this._uiDisplay.guanzhuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        
        this._uiDisplay.change_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._uiDisplay.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnHome, this);
        this._uiDisplay.debugRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.printLog, this);
        this._uiDisplay.homeBtn.visible = false;
        // this._uiDisplay.imageAvaBg.touchEnabled = !1,
        // this._uiDisplay.imageAva.touchEnabled = !1,
        // this._btnWrapList.push(new tools.UIWrap(this._uiDisplay.aquariumBtn)),

        this._btnWrapList.push(new UIWrap(this._uiDisplay.mainItemBlc));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.mainItemJjc));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.mainItemJbc));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.mainItemSwc));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.homeBtn));

        this._btnWrapList.push(new UIWrap(this._uiDisplay.settingBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.firstChargeBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.monthBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.bankruptBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.signinBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.taskBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.exchangeBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.rankBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.gonggaoBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.shopBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.emailBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.bagBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.makeBtn)),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.charge_btn));
        
        this._btnWrapList.push(new UIWrap(this._uiDisplay.vipBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnAddGold));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnAddGem));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnAddTicket));
        // this._btnWrapList.push(new tools.UIWrap(this._uiDisplay.activityBtn)),
        // this._btnWrapList.push(new tools.UIWrap(this._uiDisplay.yaoqingBtn)),
        // this._btnWrapList.push(new tools.UIWrap(this._uiDisplay.guanzhuBtn)),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.change_btn));
        
        this._uiDisplay.play.addEventListener("complete", this.onTweenGroupComplete, this),
        this._uiDisplay.play.play(0);
        // this._uiDisplay.rankGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this),
        // UIUtil.screenAdapter(this._uiDisplay);
        // var u = new CGBroadcastMessageSendMessage;
        // u.initData(),
        // NetManager.send(u),
        // if (CONFIG.PLATFORM_ID != PlatformTypeEnum.QQ_ZONE || FishMainView._isOpenWanbaUI) {
            this.checkMianLogic();
        // } else {
        //     FishMainView._isOpenWanbaUI = !0;
        //     this.send(NotifyEnum.REQ_QQZONE_GIFT);
        // }
        // var d = Director.getModelByKey(UserModel);
        // d.getTatolChargeRMB() > 0 ? (this._uiDisplay.firstChargeImg.visible = !1, this._uiDisplay.chargeImg.visible = !0) : (this._uiDisplay.firstChargeImg.visible = !0, this._uiDisplay.chargeImg.visible = !1),
        // CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET ? (this._uiDisplay.yaoqingBtn.visible = !0, this._uiDisplay.yaoqingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this)) : this._uiDisplay.yaoqingBtn.visible = !1,
        // (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) && (this._uiDisplay.guanzhuBtn.visible = !0, CONFIG.IS_WEB, this._uiDisplay.guanzhuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this));
        // var h = this._uiDisplay.imageGold;
        // GameUtil.addGoldEffect(h);
        // var c = this._uiDisplay.imageGem,
        // p = egret.Tween.get(c);
        // p.wait(1e3).call(function() {
        //     egret.Tween.removeTweens(c),
        //     GameUtil.addGoldEffect(c)
        // });
        // var g = this._uiDisplay.imageTicket,
        // _ = egret.Tween.get(g);
        // _.wait(2e3).call(function() {
        //     egret.Tween.removeTweens(g),
        //     GameUtil.addGoldEffect(g)
        // });
        // this._uiDisplay.exchangeGroup;
        // this.playActExchange(),
        // tools.TweenTools.jump(this._uiDisplay.vipLotteryBtn)
    }
   
    private isToucPlog = 0;
    private lastToucPlogTime = 0;
    private printLog(e:egret.TouchEvent) {
        let currTime = egret.getTimer();
        if (currTime - this.lastToucPlogTime > 2000) {
            this.isToucPlog = 0;
        } else {
            if (this.isToucPlog>3) {
                CONFIG.IS_PRINT_LOG = !CONFIG.IS_PRINT_LOG;
                this.isToucPlog = 0;
                console.warn("plog="+CONFIG.IS_PRINT_LOG);
            } else {
                this.isToucPlog++;
            }
        }
        this.lastToucPlogTime = currTime;
    }

    private returnHome(e) {
        // window.history.back();
        // 返回大厅
        if(!this._mainStep1){
            this._uiDisplay.homeBtn.visible = false;
            this._uiDisplay.mainItemGroup.visible = false;
            this._uiDisplay.mainItem.visible = true;
            this._mainStep1 = true;
        }else{
            // var hall_url = CONFIG.HTTPS_HALL_HOST + "/enter/gamecenter";
            // this.htmlJumpPost(hall_url,config["params"]);
        }
    }

    // public playActExchange() {
    //     var e = this,
    //     t = egret.Tween.get(this._uiDisplay.exchangeGroup, {
    //         loop: !1
    //     });
    //     t.to({
    //         x: 912,
    //         y: 71,
    //         scaleX: 1,
    //         scaleY: 1
    //     },
    //     20).to({
    //         x: 912,
    //         y: 73,
    //         scaleX: 1,
    //         scaleY: .78
    //     },
    //     100).to({
    //         x: 912,
    //         y: 63,
    //         scaleX: 1,
    //         scaleY: 1
    //     },
    //     100).to({
    //         x: 912,
    //         y: 71,
    //         scaleX: 1,
    //         scaleY: 1
    //     },
    //     60).to({
    //         x: 912,
    //         y: 73,
    //         scaleX: 1,
    //         scaleY: .78
    //     },
    //     40).to({
    //         x: 912,
    //         y: 71,
    //         scaleX: 1,
    //         scaleY: 1
    //     },
    //     60).wait(5e3).call(function() {
    //         egret.Tween.removeTweens(e._uiDisplay.exchangeGroup),
    //         e.playActExchange()
    //     })
    // }

    // public showWanbaGift(e, t) {
    //     var i = new WanbaGiftView(e, t),
    //     n = new WanbaGiftMeditor(i);
    //     Director.pushView(n)
    // }

    public checkMianLogic() {
        var e = Director.getModelByKey(UserModel);
        // this.checkCiri();
        // this.send(NotifyEnum.CHECK_MAIN_ALERT);
        // if (CONFIG.openGuide) {
        //     if (9999 != e.getGuideID()) return e.setGuideID(9998),
        //     Guide.checkGuide(GuideTrriger.First),
        //     void this.playIntoAct();
        //     for (var t = T_Config_Table.getVoByKey(49).value, i = e.getGuideID(), n = t.split(","), a = 0; a < n.length; a++) if (i >= Number(n[a])) {
        //         this.send(NotifyEnum.CHECK_POP);
        //         break
        //     }
        // }
        // CONFIG.openGuide || this.send(NotifyEnum.CHECK_POP),
        this.playIntoAct();
    }

    // public checkCiri() {
    //     var e = Director.getModelByKey(UserModel),
    //     t = e.getCiriState();
    //     switch (t) {
    //     case Ciri_State.Expired:
    //         this._uiDisplay.ciriBtn.visible = !1,
    //         this._uiDisplay.expireTime.visible = !1,
    //         this._uiDisplay.ciriAlert.visible = !1;
    //         break;
    //     case Ciri_State.Gained:
    //         this._uiDisplay.ciriBtn.visible = !1,
    //         this._uiDisplay.expireTime.visible = !1,
    //         this._uiDisplay.ciriAlert.visible = !1;
    //         break;
    //     case Ciri_State.Time_Up:
    //         this._uiDisplay.ciriBtn.visible = !0,
    //         this._uiDisplay.ciriAlert.visible = !1;
    //         for (var i = new Array,
    //         n = T_Config_Table.getVoByKey(57).value, a = n.split(","), o = a.length, r = 0; o > r; r++) {
    //             var s = a[r].split("_");
    //             i.push(new game.model.Item(Number(s[0]), Number(s[1]), 0))
    //         }
    //         this._uiDisplay.ciriBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,
    //         function() {
    //             GameUtil.openCiriByPos(null, i, null, null)
    //         },
    //         this),
    //         this._uiDisplay.expireTime.text = TimeUtil.expireTime(T_Language_Table.getVoByKey(120).value);
    //         break;
    //     case Ciri_State.Un_Gain:
    //         this._uiDisplay.ciriBtn.visible = !0,
    //         this._uiDisplay.ciriAlert.visible = !0;
    //         for (var l = new Array,
    //         u = T_Config_Table.getVoByKey(57).value, d = u.split(","), h = d.length, r = 0; h > r; r++) {
    //             var s = d[r].split("_");
    //             l.push(new game.model.Item(Number(s[0]), Number(s[1]), 0))
    //         }
    //         this._uiDisplay.ciriBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,
    //         function() {
    //             GameUtil.openCiriByPos(null, l, new egret.Point(262, 659),
    //             function() {
    //                 var e = new NextDayAwardSendMessage;
    //                 e.initData(),
    //                 NetManager.send(e)
    //             })
    //         },
    //         this),
    //         this._uiDisplay.expireTime.text = TimeUtil.expireTime(T_Language_Table.getVoByKey(120).value)
    //     }
    // }

    // public openPanel(e) {
    //     switch (e) {
    //     case Pop_State.VIP:
    //         var t = Director.getModelByKey(UserModel),
    //         i = t.getVipLevel(),
    //         n = T_VipLevel_Table.getVoByKey(i),
    //         a = n.makeUpConisTo,
    //         o = n.everydayAward;
    //         if (a > 0 && t.isTodayFirstLogin()) {
    //             var r = new Array;
    //             r.push(new game.model.Item(PropEnum.GOLD, a, 0));
    //             for (var s = o.split(","), l = s.length, u = 0; l > u; u++) {
    //                 var d = s[u].split("_");
    //                 r.push(new game.model.Item(Number(d[0]), Number(d[1]), 0))
    //             }
    //             var h = this;
    //             GameUtil.openVipCommonPanel(null, r, new egret.Point(262, 659),
    //             function() {
    //                 h.send(NotifyEnum.CHECK_POP)
    //             },
    //             a)
    //         } else this.send(NotifyEnum.CHECK_POP);
    //         break;
    //     case Pop_State.MONTH_CARD:
    //         var c = new MonthCardRewardView(!0),
    //         p = new MonthCardRewardMediator(c);
    //         Director.pushView(p);
    //         break;
    //     case Pop_State.FIRST_CHARGE:
    //         break;
    //     case Pop_State.CIRI:
    //         for (var g = new Array,
    //         _ = T_Config_Table.getVoByKey(57).value, y = _.split(","), m = y.length, u = 0; m > u; u++) {
    //             var d = y[u].split("_");
    //             g.push(new game.model.Item(Number(d[0]), Number(d[1]), 0))
    //         }
    //         var f = this;
    //         GameUtil.openCiriByPos(null, g, new egret.Point(262, 659),
    //         function() {
    //             var e = new NextDayAwardSendMessage;
    //             e.initData(),
    //             NetManager.send(e),
    //             f.send(NotifyEnum.CHECK_POP)
    //         });
    //         break;
    //     case Pop_State.CIRCLE:
    //         var v = new CircleView,
    //         T = new CircleMediator(v);
    //         Director.pushView(T)
    //     }
    // }

    public playIntoAct() {
        var thisObj = this;
        this._uiDisplay.start_btn.touchEnabled = !1;
        var time = 600,
        n = egret.Tween.get(this._uiDisplay.up, {
            loop: !1
        });
        this._uiDisplay.up.y = -100,
        n.to({
            y: 0
        },
        time, egret.Ease.backOut).call(function() {
            egret.Tween.removeTweens(thisObj._uiDisplay.up)
        });
        // var a = egret.Tween.get(this._uiDisplay.down, {
        //     loop: !1
        // });
        // this._uiDisplay.down.y = 600,
        // a.to({
        //     y: 488
        // },
        // time, egret.Ease.backOut).call(function() {
        //     egret.Tween.removeTweens(thisObj._uiDisplay.down)
        // });
        // var o = egret.Tween.get(this._uiDisplay.mainBtnGroup, {
        //     loop: !1
        // });
        // this._uiDisplay.mainBtnGroup.x = -1280,
        // o.wait(time).to({
        //     x: 0
        // },
        // time, egret.Ease.backOut).call(function() {
        //     egret.Tween.removeTweens(thisObj._uiDisplay.mainBtnGroup),
        //     thisObj._uiDisplay.start_btn.touchEnabled = !0
        // });
        var r = egret.Tween.get(this._uiDisplay.rightGroup, {
            loop: !1
        });
        this._uiDisplay.rightGroup.x = 1180,
        r.to({
            x: 1080
        },
        time, egret.Ease.backOut).call(function() {
            egret.Tween.removeTweens(thisObj._uiDisplay.rightGroup)
        });
        var s = egret.Tween.get(this._uiDisplay.rankGroup, {
            loop: !1
        });
        this._uiDisplay.rankGroup.x = -150,
        s.to({
            x: -100
        },
        time, egret.Ease.backOut).call(function() {
            egret.Tween.removeTweens(thisObj._uiDisplay.rankGroup)
        });

        var pageItemArr = this._scrollView.getVisibleItems(),
        u = egret.Tween.get(pageItemArr[1], {loop: !1});
        pageItemArr[1].y = 200,
        u.to({y: 0},time, egret.Ease.backOut).call(function() {
                egret.Tween.removeTweens(pageItemArr[1])
            });
        var d = egret.Tween.get(pageItemArr[0], {loop: !1});
        pageItemArr[0].x = -175,
        d.to({x: 0}, time, egret.Ease.backOut).call(function() {
            egret.Tween.removeTweens(pageItemArr[0]),
            thisObj._scrollView.startRegistEvent()
        });
        var h = egret.Tween.get(pageItemArr[2], {loop: !1});
        pageItemArr[2].x = 875,
        h.to({x: 700}, time, egret.Ease.backOut).call(function() {
            egret.Tween.removeTweens(pageItemArr[2])
        });
    }

    // public checkAlert(e, t, i, n) {
    //     this._uiDisplay && (this._uiDisplay.alertEmail.visible = e, this._uiDisplay.alertTask.visible = t, this._uiDisplay.alertSign.visible = i, this._uiDisplay.alertMonth.visible = n)
    // }

    // public shouTips(e) {
    //     GameUtil.popTips(Language.getText(47))
    // }

    public onTweenGroupComplete() {
        this._uiDisplay && this._uiDisplay.play.play(0)
    }

    // public onTest() {
    //   
    // }

    public onButtonClick(e) {
        var t = e.target;
        if (t == this._uiDisplay.mainItemBlc) {//倍率场
            this._mainStep1 = false;
            this._uiDisplay.mainItemGroup.visible = true;
            this._uiDisplay.mainItem.visible = false;
            this._uiDisplay.homeBtn.visible = true;
        } else if (t == this._uiDisplay.mainItemJjc) {//竞技场
            this.send(NotifyEnum.CLICK_MAIN_BTN, "mainItemJjc");
        } else if (t == this._uiDisplay.mainItemJbc) {//金币场
            this.send(NotifyEnum.CLICK_MAIN_BTN, "mainItemJbc");
        } else if (t == this._uiDisplay.mainItemSwc) {//实物场
            this.send(NotifyEnum.CLICK_MAIN_BTN, "mainItemSwc");
        } else if (t == this._uiDisplay.settingBtn) {//设置
            this.send(NotifyEnum.CLICK_MAIN_BTN, "settingBtn");
        } else if (t == this._uiDisplay.firstChargeBtn) {//首充
            this.send(NotifyEnum.CLICK_MAIN_BTN, "firstCharge");
        } else if (t == this._uiDisplay.monthBtn) {//月卡
            this.send(NotifyEnum.CLICK_MAIN_BTN, "monthBtn");
        } else if (t == this._uiDisplay.bankruptBtn) {//救济金
            this.send(NotifyEnum.CLICK_MAIN_BTN, "bankruptBtn");
        } else if (t == this._uiDisplay.signinBtn) {//签到
            this.send(NotifyEnum.CLICK_MAIN_BTN, "signinBtn");
        } else if (t == this._uiDisplay.taskBtn) {//任务
            this.send(NotifyEnum.CLICK_MAIN_BTN, "taskBtn")
        } else if (t == this._uiDisplay.exchangeBtn) {//兑换
            this.send(NotifyEnum.CLICK_MAIN_BTN, "exchangeBtn");
        } else if (t == this._uiDisplay.rankBtn) {//排行
            this.send(NotifyEnum.CLICK_MAIN_BTN, "rankBtn");
        } else if (t == this._uiDisplay.gonggaoBtn) {//公告
              this.send(NotifyEnum.CLICK_MAIN_BTN, "gonggaoBtn");
        } else if (t == this._uiDisplay.shopBtn) {//商城
            this.send(NotifyEnum.CLICK_MAIN_BTN, "shopBtn");
        } else if (t == this._uiDisplay.emailBtn) {//邮件
            this.send(NotifyEnum.CLICK_MAIN_BTN, "emailBtn");
        } else if (t == this._uiDisplay.bagBtn) {//背包
            this.send(NotifyEnum.CLICK_MAIN_BTN, "bagBtn");
        } else if (t == this._uiDisplay.makeBtn) {//锻造
            this.send(NotifyEnum.CLICK_MAIN_BTN, "makeBtn");
        } else if (t == this._uiDisplay.charge_btn) {//充值
            this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_btn");
        } else if (t == this._uiDisplay.vipBtn) {//VIP
            this.send(NotifyEnum.CLICK_MAIN_BTN, "vipBtn");
        } else if (t == this._uiDisplay.btnAddGold) {//钻石
            this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_gold");
        } else if (t == this._uiDisplay.btnAddGem) {//金币
            this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_gem");
        } else if (t == this._uiDisplay.btnAddTicket) {//Ticket
            this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_ticket");
        } 

        // t == this._uiDisplay.bagBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "bagBtn") : t == this._uiDisplay.makeBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "makeBtn") : t == this._uiDisplay.bankruptBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "bankruptBtn") : t == this._uiDisplay.emailBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "emailBtn") : t == this._uiDisplay.exchangeBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "exchangeBtn") : t == this._uiDisplay.roleAvaGroup ? this.send(NotifyEnum.CLICK_MAIN_BTN, "roleAvaGroup") : t == this._uiDisplay.taskBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "taskBtn") : t == this._uiDisplay.shopBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "shopBtn") : t == this._uiDisplay.settingBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "settingBtn") : t == this._uiDisplay.signinBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "signinBtn") : t == this._uiDisplay.btnAddGold ? this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_gold") : t == this._uiDisplay.btnAddGem ? this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_gem") : t == this._uiDisplay.btnAddTicket ? this.send(NotifyEnum.CLICK_MAIN_BTN, "charge_ticket") : t == this._uiDisplay.vipBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "vipBtn") : t == this._uiDisplay.monthBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "monthBtn") : t == this._uiDisplay.vipLotteryBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "vipLotteryBtn") : t == this._uiDisplay.rankBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "rankBtn") : t == this._uiDisplay.yaoqingBtn ? window.location.href = "http://www.combunet.com/XXX/TestVX.html": t == this._uiDisplay.guanzhuBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "guanzhuBtn") : t == this._uiDisplay.activityBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "activityBtn") : t == this._uiDisplay.aquariumBtn ? this.send(NotifyEnum.CLICK_MAIN_BTN, "aquariumBtn") : 0;//GameUtil.popTips(Language.getText(47))
    }

    public scrollEnd(e) {
        if (CONFIG.openGuide) {
            var t = Director.getModelByKey(UserModel);
            if (t.getGuideID() <= 1) return
        }
        for (var i = this._scrollView.getVos(), n = 0; n < i.length; n++) {
            var a = i[n];
            if (1 == a.getSelected()) {
                if ("left" == e.scrollType) {
                    var o = n + 1;
                    if (o < i.length) {
                        var r = i[o];
                        r.setSelected(!0),
                        GlobalManager.getInstance().MAIN_ENTR_IDX = r.id
                    } else {
                        var r = i[0];
                        r.setSelected(!0),
                        GlobalManager.getInstance().MAIN_ENTR_IDX = r.id
                    }
                } else if ("right" == e.scrollType) {
                    var o = n - 1;
                    if (o > 0) {
                        var r = i[o];
                        r.setSelected(!0),
                        GlobalManager.getInstance().MAIN_ENTR_IDX = r.id
                    } else {
                        var r = i[i.length - 1];
                        r.setSelected(!0),
                        GlobalManager.getInstance().MAIN_ENTR_IDX = r.id
                    }
                }
                a.setSelected(!1);
                break
            }
        }
    }

    public updateCoins(e) {
        var t = this._uiDisplay.labelGoldNum;
        t.text = e
    }

    public setMainStateInfo(gold, gem, ticket, userLev, a, o, r, userName) {
        // this._btnStartGame = this._uiDisplay.start_btn,
        // this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButtonClick, this),
        // this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this),
        // this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this),
        // this._btnStartGame.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        var l = this._uiDisplay.labelGoldNum;
        l.text = gold;
        var u = this._uiDisplay.labelGemNum;
        u.text = gem;
        var d = this._uiDisplay.labelTicketNum;
        d.text = ticket;
        // userName.length > 6 && (userName = userName.substr(0, 10) + "..."),
        userName = this.subStrByByteNum(userName, 14);
        this._uiDisplay.user_name.text = userName;// + "  Lv:" + userLev,
        // let levObj = T_Rank_Table.getVoByKey(userLev);
        // let levName = levObj ? levObj.name : userLev;
        let levObj = T_Rank_Table.getVoByKey2(userLev);
        let levName = levObj;
        this._uiDisplay.userLevTxt.text = levName;
        // this._uiDisplay.expLab.text = o + "/" + r;
        this._uiDisplay.expLab.scaleX = parseInt(o) / parseInt(r);
        var h = 1 * Number(o) / Number(r);
        // this._uiDisplay.expCur_152.width = 152 * h;
        var c = Director.getModelByKey(UserModel);
        this._uiDisplay.vipLab.text = c.getVipLevel();
    }

    public subStrByByteNum(str:string, num:number):string {
        var realLength = 0;
        var len = str.length;
        var charCode = -1;
        var needSub = false;
        var i = 0;
        for (i = 0; i < len; i++) {  
            charCode = str.charCodeAt(i);  
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            
            if (realLength > num) {
                needSub = true;
                break;
            }
        }
        if (needSub) {
            return str.substr(0, i-1) + "...";
        } else {
            return str.substr(0, i);
        }
    }

    public setHeadIcon(e) {
        e.x=7;
        e.y=7;
        this._uiDisplay.roleAvaGroup.addChild(e);
    }

    // public onStartButtonClick(e) {
    //     this.intoRoom(null)
    // }

    // public onTouchBegin(e) {
    //     this._btnStartGame.scaleX = this._btnStartGame.scaleY = 1.1
    // }

    // public onTouchEnd(e) {
    //     this._btnStartGame.scaleX = this._btnStartGame.scaleY = 1
    // }

    public onSelectButtonClick() {
        // var e = new SelectRoomView,
        // t = new SelectRoomMediator(e);
        // Director.pushView(t)
    }

    // public intoRoom(jsonParam) {
    //     null == jsonParam ? this.send(NotifyEnum.RES_LOAD_OVER, null) : this.send(NotifyEnum.RES_LOAD_OVER, jsonParam);
    // }

    public addLoadingUI(skinClz) {
        GCBroadcastManager.clearHallBroadcast();
        this._loadingUI = new LoadingUI(skinClz);
        this.addChild(this._loadingUI);
        this._loadingUI.initView();
    }

    public updateLoading(e, t) {
        this._loadingUI && this._loadingUI.setProgress(e, t)
    }

    public closeLoadingUI() {
        (this._loadingUI && this._loadingUI.parent) && this._loadingUI.parent.removeChild(this._loadingUI);
    }

    public getScrollView() {
        return this._scrollView
    }

    public setBankruptTime(e) {
        this._uiDisplay.bankruptTime.text = e
    }

    public setBackrunptBtnAction(e) {
        e != this._bIsbackRuptJump && (e ? TweenTools.jump(this._uiDisplay.bankruptBtn) : egret.Tween.removeTweens(this._uiDisplay.bankruptBtn), this._bIsbackRuptJump = e)
    }

    public setBankruptVisble(e) {
        this._uiDisplay.bankruptTime.visible = e
    }

    public setRoomOnLineUI() {
        if (this._arrMainItem) for (var e = this._arrMainItem.length,
        t = 0; e > t; t++) this._arrMainItem[t]._alivePerson && this._arrMainItem[t]._alivePerson.setPersonNumById(this._arrMainItem[t].id)
    }

    // public setActiveAlert(e) {
    //     this._uiDisplay && (this._uiDisplay.alertActive.visible = e)
    // }

    // public setMonthAlert(e) {
    //     this._uiDisplay && (this._uiDisplay.alertMonth.visible = e)
    // }

    public destroy() {
        this._loadingUI && this._loadingUI.destroy(); 
        while (this._btnWrapList.length > 0) {
            var e = this._btnWrapList.pop();
            e.destroy();
        }
        for (var t = this._scrollView.getVos(), i = 0, n = t; i < n.length; i++) {
            var a = n[i];
            a.destory();
        }
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        if (this._uiDisplay) {
            this._uiDisplay.play.removeEventListener("complete", this.onTweenGroupComplete, this);
            this._uiDisplay.debugRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.printLog, this);

            this._uiDisplay.mainItemBlc.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.mainItemJjc.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.mainItemJbc.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.mainItemSwc.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.settingBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.firstChargeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.monthBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.bankruptBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.signinBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this),
            this._uiDisplay.taskBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this),
            this._uiDisplay.exchangeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.gonggaoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.shopBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.emailBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.bagBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.makeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.charge_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.vipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.btnAddGold.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.btnAddGem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.btnAddTicket.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.change_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            this._uiDisplay.homeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.returnHome, this);
            this._uiDisplay.debugRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.printLog, this);
            // this._btnStartGame.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButtonClick, this);
            // this._uiDisplay.aquariumBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            // this._uiDisplay.roleAvaGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            // this._uiDisplay.activityBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            // this._uiDisplay.vipLotteryBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            // // this._uiDisplay.rankGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
            // this._uiDisplay.guanzhuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            // this._uiDisplay.change_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
            // this._uiDisplay.test.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTest, this);
        }
        this.removeChildren();
        this.parent && this.parent.removeChild(this);
    }

    // 页面跳转 post数据
    public htmlJumpPost(URL, PARAMS) { 
        var temp = document.createElement("form"); 
        temp.action = URL; 
        temp.method = "post"; 
        temp.style.display = "none"; 
        for (var x in PARAMS) { 
            var opt = document.createElement("textarea"); 
            opt.name = x; 
            opt.value = PARAMS[x]; // alert(opt.name) 
            temp.appendChild(opt); 
        } 
        document.body.appendChild(temp); 
        temp.submit();
        
        return temp; 
    }
}