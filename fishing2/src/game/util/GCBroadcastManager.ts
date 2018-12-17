
class BroadcastObj{
     public type;
     public msg;
     public priority;
    constructor(){

    }
}
class GCBroadcastManager{
    static _hallBroadcastList;
    static _roomBroadcastList;
    static _playInterval;
    static _roomMsgIsInPlay;
    static _timer;

    static init = function() {
        GCBroadcastManager._hallBroadcastList = new Array,
        GCBroadcastManager._roomBroadcastList = new Array,
        GCBroadcastManager.initStatic();
        var i = T_Config_Table.getVoByKey(42);
        GCBroadcastManager._playInterval = 1e3 * Number(i.value)
    } 
    static initStatic = function() {
        GCBroadcastManager._roomMsgIsInPlay = !1
    }
    static addHallBroadcast = function(e) {
        GCBroadcastManager._hallBroadcastList = e,
        GCBroadcastManager.playHallBroadcast()
    }
    static addRoomBroadcast = function(e, n, a=0) {
        var o = new BroadcastObj;
        o.type = n,
        o.msg = e,
        a && (o.priority = a),
        GCBroadcastManager._roomBroadcastList.push(o),
        a && this.sortMsgByPriority(GCBroadcastManager._roomBroadcastList),
        GCBroadcastManager._roomBroadcastList.length > 20 && (GCBroadcastManager._roomBroadcastList.length = 20),
        GCBroadcastManager.playRoomBroadcast()
    }
    static sortMsgByPriority = function(e) {
        e.sort(function(e, t) {
            return e.priority - t.priority
        })
    }
    static playHallBroadcast = function() {
        var i = this,
        n = Director.getStage();
        GCBroadcastManager.clearHallBroadcast();
        var a = new GCBroadcastView(1);
        a.setHallData(GCBroadcastManager._hallBroadcastList),
        a.x = 640 + CONFIG.adaptX,
        a.y = 130 + CONFIG.adaptY,
        a.name = "boardUI",
        n.addChild(a);
        var o = egret.Tween.get(a, {
            loop: !1
        });
        a.alpha = 0,
        o.to({
            alpha: 1
        },
        500).call(function() {
            egret.Tween.removeTweens(a)
        }),
        a.startHallMsg(function() {
            GCBroadcastManager._timer = new egret.Timer(GCBroadcastManager._playInterval, 1),
            GCBroadcastManager._timer.addEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playHallBroadcast, i),
            GCBroadcastManager._timer.start()
        })
    }
    static playRoomBroadcast = function() {
        GCBroadcastManager._roomMsgIsInPlay || (GCBroadcastManager._roomMsgIsInPlay = !0, GCBroadcastManager._timer = new egret.Timer(2500, 1), GCBroadcastManager._timer.addEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playRoomBroardcastItem, this), GCBroadcastManager._timer.start())
    }
    static playRoomBroardcastItem = function() {
        if (GCBroadcastManager._roomBroadcastList.length > 0) {
            var i = Director.getStage(),
            n = GCBroadcastManager._roomBroadcastList.shift(),
            a = new GCBroadcastView(n.type);
            a.setRoomData(n.msg),
            a.x = 640 + CONFIG.adaptX,
            a.y = 155 + CONFIG.adaptY,
            a.name = "boardUI",
            i.addChild(a);
            var o = egret.Tween.get(a, {
                loop: !1
            });
            a.alpha = 0,
            a.cacheAsBitmap = !0,
            o.to({
                alpha: 1
            },
            500).call(function() {
                egret.Tween.removeTweens(a)
            }),
            a.startRoomMsg(function() {
                GCBroadcastManager.playRoomBroardcastItem()
            })
        } else GCBroadcastManager._roomMsgIsInPlay = !1,
        GCBroadcastManager._timer && GCBroadcastManager._timer.removeEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playRoomBroardcastItem, this)
    }
    static clearHallBroadcast = function() {
        var e = Director.getStage(),
        i = <GCBroadcastView>e.getChildByName("boardUI");
        i && (i.destroy(), i.parent && i.parent.removeChild(i)),
        GCBroadcastManager._timer && (GCBroadcastManager._timer.removeEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playHallBroadcast, this), GCBroadcastManager._timer = null)
    }
    static clearRoomBroadcast = function() {
        var e = Director.getStage(),
        i = <GCBroadcastView>e.getChildByName("boardUI");
        i && (i.destroy(), i.parent && i.parent.removeChild(i)),
        GCBroadcastManager._timer && GCBroadcastManager._timer.removeEventListener(egret.TimerEvent.TIMER, GCBroadcastManager.playRoomBroardcastItem, this)
    }
}