class BagMediator extends SimpleMediator {
    public _nReceiveId;
    public _curGiveID;
    public _curGiveNum;
    public _sendView;
    public _sellView;

    public constructor(t) {
        super(t);
        this._nReceiveId = -1;
    }

    public onAdded() {
        super.onAdded();
        var t: UserModel = Director.getModelByKey(UserModel);
        this.getView().initView(t.getItemList());
    }
    /**初始化*/
    public init() {
        //添加监听
        this.subscrib(NotifyEnum.CLICK_BAG_ITEM, this.clickItem);//背包物品item点击
        this.subscrib(NotifyEnum.SEND_ITEM_TO_USER, this.sendItem);//赠送物品
        this.subscrib(NotifyEnum.USE_ITEM_BY_BAG, this.useItem);//使用物品
        this.subscrib(NotifyEnum.GIVE_ITEM_DATA, this.dataRefresh);//刷新list数据
        this.subscrib(NotifyEnum.CHNAGE_RECEIVE_ID, this.changeReceiveId);//更改接收的id
        this.subscrib(NotifyEnum.UPDATE_ROOM_UI_COINS, this.updatCoins);//更新大王豆数量
        this.subscrib(NotifyEnum.UPDATE_ROOM_UI_MONEY, this.updateMoney);//更新金币数量
        this.subscrib(NotifyEnum.SHOW_SELL_VIEW, this.showSellItem);//显示出售物品view
        this.subscrib(NotifyEnum.SELL_ITEM, this.sellItem)//出售物品
        this.subscrib(NotifyEnum.BAG_CHANGE_ITEM_INFO, this.refreshItemList);
        var e = this;
        //注册SOCKET消息
        MessageDispatcher.register(MsgActionDefine.GiveItemRes,
            function (t) {
                e.giveItemBack(t);
            });
        MessageDispatcher.register(MsgActionDefine.FindUserRes,
            function (t) {
                e.findUserBack(t);
            });
        MessageDispatcher.register(MsgActionDefine.ChangeGunRes,
            function (t) {
                e.changeGunBack(t);
            });
        MessageDispatcher.register(MsgActionDefine.ShopBuyRes,
            function (t) {
                e.shopBuyBack(t);
            });
        MessageDispatcher.register(MsgActionDefine.SellItemRes,
            function (t) {
                e.sellItemBack(t);

            });


        this._curGiveID = -1;
        this._curGiveNum = -1;
    }
    public updatCoins(v) {
        var t = this;
        t[1].getView().updatCoins();
    }
    public updateMoney(v) {
        var t = this;
        t[1].getView().updateMoney();
    }

    /**购买返回 */
    public shopBuyBack(e) {
        var t = e.getState();
        switch (t) {
            case 0:
                GameUtil.popTips("货币不足");
                break;
            case 1:
                GameUtil.popTips("购买成功"),
                    //派发更新数据
                    _Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
                break;
            case 2:
                GameUtil.popTips("背包已满")
        }
        var i = Director.getModelByKey(UserModel);
        //更新list数据
        this.getView().setListData(i.getItemList())
    }

    public dataRefresh(e, t) {
        t._curGiveID = Number(e.id),
            t._curGiveNum = Number(e.num)
    }

    public changeReceiveId(e, t) {
        t._nReceiveId = Number(e.id);
        var item: T_Item = T_Item_Table.getVoByKey(t._sendView._id);

        var msg = new GiveItemReq();
        msg.initData();
        msg.setReceiveUserId(t._nReceiveId);
        msg.setItemId(item.id);
        msg.setTotalCount(e.count);
        NetManager.send(msg, MsgActionDefine.GiveItemReq);
    }

    public clickItem(e, t) {
        var i = Number(e),
            n = T_Item_Table.getVoByKey(i);
        t.getView().setLeftMsg(Language.getText(n.name), t.getTypeNameByType(n.type), Language.getText(15) + ":" + n.backpackMax, Language.getText(n.desc), n)
    }

