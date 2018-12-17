class SignView extends PopView {
    public _bPop;
    public _btnWrapList;
     public _uiDisplay;
     /**签到道具奖励显示 */
     public _qiandao_item_list;
     public lianxu_item_list;
     public _qiandao_item_num_list;
     public _nIdx;
    public constructor() {
        super();
        var t =  this;
        t._bPop = !1,
        t._nIdx = -1;
        t._btnWrapList = new Array,
        UIUtil.startLoading();
    }
    public addBgResource = function(e, t) {
        var i = this;
        UIUtil.closeLoading();
        var n = new eui.UILayer;
        this.addChild(n);
        var a = new SignCom;
        this._uiDisplay = a,
        this._uiDisplay.skinName = e,
        this._uiDisplay.horizontalCenter = 0,
        this._uiDisplay.verticalCenter = 0,
        n.addChild(this._uiDisplay);
        this._qiandao_item_list = [this._uiDisplay.qiandao_item_1,this._uiDisplay.qiandao_item_0,this._uiDisplay.qiandao_item_2,
                                  this._uiDisplay.qiandao_item_3,this._uiDisplay.qiandao_item_4,this._uiDisplay.qiandao_item_5,this._uiDisplay.qiandao_item_6];
        
        this._qiandao_item_num_list = [this._uiDisplay.num1_txt,this._uiDisplay.num0_txt,this._uiDisplay.num2_txt,
                                  this._uiDisplay.num3_txt,this._uiDisplay.num4_txt,this._uiDisplay.num5_txt,this._uiDisplay.num6_txt
                                  ]


        this.lianxu_item_list = [this._uiDisplay.lianxu_item_1,this._uiDisplay.lianxu_item_2,this._uiDisplay.lianxu_item_3];
        this._bPop = !0;
        UIUtil.popView(i._uiDisplay);
        

        this._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);
        this._uiDisplay.lingqu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);

        // this._uiDisplay.qiandao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQiandao, this),
        // this._uiDisplay.buqian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuqian, this),
        // this._uiDisplay.help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this),
        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnClose));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.lingqu));
        // this._btnWrapList.push(new UIWrap(this._uiDisplay.buqian)),
        // this._btnWrapList.push(new UIWrap(this._uiDisplay.help)),
        // EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/sign/SignItem.exml",
        // function() {
        //     i.send(NotifyEnum.SIGN_UI_LOADED)
        // },
        // this)
        this.setListData();
    }

    public setListData() {
         this._uiDisplay.v_item.source = "v_1_png";
          this._uiDisplay.progressBar.value = 6;
            this._uiDisplay.progressBar.maximum = 7;//设置进度条的最大值
            this._uiDisplay.progressBar.minimum = 0;//设置进度条的最小

            var n = this;
            var t_sign = T_MonthSign_Table.getAllVo();
            var k = 0;
            for(var i:any = 0 ;i < 7 ; i++){
                IconUtil.getIconByIdAsync(IconType.PROP,20001,
                 function(e) {
                        if(e!=null){
                            e.x = (n._qiandao_item_list[k].width - e.width  )/2>>0;
                            e.y = ( n._qiandao_item_list[k].height - e.height )/2>>0 -30;
                            n._qiandao_item_list[k].addChild(e);

                            n._qiandao_item_num_list[k].text = "x"+k;
                        }
                        k++;
                 })
            }
        var m = 0;
        for(var j:any = 0 ;j < 3 ; j++){
                IconUtil.getIconByIdAsync(IconType.PROP,20001,
                 function(e) {
                        if(e!=null){
                            e.x = (n.lianxu_item_list[m].width - e.width  )/2>>0;
                            e.y = ( n.lianxu_item_list[m].height - e.height )/2>>0;
                            n.lianxu_item_list[m].addChild(e);
                        }
                        m++;
                 })
            }
         
    }
    public onQiandao (e) {
        var t = Director.getModelByKey(UserModel),
        i = t.getSignObj().CurMonth(),
        n = new MonthSignSendMessage;
        n.initData(),
        n.setOperationType(0),
        n.setCurMonth(i);
        // NetManager.send(n)
    }
    public onBuqian (e) {
        var t = Director.getModelByKey(UserModel),
        i = t.getSignObj().CurMonth(),
        n = new MonthSignSendMessage;
        n.initData(),
        n.setOperationType(1),
        n.setCurMonth(i);
        // NetManager.send(n)
    }
    public onHelp (e) {
        // GameUtil.openCommonHelp(null, 1)
    }
    public onClosttButtonClick(e) {
        Director.popView()
    }
    public initView() {
         EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/sign/Sign.exml", this.addBgResource, this)
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
            e._uiDisplay.lingqu.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onQiandao, e),
            e.parent.removeChild(e),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/sign/Sign.exml");
        })
    }
} 