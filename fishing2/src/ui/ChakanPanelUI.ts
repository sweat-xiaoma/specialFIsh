class ChakanPanelUI extends eui.Component {
      
    private mine;  // 我的面板
    private other; // 别人的面板
    private emoji;
    private chat;
    private change;  // 换炮按钮
    private auto;    // 自动按钮
    private _btnWrapList;
    private nameLab;
    private lvLab;
    private gun;
    private di;

	public constructor() {
        super();
        // var t =  this;
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/ChakanPanel.exml";
        this.mine.cacheAsBitmap = true;
        this.other.touchEnabled = false;
        this.emoji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
        this.chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
        this.change.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
        this.auto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this);
        this._btnWrapList = new Array;
        this._btnWrapList.push(new UIWrap(this.change)),
        this._btnWrapList.push(new UIWrap(this.auto));
	}

    private shouTips (e) {
        if (this.auto == e.target) {
            // if (CONFIG.PLATFORM_ID == PlatformTypeEnum.YI_WAN_TANG) {
            //     _Notification_.send(NotifyEnum.SHOW_CHAKAN_PANEL),
            //     _Notification_.send(NotifyEnum.AUTO_GUN_FIRE);
            //     return;
            // }
            var t = Director.getModelByKey(UserModel);
            // t.getMonthEndTime() - TimeUtil.getCurrTime();
            //TODO 自动开炮限制
            // if (t.getTatolChargeRMB() <= 0) {
                // GameUtil.popTips(Language.getText(143));
                // var i = new FirstChargeView,
                // n = new FirstChargeMediator(i);
                // return void Director.pushView(n)
            // }
            _Notification_.send(NotifyEnum.SHOW_CHAKAN_PANEL);
            _Notification_.send(NotifyEnum.AUTO_GUN_FIRE);
        } else if (this.change == e.target) {
            var a = new ChangeGunView,
            o = new ChangeGunMediator(a);
            Director.pushView(o)
        } else GameUtil.popTips(Language.getText(47))
    }

    // 显示我的换炮面板
    public setMine() {
        this.mine.visible = false;
        this.other.visible = false;

        // var e = this,
        // t = egret.Tween.get(this.change, {
        //     loop: !1
        // });
        // this.change.visible = false;  ///隐藏换炮按钮
        // this.change.x;
        // this.change.scaleX = 0,
        // this.change.scaleY = 0,
        // this.change.x = this.width / 2,
        // t.to({
        //     x: 60,
        //     y: 140,
        //     scaleX: 1,
        //     scaleY: 1
        // },
        // 350, egret.Ease.backOut).call(function() {
        //     egret.Tween.removeTweens(e.change)
        // });
        // var i = egret.Tween.get(this.auto, {
        //     loop: !1
        // });
        // this.auto.x;
        // this.auto.scaleX = 0,
        // this.auto.scaleY = 0,
        // this.auto.x = this.width / 2,
        // i.to({
        //     x: 240,
        //     y: 148,
        //     scaleX: 1,
        //     scaleY: 1
        // },
        // 350, egret.Ease.backOut).call(function() {
        //     egret.Tween.removeTweens(e.auto)
        // })
        // _Notification_.send(NotifyEnum.AUTO_GUN_FIRE, 1);
    }

    // 显示别人的信息面板
    public setOther (e, t) {
        this.mine.visible = false;
        this.other.visible = true;
        // e ? this.di.rotation = 0 : this.di.rotation = 180;
        if (t) {
            var i = t.getName(),
            n = t.getLv(),
            a = i;
            this.nameLab.text = a,
            this.lvLab.text = " Lv." + n
        }
        var o = t.getCurSkinId(),
        r = T_Item_Table.getVoByKey(o);
        this.gun.text = Language.getText(r.name)
    }
   private destroy () {
        this.emoji.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this),
        this.chat.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this),
        this.change.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this),
        this.auto.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shouTips, this)
    }

} 