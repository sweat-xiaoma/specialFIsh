class VipView extends PopView {
    public _bPop;
    public _btnWrapList;
    public _uiDisplay;
    public _vipItemUI;
    public _showV_lv;
    public constructor() {
        super();
        this._btnWrapList = new Array;
    }
    public addBgResource () {
        var e = this,
        t = new eui.UILayer;
        this.addChild(t);
        var i = new VipCom;
        this._uiDisplay = i,
        this._uiDisplay.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipUI.exml",
        this._uiDisplay.horizontalCenter = 0,
        this._uiDisplay.verticalCenter = 0,
        t.addChild(this._uiDisplay),
        this._bPop || (UIUtil.popView(this._uiDisplay.root), this._bPop = !0);
        var n = this._uiDisplay.btnClose;
        n.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this),
        this._uiDisplay.chargeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCharge, this);
         this._uiDisplay.btnZuo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.zuoMove, this);
          this._uiDisplay.btnYou.addEventListener(egret.TouchEvent.TOUCH_TAP, this.youMove, this);
        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnClose));

        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnZuo));
        this._btnWrapList.push(new UIWrap(this._uiDisplay.btnYou));


        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipItem.exml",
        function() {
            RES.getResAsync("vipShow_png",
            function() {
                RES.getResAsync("vipShow_fnt",
                function() {
                    e.setData()
                },
                e)
            },
            e)
        },
        this)
    }
    public zuoMove(e):void{
        this._showV_lv --;
        if(this._showV_lv <= 0){
            this._showV_lv = T_VipLevel_Table.getAllVo().length-1;
        }
        this._uiDisplay.listGroup.removeChildren();
        this._vipItemUI = new VipItemUI(T_VipLevel_Table.getAllVo()[this._showV_lv ], this._showV_lv );
        this._uiDisplay.listGroup.addChild(this._vipItemUI);
    }
    public youMove(e):void{
        this._showV_lv ++;
        if( this._showV_lv >= T_VipLevel_Table.getAllVo().length){
            this._showV_lv = 1;
        }
        this._uiDisplay.listGroup.removeChildren();
         this._vipItemUI = new VipItemUI(T_VipLevel_Table.getAllVo()[this._showV_lv ], this._showV_lv );
        this._uiDisplay.listGroup.addChild(this._vipItemUI);
    }
    public setData () {
        var e = Director.getModelByKey(UserModel);

        var t = e.getVipLevel()+1;
        var i = e.getTatolChargeRMB();
        this._uiDisplay.listGroup.removeChildren();
        var n = T_VipLevel_Table.getAllVo();
        if(t == 0){
            this._showV_lv = 1;
        }else{
            this._showV_lv = t;
        }
            
        this._vipItemUI = new VipItemUI(n[this._showV_lv ], this._showV_lv );
        this._uiDisplay.listGroup.addChild(this._vipItemUI);
        var  o = n[this._showV_lv ].vipLevel;
            
        var l = new eui.HorizontalLayout;
        this._uiDisplay.listGroup.layout = l;
        var u = new egret.BitmapText;
        u.font = RES.getRes("vipShow_fnt"),
        u.text = String(t),
        this._uiDisplay.vipCurGroup.addChild(u),
        u.textAlign = egret.HorizontalAlign.CENTER,
        u.anchorOffsetX = u.width / 2,
        u.anchorOffsetY = u.height / 2;
        var d = new egret.BitmapText;


       this._uiDisplay. rmb_txt.text = "10元";
       this._uiDisplay.vip_lv_ico.source = "c_"+t+"_png";

        if (d.font = RES.getRes("vipShow_fnt"), d.text = String(t + 1), this._uiDisplay.vipNextGroup.addChild(d), d.textAlign = egret.HorizontalAlign.CENTER, d.anchorOffsetX = d.width / 2, d.anchorOffsetY = d.height / 2, t >= o) {
            var h = T_VipLevel_Table.getVoByKey(t - 1);
            var mm = (h.levelUpExp / h.levelUpExp)*100;
            this._uiDisplay.cur_350.value = mm;
            this._uiDisplay.cur_350.maximum = h.levelUpExp;//设置进度条的最大值
            this._uiDisplay.cur_350.minimum = h.levelUpExp;//设置进度条的最小

            // this._uiDisplay.vipNextGroup.visible = !0;
            // this._uiDisplay.nextVipIcon.visible = !0;
        } else {
            var h = T_VipLevel_Table.getVoByKey(t),
            c = T_VipLevel_Table.getVoByKey(t - 1);
            if (c) {
                var p = (h.levelUpExp / 100, i / 100),
                g = 1 * p / (h.levelUpExp / 100);
      
                this._uiDisplay.cur_350.value = 350 * g;
                this._uiDisplay.cur_350.maximum = h.levelUpExp;//设置进度条的最大值
                this._uiDisplay.cur_350.minimum = 0;//设置进度条的最小

                this._uiDisplay.vipNextGroup.visible = !0;
                 this._uiDisplay.nextVipIcon.visible = !0;
            } else {
                var p = (h.levelUpExp / 100, i / 100),
                g = 1 * p / (h.levelUpExp / 100);
                var _ = new Array;


                this._uiDisplay.cur_350.value = 350 * g;
                this._uiDisplay.cur_350.maximum = h.levelUpExp;//设置进度条的最大值
                this._uiDisplay.cur_350.minimum = 0;//设置进度条的最小
            }
        }
    }
    public onClosttButtonClick(e) {
        Director.popView()
    }
    public onCharge = function(e) {
        Director.popView();
        // var t = new ChargeView(ChargeType.Ticket),
        // i = new ChargeMediator(t);
        // Director.pushView(i)
    }
    public initView = function() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipUI.exml", this.addBgResource, this)
    }
    public destroy () {
        var e = this;
        this._bPop = !1,
        UIUtil.closeView(this._uiDisplay.root,
        function() {
            for (; e._btnWrapList.length > 0;) {
                var t = e._btnWrapList.pop();
                t.destroy()
            }
            e._uiDisplay.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, e.onClosttButtonClick, e),
            e._uiDisplay.chargeGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, e.onCharge, e),
            e.parent.removeChild(e),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipUI.exml"),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipItem.exml"),
            RES.destroyRes("vipShow_png"),
            RES.destroyRes("vipShow_fnt")
        })
    }

} 