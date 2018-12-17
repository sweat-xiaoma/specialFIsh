class ChangeGunItemItem extends eui.Component{
    private _btnWrapList;
    private _state;
    private _id;
    private nameLab;
    private starGroup;
    private getGroup;
    private lock;
    private renewGroup;
    private euipedGroup;
    private equipGroup;
    private vip;
    private vipLv;
    private iconGroup;
    public constructor() {
		super();
        this._btnWrapList = [];
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/changeGun/ChangeGunItem.exml";
	}

    public setData (e) {
        var t = e.getVO();
        var i = T_Gun_skin_Table.getVoByKey(t.id);
        var n = e.getState();
        this._state = n,
        this._id = t.id;
        var a = this;
        IconUtil.getIconByIdAsync(IconType.PAO, t.id,
        function(e:eui.Image) {
            if (e){
               e.anchorOffsetX = e.width / 2;
               e.anchorOffsetY = e.height / 2;
               a.iconGroup.addChild(e);
               e.scaleX = e.scaleY = 0.6;
            }
        }),
        this.nameLab.text = Language.getText(t.name);
        // 星星个数显示
        for (var o = i.star,
        r = 5; r > o; r--) this.starGroup.getChildByName("star_" + r).visible = !1;

        this.getGroup.visible = false;
        this.euipedGroup.visible = false;
        this.equipGroup.visible = false;

        // 按钮状态显示
        switch (n) {
        case GunState.UnGain: // 获取
        case GunState.UnAct:  // 续费(无)
            this.getGroup.visible = true,
            this.getGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this),
            this._btnWrapList.push(new UIWrap(this.getGroup));
            // this.lock.visible = !0;
            break;
        // case GunState.UnAct:  // 续费
        //     this.renewGroup.visible = !0,
        //     this._btnWrapList.push(new UIWrap(this.renewGroup)),
        //     this.renewGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this);
        //     break;
        case GunState.Equip:   //已装备
            this.euipedGroup.visible = true,
            this._btnWrapList.push(new UIWrap(this.euipedGroup));
            break;
        case GunState.Act:   //装备
            this.equipGroup.visible = true,
            this._btnWrapList.push(new UIWrap(this.equipGroup)),
            this.equipGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this)
        }
        // this.isContainedVip() ? (this.vip.visible = !0, this.vipLv.textAlign = egret.HorizontalAlign.CENTER, this.vipLv.text = this.getCotainedVipLv() + "") : this.vip.visible = !1
    }
    public touchItemEvent (e) {
        // console.log(this._state);
        
        switch (this._state) {
            case GunState.UnGain: // 获取
            case GunState.UnAct:  // 续费(无)
                var n = new ItemShopView,
                a = new ItemShopMediator(n);
                Director.pushView(a)
                // if (Director.popView(), this.isContainedVip()) {
                //     var t = new VipView,
                //     i = new VipMediator(t);
                //     Director.pushView(i)
                // } else {
                //     var n = new ItemShopView,
                //     a = new ItemShopMediator(n);
                //     Director.pushView(a)
                // }
                break;
            case GunState.UnAct:
                // if (Director.popView(), this.isContainedVip()) {
                //     var t = new VipView,
                //     i = new VipMediator(t);
                //     Director.pushView(i)
                // } else {
                //     var n = new ItemShopView,
                //     a = new ItemShopMediator(n);
                //     Director.pushView(a)
                // }
                break;
            case GunState.Equip:  //已装备
                break;
            case GunState.Act:   //装备
                // 发送装备消息
                var o:ChangeGunReq = new ChangeGunReq;
                o.initData(),
                o.setType(ChangeGunState.CHANGE_SKIN),
                o.setSkinId(Number(this._id)),
                NetManager.send(o,MsgActionDefine.ChangeGunReq)
                Director.popView()
        }
    }
    public isContainedVip () {
        for (var e = T_VipLevel_Table.getAllVo(), t = e.length, i = 0; t > i; i++) {
            var n = e[i];
            if ("0" != n.levelUpAward) {
                var a = n.levelUpAward.split("_"),
                o = Number(a[0]);
                if (this._id == o) return ! 0
            }
        }
        return ! 1
    }
    public getCotainedVipLv () {
        for (var e = T_VipLevel_Table.getAllVo(), t = e.length, i = 0; t > i; i++) {
            var n = e[i];
            if ("0" != n.levelUpAward) {
                var a = n.levelUpAward.split("_"),
                o = Number(a[0]);
                if (this._id == o) return n.vipLevel + 1
            }
        }
        return 0
    }
    public clearItem = function() {
        for (; this._btnWrapList.length > 0;) {
            var e = this._btnWrapList.pop();
            e.destroy()
        }
        this.getGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this),
        this.renewGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this),
        this.equipGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemEvent, this)
    }

}

