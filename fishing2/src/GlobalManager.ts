class GlobalManager {
    public static _instance = null;
    public static isFirstOpenGame = true;
    public static SkinPath = "fish_skins";

    public _isInit = false;
    public GUN_FRAME_TIME = 335;
    public MAIN_ENTR_IDX = 1;
    public bIsNeedDelayLogin = false;

    private _heartTimer;
    private _logHeartTimer;

    public trumpetMsgList;


    public constructor() {
        if (this._isInit) throw new SimpleError("");
        this._isInit = true;
    }

    public static getInstance(): GlobalManager {
        if (!this._instance) {
            this._instance = new GlobalManager();
            this._instance.init();
        }
        return this._instance;
    }

    public init() {
        this.trumpetMsgList = new Array();
        var t = T_Config_Table.getVoByKey(85);
        if ("0" != t.value)
            for (var i = t.value.split(","), n = 8 * Math.random() + 2, a = 0; n > a; a++) {
                var o = i.length - 1,
                    r = Math.random() * o,
                    s = i.splice(r, 1);
                this.trumpetMsgList.push(Language.getText(Number(s[0])));
            }
        var l = this;
        MessageDispatcher.register(MsgActionDefine.CommonStatus,
            function (msg: CommonStatus) {
                switch (msg.getCode()) {
                    case CommonEnum.RECONNECT:
                        l.reconnect();
                        break;
                    case CommonEnum.RELOGIN:
                        GameUtil.openConfirm(null,
                            function () {
                                GlobalManager.getInstance().reLogin();
                            },
                            this, Language.getText(59));
                        break;
                    case CommonEnum.LOGIN_FAIL:
                        GameUtil.openConfirm(null, null, this, Language.getText(64));
                        break;
                    case CommonEnum.REPLACED:
                        GameUtil.openConfirm(null, null, this, Language.getText(59));
                        GlobalManager.getInstance().reLogin();
                        break;
                    case CommonEnum.ACCOUNT_BAN:
                        GameUtil.openConfirm(null, null, this, Language.getText(6001));
                        break;
                    case CommonEnum.DALAY_LOGIN:
                        GlobalManager.getInstance().bIsNeedDelayLogin = !0,
                            setTimeout(function () {
                                if (GlobalManager.getInstance().bIsNeedDelayLogin) {
                                    var sendMsg = new LoginReq();
                                    sendMsg.initData();
                                    sendMsg.setUserId(CONFIG.USER_ID);
                                    sendMsg.setAccount(CONFIG.ACCOUNT);
                                    sendMsg.setPlatform(CONFIG.PLATFORM_ID);
                                    sendMsg.setSecret(CONFIG.IDENDTITY);
                                    NetManager.send(sendMsg, MsgActionDefine.LoginReq);
                                }
                            }, 1000);
                        break;
                    // case CommonEnum.NEED_RELOAD_GAME:
                    // case CommonEnum.PARAM_ERROR:
                    // case CommonEnum.USER_NOT_EXIST:
                    // case CommonEnum.INTO_ROOM_ERROR:
                    case CommonEnum.BULLET_NON_EXISTENT:
                    case CommonEnum.FISH_NON_EXISTENT:
                        GameUtil.openConfirm(null, null, this, msg.getMsg());
                        break;
                    case CommonEnum.UNKOWN_ERROR:
                        GameUtil.openConfirm(null, function () {
                            CommonLib.ExternalJS.jumpLogin();
                        }, this, Language.getText(6003));
                        break;
                    case CommonEnum.GOLD_NOT_ENOUGH:
                        // GameUtil.openConfirm(null, null, this, msg.getMsg());
                        // CommonLib.ExternalJS.jumpExchange(1);
                        console.warn("rcv CommonStatus : 金币不足[5103]");
                        break;
                    default: {
                        if (msg.getCode() < 0) {
                            return;
                        }

                        GameUtil.openConfirm(null,
                            function () {
                                GlobalManager.getInstance().reconnect();
                            }, this, msg.getMsg() + " [" + msg.getCode() + "]");
                    }
                }
            });

        MessageDispatcher.register(MsgActionDefine.MajorParameterChange,
            function (e: MajorParameterChange) {
                var userModel: UserModel = Director.getModelByKey(UserModel),
                    usrId = Number(e.getUserId()),
                    coins = Number(e.getCoins()),
                    money = Number(e.getGems());
                if (usrId == userModel.getUserId()) {
                    var o = Number(e.getLevel());
                    null != e.getCoins() && (userModel.setCoins(coins), _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: usrId }));
                    null != e.getGems() && (userModel.setMoney(money), _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: usrId }));
                    var r = e.getCoupon();
                    null != r && userModel.setTicket(r),
                        o && userModel.setLevel(o);
                    var s = e.getItem();
                    var l = s.length;
                    //服务器返回全部item
                    // userModel.getItemList().length = 0;
                    for (var u = 0; l > u; u++) {
                        var d = T_Item_Table.getVoByKey(Number(s[u].itemId));
                        var h = 0;
                        (d.type == BagItemType.BARBETTE || d.type == BagItemType.BATTERY) && (h = s[u].expried),
                            userModel.updateItem(s[u].itemId, s[u].totalCount, h);
                        var c = s[u].itemId;
                        (c == PropEnum.CALABASH || c == PropEnum.CLONE || c == PropEnum.RAGE || c == PropEnum.FREE_RAGE || c == PropEnum.FREE_CLONE || c == PropEnum.FROZEN || c == PropEnum.LOCK || c == PropEnum.GOLD_WARHEAD || c == PropEnum.SILVER_WARHEAD || c == PropEnum.BRONZE_WARHEAD || c == PropEnum.NUCLEAR_WARHEAD) && _Notification_.send(NotifyEnum.SET_PROP_NUM)
                    }
                    // var changeItemAry = e.getItem();
                    // var useritemList = userModel.getItemList()
                    // for (var i = useritemList.length - 1; i >= 0; i--) {
                    //     for (var q = 0; q < changeItemAry.length; q++) {
                    //         if (useritemList[i].getItemId == changeItemAry[q].itemId) {
                    //             if (changeItemAry[q].totalCount == 0) {
                    //                 useritemList.shift(i, 1);
                    //             } else {
                    //                 (useritemList[i] as Item).setCount(changeItemAry[q].totalCount);
                    //             }
                    //         }
                    //     }
                    // }
                    _Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
                    // _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: usrId });
                    // _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: usrId });

                    _Notification_.send(NotifyEnum.BAG_CHANGE_ITEM_INFO);
                } else {
                    var p = Director.getModelByKey(RoomModel),
                        g = p.getRoomerById(usrId);
                    if (!g) return;
                    coins && (g.setCoins(coins), _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, { userId: usrId }), _Notification_.send(NotifyEnum.UPDATE_MAIN_DATA));
                    money && (g.setMoney(money), _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, { userId: usrId }), _Notification_.send(NotifyEnum.UPDATE_MAIN_DATA));
                }
            }
        );

        /** 注册破产消息          */
        MessageDispatcher.register(MsgActionDefine.Bankrupt,
            function (e: Bankrupt) {
                var state = Number(e.getState()),
                    i = Number(e.getUserId());
                state == BankruptStauts.BANKRUPT ? _Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, {
                    status: state,
                    userId: i,
                    time: Number(e.getCanReliefTime())
                }) : state == BankruptStauts.STATE_RESUME ? _Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, {
                    status: state,
                    userId: i
                }) : state == BankruptStauts.GET_SUCC ? _Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, {
                    status: state,
                    userId: i,
                    coins: Number(e.getCoins())
                }) : state == BankruptStauts.GET_LIMIT ? _Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, {
                    status: state,
                    userId: i
                }) : state == BankruptStauts.NOT_TO_TIME && _Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, {
                    status: state,
                    userId: i,
                    time: Number(e.getCanReliefTime())
                })
            });

        // game.net.MessageDispatcher.register(MsgActionDefine.GCBROADCASTMESSAGEBACK,
        // function(e) {
        //     for (var t = e.getMessageList(), i = new Array, n = 0, a = t; n < a.length; n++) {
        //         var o = a[n],
        //         r = o.broadType,
        //         s = o.msg,
        //         u = o.langId,
        //         d = o.priority,
        //         h = o.params;
        //         if (r == BroadType.NewsActive) if (s) i.push(s);
        //         else {
        //             var c = Language.getDynamicText(u, h);
        //             i.push(c)
        //         } else if (r == BroadType.NewsFishing) if (s) game.util.GCBroadcastManager.addRoomBroadcast(s, r);
        //         else {
        //             var c = game.util.Language.getDynamicText(u, h);
        //             game.util.GCBroadcastManager.addRoomBroadcast(c, r, d)
        //         } else r == BroadType.NewsWorld && s && (game.util.GCBroadcastManager.addRoomBroadcast(s, r), l.trumpetMsgList.length > 20 && l.trumpetMsgList.shift(), l.trumpetMsgList.unshift(s))
        //     }
        //     i.length > 0 && game.util.GCBroadcastManager.addHallBroadcast(i)
        // });

        // game.net.MessageDispatcher.register(MsgActionDefine.TASKPARAMETERCHANGE,
        // function(e) {
        //     for (var t = e.getChangedTasks(), i = Director.getModelByKey(TaskModel), n = t.length, a = !1, o = !1, r = 0; n > r; r++) {
        //         var s = t[r].taskId,
        //         l = t[r].taskStatus,
        //         u = t[r].curParameterValue;
        //         i.updateItem(s, l, u);
        //         var d = game.table.T_FishTaskItem_Table.getVoByKey(Number(s));
        //         if (d && d.type == TaskType.TASK_TYPE_NEWBIE) _Notification_.send(NotifyEnum.TASK_GUIDE_CHANGE);
        //         else if (d && d.type == TaskType.TASK_TYPE_GRAND_PRIX) a = !0;
        //         else if (d && d.type == TaskType.TASK_TYPE_PRICE) {
        //             if (o = !0, null != e.getPirateTaskEndTime()) {
        //                 var h = Number(e.getPirateTaskEndTime());
        //                 i.updateItem(s, l, u, h)
        //             }
        //         } else _Notification_.send(NotifyEnum.TASK_ACT_CHANGE)
        //     }
        //     if (a) {
        //         i.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
        //         _Notification_.send(NotifyEnum.DJS_TASK_CHANGE, {
        //             times: e.getArenaTaskTimes()
        //         })
        //     }
        //     o && _Notification_.send(NotifyEnum.PRICE_TASK_CHANGE)
        // });

        // game.net.MessageDispatcher.register(MsgActionDefine.VIPLEVELUP,
        // function(e) {
        //     var t = Director.getModelByKey(UserModel);
        //     t.setVipLevel(Number(e.getNewLevel()))
        // });

        // game.net.MessageDispatcher.register(MsgActionDefine.ROOMONLINEMESSAGE,
        // function(e) {
        //     var t = e.getOnlineList(),
        //     i = t.length,
        //     n = new Array;
        //     n.push(1),
        //     n.push(1),
        //     n.push(1);
        //     for (var a = 0; i > a; a++) {
        //         var o = t[a],
        //         r = o.getRoomType(),
        //         s = o.getNum();
        //         n[r - 2] = s
        //     }
        //     var l = Director.getModelByKey(UserModel);
        //     l.setRoomOnLine(n),
        //     _Notification_.send(NotifyEnum.REFRES_ROOM_ONLINE)
        // });

        // game.net.MessageDispatcher.register(MsgActionDefine.ACTIVECONFIGMESSAGESBACK,
        // function(e) {
        //     var t = Director.getModelByKey(ActiveModel);
        //     t.setData(e),
        //     _Notification_.send(NotifyEnum.ACTIVE_CONFIG_DATA_LOAEDED)
        // });

        // this.initSubPlatformData();
    };


    // public initSubPlatformData() {
    //     this._subsMap = new util.Map;
    //     for (var e = game.table.T_Config_Table.getVoByKey(94), t = e.value.split(","), i = 0, n = t; i < n.length; i++) {
    //         var a = n[i],
    //         o = a.split("_"),
    //         r = Number(o[0]),
    //         s = o[1];
    //         this._subsMap.put(r, s)
    //     }
    // }

    // public getKeyBySubId(e) {
    //     return CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG || CONFIG.PLATFORM_ID == PlatformTypeEnum.ZI_YOU ? CONFIG.logAppID: this._subsMap.contains(e) ? this._subsMap.get(e) : CONFIG.logAppID
    // }

    public startHeartbeat() {
        this._heartTimer = new egret.Timer(29000, 0); //半分钟
        this._heartTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._heartTimer.start();
    }

    // public startLogHeartBeat() {
    //     this._logHeartTimer = new egret.Timer(5e3, 0),
    //     this._logHeartTimer.addEventListener(egret.TimerEvent.TIMER, this.logTimerFunc, this),
    //     this._logHeartTimer.start()
    // }

    public timerFunc() {
        var e = new Heartbeat();
        e.initData();
        NetManager.send(e, MsgActionDefine.Heartbeat);
    }

    // public logTimerFunc() {
    //     game.util.ReyunUtil.heartbeat()
    // }

    public setServerTime(e) {
        TimeUtil.initServerTime(e)
    }

    public reconnect() {
        var e = new FishMainView();
        var t = new FishMainMediator(e);
        Director.repleaceView(t);
    }

    public clearAllGameData() {
        _Notification_.removeAll(),
            MessageDispatcher.removeAll(),
            Director.clearAllModel(),
            this._heartTimer && this._heartTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this),
            // this._logHeartTimer && this._logHeartTimer.addEventListener(egret.TimerEvent.TIMER, this.logTimerFunc, this),
            this._isInit = !1,
            GlobalManager._instance = null
    }

    public reLogin(e = false) {
        this.clearAllGameData();
        var t = new LoginView,
            i = new LoginMediator(t);
        Director.repleaceView(i)
    }

    public addReconnectListener() {
        MessageDispatcher.register(MsgActionDefine.LoginRes,
            function (msg: LoginRes) {
                GlobalManager.getInstance().bIsNeedDelayLogin = !1;
                var userModel: UserModel = Director.getModelByKey(UserModel);
                var pi: PlayerInfo = msg.getPlayerInfo();
                userModel.setUserId(pi.getUserId());
                userModel.setMoney(pi.getGems());
                userModel.setCoins(pi.getCoins());
                userModel.setCurGunID(pi.getMaxGunId());
                userModel.setBankruptTime(msg.getCanReliefTime()),
                    userModel.setTodayFirstLogin(msg.getIsTodayFirstLogin());
                // var n = msg.getChargedGears();
                // if (n.length > 0) 
                //     for (var a = n.length, o = 0; a > o; o++) 
                //         userModel.addChargedGears(Number(n[o]));
                var r = pi.getRoleLevel(),
                    s = pi.getRoleExp(),
                    l = pi.getVipLevel();
                userModel.setLevel(Number(r)),
                    userModel.setExp(Number(s)),
                    userModel.setVipLevel(l),
                    GlobalManager.getInstance().setServerTime(Number(msg.getSystemTime()));

                var hallView = new FishMainView();
                var hallMed = new FishMainMediator(hallView);
                Director.repleaceView(hallMed);
                var h = Director.getModelByKey(RoomModel);
                h.clearRoom();
            });
    }

    public initUserData(t: LoginRes) {
        var i: UserModel = Director.getModelByKey(UserModel);
        i.init();
        var pi: PlayerInfo = t.getPlayerInfo();
        i.setUserId(pi.getUserId()),
        i.setUserName(pi.getNickName()),
        i.setHeadUrl(pi.getIconUrl()),
        i.setMoney(pi.getGems());
        i.setCoins(pi.getCoins());
        i.setTicket(pi.getCoupon());
        i.setCurGunID(pi.getMaxGunId());
        i.setBankruptTime(t.getCanReliefTime()),
        i.setEverydayActive(t.getEverydayActive()),
        i.setEveryWeekActive(t.getEveryWeekActive()),
        i.setGuideID(t.getNewbieGuideId()),
        i.setCurSkinId(pi.getBatterySkinId()),
        i.setCurGunBgId(pi.getGunrestSkinId()),
        i.setTatolChargeRMB(pi.getTotalChargeRMB()),
        i.setMonthEndTime(pi.getMonthEndTime()),
        i.setTodayFirstLogin(t.getIsTodayFirstLogin()),
        // i.setSignObj(t.getMonthSignActiveInfo()),
        i.setIsTodayDraw(t.getIsTodayDraw()),
        i.setInviteCode(t.getSelfInviteCode());
        // i.setAccount(CONFIG.ACCOUNT);
        // i.setIdentity(CONFIG.IDENDTITY);

        // var n = t.getChargedGears();
        // if (n.length > 0) 
        //     for (var a = n.length, o = 0; a > o; o++) 
        //         i.addChargedGears(Number(n[o]));
        // for (var r = t.getExchangedGears(), s = 0, l = r; s < l.length; s++) {
        //     var u = l[s];
        //     i.addExchangeGears(u)
        // }

        // var d = t.getActiveInfo(),
        // h = T_Config_Table.getVoByKey(79),
        // c = Number(h.value) - d.getShareTimes();
        // 0 > c && (c = 0),
        // i.setShareTimes(c),
        // i.setIsFocusFlag(1 == d.getFocusFlag()),
        // t.getNextDayAwardActiveInfo() && i.setCiriState(t.getNextDayAwardActiveInfo().nextDayAwardState);

        GlobalManager.getInstance().setServerTime(Number(t.getSystemTime()));
        GlobalManager.getInstance().startHeartbeat();
        // GlobalManager.getInstance().startLogHeartBeat();
        var p = t.getItemInfo();
        for (var o = 0; o < p.length; o++) {
            var itemId = p[o].itemId;
            var cnt = p[o].totalCount;
            var y = T_Item_Table.getVoByKey(Number(itemId));
            var m = 0;
            (y.type == BagItemType.BARBETTE || y.type == BagItemType.BATTERY) && (m = p[o].expried);
            var f = new Item(itemId, cnt, m);
            i.addItem(f);
        }
        // var v = t.getMailListByType(),
        // T = Director.getModelByKey(EmailModel);
        // T.init();
        // for (var o = 0; o < v.length; o++) for (var E = v[o].getMails(), I = 0; I < E.length; I++) {
        //     var b = E[I],
        //     C = new game.model.EmailItem(b.getMailId(), b.getMailType(), b.getUserId(), b.getReceiveUserName(), b.getSendUserId(), b.getSendUserName(), b.getItems(), b.getTime(), b.getState(), b.getMailContent(), b.getMailTitle());
        //     T.addItem(C)
        // }
        var x = pi.getRoleLevel(),
            w = pi.getRoleExp(),
            R = pi.getVipLevel();
        i.setLevel(Number(x)),
            i.setExp(Number(w)),
            i.setVipLevel(R);
        // var A = t.getTaskInfo(),
        // L = Director.getModelByKey(TaskModel);
        // L.init();
        // for (var M = A.length,
        // o = 0; M > o; o++) {
        //     var S = A[o],
        //     P = new game.model.TaskItem(S.taskId, S.taskStatus, S.curParameterValue);
        //     L.addItem(P)
        // }
        // if (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET) {
        //     net.HttpManager.init("http://gamecenter.combunet.com/LoginServer/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET,
        //     function(e) {
        //         var t = Director.getModelByKey(UserModel),
        //         i = JSON.parse(e);
        //         game.platform.PaymentManager.WXConfig(Number(i.timestamp), i.noncestr, i.signature, t.getInviteCode())
        //     },
        //     function() {});
        //     var B = (Director.getModelByKey(UserModel), window.location.href.split("#")[0]),
        //     N = encodeURIComponent(B);
        //     net.HttpManager.addParam("url", N),
        //     net.HttpManager.send()
        // }
        // if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
        //     net.HttpManager.init("http://gamecenter.combunet.com/LoginServer4yiwantang/weixinShare.action", egret.HttpResponseType.TEXT, egret.HttpMethod.GET,
        //     function(e) {
        //         var t = Director.getModelByKey(UserModel),
        //         i = JSON.parse(e);
        //         game.platform.PaymentManager.WXConfig(Number(i.timestamp), i.noncestr, i.signature, t.getInviteCode())
        //     },
        //     function() {});
        //     var B = (Director.getModelByKey(UserModel), window.FISHING_CONFIG.curURL),
        //     N = encodeURIComponent(B);
        //     net.HttpManager.addParam("url", N),
        //     net.HttpManager.send()
        // }
        var G: RoomModel = Director.getModelByKey(RoomModel);
        G.init();
        // var O = Director.getModelByKey(ActiveModel);
        // O.init();
        // var U = Director.getModelByKey(ExchangeModel);
        // U.init();
        var D: LotteryModel = Director.getModelByKey(LotteryModel);
        D.init()
    }

    public reConnect2Server() {
        var e: UserModel = Director.getModelByKey(UserModel);
        var t = new LoginReq;
        t.initData(),
            t.setUserId(CONFIG.USER_ID),
            t.setAccount(CONFIG.ACCOUNT),
            t.setPlatform(CONFIG.PLATFORM_ID),
            t.setSecret(CONFIG.IDENDTITY),
            NetManager.send(t, MsgActionDefine.LoginReq);
    }

    public reConnect2Room() {
        MessageDispatcher.unregister(MsgActionDefine.IntoRoomRes);
        MessageDispatcher.unregister(MsgActionDefine.PondFishes);

        var roomModel: RoomModel = Director.getModelByKey(RoomModel);
        roomModel.clearRoom();
        var userModel: UserModel = Director.getModelByKey(UserModel);

        MessageDispatcher.register(MsgActionDefine.IntoRoomRes,
            function (msg: IntoRoomRes) {
                RoomMediator.rcvPlayerInfos(msg);
                // var i = Director.getModelByKey(UserModel);
                // var r = i.getMatchRoomLevel();
                // if (r == RequesetRoomState.DjsRoom || r == RequesetRoomState.QmsRoom || GameUtil.isKss(r)) {
                //     var s = new game.model.DjsObj(n[a].grandPrixMessage);
                //     o.setDjsObj(s)
                // }
            });

        MessageDispatcher.register(MsgActionDefine.PondFishes,
            function (msg: PondFishes) {
                RoomMediator.rcvPondFishes(msg);
                // UIUtil.startLoading(),
                // o.closeLoadingUI();
                var r: RoomView = new RoomView();
                var s = new RoomMediator(r);
                Director.repleaceView(s);
            });

        var sendIntoRoom = function () {
            var t = new IntoRoomReq();
            t.initData();
            t.setRoomId(userModel.getRoomId());
            t.setUserId(userModel.getUserId());
            t.setAccount(CONFIG.ACCOUNT);
            t.setIdentity(CONFIG.IDENDTITY);
            t.setType(userModel.getMatchRoomLevel());
            NetManager.send(t, MsgActionDefine.IntoRoomReq);
        }

        var skinId = userModel.getCurSkinId();
        var roomType = userModel.getMatchRoomLevel();
        var resGroupName = "asyn_fish_" + roomType + skinId;
        if (RES.isGroupLoaded(resGroupName)) {
            sendIntoRoom();
            console.log("resGroupName isGroupLoaded");
        } else {
            console.log("resGroupName no.. isGroupLoaded");
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, function (resEvt: RES.ResourceEvent) {
                // RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, resLoadedFun, med);
                if (resEvt.groupName == resGroupName) {
                    sendIntoRoom();
                }
            }, this);
            var keys: Array<string> = LoaderUtil.getFishResByType(roomType);
            keys.push("gunsicon_" + skinId + "_png");
            keys.push("fishing");
            RES.createGroup(resGroupName, keys);
            RES.loadGroup(resGroupName);
        }
    }

    public login2hall(loadingView) {
        UIUtil.startLoading();
        NetManager.initNet(CONFIG.SERVER_IP, CONFIG.SERVER_PORT,
            function () {
                var msg = new LoginReq();
                msg.initData();
                msg.setUserId(CONFIG.USER_ID);
                msg.setAccount(CONFIG.ACCOUNT);
                msg.setPlatform(CONFIG.PLATFORM_ID);
                msg.setSecret(CONFIG.IDENDTITY);
                NetManager.send(msg, MsgActionDefine.LoginReq);
            });

        MessageDispatcher.register(MsgActionDefine.LoginRes,
            function (msg: LoginRes) {
                MessageDispatcher.unregister(MsgActionDefine.LoginRes);
                UIUtil.closeLoading();
                GlobalManager.getInstance().bIsNeedDelayLogin = false;
                GlobalManager.getInstance().initUserData(msg);
                // var i = Director.getModelByKey(UserModel),
                // var isNew = false;
                // i.getGuideID() <= 0 && (n = !0),
                // CONFIG.openGuide || (n = !1),
                // e.getView().enterMainView(isNew);
                var hallView = new FishMainView();
                var hallMed = new FishMainMediator(hallView);
                Director.repleaceView(hallMed);

                if (loadingView) {
                    loadingView.parent && loadingView.parent.removeChild(loadingView);
                    loadingView.destroy();
                }
            });
    }

}