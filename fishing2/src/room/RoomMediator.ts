class RoomMediator extends SimpleMediator {

    public static _isOpenWanbaUI;

    public _loaderOver = !1;
    public _isInWarhead = !1;
    public loadErrorCount = 0;
    public _arrCloneId = new Array;
    public _bSendDjsResult = !1;
    public _arrQuickInfo = new Array;
    public _peopleNum = -1;
    public _kssEndTime = -1;

    public _timer;
    public _userModel:UserModel;
    public _roomModel:RoomModel;
    public _bgMusicName;

    public _timerBroad:egret.Timer;
    public _warTimer:egret.Timer;

    public _isGun;

    private countDown;
    private warDisPlay;
    private warId;
    
    constructor (t){
        super(t);
      
    }

    public onAdded (){
        super.onAdded.call(this);
        var roomView:RoomView = this.getView();
        roomView.initView();
        // if (CONFIG.PLATFORM_ID == PlatformTypeEnum.QQ_ZONE && !t._isOpenWanbaUI) {
        //     t._isOpenWanbaUI = !0;
        //     var i = Number(window.FISHING_CONFIG.giftId);
        //     if (i > 0) {
        //         MessageDispatcher.register(ResponseType.GETWANBAGIFTBACK,
        //         function(e) {
        //             var t = e.getResult();
        //             if (0 != t) {
        //                 var i = new WanbaGiftView(t, e.getRewardList()),
        //                 n = new WanbaGiftMeditor(i);
        //                 Director.pushView(n)
        //             }
        //         });
        //         var n = new GetWanbaGiftMessage;
        //         n.initData(),
        //         n.setGiftId(i),
        //         NetManager.send(n)
        //     }
        // }
        setTimeout(function() {LoaderUtil.startFishingSilentLoad()}, 5e3);
        GlobalManager.getInstance().addReconnectListener();
    }

    public init () {
        var e = this;

        this.subscrib(NotifyEnum.ROOM_UI_INIT_END, this.uiLoadEnd);
        this.subscrib(NotifyEnum.GUN_SEND, this.gunSend),
        this.subscrib(NotifyEnum.HIT_FISH, this.hitFishSend);
        this.subscrib(NotifyEnum.USE_PROP_ITEM, this.usePropItemSend),
        this.subscrib(NotifyEnum.USE_WARHEAD, this.useWarHead),
        this.subscrib(NotifyEnum.CLICK_EXIT_ROOM, this.exitRoom),
        this.subscrib(NotifyEnum.RESET_RATE, this.resetGunPower);
        this.subscrib(NotifyEnum.CHANGE_GUN_RATE, this.resetGunRate);
        this.subscrib(NotifyEnum.OPEN_LOTTERY_UI, this.openLotteryUI),
        this.subscrib(NotifyEnum.LOCKED_FISH_DISAPPEAR, this.lockedFishDisappear);
        this.subscrib(NotifyEnum.LOCKED_FISH_CHANGE, this.changeLockedFish);
        this.subscrib(NotifyEnum.LOTTERY_UI_LOAD_END, this.showLottery);
        this.subscrib(NotifyEnum.SET_PROP_NUM, this.setPropNum);
        this.subscrib(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED, this.checkGunUpdate);
        this.subscrib(NotifyEnum.BANKRUPT_MESSAGE, this.bankruptStauts);
        this.subscrib(NotifyEnum.SEND_CLICK_FISH, this.clickFish);
        // this.subscrib(NotifyEnum.CHECK_GUN_RESET, this.checkGunRest),
        this.subscrib(NotifyEnum.SHOW_CHAKAN_PANEL, this.showChakan),
        this.subscrib(NotifyEnum.AUTO_GUN_FIRE, this.autoGunFire);
        // this.subscrib(NotifyEnum.GUIDE_OPEN, this.guideOpen),
        // this.subscrib(NotifyEnum.GUIDE_CLOSE, this.guideClose),
        // this.subscrib(NotifyEnum.TASK_GUIDE_PANEL_LOADED, this.taskLoaded),
        // this.subscrib(NotifyEnum.TASK_GUIDE_CHANGE, this.taskChange),
        // this.subscrib(NotifyEnum.TASK_GUIDE_LOAD, this.taskGuideLoad),
        // this.subscrib(NotifyEnum.POP_EXCHANGE, this.popExchange),
        // this.subscrib(NotifyEnum.POP_UPDATEEXCHANGE, this.updateExchange),
        // this.subscrib(NotifyEnum.SIGN_UP_DJS, this.signUp),
        // this.subscrib(NotifyEnum.DJS_TASK_CHANGE, this.djsTasjChange),
        // this.subscrib(NotifyEnum.DJS_RESULT_SEND, this.djsResultSend),
        // this.subscrib(NotifyEnum.CLOSE_SIGN_VIEW, this.closeSignView),
        this.subscrib(NotifyEnum.POP_CHARGE, this.popCharge);
        // this.subscrib(NotifyEnum.POP_CIRI, this.popCiri),
        // this.subscrib(NotifyEnum.CLOSE_CIRI, this.closeCiri),
        // this.subscrib(NotifyEnum.CHANGE_PHOENIX_UI, this.phoenixUI),
        // this.subscrib(NotifyEnum.PRICE_TASK_CHANGE, this.priceTaskChange),
        // this.subscrib(NotifyEnum.CLEAR_PRICE_TASK, this.clearPriceTask),
        // this.subscrib(NotifyEnum.PRICE_CHALLENGE_FAIL, this.priceFail),
        // this.subscrib(NotifyEnum.SHOW_PRICE_RANK, this.showPriceRankUI),
        // this.subscrib(NotifyEnum.CHECN_VIP_ITEM, this.checkVipItem),
        // this.subscrib(NotifyEnum.UPDATE_GORGEOUS_STATE, this.updateGorgeous);
        this.subscrib(NotifyEnum.RE_REGIST_CHANGEGUNBACK, this.reRegistGunBack);
        this.subscrib(NotifyEnum.FISHING_UNLOCK_STATUS, this.fishingUnlockStatus);
        

        // MessageDispatcher.register(MsgActionDefine.QUICKGAMEINTOROOM,
        // function(t) {
        //     e.quitGameIntoRoom(t)
        // });
        MessageDispatcher.register(MsgActionDefine.LotteryConditonAccumulate,
        function(t) {
            e.lotteryDataReceive(t);
        });
        // MessageDispatcher.register(ResponseType.EXCHANGEGOODSBACK,
        // function(t) {
        //     e.exchangeGoodsBack(t)
        // });
        // var t = new ExchangeGoodsSendMessage;
        // t.initData(),
        // NetManager.send(t),

        MessageDispatcher.unregister(MsgActionDefine.IntoRoomRes);
        MessageDispatcher.register(MsgActionDefine.IntoRoomRes, RoomMediator.rcvPlayerInfos);
        MessageDispatcher.unregister(MsgActionDefine.PondFishes);
        MessageDispatcher.register(MsgActionDefine.PondFishes, RoomMediator.rcvPondFishes);

        this._timer = new egret.Timer(1000, 0),
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this),
        this._timer.start(),
        this._userModel = Director.getModelByKey(UserModel),
        this._roomModel = Director.getModelByKey(RoomModel);
        var i = this._userModel.getMatchRoomLevel();
        this._bgMusicName = FishUtil.getMusicByRoomType(i),
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
        RES.createGroup("currBgMusic", [this._bgMusicName]),
        CONFIG.isOpenMusic && RES.loadGroup("currBgMusic");
    }

    public static rcvPlayerInfos(msg:IntoRoomRes) {
        var roomModel:RoomModel = Director.getModelByKey(RoomModel);
        var  playList = msg.getPlayerInfo();
        let isNoMe = true;
        var um:UserModel = Director.getModelByKey(UserModel);
        // console.log("=====myid="+um.getUserId());
        for (var a = 0; a < playList.length; a++) {
            let pi:PlayerInfo = playList[a];
            var o = new Roomer(pi.getUserId(), pi.getPosition(), pi.getNickName(), 
                                pi.getGunId(), pi.getCoins(), pi.getGems(), 
                                pi.getItems(), pi.getLockRelation(), pi.getVipLevel(), pi.getBatterySkinId(), 
                                pi.getGunrestSkinId(), pi.getRoleLevel(), pi.getGunPow());
            roomModel.addRoomer(o);
            if (pi.getUserId() == um.getUserId()) {
                isNoMe = false;
            }
            // console.log("=====rcv uid="+pi.getUserId()+", pos="+pi.getPosition());
        }
        // if (isNoMe) {
        //     console.log("************* Not rcv uid="+um.getUserId());
        // } else {
        //     console.log("******rcv uid="+um.getUserId());
        // }
    }
    public static rcvPondFishes(msg:PondFishes) {
        var roomModel:RoomModel = Director.getModelByKey(RoomModel);
        var list = msg.getFishes();
        for (var n = 0; n < list.length; n++) {
            if (!roomModel.isPathExist(list[n].pathId)) {
                var fish:Fish = new Fish();
                fish.fishId = list[n].fishId;
                fish.pathId = list[n].pathId;
                fish.fishType = list[n].type;
                fish.uniqId = list[n].uniId;
                fish.coord = new egret.Point(list[n].coordinate.xvalue, list[n].coordinate.yvalue);
                fish.aliveTime = Number(list[n].aliveTime);
                roomModel.addRoomLiveFish(fish);
            }
        }
    }

    public reRegistGunBack(e, t) {
        MessageDispatcher.register(MsgActionDefine.ChangeGunRes,
        function(e) {
            t.changeGunBack(e)
        })
    }
    public onResourceLoadComplete(e) {
        "currBgMusic" == e.groupName && SoundManager.playBackgroundMusic(this._bgMusicName)
    }
    public onResourceLoadError(e) {
        "currBgMusic" == e.groupName && (console.warn("Group:" + e.groupName + " has failed to load"), this.loadErrorCount += 1, this.loadErrorCount < 5 && RES.loadGroup(e.groupName))
    }

    public timerFunc() {
        var e = this.getView(), t = e.getFishList(), i = new Array, n = t.length;
        for (var a = 0; n > a; a++) {
            var o:ActionBase = t[a];
            if (o.getActor().getType() == AddFishType.FISH_GROUP) {
                o.getActionAlive() ? o.getActor().getFishList().length <= 0 && i.push(o) : i.push(o)
            } else {
                if (o.getActor().getType() == AddFishType.FISH || o.getActor().getType() == AddFishType.CATCH_WHOLE_FISH) {
                    (o.getActionAlive() || i.push(o));
                }
            }
        }
        n = i.length;
        for (var a = 0; n > a; a++) {
            var r = t.indexOf(i[a]),
            s = t.splice(r, 1);
            s.length > 0 && (FishingObjPool.getInstance().insertFishPool(s[0].getActor()), s[0].destory(), s[0] = null)
        }
        i = null
    }

    // RoomUI加载完毕
    public uiLoadEnd(e, t) {
        var i:RoomMediator = t; 
        var n:RoomView = t.getView();

        CONFIG.IS_PRINT_LOG && console.log("uiLoadEnd...");
        i.unregist();

        i.initInRoomInfo();
        n.startRoom();
        t.initGunRateData();
        UIUtil.closeLoading();
        MessageDispatcher.register(MsgActionDefine.FishingGunRes,
        function(e) {
            i.gunSendBack(e);
        });
        MessageDispatcher.register(MsgActionDefine.UserBalanceRes, //修正快速发炮金币不对的消息
        function(e) {
            i.userBalanceBack(e);
        });
        MessageDispatcher.register(MsgActionDefine.AddFish,
        function(e:AddFish) {
            i.addFish(e);
        });
        MessageDispatcher.register(MsgActionDefine.PondFishes,
        function(e) {
            i.pondFish(e);
        });
        MessageDispatcher.register(MsgActionDefine.IntoRoomRes,
        function(e) {
            i.addPlayerInRoom(e);
        });
        MessageDispatcher.register(MsgActionDefine.QuitRoom,
        function(e) {
            i.quitRoom(e);
        });
        MessageDispatcher.register(MsgActionDefine.FishingHitRes,
        function(e) {
            i.fishHitBack(e);
        });
        MessageDispatcher.register(MsgActionDefine.UseItemRes,
        function(e) {
            i.useItemBack(e);
        }),
        MessageDispatcher.register(MsgActionDefine.UseWarheadRes,
        function(e) {
            i.useWarheadBack(e);
        })
        MessageDispatcher.register(MsgActionDefine.PondState,
        function(e:PondState) {
            i.setRoomState(e.getType(), e.getFishId(), e.getUserId());
        }),
        MessageDispatcher.register(MsgActionDefine.ChangeGunRes,
        function(e) {
            i.changeGunBack(e);
        });
        MessageDispatcher.register(MsgActionDefine.UseLockItem,
        function(e) {
            i.changeLocked(e);
        })
        MessageDispatcher.register(MsgActionDefine.LockItemEnd,
        function(e) {
            i.lockedEnd(e);
        })
        MessageDispatcher.register(MsgActionDefine.RandomFishHitRes,
        function(e) {
            i.killManyFish(e);
        });
        MessageDispatcher.register(MsgActionDefine.UpgradeOrForgeRes,
        function(e) {
            i.updateOrForgeBack(e);
        }),
        MessageDispatcher.register(MsgActionDefine.LevelUp,
        function(e) {
            i.levelUp(e);
        });
        MessageDispatcher.register(MsgActionDefine.LotteryConditonAccumulate,
        function(e) {
            i.lotteryDataReceive(e);
        });
        // MessageDispatcher.register(ResponseType.FINISHTASKBACK,
        // function(e) {
        //     i.taskFinishBack(e)
        // }),
        // MessageDispatcher.register(ResponseType.GRANDPRIXSETTLEMENT,
        // function(e) {
        //     i.grandPrixSettement(e)
        // }),
        // MessageDispatcher.register(ResponseType.ARENASIGNUPBACK,
        // function(e) {
        //     i.signUpBack(e)
        // }),
        // MessageDispatcher.register(ResponseType.GRANDPRIXINFOCHANGE,
        // function(e) {
        //     i.grandPrixInfoChange(e)
        // }),
        // MessageDispatcher.register(ResponseType.THEPEOPLECHANGE,
        // function(e) {
        //     i.thePeopleBack(e)
        // }),
        // MessageDispatcher.register(ResponseType.QUICKGAMEINFOCHANGE,
        // function(e) {
        //     i.quickGameInfoChange(e)
        // }),
        // MessageDispatcher.register(ResponseType.QUICKGAMERANKRESULT,
        // function(e) {
        //     i.quickRank(e)
        // }),
        MessageDispatcher.register(MsgActionDefine.WorldBossInfo,
        function(e) {
            i.worldBossInfo(e)
        });
        // MessageDispatcher.register(ResponseType.PIRATERANKRESULT,
        // function(e) {
        //     i.showPriceResult(e)
        // }),
        // MessageDispatcher.register(ResponseType.SYNCFISHPOSINFO,
        // function(e) {
        //     i.serverFishHandler(e)
        // }),
        // MessageDispatcher.register(ResponseType.MAIL,
        // function(e) {
        //     i.receiMail(e)
        // });
        // var a = Director.getModelByKey(UserModel);
        // o = a.getGuideID();
        // 0 == o && Guide.checkGuide(GuideTrriger.GunSend);
        // var r = a.getMatchRoomLevel();
        // if (r == RequesetRoomState.DjsRoom || r == RequesetRoomState.QmsRoom) {
            // var s = Director.getModelByKey(RoomModel),
            // l = s.getRoomerById(a.getUserId());
            // r == RequesetRoomState.DjsRoom ? n.getRoomUI().setDjsUI(n.isFlip()) : r == RequesetRoomState.QmsRoom && n.getRoomUI().setQmsUI(n.isFlip()),
            // n.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(l.getRoomPos(), n.isFlip()), !1),
            // l.getDjsObj().grandPrixBulletNum > 0 && (t._bSendDjsResult = !1)
        // } else if (GameUtil.isKss(r)) {
            // n.getRoomUI().setKssUI(n.isFlip());
            // var u = new KssWaitView(r - 7),
            // d = new KssWaitMediator(u);
            // if (Director.pushView(d), -1 != t._peopleNum && _Notification_.send(NotifyEnum.CHANGE_WAIT_PEOPLE, {
            //     num: t._peopleNum
            // }), t._peopleNum >= 8) {
            //     var h = t.getView();
            //     h.getRoomUI() && h.getRoomUI().startKssTime(t._kssEndTime);
            //     var l = t._roomModel.getRoomerById(t._userModel.getUserId());
            //     if (l) {
            //         var c = l.getDjsObj().grandPrixBulletNum;
            //         c >= 600 && GameUtil.play321Go(h.getRoomUI(),
            //         function() {
            //             console.log("#--------------------------->123")
            //         })
            //     }
            // }
        // }

        // 自己添加的 更新金币和钻石用
        t.subscrib(NotifyEnum.UPDATE_ROOM_UI_COINS, t.updateRoomUICoins);
        t.subscrib(NotifyEnum.UPDATE_ROOM_UI_MONEY, t.updateRoomUIMoney);

        // if (r == RequesetRoomState.QmsRoom || GameUtil.isKss(r) ? t.subscrib(NotifyEnum.UPDATE_ROOM_UI_BULLETS, t.updateRoomUIBullets) : t.subscrib(NotifyEnum.UPDATE_ROOM_UI_COINS, t.updateRoomUICoins), t.subscrib(NotifyEnum.UPDATE_ROOM_UI_MONEY, t.updateRoomUIMoney), GameUtil.isKss(r) && (this._arrQuickInfo = new Array), r == RequesetRoomState.DjsRoom || r == RequesetRoomState.QmsRoom || GameUtil.isKss(r)) {
        //     for (var p = t._roomModel.getRoomerList(), g = t._roomModel.getRoomerById(t._userModel.getUserId()).getRoomPos(), _ = n.isFlip(), y = 0; y < p.length; y++) p[y].getRoomPos() != g ? (n.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(p[y].getRoomPos(), _), !0), n.getRoomUI().setDjsScoreByPos(RoomUtil.getPosByFlip(p[y].getRoomPos(), _), p[y].getDjsObj().grandPrixIntegral)) : (n.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(p[y].getRoomPos(), _), !1), n.getRoomUI().updateDjsScore(p[y].getDjsObj().grandPrixIntegral));
        //     if (!GameUtil.isKss(r)) {
        //         var l = t._roomModel.getRoomerById(a.getUserId());
        //         0 == l.getDjsObj().grandPrixSignUp && n.getRoomUI().openArenaSignView()
        //     }
        // }
        _Notification_.send(NotifyEnum.CHANGE_PHOENIX_UI);
        _Notification_.send(NotifyEnum.PRICE_TASK_CHANGE);
        var m = !0;
        if (CONFIG.openGuide) {
            var f = T_Config_Table.getVoByKey(49).value;
            var v = t._userModel.getGuideID();
            var T = f.split(",");
            for (var y = 0; y < T.length; y++) {
                if (v < Number(T[y])) {
                    m = !1;
                    break
                }
            }
        }
        // if (!t._userModel.bOpenedExchangeUI && m && !GameUtil.isKss(r)) {
            // var E = new ExchangeView,
            // I = new ExchangeMediator(E);
            // Director.pushView(I),
            // t._userModel.bOpenedExchangeUI = !0
        // }
        t._timerBroad = new egret.Timer(120000, 1);
        t._timerBroad.addEventListener(egret.TimerEvent.TIMER, t.broadCast, t);
        t._timerBroad.start();
    }

    //根据房间类型获得可用gun数组
    private initGunRateData() {
        var arr:Array<T_Gun> = [];

        var userModel:UserModel = Director.getModelByKey(UserModel);
        var roomType:number = userModel.getMatchRoomLevel();
        var room = T_RoomType_Table.getVoByKey(roomType);
        var sa = room.gunInterval;
        var low:number = parseInt(sa[0]);
        var top:number = parseInt(sa[1]);
        var gunList:Array<T_Gun> = T_Gun_Table.getAllVo();
        var gun:T_Gun;
        for (var i=0; i<gunList.length; i++) {
            gun = gunList[i];
            if (gun.id >= low && gun.id <= top) {
                arr.push(gun);
            }
        }

        var roomView:RoomView = this.getView();
        roomView.setGunRateListData(arr);
    }

    public broadCast() {
        this._timerBroad.removeEventListener(egret.TimerEvent.TIMER, this.broadCast, this),
        this._timerBroad = null,
        this._timerBroad = new egret.Timer(12e4, 1),
        this._timerBroad.addEventListener(egret.TimerEvent.TIMER, this.broadCast, this),
        this._timerBroad.start();
        var e = T_Config_Table.getVoByKey(85);
        if ("0" != e.value) {
            var t = e.value.split(","),
            i = Math.ceil(Math.random() * (t.length - 1)),
            n = Language.getText(Number(t[i]));
            GCBroadcastManager.addRoomBroadcast(n, 3),
            GlobalManager.getInstance().trumpetMsgList.length > 20 && GlobalManager.getInstance().trumpetMsgList.shift(),
            GlobalManager.getInstance().trumpetMsgList.unshift(n)
        }
    }
    // public signUp(e, t) {
    //     var i = Director.getModelByKey(UserModel),
    //     n = Director.getModelByKey(RoomModel),
    //     a = n.getRoomerById(i.getUserId()),
    //     o = t.getView();
    //     if (o.setAutoGunFire(!0), 0 == a.getDjsObj().grandPrixSignUp) {
    //         var r = i.getMatchRoomLevel();
    //         if (a.getDjsObj().todayGrandPrixTimes > 0) {
    //             var s = T_Config_Table.getVoByKey(62).value,
    //             l = Number(s.split("_")[1]),
    //             u = "";
    //             r == RequesetRoomState.DjsRoom ? u = Language.getText(140) : r == RequesetRoomState.QmsRoom && (u = Language.getText(155), s = T_Config_Table.getVoByKey(71).value, l = Number(s.split("_")[1]));
    //             var d = GameUtil.isEnough(CurrencyEnum.MONEY, l, !1);
    //             if (!d && 0 != a.getDjsObj().todayGrandPrixTimes) return void GameUtil.openConfirmByTwoButton(null,
    //             function() {
    //                 GameUtil.isEnough(CurrencyEnum.MONEY, l)
    //             },
    //             this, Language.getText(206));
    //             GameUtil.openConfirmByTwoButton(null,
    //             function() {
    //                 var e = new ArenaSignUpSendMessage;
    //                 e.initData(),
    //                 e.setType(r),
    //                 NetManager.send(e)
    //             },
    //             this, u)
    //         } else {
    //             var h = new ArenaSignUpSendMessage;
    //             h.initData(),
    //             h.setType(r),
    //             NetManager.send(h)
    //         }
    //     }
    // }
    // public priceTaskChange(e, t) {
    //     var i = t.getModel(TaskModel),
    //     n = i.getTaskListByType(TaskType.TASK_TYPE_PRICE);
    //     if (0 != n.length) {
    //         var a = t.getView(),
    //         o = a.getRoomUI();
    //         o && o.changePriceTask()
    //     }
    // }
    // public priceFail(e, t) {
    //     var i = t.getView(),
    //     n = i.getRoomUI();
    //     n && n.showPriceFail()
    // }
    // public clearPriceTask(e, t) {
    //     var i = t.getModel(TaskModel),
    //     n = i.getTaskListByType(TaskType.TASK_TYPE_PRICE);
    //     if (0 != n.length) {
    //         var a = t.getView(),
    //         o = a.getRoomUI();
    //         o.clearPriceTask(),
    //         o.clearPriceRank();
    //         for (var r = n.length,
    //         s = 0; r > s; s++) i.removeItem(n[s].getTaskID())
    //     }
    // }
    // public showPriceRankUI(e, t) {
    //     var i = t.getModel(TaskModel),
    //     n = i.getTaskListByType(TaskType.TASK_TYPE_PRICE);
    //     if (0 != n.length) {
    //         var a = Number(e.userId),
    //         o = Number(e.rank),
    //         r = t.getView(),
    //         s = t._roomModel.getRoomerById(a);
    //         s && r.getRoomUI().showPriceRank(s.getRoomPos(), r.isFlip(), o)
    //     }
    // }
    // public showPriceResult(e) {
    //     var t = e.getType();
    //     if (0 != t) {
    //         if (1 == t) {
    //             var i = this.getView();
    //             i.getRoomUI().clearPriceRank(),
    //             _Notification_.send(NotifyEnum.CLEAR_PRICE_TASK);
    //             var n = e.getAward(),
    //             a = e.getRank()[0].getUserId(),
    //             o = this._roomModel.getRoomerById(a),
    //             r = i.getRoomUI().getGunPointByPos(o.getRoomPos(), i.getIsFlip()),
    //             s = new egret.Point(r.x, r.y);
    //             s.y > 360 ? s.y = 670 : s.y = 50,
    //             GameUtil.flyItems(n.getCount(), n.getItemId(), new egret.Point(640, 0), new egret.Point(s.x, s.y), i.getRoomUI(), a),
    //             a != this._userModel.getUserId() ? _Notification_.send(NotifyEnum.PRICE_CHALLENGE_FAIL) : this._userModel.updateItem(n.getItemId(), n.getCount())
    //         }
    //     } else for (var l = e.getRank(), u = l.length, d = 0; u > d; d++) {
    //         var a = l[d].getUserId(),
    //         h = l[d].getRank();
    //         _Notification_.send(NotifyEnum.SHOW_PRICE_RANK, {
    //             userId: a,
    //             rank: h
    //         })
    //     }
    // }
    // public checkVipItem(e, t) {
    //     var i = t._userModel.getVipLevel(),
    //     n = t.getView(),
    //     a = n.getRoomUI(),
    //     o = T_Config_Table.getVoByKey(34).value.split("_")[0];
    //     i >= Number(o) && (a.getSidePropUI().buttonRageNN.lockedImg.visible = !1);
    //     var r = T_Config_Table.getVoByKey(35).value.split("_")[0];
    //     i >= Number(r) && (a.getSidePropUI().buttonCloneNN.lockedImg.visible = !1);
    //     var s = T_Config_Table.getVoByKey(83).value;
    //     i >= Number(s) && (a.getNuclearBtn().lockedImg.visible = !1)
    // }
    // public updateGorgeous(e, t) {
    //     var i = t.getView();
    //     i.addBoguang(),
    //     i.updateStageBubble()
    // }
    // public djsTasjChange(e, t) {
    //     var i = t.getModel(TaskModel),
    //     n = i.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
    //     if (0 != n.length) {
    //         var a = t.getView(),
    //         o = a.getRoomUI();
    //         o.setDjsTask(Number(e.times))
    //     }
    // }
    // public djsResultSend(e, t) {
    //     if (!t._bSendDjsResult) {
    //         var i = new GrandPrixSettlementSendMessage;
    //         i.initData(),
    //         i.setRoomtType(t._userModel.getMatchRoomLevel()),
    //         NetManager.send(i),
    //         t._bSendDjsResult = !0;
    //         var n = t.getView();
    //         n.getRoomUI().clearTask()
    //     }
    // }
    // public closeSignView(e, t) {
    //     var i = t.getView(),
    //     n = i.getRoomUI();
    //     n._bOpenSignView = !1
    // }

    public setPropNum(e, med) {
        var userModel = med._userModel;
        var frozen = userModel.getItemById(PropEnum.FROZEN);
        var lock = userModel.getItemById(PropEnum.LOCK);
        var clone = userModel.getItemById(PropEnum.CLONE);
        var rage = userModel.getItemById(PropEnum.RAGE);
        var calabash = userModel.getItemById(PropEnum.CALABASH);
        var warheadGold = userModel.getItemById(PropEnum.GOLD_WARHEAD);
        var warheadSilver = userModel.getItemById(PropEnum.SILVER_WARHEAD);
        var warheadBronze = userModel.getItemById(PropEnum.BRONZE_WARHEAD);
        var warheadNuclear = userModel.getItemById(PropEnum.NUCLEAR_WARHEAD);
        var roomLev = userModel.getMatchRoomLevel();
        roomLev == RequesetRoomState.QmsRoom && (rage = userModel.getItemById(PropEnum.FREE_RAGE), clone = userModel.getItemById(PropEnum.FREE_CLONE));
        var frozenCnt = 0;
        var lockCnt = 0;
        var cloneCnt = 0;
        var rageCnt = 0;
        var calabashCnt = 0;
        var f = 0;
        var v = 0;
        var T = 0;
        var E = 0;
        frozen && (frozenCnt = frozen.getCount()),
        lock && (lockCnt = lock.getCount()),
        clone && (cloneCnt = clone.getCount()),
        rage && (rageCnt = rage.getCount()),
        calabash && (calabashCnt = calabash.getCount()),
        warheadGold && (f = warheadGold.getCount()),
        warheadSilver && (v = warheadSilver.getCount()),
        warheadBronze && (T = warheadBronze.getCount()),
        warheadNuclear && (E = warheadNuclear.getCount());
        var rv:RoomView = med.getView();
        rv.setPropNum(frozenCnt, lockCnt, cloneCnt, rageCnt, calabashCnt, f, v, T, E);
    }

    public userBalanceBack(msg:UserBalanceRes) {
        var userModel:UserModel = Director.getModelByKey(UserModel);
        var usrId = msg.getUserId();
        var coins = msg.getCoins();
        var money = msg.getGems();
        if (usrId == userModel.getUserId()) {
            userModel.getCoins() != msg.getCoins() && (userModel.setCoins(coins), _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {userId: usrId}));
            userModel.getMoney() != msg.getGems() && (userModel.setMoney(money), _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {userId: usrId}));
        }
    }

    // 炮-->发射子弹
    // 1 发送消息
    // 2 扣金币
    public gunSend(e, med:RoomMediator) {
        this._isGun = !0;
        var i = med._userModel.getMatchRoomLevel();
        med._loaderOver = !0;
        var n = ProtobufUtil.getInstance().getGunSend();
        n.setAngle(Number(e.angle));
        n.setGunIndex(Number(e.gunIndex));
        n.setBulletId(e.bulletId);
        NetManager.send(n, MsgActionDefine.FishingGunReq);
        var roomer:Roomer = med._roomModel.getRoomerById(med._userModel.getUserId());
        var roomV:RoomView = med.getView();
        if (i != RequesetRoomState.QmsRoom && !GameUtil.isKss(i)) {
            var userCoins:number = med._userModel.getCoins();
            var userPow:number = roomer.getGunPow();
            var gun:T_Gun = T_Gun_Table.getVoByKey(roomer.getGunRate());
            var bulletNum:number = gun.bulletNum * userPow;
            if (roomV.getRage()) {
                // 狂暴
                var u = med._userModel.getVipLevel(),
                d = T_Config_Table.getVoByKey(34).value,
                h = d.split("_"),
                c = Number(h[0]),
                p = Number(h[1]);
                u >= c && p > u ? bulletNum *= 2 : u >= p && (bulletNum *= 3)
            }
            if (userCoins >= bulletNum) {
                //  扣金币
                var g = userCoins - bulletNum;
                med._userModel.setCoins(g),
                roomV.setRoomerCoins(roomer.getRoomPos(), g),
                SoundManager.playSoundEffect("gunFire_mp3")
            } else if (roomV.getRage() && med._userModel.getCoins() > 0) {
                // 狂暴 金币置为0
                var g = 0;
                med._userModel.setCoins(g),
                roomV.setRoomerCoins(roomer.getRoomPos(), g),
                SoundManager.playSoundEffect("gunFire_mp3");
            }
        }
        // if (i == RequesetRoomState.DjsRoom || i == RequesetRoomState.QmsRoom || GameUtil.isKss(i)) {
        //     if (roomer.getDjsObj()) {
        //         roomer.getDjsObj().grandPrixBulletNum--;
        //         roomer.getDjsObj().grandPrixBulletNum <= 0 && (roomer.getDjsObj().grandPrixBulletNum = 0);
        //         roomV.getRoomUI().updateDjdBulletNum(roomer.getDjsObj().grandPrixBulletNum);
        //         GameUtil.isKss(i) && roomV.setRoomerBullet(roomer.getRoomPos(), roomer.getDjsObj().grandPrixBulletNum);
        //     }
        //     if (i == RequesetRoomState.QmsRoom || GameUtil.isKss(i)) {
        //         _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_BULLETS, {userId: roomer.getUserId()});
        //     }
        // }
        // Guide.checkGuide(GuideTrriger.GunSend);

        return Guide.gunSendTimes >= 16 ? void Guide.checkGuide(GuideTrriger.GunSendTimes) : void Guide.gunSendTimes++;
    }

    public hitFishSend(params, t) {
        var msg = ProtobufUtil.getInstance().getHitSend();
        msg.setFishId(params.fId);
        msg.setBulletId(params.bId);
        msg.setNettingFishs(params.nettingFishs);
        NetManager.send(msg, MsgActionDefine.FishingHitReq);
    }

    public clickFish(e, t) {
        if (t._isInWarhead) {
            var i = t.getView(),
            n = RoomUtil.getFishById(i.getFishList(), Number(e));
            if (n) {
                var a = T_Fish_Table.getVoByKey(n.getFishId());
                if (2 != a.functionType) return void GameUtil.popTips(Language.getText(44));
                var o = i.getInHandWarHeadFish(),
                r = RoomUtil.getFishById(i.getFishList(), Number(o));
                r && (r.removeEffect("locked"), r.removeEffect("WarHeadLocked")),
                i.setInHandWarheadFish(Number(e)),
                n && GameUtil.setLockedEffect(n, "locked", "locked_circle_png")
            }
        }
    }

    // 使用弹头
    public useWarHead(e, t) {
        if (t._isInWarhead) return void GameUtil.popTips(Language.getText(10));
        var i = t.getView();
        if (! (i.getRoomUI().goldBulletBtn.isClick() && i.getRoomUI().silverBulletBtn.isClick() && i.getRoomUI().bronzeBulletBtn.isClick() && i.getRoomUI().nuclearBulletBtn.isClick())) return void GameUtil.popTips(Language.getText(10));
        if (i.getLocked()) return void GameUtil.popTips(Language.getText(74));
        if (i.getRage()) return void GameUtil.popTips(Language.getText(75));
        if (i.getClone()) return void GameUtil.popTips(Language.getText(76));
        var n = t._userModel.getItemById(Number(e)),
        a = Number(e),
        o = 0;
        if (n && (o = n.getCount()), 0 == o) {
            if (a != PropEnum.NUCLEAR_WARHEAD) return void GameUtil.popTips(Language.getText(42));
            var r = T_Config_Table.getVoByKey(41).value,
            s = T_Config_Table.getVoByKey(83).value,
            l = t.getModel(UserModel),
            u = l.getCurGunID(),
            d = T_Gun_Table.getVoByKey(u).bulletNum;
            if (l.getVipLevel() < Number(s)) {
                var h = Language.getDynamicText(2456, [s + ""]);
                return void GameUtil.popTips(h)
            }
            if (d < Number(r)) return void GameUtil.popTips(Language.getText(129));
            var c = T_Item_Table.getVoByKey(PropEnum.NUCLEAR_WARHEAD),
            p = Number(c.worth.split("_")[2]),
            g = GameUtil.isEnough(CurrencyEnum.MONEY, p);
            if (!g) return void GameUtil.popTips(Language.getText(130))
        }
        t._isInWarhead = !0,
        t._warTimer && (t._warTimer.stop(), t._warTimer = null);
        var _ = RoomUtil.getBonusFish(i.getFishList());
        if (! (_.length > 0)) return GameUtil.popTips(Language.getText(5)),
        void(t._isInWarhead = !1);
        i.setInHandWarheadFish(_[0].getUniqId()),
        i.setSelectFishState(!0),
        t.warDisPlay = new egret.DisplayObjectContainer;
        var y = new egret.TextField;
        y.size = 35,
        y.text = Language.getText(43),
        y.anchorOffsetX = y.width / 2,
        y.anchorOffsetY = y.height / 2,
        y.textAlign = egret.HorizontalAlign.CENTER;
        var m = RES.getRes("tipBg_png"),
        f = new egret.Bitmap(m);
        f.scaleX = 1.2,
        f.scaleY = 1.2,
        f.width = y.width + 70,
        f.anchorOffsetX = f.width / 2,
        f.anchorOffsetY = f.height / 2,
        t.warDisPlay.addChild(f),
        t.warDisPlay.addChild(y),
        i.getBulletLayer().addChild(t.warDisPlay),
        t.warDisPlay.x = CONFIG.contentWidth / 2 + CONFIG.adaptX,
        t.warDisPlay.y = CONFIG.contentHeight / 2 + CONFIG.adaptY - 100;
        var v = Number(e);
        t.warId = v,
        v == PropEnum.GOLD_WARHEAD ? i.getRoomUI().goldBulletBtn.startBtnTick() : v == PropEnum.SILVER_WARHEAD ? i.getRoomUI().silverBulletBtn.startBtnTick() : v == PropEnum.BRONZE_WARHEAD ? i.getRoomUI().bronzeBulletBtn.startBtnTick() : v == PropEnum.NUCLEAR_WARHEAD && i.getRoomUI().nuclearBulletBtn.startBtnTick(),
        t._warTimer = new egret.Timer(1e3, 3),
        t.countDown = 3,
        t._warTimer.addEventListener(egret.TimerEvent.TIMER, t.warFun, t),
        t._warTimer.start()
    }
    public warFun() {
        var roomView:RoomView = this.getView(),
        i = RoomUtil.getBonusFish(roomView.getFishList());
        if (i.length > 0) {
            roomView.setSelectFishState(true),
            roomView.showNum(this.countDown);
            for (var n = 0; n < i.length; n++) {
                roomView.getInHandWarHeadFish() == i[n].getUniqId() ? GameUtil.setLockedEffect(i[n], "locked", "locked_circle_png", !0) : GameUtil.setLockedEffect(i[n], "locked", "locked_png", !0)
            }
            if (this.countDown--, this.countDown <= 0) {
                this._warTimer.removeEventListener(egret.TimerEvent.TIMER, this.warFun, this),
                roomView.getBulletLayer().removeChild(this.warDisPlay);
                // 发送弹头
                var a = new UseWarheadReq;
                a.initData(),
                a.setItemId(this.warId),
                a.setUniId(roomView.getInHandWarHeadFish()),
                NetManager.send(a,MsgActionDefine.UseWarheadReq),
                SoundManager.playEffectSound("ddz25");
                for (var n = 0; n < i.length; n++) i[n].removeEffect("locked");
                roomView.setSelectFishState(false),
                this._isInWarhead = false
            }
        } else {
            GameUtil.popTips(Language.getText(5)),
            this._warTimer.stop(),
            this._warTimer = null,
            roomView.setSelectFishState(false),
            this._isInWarhead = false,
            roomView.getBulletLayer().removeChild(this.warDisPlay);
            var o = this.warId;
            o == PropEnum.GOLD_WARHEAD ? roomView.getRoomUI().goldBulletBtn.stopBtnTick() : o == PropEnum.SILVER_WARHEAD ? roomView.getRoomUI().silverBulletBtn.stopBtnTick() : o == PropEnum.BRONZE_WARHEAD ? roomView.getRoomUI().bronzeBulletBtn.stopBtnTick() : o == PropEnum.NUCLEAR_WARHEAD && roomView.getRoomUI().nuclearBulletBtn.stopBtnTick();
            for (var r = RoomUtil.getBonusFish(roomView.getFishList()), n = 0; n < r.length; n++) r[n].removeEffect("locked")
        }
    }
    public useWarheadBack(e) {
        var t = this.getView();
        RoomUtil.shakeWindow(t),
        GameUtil.bobmHexEffect(t.getBulletLayer(),
        function(e, t) {
            SoundManager.playEffectSound("cycle_bomb");
            var i = (e.getUniId(), e.getUserId()),
            n = e.getAddCoins(),
            roomer:Roomer = this._roomModel.getRoomerById(i),
            o = t.getRoomUI().getGunPointByPos(roomer.getRoomPos(), t.getIsFlip()),
            r = new egret.Point(o.x, o.y);
            if (r.y > 360 ? r.y = 670 : r.y = 50, i == this._userModel.getUserId()) {
                var s = CONFIG.contentWidth / 2,
                l = CONFIG.contentHeight / 2;
                var u = RES.getRes("ef_baojinbi_json");
                var d = RES.getRes("ef_baojinbi_png");
                var h = new egret.MovieClipDataFactory(u, d),
                c = new MovieFish(h.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
                c.initEvent(),
                c.scaleX = 2.3,
                c.scaleY = 2.3,
                // c.frameRate = 12,
                c.visible = !1;
                var p = c.movieClipData,
                g = 0,
                _ = new egret.Rectangle(p.frames[g].x, p.frames[g].y, 0, 0);
                c.anchorOffsetX = (c.width >> 1) + _.x,
                c.anchorOffsetY = (c.height >> 1) + _.y,
                // c.frameRate = 12,
                c.x = s,
                c.y = l;
                var y = t.getBulletLayer();
                y.addChild(c),
                FrameUtil.playCaipan(t, roomer, n, "-1", !0),
                setTimeout(function() {
                    GameUtil.baoFuEffect(n, t.getBulletLayer())
                },
                800)
            }
            t.removeBankrupt(roomer.getRoomPos()),
            roomer.setBankrupt(false);
        },
        this, e, t);
        var i = e.getUniId(),
        n = e.getUserId(),
        a = e.getAddCoins(),
        o = this._roomModel.getRoomerById(n),
        r = t.getRoomUI().getGunPointByPos(o.getRoomPos(), t.getIsFlip()),
        s = new egret.Point(r.x, r.y);
        s.y > 360 ? s.y = 670 : s.y = 50,
        setTimeout(function() {
            RoomUtil.fishDeadHandler(t.getFishList(), i, n, s, [{
                itemId: 10001,
                count: a
            }], t.getRoomUI(), t)
        },
        800)
    }
    public usePropItemSend(e, t) {
        var i = Director.getModelByKey(UserModel),
        n = i.getMatchRoomLevel();
        if (n == RequesetRoomState.DjsRoom || n == RequesetRoomState.QmsRoom) {
            var a = Director.getModelByKey(RoomModel),
            o = a.getRoomerById(i.getUserId());
            if (0 == o.getDjsObj().grandPrixSignUp) return void GameUtil.popTips(Language.getText(141))
        }
        if (GameUtil.isKss(n) && (Number(e) == PropEnum.RAGE || Number(e) == PropEnum.CLONE)) return void GameUtil.popTips(Language.getText(160));
        var r = t._roomModel.getPhoenix();
        if (r && r.getState() == Phoenix_State.Ing && Number(e) == PropEnum.CALABASH) return void GameUtil.popTips(Language.getText(159));
        if (CONFIG.openGuide) {
            var s = T_Config_Table.getVoByKey(49).value,
            l = i.getGuideID();
            if (l < Number(s)) {
                var u = T_Config_Table.getVoByKey(47).value,
                d = u.split("_");
                if (l >= Number(d[0]) && l <= Number(d[1])) return void GameUtil.popTips("请先进行完新手引导")
            }
        }
        var h = Number(e);
        if (h == PropEnum.LOCK || h == PropEnum.RAGE || h == PropEnum.CLONE) {
            var c = t._userModel.getUserId(),
            o = t._roomModel.getRoomerById(c);
            if (o.getBankrupt()) return void GameUtil.popTips(Language.getText(2))
        }
        if (t._isInWarhead) return void GameUtil.popTips(Language.getText(45));
        i.getMatchRoomLevel() == RequesetRoomState.QmsRoom && (Number(e) == PropEnum.RAGE ? e = PropEnum.FREE_RAGE: Number(e) == PropEnum.CLONE && (e = PropEnum.FREE_CLONE));
        var p = (t.getView(), new UseItemReq());
        p.initData(),
        p.setItemId(e),
        NetManager.send(p,MsgActionDefine.UseItemReq);
    }
    public useItemBack(msg:UseItemRes) {
        var roomView:RoomView = this.getView(),
        userId = msg.getUserId(),
        state = msg.getState();
        if (1 != state) return void(state == UseItemFail.USE_ITEM_NO_ITEM_NO_MONEY ? GameUtil.popTips(Language.getText(82)) : state == UseItemFail.USE_ITEM_NO_VIP_LEVEL ? GameUtil.popTips(Language.getText(83)) : state == UseItemFail.USE_ITEM_LOCK_CONFLICT ? GameUtil.popTips(Language.getText(84)) : state == UseItemFail.USE_ITEM_BEFORE_TIDE ? GameUtil.popTips(Language.getText(85)) : state == UseItemFail.USE_ITEM_SCORE_TOO_SMALL_USE_TOKEN ? GameUtil.popTips(Language.getText(87)) : state == UseItemFail.USE_ITEM_ALIVE_FISHES_TOO_MUCH && GameUtil.popTips(Language.getText(88)));
        var roomer:Roomer = this._roomModel.getRoomerById(userId),
        itemId = msg.getItemId();
        if (userId == this._userModel.getUserId()) {
            var r = 0,
            s = this._userModel.getItemById(itemId);
            if (s && (r = s.getCount()), 0 == r) {
                var l = T_Item_Table.getVoByKey(itemId),
                u = Number(l.worth.split("_")[2]);
                this._userModel.getMoney() >= u && (this._userModel.setMoney(this._userModel.getMoney() - u), _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {
                    userId: userId
                }))
            }
        }
        if (itemId == PropEnum.RAGE || itemId == PropEnum.FREE_RAGE) {
            if (roomer.setIsRage(!0), roomView.setRageEffect(!0, roomer.getRoomPos()), userId == this._userModel.getUserId()) {
                if (_Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1), roomView.getRoomUI().getSidePropUI().buttonRageNN.startBtnTick(), roomView.setRage(!0), !roomView.getLocked() && !roomView.getClone()) {
                    var d = this._roomModel.getRoomerById(userId),
                    maxScoreFish = RoomUtil.getMaxScoreFish(roomView.getFishList()),
                    c = new Array;
                    c.push(maxScoreFish.getUniqId());
                    var p = new LockedObj(c, d.getRoomPos(), userId);
                    roomView.setLockedObj(p),
                    userId == this._userModel.getUserId() && (GameUtil.setLockedEffect(maxScoreFish, "locked", "locked_circle_png", !0), roomView.send(NotifyEnum.LOCKED_FISH_CHANGE, {
                        fishId: maxScoreFish.getUniqId(),
                        gunIndex: 0
                    }))
                }
            } else if (!roomer.getIsLock() && !roomer.getIsClone()) {
                var maxScoreFish = RoomUtil.getMaxScoreFish(roomView.getFishList()),
                c = new Array;
                c.push(maxScoreFish.getUniqId());
                var p = new LockedObj(c, roomer.getRoomPos(), userId);
                roomView.setLockedObj(p)  
            }
        } else if (itemId == PropEnum.LOCK) {
            var maxScoreFish:ActorBase = RoomUtil.getMaxScoreFish(roomView.getFishList());
            if (!maxScoreFish) return;
            roomer.setIsLock(true),
            roomView.setLockedEffect(!0, roomer.getRoomPos());
            var c = new Array;
            c.push(maxScoreFish.getUniqId());
            var p = new LockedObj(c, roomer.getRoomPos(), userId);
            roomView.setLockedObj(p);
            if (userId == this._userModel.getUserId()) {
                _Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
                GameUtil.setLockedEffect(maxScoreFish, "locked", "locked_circle_png", !0);
                roomView.send(NotifyEnum.LOCKED_FISH_CHANGE, {fishId: maxScoreFish.getUniqId(), gunIndex: 0});
                roomView.setLocked(!0);
                roomView.getRoomUI().getFrozenAndLockUI().buttonLockNN.startBtnTick();
            }
        } else if (itemId == PropEnum.CLONE || itemId == PropEnum.FREE_CLONE) {
            roomer.setIsClone(!0),
            roomView.setCloneEffect(!0, roomer.getRoomPos());
            for (var g = roomer.getGunNum(), _ = RoomUtil.getMaxScoreFishByNum(roomView.getFishList(), g), c = new Array, y = 0; y < _.length; y++) c.push(_[y].getUniqId()),
            roomView.send(NotifyEnum.LOCKED_FISH_CHANGE, {
                fishId: _[y].getUniqId(),
                gunIndex: y
            }),
            userId == this._userModel.getUserId() && GameUtil.setLockedEffect(_[y], "locked", "locked_circle_png", !0);
            var m = roomer.getRoomPos(),
            p = new LockedObj(c, m, userId);
            roomView.setLockedObj(p),
            userId == this._userModel.getUserId() ? (_Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1), roomView.setClone(!0), roomView.setGunNum(g), roomView.getRoomUI().getSidePropUI().buttonCloneNN.startBtnTick()) : (roomView.getRoomUI().setGunState(RoomUtil.getPosByFlip(roomer.getRoomPos(), roomView.getIsFlip()), !0, 3, roomer.getRoomPos()), this.insertClonePos(roomer.getRoomPos()))
        } else if (itemId == PropEnum.FROZEN) {
            var f = msg.getFrozenFishIds();
            roomView.frozen(f),
            SoundManager.playEffectSound("ice");
            if ( userId == this._userModel.getUserId()){
                roomView.getBulletLayer().showFrozen();
                roomView.getRoomUI().getFrozenAndLockUI().buttonFrozenNN.startBtnTick();
            }
        // } else if (itemId == PropEnum.CALABASH) {
        //     var v = msg.getAddFish(),
        //     T = v.fishId,
        //     E = v.uniId,
        //     I = v.pathId,
        //     b = v.coordinate.xvalue,
        //     C = v.coordinate.yvalue,
        //     x = T_FishPath_Table.getVoByKey(I);
        //     if (null != x) {
        //         var w = RoomUtil.getFishPathById(I),
        //         R = RoomUtil.getPointsByCala(w, x.calabashPoint),
        //         A = R.point;
        //         roomView.useCalabash(roomer.getRoomPos(), E[0], T, I, b, C, b + A.x, C + A.y, x.calabashPoint)
        //     } else roomView.useCalabash(roomer.getRoomPos(), E[0], T, I, b, C, 400 * Math.random() + 400, 200 * Math.random() + 200, -1);
        //     userId == this._userModel.getUserId() && (roomView.getRoomUI().getSidePropUI().buttonCalabashNN.startBtnTick(), SoundManager.playEffectSound("godlamp_begin"))
        }
        _Notification_.send(NotifyEnum.SET_PROP_NUM);
    }
    public changeLockedFish(e, t) {
        var i = Director.getModelByKey(UserModel),
        msg:UseLockItem = new UseLockItem();
        msg.initData(),
        msg.setUserId(i.getUserId()),
        msg.setFishId(parseInt(e.fishId)),
        msg.setGunIndex(parseInt(e.gunIndex)),
        msg.setItemId(0),
        NetManager.send(msg, MsgActionDefine.UseLockItem);
    }

    public lockedFishDisappear(e, t) {
        var i = Number(e.index),
        n = Boolean(e.simple),
        a = t.getView(),
        o = Director.getModelByKey(UserModel),
        r = null,
        s = t._roomModel.getRoomerById(o.getUserId());
        if (s) {
            var l = s.getGunNum();
            if (n) {
                var u = RoomUtil.getMaxScoreFishByNum(a.getFishList(), 1);
                r = u[0]
            } else for (var u = RoomUtil.getMaxScoreFishByNum(a.getFishList(), l), d = 0; d < u.length; d++) {
                for (var h = !1,
                c = 0; l > c; c++) {
                    var p = a.getLockedFishId(o.getUserId(), c);
                    if (p == u[d].getUniqId()) {
                        h = !0;
                        break
                    }
                }
                h || (r = u[d])
            }
            if (null != r) {
                a.changeLockedFish(o.getUserId(), r, i);
                var g = new UseLockItem();
                g.initData(),
                g.setUserId(o.getUserId()),
                g.setFishId(r.getUniqId()),
                g.setGunIndex(i),
                g.setItemId(0),
                NetManager.send(g, MsgActionDefine.UseLockItem);
            }
        }
    }
    public lockedEnd(e:LockItemEnd) {
        var t = this.getView(),
        i = e.getItemId(),
        n = e.getUserId(),
        a = this._roomModel.getRoomerById(n);
        if (!a) return;
        var o = Director.getModelByKey(UserModel);
        if (i == PropEnum.LOCK) a.setIsLock(!1),
        t.setLockedEffect(!1, a.getRoomPos()),
        n == o.getUserId() && t.setLocked(!1),
        a.getIsClone() || (a.getIsRage() ? t.deleteLockedObj(n, !1) : t.deleteLockedObj(n, !0));
        else if (i == PropEnum.CLONE || i == PropEnum.FREE_CLONE) a.setIsClone(!1),
        t.setCloneEffect(!1, a.getRoomPos()),
        n == o.getUserId() ? t.setClone(!1) : (t.getRoomUI().setGunState(RoomUtil.getPosByFlip(a.getRoomPos(), t.getIsFlip()), !1, 3, a.getRoomPos()), this.deleteClonePos(a.getRoomPos())),
        a.getIsRage() || a.getIsLock() ? t.deleteLockedObj(n, !1) : t.deleteLockedObj(n, !0);
        else if (i == PropEnum.RAGE || i == PropEnum.FREE_RAGE) {
            a.setIsRage(!1),
            t.setRageEffect(!1, a.getRoomPos());
            var r = Director.getModelByKey(UserModel);
            n == r.getUserId() && t.setRage(!1),
            a.getIsClone() || (a.getIsLock() ? t.deleteLockedObj(n, !1) : t.deleteLockedObj(n, !0))
        }
    }
    public changeLocked(e) {
        var t = this.getView(),
        i = RoomUtil.getFishById(t.getFishList(), e.getFishId());
        t.changeLockedFish(e.getUserId(), i, parseInt(e.getGunIndex()))
    }

    /** 房间状态 */
    public setRoomState(type, fishId, userId) {
        var roomView:RoomView = this.getView();
        if (type == pondState.FROZEN_END){
            roomView.unfrozen();
        } 
        else if (type == pondState.WAVE_COMING){
            // 播放鱼潮动画
            roomView.showWave(function(){
                let fishList = roomView.getFishList();
                for (let t = 0; t < fishList.length; t++){
                    if (fishList[t].getActor().getUniqId() != Especial_Fish.Guide_Fish){
                        if(fishList[t].getActor().getUniqId() != Especial_Fish.Phoenix){
                            fishList[t].runaway()
                        }
                    }
                }
            }
            );
        }
        else if (type == pondState.BOSS_COMING){
            roomView.bossComing(fishId);
        }
            
        // else if (type == pondState.USER_EXCHANGE) {
        //     var a = this._roomModel.getRoomerById(userId);
        //     a && n.getRoomUI().setExchangeByPos(a.getRoomPos(), n.getIsFlip(), !0)
        // } else if (type == pondState.USER_EXCHANGED) {
        //     var a = this._roomModel.getRoomerById(userId);
        //     a && n.getRoomUI().setExchangeByPos(a.getRoomPos(), n.getIsFlip(), !1)
        // }
    }

    public exitRoom(e, t) {
        var i = t._roomModel.getRoomerById(t._userModel.getUserId()),
        n = new QuitRoom;
        n.initData(),
        n.setUserId(t._userModel.getUserId()),
        n.setPosition(i.getRoomPos()),
        NetManager.send(n,MsgActionDefine.QuitRoom);
    }

    public quitRoom(msg:QuitRoom, isReplace:boolean=false) {
        var t = this;
        var userId = msg.getUserId();
        var pos = msg.getPosition();
        var roomer:Roomer = this._roomModel.getRoomerById(userId);
        if (null == roomer) return void console.log("玩家不存在：" + userId);

        var roomV:RoomView = this.getView();
        if (!isReplace && userId == this._userModel.getUserId() && pos == roomer.getRoomPos()) {
            _Notification_.send(NotifyEnum.CLEAR_PRICE_TASK);
            NetManager.resetNet(CONFIG.SERVER_IP, CONFIG.SERVER_PORT,
                            function() {
                                t._roomModel.clearRoom();
                                UIUtil.closeLoading();
                                GlobalManager.getInstance().reConnect2Server();
                            });
            // if (this._userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
            //     roomV.getRoomUI().clearTask();
            // }
        } else if (pos == roomer.getRoomPos()) {
            this.deleteClonePos(roomer.getRoomPos());
            roomV.deleteLockedObj(roomer.getUserId(), !0);
            roomV.setLockedEffect(!1, roomer.getRoomPos());
            roomV.setRageEffect(!1, roomer.getRoomPos());
            roomV.setCloneEffect(!1, roomer.getRoomPos());
            roomer.setIsClone(!1);
            roomer.setIsLock(!1);
            roomer.setIsRage(!1);
            // o.getRoomUI().setExchangeByPos(roomer.getRoomPos(), o.getIsFlip(), !1);
            roomV.removeBankrupt(roomer.getRoomPos());
            this._roomModel.removeRoomer(roomer);
            var roomUI:RoomUI = roomV.getRoomUI();
            if (!roomUI) return;
            roomUI.setGunState(RoomUtil.getPosByFlip(roomer.getRoomPos(), roomV.getIsFlip()), !1, 3, roomer.getRoomPos());
            roomUI.setGunVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), roomV.getIsFlip()), !1);
            // r.showPriceRank(roomer.getRoomPos(), roomV.isFlip(), -1);
            roomUI.getIsChakan() && roomer.getRoomPos() == roomUI.nChakanPos && roomUI.setHideChakan();
            // var s = this._userModel.getMatchRoomLevel(); 
            // if (s == RequesetRoomState.DjsRoom || s == RequesetRoomState.QmsRoom || GameUtil.isKss(s)) 
            //     r.setDjsScoreVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), roomV.getIsFlip()), !1);
        } else {
            console.log("玩家信息错误！");
        }
    }
    // public exchangeGoodsBack(e) {
    //     var t = this.getModel(ExchangeModel);
    //     t.clearList();
    //     for (var i = e.getItemList(), n = i.length, a = 0; n > a; a++) {
    //         var o = i[a],
    //         r = new game.model.ExchangeItem(o.id, o.name, o.type, o.exchangePriceId, o.exchangePrice, o.instruction, o.marketPrice, o.url, o.minVip, o.goodsId, o.goodsNum, o.serverNum, i.orders, o.loopRecordColor, o.minGunId, o.deliveryState, o.isBling);
    //         t.addItem(r)
    //     }
    // }

    public taskFinishBack(e) {
        var t = e.getState();
        if (1 == t) {
            var i = Director.getModelByKey(UserModel),
            n = this._roomModel.getRoomerById(i.getUserId()),
            a = this.getView(),
            o = a.getRoomUI().getGunPointByPos(n.getRoomPos(), a.getIsFlip()),
            r = new egret.Point(o.x, o.y);
            r.y > 360 ? r.y = 670 : r.y = 50;
            for (var s = e.getTaskAward(), l = 0; l < s.length; l++) {
                var u = s[l].itemId,
                d = s[l].totalCount,
                h = new Item(u, d);
                if (i.isExist(h)) {
                    var c = i.getItemById(u);
                    i.updateItem(u, c.getCount() + d)
                } else i.addItem(h);
                u != PropEnum.GOLD ? GameUtil.flyItems(d, u, new egret.Point(640, 0), new egret.Point(r.x, r.y), a.getRoomUI(), i.getUserId()) : GameUtil.flyCoins(d, 1, new egret.Point(640, 0), new egret.Point(r.x, r.y), a.getRoomUI(), i.getUserId()),
                u == PropEnum.GOLD ? i.setCoins(Number(i.getCoins()) + Number(d)) : u == PropEnum.GEM && i.setMoney(Number(i.getMoney()) + Number(d))
            }
            var p = e.getTaskId();
            // ReyunUtil.sendEvent(p + LogEnum.GUIDE_TASK_END);
            // var g = Director.getModelByKey(TaskModel);
            // g.removeItem(p);
            // var _ = e.getNewTaskId();
            // if (_) {
            //     var y = new TaskItem(_, 0, 0);
            //     g.addItem(y)
            // }
            _Notification_.send(NotifyEnum.TASK_GUIDE_CHANGE);
            var m = T_Config_Table.getVoByKey(82).value;
            p == Number(m) && Guide.checkGuide(GuideTrriger.Open)
        }
    }
    // public updateExchange(e, t) {
    //     var i = t.getView(),
    //     n = Director.getModelByKey(UserModel),
    //     a = new game.model.Item(PropEnum.FISH_TICKIT, 1),
    //     o = 0;
    //     n.isExist(a) && (o = n.getItemById(PropEnum.FISH_TICKIT).getCount());
    //     for (var r = o,
    //     s = t.getModel(ExchangeModel), l = s.getList(), u = l.length, d = "", h = 0, c = 0; u > c; c++) {
    //         var p = l[c];
    //         if (r <= p._exchangePrice) {
    //             d = p._name,
    //             h = p._exchangePrice;
    //             break
    //         }
    //         c == u - 1 && "" == d && (d = p._name, h = p._exchangePrice)
    //     }
    //     i.getRoomUI().updateShowExchangeBan(r, h)
    // }
    // public popExchange(e, t) {
    //     var i = t.getView(),
    //     n = t.getModel(UserModel),
    //     a = new game.model.Item(PropEnum.FISH_TICKIT, 1),
    //     o = 0;
    //     n.isExist(a) && (o = n.getItemById(PropEnum.FISH_TICKIT).getCount());
    //     for (var r = o,
    //     s = t.getModel(ExchangeModel), l = s.getList(), u = l.length, d = "", h = 0, c = 0; u > c; c++) {
    //         var p = l[c];
    //         if (r <= p._exchangePrice) {
    //             d = p._name,
    //             h = p._exchangePrice;
    //             break
    //         }
    //         c == u - 1 && "" == d && (d = p._name, h = p._exchangePrice)
    //     }
    //     i.getRoomUI().showExchangeBan(d, r, h)
    // }
    // public taskGuideLoad(e, t) {
    //     var i = t.getView();
    //     i.getRoomUI().addGuideTask()
    // }
    // public taskChange(e, t) {
    //     var i = t.getView(),
    //     n = i.getRoomUI().getGuideTaskUI();
    //     if (n) {
    //         var a = Director.getModelByKey(TaskModel),
    //         o = a.getTaskListByType(TaskType.TASK_TYPE_NEWBIE);
    //         o = o.sort(function(e, t) {
    //             return e._nTaskID - t._nTaskID
    //         });
    //         var r = a.getTaskListByType(TaskType.TASK_TYPE_PRICE);
    //         if (o) return 0 == o.length ? void(0 == r.length && i.getRoomUI().guideTaskGroup.removeChildren()) : void i.getRoomUI().getGuideTaskUI().setData(o[0])
    //     }
    // }
    // public taskLoaded(e, t) {
    //     var i = Director.getModelByKey(TaskModel),
    //     n = i.getTaskListByType(TaskType.TASK_TYPE_NEWBIE);
    //     n = n.sort(function(e, t) {
    //         return e._nTaskID - t._nTaskID
    //     });
    //     var a = i.getTaskListByType(TaskType.TASK_TYPE_PRICE);
    //     if (n) {
    //         var o = t.getView();
    //         return 0 == n.length ? void(0 == a.length && o.getRoomUI().guideTaskGroup.removeChildren()) : void o.getRoomUI().getGuideTaskUI().setData(n[0])
    //     }
    // }
    // public guideClose(e, t) {
    //     var i = Number(e),
    //     n = 0;
    //     switch (i) {
    //     case GuideClose.GUIDE_CLOSE_UNLOCK:
    //         var a = new UpgradeOrForgeSendMessage;
    //         a.initData(),
    //         a.setType(GunUpdateType.UNLOCK),
    //         NetManager.send(a),
    //         n = t._userModel.getGuideID();
    //         var o = Number(n) + 1,
    //         r = T_Guide_Table.getVoByKey(o);
    //         Guide.checkGuide(r.trrigertype);
    //         break;
    //     case GuideClose.GUIDE_CLOSE_TRRIGER_NEXT:
    //         n = t._userModel.getGuideID();
    //         var s = Number(n) + 1,
    //         l = T_Guide_Table.getVoByKey(s);
    //         Guide.checkGuide(l.trrigertype);
    //         break;
    //     case GuideClose.GUIDE_CLOSE_LOCK:
    //         var u = t._userModel.getUserId(),
    //         d = t._roomModel.getRoomerById(u),
    //         h = t.getView(),
    //         c = RoomUtil.getFishById(h.getFishList(), Especial_Fish.Guide_Fish);
    //         if (!c) return;
    //         d.setIsLock(!0),
    //         h.setLockedEffect(!0, d.getRoomPos());
    //         var p = new Array;
    //         p.push(c.getUniqId());
    //         var g = new LockedObj(p, d.getRoomPos(), u);
    //         h.setLockedObj(g),
    //         GameUtil.setLockedEffect(c, "locked", "locked_circle_png", !0),
    //         h.send(NotifyEnum.LOCKED_FISH_CHANGE, {
    //             fishId: c.getUniqId(),
    //             gunIndex: 0
    //         }),
    //         h.setLocked(!0),
    //         h.getRoomUI().getFrozenAndLockUI().buttonLockNN.startBtnTick();
    //         break;
    //     case GuideClose.GUIDE_CLOSE_OPENLOTTERY:
    //         var _ = t.getView(),
    //         y = t._userModel.getUserId(),
    //         m = t._roomModel.getRoomerById(y),
    //         f = RoomUtil.getPointByPos(m.getRoomPos(), _.getIsFlip());
    //         t._lotteryUI = new room.LotteryUI(f),
    //         t._lotteryUI.x += CONFIG.adaptX,
    //         t._lotteryUI.y += CONFIG.adaptY,
    //         t._lotteryUI.setGuide(),
    //         _.addChildAt(t._lotteryUI, 82);
    //         var v = Director.getModelByKey(UserModel);
    //         n = v.getGuideID();
    //         var T = Number(n) + 1,
    //         E = T_Guide_Table.getVoByKey(T);
    //         Guide.checkGuide(E.trrigertype);
    //         break;
    //     case GuideClose.GUIDE_CLOSE_LOTTERY:
    //         t._lotteryUI && t._lotteryUI.startLottery();
    //         break;
    //     case GuideClose.GUIDE_CLOSE_CLOSE_RMB_GAIN:
    //         var I = egret.MainContext.instance.stage.getChildByName("RMBGAIN");
    //         I && egret.MainContext.instance.stage.removeChild(I),
    //         n = t._userModel.getGuideID();
    //         var b = Number(n) + 1,
    //         C = T_Guide_Table.getVoByKey(b);
    //         Guide.checkGuide(C.trrigertype);
    //         break;
    //     case GuideClose.GUIDE_CLOSE_CLICK_EXCHAGE:
    //         _Notification_.send(NotifyEnum.EXCHANGE_ITEM, 1100);
    //         break;
    //     case GuideClose.GUIDE_CLOSE_EXCHNANGE_END:
    //         Guide.checkGuide(GuideTrriger.Open);
    //         break;
    //     default:
    //         console.log("#------------------------close----傻逼你会用吗？")
    //     }
    // }
    // public guideOpen(e, t) {
    //     var i = Number(e);
    //     switch (i) {
    //     case GuideOpen.GUIDE_OPEN_UNLOCK:
    //         var n = t.getView();
    //         n.getRoomUI().unlockGunGroup.visible = !0,
    //         n.getRoomUI().getUnlockUpdateUI().openGunUpdateByGuide();
    //         break;
    //     case GuideOpen.GUIDE_OPEN_ADDFISH:
    //         var a = t.getView();
    //         a.guide_addFish();
    //         break;
    //     case GuideOpen.GUIDE_OPEN_FISHDEAD:
    //         t.guide_fishDead();
    //         var o = t.getView(),
    //         r = Director.getModelByKey(UserModel),
    //         s = r.getUserId(),
    //         l = t._roomModel.getRoomerById(s);
    //         l.setIsLock(!1),
    //         o.setLockedEffect(!1, l.getRoomPos()),
    //         o.setLocked(!1),
    //         o.deleteLockedObj(s, !0),
    //         o.getRoomUI().getFrozenAndLockUI().buttonLockNN.stopBtnTick();
    //         break;
    //     case GuideOpen.GUIDE_OPEN_OPENLOTTERY:
    //         var u = t.getView();
    //         u.getRoomUI().lotteryGroup.visible = !0,
    //         u.getRoomUI().openLotteryGuide();
    //         break;
    //     case GuideOpen.GUIDE_OPEN_TRRIGERTASK:
    //         break;
    //     case GuideOpen.GUIDE_OPEN_EXCHANGE:
    //         var d = new ExchangeView,
    //         h = new ExchangeMediator(d);
    //         Director.pushView(h);
    //         break;
    //     case GuideOpen.GUIDE_OPEN_POP_RMB_GAIN:
    //         GameUtil.openRMBGain();
    //         break;
    //     default:
    //         console.log("#------------------------open----傻逼你会用吗？")
    //     }
    // }

    public showChakan(e, t) {
        var i:RoomView = t.getView();
        if (i.getRoomUI().getIsChakan())
            return void i.getRoomUI().setHideChakan();
        
        var n = t._roomModel.getRoomerList();
        var a = RoomUtil.getPosByFlip(Number(e), i.isFlip());
        for (var o = 0; o < n.length; o++) 
            if (n[o].getRoomPos() == a) {
                var r = n[o];
                return void i.showChakan(r)
            }
    }

    public autoGunFire(e, t) {
        var i:RoomView = t.getView();
        i.setAutoGunFire(e)
    }
    public checkGunRest(e, t) {
        var i = Director.getModelByKey(UserModel),
        n = t._roomModel.getRoomerById(i.getUserId()),
        a = n.getGunRate(),
        o = T_Gun_Table.getVoByKey(a),
        r = GameUtil.isEnough(CurrencyEnum.COINS, o.bulletNum);
        if (!r) for (var s = -1,
        l = o.id; l > 0; l--) {
            var u = T_Gun_Table.getVoByKey(l),
            d = GameUtil.isEnough(CurrencyEnum.COINS, u.bulletNum);
            if (d) {
                s = l;
                break
            }
        }
    }

    public resetGunRate(data:T_Gun, t) {
        SoundManager.playEffectSound("C14");
        var changeGunMsg = new ChangeGunReq();
        changeGunMsg.initData();
        var userModel:UserModel = Director.getModelByKey(UserModel);
        var roomer:Roomer = t._roomModel.getRoomerById(userModel.getUserId());
        var roomV:RoomView = t.getView();
        // var needGun = GameUtil.getNeedGunByRoomType(userModel.getMatchRoomLevel(), -1);
        var pos:number = roomer.getRoomPos();
        // var gun:GunTempleUI = (roomV.getRoomUI().gunList[RoomUtil.getPosByFlip(pos, roomV.isFlip())]);
        // if ("reduce" == type) {
            // changeGunMsg.setType(ChangeGunState.CHANGE_RATE);
            // if (gun.getGunLocked()) {
                // if (roomer.getGunRate() == needGun) return;
            //     roomer.setGunRate(roomer.getGunRate() - 1);
            //     var l = T_Gun_Table.getVoByKey(roomer.getGunRate());
            //     gun.setLocked(!1);
            //     if (l) {
            //         var u:RoomView = t.getView();
            //         u.setRoomerGunRate(pos, l.bulletNum, !1);
            //     }
            //     return;
            // }
            // roomer.getGunRate() <= needGun ? roomer.setGunRate(needGun) : roomer.setGunRate(data.id);
            roomer.setGunRate(data.id);
        // } else if ("add" == type) {
        //     if (roomer.getGunRate() != userModel.getCurGunID() || userModel.getMatchRoomLevel() == RequesetRoomState.DjsRoom || userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom || GameUtil.isKss(userModel.getMatchRoomLevel())) {
        //         var d = T_Gun_Table.getAllVo();
        //         roomer.getGunRate() > d[d.length - 1] ? roomer.setGunRate(needGun) : roomer.getGunRate() > userModel.getCurGunID() ? roomer.setGunRate(needGun) : roomer.setGunRate(roomer.getGunRate() + 1);
        //         var h = T_Gun_Table.getVoByKey(roomer.getGunRate());
        //         if (h) {
        //             // var c = t.getView(),
        //             // gun = c.getRoomUI().gunList[RoomUtil.getPosByFlip(pos, c.isFlip())];
        //             gun.setLocked(!1)
        //         }
        //         changeGunMsg.setType(ChangeGunState.CHANGE_RATE)
        //     }
        // } else {
        //     var p = T_Gun_Table.getVoByKey(roomer.getGunRate() + 1);
        //     if (p) {
        //         // var g = t.getView(),
        //         // gun = g.getRoomUI().gunList[RoomUtil.getPosByFlip(Number(pos), g.isFlip())];
        //         gun.setLocked(!0),
        //         roomer.setGunRate(roomer.getGunRate() + 1);
        //         var _ = T_Gun_Table.getVoByKey(roomer.getGunRate());
        //         if (_) {
        //             var y:RoomView = t.getView();
        //             y.setRoomerGunRate(pos, _.bulletNum, !1)
        //         }
        //         return
        //     }
        //     var d = T_Gun_Table.getAllVo();
        //     roomer.getGunRate() > d[d.length - 1] ? roomer.setGunRate(needGun) : roomer.setGunRate(roomer.getGunRate() + 1);
        //     changeGunMsg.setType(ChangeGunState.CHANGE_RATE);
        // }
        var m = T_Gun_Table.getVoByKey(roomer.getGunRate());
        if (m) {
            var f:RoomView = t.getView();
            f.setRoomerGunRate(pos, m.bulletNum, !1);
        }
        changeGunMsg.setType(ChangeGunState.CHANGE_RATE);
        changeGunMsg.setChangeValue(roomer.getGunRate());
        NetManager.send(changeGunMsg, MsgActionDefine.ChangeGunReq);

        if (roomer.getBankrupt()) t.fishingUnlockStatus();
    }

    // 设置枪的倍率  发送消息
    public resetGunPower(type:string, t) {
        SoundManager.playEffectSound("C14");
        var changeGunMsg = new ChangeGunReq();
        changeGunMsg.initData();
        var userModel:UserModel = Director.getModelByKey(UserModel);
        var roomer:Roomer = t._roomModel.getRoomerById(userModel.getUserId());
        var roomV:RoomView = t.getView();
        // var needGun:number= GameUtil.getNeedGunByRoomType(userModel.getMatchRoomLevel(), -1);
        var pos:number = roomer.getRoomPos();
        var gun:GunTempleUI = (roomV.getRoomUI().gunList[RoomUtil.getPosByFlip(pos, roomV.isFlip())]);
        var gunSkinId:number = roomer.getCurSkinId();
        var gunSkin:T_Gun_skin = T_Gun_skin_Table.getVoByKey(gunSkinId);
        var powStrArr:Array<string> = gunSkin.power.split("_");
        var powArr:Array<number> = [];
        var powId:number = 0;
        powStrArr.forEach(function(v, i, arr) {
                            let n:number = parseInt(v);
                            powArr[i]=n;
                            if (n == roomer.getGunPow()) {
                                powId = i;
                            }
                        });
        if ("reduce" == type) {
            powId--;
            if (powId < 0) {
                powId = powArr.length - 1;
            }
            roomer.setGunPow(powArr[powId]);
            changeGunMsg.setChangeValue(powArr[powId]);
        } else if ("add" == type) {
            powId++;
            if (powId >= powArr.length) {
                powId = 0;
            }
            roomer.setGunPow(powArr[powId]);
            changeGunMsg.setChangeValue(powArr[powId]);
        }
        var m = T_Gun_Table.getVoByKey(roomer.getGunRate());
        if (m) {
            var f:RoomView = t.getView();
            f.setRoomerGunPow(pos, powArr[powId], !1);
        }
        changeGunMsg.setType(ChangeGunState.CHANGE_POWER);
        NetManager.send(changeGunMsg, MsgActionDefine.ChangeGunReq);

        if (roomer.getBankrupt()) t.fishingUnlockStatus();
    }

    public changeGunBack(msg:ChangeGunRes):void {
        var changType = msg.getType();
        var userId = msg.getUserId();
        var roomer:Roomer = this._roomModel.getRoomerById(userId);
        if (!roomer) {
            console.warn("在房间中未找到用户id："+userId);
            return;
        }
        var view:RoomView = this.getView();
        if (changType == ChangeGunState.CHANGE_RATE) {
            var o = T_Gun_Table.getVoByKey(msg.getGunId());
            if (null == o) {
                console.log("炮倍不存在：" + msg.getGunId());
                return GameUtil.popTips(Language.getText(99));
            }
            roomer.setGunRate(Number(msg.getGunId()));
            view.setRoomerGunRate(roomer.getRoomPos(), o.bulletNum, roomer.getIsClone());
            userId == this._userModel.getUserId() && (this.checkGunUpdate(null, this), SoundManager.playEffectSound("C14"))
        } else if (changType == ChangeGunState.CHANGE_SKIN) {
            var r = msg.getState();
            if (1 != r) return GameUtil.popTips("更换炮台失败-->", r);
            var s = msg.getSkinId();
            var l = T_Item_Table.getVoByKey(s);
            l.type == BagItemType.BATTERY && (userId == this._userModel.getUserId() && this._userModel.setCurSkinId(s), roomer.setCurSkinId(s)),
            _Notification_.send(NotifyEnum.CHANGE_GUN_UI_LOADED),
            view.changeGunSkin(roomer)
        }else if (changType == ChangeGunState.CHANGE_POWER) {
            // var o = T_Gun_Table.getVoByKey(msg.getGunId());
            // if (null == o) {
            //     console.log("炮倍不存在：" + msg.getGunId());
            //     return GameUtil.popTips(Language.getText(99));
            // }
            // roomer.setGunRate(Number(msg.getGunId()));
            view.setRoomerGunPow(roomer.getRoomPos(), msg.getPower(), roomer.getIsClone());
            userId == this._userModel.getUserId() && (SoundManager.playEffectSound("C14"));
        }
    }
    public killManyFish(msg:RandomFishHitRes) {
        var view:RoomView = this.getView();
        var fishHitArr = msg.getFishingHitback();
        OneKillMany.killMany(view, msg.getUserId(), msg.getFishId(), fishHitArr, msg.getFishFunctionType(), view.getFishList(), view.getIsFlip(), view.getRoomUI());
        for (var n = fishHitArr.length, a = 0, o = 0; n > o; o++) {
            var r = fishHitArr[o].getItems;
            var s = r.length;
            for (var l = 0; s > l; l++) {
                var u = r[l];
                10001 == u.itemId && (a += Number(u.count));
            }
        }

        if (this._userModel.getUserId() == msg.getUserId()) {
            var d = T_Config_Table.getVoByKey(43).value;
            var h = T_Config_Table.getVoByKey(54).value.split("_");
            if (a >= Number(d)) {
                var c = 0;
                switch (msg.getFishFunctionType()) {
                    case OneKillManyType.CATCH_WHOLE:
                        c = Number(h[0]);
                        break;
                    case OneKillManyType.ELECTRIC:
                        c = Number(h[1]);
                        break;
                    case OneKillManyType.BOMB:
                        c = Number(h[2]);
                }
                setTimeout(function() {
                    GameUtil.baoFuEffect(a, view.getBulletLayer());
                }, c);
            }
        }
    }

    public initInRoomInfo() {
        var roomV:RoomView = this.getView();
        var isFlip = false;
        var roomerPos = 0;
        var roomerList = this._roomModel.getRoomerList();
        for (var a = 0; a < roomerList.length; a++) {
            roomerPos = roomerList[a].getRoomPos();
            if (roomerList[a].getUserId() == this._userModel.getUserId() && roomerPos > 1) {
                isFlip = true;
                break;
            }
        }

        roomV.resetView(isFlip, roomerList, roomerPos);
        var roomer:Roomer;
        for (var a = 0; a < roomerList.length; a++) {
            roomer = roomerList[a];
            // console.log("############ uid="+roomer.getUserId());
            if (roomer.getUserId() == this._userModel.getUserId()) {
                roomerPos = roomer.getRoomPos();
                if (0 == roomerPos || 3 == roomerPos) {
                    roomV.setPaobeiAddState(true);
                } else if (1 == roomerPos || 2 == roomerPos) {
                    roomV.setPaobeiAddState(false);
                }
                this._userModel.setMoney(roomer.getMoney()),
                this._userModel.setCoins(roomer.getCoins());
                var o = this._userModel.getMatchRoomLevel();
                o == RequesetRoomState.QmsRoom || GameUtil.isKss(o) ? roomV.setRoomerBullet(roomerPos, roomer.getDjsObj().grandPrixBulletNum) : roomV.setRoomerCoins(roomerPos, this._userModel.getCoins()),
                roomV.setRoomerMoney(roomerPos, this._userModel.getMoney());
                var r = T_Gun_Table.getVoByKey(roomer.getGunRate());
                r ? roomV.setRoomerGunRate(roomerPos, r.bulletNum) : console.warn("没有这个炮倍：" + roomer.getGunRate());
                roomV.setRoomerGunPow(roomerPos, roomer.getGunPow());
                roomV.showYourPos(roomerPos);
                var tmer = new egret.Timer(5e3, 1);
                tmer.addEventListener(egret.TimerEvent.TIMER, function() { roomV.hideYourPos(roomerPos) }, this);
                tmer.start();
            } else {
                var o = this._userModel.getMatchRoomLevel();
                o == RequesetRoomState.QmsRoom || GameUtil.isKss(o) ? roomV.setRoomerBullet(roomer.getRoomPos(), roomer.getDjsObj().grandPrixBulletNum) : roomV.setRoomerCoins(roomer.getRoomPos(), roomer.getCoins()),
                roomV.setRoomerMoney(roomer.getRoomPos(), roomer.getMoney());
                var r = T_Gun_Table.getVoByKey(roomer.getGunRate());
                r ? roomV.setRoomerGunRate(roomer.getRoomPos(), r.bulletNum) : console.warn("没有这个炮倍：" + roomer.getGunRate());
                roomV.setRoomerGunPow(roomer.getRoomPos(), roomer.getGunPow());
                roomer.getIsLock() && roomV.setLockedEffect(!0, roomer.getRoomPos());
                roomer.getIsRage() && roomV.setRageEffect(!0, roomer.getRoomPos());
                if (roomer.getIsClone()) {
                    roomV.getRoomUI().setGunState(RoomUtil.getPosByFlip(roomer.getRoomPos(), roomV.getIsFlip()), !0, 3, roomer.getRoomPos()),
                    roomV.setCloneEffect(!0, roomer.getRoomPos()),
                    this.insertClonePos(roomer.getRoomPos());
                    for (var l = 0; 3 > l; l++) {
                        var u = RoomUtil.getFishById(roomV.getFishList(), roomer.getLockedIdByGun(l));
                        roomV.changeLockedFish(roomer.getUserId(), u, l)
                    }
                } else for (var l = 0; 1 > l; l++) {
                    var u = RoomUtil.getFishById(roomV.getFishList(), roomer.getLockedIdByGun(l));
                    roomV.changeLockedFish(roomer.getUserId(), u, l)
                }
            }
            // 更换炮皮肤
            roomV.changeGunSkin(roomer);
        }
        roomV.resetView(isFlip, roomerList, roomerPos);

        var fishList = this._roomModel.getFishList();
        for (var a = 0; a < fishList.length; a++) {
            var fish = fishList[a];
            roomV.addUnitFish(fish.fishType, fish.uniqId, fish.fishId, fish.pathId, fish.coord, fish.aliveTime);
        }

        // 测试 检测初始鱼是否在屏幕中
        let inList:Array<number>;
        let outList:Array<number>;
        inList = [];
        outList = [];

        for (let i = 0; i < this.getView().getFishList().length; i++) {
            let fishAction:PointsAction = <PointsAction>this.getView().getFishList()[i];
            let fish = fishAction.getActor();
            let fishType = fish.getType();
            if (fishType == AddFishType.FISH || fishType == AddFishType.CATCH_WHOLE_FISH) {
                if (FishUtil.isFishInScreen(fish)){
                    inList.push(fish.getUniqId());
                }else{
                    outList.push(fish.getUniqId());
                }
            } else if (fishType == AddFishType.FISH_GROUP){
                // 鱼群
                let h = fish.getFishList();
                for (let i = 0; i < h.length; i++) {
                    if (FishUtil.isFishInScreen(fish)){
                        inList.push(h[i].getUniqId());
                    }else{
                        outList.push(h[i].getUniqId());
                    }
                }
            }
        }
        console.log("inList----->",inList)
        console.log("outList---->",outList)
    }

    public pondFish(e:PondFishes) {
        for (var t = e.getFishes(), i = t.length, n = 0; i > n; n++) this.addFish(t[n]);
    }

    public addFish(e:AddFish) {
        // e.setCoordinate({xvalue:1380,yvalue:100});
        // e.setPathId(20410);
        var rv:RoomView = this.getView(),
        fishType = e.getType(),
        fishId = e.getFishId();
        if (fishType == AddFishType.FISH_GROUP) {
            // if (fishId == 10802 || fishId == 10308) {
            //     console.log("dddddddddddddd");
            // }
            var a = T_FishGroup_Table.getVoByKey(fishId);
            if (a.type == FishGroupType.SIMPLE) 
                rv.addUnitFish(fishType, e.getUniId(), fishId, e.getPathId(), new egret.Point(e.getCoordinate().xvalue, e.getCoordinate().yvalue));
            else if (a.type == FishGroupType.QUEUE) {
                var o = T_FishGroup_Table.getVoByKey(fishId);
                if (!o) return;
                for (var r = o.pos.split("|"), s = 0, l = e.getUniId(), u = r.length, d = function(i) {
                    var n = r[i].split(","),
                    a = n[0],
                    o = n[1];
                    s += Number(o);
                    var u = new egret.Timer(s, 1),
                    d = new Array;
                    d.push(l[i]);
                    var c = function() {
                        u.removeEventListener(egret.TimerEvent.TIMER, c, self),
                        rv.addUnitFish(AddFishType.FISH, d, Number(a), e.getPathId(), new egret.Point(e.getCoordinate().xvalue, e.getCoordinate().yvalue))
                    };
                    u.addEventListener(egret.TimerEvent.TIMER, c, h),
                    u.start()
                },
                h = this, c = 0; u > c; c++) d(c)
            }
        } 
        else 
            rv.addUnitFish(fishType, e.getUniId(), fishId, e.getPathId(), new egret.Point(e.getCoordinate().xvalue, e.getCoordinate().yvalue))
    }

    public addPlayerInRoom(e:IntoRoomRes) {
        var pi:PlayerInfo = e.getPlayerInfo()[0];
        // console.log("-------rcv uid="+pi.getUserId()+", pos="+pi.getPosition());
        // console.log("****uid="+t.getUserId()+", p="+t.getPosition());
        // this._roomModel.getRoomerList().forEach(function (v, i, arr) {
        //         console.log("++++uid="+v.getUserId()+", p="+v.getRoomPos());
        //     })
        var rt:Roomer = this._roomModel.getRoomerByPos(pi.getPosition());
        if (rt) {
            console.log("重复 uid="+pi.getUserId()+", pos="+pi.getPosition());
            var qrmsg:QuitRoom = new QuitRoom();
            qrmsg.initData();
            qrmsg.setUserId(rt.getUserId());
            qrmsg.setPosition(pi.getPosition());
            this.quitRoom(qrmsg, true);
        }

        var roomer:Roomer = new Roomer(pi.getUserId(), pi.getPosition(), pi.getNickName(), pi.getGunId(), Number(pi.getCoins()), pi.getGems(), pi.getItems(), pi.getLockRelation(), pi.getVipLevel(), pi.getBatterySkinId(), pi.getGunrestSkinId(), pi.getRoleLevel(), pi.getGunPow());
        this._roomModel.addRoomer(roomer);
        var n:RoomView = this.getView(),
        a = n.getIsFlip(),
        o = n.getRoomUI();
        o.setGunVisableByPos(RoomUtil.getPosByFlip(roomer.getRoomPos(), a), !0);
        var r = this._userModel.getMatchRoomLevel();
        n.setRoomerMoney(roomer.getRoomPos(), roomer.getMoney());
        var s = T_Gun_Table.getVoByKey(roomer.getGunRate());
        s ? n.setRoomerGunRate(roomer.getRoomPos(), s.bulletNum) : console.warn("没有这个炮倍：" + roomer.getGunRate()), n.changeGunSkin(roomer);
        n.setRoomerGunPow(roomer.getRoomPos(), roomer.getGunPow());
        // if (r == RequesetRoomState.DjsRoom || r == RequesetRoomState.QmsRoom || GameUtil.isKss(r)) {
        //     var l = new DjsObj(t.grandPrixMessage);
        //     i.setDjsObj(l),
        //     n.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(i.getRoomPos(), a), !0),
        //     n.getRoomUI().setDjsScoreByPos(RoomUtil.getPosByFlip(i.getRoomPos(), n.getIsFlip()), l.grandPrixIntegral)
        // }
        r == RequesetRoomState.QmsRoom || GameUtil.isKss(r) ? n.setRoomerBullet(roomer.getRoomPos(), roomer.getDjsObj().grandPrixBulletNum) : n.setRoomerCoins(roomer.getRoomPos(), roomer.getCoins())
    }

    // public grandPrixSettement(e) {
    //     var t = Director.getModelByKey(UserModel);
    //     _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {
    //         userId: t.getUserId()
    //     });
    //     var i = e.getRoomtType(),
    //     n = new DjsResultView(e, i),
    //     a = new DjsResultMediator(n);
    //     Director.pushView(a)
    // }
    // public grandPrixInfoChange(e) {
    //     var t = this._roomModel.getRoomerById(e.getUserId());
    //     if (t) {
    //         t.getDjsObj().grandPrixIntegral = e.getGrandPrixIntegral();
    //         var i = this.getView();
    //         i.getRoomUI().setDjsScoreByPos(RoomUtil.getPosByFlip(t.getRoomPos(), i.getIsFlip()), e.getGrandPrixIntegral()),
    //         e.getUserId() == this._userModel.getUserId() && (i.getRoomUI().updateDjsScore(t.getDjsObj().grandPrixIntegral), i.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(t.getRoomPos(), i.getIsFlip()), !1))
    //     }
    // }
    // public signUpBack(e) {
    //     var t = e.getState();
    //     if (1 == t) {
    //         var i = this._roomModel.getRoomerById(this._userModel.getUserId());
    //         i.getDjsObj().grandPrixBulletNum = Number(e.getGrandPrixBulletNum()),
    //         i.getDjsObj().grandPrixIntegral = Number(e.getGrandPrixIntegral());
    //         var n = this.getView();
    //         n.getRoomUI().updateDjdBulletNum(i.getDjsObj().grandPrixBulletNum),
    //         n.getRoomUI().updateDjsScore(i.getDjsObj().grandPrixIntegral),
    //         i.getDjsObj().grandPrixSignUp = 1,
    //         this._bSendDjsResult = !1,
    //         (this._userModel.getMatchRoomLevel() == RequesetRoomState.QmsRoom || GameUtil.isKss(this._userModel.getMatchRoomLevel())) && _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_BULLETS, {
    //             userId: this._userModel.getUserId()
    //         }),
    //         GameUtil.play321Go(n.getRoomUI(),
    //         function() {})
    //     } else switch (t) {
    //     case SignUp_State.ARENA_SIGN_UP_TIMES_MORE:
    //         GameUtil.popTips(Language.getText(191));
    //         break;
    //     case SignUp_State.ARENA_SIGN_UP_TOCKEN_LESS:
    //         GameUtil.popTips(Language.getText(192));
    //         break;
    //     case SignUp_State.ARENA_SIGN_UP_SIGNED:
    //         GameUtil.popTips(Language.getText(99))
    //     }
    // }

    public gunSendBack(msg:FishingGunRes) {
        var userId = msg.getUserId();
        if (userId == this._userModel.getUserId()) return;
        var roomer:Roomer = this._roomModel.getRoomerById(userId);
        if (roomer) {
            var gunReq:FishingGunReq = msg.getGun();
            var a = gunReq.getAngle(),
            o = gunReq.getGunIndex();
            var roomV:RoomView = this.getView();
            var pos = roomer.getRoomPos();
            var myRoomer = this._roomModel.getRoomerById(this._userModel.getUserId());
            var u = myRoomer.getRoomPos(); 
            (0 != pos && 1 != pos || 2 != u && 3 != u) && (2 != pos && 3 != pos || 0 != u && 1 != u) ? 2 == pos && 3 == u ? roomV.getIsFlip() && (a += 180) : 3 == pos && 2 == u && roomV.getIsFlip() && (a += 180) : roomV.getIsFlip() && (a += 180);
            var d = this.isCloneByPos(pos);
            roomV.otherGunFire(RoomUtil.getPosByFlip(roomer.getRoomPos(), roomV.getIsFlip()), a, d, o, roomer.getIsRage(), roomer.getCurSkinId());
            var gun:T_Gun = T_Gun_Table.getVoByKey(roomer.getGunRate());
            var bulletNum = gun.bulletNum * roomer.getGunPow();
            if (roomer.getIsRage()) {
                var p = roomer.getVipLevel(),
                g = T_Config_Table.getVoByKey(34).value,
                _ = g.split("_"),
                y = Number(_[0]),
                m = Number(_[1]);
                p >= y && m > p ? bulletNum *= 2 : p >= m && (bulletNum *= 3)
            }
            var f = roomer.getCoins() - bulletNum;
            0 > f && (f = 0),
            roomer.setCoins(f);
            var v = this._userModel.getMatchRoomLevel();
            v == RequesetRoomState.QmsRoom || GameUtil.isKss(v) ? (roomer.getDjsObj().grandPrixBulletNum--, roomV.setRoomerBullet(roomer.getRoomPos(), roomer.getDjsObj().grandPrixBulletNum)) : roomV.setRoomerCoins(pos, f)
        }
    }

    public lotteryDataReceive(e:LotteryConditonAccumulate) {
        var t = e.getIntegral(),    ////当前积分
        i = e.getKillNum(),         //当前击杀数目
        n = e.getTodayDrawTimes();  //今天抽奖次数
        n > 1 && (n = 1);
        var lm:LotteryModel = Director.getModelByKey(LotteryModel);
        null != t && lm.setScore(t);
        null != i && lm.setKillNum(i);
        null != n && lm.setTodayCount(n);
        this._loaderOver && this.getView().openLotteryTips(lm.getScore(), lm.getKillNum(), lm.getMaxKill(lm.getTodayCount()));
    }

    public showLottery(e, t) {
        var i = Director.getModelByKey(UserModel),
        n = i.getMatchRoomLevel();
        if (n == RequesetRoomState.DjsRoom || n == RequesetRoomState.KssRoom || n == RequesetRoomState.QmsRoom) {
            var a = t.getView(),
            o = a.getRoomUI();
            o.lotteryBtn.visible = !1
        }
        var lm:LotteryModel = Director.getModelByKey(LotteryModel);
        t.getView().openLotteryTips(lm.getScore(), lm.getKillNum(), lm.getMaxKill(lm.getTodayCount()));
    }

    // public thePeopleBack(e) {
    //     var t = this.getView(),
    //     i = e.getUserId(),
    //     n = this._roomModel.getRoomerById(i);
    //     n.getDjsObj().grandPrixIntegral = e.getGrandPrixIntegral(),
    //     t.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(n.getRoomPos(), t.isFlip()), i != this._userModel.getUserId()),
    //     t.getRoomUI().setDjsScoreByPos(RoomUtil.getPosByFlip(n.getRoomPos(), t.getIsFlip()), e.getGrandPrixIntegral());
    //     var a = t.getRoomUI().getGunPointByPos(n.getRoomPos(), t.getIsFlip()),
    //     o = new egret.Point(a.x, a.y);
    //     o.y > 360 ? o.y = 670 : o.y = 50;
    //     var r = e.getFishId(),
    //     s = t.getFishList(),
    //     l = RoomUtil.getFishById(t.getFishList(), r);
    //     // if (null == l) return void console.warn("此条鱼不存在：" + r);
    //     var u = T_Fish_Table.getVoByKey(l.getFishId());
    //     if (2 == u.functionType) {
    //         var d = 0,
    //         h = 0;
    //         if (l.getType() == AddFishType.FISH) {
    //             var c = l.localToGlobal();
    //             d = c.x,
    //             h = c.y
    //         } else {
    //             var c = l.localToGlobal();
    //             d = c.x,
    //             h = c.y
    //         }
    //         var p = t.getBulletLayer(),
    //         g = RES.getRes("ef_baojinbi_json"),
    //         _ = RES.getRes("ef_baojinbi_png"),
    //         y = new egret.MovieClipDataFactory(g, _),
    //         m = new MovieFish(y.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
    //         m.initEvent(),
    //         m.scaleX = 2.3,
    //         m.scaleY = 2.3,
    //         m.frameRate = 12,
    //         m.visible = !1;
    //         var f = m.movieClipData,
    //         v = 0,
    //         T = new egret.Rectangle(f.frames[v].x, f.frames[v].y, 0, 0);
    //         m.anchorOffsetX = (m.width >> 1) + T.x,
    //         m.anchorOffsetY = (m.height >> 1) + T.y,
    //         m.frameRate = 12,
    //         m.x = d,
    //         m.y = h;
    //         var E = new egret.Bitmap(RES.getRes("baojinbiBg_png"));
    //         E.anchorOffsetX = E.width >> 1,
    //         E.anchorOffsetY = E.height >> 1,
    //         E.x = d,
    //         E.y = h,
    //         p.addChild(E),
    //         p.addChild(m);
    //         var I = egret.Tween.get(E, {
    //             loop: !1
    //         });
    //         E.scaleY = 0,
    //         E.scaleX = 0,
    //         E.visible = !1,
    //         I.wait(100).call(function() {
    //             m.visible = !0,
    //             E.visible = !0,
    //             m.gotoAndPlay("play", 1)
    //         }).to({
    //             scaleX: 2,
    //             scaleY: 2
    //         },
    //         300).to({
    //             alpha: 0
    //         },
    //         300).call(function() {
    //             egret.Tween.removeTweens(I),
    //             p.removeChild(E)
    //         }),
    //         RoomUtil.shakeWindowByFish(t)
    //     }
    //     RoomUtil.fishDeadHandlerByQms(s, r, i, o, t.getRoomUI(), t),
    //     i == this._userModel.getUserId() && t.getRoomUI().updateDjsScore(e.getGrandPrixIntegral())
    // }
    // public quickGameInfoChange(e) {
    //     var t = this.getView(),
    //     i = e.getUserId(),
    //     n = this._roomModel.getRoomerById(i);
    //     if (n) {
    //         n.getDjsObj().grandPrixIntegral = e.getIntegral(),
    //         t.getRoomUI().setDjsScoreVisableByPos(RoomUtil.getPosByFlip(n.getRoomPos(), t.isFlip()), i != this._userModel.getUserId()),
    //         t.getRoomUI().setDjsScoreByPos(RoomUtil.getPosByFlip(n.getRoomPos(), t.getIsFlip()), e.getIntegral());
    //         var a = t.getRoomUI().getGunPointByPos(n.getRoomPos(), t.getIsFlip()),
    //         o = new egret.Point(a.x, a.y);
    //         o.y > 360 ? o.y = 670 : o.y = 50;
    //         var r = e.getFishId(),
    //         s = t.getFishList(),
    //         l = RoomUtil.getFishById(t.getFishList(), r);
    //         // if (null == l) return void console.warn("：" + r);
    //         var u = T_Fish_Table.getVoByKey(l.getFishId());
    //         if (2 == u.functionType) {
    //             var d = 0,
    //             h = 0;
    //             if (l.getType() == AddFishType.FISH) {
    //                 var c = l.localToGlobal();
    //                 d = c.x,
    //                 h = c.y
    //             } else {
    //                 var c = l.localToGlobal();
    //                 d = c.x,
    //                 h = c.y
    //             }
    //             var p = t.getBulletLayer(),
    //             g = RES.getRes("ef_baojinbi_json"),
    //             _ = RES.getRes("ef_baojinbi_png"),
    //             y = new egret.MovieClipDataFactory(g, _),
    //             m = new MovieFish(y.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
    //             m.initEvent(),
    //             m.scaleX = 2.3,
    //             m.scaleY = 2.3,
    //             m.frameRate = 12,
    //             m.visible = !1;
    //             var f = m.movieClipData,
    //             v = 0,
    //             T = new egret.Rectangle(f.frames[v].x, f.frames[v].y, 0, 0);
    //             m.anchorOffsetX = (m.width >> 1) + T.x,
    //             m.anchorOffsetY = (m.height >> 1) + T.y,
    //             m.frameRate = 12,
    //             m.x = d,
    //             m.y = h;
    //             var E = new egret.Bitmap(RES.getRes("baojinbiBg_png"));
    //             E.anchorOffsetX = E.width >> 1,
    //             E.anchorOffsetY = E.height >> 1,
    //             E.x = d,
    //             E.y = h,
    //             p.addChild(E),
    //             p.addChild(m);
    //             var I = egret.Tween.get(E, {
    //                 loop: !1
    //             });
    //             E.scaleY = 0,
    //             E.scaleX = 0,
    //             E.visible = !1,
    //             I.wait(100).call(function() {
    //                 m.visible = !0,
    //                 E.visible = !0,
    //                 m.gotoAndPlay("play", 1)
    //             }).to({
    //                 scaleX: 2,
    //                 scaleY: 2
    //             },
    //             300).to({
    //                 alpha: 0
    //             },
    //             300).call(function() {
    //                 egret.Tween.removeTweens(I),
    //                 p.removeChild(E)
    //             }),
    //             RoomUtil.shakeWindowByFish(t)
    //         }
    //         RoomUtil.fishDeadHandlerByQms(s, r, i, o, t.getRoomUI(), t),
    //         i == this._userModel.getUserId() && t.getRoomUI().updateDjsScore(e.getIntegral())
    //     }
    // }
    // public quickRank(e) {
    //     function t(e, t) {
    //         return e.getIntegral() > t.getIntegral() ? -1 : e.getIntegral() < t.getIntegral() ? 1 : 0
    //     }
    //     var i = e.getType();
    //     if (1 == i) {
    //         var n = new KssResultView(e),
    //         a = new KssResultMediator(n);
    //         return void Director.pushView(a)
    //     }
    //     var o = e.getRank(),
    //     r = o.length;
    //     this._arrQuickInfo.length = 0;
    //     for (var s = 0; r > s; s++) {
    //         var l = new QuickInfo(o[s]);
    //         this._arrQuickInfo.push(l);
    //         var u = this._roomModel.getRoomerById(l.getUserId());
    //         u && (u.getDjsObj().grandPrixBulletNum = l.getBulletNum(), u.getDjsObj().grandPrixIntegral = l.getIntegral())
    //     }
    //     var d = this._arrQuickInfo.length;
    //     this._arrQuickInfo.sort(t);
    //     var h = -1;
    //     d = this._arrQuickInfo.length;
    //     for (var s = 0; d > s; s++) {
    //         var c = this._arrQuickInfo[s];
    //         if (c.getUserId() == this._userModel.getUserId()) {
    //             h = s;
    //             break
    //         }
    //     }
    //     if (! ( - 1 == h || this._arrQuickInfo.length < 4)) {
    //         var p = new Array;
    //         3 >= h ? (p.push(this._arrQuickInfo[0]), p.push(this._arrQuickInfo[1]), p.push(this._arrQuickInfo[2]), p.push(this._arrQuickInfo[3])) : (p.push(this._arrQuickInfo[0]), p.push(this._arrQuickInfo[1]), p.push(this._arrQuickInfo[2]), p.push(this._arrQuickInfo[h]));
    //         var g = this.getView();
    //         g.getRoomUI().changeKssInfoList(p, h);
    //         for (var _ = this._roomModel.getRoomerList(), y = this._roomModel.getRoomerById(this._userModel.getUserId()).getRoomPos(), s = (g.isFlip(), 0); s < _.length; s++) _[s].getRoomPos() != y ? (g.getRoomUI().updateDjdBulletNum(_[s].getDjsObj().grandPrixBulletNum), g.getRoomUI().updateDjsScore(_[s].getDjsObj().grandPrixIntegral)) : g.getRoomUI().updateDjsScore(_[s].getDjsObj().grandPrixIntegral)
    //     }
    // }
    public quitGameIntoRoom(e) {
        var t = e.getCurNum();
        if (this._peopleNum = Number(t), _Notification_.send(NotifyEnum.CHANGE_WAIT_PEOPLE, {
            num: t
        }), this._kssEndTime = Number(e.getEndSec()), t >= 8) {
            var i = this.getView();
            i.getRoomUI() ? i.getRoomUI().startKssTime(Number(e.getEndSec())) : this._kssEndTime = Number(e.getEndSec());
            var n = this._roomModel.getRoomerById(this._userModel.getUserId());
            if (!n) return;
            var a = n.getDjsObj().grandPrixBulletNum;
            a >= 600 && GameUtil.play321Go(i.getRoomUI(),
            function() {
                console.log("#------GameUtil.play321Go--------");
            })
        }
    }
    public worldBossInfo(msg:WorldBossInfo) {
        var t = this._roomModel.getPhoenix();
        t ? t.changeData(msg) : this._roomModel.setPhoenix(new PhoenixObj(msg));
        var i = msg.getState();
        i == Phoenix_State.ShieldDead ? this.phoenixDead(msg.getUserId(), msg.getItems(), !1) : i == Phoenix_State.Dead ? this.phoenixDead(msg.getUserId(), msg.getItems(), !0) : i == Phoenix_State.Coming && this.getView().bossComing(201),
        _Notification_.send(NotifyEnum.CHANGE_PHOENIX_UI)
    }
    public phoenixUI(e, t) {
        var i = t.getView(),
        n = t._roomModel.getPhoenix();
        return n && i.getRoomUI() ? n.getState() == Phoenix_State.Paolule ? (i.getRoomUI().clearPhoenixUI(), void i.getRoomUI().clearPhoenixTop()) : n.getState() == Phoenix_State.Dead ? (i.getRoomUI().clearPhoenixUI(), void i.getRoomUI().clearPhoenixTop()) : void(n.getState() != Phoenix_State.Ing ? (i.getRoomUI().clearPhoenixUI(), i.getRoomUI().addShieldTopPanel()) : (i.getRoomUI().addPhoenixShield(n.getCurShield(), n.getMaxShield()), i.getRoomUI().clearPhoenixTop())) : void 0
    }
    public phoenixDead(e, t, i) {
        var n = Especial_Fish.Phoenix,
        a = this.getView(),
        o = a.getFishList(),
        r = this._roomModel.getRoomerById(e),
        s = null,
        l = new egret.Point(0, 0);
        if (r && (s = a.getRoomUI().getGunPointByPos(r.getRoomPos(), a.getIsFlip()), l = new egret.Point(s.x, s.y)), i && RoomUtil.fishDeadHandler(o, n, e, l, t, a.getRoomUI(), a), a.getRoomUI()) {
            var u = RoomUtil.getFishById(a.getFishList(), Especial_Fish.Phoenix);
            if (null == u) return void console.warn("此条鱼不存在：" + n);
            if (r) {
                var d = 0,
                h = 0;
                if (u.getType() == AddFishType.FISH) {
                    var c = u.localToGlobal();
                    d = c.x,
                    h = c.y
                } else {
                    var c = u.localToGlobal();
                    d = c.x,
                    h = c.y
                }
                var p = a.getBulletLayer(),
                g = RES.getRes("ef_baojinbi_json"),
                _ = RES.getRes("ef_baojinbi_png"),
                y = new egret.MovieClipDataFactory(g, _),
                m = new MovieFish(y.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
                m.initEvent(),
                m.scaleX = 2.3,
                m.scaleY = 2.3,
                // m.frameRate = 12,
                m.visible = !1;
                var f = m.movieClipData,
                v = 0,
                T = new egret.Rectangle(f.frames[v].x, f.frames[v].y, 0, 0);
                m.anchorOffsetX = (m.width >> 1) + T.x,
                m.anchorOffsetY = (m.height >> 1) + T.y,
                // m.frameRate = 12,
                m.x = d,
                m.y = h;
                var E = new egret.Bitmap(RES.getRes("baojinbiBg_png"));
                E.anchorOffsetX = E.width >> 1,
                E.anchorOffsetY = E.height >> 1,
                E.x = d,
                E.y = h,
                p.addChild(E),
                p.addChild(m);
                var I = egret.Tween.get(E, {
                    loop: !1
                });
                E.scaleY = 0,
                E.scaleX = 0,
                E.visible = !1,
                I.wait(100).call(function() {
                    m.visible = !0,
                    E.visible = !0,
                    m.gotoAndPlay("play", 1)
                }).to({
                    scaleX: 2,
                    scaleY: 2
                },
                300).to({
                    alpha: 0
                },
                300).call(function() {
                    egret.Tween.removeTweens(I),
                    p.removeChild(E)
                }),
                n == Especial_Fish.Phoenix && RoomUtil.shakeWindowByFish(a),
                l.y > 360 ? l.y = 670 : l.y = 50;
                for (var b = 0; b < t.length; b++) {
                    var C = Number(t[b].itemId),
                    x = Number(t[b].count);
                    10001 == C && (FrameUtil.playAddCoinsEff(x, new egret.Point(d, h), a.getRoomUI(), e), GameUtil.flyCoins(x, 201, new egret.Point(d, h), new egret.Point(l.x, l.y), a.getRoomUI(), e), SoundManager.playEffectSound("drop_gold"))
                }
            }
            if (!i) {
                var w = this._roomModel.getPhoenix(),
                R = w.getCurShield(),
                A = w.getMaxShield();
                0 >= A - R && u.removeEffect("boss_shield_png")
            }
        }
    }

    public fishHitBack(e:FishingHitRes) {
        var arr:FishingHit = e.getFishingHit();
        for (var i in arr) {
            this.fishHit(arr[i]);
        }
    }

    public fishHit(e:FishingHit) {
        function t(e, t) {
            return e > t ? 1 : e === t ? 0 : -1
        }
        var view:RoomView = this.getView(),
        userId = e.getUserId(),
        roomer:Roomer = this._roomModel.getRoomerById(userId);
        if (roomer) {
            var o = view.getRoomUI().getGunPointByPos(roomer.getRoomPos(), view.getIsFlip()),
            r = new egret.Point(o.x, o.y);
            r.y > 360 ? r.y = 670 : r.y = 50;
            var fishId = e.getFishId();
            var fishList = view.getFishList(),
            u = RoomUtil.getFishById(view.getFishList(), fishId);
            if (null == u) return void console.warn("(FishingHit)此条鱼已不在当前列表：" + fishId);
            var d = T_Fish_Table.getVoByKey(u.getFishId());
            if (2 == d.functionType) {
                // 奖金鱼
                var h = !1;
                var coinNum = 0;
                var p = e.getGetItems();
                for (var g = 0; g < p.length; g++) {
                    var itmId = p[g].itemId;
                    if (10001 == itmId) {      //金币
                        h = !0;
                        coinNum = p[g].count;
                    }
                }
                if (!h) return;
                var y = 0,
                m = 0;
                if (u.getType() == AddFishType.FISH) {
                    var f = u.localToGlobal();
                    y = f.x,
                    m = f.y
                } else {
                    var f = u.localToGlobal();
                    y = f.x,
                    m = f.y
                }
                // 华丽效果 爆金币
                if (GorgeousManager.getState()) {
                    var v = view.getBulletLayer(),
                    T = RES.getRes("ef_baojinbi_json"),
                    E = RES.getRes("ef_baojinbi_png"),
                    I = new egret.MovieClipDataFactory(T, E),
                    b = new MovieFish(I.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
                    b.initEvent(),
                    b.scaleX = 2.3,
                    b.scaleY = 2.3,
                    // b.frameRate = 12,
                    b.visible = !1;
                    var C = b.movieClipData,
                    x = 0,
                    w = new egret.Rectangle(C.frames[x].x, C.frames[x].y, 0, 0);
                    b.anchorOffsetX = (b.width >> 1) + w.x,
                    b.anchorOffsetY = (b.height >> 1) + w.y,
                    // b.frameRate = 12,
                    b.x = y,
                    b.y = m;
                    var R = new egret.Bitmap(RES.getRes("baojinbiBg_png"));
                    R.anchorOffsetX = R.width >> 1,
                    R.anchorOffsetY = R.height >> 1,
                    R.x = y,
                    R.y = m,
                    v.addChild(R),
                    v.addChild(b);
                    var A = egret.Tween.get(R, {
                        loop: !1
                    });
                    R.scaleY = 0,
                    R.scaleX = 0,
                    R.visible = !1,
                    A.wait(100).call(function() {
                        b.visible = !0,
                        R.visible = !0,
                        b.gotoAndPlay("play", 1)
                    }).to({
                        scaleX: 2,
                        scaleY: 2
                    },
                    300).to({
                        alpha: 0
                    },
                    300).call(function() {
                        egret.Tween.removeTweens(A),
                        v.removeChild(R)
                    }),
                    RoomUtil.shakeWindowByFish(view)
                }

                // 彩盘动画
                var lm:LotteryModel = Director.getModelByKey(LotteryModel),
                M = T_Config_Table.getVoByKey(17).value;
                if (lm.getScore() >= Number(M)) 
                    FrameUtil.playCaipan(view, roomer, coinNum, "-1", !0);
                else {
                    var S = this._userModel.getMatchRoomLevel();
                    if (S == RequesetRoomState.DjsRoom || S == RequesetRoomState.QmsRoom || GameUtil.isKss(S)) {
                        FrameUtil.playCaipan(view, roomer, coinNum, "-1", !0);
                    } else {
                        FrameUtil.playCaipan(view, roomer, coinNum);
                    }
                }
            }
            for (var P = e.getGetItems(), B = new Array, N = false, g = 0; g < P.length; g++) {
                var itmId = P[g].itemId;
                itmId == PropEnum.BRONZE_WARHEAD ? B.push(Number(itmId))
                 : itmId == PropEnum.SILVER_WARHEAD ? B.push(Number(itmId)) 
                 : itmId == PropEnum.GOLD_WARHEAD && (B.push(Number(itmId)), N = true)
            }
            //彩盘
            if (B.length > 0) {
                B.length > 1 && B.sort(t);
                var G = B[0];
                FrameUtil.playCaipan(view, roomer, 0, "" + G)
            }
            // if (N && a.getUserId() == this._userModel.getUserId() && (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG)) {
            //     var O = new ShareZiYou(ShareType.Share_GuangYU);
            //     i.addChild(O)
            // }
            RoomUtil.fishDeadHandler(fishList, fishId, userId, r, e.getGetItems(), view.getRoomUI(), view);
            var U = Director.getModelByKey(UserModel);
            userId == U.getUserId() && (this.checkGunUpdate(null, this), Guide.checkGuide(GuideTrriger.FishDead))
        }
    }

    public levelUp(e:LevelUp) {
        var userId = e.getUserId(),
        i = Number(e.getOldLevel()),
        n = Number(e.getNewLevel()),
        a = this._roomModel.getRoomerById(userId);
        a && a.setLv(n);
        if (userId == this._userModel.getUserId()) {
            for (var o = n; o > i; o--) 
                GameUtil.openUserLvip(null, o);
            this._userModel.setLevel(n),
            SoundManager.playEffectSound("levelup")
        }
    }

    public updateOrForgeBack(e) {
        var t = e.getState(),
        i = e.getUserId();
        if (t == UpdateOrForgeType.TYPE_SUC) {
            var n = e.getType();
            if (n != GunUpdateType.UNLOCK) return;
            var a = e.getAfterGunId();
            this._userModel.getUserId() == i && this._userModel.setCurGunID(a);
            var o:RoomView = this.getView(),
            r = e.getUserId(),
            s = this._roomModel.getRoomerById(r),
            l = T_Gun_Table.getVoByKey(a);
            if (l && o.setRoomerGunRate(s.getRoomPos(), l.bulletNum), this._userModel.getUserId() == i) {
                var u = e.getItemProto(),
                d = u.itemId,
                h = u.count,
                c = new Item(d, h);
                if (d == PropEnum.GOLD) {
                    var p = o.getRoomUI().getGunPointByPos(s.getRoomPos(), o.getIsFlip()),
                    g = new egret.Point(p.x, p.y);
                    g.y > 360 ? g.y = 670 : g.y = 50,
                    GameUtil.flyCoinsTOTOTO(h, 8, g, null, r)
                } else this._userModel.addItem(c);
                _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {
                    userId: r,
                    isTween: !0,
                    count: this._userModel.getMoney()
                });
                var _ = s.getRoomPos(),
                y = o.getRoomUI().gunList[_];
                if (y.setLocked(!1), this.checkGunUpdate(null, this), s.setGunRate(e.getAfterGunId()), l) {
                    var m = l.upgradeOrForgeCost,
                    f = m.split(",");
                    f.length > 1 && o.getRoomUI().setHideUnlock();
                    var v = f[0].split("_"),
                    T = parseInt(v[1]),
                    E = this._userModel.getMoney() >= T;
                    E && o.openGunUpdateGroupByEnough()
                }
            }
            if (this._userModel.getUserId() != i) {
                var I = T_Gun_Table.getVoByKey(e.getAfterGunId());
                if (null == I) return void GameUtil.popTips(Language.getText(99));
                s.setGunRate(e.getAfterGunId()),
                o.setRoomerGunRate(s.getRoomPos(), I.bulletNum, s.getIsClone()),
                _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {
                    userId: i
                })
            }
        } else if (t == UpdateOrForgeType.TYPE_MAX) GameUtil.popTips(Language.getText(25));
        else if (t == UpdateOrForgeType.TYPE_NOENOUGH) {
            GameUtil.popTips(Language.getText(26));
            var b = new UnlockGunView,
            C = new UnlockGunMediator(b);
            Director.pushView(C)
        } else t == UpdateOrForgeType.TYPE_NULL && GameUtil.popTips(Language.getText(27));
        this._userModel.getUserId() == i && this.checkGunUpdate(null, this)
    }
    public popCharge(paramObj, t) {
        // var i = ChargeType.Ticket;
        // paramObj && paramObj.type && (i = paramObj.type);
        // var n = t._userModel;
        // if (n.getTicket() > 0) {
        //     var a = new ChargeView(i),
        //     o = new ChargeMediator(a);
        //     return void Director.pushView(o)
        // }
        // if (n.getTatolChargeRMB() <= 0) {
        //     var r = new FirstChargeView,
        //     s = new FirstChargeMediator(r);
        //     return void Director.pushView(s)
        // }
        // var l = new ChargeView(ChargeType.Ticket),
        // u = new ChargeMediator(l);
        // Director.pushView(u)

        if (paramObj.type == ChargeType.Gold) {
            CommonLib.ExternalJS.jumpExchange(1);
        } else {
            // CommonLib.ExternalJS.jumpRecharge(1);
        }
    }

    // public popCiri(e, t) {
    //     var i = t._userModel.getCiriState();
    //     if (i == Ciri_State.Time_Up) {
    //         for (var n = new Array,
    //         a = T_Config_Table.getVoByKey(57).value, o = a.split(","), r = o.length, s = 0; r > s; s++) {
    //             var l = o[s].split("_");
    //             n.push(new game.model.Item(Number(l[0]), Number(l[1]), 0))
    //         }
    //         GameUtil.openCiriByPos(null, n, null,
    //         function() {
    //             var e = new NextDayAwardSendMessage;
    //             e.initData(),
    //             NetManager.send(e),
    //             _Notification_.send(NotifyEnum.CLOSE_CIRI)
    //         })
    //     }
    // }
    // public closeCiri(e, t) {
    //     setTimeout(function() {
    //         var e = t.getView();
    //         e.getRoomUI().addCiriBtn()
    //     },
    //     200)
    // }
    public checkGunUpdate(e, t) {
        // var i = t._userModel.getUserId(),
        // n = t._roomModel.getRoomerById(i),
        // a = t._userModel.getCurGunID(),
        // o = T_Gun_Table.getVoByKey(a);
        // if (a == T_Gun_Table.getAllVo().length) {
        //     var r = t.getView();
        //     return void r.getRoomUI().setHideUnlock()
        // }
        // if (o) {
        //     var s = o.upgradeOrForgeCost,
        //     l = s.split(","),
        //     u = !0,
        //     d = 0,
        //     h = 0;
        //     if (l.length > 1) {
        //         var c:RoomView = t.getView();
        //         return e && (c.setRoomerGunRate(n.getRoomPos(), o.bulletNum, n.getIsClone()), n.setGunRate(a), GameUtil.popTips(Language.getText(71))),
        //         void c.getRoomUI().setHideUnlock()
        //     }
        //     for (var p = 0; 1 > p; p++) {
        //         var g = l[p],
        //         _ = g.split("_"),
        //         y = parseInt(_[0]),
        //         m = parseInt(_[1]);
        //         new Item(y, 0);
        //         if (d = m, h = t._userModel.getMoney(), m > h) {
        //             u = !1;
        //             break
        //         }
        //     }
        //     var r = t.getView();
        //     if (r.setGunUpdateContains(a, h, d), u) {
        //         if (null == e) 
        //             r.openGunUpdateTips();
        //         else {
        //             r.openGunUpdateTips();
        //             var f = new UpgradeOrForgeReq;
        //             f.initData(),
        //             f.setType(GunUpdateType.UNLOCK),
        //             NetManager.send(f,MsgActionDefine.UpgradeOrForgeReq),
        //             r.getRoomUI().getUnlockUpdateUI().openGunUpdateGroupByEnough()
        //         } 
        //      } else {
        //         if (null != e) {
        //             var v:RoomView = t.getView();
        //             v.setRoomerGunRate(n.getRoomPos(), o.bulletNum, !1),
        //             n.setGunRate(a)
        //         }
        //         if (1 == e) {
        //             var T = new UnlockGunView,
        //             E = new UnlockGunMediator(T);
        //             Director.pushView(E)
        //         }
        //         r.getRoomUI().getUnlockUpdateUI().openGunUpdateGroupByNoEnough()
        //     }
        // }
    }

    public fishingUnlockStatus(obj, med) {
        let ms = new FishingUnlockStatus();
        ms.initData();
        ms.setType(1);
        NetManager.send(ms, MsgActionDefine.FishingUnlockStatus);
    }

    /** 收到用户破产(救济金)状态消息 */
    public bankruptStauts(jsonObj, t) {
        var status = jsonObj.status;
        var userId = jsonObj.userId;
        var myUserId = t._userModel.getUserId();
        var roomer:Roomer = t._roomModel.getRoomerById(userId);
         var roomView:RoomView = t.getView();
        if (status == BankruptStauts.STATE_RESUME) {
            // 清除破产状态
            userId == myUserId && t._userModel.setBankruptTime( - 1);
            roomView.removeBankrupt(roomer.getRoomPos());
            roomer.setBankrupt(false);
        } else if (status == BankruptStauts.GET_SUCC) {
            // 获取救济金成功
            var s = jsonObj.coins,
            l = roomView.getRoomUI().getGunPointByPos(roomer.getRoomPos(), roomView.getIsFlip()),
            u = new egret.Point(l.x, l.y);
            u.y > 360 ? u.y = 670 : u.y = 50;
            GameUtil.flyCoinsTOTOTO(s, 8, u, null, userId);
            roomView.removeBankrupt(roomer.getRoomPos());
            roomer.setBankrupt(false);
            t._userModel.setBankruptTime( - 1);
        } else if (status == BankruptStauts.GET_LIMIT) {
            // 领取达到上限
            GameUtil.openConfirm(null, null, t, Language.getText(35));
        } else if (status == BankruptStauts.NOT_TO_TIME) {
            // 领取时间没到
            if (roomer.getBankrupt()) return;
            var h = jsonObj.time;
            t._userModel.setBankruptTime(h);
            var c = h - TimeUtil.getCurrTime();
            var p = TimeUtil.sceonds2MinStr(c);
            var tipTxt = Language.getDynamicText(36, [p]);
            roomView.setBackrupt(roomer.getRoomPos(), tipTxt, userId == myUserId);
            roomer.setBankrupt(true);
            setTimeout(function() { RoomUtil.shakeWindowByFish(roomView) }, 166);
        }
    }

    public updateRoomUIBullets(e, t) {
        var i = e.userId,
        n = t._roomModel.getRoomerById(i);
        if (n) {
            var a = n.getRoomPos(),
            o = n.getDjsObj().grandPrixBulletNum,
            r = t.getView();
            r.setRoomerBullet(a, o, e.isTween)
        }
    }
    public updateRoomUICoins(e, t) {
        var i = e.userId,
        n = t._roomModel.getRoomerById(i);
        if (n) {
            var a = n.getRoomPos(),
            o = 0;
            o = i == t._userModel.getUserId() ? t._userModel.getCoins() : n.getCoins();
            var r:RoomView = t.getView();
            r.setRoomerCoins(a, o, e.isTween);
            var s = RoomUtil.getGunPointByPos(n.getRoomPos(), r.getIsFlip()),
            l = new egret.Point(s.x, s.y);
            l.x > 640 ? l.x = 1168 : l.x = 112,
            l.y > 360 ? l.y = 620 : l.y = 150,
            e.count && FrameUtil.playAddCoinsOnLab(e.count, l, r.getBulletLayer())
        }
    }

    public updateRoomUIMoney(e, t) {
        var i = e.userId,
        n = t._roomModel.getRoomerById(i);
        if (n) {
            var a = n.getRoomPos(),
            o = 0;
            o = i == t._userModel.getUserId() ? t._userModel.getMoney() : n.getMoney();
            var r = t.getView();
            r.setRoomerMoney(a, o)
        }
        i == t._userModel.getUserId() && _Notification_.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED)
    }
    public openLotteryUI(e, t) {
        var roomView:RoomView = t.getView(),
        n = t._userModel.getUserId(),
        a = t._roomModel.getRoomerById(n),
        o = RoomUtil.getPointByPos(a.getRoomPos(), roomView.getIsFlip());
        roomView.openLotteryUI(o)
    }
    // public guide_fishDead() {
    //     var e = this.getView(),
    //     t = this._userModel.getUserId(),
    //     i = this._roomModel.getRoomerById(t),
    //     n = e.getRoomUI().getGunPointByPos(i.getRoomPos(), e.getIsFlip()),
    //     a = new egret.Point(n.x, n.y);
    //     a.y > 360 ? a.y = 670 : a.y = 50;
    //     var o = Especial_Fish.Guide_Fish,
    //     r = e.getFishList(),
    //     s = RoomUtil.getFishById(e.getFishList(), o);
    //     // if (null == s) return void console.warn("此条鱼不存在：" + o);
    //     var l = T_Fish_Table.getVoByKey(s.getFishId());
    //     if (2 == l.functionType) {
    //         var u = 2e3,
    //         d = 0,
    //         h = 0;
    //         if (s.getType() == AddFishType.FISH) {
    //             var c = s.localToGlobal();
    //             d = c.x,
    //             h = c.y
    //         } else {
    //             var c = s.localToGlobal();
    //             d = c.x,
    //             h = c.y
    //         }
    //         var p = e.getBulletLayer(),
    //         g = RES.getRes("ef_baojinbi_json"),
    //         _ = RES.getRes("ef_baojinbi_png"),
    //         y = new egret.MovieClipDataFactory(g, _),
    //         m = new MovieFish(y.generateMovieClipData("ef_baojinbi"), egret.Event.COMPLETE);
    //         m.initEvent(),
    //         m.scaleX = 2.1,
    //         m.scaleY = 2.1,
    //         m.frameRate = 8,
    //         m.gotoAndPlay("play", 1);
    //         var f = m.movieClipData,
    //         v = 0,
    //         T = new egret.Rectangle(f.frames[v].x, f.frames[v].y, 0, 0);
    //         m.anchorOffsetX = (m.width >> 1) + T.x,
    //         m.anchorOffsetY = (m.height >> 1) + T.y,
    //         m.frameRate = 10,
    //         m.x = d,
    //         m.y = h,
    //         p.addChild(m),
    //         RoomUtil.shakeWindowByFish(e);
    //         var E = Director.getModelByKey(LotteryModel),
    //         I = T_Config_Table.getVoByKey(17).value;
    //         E.getScore() >= Number(I) ? FrameUtil.playCaipan(e, i, u, "-1", !0) : FrameUtil.playCaipan(e, i, u)
    //     }
    //     var b = new Array;
    //     RoomUtil.fishDeadHandler(r, o, t, a, b, e.getRoomUI(), e)
    // }

    public insertClonePos(e) {
        null == this._arrCloneId && (this._arrCloneId = new Array);
        for (var t = 0; t < this._arrCloneId.length; t++) if (this._arrCloneId[t] == e) return;
        this._arrCloneId.push(e)
    }
    public deleteClonePos(e) {
        if (null != this._arrCloneId) {
            for (var t = -1,
            i = 0; i < this._arrCloneId.length; i++) if (this._arrCloneId[i] == e) {
                t = i;
                break
            } - 1 != t && this._arrCloneId.splice(t, 1)
        }
    }
    public isCloneByPos(e) {
        if (null == this._arrCloneId) return ! 1;
        if (0 == this._arrCloneId.length) return ! 1;
        for (var t = 0; t < this._arrCloneId.length; t++) if (this._arrCloneId[t] == e) return ! 0;
        return ! 1
    }
    // public serverFishHandler(e) {
    //     for (var t = new Array,
    //     i = this.getView(), n = i.getFishList(), a = e.getGroupIdList(), o = 0; o < a.length; o++) {
    //         var r = a[o],
    //         s = i.getRoomUI().getGunByPos(r);
    //         if (n.length > o) {
    //             var l = n[n.length - o - 1],
    //             u = 0;
    //             if (l.getActor().getType() == AddFishType.FISH) {
    //                 u = l.getActor().getUniqId();
    //                 var d = l.getActor().localToGlobal(),
    //                 h = FishUtil.getAngle(s.x, s.y, d.x, d.y);
    //                 t.push({
    //                     groupId: r,
    //                     fishId: [u],
    //                     pos: h
    //                 })
    //             } else if (l.getActor().getType() == AddFishType.FISH_GROUP) {
    //                 var c = l.getActor(),
    //                 p = c.getFishList();
    //                 if (p.length > 0) {
    //                     u = p[0].getUniqId();
    //                     var d = (p[0].x, p[0].y, p[0].localToGlobal()),
    //                     h = FishUtil.getAngle(s.x, s.y, d.x, d.y);
    //                     t.push({
    //                         groupId: r,
    //                         fishId: [u],
    //                         pos: h
    //                     })
    //                 }
    //             }
    //         }
    //         if (t.length > 0) {
                // var g = new GunFishPosInfoMessageMessage;
                // g.initData(),
                // g.setFishPostList(t),
                // NetManager.send(g)
    //         }
    //     }
    // }
    // public receiMail(e) {
    //     var t = new game.model.EmailItem(e.getMailId(), e.getMailType(), e.getUserId(), e.getReceiveUserName(), e.getSendUserId(), e.getSendUserName(), e.getItems(), e.getTime(), e.getState(), e.getMailContent(), e.getMailTitle()),
    //     i = new Array;
    //     i.push(e.getSendUserName() + ""),
    //     i.push(e.getSendUserId() + ""),
    //     i.push(t.getItems()[0].getCount() + "");
    //     var n = T_Item_Table.getVoByKey(Number(t.getItems()[0].getItemId()));
    //     i.push(Language.getText(n.name) + "");
    //     var a = Language.getDynamicText(46, i); !
    //     function(e, t) {
    //         GameUtil.openEmailChakan(null,
    //         function() {
    //             var t = new ReceiveMailSendMessage;
    //             t.initData(),
    //             t.setMailId(e.getMailId()),
    //             NetManager.send(t)
    //         },
    //         t, e.getItems(), e.getState())
    //     } (t, a)
    // }

    private unregist() {
        MessageDispatcher.unregister(MsgActionDefine.AddFish),
        MessageDispatcher.unregister(MsgActionDefine.IntoRoomRes);
        MessageDispatcher.unregister(MsgActionDefine.QuitRoom);
        MessageDispatcher.unregister(MsgActionDefine.FishingGunRes);
        MessageDispatcher.unregister(MsgActionDefine.FishingHitRes);
        MessageDispatcher.unregister(MsgActionDefine.UserBalanceRes);
        MessageDispatcher.unregister(MsgActionDefine.UseItemRes);
        MessageDispatcher.unregister(MsgActionDefine.UseWarheadRes),
        MessageDispatcher.unregister(MsgActionDefine.PondState),
        MessageDispatcher.unregister(MsgActionDefine.ChangeGunRes);
        MessageDispatcher.unregister(MsgActionDefine.LockItemEnd),
        MessageDispatcher.unregister(MsgActionDefine.UseLockItem),
        MessageDispatcher.unregister(MsgActionDefine.RandomFishHitRes),
        MessageDispatcher.unregister(MsgActionDefine.LotteryConditonAccumulate),
        MessageDispatcher.unregister(MsgActionDefine.LevelUp),
        MessageDispatcher.unregister(MsgActionDefine.PondFishes);
        MessageDispatcher.unregister(MsgActionDefine.UpgradeOrForgeRes);
        // MessageDispatcher.unregister(ResponseType.FINISHTASKBACK),
        // MessageDispatcher.unregister(ResponseType.EXCHANGEGOODSBACK),
        // MessageDispatcher.unregister(ResponseType.GRANDPRIXSETTLEMENT),
        // MessageDispatcher.unregister(ResponseType.ARENASIGNUPBACK),
        // MessageDispatcher.unregister(ResponseType.GRANDPRIXINFOCHANGE),
        // MessageDispatcher.unregister(ResponseType.THEPEOPLECHANGE),
        // MessageDispatcher.unregister(ResponseType.QUICKGAMEINFOCHANGE),
        // MessageDispatcher.unregister(ResponseType.QUICKGAMERANKRESULT),
        // MessageDispatcher.unregister(ResponseType.QUICKGAMEINTOROOM),
        MessageDispatcher.unregister(MsgActionDefine.WorldBossInfo);
        // MessageDispatcher.unregister(ResponseType.PIRATERANKRESULT),
        // MessageDispatcher.unregister(ResponseType.SYNCFISHPOSINFO),
        // MessageDispatcher.unregister(ResponseType.MAIL),
        // MessageDispatcher.unregister(ResponseType.GETWANBAGIFTBACK);
    }

    public destroy() {
        this.unregist();

        this.unsubscribByType(NotifyEnum.GUN_SEND),
        this.unsubscribByType(NotifyEnum.HIT_FISH),
        this.unsubscribByType(NotifyEnum.USE_PROP_ITEM),
        this.unsubscribByType(NotifyEnum.USE_WARHEAD),
        this.unsubscribByType(NotifyEnum.CLICK_EXIT_ROOM),
        this.unsubscribByType(NotifyEnum.ROOM_UI_INIT_END),
        this.unsubscribByType(NotifyEnum.RESET_RATE),
        this.unsubscribByType(NotifyEnum.OPEN_LOTTERY_UI),
        this.unsubscribByType(NotifyEnum.LOCKED_FISH_DISAPPEAR),
        this.unsubscribByType(NotifyEnum.LOCKED_FISH_CHANGE),
        this.unsubscribByType(NotifyEnum.UPDATE_ROOM_UI_COINS),
        this.unsubscribByType(NotifyEnum.UPDATE_ROOM_UI_MONEY),
        this.unsubscribByType(NotifyEnum.LOTTERY_UI_LOAD_END),
        this.unsubscribByType(NotifyEnum.SET_PROP_NUM),
        this.unsubscribByType(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED),
        this.unsubscribByType(NotifyEnum.BANKRUPT_MESSAGE),
        this.unsubscribByType(NotifyEnum.SEND_CLICK_FISH),
        this.unsubscribByType(NotifyEnum.CHECK_GUN_RESET),
        this.unsubscribByType(NotifyEnum.SHOW_CHAKAN_PANEL),
        this.unsubscribByType(NotifyEnum.GUIDE_OPEN),
        this.unsubscribByType(NotifyEnum.GUIDE_CLOSE),
        this.unsubscribByType(NotifyEnum.TASK_GUIDE_PANEL_LOADED),
        this.unsubscribByType(NotifyEnum.TASK_GUIDE_CHANGE),
        this.unsubscribByType(NotifyEnum.TASK_GUIDE_LOAD),
        this.unsubscribByType(NotifyEnum.POP_EXCHANGE),
        this.unsubscribByType(NotifyEnum.POP_UPDATEEXCHANGE),
        this.unsubscribByType(NotifyEnum.SIGN_UP_DJS),
        this.unsubscribByType(NotifyEnum.DJS_TASK_CHANGE),
        this.unsubscribByType(NotifyEnum.DJS_RESULT_SEND),
        this.unsubscribByType(NotifyEnum.CLOSE_SIGN_VIEW),
        this.unsubscribByType(NotifyEnum.UPDATE_ROOM_UI_BULLETS),
        this.unsubscribByType(NotifyEnum.POP_CHARGE),
        this.unsubscribByType(NotifyEnum.POP_CIRI),
        this.unsubscribByType(NotifyEnum.CLOSE_CIRI);
        this.unsubscribByType(NotifyEnum.CHANGE_PHOENIX_UI);
        this.unsubscribByType(NotifyEnum.PRICE_TASK_CHANGE);
        this.unsubscribByType(NotifyEnum.CLEAR_PRICE_TASK);
        this.unsubscribByType(NotifyEnum.PRICE_CHALLENGE_FAIL);
        this.unsubscribByType(NotifyEnum.SHOW_PRICE_RANK);
        this.unsubscribByType(NotifyEnum.CHECN_VIP_ITEM);
        this.unsubscribByType(NotifyEnum.UPDATE_GORGEOUS_STATE);
        this.unsubscribByType(NotifyEnum.RE_REGIST_CHANGEGUNBACK);
        this.unsubscribByType(NotifyEnum.FISHING_UNLOCK_STATUS);

        GCBroadcastManager.clearRoomBroadcast(),
        this.getView().destroy(),
        this._timer && this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._warTimer && (this._warTimer.removeEventListener(egret.TimerEvent.TIMER, this.warFun, this), this._warTimer.stop(), this._warTimer = null);
    }
} 