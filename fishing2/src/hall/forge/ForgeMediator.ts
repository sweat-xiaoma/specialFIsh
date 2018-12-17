/** 锻造 */
class ForgeMediator extends SimpleMediator {
	public isUseEns;

	public constructor(t) {
		super(t);
	}

	public onAdded() {
		super.onAdded();
        this.getView().initView()
    }

    public init() {
        var e = this;
        this.subscrib(NotifyEnum.CHECK_FORGEUI_LOADED, this.loaded),
        this.subscrib(NotifyEnum.SET_USEENSENCE_FLAG, this.setUseEnsenceFlag),
        this.isUseEns = false;
        MessageDispatcher.register(MsgActionDefine.UpgradeOrForgeRes,
        function(t) {
            e.ForgeBack(t);
        })
    }

    /**资源加载完成 */
    public loaded(e, t:ForgeMediator) {
        t.checkForgeData();
    }

    public setUseEnsenceFlag(e, t) {
        if (1 == t.isUseEns) return t.isUseEns = !1,
        void t.checkForgeData();
        var i = Director.getModelByKey(UserModel),
        n = i.getCurGunID(),
        a = T_Gun_Table.getVoByKey(n);
        if (a) {
            var o = a.forgeSuccessAlsoCost,
            r = o.split("_"),
            s = parseInt(r[0]),
            l = parseInt(r[1]),
            u = new Item(s, 0);
            if (!i.isExist(u)) return t.isUseEns = !1,
            t.checkForgeData(),
            void GameUtil.popTips(Language.getText(86));
            var d = i.getItemById(s).getCount();
            if (l > d) return t.isUseEns = !1,
            t.checkForgeData(),
            void GameUtil.popTips(Language.getText(86));
            t.isUseEns = !0,
            t.checkForgeData();
        }
    }

    /** 检查数据 */
    public checkForgeData() {
        var e = Director.getModelByKey(UserModel),
        t = e.getCurGunID(),
        i = T_Gun_Table.getVoByKey(t);
        if (i) {
            for (var n = i.upgradeOrForgeCost,
            a = n.split(","), o = !0, r = 0; r < a.length; r++) {
                var s = a[r],
                l = s.split("_"),
                u = parseInt(l[0]),
                d = parseInt(l[1]),
                h = (e.getItemById(u), new Item(u, d));
                if (!e.isExist(h)) {
                    o = !1;
                    break
                }
                if (e.getItemById(u).getCount() < d) {
                    o = !1;
                    break
                }
            }
            if (o && this.isUseEns) {
                var c = i.forgeSuccessAlsoCost,
                p = c.split("_"),
                g = parseInt(p[0]),
                _ = parseInt(p[1]),
                y = e.getItemById(g);
                e.isExist(y) || (o = !1),
                e.getItemById(g).getCount() < _ && (o = !1)
            }
            var m:ForgeView = this.getView();
            m.setUIData(t, this.isUseEns, o);
        }
    }

    public ForgeBack(e) {
        var t = this.getView();
        var state = e.getState();
        var userModel:UserModel = Director.getModelByKey(UserModel);
        if (state == UpdateOrForgeType.TYPE_SUC) {
            var n = e.getType();
            if (n == GunUpdateType.UNLOCK) return;
            var o = e.getAfterGunId();
            userModel.setCurGunID(o);
            var gun = T_Gun_Table.getVoByKey(o - 1);
            if (gun) {
                for (var s = gun.upgradeOrForgeCost,
                l = s.split(","), u = 0; u < l.length; u++) {
                    var d = l[u],
                    h = d.split("_"),
                    c = parseInt(h[0]),
                    p = parseInt(h[1]),
                    g = userModel.getItemById(c);
                    userModel.updateItem(c, g.getCount() - p)
                }
                if (n == GunUpdateType.USE_ESSENCE_FORGE_TYPE) {
                    var _ = gun.forgeSuccessAlsoCost,
                    y = _.split("_"),
                    m = parseInt(y[0]),
                    f = parseInt(y[1]),
                    v = userModel.getItemById(m);
                    userModel.updateItem(m, v.getCount() - f)
                }
            }
            this.checkForgeData();
        } else {
            var T = userModel.getCurGunID(),
            gun = T_Gun_Table.getVoByKey(T);
            if (gun) for (var s = gun.upgradeOrForgeCost,
            l = s.split(","), u = 0; u < l.length; u++) {
                var d = l[u],
                h = d.split("_"),
                c = parseInt(h[0]),
                p = parseInt(h[1]),
                g = userModel.getItemById(c);
                userModel.updateItem(c, g.getCount() - p)
            }
            var E = e.getItemProto();
            if (E) {
                var I = E.itemId,
                b = E.count,
                C = new Item(I, b);
                userModel.addItem(C)
            }
        }
        var x = this;
        setTimeout(function() {
            t.setEffect(state)
        },
        800),
        setTimeout(function() {
            x.checkForgeData()
        },
        2500);
    }

    public destroy() {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.SET_USEENSENCE_FLAG);
        this.unsubscribByType(NotifyEnum.CHECK_FORGEUI_LOADED);
        MessageDispatcher.unregister(MsgActionDefine.UpgradeOrForgeRes);
    }
}