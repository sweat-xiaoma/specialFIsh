class LoginMediator extends SimpleMediator {
	public constructor(view) {
		super(view);
	}

	public onAdded () {
        super.onAdded.call(this);
        this.getView().initView();
        // game.util.LoaderUtil.startLoginSilentLoad()
    };

	public init() {
        // this.getModel(RoomModel);
        var e = this;
        // GlobalManager.getInstance();
        // this.subscrib(NotifyEnum.OPEN_NOTICE_UI, this.openNoticeUI);
        // this.subscrib(NotifyEnum.UPDATE_LOGIN_BTN, this.updateLoginBtn);

        MessageDispatcher.register(MsgActionDefine.LoginRes,
            function(msg:LoginRes) {
                GlobalManager.getInstance().bIsNeedDelayLogin = !1;
                GlobalManager.getInstance().initUserData(msg);
                // var i = Director.getModelByKey(UserModel),
                var isNew = false;
                // i.getGuideID() <= 0 && (n = !0),
                // CONFIG.openGuide || (n = !1),
                e.getView().enterMainView(isNew);
                ProtobufUtil.getInstance().initCacheProto();
            });
        // MessageDispatcher.register(ResponseType.REQUESTROOMBACK,
        // function(t) {
        //     if (1 == t.getFlag()) NetManager.resetNet(t.getIp(), t.getPort(),
        //     function() {
        //         var i = burn.Director.getModelByKey(UserModel),
        //         n = e.getView(),
        //         a = t.getType(),
        //         o = i.getCurSkinId();
        //         i.setMatchRoomLevel(a);
        //         var r = function() {
        //             l()
        //         },
        //         s = function(e) {
        //             n.updateResProgress(e.itemsLoaded, e.itemsTotal)
        //         },
        //         l = function() {
        //             RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, r, e),
        //             RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, s, e);
        //             var n = new IntoRoomSendMessage;
        //             n.initData(),
        //             n.setId(t.getRoomId()),
        //             n.setUid(i.getUserId()),
        //             NetManager.send(n)
        //         };
        //         RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, r, e),
        //         RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, s, e);
        //         var u = game.util.LoaderUtil.getFishResByType(a);
        //         u.push("gunsicon_" + o + "_png"),
        //         u.push("fishing"),
        //         RES.createGroup("asyn_fish_" + a + o, u),
        //         RES.loadGroup("asyn_fish_" + a + o)
        //     });
        //     else {
        //         game.util.GameUtil.popTips("进入房间失败:" + t.getFlag());
        //         var i = e.getView();
        //         i._loginBtn.visible = !0
        //     }
        // }),
        // game.net.MessageDispatcher.register(game.net.ResponseType.INTOROOMBACK,
        // function(e) {
        //     for (var t = burn.Director.getModelByKey(RoomModel), i = e.getPlayerInfo(), n = 0; n < i.length; n++) {
        //         var a = new game.model.Roomer(parseInt(i[n].playerId), parseInt(i[n].position), i[n].name, parseInt(i[n].gunId), parseInt(i[n].coins), parseInt(i[n].gems), i[n].items, i[n].lockRelation, i[n].vipLevel, i[n].batterySkinId, i[n].gunrestSkinId, i[n].roleLevel);
        //         t.addRoomer(a)
        //     }
        //     var o = burn.Director.getModelByKey(UserModel);
        //     if (o.isTodayFirstLogin()) {
        //         var r = (new Date).getTime() - game.util.LogUtil.timestamp,
        //         s = {
        //             duration: r
        //         };
        //         game.util.LogUtil.sendLogicalLog(game.util.LogEnum.INTO_ROOM_LOADING_TIME, s)
        //     }
        // }),
        // game.net.MessageDispatcher.register(game.net.ResponseType.PONDFISHES,
        // function(e) {
        //     for (var t = burn.Director.getModelByKey(RoomModel), i = e.getFishes(), n = 0; n < i.length; n++) if (!t.isPathExist(i[n].pathId)) {
        //         var a = new game.model.Fish;
        //         a.fishId = i[n].fishId,
        //         a.pathId = i[n].pathId,
        //         a.fishType = i[n].type,
        //         a.uniqId = i[n].uniId,
        //         a.coord = new egret.Point(i[n].coordinate.xvalue, i[n].coordinate.yvalue),
        //         a.aliveTime = Number(i[n].aliveTime),
        //         t.addRoomLiveFish(a)
        //     }
        //     game.util.UIUtil.startLoading();
        //     var o = new RoomView,
        //     r = new RoomMediator(o);
        //     burn.Director.repleaceView(r)
        // })
    }

    // public openNoticeUI(e, t) {
    //     var i = new NoticeView,
    //     n = new NoticeMeditor(i);
    //     burn.Director.pushView(n)
    // }

    // public updateLoginBtn(e, t) {
    //     var i = t.getView();
    //     i.updateLoginBtnState(e)
    // }

    public destroy() {
        this.getView().destroy();
        MessageDispatcher.unregister(MsgActionDefine.LoginRes);
        // MessageDispatcher.unregister(ResponseType.REQUESTROOMBACK),
        // MessageDispatcher.unregister(ResponseType.PONDFISHES),
        // MessageDispatcher.unregister(ResponseType.INTOROOMBACK),
        // this.unsubscribByType(NotifyEnum.OPEN_NOTICE_UI),
        // this.unsubscribByType(NotifyEnum.UPDATE_LOGIN_BTN),
        // RES.destroyRes("login_serverBg_png", !1),
        // RES.destroyRes("login_startBtn_png", !1)
    }
}