    public useItem(e, t) {
        var i = Number(e);
        var n = T_Item_Table.getVoByKey(i);
        _Notification_.send(NotifyEnum.QUICK_GAME);


        //旧的使用 暂时注掉
        // if (n.type == BagItemType.FORGE_PROP) {
        //     var o = a.getCurGunID();
        //     var r = T_Gun_Table.getVoByKey(o);
        //     if (r) {
        //         var s = r.upgradeOrForgeCost;
        //         var l = s.split(",");
        //         if (l.length > 1) {
        //             var u = new ForgeView(),
        //                 d = new ForgeMediator(u);
        //             return void Director.pushView(d)
        //         }
        //         var h = T_Gun_Table.getAllVo();
        //         return void (o != h[h.length - 1].id ? GameUtil.popTips(Language.getText(28)) : GameUtil.popTips(Language.getText(2440)))
        //     }
        // } else {
        // }
        //旧的使用 暂时注掉end-------------
    }
    public sellItem(e, t) {
        var t = e;
        var msg: SellItemReq = new SellItemReq();
        msg.initData();
        msg.setSellCount(Number(t.itemNum));
        msg.setSellitemId(Number(t.itemId));
        NetManager.send(msg, MsgActionDefine.SellItemReq);
    }
    /**
     * 显示出售物品view
     */
    public showSellItem(e, t) {
        var i = Number(e),
            n = T_Item_Table.getVoByKey(i),
            a = Director.getModelByKey(UserModel),
            o = a.getItemById(i);

        var s = t.getView(), l = CONFIG.contentWidth, u = CONFIG.contentHeight;
        t._sellView = new SellView(i, t._nReceiveId);
        t._sellView.setParent(s);
        t._sellView.anchorOffsetX = t._sellView.width / 2;
        t._sellView.anchorOffsetY = t._sellView.height / 2;
        t._sellView.x = l / 2;
        t._sellView.y = u / 2;
        s && s.addChild(t._sellView);

    }
    /**赠送物品 */
    public sendItem(e, t) {
        var i = Number(e),
            n = T_Item_Table.getVoByKey(i),
            a = Director.getModelByKey(UserModel),
            o = a.getItemById(i);
        //暂时注掉
        // if (o.getCount() < n.everyTimeLimit) {
        //     var r = new Array;
        //     return r.push(n.everyTimeLimit + ""),
        //         r.push(Language.getText(n.name) + ""),
        //         void GameUtil.popTips(Language.getDynamicText(37, r))
        // }
        var s = t.getView(), l = CONFIG.contentWidth, u = CONFIG.contentHeight;
        t._sendView = new SendView(i, t._nReceiveId);
        t._sendView.setParent(s);
        t._sendView.anchorOffsetX = t._sendView.width / 2;
        t._sendView.anchorOffsetY = t._sendView.height / 2;
        t._sendView.x = l / 2;
        t._sendView.y = u / 2;
        s && s.addChild(t._sendView);
    }
    public sellItemBack(e) {
        var state = e.getState();
        this._sellView.onClosttButtonClick(null);
        if (state < 1) {
            GameUtil.popTips("出售失败1");//Language.getText(38)
        } else {
             GameUtil.popTips("出售成功");
         
            //更新list数据
            // var i = Director.getModelByKey(UserModel);
            // this.getView().setListData(i.getItemList())
        }
    }
    /** */
    public changeGunBack(e) {
        var t = e.getType();
        var i = e.getState();
        if (1 == i) {
            var n = Director.getModelByKey(UserModel);
            if (t != ChangeGunState.CHANGE_SKIN) {
                t == ChangeGunState.UNLOAD_ZUO && (n.setCurGunBgId(0), this.getView().setListData(n.getItemList()));
                return;
            }
            var a = e.getSkinId();
            var o = T_Item_Table.getVoByKey(a);
            o.type == BagItemType.BATTERY ? n.setCurSkinId(a) : o.type == BagItemType.BARBETTE && n.setCurGunBgId(a);
            this.getView().setListData(n.getItemList());
        }
    }

