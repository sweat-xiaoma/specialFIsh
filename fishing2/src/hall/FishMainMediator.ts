class FishMainMediator extends SimpleMediator {

    public _isInBankrupt;

    private _timer: egret.Timer;

    public constructor(t) {
        super(t);
        this._isInBankrupt = false;
    }

    public onAdded() {
        super.onAdded();
        // this._arrPop = new Array;
        // var i = Director.getModelByKey(UserModel),
        // n = i.getVipLevel(),
        // a = T_VipLevel_Table.getVoByKey(n),
        // o = i.isTodayFirstLogin();
        // if (o) {
        //     a.makeUpConisTo > 0 && this._arrPop.push(Pop_State.VIP);
        //     var r = i.getMonthEndTime(),
        //     s = r - TimeUtil.getCurrTime();
        //     s > 0 && t.isFirstOpen && (t.isFirstOpen = !1, this._arrPop.push(Pop_State.MONTH_CARD))
        // }
        // var l = i.getCiriState();
        // l == Ciri_State.Un_Gain && o && this._arrPop.push(Pop_State.CIRI),
        // i.isTodayDraw() || o && this._arrPop.push(Pop_State.CIRCLE),
        // this.subscrib(NotifyEnum.CHECK_POP, this.checkPop),
        this.getView().initView();
    }

    public checkPop(e, t) {
        var i = t.getView();
        if (0 != t._arrPop.length) {
            var n = t._arrPop.shift();
            i.openPanel(n)
        }
    }

    public init() {
        var e = this;
        this.subscrib(NotifyEnum.MAIN_UI_INIT, this.viewInit);
        this.subscrib(NotifyEnum.QUICK_GAME, this.quickGame);
        // this.subscrib(NotifyEnum.RES_LOAD_OVER, this.checkAndSendIntoRoom);
        this.subscrib(NotifyEnum.OPEN_SELECT_ROOM, this.openSelcetRoom), //选择房间
        this.subscrib(NotifyEnum.CLICK_MAIN_FUN_ITEM, this.clickMainFunItem);
        this.subscrib(NotifyEnum.CLICK_MAIN_BTN, this.clickMainBtn);
        this.subscrib(NotifyEnum.UPDATE_MAIN_DATA, this.updateMainState);
        // this.subscrib(NotifyEnum.CHECK_MAIN_ALERT, this.checkMainAlert),
        // this.subscrib(NotifyEnum.REFRES_ROOM_ONLINE,  this.refreshRoomOnline),
        this.subscrib(NotifyEnum.BANKRUPT_MESSAGE, this.bankruptBack);
        this.subscrib(NotifyEnum.UPDATE_ROOM_UI_COINS, this.updateUICoins);
        // this.subscrib(NotifyEnum.REQ_QQZONE_GIFT, this.reqQQZoneGift),
        // this.subscrib(NotifyEnum.CLOSE_QQZONE_GIFT, this.checkMianViewPopLogic),
        this.subscrib(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, this.clickIntoRoom);
        // this.subscrib(NotifyEnum.ACTIVE_CONFIG_DATA_LOAEDED, this.showActiveAlert),
        // MessageDispatcher.register(ResponseType.MAIL,
        // function(t) {
        //     e.receiMail(t)
        // }),
        // MessageDispatcher.register(ResponseType.MAILBOX,
        // function(t) {
        //     e.refreshMail(t)
        // }),
        // MessageDispatcher.register(ResponseType.GETWANBAGIFTBACK,
        // function(t) {
        //     e.getWanbaGiftback(t)
        // }),
        // MessageDispatcher.register(ResponseType.NEXTDAYAWARDBACK,
        // function(t) {
        //     e.nextDarWard(t)
        // }),
        // this.sendRefreshMail(),
        GlobalManager.getInstance().addReconnectListener();
        // this.preLoad();
    }

    public preLoad() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/SideProp.exml");
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/FrozenAndLock.exml");
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/UnlockGunGroup.exml");
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Gun.exml");
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/WarGroup.exml");
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/ChakanPanel.exml");
    }

    // public sendRefreshMail() {
    //     var e = new CommonRequestMessage;
    //     e.initData(),
    //     e.setType(CommonRequest.EMAIL),
    //     NetManager.send(e)
    // },
    // public refreshMail(e) {
    //     var t = Director.getModelByKey(EmailModel);
    //     t.clearEmail();
    //     for (var i = e.getMailListByType(), n = 0; n < i.length; n++) for (var a = i[n].getMails(), o = 0; o < a.length; o++) {
    //         var r = a[o],
    //         s = new game.model.EmailItem(r.getMailId(), r.getMailType(), r.getUserId(), r.getReceiveUserName(), r.getSendUserId(), r.getSendUserName(), r.getItems(), r.getTime(), r.getState(), r.getMailContent(), r.getMailTitle());
    //         t.addItem(s)
    //     }
    //     this.checkMail(),
    //     this.getView().send(NotifyEnum.REFRESH_EMAIL, e),
    //     _Notification_.send(NotifyEnum.CHECK_MAIN_ALERT)
    // },
    // public checkMianViewPopLogic(e, t) {
    //     t.getView().checkMianLogic()
    // },
    // public nextDarWard(e) {
    //     var t = e.getResultState(),
    //     i = Director.getModelByKey(UserModel);
    //     i.setCiriState(t);
    //     var n = this.getView();
    //     0 == t ? GameUtil.popTips(Language.getText(113)) : 2 == t ? GameUtil.popTips(Language.getText(114)) : 3 == t && GameUtil.popTips(Language.getText(115)),
    //     n.checkCiri()
    // },
    // public getWanbaGiftback(e) {
    //     var t = e.getResult(),
    //     i = this.getView();
    //     0 != t ? i.showWanbaGift(t, e.getRewardList()) : i.checkMianLogic()
    // },
    // public checkMail() {
    //     for (var e = Director.getModelByKey(EmailModel), t = e.getMailListByType(3), i = 0; i < t.length; i++) {
    //         var n = t[i],
    //         a = new Array;
    //         a.push(n.getSendUserName() + ""),
    //         a.push(n.getSendUserId() + ""),
    //         a.push(n.getItems()[0].getCount() + "");
    //         var o = T_Item_Table.getVoByKey(Number(n.getItems()[0].getItemId()));
    //         a.push(Language.getText(o.name) + "");
    //         var r = Language.getDynamicText(46, a); !
    //         function(e, t) {
    //             GameUtil.openEmailChakan(null,
    //             function() {
    //                 var t = new ReceiveMailSendMessage;
    //                 t.initData(),
    //                 t.setMailId(e.getMailId()),
    //                 NetManager.send(t)
    //             },
    //             t, e.getItems(), e.getState())
    //         } (n, r)
    //     }
    // },
    // public receiMail(e) {
    //     var t = e,
    //     i = new game.model.EmailItem(t.getMailId(), t.getMailType(), t.getUserId(), t.getReceiveUserName(), t.getSendUserId(), t.getSendUserName(), t.getItems(), t.getTime(), t.getState(), t.getMailContent(), t.getMailTitle()),
    //     n = new Array;
    //     n.push(t.getSendUserName() + ""),
    //     n.push(t.getSendUserId() + ""),
    //     n.push(i.getItems()[0].getCount() + "");
    //     var a = T_Item_Table.getVoByKey(Number(i.getItems()[0].getItemId()));
    //     n.push(Language.getText(a.name) + "");
    //     var o = Language.getDynamicText(46, n); !
    //     function(e, t) {
    //         GameUtil.openEmailChakan(null,
    //         function() {
    //             var t = new ReceiveMailSendMessage;
    //             t.initData(),
    //             t.setMailId(e.getMailId()),
    //             NetManager.send(t)
    //         },
    //         t, e.getItems(), e.getState())
    //     } (i, o)
    // }

    public viewInit(e, med) {
        // var i = new ActiveConfigMessagesSendMessage;
        // i.initData(),
        // NetManager.send(i);
        var userModel: UserModel = Director.getModelByKey(UserModel);
        var hallView: FishMainView = med.getView();
        med.setMainState();
        med.setHeadIcon();
        var roomModel: RoomModel = Director.getModelByKey(RoomModel);

        MessageDispatcher.register(MsgActionDefine.RoomInfoRes,
            function (msg: RoomInfoRes) {
                if (1 == msg.getFlag()) {
                    userModel.setRoomId(msg.getRoomId());
                    // msg.setIp("fish.dwtv.tv"); /////////////// test ///////////
                    NetManager.resetNet(msg.getIp(), msg.getPort(),
                        function () {
                            roomModel.clearRoom();

                            var roomType = msg.getType();
                            var skinId = userModel.getCurSkinId();
                            userModel.setMatchRoomLevel(roomType);

                            var resGroupName = "asyn_fish_" + roomType + skinId;
                            var resLoadProgressFun = function (e) {
                                e.groupName == resGroupName && hallView.updateLoading(e.itemsLoaded, e.itemsTotal);// : hallView.updateLoading(e.itemsLoaded, e.itemsTotal)
                            };
                            var resLoadedFun = function (e) {
                                if (e.groupName == resGroupName) {
                                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, resLoadedFun, med);
                                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, resLoadProgressFun, med);

                                    var intoRoomMsg: IntoRoomReq = new IntoRoomReq();
                                    intoRoomMsg.initData();
                                    intoRoomMsg.setRoomId(msg.getRoomId());
                                    intoRoomMsg.setUserId(userModel.getUserId());
                                    intoRoomMsg.setAccount(CONFIG.ACCOUNT);
                                    intoRoomMsg.setIdentity(CONFIG.IDENDTITY);
                                    intoRoomMsg.setType(msg.getType());
                                    NetManager.send(intoRoomMsg, MsgActionDefine.IntoRoomReq);
                                }
                            };

                            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, resLoadedFun, med),
                                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, resLoadProgressFun, med),
                                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Loading.exml",
                                    function (skinClz) {
                                        hallView.addLoadingUI(skinClz);
                                        var keys: Array<string> = LoaderUtil.getFishResByType(roomType);
                                        keys.push("gunsicon_" + skinId + "_png");
                                        keys.push("fishing");
                                        RES.createGroup(resGroupName, keys);
                                        RES.loadGroup(resGroupName);
                                    }, med);
                        }
                    );
                } else {
                    console.log("进入房间失败:" + msg.getFlag());
                }
            });

        MessageDispatcher.register(MsgActionDefine.IntoRoomRes,
            function (e: IntoRoomRes) {
                // var userModel = Director.getModelByKey(UserModel);
                RoomMediator.rcvPlayerInfos(e);
                // var  n = e.getPlayerInfo();
                // for (var a = 0; a < n.length; a++) {
                //     let pi = n[a];
                // var r = i.getMatchRoomLevel();
                // if (r == RequesetRoomState.DjsRoom || r == RequesetRoomState.QmsRoom || GameUtil.isKss(r)) {
                //     var s = new game.model.DjsObj(n[a].grandPrixMessage);
                //     o.setDjsObj(s)
                // }
                // }
            });

        MessageDispatcher.register(MsgActionDefine.PondFishes,
            function (e) {
                MessageDispatcher.unregister(MsgActionDefine.PondFishes);
                var fishArr = e.getFishes();
                var len = fishArr.length;
                for (let i = 0; i < len; i++) {
                    if (!roomModel.isPathExist(fishArr[i].pathId)) {
                        var fish: Fish = new Fish();
                        fish.fishId = fishArr[i].fishId;
                        fish.pathId = fishArr[i].pathId;
                        fish.fishType = fishArr[i].type;
                        fish.uniqId = fishArr[i].uniId;
                        fish.coord = new egret.Point(fishArr[i].coordinate.xvalue, fishArr[i].coordinate.yvalue);
                        fish.aliveTime = Number(fishArr[i].aliveTime);
                        roomModel.addRoomLiveFish(fish);
                    }
                }
                UIUtil.startLoading();
                hallView.closeLoadingUI();
                var r: RoomView = new RoomView();
                var s = new RoomMediator(r);
                Director.repleaceView(s);
            });
        med._timer = new egret.Timer(1000, 0);
        med._timer.addEventListener(egret.TimerEvent.TIMER, med.timerFunc, med);
        med._timer.start();
    }
    /**快速加入游戏 */
    public quickGame(): void {
        var u: UserModel = Director.getModelByKey(UserModel);
        var gold: number = u.getCoins();
        // var o:Array<T_RoomType>=T_RoomType_Table.getAllVo();
        if (gold > 0 && gold < 10000)//新手场
        {
            _Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {
                type: RequesetRoomState.NewbieRoom,
                id: 0
            })
        } else if (gold >= 10000 && gold < 100000)//低倍场
        {
            _Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {
                type: RequesetRoomState.AutoLowRoom,
                id: 0
            });
        } else if (gold >= 100000)//高倍场
        {
            _Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {
                type: RequesetRoomState.AutoHighRoom,
                id: 0
            });
        } else {
            GameUtil.popTips(Language.getText(47));
        }
    }
    public timerFunc() {
        var e = this.getView(),
            t = Director.getModelByKey(UserModel);
        if (this._isInBankrupt) {
            var i = t.getBankruptTime(),
                n = TimeUtil.getCurrTime(),
                a = i - n;
            if (a > 0) {
                var o = TimeUtil.sceonds2MinStr(a);
                e.setBankruptTime(o);
                e.setBackrunptBtnAction(!1);
            } else
                e.setBankruptTime(Language.getText(32)),
                    e.setBackrunptBtnAction(!0)
        }
    }

    public setHeadIcon() {
        var e = this,
            t: UserModel = Director.getModelByKey(UserModel),
            i = "";
        i = CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG ? t.getHeadUrl().replace("yiwantang/", "") : t.getHeadUrl();
        IconUtil.getHeadIcon(i,
            function (t) {
                e.getView().setHeadIcon(t);
            })
    }

    /** 进入房间 */
    public checkAndSendIntoRoom(jsonParam, med) {
        var userModel: UserModel = Director.getModelByKey(UserModel);
        // if (userModel.getCoins() <= 0) {
        //     GameUtil.openConfirm(null, null, t, Language.getText(2));
        //     return;
        // }
        var msg: RoomInfoReq = new RoomInfoReq();
        msg.initData();
        var roomType = 0;
        if (null == jsonParam) {
            msg.setUserId(userModel.getUserId());
            msg.setType(RequesetRoomState.QuickGame);
            NetManager.send(msg, MsgActionDefine.RoomInfoReq);
        } else {
            roomType = jsonParam.type;
            if (jsonParam.type == RequesetRoomState.NewbieRoom) {
                var lev = userModel.getLevel();
                var gun: T_Gun = T_Gun_Table.getVoByKey(userModel.getCurGunID());
                var maxLev = T_Config_Table.getVoByKey(37);
                var maxBulletNum = T_Config_Table.getVoByKey(38);
                // if (lev > Number(maxLev.value)) {
                //     GameUtil.popTips(Language.getDynamicText(81, [maxLev.value]));
                //     return;
                // }
                // if (gun.bulletNum >= Number(maxBulletNum.value)) {
                //     GameUtil.popTips(Language.getDynamicText(80, [maxBulletNum.value]));
                //     return;
                // }
            }
            var vb = GameUtil.verifyRoomCoins(roomType, userModel.getCoins());
            if (!vb) {
                var r = GameUtil.getNeedCoinsByRoomType(roomType);
                GameUtil.openConfirm(null, null, med, Language.getDynamicText(57, [String(r)])); //金币需要大于{0}才可进入！
                return;
            }
            // var s = GameUtil.getNeedGunByRoomType(roomType, userModel.getCurGunID());
            // if ( - 1 != s) {
            //     var l = T_Gun_Table.getVoByKey(s);
            //     GameUtil.openConfirm(null, null, t, Language.getDynamicText(77, [String(l.bulletNum)])); //炮倍需要大于{0}才可进入！
            //     return;
            // }

            userModel.setMatchRoomLevel(Number(jsonParam.type));

            var roomId = jsonParam.id;
            msg.setUserId(userModel.getUserId());
            msg.setType(roomType);
            msg.setRoomId(roomId);
            NetManager.send(msg, MsgActionDefine.RoomInfoReq);
        }
    }

    // public refreshRoomOnline(e, t) {
    //     var i = t.getView();
    //     i.setRoomOnLineUI()
    // },
    // public checkMainAlert(e, t) {
    //     for (var i = !1,
    //     n = t.getModel(EmailModel), a = n.getMailList(), o = a.length, r = 0; o > r; r++) {
    //         var s = a[r].getState();
    //         if (0 == s) {
    //             i = !0;
    //             break
    //         }
    //     }
    //     var l = t.getModel(TaskModel),
    //     u = l.showAlert(),
    //     d = t.getView(),
    //     h = t.getModel(UserModel),
    //     c = h.getSignObj(),
    //     p = !1,
    //     g = t.getModel(UserModel),
    //     _ = g.getMonthEndTime() - TimeUtil.getCurrTime();
    //     p = 0 > _ && !g.bOpenedMonthUI ? !0 : !1,
    //     d.checkAlert(i, u, !c.IsTodaySign(), p)
    // }

    public updateMainState(e, t) {
        t.setMainState();
    }
    public setMainState() {
        var e: FishMainView = this.getView(),
            userModel = this.getModel(UserModel),
            i = userModel.getExp(),
            n = T_RoleLevel_Table.getVoByKey(userModel.getLevel());
        var a = n.levelUpExp;
        e.setMainStateInfo(String(userModel.getCoins()), String(userModel.getMoney()), String(userModel.getTicket()), String(userModel.getLevel()), String(userModel.getExp()), i, a, userModel.getUserName());
        var o = userModel.getBankruptTime();
        if (o > 0 && userModel.getCoins() > 0) {
            var r: Bankrupt = new Bankrupt();
            r.initData(),
                r.setState(BankruptStauts.STATE_RESUME);
            NetManager.send(r, MsgActionDefine.Bankrupt);
            userModel.setBankruptTime(0);
            o = 0;
        }
        if (0 == o) {
            (e.setBankruptVisble(!1), this._isInBankrupt = !1);
        } else {
            (e.setBankruptVisble(!0), this._isInBankrupt = !0);
        }
    }

    /**打开选择房间 */
    public openSelcetRoom(e, t) {
        var i = t.getModel(UserModel),
        n = GameUtil.verifyRoomCoins(RequesetRoomState.SelectRoom, i.getCoins());
        if (n) {
            var a = GameUtil.verifyRoomCoins(RequesetRoomState.SelectRoom, i.getCoins());
            // 房间需要的金币数，在配置里找
            if (!a) {
                var o = GameUtil.getNeedCoinsByRoomType(RequesetRoomState.SelectRoom);
                return void GameUtil.openConfirm(null, null, t, Language.getDynamicText(57, [String(o)]))
            }
            var r = GameUtil.getNeedGunByRoomType(RequesetRoomState.SelectRoom, i.getCurGunID());
            if ( - 1 != r) {
                var s = T_Gun_Table.getVoByKey(r);
                return void GameUtil.openConfirm(null, null, t, Language.getDynamicText(77, [String(s.bulletNum)]))
            }
            t.getView().onSelectButtonClick()
        } else {
            var r = GameUtil.getNeedGunByRoomType(RequesetRoomState.SelectRoom, i.getCurGunID());
            if ( - 1 != r) {
                var s = T_Gun_Table.getVoByKey(r);
                return void GameUtil.openConfirm(null, null, t, Language.getDynamicText(77, [String(s.bulletNum)]))
            }
            var o = GameUtil.getNeedCoinsByRoomType(RequesetRoomState.SelectRoom);
            GameUtil.openConfirm(null, null, t, Language.getDynamicText(57, [String(o)]))
        }
    }

    public clickMainFunItem(e, t) {
        var view: FishMainView = t.getView();
        var scrollView: PageView = view.getScrollView();
        var dataList = scrollView.getVos();
        var a = null;
        for (var o = 0; o < dataList.length; o++) {
            var s = dataList[o];
            1 == s.getSelected() && (a = s);
        }
        if (e) {
            var l = a.id;
            e > l && e - l == 1 ? scrollView.prevPosition() : l > e && l - e == 1 ? scrollView.nextPosition() : e > l && e - l > 1 ? scrollView.nextPosition() : l > e && l - e > 1 && scrollView.prevPosition()
        }
    }

    /** 点击主界面按钮 */
    public clickMainBtn(e, t) {
        var userModel: UserModel = Director.getModelByKey(UserModel);
        if ("bagBtn" == e) {//背包
            var i = new BagView();
            var n = new BagMediator(i);
            Director.pushView(n);
        } else if ("makeBtn" == e) {//锻造
            var gunId = userModel.getCurGunID(),
            r = T_Gun_Table.getVoByKey(gunId);
            if (r) {
                // 达到锻造倍率
                var l = r.upgradeOrForgeCost.split(",")
                if (l.length > 1) {
                    var u = new ForgeView;
                    var d = new ForgeMediator(u);
                    Director.pushView(d)
                }
            }
            54 == gunId ? GameUtil.popTips("已经是最高炮倍") : GameUtil.popTips(Language.getText(28))
        } else if ("emailBtn" == e) {//邮件
            var _email = new EmailView(),
            y = new EmailMediator(_email);
            Director.pushView(y)
        } else if ("bankruptBtn" == e) { // 救济金
            var bankruptTime = userModel.getBankruptTime();
            if (bankruptTime > 0) {
                var c = TimeUtil.getCurrTime();
                var p = bankruptTime - c;
                if (p > 0)
                    // 时间未到
                    GameUtil.openConfirm(null, null, t, Language.getText(33));
                else {
                    // 发送救济金领取消息
                    var g: Bankrupt = new Bankrupt();// BankruptMessage;
                    g.initData();
                    g.setState(7);
                    NetManager.send(g, MsgActionDefine.Bankrupt);
                }
            } else
                // 豆过多，不用领取
                GameUtil.openConfirm(null, null, t, Language.getText(34));
        } else if ("exchangeBtn" == e) { // 兑换
            // var m = new ExchangeView(!1),
            // f = new ExchangeMediator(m);
            // Director.pushView(f)
        } else if ("roleAvaGroup" == e) { //用户信息
            // var v = new UserInfoView,
            // T = new UserInfoMediator(v);
            // Director.pushView(T)
        } else if ("taskBtn" == e) { // 任务按钮
            // var E = new TaskView,
            // I = new TaskMediator(E);
            // Director.pushView(I)
        } else if ("shopBtn" == e) {//商店
            var b = new ItemShopView();
            var C = new ItemShopMediator(b);
            Director.pushView(C);
        } else if ("settingBtn" == e) {//设置
            var x = new SettingView(),
                w = new SettingMediator(x);
            Director.pushView(w)
        } else if ("vipBtn" == e) {
            var R = new VipView,
                A = new VipMediator(R);
            Director.pushView(A)
        } else if ("signinBtn" == e) {
            // var L = new SignView,
            // M = new SignMediator(L);
            // Director.pushView(M);


            var R = new VipView,
                A = new VipMediator(R);
            Director.pushView(A)
        } else if ("activityBtn" == e) {
            //     var S = Director.getModelByKey(ActiveModel);
            //     if (S.getActiveList().length > 0) {
            //         var P = new ActiveView,
            //         B = new ActiveMediator(P);
            //         Director.pushView(B)
            //     } else GameUtil.popTips(Language.getText(190))
            // } else if ("vipLotteryBtn" == e) {
            //     var N = Director.getModelByKey(UserModel);
            //     if (N.getTatolChargeRMB() > 0) {
            //         var G = new ChargeView(ChargeType.Ticket),
            //         O = new ChargeMediator(G);
            //         Director.pushView(O)
            //     } else {
            //         var U = new FirstChargeView,
            //         D = new FirstChargeMediator(U);
            //         Director.pushView(D)
            //     }
        } else if ("rankBtn" == e) {//排行
            var F = new RankView(),
                k = new RankMediator(F);
            Director.pushView(k);
        } else if ("monthBtn" == e) {
            var H = new MonthCardView,
                V = new MonthCardMediator(H);
            Director.pushView(V);
            // t.getView().setMonthAlert(!1)
        } else if ("charge_gold" == e) {
            var G = new ChargeView(ChargeType.Gold),
                O = new ChargeMediator(G);
            Director.pushView(O)
            CommonLib.ExternalJS.jumpExchange();
        } else if ("charge_gem" == e) {
            CommonLib.ExternalJS.jumpRecharge();
            // var G = new ChargeView(ChargeType.Gem),
            // O = new ChargeMediator(G);
            // Director.pushView(O)
            //     } else if ("charge_ticket" == e) {
            //         var G = new ChargeView(ChargeType.Ticket),
            //         O = new ChargeMediator(G);
            //         Director.pushView(O)
            //     } else if ("yaoqingBtn" == e) {
            //         var X = new ShareZiYou(ShareType.NORMAL, "");
            //         t.getView().addChild(X)
            // } else if ("guanzhuBtn" == e) {
            //     (CONFIG.PLATFORM_ID == PlatformTypeEnum.ZI_YOU && openQrCode(), (CONFIG.PLATFORM_ID == PlatformTypeEnum.COMBUNET || CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) && openCombunetQrCode(Number(CONFIG.SUB_PLATFORM_ID)))
            //  } else if ("aquariumBtn" == e) {
            //      GameUtil.popTips(Language.getText(47));
        } else if ("charge_btn" == e) {
            var G = new ChargeView(ChargeType.Gold),
                O = new ChargeMediator(G);
            Director.pushView(O)
            // CommonLib.ExternalJS.jumpExchange();
            // CommonLib.ExternalJS.jumpRecharge();

        } else if ("firstCharge" == e) {
            var U = new FirstChargeView;
            var D = new FirstChargeMediator(U);
            Director.pushView(D)
        }
        else if ("change_btn" == e) {
            // CommonLib.ExternalJS.jumpEntityExchange();

        } else if ("mainItemJjc" == e) {
            let jjcv = new JjcView();
            let jjcm = new JjcMediator(jjcv);
            Director.pushView(jjcm);
        } else if ("mainItemJbc" == e) {
            let jbcv = new JbcView();
            let jbcm = new JbcMediator(jbcv);
            Director.pushView(jbcm);
        } else if ("mainItemSwc" == e) {
            let swcv = new SwcView();
            let swcm = new SwcMediator(swcv);
            Director.pushView(swcm);
        } else if ("gonggaoBtn" == e)//公告
        {
            var notice = new NoticeView();
            var nm = new NoticeMediator(notice);
            Director.pushView(nm)
        }
    }

    public updateUICoins(e, t) {
        var i = t.getView(),
            n = Director.getModelByKey(UserModel);
        i.updateCoins(n.getCoins() + "")
    }

    // public reqQQZoneGift(e, t) {
    //     var i = Number(window.FISHING_CONFIG.giftId);
    //     if (i > 0) {
    //         var n = new GetWanbaGiftMessage;
    //         n.initData(),
    //         n.setGiftId(i),
    //         NetManager.send(n)
    //     } else t.getView().checkMianLogic()
    // },

    /** 收到用户破产(救济金)状态消息 */
    public bankruptBack(e, t) {
        var i = e.status;
        if (i == BankruptStauts.GET_SUCC) {
            // 成功领取救济金
            var n = e.coins,
                a = e.userId;
            GameUtil.flyCoins(n, 3, new egret.Point(1200, 400), new egret.Point(300, 55), null, a);
            var o = t.getView();
            o.setBankruptVisble(false)
        }else {
            if(i == BankruptStauts.GET_LIMIT){
                // 达到上限
                GameUtil.openConfirm(null, null, t, Language.getText(35));
            }else if (i == BankruptStauts.NOT_TO_TIME){
                // 时间未到
                GameUtil.openConfirm(null, null, t, Language.getText(33));
            }
        }
        t.getView().setBackrunptBtnAction(false)
    }

    // public showActiveAlert(e, t) {
    //     var i = Director.getModelByKey(ActiveModel),
    //     n = Director.getModelByKey(UserModel),
    //     a = t.getView();
    //     return i.getActiveList().length > 0 && !n.bOpenedActiveUI ? void a.setActiveAlert(!0) : void a.setActiveAlert(!1)
    // }

    public clickIntoRoom(jsonParam, med:FishMainMediator) {
        med.checkAndSendIntoRoom(jsonParam, this);
    }

    public destroy() {
        // this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.unsubscribByType(NotifyEnum.RES_LOAD_OVER);
        this.unsubscribByType(NotifyEnum.MAIN_UI_INIT),
            this.unsubscribByType(NotifyEnum.OPEN_SELECT_ROOM),
            this.unsubscribByType(NotifyEnum.CLICK_MAIN_FUN_ITEM);
        this.unsubscribByType(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM);
        this.unsubscribByType(NotifyEnum.ACTIVE_CONFIG_DATA_LOAEDED);
        this.unsubscribByType(NotifyEnum.CLICK_MAIN_BTN),
            this.unsubscribByType(NotifyEnum.BANKRUPT_MESSAGE),
            this.unsubscribByType(NotifyEnum.UPDATE_ROOM_UI_COINS),
            this.unsubscribByType(NotifyEnum.REQ_QQZONE_GIFT);
        this.unsubscribByType(NotifyEnum.CLOSE_QQZONE_GIFT);
        this.unsubscribByType(NotifyEnum.CHECK_MAIN_ALERT);
        this.unsubscribByType(NotifyEnum.CHECK_POP),
            this.unsubscribByType(NotifyEnum.REFRES_ROOM_ONLINE);
        this.getView().destroy();
        MessageDispatcher.unregister(MsgActionDefine.PondFishes);
        MessageDispatcher.unregister(MsgActionDefine.IntoRoomRes);
        MessageDispatcher.unregister(MsgActionDefine.RoomInfoRes);
        // MessageDispatcher.unregister(ResponseType.NEXTDAYAWARDBACK),
        RES.destroyRes("mainUI", !1);
    }
}