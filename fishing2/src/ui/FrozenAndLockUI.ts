class FrozenAndLockUI extends eui.Component {

    private buttonFrozenNN:NewProgresButton;
    private frozenGroup;
    private buttonLockNN;
    private lockGroup;
	public constructor(t) {
		super();
        this.skinName = t;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/newProgressButton.exml", this.loaded, this);
	}
     private loaded (e, t) {
        this.buttonFrozenNN = new NewProgresButton(e, "frozen_skill");
        this.buttonFrozenNN.setButtonClickFun(function() {
            let user:UserModel = Director.getModelByKey(UserModel);
            let item = user.getItemById(PropEnum.FROZEN);
            var c = item ? item.getCount() : 0;
            if (c > 0)
                _Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.FROZEN);
        }),
        this.buttonFrozenNN.setIcon("frozen_skill");
        var i = T_Item_Table.getVoByKey(PropEnum.FROZEN),
        n = i.worth.split("_")[2];
        this.buttonFrozenNN.setGemCost(n);
        var a = 8,
        o = T_Config_Table.getVoByKey(88);
        o && (a = Number(o.value)),
        this.buttonFrozenNN.setTimeTotal(a),
        this.buttonFrozenNN.anchorOffsetX = this.buttonFrozenNN.width >> 1,
        this.buttonFrozenNN.anchorOffsetY = this.buttonFrozenNN.height >> 1,
        this.frozenGroup.addChild(this.buttonFrozenNN),
        this.buttonLockNN = new NewProgresButton(e, "lock_skill"),
        this.buttonLockNN.setButtonClickFun(function() {
            let user:UserModel = Director.getModelByKey(UserModel);
            let item = user.getItemById(PropEnum.LOCK);
            var c = item ? item.getCount() : 0;
            if (c > 0)
                _Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.LOCK)
        }),
        this.buttonLockNN.setIcon("lock_skill");
        var r = T_Item_Table.getVoByKey(PropEnum.LOCK),
        s = r.worth.split("_")[2];
        this.buttonLockNN.setGemCost(s);
        var l = 20,
        u = T_Config_Table.getVoByKey(87);
        u && (l = Number(u.value)),
        this.buttonLockNN.setTimeTotal(l),
        this.buttonLockNN.anchorOffsetX = this.buttonLockNN.width >> 1,
        this.buttonLockNN.anchorOffsetY = this.buttonLockNN.height >> 1,
        this.lockGroup.addChild(this.buttonLockNN);
        var d:UserModel = Director.getModelByKey(UserModel),
        h = d.getItemById(PropEnum.FROZEN),
        c = 0;
        h && (c = h.getCount()),
        this.setFrozenTxt("" + c);
        var p = d.getItemById(PropEnum.LOCK),
        g = 0;
        p && (g = p.getCount()),
        this.setLockTxt("" + g)
    }
    private lockBtn(e) {
        _Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.LOCK)
    }
   private frozenBtn(e) {
        _Notification_.send(NotifyEnum.USE_PROP_ITEM, PropEnum.FROZEN)
    }
    private setFrozenTxt(e) {
        this.buttonFrozenNN && this.buttonFrozenNN.setNum(e)
    }
    private setLockTxt(e) {
        this.buttonLockNN && this.buttonLockNN.setNum(e)
    }
}


   