    public findUserBack(e) {
        if (0 != e.getState()) {
            if (this._sendView) {
                var t = e.getReceiveUserName();
                this._sendView.sendGiveMes(t);
            }
        } else GameUtil.popTips(Language.getText(49))
    }
    public refreshItemList(e) {
        // var i = new Item(this._curGiveID, this._curGiveNum);
        var n = Director.getModelByKey(UserModel);
        // n.updateItem(i.getItemId(), n.getItemById(i.getItemId()).getCount() - i.getCount());
        var t = this;
        t[1].getView().initView(n.getItemList());
        // if (- 1 != this._curGiveID) {
        //     var i = new Item(this._curGiveID, this._curGiveNum);
        //     var n = Director.getModelByKey(UserModel);
        //     n.updateItem(i.getItemId(), n.getItemById(i.getItemId()).getCount() - i.getCount());
        //     this.getView().initView(n.getItemList());
        //     GameUtil.popTips(Language.getText(50));
        // } else {
        //     GameUtil.popTips(Language.getText(51));
        // }
    }
    public giveItemBack(e) {
        var t = e.getState();

        if (t != SendItemState.SUC) {
            t == SendItemState.ITEM_NO_ENOUGH ? GameUtil.popTips(Language.getText(52)) : t == SendItemState.USER_BAG_MAX ? GameUtil.popTips(Language.getText(53)) : t == SendItemState.SEND_TIMES_MAX ? GameUtil.popTips(Language.getText(54)) : t == SendItemState.USER_TIMES_MAX ? GameUtil.popTips(Language.getText(55)) : t == SendItemState.CHARGE_NO_ENOUGH && GameUtil.popTips(Language.getText(128))
        } else {
            GameUtil.popTips(Language.getText(50));
        }
    }
    /**根据物品类型获取类型名称 */
    public getTypeNameByType(e) {
        switch (e) {
            case BagItemType.BASE:
                return "";
            case BagItemType.BATTERY:
                return Language.getText(16);
            case BagItemType.HAMMER:
                return Language.getText(17);
            case BagItemType.PROP_CARD:
                return Language.getText(18);
            case BagItemType.FISH_TICKET:
                return Language.getText(19);
            case BagItemType.WARHEAN:
                return Language.getText(20);
            case BagItemType.TEAM_PROP:
                return Language.getText(21);
            case BagItemType.FORGE_PROP:
                return Language.getText(22);
            case BagItemType.BARBETTE:
                return Language.getText(23);
            default:
                return ""
        }
    }
    /**销毁（注册的时间以及SOCKET消息） */
    public destroy() {
        this.getView().destroy();
        this.unsubscribByType(NotifyEnum.CLICK_BAG_ITEM);
        this.unsubscribByType(NotifyEnum.SEND_ITEM_TO_USER);
        this.unsubscribByType(NotifyEnum.USE_ITEM_BY_BAG);
        this.unsubscribByType(NotifyEnum.GIVE_ITEM_DATA);
        this.unsubscribByType(NotifyEnum.CHNAGE_RECEIVE_ID);
        this.unsubscribByType(NotifyEnum.UPDATE_ROOM_UI_COINS);
        this.unsubscribByType(NotifyEnum.UPDATE_ROOM_UI_MONEY);
        this.unsubscribByType(NotifyEnum.BAG_CHANGE_ITEM_INFO);
        MessageDispatcher.unregister(MsgActionDefine.GiveItemRes);
        MessageDispatcher.unregister(MsgActionDefine.FindUserRes);
        MessageDispatcher.unregister(MsgActionDefine.ChangeGunRes);
        MessageDispatcher.unregister(MsgActionDefine.SellItemRes);
        MessageDispatcher.unregister(MsgActionDefine.ShopBuyRes);
        // MessageDispatcher.unregister(MsgActionDefine.MajorParameterChange);
    }
}