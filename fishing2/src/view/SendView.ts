class SendView extends eui.Component {
    public _id;
    public _nReceiveId;
    public _btnWrapList;
    public skinName;
    public _userModel;
    public closeBtn;
    public backBtnGroup;
    public itemGroup;
    public itemName;
    public nCurNumber;
    public numLab;
    public sendBtn;
    public addBtn;
    public resouceBtn;
    public username;
    public _parent;
    public thumb;
    public maxW = 254;
    public constructor(t, i) {
        super();
        this._id = t;
        this._nReceiveId = i;
        this._btnWrapList = new Array;
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SendUI.exml";
        this._userModel = Director.getModelByKey(UserModel);
        this._btnWrapList.push(new UIWrap(this.closeBtn));
        this._btnWrapList.push(new UIWrap(this.backBtnGroup));
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this.backBtnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this.addBgResource();
    }

    public addBgResource() {
        var e = T_Item_Table.getVoByKey(this._id),
            t = this._userModel.getItemById(this._id),
            i = new BagViewItem(t.getItemId(), t.getCount());
        i.init();
        i.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
        this.itemGroup.addChild(i);
        // this.itemName.text = Language.getText(e.name),
        this.nCurNumber = e.everyTimeLimit;
        this.numLab.text = this.nCurNumber + "/" + t.getCount();
        var q = this.maxW * (this.nCurNumber / t.getCount())
        if (q < 60) {
            q = 60 + q;
        }
        this.thumb.width = q;
        this._btnWrapList.push(new UIWrap(this.sendBtn));
        this._btnWrapList.push(new UIWrap(this.addBtn));
        this._btnWrapList.push(new UIWrap(this.resouceBtn));
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClick, this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addResource, this);
        this.resouceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resouce, this);
        this.username.text = "请输入对方ID";
        this.username.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        // -1 != this._nReceiveId && (this.username.text = this._nReceiveId + "", this.username.alpha = 1)
    }

    public onChange(e) {
        e.target.text = "",
            e.target.alpha = 1
    }

    public setParent(e) {
        this._parent = e
    }

    public initView() { }

    public addResource(e) {
        var t = T_Item_Table.getVoByKey(this._id),
            i = this._userModel.getItemById(this._id);
        i.getCount() < this.nCurNumber + t.everyTimeLimit || (this.nCurNumber += t.everyTimeLimit, this.numLab.text = this.nCurNumber + "/" + i.getCount())
        var q = this.maxW * (this.nCurNumber / i.getCount())
        if (q < 60) {
            q = 60 + q;
        }
        this.thumb.width = q;
    }

    public resouce(e) {
        var t = T_Item_Table.getVoByKey(this._id);
        var i = this._userModel.getItemById(this._id);
        this.nCurNumber != t.everyTimeLimit && (this.nCurNumber -= t.everyTimeLimit, this.numLab.text = this.nCurNumber + "/" + i.getCount())
        var q = this.maxW * (this.nCurNumber / i.getCount())
        if (q <= this.thumb.width && this.thumb.width > 60) {
            this.thumb.width = this.thumb.width - q;
        }

    }

    public onClosttButtonClick(e) {
     
        this._parent && this._parent.removeChild(this)
    }

    public sendClick(e) {
        if ("" == this.username.text) return void GameUtil.popTips(Language.getText(38));
        if (Number(this.username.text) == this._userModel.getUserId()) return void GameUtil.popTips(Language.getText(39));
        var t = new RegExp("^[0-9]*$");
        if (!t.test(this.username.text)) return void GameUtil.popTips(Language.getText(38));
        _Notification_.send(NotifyEnum.CHNAGE_RECEIVE_ID, {
            id: this.username.text, count: this.nCurNumber
        });
        // var i = new FindUserSendMessage;
        // i.initData(),
        // i.setUserId(Number(this.username.text)),
        // NetManager.send(i)
    }

    public sendGiveMes(e) {
        var t = T_Item_Table.getVoByKey(this._id),
            i = new Array;
        i.push(this.nCurNumber + ""),
            i.push(Language.getText(t.name) + ""),
            i.push(this.username.text + ""),
            i.push(e + "");
        var n = Language.getDynamicText(41, i),
            a = this;
        GameUtil.openConfirmByTwoButton(null,
            function () {
                _Notification_.send(NotifyEnum.GIVE_ITEM_DATA, {
                    id: a._id,
                    num: a.nCurNumber,
                    userId: a.username.text
                });
                // var e = new GiveItemSendMessage;
                // e.initData(),
                // e.setGiveItem({
                //     itemId: a._id,
                //     totalCount: a.nCurNumber
                // }),
                // e.setReceiveUserId(Number(a.username.text)),
                // NetManager.send(e),
                // a.onClosttButtonClick(null)
            },
            this, n)
    }

    public destroy() {
        for (; this._btnWrapList.length > 0;) {
            var e = this._btnWrapList.pop();
            e.destroy()
        }
        this.parent && this.parent.removeChild(this),
            this.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClick, this),
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
            this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addResource, this),
            this.resouceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.resouce, this),
            this.username.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this),
            console.log("LoginView destory!");
    }
}