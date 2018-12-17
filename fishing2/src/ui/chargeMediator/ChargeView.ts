class ChargeView extends  PopView{
    public _btnWrapList;
    public _nType;
    public _toType;
    public _uiDisplay;
    private _curVipFont;
    public _maxVipFont;
    public constructor(t) {
        super();
        this._btnWrapList = new Array,
        this._nType = -1;
        this._toType = t;
    }
    public addBgResource (e, t) {
        var i = this,
        n = new eui.UILayer;
        this.addChild(n);
        var a = new ChargeUI;
        this._uiDisplay = a,
        this._uiDisplay.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeUI.exml",
        this._uiDisplay.horizontalCenter = 0,
        this._uiDisplay.verticalCenter = 0,
        n.addChild(this._uiDisplay),
        UIUtil.popView(this._uiDisplay.root);
        var o = this._uiDisplay.closeBtn;
        var m = this._uiDisplay.gold_btn;
        var k = this._uiDisplay.zuanshi_btn;
        m.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeType_gold, this);
        k.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeType_zhuanshi, this);
        //  this._uiDisplay.listGroup. scrollEnabled = true;
        this.onChangeType_gold(null);
        o.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosttButtonClick, this);

      
        this._btnWrapList.push(new UIWrap(this._uiDisplay.closeBtn));
             this.setData1();

    }
    public onChangeType_gold (e) {
        this._uiDisplay.type_1.source = "biaoqian_normal_png";
        this._uiDisplay.type_2.source = "biaoqian_normal_png";
        this._uiDisplay.type_1.source = "biaoqian_select_png";
        this.showDataList("gold")
    
    }
    public onChangeType_zhuanshi (e) {
        this._uiDisplay.type_1.source = "biaoqian_normal_png";
        this._uiDisplay.type_2.source = "biaoqian_normal_png";
        this._uiDisplay.type_2.source = "biaoqian_select_png";
        this.showDataList("zuanshi")
    }
    private _showV_lv;
    public setData1 () {
        var e = Director.getModelByKey(UserModel);

        var t = e.getVipLevel()+1;
        var i = e.getTatolChargeRMB();
        var n = T_VipLevel_Table.getAllVo();
        if(t == 0){
            this._showV_lv = 1;
        }else{
            this._showV_lv = t;
        }
        var  o = n[this._showV_lv ].vipLevel;
        var l = new eui.HorizontalLayout;
        this._uiDisplay.listGroup.layout = l;

        var d = new egret.BitmapText;
       this._uiDisplay. rmb_txt.text = "10元";
       this._uiDisplay.vip_lv_ico.source = "c_"+t+"_png";

       this._uiDisplay.vip_ico_now.source = "c_"+t+"_png";
       this._uiDisplay.vip_ico_next.source = "c_"+(t+1)+"_png";

        if ( t >= o) {
            var h = T_VipLevel_Table.getVoByKey(t - 1);
            var mm = (h.levelUpExp / h.levelUpExp)*100;
            this._uiDisplay.cur_350.value = mm;
            this._uiDisplay.cur_350.maximum = h.levelUpExp;//设置进度条的最大值
            this._uiDisplay.cur_350.minimum = h.levelUpExp;//设置进度条的最小

         
        } else {
            var h = T_VipLevel_Table.getVoByKey(t),
            c = T_VipLevel_Table.getVoByKey(t - 1);
            if (c) {
                var p = (h.levelUpExp / 100, i / 100),
                g = 1 * p / (h.levelUpExp / 100);
      
                this._uiDisplay.cur_350.value = 350 * g;
                this._uiDisplay.cur_350.maximum = h.levelUpExp;//设置进度条的最大值
                this._uiDisplay.cur_350.minimum = 0;//设置进度条的最小
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
    public showDataList (e) {
        var tt = T_Charge_Table.getAllVo();
        this._uiDisplay.group.removeChildren();
        for(var i:any = 0 ; i < tt.length ;i++){
            var dd = new ChargeItemUI;
            dd.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeItem.exml";
            dd.x = i%2 * (dd.width+45);
            dd.y = Math.floor(i/2) * (dd.height+20);
            dd.setData(tt[i]);
            this._uiDisplay.group.addChild(dd);
        }
         this._uiDisplay.listGroup.addChild(this._uiDisplay.group);
    

        // var g = new eui.VerticalLayout;
        // g.gap = 50,
        // this._uiDisplay.group.layout = g,
        // this._uiDisplay.group.anchorOffsetX = this._uiDisplay.listGroup.width / 2,
        // this._uiDisplay.group.anchorOffsetY = this._uiDisplay.listGroup.height / 2

    }
    public initData (e, t, i, n) {
        // this._curVipFont.text = e + "",
        // this._maxVipFont.text = t + "",
        // this._uiDisplay.proTxt.text = i + "/" + n;
        // var a = 1 * i / n;
        // if (this._uiDisplay.proCur_228.width = 228 * a, t > e) {
        //     var o = T_VipLevel_Table.getVoByKey(e),
        //     r = o.levelUpExp / 100,
        //     s = new Array,
        //     l = r - i;
        //     s.push(l + ""),
        //     s.push(t + ""),
        //     this._uiDisplay.txt.text = Language.getDynamicText(121, s)
        // } else {
        //     this._uiDisplay.txt.text = Language.getText(176),
        //     this._uiDisplay.nextVipIcon.visible = !1,
        //     this._uiDisplay.vipNextGroup.visible = !1,
        //     this._uiDisplay.proCur_228.width = 228;
        //     var u = Director.getModelByKey(UserModel),
        //     d = u.getVipLevel(),
        //     h = T_VipLevel_Table.getVoByKey(d - 1);
        //     this._uiDisplay.proTxt.text = h.levelUpExp / 100 + "/" + h.levelUpExp / 100
        // }
    }
    public initView () {
        var e = this;
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeItem.exml",
        function() {
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeUI.exml", e.addBgResource, e)
        },
        this)
    }
    public onClosttButtonClick (e) {
        Director.popView()
    }
    public onShowPrivilege (e) {
        Director.popView();
        var t = new VipView,
        i = new VipMediator(t);
        Director.pushView(i)
    }

    public destroy () {
        var e = this;
        UIUtil.closeView(this._uiDisplay.root,
        function() {
            for (; e._btnWrapList.length > 0;) {
                var t = e._btnWrapList.pop();
                t.destroy()
            }
            for (var i = e._uiDisplay.listGroup.numChildren,
            n = 0; i > n; n++) {
                // var a = e._uiDisplay.listGroup.getElementAt(n);
                // a.clearItem()
            }
            e._uiDisplay.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onClosttButtonClick, e),
            e._uiDisplay.gold_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onChangeType_gold, e),
            e._uiDisplay.zuanshi_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onChangeType_zhuanshi, e),
            // e._uiDisplay.showPrivilege.removeEventListener(egret.TouchEvent.TOUCH_TAP, e.onShowPrivilege, e),
            e.parent && e.parent.removeChild(e),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeUI.exml"),
            RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/charge/ChargeItem.exml")
        })
    }

}