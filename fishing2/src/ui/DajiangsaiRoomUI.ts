class DajiangsaiRoomUI extends RoomUI {

    private _bgLayer:any;
    private _floorLayer:any;
    private _objectLayer:any;
    private _bulletLayer:any;
    private _tipsLayer:any;
    private _roomModel;
    private _userModel;

    // private guideTaskGroup;
    // private djsEffectGroup;
    // private getCoinsBtn;
    // private lotteryBtn;

//    private exchangeBtn;
//     private unlockBtn;
//     private unlockGunGroup;
//     private exchangeGroup;
//     private lotteryGroup;
//     private effect_Gold;
//    // private effect_Arena;
//     private DjsGroup;
//     private rankScoreLab;
//     private DjsScoreArr;


//             private DjsScore_0;
//              private DjsScore_1;
//               private DjsScore_2;
//                  private DjsScore_3;
//     private DjsScoreLabArr;
//       private DjsScoreLab_0;
//         private DjsScoreLab_1;
//       private DjsScoreLab_2;  
//       private DjsScoreLab_3;  

//       private gainArr;
//       private gain_0;
//        private gain_1;
//         private gain_2;
//          private gainLabArr;

//          private gainNumLab_0;
//          private gainNumLab_1;
//          private gainNumLab_2;
         private bulletNumLab;

	public constructor(t) {
		super(t);//GameFishing.exml
        this._roomModel = Director.getModelByKey(RoomModel),
        this._userModel = Director.getModelByKey(UserModel);
        this.setDjsUI();
	}

	public setDjsUI() {

        // this.guideTaskGroup.visible = !1,
        // this.djsEffectGroup.removeChildren();
        // var t = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
        // TweenTools.rotation(t, 1e4),
        // t.anchorOffsetX = t.width / 2;
        // t.anchorOffsetY = t.height / 2;
        // this.djsEffectGroup.addChild(t),
        // this.getCoinsBtn.visible = !0;
        // this.exchangeBtn.visible = !0,
        // this.lotteryBtn.visible = !1,
        // this.unlockBtn.visible = !1,
        // this.unlockGunGroup.visible = !1,
        // this.lotteryGroup.visible = !1,
        // this.exchangeGroup.visible = !1,
        // this.effect_Gold.visible = !1,
        // this.effect_Arena.visible = !1,
        // this.DjsGroup.visible = !0;
        // var i = Director.getModelByKey(UserModel),
        // n = Director.getModelByKey(RoomModel);
        // a = n.getRoomerById(i.getUserId());
        // o = a.getDjsObj();
        // o ? (this.rankScoreLab.text = o.grandPrixIntegral + "", this.bulletNumLab.text = o.grandPrixBulletNum + "") : (this.rankScoreLab.text = "0", this.bulletNumLab.text = "0"),
        // this.DjsScoreArr = new Array,
        // this.DjsScoreArr.push(this.DjsScore_0),
        // this.DjsScoreArr.push(this.DjsScore_1),
        // this.DjsScoreArr.push(this.DjsScore_2),
        // this.DjsScoreArr.push(this.DjsScore_3),
        // this.DjsScoreLabArr = new Array,
        // this.DjsScoreLab_0.text = "0",
        // this.DjsScoreLab_1.text = "0",
        // this.DjsScoreLab_2.text = "0",
        // this.DjsScoreLab_3.text = "0",
        // this.DjsScoreLabArr.push(this.DjsScoreLab_0),
        // this.DjsScoreLabArr.push(this.DjsScoreLab_1),
        // this.DjsScoreLabArr.push(this.DjsScoreLab_2),
        // this.DjsScoreLabArr.push(this.DjsScoreLab_3);
        // this.gainArr = new Array,
        // this.gainArr.push(this.gain_0),
        // this.gainArr.push(this.gain_1),
        // this.gainArr.push(this.gain_2),
        // this.gainLabArr = new Array,
        // this.gainLabArr.push(this.gainNumLab_0),
        // this.gainLabArr.push(this.gainNumLab_1),
        // this.gainLabArr.push(this.gainNumLab_2);
        // var r = RoomUtil.getPosByFlip(a.getRoomPos(), e);
        // this.DjsScoreArr[r].visible = !1;
        // for (var s = 0; 4 > s; s++) {
        //     var l = n.getRoomerByPos(s);
        //     l || (this.DjsScoreArr[s].visible = !1)
        // }
        // this.DjsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openArenaSignView, this),
        // this.btnWrapList.push(new burn.tools.UIWrap(this.DjsBtn)),
        // this.DjsTaskGroup.visible = !1;
        // var u = i.getCurGunID(),
        // d = game.table.T_Gun_Table.getVoByKey(u);
        // d.bulletNum < 3e3 && (this.addRateBtn_0.visible = !1, this.reduceRateBtn_0.visible = !1, this.addRateBtn_1.visible = !1, this.reduceRateBtn_1.visible = !1),
        // this.warGroupPos.visible = !1,
        // this.openWarHeadBtn.visible = !1
    }
    // private setDjsScoreVisableByPos (e, t) {
    //     this.DjsScoreArr && (this.DjsScoreArr[e].visible = t)
    // }
    // private setDjsScoreByPos (e, t) {
    //     this.DjsScoreLabArr[e].text = t + ""
    // }
    // private setDjsTask (e) {
    //     var t = this,
    //     i = this,
    //     n = Director.getModelByKey(TaskModel),
    //     a = Director.getModelByKey(UserModel),
    //     o = n.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX),
    //     r = table.T_Config_Table.getVoByKey(69).value,
    //     s = 0;
    //     a.getMatchRoomLevel() == RequesetRoomState.DjsRoom ? s = 0 : a.getMatchRoomLevel() == RequesetRoomState.QmsRoom && (s = 1);
    //     var l = r.split(",")[s].split("_")[e];
    //     this.scoreGainLab.text = "积分+" + l,
    //     0 == o.length ? this.DjsTaskGroup.visible = !1 : this.DjsTaskGroup.visible = !0,
    //     this._timer && (this._timer.stop(), this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this), this._timer = null),
    //     this._timer = new egret.Timer(1e3, 0),
    //     this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this),
    //     this._timer.start(),
    //     this.gain_0.removeChildren(),
    //     this.gain_1.removeChildren(),
    //     this.gain_2.removeChildren(),
    //     this.gainNumLab_0.text = "",
    //     this.gainNumLab_1.text = "",
    //     this.gainNumLab_2.text = "";
    //     for (var u = o.length,
    //     d = 0,
    //     h = 0; u > h; h++) {
    //         var c = o[h];
    //         if (! (h >= i.gainLabArr.length)) {
    //             var p = game.table.T_FishTaskItem_Table.getVoByKey(c.getTaskID());
    //             if (p) {
    //                 i.gainLabArr[h].text = c.getValue() + "/" + p.parameter2,
    //                 c.getValue() >= p.parameter2 && d++;
    //                 var g = game.table.T_Fish_Table.getVoByKey(p.parameter1);
    //                 g && !
    //                 function(e, t, i) {
    //                     var n = "fishkind_" + e.fishkindIcon + "_png";
    //                     RES.getResAsync(n,
    //                     function() {
    //                         var e = RES.getRes(n),
    //                         t = new egret.Bitmap(e);
    //                         t.scaleX = .7,
    //                         t.scaleY = .7,
    //                         t.anchorOffsetX = t.width / 2,
    //                         t.anchorOffsetY = t.height / 2,
    //                         i.addChild(t)
    //                     },
    //                     this)
    //                 } (g, h, i.gainArr[h])
    //             }
    //         }
    //     }
    //     if (d == u) {
    //         this.scoreTipsAdd.visible = !0,
    //         this.scoreTips.text = l;
    //         var _ = egret.Tween.get(this.scoreTipsAdd);
    //         _.to({
    //             alpha: 0
    //         },
    //         500).to({
    //             alpha: 1
    //         },
    //         500).to({
    //             alpha: 0
    //         },
    //         500).to({
    //             alpha: 1
    //         },
    //         500).to({
    //             alpha: 0
    //         },
    //         500).to({
    //             alpha: 1
    //         },
    //         500).to({
    //             alpha: 0
    //         },
    //         500).to({
    //             alpha: 1
    //         },
    //         500).call(function() {
    //             egret.Tween.removeTweens(t.scoreTipsAdd),
    //             t.scoreTipsAdd.visible = !1,
    //             t.rankScoreLab.text = Number(t.rankScoreLab.text) + Number(l) + ""
    //         });
    //         var y = egret.Tween.get(this.DjsTaskGroup, {
    //             loop: !1
    //         });
    //         y.to({
    //             alpha: 0
    //         },
    //         500).to({
    //             alpha: 1
    //         },
    //         500).to({
    //             alpha: 0
    //         },
    //         500).to({
    //             alpha: 1
    //         },
    //         500).to({
    //             alpha: 0
    //         },
    //         500).to({
    //             alpha: 1
    //         },
    //         500).to({
    //             alpha: 0
    //         },
    //         500).to({
    //             alpha: 1
    //         },
    //         500).call(function() {
    //             egret.Tween.removeTweens(t.DjsTaskGroup),
    //             t.clearTask()
    //         })
    //     }
    // }
    // private timerFunc () {
    //     var e = Director.getModelByKey(TaskModel),
    //     t = e.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX);
    //     if (0 != t.length) {
    //         var i = (t.length, t[0].getComTime()),
    //         n = i - game.util.TimeUtil.getCurrTime();
    //         if (0 >= n) return burn._Notification_.send(NotifyEnum.PRICE_CHALLENGE_FAIL),
    //         void this.clearTask();
    //         var a = game.util.TimeUtil.sceonds2MinStr(n);
    //         this.taskTimeLab.text = a
    //     }
    // }
    // t.prototype.clearTask = function() {
    //     for (var e = burn.Director.getModelByKey(TaskModel), t = e.getTaskListByType(TaskType.TASK_TYPE_GRAND_PRIX), i = t.length, n = 0; i > n; n++) e.removeItem(t[n].getTaskID());
    //     this.DjsTaskGroup.visible = !1,
    //     this._timer && (this._timer.stop(), this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this), this._timer = null)
    // },
    // t.prototype.updateDjdBulletNum = function(e) {
    //     this.bulletNumLab.text = e + ""
    // },
    // t.prototype.updateDjsScore = function(e) {
    //     this.rankScoreLab.text = e + ""
    // },
    // t.prototype.openArenaSignView = function() {
    //     if (!this._bOpenSignView) {
    //         this._bOpenSignView = !0;
    //         var e = burn.Director.getModelByKey(UserModel);
    //         if (e.getMatchRoomLevel() == RequesetRoomState.DjsRoom) {
    //             var t = new DjsView,
    //             i = new DjsMediator(t);
    //             burn.Director.pushView(i)
    //         } else if (e.getMatchRoomLevel() == RequesetRoomState.QmsRoom) {
    //             var n = new QmsView,
    //             a = new QmsMediator(n);
    //             burn.Director.pushView(a)
    //         }
    //     }
    // },
    // t.prototype.setQmsUI = function(e) {
    //     this.guideTaskGroup.visible = !1,
    //     this.djsEffectGroup.removeChildren();
    //     var t = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
    //     burn.tools.TweenTools.rotation(t, 1e4),
    //     t.anchorOffsetX = t.width / 2,
    //     t.anchorOffsetY = t.height / 2,
    //     this.djsEffectGroup.addChild(t),
    //     this.getCoinsBtn.visible = !0,
    //     this.exchangeBtn.visible = !0,
    //     this.lotteryBtn.visible = !1,
    //     this.unlockBtn.visible = !1,
    //     this.unlockGunGroup.visible = !1,
    //     this.lotteryGroup.visible = !1,
    //     this.exchangeGroup.visible = !1,
    //     this.effect_Gold.visible = !1,
    //     this.effect_Arena.visible = !1,
    //     this.DjsGroup.visible = !0;
    //     var i = burn.Director.getModelByKey(UserModel),
    //     n = burn.Director.getModelByKey(RoomModel),
    //     a = n.getRoomerById(i.getUserId()),
    //     o = a.getDjsObj();
    //     o ? (this.rankScoreLab.text = o.grandPrixIntegral + "", this.bulletNumLab.text = o.grandPrixBulletNum + "") : (this.rankScoreLab.text = "0", this.bulletNumLab.text = "0"),
    //     this.DjsScoreArr = new Array,
    //     this.DjsScoreArr.push(this.DjsScore_0),
    //     this.DjsScoreArr.push(this.DjsScore_1),
    //     this.DjsScoreArr.push(this.DjsScore_2),
    //     this.DjsScoreArr.push(this.DjsScore_3),
    //     this.DjsScoreLabArr = new Array,
    //     this.DjsScoreLab_0.text = "0",
    //     this.DjsScoreLab_1.text = "0",
    //     this.DjsScoreLab_2.text = "0",
    //     this.DjsScoreLab_3.text = "0",
    //     this.DjsScoreLabArr.push(this.DjsScoreLab_0),
    //     this.DjsScoreLabArr.push(this.DjsScoreLab_1),
    //     this.DjsScoreLabArr.push(this.DjsScoreLab_2),
    //     this.DjsScoreLabArr.push(this.DjsScoreLab_3),
    //     this.gainArr = new Array,
    //     this.gainArr.push(this.gain_0),
    //     this.gainArr.push(this.gain_1),
    //     this.gainArr.push(this.gain_2),
    //     this.gainLabArr = new Array,
    //     this.gainLabArr.push(this.gainNumLab_0),
    //     this.gainLabArr.push(this.gainNumLab_1),
    //     this.gainLabArr.push(this.gainNumLab_2);
    //     var r = RoomUtil.getPosByFlip(a.getRoomPos(), e);
    //     this.DjsScoreArr[r].visible = !1;
    //     for (var s = 0; 4 > s; s++) {
    //         var l = n.getRoomerByPos(s);
    //         l || (this.DjsScoreArr[s].visible = !1)
    //     }
    //     this.DjsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openArenaSignView, this),
    //     this.btnWrapList.push(new burn.tools.UIWrap(this.DjsBtn)),
    //     this.DjsTaskGroup.visible = !1,
    //     this.addRateBtn_0.visible = !1,
    //     this.reduceRateBtn_0.visible = !1,
    //     this.addRateBtn_1.visible = !1,
    //     this.reduceRateBtn_1.visible = !1,
    //     this.qmsGroup_0.visible = !0,
    //     this.addGoldBtn_0.visible = !1,
    //     this.addGemBtn_0.visible = !1,
    //     this.qmsGroup_1.visible = !0,
    //     this.addGoldBtn_1.visible = !1,
    //     this.addGemBtn_1.visible = !1,
    //     this.qmsGroup_2.visible = !0,
    //     this.addGoldBtn_2.visible = !1,
    //     this.addGemBtn_2.visible = !1,
    //     this.qmsGroup_3.visible = !0,
    //     this.addGoldBtn_3.visible = !1,
    //     this.addGemBtn_3.visible = !1,
    //     this.Djs.visible = !1,
    //     this.warGroupPos.visible = !1,
    //     this.openWarHeadBtn.visible = !1
    // },
    // t.prototype.setKssUI = function(e) {
    //     this.guideTaskGroup.visible = !1,
    //     this.getCoinsBtn.visible = !1,
    //     this.exchangeBtn.visible = !1,
    //     this.lotteryBtn.visible = !1,
    //     this.unlockBtn.visible = !1,
    //     this.unlockGunGroup.visible = !1,
    //     this.lotteryGroup.visible = !1,
    //     this.exchangeGroup.visible = !1,
    //     this.effect_Gold.visible = !1,
    //     this.effect_Arena.visible = !1,
    //     this.KssGroup.visible = !0,
    //     this.qmsGroup_0.visible = !0,
    //     this.addGoldBtn_0.visible = !1,
    //     this.addGemBtn_0.visible = !1,
    //     this.qmsGroup_1.visible = !0,
    //     this.addGoldBtn_1.visible = !1,
    //     this.addGemBtn_1.visible = !1,
    //     this.qmsGroup_2.visible = !0,
    //     this.addGoldBtn_2.visible = !1,
    //     this.addGemBtn_2.visible = !1,
    //     this.qmsGroup_3.visible = !0,
    //     this.addGoldBtn_3.visible = !1,
    //     this.addGemBtn_3.visible = !1,
    //     this._arrCur = new Array,
    //     this._arrCur.push(this.cur_0),
    //     this._arrCur.push(this.cur_1),
    //     this._arrCur.push(this.cur_2),
    //     this._arrCur.push(this.cur_3),
    //     this._arrSel = new Array,
    //     this._arrSel.push(this.sel_0),
    //     this._arrSel.push(this.sel_1),
    //     this._arrSel.push(this.sel_2),
    //     this._arrSel.push(this.sel_3),
    //     burn.tools.TweenTools.showOutAndIn(this.sel_0, 1500),
    //     burn.tools.TweenTools.showOutAndIn(this.sel_1, 1500),
    //     burn.tools.TweenTools.showOutAndIn(this.sel_2, 1500),
    //     burn.tools.TweenTools.showOutAndIn(this.sel_3, 1500),
    //     this._arrRank = new Array,
    //     this._arrRank.push(this.rank_0),
    //     this._arrRank.push(this.rank_1),
    //     this._arrRank.push(this.rank_2),
    //     this._arrRank.push(this.rank_3),
    //     this._arrScore = new Array,
    //     this._arrScore.push(this.kssScore_0),
    //     this._arrScore.push(this.kssScore_1),
    //     this._arrScore.push(this.kssScore_2),
    //     this._arrScore.push(this.kssScore_3),
    //     this.DjsScoreArr = new Array,
    //     this.DjsScoreArr.push(this.DjsScore_0),
    //     this.DjsScoreArr.push(this.DjsScore_1),
    //     this.DjsScoreArr.push(this.DjsScore_2),
    //     this.DjsScoreArr.push(this.DjsScore_3),
    //     this.DjsScoreLabArr = new Array,
    //     this.DjsScoreLab_0.text = "0",
    //     this.DjsScoreLab_1.text = "0",
    //     this.DjsScoreLab_2.text = "0",
    //     this.DjsScoreLab_3.text = "0",
    //     this.DjsScoreLabArr.push(this.DjsScoreLab_0),
    //     this.DjsScoreLabArr.push(this.DjsScoreLab_1),
    //     this.DjsScoreLabArr.push(this.DjsScoreLab_2),
    //     this.DjsScoreLabArr.push(this.DjsScoreLab_3);
    //     var t = burn.Director.getModelByKey(UserModel),
    //     i = burn.Director.getModelByKey(RoomModel),
    //     n = i.getRoomerById(t.getUserId()),
    //     a = RoomUtil.getPosByFlip(n.getRoomPos(), e);
    //     this.DjsScoreArr[a].visible = !1;
    //     for (var o = 0; 4 > o; o++) {
    //         var r = i.getRoomerByPos(o);
    //         r || (this.DjsScoreArr[o].visible = !1)
    //     }
    //     this.addRateBtn_0.visible = !1,
    //     this.reduceRateBtn_0.visible = !1,
    //     this.addRateBtn_1.visible = !1,
    //     this.reduceRateBtn_1.visible = !1;
    //     var s = new Array;
    //     s.push(this.img_0),
    //     s.push(this.img_1),
    //     s.push(this.img_2),
    //     s.push(this.img_3);
    //     for (var l = t.getMatchRoomLevel(), o = 0; o < s.length; o++) o + 7 == l ? s[o].visible = !0 : s[o].visible = !1;
    //     this.warGroupPos.visible = !1,
    //     this.openWarHeadBtn.visible = !1
    // },
    // t.prototype.startKssTime = function(e) {
    //     this._nKssEndTime = e,
    //     this._timer && (this._timer.stop(), this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFuncKss, this), this._timer = null),
    //     this._timer = new egret.Timer(1e3, 0),
    //     this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFuncKss, this),
    //     this._timer.start()
    // },
    // t.prototype.timerFuncKss = function() {
    //     var e = this._nKssEndTime,
    //     t = e - game.util.TimeUtil.getCurrTime();
    //     if (0 >= t) return void(this._timer && (this._timer.stop(), this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFuncKss, this), this._timer = null));
    //     var i = game.util.TimeUtil.sceonds2MinStr(t);
    //     this.timeLab.text = i
    // },
    // t.prototype.changeKssInfoList = function(e, t) {
    //     for (var i = 600,
    //     n = e.length,
    //     a = 0; n > a; a++) {
    //         var o = e[a];
    //         a == t ? this._arrSel[a].visible = !0 : this._arrSel[a].visible = !1,
    //         this._arrScore[a].text = o.getIntegral() + "";
    //         var r = 1 * o.getBulletNum() / i;
    //         this._arrCur[a].width = 140 * r
    //     }
    //     t >= 3 && (this._arrRank[3].text = t + 1 + "", this._arrSel[3].visible = !0),
    //     this.rankLab.text = t + 1 + "/8"
    // },
    // t.prototype.destory = function() {
    //     e.prototype.destory.call(this),
    //     this.DjsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openArenaSignView, this)
    // },

}