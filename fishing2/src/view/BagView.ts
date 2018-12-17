class BagView extends FullView {
    public _bPop;
    public _nCurID;
    /** */
    public _btnWrapList;
    public _itemList;
    public _bagUI;
    /**当前选中的物品数据 */
    private selectItem;
    public constructor() {
        super();
        this._bPop = !1,
            //开始loading
            UIUtil.startLoading();
        this._nCurID = -1;
    }
    /**初始化页面 */
    public initView(e) {
        var t = this;
        /**加载背包ui界面 */
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/BagUI.exml",
            function (i, n) {
                //加载成功回调
                t.loadComplete(i, n, e)
            },
            this),
            this._btnWrapList = new Array,
            this._itemList = new Array
    }
    /**页面加载成功回调*/
    public loadComplete(e, t, i) {
        var n = this;
        //关闭loading
        UIUtil.closeLoading();
        //清除页面内容
        this.removeChildren();
        //添加页面上的内容
        var a = new eui.UILayer;
        this.addChild(a);
        var o = new BagViewUI();
        this._bagUI = o;
        this._bagUI.skinName = e;
        this._bagUI.horizontalCenter = 0;
        this._bagUI.verticalCenter = 0;
        a.addChild(this._bagUI);
        this._bPop || (UIUtil.popView(this._bagUI.root), this._bPop = !0);
        this._bagUI.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseEvent, this);
        this._bagUI.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchSendBtnEvent, this); //赠送
        this._bagUI.useBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchUseBtnEvent, this);	//使用
        this._bagUI.equipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.equipBtnEvent, this);	//装备
        this._bagUI.renewBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.renewBtnEvent, this);	//续费
        this._bagUI.unloadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.unloadBtnEvent, this);	//卸下
        this._bagUI.saleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saleBtnEvent, this);//
        this._btnWrapList.push(new UIWrap(this._bagUI.closeBtn));
        this._btnWrapList.push(new UIWrap(this._bagUI.useBtn));//使用按钮
        this._btnWrapList.push(new UIWrap(this._bagUI.splitBtn));//分解按钮
        this._btnWrapList.push(new UIWrap(this._bagUI.sendBtn));//赠送按钮
        this._btnWrapList.push(new UIWrap(this._bagUI.equipBtn));//装备按钮
        this._btnWrapList.push(new UIWrap(this._bagUI.renewBtn));//续费按钮
        this._btnWrapList.push(new UIWrap(this._bagUI.saleBtn));//出售按钮
        this._btnWrapList.push(new UIWrap(this._bagUI.unloadBtn));//卸下按钮
        // TweenTools.rotation(this._bagUI.bgsun, 4e3),
        this._bagUI.itemDesTxt.text = "";
        this._bagUI.itemNameTxt.text = "";
        this._bagUI.itemTypeTxt.text = "";
        this._bagUI.itemCountTxt.text = "";
        this._bagUI.sendBtn.visible = !1;
        this._bagUI.useBtn.visible = !1;
        var userM: UserModel = Director.getModelByKey(UserModel);
        this._bagUI.goldTxt.text = userM.getCoins().toString();
        this._bagUI.moneyTxt.text = userM.getMoney().toString();
        //加载背包物品item页面
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml",
            function () {
                //加载出售页面
                EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SellUI.exml",
                    function () {
                        //加载赠送页面
                        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SendUI.exml",
                            function () {
                                n.setListData(i)
                            },
                            n)
                    },
                    n)
            },
            this);
    }
    /**更新大王豆数量 */
    public updatCoins(v = null) {
        var i: UserModel = Director.getModelByKey(UserModel);
        this._bagUI.goldTxt.text = i.getCoins().toString();
    }
    /**更新金币数量 */
    public updateMoney(v = null) {
        var i: UserModel = Director.getModelByKey(UserModel);
        this._bagUI.moneyTxt.text = i.getMoney().toString();
    }

    /**设置背包物品list数据*/
    public setListData(e) {

        for (var t = new Array,
            i = e.length,
            n = 0; i > n; n++) 0 != e[n].getCount() && e[n].getItemId() != PropEnum.FREE_RAGE && e[n].getItemId() != PropEnum.FREE_CLONE && t.push(e[n]);
        var a = -1; - 1 != this._nCurID && (a = this._nCurID);
        var o = new Array;
        i = t.length;
        for (var n = 0; i > n; n++) 0 != t[n].getCount() && o.push(t[n]);
        var r = this;
        r._bagUI.scrollerGroup.removeChildren();
        var s = 0;
        var itemMaxNum = 30;//背包中的item总个数
        var itemLineNum = 5;//单行个数
        s = o.length > itemMaxNum ? Math.floor(o.length / itemMaxNum) + 1 : Math.floor(o.length / itemMaxNum),
            s *= itemMaxNum,
            itemMaxNum > s && (s = itemMaxNum);
        for (var n = 0; s > n; n++) {
            var l = null;
            if (n >= o.length) {
                l = new BagViewItem(0, 0, !1);
                l.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml";
                l.scaleX = l.scaleY = .95;
                l.setNull();
            } else {
                if (0 == n && -1 == a) {
                    l = new BagViewItem(o[n].getItemId(), o[n].getCount(), !0);
                    l.name = o[n].getItemId() + "";
                    this.selectItem = l;
                    l.scaleX = l.scaleY = .95;
                    l.init();
                    // r.send(NotifyEnum.CLICK_BAG_ITEM, l.getItemId());
                    l.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this)
                } else {
                    -1 != a && o[n].getItemId() == a ? (l = new BagViewItem(o[n].getItemId(), o[n].getCount(), !1), l.name = o[n].getItemId() + "", l.scaleX = l.scaleY = .95, l.init(), r.send(NotifyEnum.CLICK_BAG_ITEM, l.getItemId())) : (l = new BagViewItem(o[n].getItemId(), o[n].getCount(), !1), l.name = o[n].getItemId() + "", l.scaleX = l.scaleY = .95, l.init()), l.addEventListener(egret.TouchEvent.TOUCH_END, this.touchItemEvent, this)

                }
            }


            this._bagUI.scrollerGroup.addChild(l),
                this._itemList.push(l)

        }
        var u = new eui.TileLayout;
        u.paddingTop = 10,
            u.paddingLeft = 0,
            u.paddingRight = 0,
            u.paddingBottom = 20,
            r._bagUI.scrollerGroup.layout = u

        if (this.selectItem) {
            this.send(NotifyEnum.CLICK_BAG_ITEM, this.selectItem.getItemId());
        }
    }

    /**背包物品item点击事件 */
    public touchItemEvent(e) {
        for (var t = e.currentTarget.name, i = 0; i < this._itemList.length; i++) {
            t == this._itemList[i].name ? (this._nCurID = this._itemList[i].getItemId(), this._itemList[i].selected(!0), this.send(NotifyEnum.CLICK_BAG_ITEM, this._itemList[i].getItemId())) : this._itemList[i].selected(!1)
        }
    }

    /**设置页面中的物品信息详情 */
    public setLeftMsg(e, t, i, n, a) {
        var o: UserModel = Director.getModelByKey(UserModel),
            r = (o.getItemById(a.id), new Array);
        var s: Item = o.getItemById(a.id);
        this.selectItem = s;
        if (a.worth == "" || a.worth == "0") {
            this._bagUI.itemTypeTxt.visible = false;// visible = 0;
            this._bagUI.itemTypeBgImg.visible = false;
            this._bagUI.sellImg.visible = false;
        } else {
            this._bagUI.itemTypeTxt.visible = true;
            this._bagUI.itemTypeBgImg.visible = true;
            this._bagUI.itemTypeTxt.text = a.worth;
            this._bagUI.sellImg.visible = true;
        }

        this._bagUI.itemDesTxt.text = n;
        this._bagUI.itemNameTxt.text = e;
        this._bagUI.itemTypeTxt.text = t;
        //如果是话费券则显示元  否则直接显示个数
        if (s._itemId == PropEnum.FISH_TICKIT) {
            this._bagUI.itemCountTxt.text = s._count / 10 + "元";
        } else {
            this._bagUI.itemCountTxt.text = "x" + s._count;
        }
        //设置赠送、使用按钮的显示 
        // if (a.everyTimeLimit && a.everyTimeLimit > 0) {
        //       this._bagUI.sendBtn.visible = !1;
        //     //暂时没有赠送功能，暂时注销原有代码并隐藏赠送按钮
        //     // (this._bagUI.sendBtn.visible = !0, r.push(this._bagUI.sendBtn), this._bagUI.sendBtn.name = a.id + "")
        //     
        //     //暂时没有赠送功能，暂时注销原有代码并隐藏赠送按钮  end----------------------
        // } else {
        //     this._bagUI.sendBtn.visible = !1;
        //     a.type == BagItemType.FORGE_PROP ? (this._bagUI.useBtn.visible = !0, r.push(this._bagUI.useBtn), this._bagUI.useBtn.name = a.id + "") : this._bagUI.useBtn.visible = !1;
        // }


        //隐藏除关闭按钮外的所有操作按钮
        for (var b: number = 0; b < this._btnWrapList.length; b++) {
            if ((this._btnWrapList[b] as UIWrap).btn != this._bagUI.closeBtn)
                (this._btnWrapList[b] as UIWrap).btn.visible = !1;
        }
        //暂时只有炮、限时炮、技能道具几种物品可操作 其他类型
        // if (a.type == BagItemType.BATTERY || a.type == BagItemType.HAMMER || a.type == BagItemType.PROP_CARD)//
        // {
        if (a.type == BagItemType.BATTERY)  //显示装备按钮
        {
            if (o.getCurSkinId() == a.id) {
                this._bagUI.equipBtn.visible = !1;
            } else {
                this._bagUI.equipBtn.visible = !0;
            }
        }
        if (a.type == BagItemType.FISH_TICKET ||
            a.type == BagItemType.WARHEAN ||
            a.type == BagItemType.FORGE_PROP ||
            a.type == BagItemType.PROP_CARD)    //显示使用按钮
        {
            this._bagUI.useBtn.visible = !0;
            r.push(this._bagUI.useBtn);
            this._bagUI.useBtn.name = a.id + "";
        }
        //显示出售按钮
        //显示赠送按钮
        if (a.type == BagItemType.PROP_CARD ||
            a.type == BagItemType.WARHEAN ||
            a.type == BagItemType.FORGE_PROP) {
            this._bagUI.saleBtn.visible = !0;
            r.push(this._bagUI.saleBtn);
            this._bagUI.saleBtn.name = a.id + "";

            this._bagUI.sendBtn.visible = !0;
            r.push(this._bagUI.sendBtn);
            this._bagUI.sendBtn.name = a.id + "";

        }


        // }
        //暂时注掉
        // if (a.type == BagItemType.BATTERY || a.type == BagItemType.BARBETTE) {
        //     var s = o.getItemById(a.id);
        //     s.isAct() && o.getCurSkinId() == a.id || s.isAct() && o.getCurGunBgId() == a.id ? s.isAct() && o.getCurGunBgId() == a.id ? (this._bagUI.unloadBtn.visible = !0, r.push(this._bagUI.unloadBtn), this._bagUI.unloadBtn.name = a.id + "", this._bagUI.equipBtn.visible = !1, this._bagUI.renewBtn.visible = !1) : s.getTime() > 0 && (this._bagUI.renewBtn.visible = !0, r.push(this._bagUI.renewBtn), this._bagUI.renewBtn.name = a.id + "", this._bagUI.equipBtn.visible = !1, this._bagUI.unloadBtn.visible = !1) : s.isAct() ? (this._bagUI.equipBtn.visible = !0, r.push(this._bagUI.equipBtn), this._bagUI.equipBtn.name = a.id + "", this._bagUI.renewBtn.visible = !1, this._bagUI.unloadBtn.visible = !1) : (this._bagUI.renewBtn.visible = !0, r.push(this._bagUI.renewBtn), this._bagUI.renewBtn.name = a.id + "", this._bagUI.equipBtn.visible = !1, this._bagUI.unloadBtn.visible = !1);
        //     var l = s.getTime();
        //     if (l) {
        //         var u = l - TimeUtil.getCurrTime(),
        //             d = Math.floor(u / 86400);
        //         0 > d && (d = 0),
        //             this._bagUI.itemCountTxt.text = Language.getText(194) + d
        //     }
        // } else this._bagUI.renewBtn.visible = !1,
        //     this._bagUI.equipBtn.visible = !1;
        //暂时注掉 end --------------
        this._bagUI.iconGroup.removeChildren();
        var h = this;
        IconUtil.getIconByIdAsync(IconType.PROP, a.id,
            function (e) {//设置当前选中物品图片
                e && (e.width = 70, e.height = 70, e.anchorOffsetX = e.width / 2, e.anchorOffsetY = e.height / 2, e.x = h._bagUI.iconGroup.width / 2, e.y = h._bagUI.iconGroup.height / 2, h._bagUI.iconGroup.addChild(e))
            }),
            this._bagUI.splitBtn.visible = !1,
            1 == r.length ? r[0].x = 194 : 2 == r.length ? (r[0].x = 130, r[1].x = 254) : 3 == r.length && (r[0].x = 69, r[1].x = 194, r[1].x = 318)
    }

    public unloadBtnEvent(e) {
        var t = e.currentTarget.name;
        var msg: ChangeGunReq = new ChangeGunReq();
        msg.initData(),
            msg.setType(ChangeGunState.UNLOAD_ZUO);
        msg.setChangeValue(Number(t));
        NetManager.send(msg, MsgActionDefine.ChangeGunReq);
    }

    public renewBtnEvent(e) {
        var t = e.currentTarget.name, i = T_Shop_Table.getAllVo(), n = i.length, a = Number(t);
        for (var o = -1, r = 0; n > r; r++)
            if (i[r].itemId == a) {
                o = i[r].id;
                break
            }
        var s = new ShopBuyReq();
        s.initData();
        s.setShopId(o);
        NetManager.send(s, MsgActionDefine.ShopBuyReq);
    }
    /**装备按钮点击事件 */
    public equipBtnEvent(e) {
        if (!this.selectItem) {
            console.log("当前未选中任何物品");
            return;
        }
        var t = e.currentTarget.name;
        var msg: ChangeGunReq = new ChangeGunReq();
        msg.initData();
        msg.setType(ChangeGunState.CHANGE_SKIN);
        msg.setSkinId(Number((this.selectItem as Item).getItemId()));
        msg.setChangeValue(0);
        NetManager.send(msg, MsgActionDefine.ChangeGunReq);
    }
    /**
     *使用按钮点击事件
     */
    public touchUseBtnEvent(e) {
        var t = e.currentTarget.name;
        this.send(NotifyEnum.USE_ITEM_BY_BAG, t);
    }
    /**赠送按钮点击事件 */
    public touchSendBtnEvent(e) {
        var t = e.currentTarget.name;
        this.send(NotifyEnum.SEND_ITEM_TO_USER, t);
    }
    public saleBtnEvent(e) {
        var t = e.currentTarget.name;
        this.send(NotifyEnum.SHOW_SELL_VIEW, t);
    }
    /** */
    public onCloseEvent(e) {
        Director.popView();
    }
    /**
     * 销毁
     * （移除监听事件、以及ui页面等)
     */
    public destroy() {
        var e = this;
        this._bPop = !1,
            UIUtil.closeView(this._bagUI.root,
                function () {
                    for (; e._btnWrapList.length > 0;) {
                        var t = e._btnWrapList.pop();
                        t.destroy()
                    }
                    e._bagUI.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onCloseEvent, e);
                    e._bagUI.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.touchSendBtnEvent, e);
                    e._bagUI.useBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.touchUseBtnEvent, e);
                    e._bagUI.equipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.equipBtnEvent, e);
                    e._bagUI.renewBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.renewBtnEvent, e);
                    e._bagUI.unloadBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.unloadBtnEvent, e);
                    e.parent.removeChild(e);
                    RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/BagUI.exml");
                    RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BagItem.exml");
                    RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SellUI.exml");
                    RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/SendUI.exml");

                })
    }
}