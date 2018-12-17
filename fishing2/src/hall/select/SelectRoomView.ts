
class SelectRoomView extends PopView {

    private _uiDisplay:SelectRoomUI;
    private _arrLeftList:Array<any>;
    private _roomListLeftGroup;
    private _arrRightList;
    private _roomListGroup;
    private _curTouchItem;

    constructor() {
        super();
    }

    public addBgResource(e, t) {
        var i = new eui.UILayer;
        this.addChild(i);

        var n = new SelectRoomUI;
        this._uiDisplay = n,
        this._uiDisplay.skinName = e,
        this._uiDisplay.horizontalCenter = 0,
        this._uiDisplay.verticalCenter = 0,
        i.addChild(this._uiDisplay);

        UIUtil.popView(this._uiDisplay.root);
        var a = this._uiDisplay.colse_btn;
        a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
        _Notification_.send(NotifyEnum.ROOMLIST_RESOUCE_LOADED)
    }

    /** 显示左边服务器列表 */
    public showLeftList(e) {
        this._arrLeftList = new Array();
        this._arrLeftList = e,
        this._roomListLeftGroup = this._uiDisplay.room_Left_group;
        for (var t = 0; t < e.length; t++) {
            var i = new SelectRoomLeftItem,
            n = e[t].state;
            i.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomListItem.exml",
            i.name = "" + t,
            i.name_bitlab.text = "" + (t + 1),
            i.okBtn.name = "" + t,
            i.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectLeftItem, this);
            // 服务器状态
            for (var a = 1; 4 >= a; a++){
                a == n ? i["imgStage_" + a].visible = true : i["imgStage_" + a].visible = false;
            } 
            this._roomListLeftGroup.addChild(i)
        }
        var o = new eui.VerticalLayout;
        o.paddingTop = 10,
        this._roomListLeftGroup.layout = o,
        this.setLeftList()
    }

    public updateRightItem(e) {
        for (var t = -1,
        i = this._arrRightList.length,
        n = 0; i > n; n++) if (e.roomId == this._arrRightList[n].roomId) {
            t = n;
            break
        }
        if ( - 1 != t) {
            var a = this._roomListGroup.getChildAt(t);
            a && (a.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomItem.exml", a.nameTitle.touchEnabled = !1, a.name_bitLab.touchEnabled = !1, a.ren.touchEnabled = !1, a.image_RED.touchEnabled = !1, a.image_CUR.touchEnabled = !1, a.name_bitLabCur.text = String(e.userCount), 4 == e.userCount ? (a.image_RED.visible = !0, a.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tipsRoomMax, this)) : (a.image_RED.visible = !1, a.image_CUR.width = e.userCount / 4 * 222, a.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectRightItem, this)))
        }
    }

    /** 右侧房间列表 */
    public showRightList(e) {
        this._arrRightList = new Array,
        this._arrRightList = e,
        this._roomListGroup = this._uiDisplay.room_group,
        this._roomListGroup.removeChildren();
        for (var t = 0; t < e.length; t++) {
            var i = new SelectRoomItem;
            i.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomItem.exml",
            i.name_bitLab.text = String(t + 1),
            i.imageBg.name = String(t),
            i.root.name = String(t),
            i.nameTitle.touchEnabled = false,
            i.name_bitLab.touchEnabled = false,
            i.ren.touchEnabled = false,
            i.image_RED.touchEnabled = false,
            i.image_CUR.touchEnabled = false,
            i.root.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchDownRightItem, this),
            i.root.addEventListener(egret.TouchEvent.TOUCH_END, this.touchCancelRightItem, this),
            i.root.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchCancelRightItem, this),
            i.name_bitLabCur.text = String(e[t].userCount);
            if (4 == e[t].userCount){
                // 人满了
                i.image_RED.visible = true, 
                i.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tipsRoomMax, this)
            }else{
                i.image_RED.visible = false;
                i.image_CUR.width = e[t].userCount / 4 * 222;
                i.imageBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectRightItem, this)
            }
 
            i.anchorOffsetX = .5,
            i.anchorOffsetY = .5,
            this._roomListGroup.addChild(i)
        }
        var n = this._uiDisplay.roomList_scrol;
        n.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.rollOverCall, this);
        var a = new eui.TileLayout;
        a.paddingTop = 10,
        a.paddingLeft = 15,
        a.paddingRight = 15,
        a.paddingBottom = 20,
        this._roomListGroup.layout = a
    }

    public setLeftList() {
        let selectRoomLeftItem = <SelectRoomLeftItem>this._roomListLeftGroup.getChildAt(0);
        selectRoomLeftItem.image_select.visible = true
    }

    public selectLeftItem(e) {
        for (var t = parseInt(e.target.name), i = this._roomListLeftGroup.numChildren, n = 0; i > n; n++) this._roomListLeftGroup.getChildAt(n).image_select.visible = !1;
        var a = this._roomListLeftGroup.getChildAt(t);
        a.image_select.visible = !0;
        // var o = new ManualChooseRoomSendMessage;
        // o.initData(),
        // o.setServerId(this._arrLeftList[t].serverId),
        // NetManager.send(o)
    }

    public touchCancelRightItem(e) {
        null != this._curTouchItem && (this._curTouchItem.scaleX = this._curTouchItem.scaleY = 1, this._curTouchItem = null)
    }

    public rollOverCall(e) {
        let roomNum = this._roomListGroup.numChildren;
        for (let i = 0; i < roomNum; i++) {
            var n = this._roomListGroup.getChildAt(i);
            n.scaleX = n.scaleY = 1
        }
    }

    public touchDownRightItem(e) {
        if (null != e.target.name && "" != e.target.name) {
            var t = Number(e.target.name);
            if (0 / 0 != t) {
                var i = this._roomListGroup.getChildAt(t);
                this._curTouchItem = i,
                this._curTouchItem.scaleX = this._curTouchItem.scaleY = .95
            }
        }
    }

    /** 人满了 */
    public tipsRoomMax(e) {
        GameUtil.popTips(Language.getText(11))
    }

    public selectRightItem(e) {
        Director.popView();
        var t = Number(e.target.name),
        i = this._arrRightList[t].roomId;
        _Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {
            type: RequesetRoomState.SelectRoom,
            id: i
        });
        // ReyunUtil.sendEvent(LogEnum.MANUAL_SEAT_SELECTION)
    }

    public onClosttButtonClick(e) {
        Director.popView()
    }

    public initView() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomItem.exml"),
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomListItem.exml"),
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SelectRoom.exml", this.addBgResource, this)
    }

    public destroy() {
        var e = this;
        UIUtil.closeView(this._uiDisplay.root,
        function() {
            for (var t = e._roomListGroup.numElements,
            i = 0; t > i; i++) {
                var n = e._roomListGroup.getElementAt(i);
                n.imageBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.tipsRoomMax, e),
                n.imageBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.selectRightItem, e)
            }
            e._roomListGroup.removeChildren(),
            e._uiDisplay.colse_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onClosttButtonClick, e),
            e.parent && e.parent.removeChild(e),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomItem.exml"),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/RoomListItem.exml"),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SelectRoom.exml")
        })
    }
}