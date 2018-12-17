class MonthCardView extends PopView {
    public _bShow;
    public _btnWrapList;
    public _uiDisplay;
    public _bPop;
    public _nIdx;
    public _item_list;
    public _name_list;
  	public constructor() {
		super();
        var i = this;
         i._bShow = 0,
        this._bPop = !1,
        this._nIdx = -1;
        i._btnWrapList = new Array,
        UIUtil.startLoading();
	}
    public addBgResource (e, t) {
        UIUtil.closeLoading();
        var i = new eui.UILayer;
        this.addChild(i);
        var n = new MonthCardCom;
        this._uiDisplay = n,
        this._uiDisplay.skinName = e,
        this._uiDisplay.horizontalCenter = 0,
        this._uiDisplay.verticalCenter = 0,
        i.addChild(this._uiDisplay),
        this._bPop || (UIUtil.popView(this._uiDisplay.root), this._bPop = !0),
        this._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
        this._uiDisplay.gainCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGain, this),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnClose)),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.gainCard)),

        this._item_list = [this._uiDisplay.item_1,this._uiDisplay.item_2,this._uiDisplay.item_3,this._uiDisplay.item_4,this._uiDisplay.item_5,this._uiDisplay.item_6];
         this._name_list = [this._uiDisplay.name1_txt,this._uiDisplay.name2_txt,this._uiDisplay.name3_txt,this._uiDisplay.name4_txt,this._uiDisplay.name5_txt,this._uiDisplay.name6_txt];

        this._bPop = !0;
        UIUtil.popView(this._uiDisplay);
        this.setData()
    }
    
    public setData() {
        var e = Director.getModelByKey(UserModel),
        t = e.getMonthEndTime() - TimeUtil.getCurrTime();
        if (t > 0) {
            var i = TimeUtil.sceondsMonthCard(t);
            this._uiDisplay.remainLab.text = i,
            this._uiDisplay.renewTxt.visible = !0,
            this._uiDisplay.getMonthTxt.visible = !1
        } else {
            this._uiDisplay.renewTxt.visible = !1;
        }

        this._uiDisplay.getMonthTxt.visible = !0,
        this._uiDisplay.remainLab.text = "当前没有月卡";


        var n = this;
            var t_sign = T_MonthSign_Table.getAllVo();
            var k = 0;
            for(var m:any = 0 ;m < 6 ; m++){
                IconUtil.getIconByIdAsync(IconType.PROP,20001,
                 function(e) {
                        if(e!=null){
                            // console.log(e);
                            //   console.log(k);
                            //     console.log(n._item_list[k]);
                            //     console.log(n._name_list[k]);
                            e.x = (n._item_list[k].width - e.width  )/2>>0;
                            e.y = ( n._item_list[k].height - e.height )/2>>0 -30;
                            n._item_list[k].addChild(e);

                            var a = T_Item_Table.getVoByKey(20001);
                            n._name_list[k].text =  Language.getText(a.name);
                        }
                        k++;
                 })
            }
    }
    public onClosttButtonClick (e) {
       //Director.popView();
        this.destroy();
        this._bShow && this.send(NotifyEnum.CHECK_POP);
    }
    public onGain (e) {
        if (this._bShow) return Director.popView(),
        void this.send(NotifyEnum.CHECK_POP);
        for (var t = T_Charge_Table.getAllVo(), i = t.length, n = null, a = 0; i > a; a++) if (4 == t[a].type) {
            n = t[a];
            break
        }
        // var o = new ChargeSendMessage;
        // o.initData(),
        // o.setChargeId(n.id);
       // NetManager.send(o)
    }
    public initView = function() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/monthCard/MonthCardUI.exml", this.addBgResource, this)
    }
    public destroy () {
        var e = this;
        this._bPop = !1,
        UIUtil.closeView(this._uiDisplay,
        function() {
            for (; e._btnWrapList.length > 0;) {
                var t = e._btnWrapList.pop();
                t.destroy()
            }
            e._uiDisplay.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onClosttButtonClick, e),
            e._uiDisplay.gainCard.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onGain, e),
            e.parent.removeChild(e),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/monthCard/MonthCardUI.exml")
        })
    }
}
