class RankView extends PopView {
    private _btnWrapList;
    _uiDisplay;

    public constructor() {
        super();
        this._btnWrapList = new Array();
    }
    public initView() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/rank/RankUI.exml", this.addBgResource, this)
    }
    public addBgResource(e, t) {
        var i = new eui.UILayer;
        this.addChild(i);
        var n = new RankUI();
        this._uiDisplay = n;
        this._uiDisplay.skinName = e;
        this._uiDisplay.horizontalCenter = 0;
        this._uiDisplay.verticalCenter = 0;
        i.addChild(this._uiDisplay);
        this._uiDisplay.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._btnWrapList.push(new UIWrap(this._uiDisplay.jinbiBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.yingliBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.jingjiBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.jingjiZhouBtn));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.closeBtn));
        
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/rank/RankItem.exml",
            function () {
                this._uiDisplay.jinbiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeJinBi, this);
                this._uiDisplay.yingliBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeYinLi, this);
                this._uiDisplay.jingjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeJingJi, this);
                this._uiDisplay.jingjiZhouBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeJingJiZhou, this);
                var a = Director.getModelByKey(UserModel);
                this.onChangeJinBi(null)
            },
            this);

    }

    public onChangeJinBi(e) {
        this._uiDisplay.jinbiSelImg.visible = !0;
        this._uiDisplay.yingliSelImg.visible = !1;
        this._uiDisplay.jingjiSelImg.visible = !1;
        this._uiDisplay.jingjiZhouSelImg.visible = !1;
        this.send(NotifyEnum.SET_RANK_LIST, {
            type: 1
        })
    }

    public onChangeYinLi(e) {
        this._uiDisplay.jinbiSelImg.visible = !1;
        this._uiDisplay.yingliSelImg.visible = !0;
        this._uiDisplay.jingjiSelImg.visible = !1;
        this._uiDisplay.jingjiZhouSelImg.visible = !1;
        this.send(NotifyEnum.SET_RANK_LIST, {
            type: 2
        })
    }

    public onChangeJingJi(e) {
        this._uiDisplay.jinbiSelImg.visible = !1;
        this._uiDisplay.yingliSelImg.visible = !1;
        this._uiDisplay.jingjiSelImg.visible = !0;
        this._uiDisplay.jingjiZhouSelImg.visible = !1;
        this.send(NotifyEnum.SET_RANK_LIST, {
            type: 3
        })
    }

    public onChangeJingJiZhou(e) {
        this._uiDisplay.jinbiSelImg.visible = !1;
        this._uiDisplay.yingliSelImg.visible = !1;
        this._uiDisplay.jingjiSelImg.visible = !1;
        this._uiDisplay.jingjiZhouSelImg.visible = !0;
        this.send(NotifyEnum.SET_RANK_LIST, {
            type: 4
        })
    }



    public changeList(e) {
        if (e.length == null || e.length == 0)
            return;
        this._uiDisplay.scrolGroup.removeChildren();
        var t = this;
        for (var i = 0; i < e.length; i++) {
            var n = new RankItem();
            n.setData(e[i]);
            t._uiDisplay.scrolGroup.addChild(n)
        }
    }
    public setUserInfo(value) {
        if (value == null)
            return;
        this._uiDisplay.rankImg.visible = false;
        this._uiDisplay.rankImg1.visible = false;
        this._uiDisplay.rankImg2.visible = false;

        if (value.rankOrder <= 3) {
            switch (value.rankOrder) {
                case 1:
                    this._uiDisplay.rankImg.visible = true;
                    this._uiDisplay.rankImg1.visible = false;
                    this._uiDisplay.rankImg2.visible = false;
                    break;
                case 2:
                    this._uiDisplay.rankImg.visible = false;
                    this._uiDisplay.rankImg1.visible = true;
                    this._uiDisplay.rankImg2.visible = false;
                    break;
                case 3:
                    this._uiDisplay.rankImg.visible = false;
                    this._uiDisplay.rankImg1.visible = false;
                    this._uiDisplay.rankImg2.visible = true;
                    break;
            }
        } else if (value.rankOrder <= 50) {
            this._uiDisplay.orderOther.text = value.rankOrder.toString()
        } else if (value.rankOrder == 0) {
            this._uiDisplay.orderOther.text = "（未上榜）";
        }
        var t = this._uiDisplay;
        this._uiDisplay.nameLab1.text = value.userName;
        this._uiDisplay.numLal1.text = value.rankNum;
        t.headGroup.removeChildren();
        IconUtil.getHeadIcon(this._uiDisplay.headUrl, function (b) {
            if (b) {
                b.x = (95- b.width)/2;
                b.y = (95 - b.height)/2;
                t.headGroup.addChild(b);
            }
        });
        if (value.prizeInfo || value.prizeInfo.length > 0) {
            this._uiDisplay.rewardNumTxt.text = value.prizeInfo[0].totalCount.toString();
            IconUtil.getIconByIdAsync(IconType.PROP, value.prizeInfo[0].itemId, function (v) {
                if (v) {
                    v.width = 40;
                    v.height = 40;
                    t.rewardImg.addChild(v);
                }
            });
        }
    }

    public onClosttButtonClick(e) {
        Director.popView()
    }



    public destroy() {
        for (; this._btnWrapList.length > 0;) {
            var e = this._btnWrapList.pop();
            e.destroy()
        }
        this._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.jinbiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeJinBi, this);
        this._uiDisplay.yingliBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeYinLi, this);
        this._uiDisplay.jingjiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeJingJi, this);
        this._uiDisplay.jingjiZhouBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeJingJiZhou, this);
        this.parent && this.parent.removeChild(this);
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/rank/RankUI.exml");
        RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/rank/RankItem.exml");
    }
}