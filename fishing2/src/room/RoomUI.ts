class RoomUI extends eui.Component {
    private loadErrorCount = 0;
    private _bOpenSignView = !1;

    // 弹头
    public goldBulletBtn:NewProgresButton;
    public silverBulletBtn:NewProgresButton;
    public bronzeBulletBtn:NewProgresButton;
    public nuclearBulletBtn:NewProgresButton;

    private btnWrapList: any[];

    public chakanUI:ChakanPanelUI;

    ///// 金币和兑奖发光效果
    // private effect_Gold;
    // private effect_Arena;

    private waiting_0;
    private waiting_1;
    private waiting_2;
    private waiting_3;
    

    public addRateBtn_0;
    public addRateBtn_1;
    private backBtn;
    public reduceRateBtn_0;
    public reduceRateBtn_1;
    private bgMusicBtn;
    private soundEffectBtn;
    private sound_off;

    private music_off;
    private lotteryBtn; //抽奖
    private lotteryGroup; 
    private shopBtn;

    // private getCoinsBtn; //金币
    // private exchangeBtn; //兑奖
    private trumpetBtn;
    private unlockBtn;
    private fishkindBtn;
    private unlockGunGroup;

    private goldLab_num_0:egret.BitmapText;
    private goldLab_0;

    private pos_0;
    private pos_1;
    private pos_2;
    private pos_3;

    private goldLab_num_1;

    private cache_group_0;
    private group_0;
    private cache_group_1;
    private group_1;
    private cache_group_2;
    private group_2;
    private cache_group_3;
    private group_3;


    private goldLab_1;
    private gemLab_num_0;
    private gemLab_0;

    private rageLab_num_0;
    private rateLab_0;
    private rageLab_num_1;

    private rateLab_1;
    private rageLab_num_2;
    private rateLab_2;

    private rageLab_num_3;
    private rateLab_3;
    private gemLab_num_1;

    private gemLab_1;
    private goldLab_num_2;
    private goldLab_2;
    private gemLab_num_3;
    private gemLab_3;
    private fishCountTxt;
    private fishCountGroup;

    private bounsTxt;
    private bounsGroup;

    private gemLab_num_2;
    private gemLab_2;
    private goldLab_num_3;
    private goldLab_3;


    public gunList:GunTempleUI[];
    private gunList_0;
    private groupGun_0;
    private gunList_1;
    private groupGun_1;

    private gunList_2;
    private groupGun_2;

    private gunList_3;
    private groupGun_3;
    private avatarGunList;

    private gun_0_1;
    private groupGun_0_1;
    private gun_1_1;
    private groupGun_1_1;
    private gun_2_1;
    private groupGun_2_1;
    private gun_0_2;
    private groupGun_0_2;

    private gun_0_3;
    private groupGun_0_3;

    private gun_1_2;
    private groupGun_1_2;

    private gun_1_3;
    private groupGun_1_3;

    private gun_2_2;
    private groupGun_2_2;
    private gun_2_3;
    private groupGun_2_3;

    private gun_3_1;
    private groupGun_3_1;
    private gun_3_2;
    private groupGun_3_2;
    private gun_3_3;
    private groupGun_3_3;

    private zuoList;

    private zuoGroup_0;
    private zuoGroup_1;
    private zuoGroup_2;
    private zuoGroup_3;

    private _frozenAndLockUI;

    private _unlockGunUpdateUI;
    private _sidePropUI;
    private _guideTaskUI;

    private warUI;
    private warGroupPos;
    private goldGroup;
    private silverGroup;
    private bronzeGroup;
    private nuclearGroup;
    private bossBtn;

    // 免费抽奖
    private lottery_tips;
    private jiangjinyu_txt;
    private jjy_txt_bg;

    // 破产界面
    private _bankruptView:BankruptView;

    // 世界boss
    private bossTopGroup;
    private shieldTips;
    private shieldGroup;
    private shieldUI;

    //炮倍
    public gunRateGroup0:eui.Group;
    public gunRateBtnGroup0:eui.Group;
    public gunRateListGroup0:eui.Group;
    public gunRateScroller0:eui.Scroller;
    public gunRateList0:eui.List;
    private gunRateLabel0:eui.Label;
    private gunRateListBg0:eui.Image;
    public autoFire_btn0:eui.Group;
    public autoFireImg0:eui.Image;
    public stopAutoFireImg0:eui.Image;

    public gunRateGroup1:eui.Group;
    public gunRateBtnGroup1:eui.Group;
    public gunRateListGroup1:eui.Group;
    public gunRateScroller1:eui.Scroller;
    public gunRateList1:eui.List;
    private gunRateLabel1:eui.Label;
    private gunRateListBg1:eui.Image;
    public autoFire_btn1:eui.Group;
    public autoFireImg1:eui.Image;
    public stopAutoFireImg1:eui.Image;

    private gunRateLabel2:eui.Label;
    private gunRateLabel3:eui.Label;

    private gunRateListOpenState:boolean = false;

    private gold_eff_0;
    private gold_eff_1;
    private gold_eff_2;
    private gold_eff_3;

    public constructor(t) {
        super();
        this.skinName = t;
        this.anchorOffsetX = CONFIG.contentWidth / 2,
        this.anchorOffsetY = 370;
        this.x = egret.MainContext.instance.stage.stageWidth / 2,
        this.y = egret.MainContext.instance.stage.stageHeight / 2;
        // var n = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
        var _me = this;
        // TweenTools.rotation(n, 1e4),
        //     n.anchorOffsetX = n.width / 2,
        //     n.anchorOffsetY = n.height / 2,
        //     i.effect_Arena.addChild(n);
        // var a = new egret.Bitmap(RES.getRes("ef_rotation_bg_png"));
        // TweenTools.rotation(a, 1e4),
        //     a.anchorOffsetX = a.width / 2,
        //     a.anchorOffsetY = a.height / 2,
        //     i.effect_Gold.addChild(a),
        _me.btnWrapList = [];
        _me.setGunVisableByPos(RoomPosEnum.GUN_POS_0, !1);
        _me.setGunVisableByPos(RoomPosEnum.GUN_POS_1, !1);
        _me.setGunVisableByPos(RoomPosEnum.GUN_POS_2, !1);
        _me.setGunVisableByPos(RoomPosEnum.GUN_POS_3, !1);
        _me.reviseGun();

        _me.addRateBtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.modifPow, _me),
        _me.addRateBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.modifPow, _me),
        _me.reduceRateBtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.modifPow, _me),
        _me.reduceRateBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.modifPow, _me),
        _me.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.exitRoom, _me),
        _me.bgMusicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.bgMusic, _me),
        _me.soundEffectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.soundEffect, _me),
        _me.sound_off.visible = !SoundManager.getSoundEffectState(),
        _me.music_off.visible = !SoundManager.getBackgroundMusicState(),
        _me.lotteryBtn.visible = !1,
        _me.lotteryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.openLotteryGroup, _me),
        _me.lotteryGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.openLotteryView, _me),
        _me.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.openShopView, _me);
        _me.autoFire_btn0.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.autoFireSend, _me);
        _me.autoFire_btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.autoFireSend, _me);
        // i.getCoinsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, i.getCoins, i),
        // i.exchangeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, i.exchange, i),
        // _me.trumpetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _me.trumpet, _me),
        // _me.btnWrapList.push(new UIWrap(_me.trumpetBtn)),
        _me.btnWrapList.push(new UIWrap(_me.lotteryBtn)),
        _me.btnWrapList.push(new UIWrap(_me.unlockBtn)),
        // i.btnWrapList.push(new UIWrap(i.exchangeBtn)),
        // i.btnWrapList.push(new UIWrap(i.getCoinsBtn)),
        _me.btnWrapList.push(new UIWrap(_me.backBtn)),
        _me.btnWrapList.push(new UIWrap(_me.bgMusicBtn)),
        _me.btnWrapList.push(new UIWrap(_me.soundEffectBtn)),
        _me.btnWrapList.push(new UIWrap(_me.shopBtn)),
        _me.btnWrapList.push(new UIWrap(_me.fishkindBtn)),
        _me.btnWrapList.push(new UIWrap(_me.addRateBtn_0)),
        _me.btnWrapList.push(new UIWrap(_me.addRateBtn_1)),
        _me.btnWrapList.push(new UIWrap(_me.reduceRateBtn_0)),
        _me.btnWrapList.push(new UIWrap(_me.reduceRateBtn_1)),
        _me.initRateLab();
        this.initGunRateList();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
        RES.loadGroup("lottery");
        // EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/SideProp.exml", this.loadSideProp, this),
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/FrozenAndLock.exml", this.frozenAndLock, this);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/UnlockGunGroup.exml", this.unlockGunUpdate, this),
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Gun.exml", this.gunTemp, this);
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/WarGroup.exml", this.warLoaded, this),
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/ChakanPanel.exml", this.chakanLoaded, this);
        // this.setExchange();
        var o = Director.getModelByKey(UserModel);
        var r = o.getCurGunID();
        var s = T_Gun_Table.getVoByKey(r);
        if (s) {
            var l = s.upgradeOrForgeCost,
                u = l.split(",");
            u.length > 1 && this.setHideUnlock()
        }
        if (!CONFIG.openGuide) return this.addGuideTask(), this;
        for (var d = T_Config_Table.getVoByKey(49).value, h = o.getGuideID(), c = d.split(","), p = 0; p < c.length; p++) if (h >= Number(c[p])) return _me.addGuideTask(),
            this;
        for (var g = T_Config_Table.getVoByKey(46).value, _ = g.split(","), p = 0; p < _.length; p++) {
            var y = _[p].split("_");
            h >= Number(y[0]) && h <= Number(y[1]) && (_me.unlockGunGroup.visible = !1)
        }
        for (var m = T_Config_Table.getVoByKey(50).value, f = m.split(","), p = 0; p < f.length; p++) {
            var v = f[p].split("_");
            h >= Number(v[0]) && h <= Number(v[1]) && (_me.lotteryGroup.visible = !1)
        }
        for (var T = T_Config_Table.getVoByKey(48).value, E = T.split(","), p = 0; p < E.length; p++) {
            var I = E[p].split("_");
            h >= Number(I[0]) && h <= Number(I[1]) && _me.addGuideTask()
        }
    }

    public autoFireSend() {
        _Notification_.send(NotifyEnum.AUTO_GUN_FIRE);
    }

    public initGunRateList() {
        this.gunRateListGroup0.visible = false;
        this.gunRateListGroup1.visible = false;
        this.gunRateBtnGroup0.touchEnabled = true;
        this.gunRateBtnGroup0.touchChildren = false;
        this.gunRateBtnGroup1.touchEnabled = true;
        this.gunRateBtnGroup1.touchChildren = false;
        this.gunRateBtnGroup0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openGunRateSel, this);
        this.gunRateBtnGroup1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openGunRateSel, this);
        this.gunRateList0.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onGunRateListChange, this);
        this.gunRateList1.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onGunRateListChange, this);
    }

    private onGunRateListChange(e:eui.PropertyEvent):void {
        var data = e.currentTarget.selectedItem;
            // console.log(this.gunRateList1.selectedItem, this.gunRateList1.selectedIndex);
        _Notification_.send(NotifyEnum.CHANGE_GUN_RATE, data);
        if (e.currentTarget == this.gunRateList0) {
            this.gunRateListOpenState = false;
            this.gunRateListGroup0.visible = false;
        } else if (e.currentTarget == this.gunRateList1) {
            this.gunRateListOpenState = false;
            this.gunRateListGroup1.visible = false;
        } 
    }

    private openGunRateSel(e:egret.TouchEvent) {
        if (e.target == this.gunRateBtnGroup0) {
            this.gunRateListGroup1.visible = false;
            var listH:number = this.gunRateList0.dataProvider.length * 35 + 8;
            this.gunRateListBg0.height = listH;
            listH > 420 && (listH = 420);
            this.gunRateListGroup0.height = listH;
            this.gunRateListGroup0.y = -listH - 24;
            if (this.gunRateListOpenState) {
                this.gunRateListOpenState = false;
                this.gunRateListGroup0.visible = false;
                // this.gunRateList0.touchEnabled = false;
            } else {
                this.gunRateListOpenState = true;
                this.gunRateListGroup0.visible = true;
                // this.gunRateList0.touchEnabled = true;
            }
        } else if (e.target == this.gunRateBtnGroup1) {
            this.gunRateListGroup0.visible = false;
            var listH:number = this.gunRateList1.dataProvider.length * 35 + 8;
            this.gunRateListBg1.height = listH;
            listH > 420 && (listH = 420);
            this.gunRateListGroup1.height = listH;
            this.gunRateListGroup1.y = -listH - 24;
            if (this.gunRateListOpenState) {
                this.gunRateListOpenState = false;
                this.gunRateListGroup1.visible = false;
                // this.gunRateList1.touchEnabled = false;
            } else {
                this.gunRateListOpenState = true;
                this.gunRateListGroup1.visible = true;
                // this.gunRateList1.touchEnabled = true;
            }
        }
    }

    public changeGunRateListData(gunList:Array<T_Gun>) {
        this.gunRateList0.dataProvider = new eui.ArrayCollection(gunList);
        this.gunRateList1.dataProvider = new eui.ArrayCollection(gunList);
    }

    public addGuideTask() {
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/task/TaskGuide.exml", this.guideTaskLoaded, this);
        Guide.isOpentask = !0;
    }
    public guideTaskLoaded(e, t) {
        // var i = Director.getModelByKey(TaskModel),
        // n = (i.getTaskListByType(TaskType.TASK_TYPE_NEWBIE), i.getTaskListByType(TaskType.TASK_TYPE_PRICE));
        // n.length > 0 || (this._guideTaskUI = new GuideTaskUI, this._guideTaskUI.anchorOffsetX = this._guideTaskUI.width / 2, this._guideTaskUI.anchorOffsetY = 0, this.guideTaskGroup.addChild(this._guideTaskUI), _Notification_.send(NotifyEnum.TASK_GUIDE_PANEL_LOADED))
    }
    public chakanLoaded(e, t) {
        this.chakanUI = new ChakanPanelUI();
        this.chakanUI.anchorOffsetX = this.chakanUI.width / 2,
        this.chakanUI.anchorOffsetY = this.chakanUI.height,
        this.chakanUI.x = -500,
        this.chakanUI.y = -500,
        this.addChild(this.chakanUI),
        this.bShowChakan = false;
    }
    public warLoaded(e, t) {
        this.warUI = new WarView,
        this.warUI.anchorOffsetX = this.warUI.width,
        this.warUI.anchorOffsetY = this.warUI.height / 2,
        this.warGroupPos.addChild(this.warUI),
        this.goldGroup = this.warUI.goldBulletGroup,
        this.silverGroup = this.warUI.silverBulletGroup,
        this.bronzeGroup = this.warUI.bronzeBulletGroup,
        this.nuclearGroup = this.warUI.nuclearBulletGroup,
        this.warUI.closeWarGroupBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this),
        EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/newProgressButton.exml", this.loadedButton, this)
    }

    /** 加载弹头按钮 */
    public loadedButton(e, t) {
        this.goldBulletBtn = new NewProgresButton(e, "goldWarBtn"),
        this.goldBulletBtn.setButtonClickFun(function() {
            _Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.GOLD_WARHEAD)
        });
        var i = T_Config_Table.getVoByKey(86),
        n = 20;
        i && (n = Number(i.value)),
        this.goldBulletBtn.setIcon("goldWarBtn_png"),
        this.goldBulletBtn.setTypeWar(),
        this.goldBulletBtn.setTimeTotal(n);
        var a = T_Item_Table.getVoByKey(PropEnum.GOLD_WARHEAD),
        o = a.worth.split("_")[2];
        this.goldBulletBtn.setGemCost(o),
        this.goldBulletBtn.anchorOffsetX = this.goldBulletBtn.width / 2,
        this.goldBulletBtn.anchorOffsetY = this.goldBulletBtn.height / 2,
        this.goldGroup.addChild(this.goldBulletBtn),

        this.silverBulletBtn = new NewProgresButton(e, "silverWarBtn"),
        this.silverBulletBtn.setButtonClickFun(function() {
            _Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.SILVER_WARHEAD)
        }),
        this.silverBulletBtn.setIcon("silverWarBtn_png"),
        this.silverBulletBtn.setTypeWar(),
        this.silverBulletBtn.setTimeTotal(n);
        var r = T_Item_Table.getVoByKey(PropEnum.SILVER_WARHEAD),
        s = r.worth.split("_")[2];
        this.silverBulletBtn.setGemCost(s),
        this.silverBulletBtn.anchorOffsetX = this.silverBulletBtn.width / 2,
        this.silverBulletBtn.anchorOffsetY = this.silverBulletBtn.height / 2,
        this.silverGroup.addChild(this.silverBulletBtn),

        this.bronzeBulletBtn = new NewProgresButton(e, "tongWarBtn"),
        this.bronzeBulletBtn.setButtonClickFun(function() {
            _Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.BRONZE_WARHEAD)
        }),
        this.bronzeBulletBtn.setIcon("tongWarBtn_png"),
        this.bronzeBulletBtn.setTypeWar(),
        this.bronzeBulletBtn.setTimeTotal(n);
        var l = T_Item_Table.getVoByKey(PropEnum.BRONZE_WARHEAD),
        u = l.worth.split("_")[2];
        this.bronzeBulletBtn.setGemCost(u),
        this.bronzeBulletBtn.anchorOffsetX = this.bronzeBulletBtn.width / 2,
        this.bronzeBulletBtn.anchorOffsetY = this.bronzeBulletBtn.height / 2,
        this.bronzeGroup.addChild(this.bronzeBulletBtn),

        this.nuclearBulletBtn = new NewProgresButton(e, "tongWarBtn"),
        this.nuclearBulletBtn.setButtonClickFun(function() {
            _Notification_.send(NotifyEnum.USE_WARHEAD, PropEnum.NUCLEAR_WARHEAD)
        }),
        this.nuclearBulletBtn.setIcon("tongWarBtn_png"),
        this.nuclearBulletBtn.setTypeWar(),
        this.nuclearBulletBtn.setTimeTotal(n);
        var d = T_Config_Table.getVoByKey(83).value,
        h = Director.getModelByKey(UserModel);
        h.getVipLevel() < Number(d) ? this.nuclearBulletBtn.lockedImg.visible = !0 : this.nuclearBulletBtn.lockedImg.visible = !1;
        var c = T_Item_Table.getVoByKey(PropEnum.NUCLEAR_WARHEAD),
        p = c.worth.split("_")[2];
        this.nuclearBulletBtn.setGemCost(p),
        this.nuclearBulletBtn.anchorOffsetX = this.nuclearBulletBtn.width / 2,
        this.nuclearBulletBtn.anchorOffsetY = this.nuclearBulletBtn.height / 2,
        this.nuclearGroup.addChild(this.nuclearBulletBtn);
        var g = h.getItemById(PropEnum.GOLD_WARHEAD),
        _ = h.getItemById(PropEnum.SILVER_WARHEAD),
        y = h.getItemById(PropEnum.BRONZE_WARHEAD),
        m = h.getItemById(PropEnum.NUCLEAR_WARHEAD),
        f = 0,
        v = 0,
        T = 0,
        E = 0;
        g && (f = g.getCount()),
        _ && (v = _.getCount()),
        y && (T = y.getCount()),
        m && (E = m.getCount()),
        this.goldBulletBtn.setNum(String(f)),
        this.silverBulletBtn.setNum(String(v)),
        this.bronzeBulletBtn.setNum(String(T)),
        this.nuclearBulletBtn.setNum(String(E))
    }

    public initRateLab() {
        this.rageLab_num_0 = new egret.BitmapText,
        this.rageLab_num_0.font = RES.getRes("small_num_font_fnt"),
        this.rageLab_num_0.text = String("1"),
        this.rateLab_0.addChild(this.rageLab_num_0),
        this.rageLab_num_0.textAlign = egret.HorizontalAlign.CENTER,
        this.rageLab_num_0.anchorOffsetX = this.rageLab_num_0.width / 2,
        this.rageLab_num_0.anchorOffsetY = this.rageLab_num_0.height / 2,
        this.rageLab_num_1 = new egret.BitmapText,
        this.rageLab_num_1.font = RES.getRes("small_num_font_fnt"),
        this.rageLab_num_1.text = String("1"),
        this.rateLab_1.addChild(this.rageLab_num_1),
        this.rageLab_num_1.textAlign = egret.HorizontalAlign.CENTER,
        this.rageLab_num_1.anchorOffsetX = this.rageLab_num_1.width / 2,
        this.rageLab_num_1.anchorOffsetY = this.rageLab_num_1.height / 2,
        this.rageLab_num_2 = new egret.BitmapText,
        this.rageLab_num_2.font = RES.getRes("small_num_font_fnt"),
        this.rageLab_num_2.text = String("1"),
        this.rateLab_2.addChild(this.rageLab_num_2),
        this.rageLab_num_2.textAlign = egret.HorizontalAlign.CENTER,
        this.rageLab_num_2.anchorOffsetX = this.rageLab_num_2.width / 2,
        this.rageLab_num_2.anchorOffsetY = this.rageLab_num_2.height / 2,
        this.rageLab_num_3 = new egret.BitmapText,
        this.rageLab_num_3.font = RES.getRes("small_num_font_fnt"),
        this.rageLab_num_3.text = String("1"),
        this.rateLab_3.addChild(this.rageLab_num_3),
        this.rageLab_num_3.textAlign = egret.HorizontalAlign.CENTER,
        this.rageLab_num_3.anchorOffsetX = this.rageLab_num_3.width / 2,
        this.rageLab_num_3.anchorOffsetY = this.rageLab_num_3.height / 2,
        this.goldLab_num_0 = new egret.BitmapText();
        this.goldLab_num_0.font = RES.getRes("mini_num_font_fnt"),
        this.goldLab_num_0.text = String("1");
        this.goldLab_0.addChild(this.goldLab_num_0);
        this.goldLab_num_0.textAlign = egret.HorizontalAlign.CENTER,
        this.goldLab_num_0.anchorOffsetX = this.goldLab_num_0.width / 2;
        this.goldLab_num_0.anchorOffsetY = this.goldLab_num_0.height / 2;
        this.goldLab_num_0.letterSpacing = -3;
        this.gemLab_num_0 = new egret.BitmapText,
        this.gemLab_num_0.font = RES.getRes("mini_num_font_fnt");
        this.gemLab_num_0.text = String("1"),
        this.gemLab_0.addChild(this.gemLab_num_0),
        this.gemLab_num_0.textAlign = egret.HorizontalAlign.CENTER,
        this.gemLab_num_0.anchorOffsetX = this.gemLab_num_0.width / 2,
        this.gemLab_num_0.anchorOffsetY = this.gemLab_num_0.height / 2,
        this.goldLab_num_1 = new egret.BitmapText,
        this.goldLab_num_1.font = RES.getRes("mini_num_font_fnt"),
        this.goldLab_num_1.text = String("1");
        this.goldLab_1.addChild(this.goldLab_num_1),
        this.goldLab_num_1.textAlign = egret.HorizontalAlign.CENTER,
        this.goldLab_num_1.anchorOffsetX = this.goldLab_num_1.width / 2,
        this.goldLab_num_1.anchorOffsetY = this.goldLab_num_1.height / 2;
        this.goldLab_num_1.letterSpacing = -3;
        this.gemLab_num_1 = new egret.BitmapText,
        this.gemLab_num_1.font = RES.getRes("mini_num_font_fnt"),
        this.gemLab_num_1.text = String("1"),
        this.gemLab_1.addChild(this.gemLab_num_1),
        this.gemLab_num_1.textAlign = egret.HorizontalAlign.CENTER,
        this.gemLab_num_1.anchorOffsetX = this.gemLab_num_1.width / 2,
        this.gemLab_num_1.anchorOffsetY = this.gemLab_num_1.height / 2,
        this.goldLab_num_2 = new egret.BitmapText,
        this.goldLab_num_2.font = RES.getRes("mini_num_font_fnt"),
        this.goldLab_num_2.text = String("2"),
        this.goldLab_2.addChild(this.goldLab_num_2),
        this.goldLab_num_2.textAlign = egret.HorizontalAlign.CENTER,
        this.goldLab_num_2.anchorOffsetX = this.goldLab_num_2.width / 2,
        this.goldLab_num_2.anchorOffsetY = this.goldLab_num_2.height / 2,
        this.goldLab_num_2.letterSpacing = -3;
        this.gemLab_num_2 = new egret.BitmapText,
        this.gemLab_num_2.font = RES.getRes("mini_num_font_fnt"),
        this.gemLab_num_2.text = String("1"),
        this.gemLab_2.addChild(this.gemLab_num_2),
        this.gemLab_num_2.textAlign = egret.HorizontalAlign.CENTER,
        this.gemLab_num_2.anchorOffsetX = this.gemLab_num_2.width / 2,
        this.gemLab_num_2.anchorOffsetY = this.gemLab_num_2.height / 2,
        this.goldLab_num_3 = new egret.BitmapText,
        this.goldLab_num_3.font = RES.getRes("mini_num_font_fnt"),
        this.goldLab_num_3.text = String("3"),
        this.goldLab_3.addChild(this.goldLab_num_3),
        this.goldLab_num_3.textAlign = egret.HorizontalAlign.CENTER,
        this.goldLab_num_3.anchorOffsetX = this.goldLab_num_3.width / 2,
        this.goldLab_num_3.anchorOffsetY = this.goldLab_num_3.height / 2,
        this.goldLab_num_3.letterSpacing = -3;
        this.gemLab_num_3 = new egret.BitmapText,
        this.gemLab_num_3.font = RES.getRes("mini_num_font_fnt"),
        this.gemLab_num_3.text = String("1"),
        this.gemLab_3.addChild(this.gemLab_num_3),
        this.gemLab_num_3.textAlign = egret.HorizontalAlign.CENTER,
        this.gemLab_num_3.anchorOffsetX = this.gemLab_num_3.width / 2,
        this.gemLab_num_3.anchorOffsetY = this.gemLab_num_3.height / 2,
        // this.fishCountTxt = new egret.BitmapText,
        // this.fishCountTxt.font = RES.getRes("bitmapNum_4_fnt"),
        this.fishCountTxt.text = String("1");
        // this.fishCountGroup.addChild(this.fishCountTxt);
        // this.fishCountTxt.textAlign = egret.HorizontalAlign.CENTER;
        // this.fishCountTxt.anchorOffsetX = this.fishCountTxt.width / 2,
        // this.fishCountTxt.anchorOffsetY = this.fishCountTxt.height / 2,
        // this.bounsTxt = new egret.BitmapText,
        // this.bounsTxt.font = RES.getRes("bitmapNum_4_fnt"),
        this.bounsTxt.text = String("1");
        // this.bounsGroup.addChild(this.bounsTxt),
        this.bounsTxt.textAlign = egret.HorizontalAlign.CENTER;
        // this.bounsTxt.anchorOffsetX = this.bounsTxt.width / 2,
        // this.bounsTxt.anchorOffsetY = this.bounsTxt.height / 2;
        var e = 1.1;
        this.goldLab_0.scaleX = e,
            this.goldLab_0.scaleY = e,
            this.goldLab_1.scaleX = e,
            this.goldLab_1.scaleY = e,
            this.goldLab_2.scaleX = e,
            this.goldLab_2.scaleY = e,
            this.goldLab_3.scaleX = e,
            this.goldLab_3.scaleY = e,
            this.gemLab_0.scaleX = e,
            this.gemLab_0.scaleY = e,
            this.gemLab_1.scaleX = e,
            this.gemLab_1.scaleY = e,
            this.gemLab_2.scaleX = e,
            this.gemLab_2.scaleY = e,
            this.gemLab_3.scaleX = e,
            this.gemLab_3.scaleY = e
    }


    /**炮台 */
    public gunTemp(e, t) {
        Director.getModelByKey(UserModel);
        this.gunList = new Array,
            this.gunList_0 = new GunTempleUI(e),
            this.gunList_0.anchorOffsetX = this.gunList_0.width / 2,
            this.gunList_0.anchorOffsetY = this.gunList_0.height,
            this.gunList_0.setRoomerPos(0),
            this.groupGun_0.addChild(this.gunList_0);

        this.gunList.push(this.gunList_0),
            this.gunList_1 = new GunTempleUI(e),
            this.gunList_1.anchorOffsetX = this.gunList_1.width / 2,
            this.gunList_1.anchorOffsetY = this.gunList_1.height,
            this.gunList_1.setRoomerPos(1),
            this.groupGun_1.addChild(this.gunList_1),
            this.gunList.push(this.gunList_1),
            this.gunList_2 = new GunTempleUI(e),
            this.gunList_2.anchorOffsetX = this.gunList_2.width / 2,
            this.gunList_2.anchorOffsetY = 0,
            this.gunList_2.setRoomerPos(2),
            this.groupGun_2.addChild(this.gunList_2),
            this.groupGun_2.rotation = 180,
            this.gunList.push(this.gunList_2),
            this.gunList_3 = new GunTempleUI(e),
            this.gunList_3.anchorOffsetX = this.gunList_3.width / 2,
            this.gunList_3.anchorOffsetY = 0,
            this.gunList_3.setRoomerPos(3),
            this.groupGun_3.addChild(this.gunList_3),
            this.groupGun_3.rotation = 180,
            this.gunList.push(this.gunList_3),
            this.avatarGunList = new Array;
        var i = new Array;
        this.gun_0_1 = new GunTempleUI(e),
            this.gun_0_1.anchorOffsetX = this.gun_0_1.width / 2,
            this.gun_0_1.anchorOffsetY = this.gun_0_1.height,
            this.gun_0_1.setRoomerPos(0),
            this.groupGun_0_1.addChild(this.gun_0_1),
            i.push(this.gun_0_1),
            this.gun_0_2 = new GunTempleUI(e),
            this.gun_0_2.anchorOffsetX = this.gun_0_2.width / 2,
            this.gun_0_2.anchorOffsetY = this.gun_0_2.height,
            this.gun_0_2.setRoomerPos(0),
            this.groupGun_0_2.addChild(this.gun_0_2),
            i.push(this.gun_0_2),
            this.gun_0_3 = new GunTempleUI(e),
            this.gun_0_3.anchorOffsetX = this.gun_0_3.width / 2,
            this.gun_0_3.anchorOffsetY = this.gun_0_3.height,
            this.gun_0_3.setRoomerPos(0),
            this.groupGun_0_3.addChild(this.gun_0_3),
            i.push(this.gun_0_3),
            this.gun_0_1.visible = !1,
            this.gun_0_2.visible = !1,
            this.gun_0_3.visible = !1,
            this.avatarGunList.push(i);
        var n = new Array;
        this.gun_1_1 = new GunTempleUI(e),
            this.gun_1_1.anchorOffsetX = this.gun_1_1.width / 2,
            this.gun_1_1.anchorOffsetY = this.gun_1_1.height,
            this.groupGun_1_1.addChild(this.gun_1_1),
            n.push(this.gun_1_1),
            this.gun_1_2 = new GunTempleUI(e),
            this.gun_1_2.anchorOffsetX = this.gun_1_2.width / 2,
            this.gun_1_2.anchorOffsetY = this.gun_1_2.height,
            this.groupGun_1_2.addChild(this.gun_1_2),
            n.push(this.gun_1_2),
            this.gun_1_3 = new GunTempleUI(e),
            this.gun_1_3.anchorOffsetX = this.gun_1_3.width / 2,
            this.gun_1_3.anchorOffsetY = this.gun_1_3.height,
            this.groupGun_1_3.addChild(this.gun_1_3),
            n.push(this.gun_1_3),
            this.gun_1_1.visible = !1,
            this.gun_1_2.visible = !1,
            this.gun_1_3.visible = !1,
            this.gun_1_1.setRoomerPos(1),
            this.gun_1_2.setRoomerPos(1),
            this.gun_1_3.setRoomerPos(1),
            this.avatarGunList.push(n);
        var a = new Array;
        this.gun_2_1 = new GunTempleUI(e),
            this.gun_2_1.anchorOffsetX = this.gun_2_1.width / 2,
            this.gun_2_1.anchorOffsetY = 0,
            this.groupGun_2_1.addChild(this.gun_2_1),
            this.groupGun_2_1.rotation = 180,
            a.push(this.gun_2_1),
            this.gun_2_2 = new GunTempleUI(e),
            this.gun_2_2.anchorOffsetX = this.gun_2_2.width / 2,
            this.gun_2_2.anchorOffsetY = 0,
            this.groupGun_2_2.addChild(this.gun_2_2),
            this.groupGun_2_2.rotation = 180,
            a.push(this.gun_2_2),
            this.gun_2_3 = new GunTempleUI(e),
            this.gun_2_3.anchorOffsetX = this.gun_2_3.width / 2,
            this.gun_2_3.anchorOffsetY = 0,
            this.groupGun_2_3.addChild(this.gun_2_3),
            this.groupGun_2_3.rotation = 180,
            a.push(this.gun_2_3),
            this.gun_2_1.visible = !1,
            this.gun_2_2.visible = !1,
            this.gun_2_3.visible = !1,
            this.gun_2_1.setRoomerPos(2),
            this.gun_2_2.setRoomerPos(2),
            this.gun_2_3.setRoomerPos(2),
            this.avatarGunList.push(a);
        var o = new Array;
        this.gun_3_1 = new GunTempleUI(e),
            this.gun_3_1.anchorOffsetX = this.gun_3_1.width / 2,
            this.gun_3_1.anchorOffsetY = 0,
            this.groupGun_3_1.addChild(this.gun_3_1),
            this.groupGun_3_1.rotation = 180,
            o.push(this.gun_3_1),
            this.gun_3_2 = new GunTempleUI(e),
            this.gun_3_2.anchorOffsetX = this.gun_3_2.width / 2,
            this.gun_3_2.anchorOffsetY = 0,
            this.groupGun_3_2.addChild(this.gun_3_2),
            this.groupGun_3_2.rotation = 180,
            o.push(this.gun_3_2),
            this.gun_3_3 = new GunTempleUI(e),
            this.gun_3_3.anchorOffsetX = this.gun_3_3.width / 2,
            this.gun_3_3.anchorOffsetY = 0,
            this.groupGun_3_3.addChild(this.gun_3_3),
            this.groupGun_3_3.rotation = 180,
            o.push(this.gun_3_3),
            this.gun_3_1.visible = !1,
            this.gun_3_2.visible = !1,
            this.gun_3_3.visible = !1,
            this.gun_3_1.setRoomerPos(3),
            this.gun_3_2.setRoomerPos(3),
            this.gun_3_3.setRoomerPos(3),
            this.avatarGunList.push(o),
            this.zuoList = new Array,
            this.zuoList.push(this.zuoGroup_0);
            this.zuoList.push(this.zuoGroup_1);
            this.zuoList.push(this.zuoGroup_2);
            this.zuoList.push(this.zuoGroup_3);
            _Notification_.send(NotifyEnum.ROOM_UI_INIT_END);
    }

    public frozenAndLock(e, t) {
        this._frozenAndLockUI = new FrozenAndLockUI(e),
            this._frozenAndLockUI.x = 480,
            this._frozenAndLockUI.y = 580,
            this.addChild(this._frozenAndLockUI),
            _Notification_.send(NotifyEnum.SET_PROP_NUM)
    }
    public unlockGunUpdate(e, t) {
        this._unlockGunUpdateUI = new UnlockGunUpdateUI(e),
        this._unlockGunUpdateUI.x = -400,
        this._unlockGunUpdateUI.y = 0,
        this.unlockGunGroup.addChild(this._unlockGunUpdateUI),
        _Notification_.send(NotifyEnum.CHECK_UNLOCKGUNUI_LOADED)
    }

    //左侧划出面板
    // public loadSideProp(e, t) {  
        // this._sidePropUI = new SidePropUI(e),
        // this._sidePropUI.x = 1176,
        // this._sidePropUI.y = 214,
        // this.addChild(this._sidePropUI),
        // _Notification_.send(NotifyEnum.SET_PROP_NUM)
    // }
    // public setExchange() {
        // this.exchangeGroup.x = -400,
        // this.txtExchangeNum = new egret.BitmapText,
        // this.txtExchangeNum.font = RES.getRes("bitmapNum_4_fnt"),
        // this.txtExchangeNum.text = String("1"),
        // this.exchangeNum.addChild(this.txtExchangeNum),
        // this.txtExchangeNum.textAlign = egret.HorizontalAlign.CENTER,
        // this.txtExchangeNum.anchorOffsetX = this.txtExchangeNum.width / 2,
        // this.txtExchangeNum.anchorOffsetY = this.txtExchangeNum.height / 2,
        // this._bIsShowExchange = !1,
        // this.exchangeName.text = ""
    // }
    // public updateShowExchangeBan(e, t) {
        // this.txtExchangeNum.text = e / 10 + "元/" + (t / 10 + "元")
    // }
    // public showExchangeBan(e, t, i) {
        // this.txtExchangeNum.text = t / 10 + "元/" + (i / 10 + "元"),
        // this.txtExchangeNum.textAlign = egret.HorizontalAlign.CENTER,
        // this.txtExchangeNum.anchorOffsetX = this.txtExchangeNum.width / 2,
        // this.txtExchangeNum.anchorOffsetY = this.txtExchangeNum.height / 2,
        // this.exchangeName.text = e;
        // var n = this,
        // a = n.exchangeGroup;
        // if (egret.Tween.removeTweens(a), n._bIsShowExchange) {
        //     n._bIsShowExchange = !1;
        //     var o = egret.Tween.get(a, {
        //         loop: !1
        //     });
        //     o.to({
        //         scaleX: 0
        //     },
        //     2e3).call(function() {
        //         egret.Tween.removeTweens(a),
        //         a.x = -400,
        //         a.scaleX = 1
        //     })
        // } else {
        //     a.scaleX = 0,
        //     a.x = 3,
        //     n._bIsShowExchange = !0;
        //     var o = egret.Tween.get(a, {
        //         loop: !1
        //     });
        //     o.to({
        //         scaleX: 1
        //     },
        //     200).wait(4e3).to({
        //         scaleX: 0
        //     },
        //     200).call(function() {
        //         egret.Tween.removeTweens(a),
        //         n._bIsShowExchange = !1,
        //         a.x = -400,
        //         a.scaleX = 1
        //     })
        // }
    // }
    public shrinkBtn;
    public _lotteryIsOpen;
    public warHeadGroupIsClose;
    public openWarHeadBtn;
    public shrinkGroup;
    public _shrinkGroupIsOpen;
    public addBgResource(e, t) {
        this.lotteryBtn.visible = !0,
            this.lotteryGroup.scaleX = 1,
            this.lotteryGroup.x = -300,
            this._lotteryIsOpen = !0,
            _Notification_.send(NotifyEnum.LOTTERY_UI_LOAD_END),
            this.unlockBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openGunUpdateGroup, this),
            this.warHeadGroupIsClose = !0,
            this.openWarHeadBtn.name = "openWarHeadBtn",
            this.openWarHeadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this),
            this.shrinkGroup.x = 1280,
            this.shrinkGroup.cacheAsBitmap = !0,
            this._shrinkGroupIsOpen = !1,
            this.shrinkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this),
            // this.shrinkBackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this),
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this),
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this),
            CONFIG.isOpenMusic && RES.loadGroup("fish_sound")
    }
    public showYourPos(e) {
        var t = this.getGunGroup(e),
        i = new egret.Bitmap(RES.getRes("youAreHere_png"));
        this.addChild(i),
        i.x = t.x,
        i.y = t.y,
        i.name = "yourTips",
        i.anchorOffsetX = i.width / 2,
        i.anchorOffsetY = 180,
        i.touchEnabled = !1,
        TweenTools.shrink(i, .05, 1500)
    }
    public hideYourPos(e) {
        var t = this.getChildByName("yourTips");
        t && t.parent && t.parent.removeChild(t)
    }
    public openAndCloseWarHead(e) {
        if (e.target instanceof eui.Button) {
            var t = this;
            egret.Tween.removeTweens(t.warUI);
            var i = egret.Tween.get(this.warUI, {
                loop: !1
            });
            if (this.openWarHeadBtn.touchEnabled = !1, this.goldBulletBtn.touchEnabled = !1, this.silverBulletBtn.touchEnabled = !1, this.bronzeBulletBtn.touchEnabled = !1, this.nuclearBulletBtn.touchEnabled = !1, this.warHeadGroupIsClose) {
                i.to({
                    x: -348
                },
                200).call(function() {
                    t.warHeadGroupIsClose = !1,
                    t.warUI.touchEnabled = !1,
                    t.openWarHeadBtn.touchEnabled = !0,
                    t.goldBulletBtn.touchEnabled = !0,
                    t.silverBulletBtn.touchEnabled = !0,
                    t.bronzeBulletBtn.touchEnabled = !0,
                    t.nuclearBulletBtn.touchEnabled = !0
                });
                var n = new Array;
                n.push(t.goldGroup),
                n.push(t.silverGroup),
                n.push(t.bronzeGroup),
                n.push(t.nuclearGroup),
                GameUtil.playWarAction(n)
            } else i.to({
                x: 0
            },
            200).call(function() {
                egret.Tween.removeTweens(t.warUI),
                t.warHeadGroupIsClose = !0,
                t.openWarHeadBtn.touchEnabled = !0
            })
        }
    }
    public openAndCloseShrink(e) {
        var t = this;
        if (egret.Tween.removeTweens(t.shrinkGroup), t._shrinkGroupIsOpen) {
            t.fishkindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, t.openFishKindsView, t);
            var i = egret.Tween.get(this.shrinkGroup, {
                loop: !1
            });
            i.to({
                x: 1280
            },
                200).call(function () {
                    egret.Tween.removeTweens(t.shrinkGroup),
                        t._shrinkGroupIsOpen = !1;
                        t.shrinkBtn.visible = !0;
                })
        } else {
            t._shrinkGroupIsOpen = !0;
            // t.shrinkBtn.visible = !1;
            var n = new Array;
            n.push(t.fishkindBtn),
            n.push(t.shopBtn),
            n.push(t.soundEffectBtn),
            n.push(t.bgMusicBtn),
            n.push(t.backBtn),
            GameUtil.playWarAction(n),
            t.fishkindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, t.openFishKindsView, t);
            var i = egret.Tween.get(this.shrinkGroup, {loop: !1});
            i.to({
                x: 906
            },
                200).wait(7000).to({
                    x: 1280
                },
                200).call(function () {
                    egret.Tween.removeTweens(t.shrinkGroup),
                    t._shrinkGroupIsOpen = !1,
                    t.shrinkBtn.visible = !0;
                })
        }
    }
    public onResourceLoadComplete(e) {
        "lottery" == e.groupName ? (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Lottery.exml", this.addBgResource, this), this.loadErrorCount = 0) : "fish_sound" == e.groupName ? (SoundManager.fishSoundLoadEnd = !0, RES.loadGroup("effect_sound")) : "effect_sound" == e.groupName && (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this), SoundManager.effectSoundLoadEnd = !0)
    }
    public onResourceLoadError(e) {
        this.loadErrorCount += 1,
            console.warn("Group:" + e.groupName + " has failed to load"),
            this.loadErrorCount < 5 && RES.loadGroup(e.groupName)
    }

    public reviseGun() { }

    public updateRoomerCoins(pos, coins, isShowEff = false) {
        var goldLabTxt = null, goldEffGroup = null;
        if (pos == RoomPosEnum.GUN_POS_0) {
            goldLabTxt = this.goldLab_num_0;
            goldEffGroup = this.gold_eff_0;
        } else if (pos == RoomPosEnum.GUN_POS_1) {
            goldLabTxt = this.goldLab_num_1;
            goldEffGroup = this.gold_eff_1;
        } else if (pos == RoomPosEnum.GUN_POS_2) {
            goldLabTxt = this.goldLab_num_2;
            goldEffGroup = this.gold_eff_2;
        } else if (pos == RoomPosEnum.GUN_POS_3) {
            goldLabTxt = this.goldLab_num_3;
            goldEffGroup = this.gold_eff_3;
        }
        if (isShowEff) {
            var twLab = egret.Tween.get(goldLabTxt, {loop: !1});
            twLab.to({
                    scaleX: 1.5,
                    scaleY: 1.5
                }, 200).call(function () {
                        goldLabTxt.text = "" + coins
                    }).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 200).call(function () {
                        egret.Tween.removeTweens(goldLabTxt)
                    });
            var goldHighlight = new egret.Bitmap(RES.getRes("ef_gold_png"));
            goldHighlight.alpha = 0;
            goldHighlight.anchorOffsetX = goldHighlight.width / 2;
            goldHighlight.anchorOffsetY = goldHighlight.height / 2;
            goldHighlight.x = -10;
            var twHighLight = egret.Tween.get(goldHighlight, { loop: !1 });
            twHighLight.to({ alpha: 1},
                300).to({
                    alpha: 0
                },
                300).call(function () {
                    egret.Tween.removeTweens(goldHighlight),
                        goldEffGroup.removeChild(goldHighlight)
                }),
                goldEffGroup.addChild(goldHighlight),
                goldLabTxt.text = "" + coins,
                goldLabTxt.anchorOffsetX = goldLabTxt.width / 2,
                goldLabTxt.anchorOffsetY = goldLabTxt.height / 2
        }
        else {
            goldLabTxt.text = "" + coins;
            goldLabTxt.anchorOffsetX = goldLabTxt.width / 2,
            goldLabTxt.anchorOffsetY = goldLabTxt.height / 2
        }
    }
    public updateRoomerMoney = function (e, t) {
        e == RoomPosEnum.GUN_POS_0 ? (this.gemLab_num_0.text = "" + t, this.gemLab_num_0.anchorOffsetX = this.gemLab_num_0.width / 2, this.gemLab_num_0.anchorOffsetY = this.gemLab_num_0.height / 2) : e == RoomPosEnum.GUN_POS_1 ? (this.gemLab_num_1.text = "" + t, this.gemLab_num_1.anchorOffsetX = this.gemLab_num_1.width / 2, this.gemLab_num_1.anchorOffsetY = this.gemLab_num_1.height / 2) : e == RoomPosEnum.GUN_POS_2 ? (this.gemLab_num_2.text = "" + t, this.gemLab_num_2.anchorOffsetX = this.gemLab_num_2.width / 2, this.gemLab_num_2.anchorOffsetY = this.gemLab_num_2.height / 2) : e == RoomPosEnum.GUN_POS_3 && (this.gemLab_num_3.text = "" + t, this.gemLab_num_3.anchorOffsetX = this.gemLab_num_3.width / 2, this.gemLab_num_3.anchorOffsetY = this.gemLab_num_3.height / 2)
    }


    public updateGunPow(pos, pow, i = !1) {
        if (pos == RoomPosEnum.GUN_POS_0) {
            this.rageLab_num_0.text = "" + pow;
            this.rageLab_num_0.anchorOffsetX = this.rageLab_num_0.width / 2;
            this.rageLab_num_0.anchorOffsetY = this.rageLab_num_0.height / 2;
            this.rageLab_num_0.x = 0;
            this.rageLab_num_0.y = 0;
        } else if (pos == RoomPosEnum.GUN_POS_1) {
            this.rageLab_num_1.text = "" + pow;
            this.rageLab_num_1.anchorOffsetX = this.rageLab_num_1.width / 2;
            this.rageLab_num_1.anchorOffsetY = this.rageLab_num_1.height / 2;
        } else if (pos == RoomPosEnum.GUN_POS_2) {
            this.rageLab_num_2.text = "" + pow;
            this.rageLab_num_2.anchorOffsetX = this.rageLab_num_2.width / 2;
            this.rageLab_num_2.anchorOffsetY = this.rageLab_num_2.height / 2;
        } else if (pos == RoomPosEnum.GUN_POS_3) {
            this.rageLab_num_3.text = "" + pow;
            this.rageLab_num_3.anchorOffsetX = this.rageLab_num_3.width / 2;
            this.rageLab_num_3.anchorOffsetY = this.rageLab_num_3.height / 2;
        }
        this.playAddGunRateEffect(pos, i);
    }

    public updateGunRate(pos, rate, i = !1) {
        if (pos == RoomPosEnum.GUN_POS_0) {
            this.gunRateLabel0.text = ""+rate;
        } else if (pos == RoomPosEnum.GUN_POS_1) {
            this.gunRateLabel1.text = ""+rate;
        } else if (pos == RoomPosEnum.GUN_POS_2) {
            this.gunRateLabel2.text = ""+rate;
        } else if (pos == RoomPosEnum.GUN_POS_3) {
            this.gunRateLabel3.text = ""+rate;
        }
        this.playAddGunRateEffect(pos, i);
    }

    /** 更换炮皮肤 */
    public changeGunSkin(e:Roomer, t) {
        var gunSkinId = e.getCurSkinId(),
        n = RoomUtil.getPosByFlip(e.getRoomPos(), t),
            a = e.getCurSkinBgId();
        if (this.gunList) {
            var o:GunTempleUI = this.gunList[n];
            o && (o.setGunTypeAndImageAnchor(gunSkinId), o.setGunNorData(gunSkinId))
        }
        // if (this.avatarGunList) for (var r = 0; 3 > r; r++) {
        //     var o = this.avatarGunList[n][r];
        //     o && (o.setGunImageAnchor(i), o.setGunData(i))
        // }
        // if (0 == a) {
        //     var s = T_Gun_skin_Table.getVoByKey(i),
        //         l = s.zuoUrl;
        //     this.changeGunBgSkin(n, l)
        // } else this.changeGunBgSkin(n, "gunBgsicon_" + a + "_png")
    }

    public changeGunBgSkin(posId, t) {
        // if (this.zuoList) {
        //     var i = this.zuoList[posId];
        //     i && RES.getResAsync(t,
        //         function () {
        //             var n = RES.getRes(t);
        //             var a = new egret.Bitmap(n);
        //             a && (i.removeChildren(), posId > 1 ? (a.anchorOffsetX = a.width / 2, a.anchorOffsetY = a.height - 11, a.rotation = 180) : (a.x = -90, a.y = -98), i.addChild(a))
        //         },
        //         this);
        // }
    }
    public playAddGunRateEffect(e, t=false) {
        var i = RES.getRes("addGunRate_json"),
        n = RES.getRes("addGunRate_png"),
        a = new egret.MovieClipDataFactory(i, n),
        o = new MovieFish(a.generateMovieClipData("addGunRate"), egret.Event.COMPLETE);
        o.initEvent();
        o.gotoAndPlay("play", 1);
        o.frameRate = 24;
        var posDo:egret.DisplayObject;
        if (e == RoomPosEnum.GUN_POS_0) {
            //  (o.x = 224, o.y = 554)
            posDo = this.posEff_0;
        } else if (e == RoomPosEnum.GUN_POS_1) {
            //   (o.x = 781, o.y = 554);
            posDo = this.posEff_1;
        } else if (e == RoomPosEnum.GUN_POS_2) {
            //  (o.x = 224, o.y = -100)
            posDo = this.posEff_2;
        } else if (e == RoomPosEnum.GUN_POS_3) {
            //  (o.x = 781, o.y = -100);
            posDo = this.posEff_3;
        }
        o.x = posDo.x - 140;
        o.y = posDo.y - 140;
        o.scaleX = o.scaleY = 1.25;
        this.addChild(o);
        if (t) {
            if (this.avatarGunList) for (var r = 0; 3 > r; r++) {
                var s = this.avatarGunList[e][r];
                s && s.playGunChangeEff();
            }
        } else if (this.gunList) {
            var templeUI:GunTempleUI = this.gunList[e];
            templeUI && templeUI.playGunChangeEff();
        }
    }

    public setGunVisableByPos(pos, isVisible) {
        switch (pos) {
            case RoomPosEnum.GUN_POS_0:
                this.groupGun_0.visible = isVisible,
                this.group_0.visible = isVisible,
                this.waiting_0.visible = !isVisible,
                isVisible ? (this.cache_group_0.cacheAsBitmap = !0, TweenTools.clearTween(this.waiting_0)) : TweenTools.showOutAndIn(this.waiting_0, 3e3);
                break;
            case RoomPosEnum.GUN_POS_1:
                this.groupGun_1.visible = isVisible,
                this.group_1.visible = isVisible,
                this.waiting_1.visible = !isVisible,
                isVisible ? (this.cache_group_1.cacheAsBitmap = !0, TweenTools.clearTween(this.waiting_1)) : TweenTools.showOutAndIn(this.waiting_1, 3e3);
                break;
            case RoomPosEnum.GUN_POS_2:
                this.groupGun_2.visible = isVisible,
                this.group_2.visible = isVisible,
                this.waiting_2.visible = !isVisible,
                isVisible ? (this.cache_group_2.cacheAsBitmap = !0, TweenTools.clearTween(this.waiting_2)) : TweenTools.showOutAndIn(this.waiting_2, 3e3);
                break;
            case RoomPosEnum.GUN_POS_3:
                this.groupGun_3.visible = isVisible,
                this.group_3.visible = isVisible,
                this.waiting_3.visible = !isVisible,
                isVisible ? (this.cache_group_3.cacheAsBitmap = !0, TweenTools.clearTween(this.waiting_3)) : TweenTools.showOutAndIn(this.waiting_3, 3e3)
        }
    }
    public setGunState(e, t, i, n) {
        if (void 0 === i && (i = 2), t) {
            this.gunList[e].visible = !1;
            var a = Director.getModelByKey(RoomModel),
                o = a.getRoomerByPos(n);
            o.getVipLevel();
            i = o.getGunNum();
            for (var r = 0; i > r; r++) {
                var s = this.avatarGunList[e][r];
                s.visible = !0
            }
        } else {
            this.gunList[e].visible = !0;
            for (var r = 0; r < this.avatarGunList[e].length; r++) {
                var s = this.avatarGunList[e][r];
                s.visible = !1
            }
        }
    }
    public gunfire(e, angle, isClone = false, n = 0) {
        1 >= e && angle > 90 && 270 > angle && (angle > 90 && 180 > angle && (angle = 90), 270 > angle && angle > 180 && (angle = 270));
        if (isClone) {
            if (this.avatarGunList && this.avatarGunList[e]) {
                var a = this.avatarGunList[e][n];
                e > 1 ? a.gunFireTw(angle + 180) : a.gunFireTw(angle)
            }
        } else {
            var o = this.gunList;
            if (o && o[e]) {
                let a = o[e];
                e > 1 ? a.gunFireTw(angle + 180) : a.gunFireTw(angle)
            }
        }
    }
    public setGunRageEff(e, t, i, n) {
        // if (void 0 === i && (i = !1), void 0 === n && (n = 0), i) {
        //     var a = this.avatarGunList[e][n];
        //     a.setRage(t)
        // } else {
        //     var a = this.gunList[e];
        //     a.setRage(t)
        // }
    }
    public getGunByPos(pos, isClone=false, i=0) {
        if (isClone) {
            if (this.avatarGunList && this.avatarGunList[pos]) {
                return this.avatarGunList[pos][i].gunFirePos();
            } else {
                return RoomUtil.getGunPointByPos(pos, !1);
            }
        } else {
            if (this.gunList && this.gunList[pos]) {
                return this.gunList[pos].gunFirePos();
            } else {
                return RoomUtil.getGunPointByPos(pos, !1);
            }
        }
    }
    public openFishKindsView = function (e) {
        if (this._shrinkGroupIsOpen) {
            var t = new FishKindsView,
            i = new FishKindsMediator(t);
            Director.pushView(i)
        }
    }
    public modifPow(e) {
        if (e.target == this.addRateBtn_0 || e.target == this.addRateBtn_1) {
            _Notification_.send(NotifyEnum.RESET_RATE, "add");
        } else if (e.target == this.reduceRateBtn_0 || e.target == this.reduceRateBtn_1) {
            _Notification_.send(NotifyEnum.RESET_RATE, "reduce");
        }
    }

    public exitRoom(e) {
        GameUtil.openConfirmByTwoButton(null,
            function () {
                UIUtil.startLoading();
                _Notification_.send(NotifyEnum.CLICK_EXIT_ROOM);
            },
            this, Language.getText(78))
    }
    public bgMusic(e) {
        SoundManager.setBackgroundMusicState(!SoundManager.getBackgroundMusicState()),
        this.music_off.visible = !SoundManager.getBackgroundMusicState()
    }
    public soundEffect(e) {
        SoundManager.setSoundEffectState(!SoundManager.getSoundEffectState()),
        this.sound_off.visible = !SoundManager.getSoundEffectState()
    }
    public setUpdateGunNum(e, t, i) {
        this._unlockGunUpdateUI.setUpdateGunNum(e, t, i)
    }
    public openGunUpdateGroup(e) {
        var t = Director.getModelByKey(UserModel),
        i = t.getUserId(),
        n = Director.getModelByKey(RoomModel),
        a = n.getRoomerById(i),
        o = a.getGunRate(),
        r = T_Gun_Table.getVoByKey(o);
        if (r) {
            var s = r.upgradeOrForgeCost,
            l = s.split(",");
            if (l.length > 1) return;
            this._unlockGunUpdateUI.openGunUpdateGroup()
        }
    }
    public openGunUpdateGroupByEnough() {
        this._unlockGunUpdateUI.openGunUpdateGroupByEnough()
    }
    public openLotteryGroup(e) {
        var t = this;
        if (null == e && t._lotteryIsOpen) {
            var lm:LotteryModel = Director.getModelByKey(LotteryModel),
            n = T_Lottery_Table.getVoByKey(1),
            a = lm.getScore(),
            o = lm.getKillNum(),
            r = lm.getMaxKill(lm.getTodayCount());
            o >= r && a >= n.integral && (t._lotteryIsOpen = !1)
        }
        var s = t.lotteryGroup;
        if (egret.Tween.removeTweens(s), t._lotteryIsOpen) {
            t._lotteryIsOpen = !1;
            var l = egret.Tween.get(s, {
                loop: !1
            });
            l.to({
                scaleX: 0
            },
            200).call(function() {
                egret.Tween.removeTweens(s),
                s.x = -400,
                s.scaleX = 1
            })
        } else {
            s.scaleX = 0,
            s.x = 12,
            t._lotteryIsOpen = !0;
            var l = egret.Tween.get(s, {
                loop: !1
            });
            l.to({
                scaleX: 1
            },
            200).wait(5e3).to({
                scaleX: 0
            },
            200).call(function() {
                egret.Tween.removeTweens(s),
                t._lotteryIsOpen = !1,
                s.x = -400,
                s.scaleX = 1
            })
        }
    }
    public openLotteryGroupWithData(score, killNum, maxKill) { //getScore(), getKillNum(), getMaxKill
        var n = T_Lottery_Table.getVoByKey(1);
        if (killNum >= maxKill && score >= n.integral) {
            this.lottery_tips.visible = !0;
            // this.lottery_tips.text = Language.getText(14),
            this.jiangjinyu_txt.visible = !1;
            this.jjy_txt_bg.visible = !1;
            this.fishCountTxt.visible = !1;
            var a = this,
            o = this.lotteryGroup.getChildByName("LotteryHint");
            if (!o) {
                var r = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
                r.name = "LotteryHint",
                // r.anchorOffsetX = 0,
                // r.anchorOffsetY = r.height / 2,
                r.width = 261,
                r.height = 94,
                r.x = 0,
                r.y = 0;//r.height / 2 - 6,
                r.blendMode = egret.BlendMode.ADD;
                a.lotteryGroup.addChild(r);
                a.openLotteryGroup(null);
                TweenTools.showOutAndIn(r, 1500);
            }
        } else {
            this.fishCountTxt.visible = !0,
            this.fishCountTxt.text = killNum + "/" + maxKill;
            // this.fishCountTxt.anchorOffsetX = this.fishCountTxt.width / 2,
            // this.fishCountTxt.anchorOffsetY = this.fishCountTxt.height / 2,
            this.lottery_tips.visible = !1,
            this.jiangjinyu_txt.visible = !0,
            this.jjy_txt_bg.visible = !0;
            var o = this.lotteryGroup.getChildByName("LotteryHint");
            o && this.lotteryGroup.removeChild(o)
        }
        this.bounsTxt.text = "" + score;
        // this.bounsTxt.anchorOffsetX = this.bounsTxt.width / 2,
        // this.bounsTxt.anchorOffsetY = this.bounsTxt.height / 2,
        this.openLotteryGroup(null)
    }
    // public openLotteryGuide() {
        // this.lottery_tips.visible = !0,
        // this.lottery_tips.text = Language.getText(14),
        // this.jiangjinyu_txt.visible = !1,
        // this.jjy_txt_bg.visible = !1,
        // this.fishCountTxt.visible = !1;
        // var e = this,
        // t = this.lotteryGroup.getChildByName("LotteryHint");
        // if (!t) {
        //     var i = new egret.Bitmap(RES.getRes("ef_lottery_hint_png"));
        //     i.name = "LotteryHint",
        //     i.anchorOffsetX = 0,
        //     i.anchorOffsetY = i.height / 2,
        //     i.width = 272,
        //     i.height = 94,
        //     i.x = 12,
        //     i.y = i.height / 2 - 1,
        //     i.blendMode = egret.BlendMode.ADD,
        //     e.lotteryGroup.addChild(i),
        //     e.openLotteryGroup(null),
        //     TweenTools.showOutAndIn(i, 1500)
        // }
        // this.bounsTxt.text = "2000",
        // this.bounsTxt.anchorOffsetX = this.bounsTxt.width / 2,
        // this.bounsTxt.anchorOffsetY = this.bounsTxt.height / 2;
        // var n = e.lotteryGroup;
        // egret.Tween.removeTweens(n),
        // n.scaleX = 0,
        // n.x = 3,
        // e._lotteryIsOpen = !0;
        // var a = egret.Tween.get(n, {
        //     loop: !1
        // });
        // a.to({
        //     scaleX: 1
        // },
        // 200).call(function() {
        //     egret.Tween.removeTweens(n)
        // })
    // }
    public openLotteryView(e) {
        this._lotteryIsOpen && _Notification_.send(NotifyEnum.OPEN_LOTTERY_UI)
    }
    public openShopView(e) {
        var t = new ItemShopView,
        i = new ItemShopMediator(t);
        Director.pushView(i)
    }
    // public getCoins(e) {
        // var t = new ChargeView(ChargeType.Gold),
        // i = new ChargeMediator(t);
        // Director.pushView(i)
    // }
    // public exchange(e) {
        // var t = new ExchangeView,
        // i = new ExchangeMediator(t);
        // Director.pushView(i)
    // }
    // public trumpet(e) {
    //     var t = new TrumpetView,
    //     i = new TrumpetMediator(t);
    //     Director.pushView(i)
    // }

    /** 设置破产界面 */
    public setBankrupt(viewPos, tipTxt, isMe = false) {
        var _me = this;
        var gunGroup = this.getGunGroup(viewPos);
        var o = gunGroup.getChildByName("bankrupt" + viewPos);
        if (!o) {
            var resLoaded = function() {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, resLoaded, _me),
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, resLoadErr, _me);
                var btBmp = new egret.Bitmap(RES.getRes("bankrupt_fishing_png"));
                btBmp.anchorOffsetX = btBmp.width / 2,
                btBmp.anchorOffsetY = btBmp.height / 2,
                btBmp.scaleX = btBmp.scaleY = 3,
                btBmp.name = "bankrupt" + viewPos;
                btBmp.x = -20;
                btBmp.y = 30;
                gunGroup.addChild(btBmp);
                var tw = egret.Tween.get(btBmp);
                tw.to({scaleX: 1, scaleY: 1}, 166, egret.Ease.circIn).call(function() {
                        egret.Tween.removeTweens(btBmp)
                    });
                // 自己显示救济金界面
                if (isMe) {
                    _me._bankruptView = new BankruptView();
                    _me._bankruptView.x = -170;
                    _me._bankruptView.y = -100;
                    _me._bankruptView.name = "" + viewPos;
                    gunGroup.addChild(_me._bankruptView);
                    _me._bankruptView.setText(tipTxt);
                    _me._bankruptView.startTick();
                }
            };
            var resLoadErr = function() {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, resLoaded, _me),
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, resLoadErr, _me);
            };
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, resLoaded, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, resLoadErr, this);
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/BankruptUI.exml",
                function(e, t) {
                    RES.createGroup("bankrupt_fishing_png", ["bankrupt_fishing_png"]);
                    RES.loadGroup("bankrupt_fishing_png");
                }, this);
        }
    }

    /** 移除破产界面 */
    public removeBankrupt(pos) {
        var t = this.getGunGroup(pos);
        var i = t.getChildByName("bankrupt" + pos);
        i && t.removeChild(i);
        if (this._bankruptView && pos == Number(this._bankruptView.name)) {
            this._bankruptView.destroy();
            this._bankruptView.parent && this._bankruptView.parent.removeChild(this._bankruptView);
        }
    }

    public setHideUnlock() {
        this.unlockBtn.visible = !1;
        this.unlockGunGroup.visible = !1;
        this.bossBtn.visible = !1;
    }

    public getGunGroup(e) {
        switch (e) {
            case RoomPosEnum.GUN_POS_0:
                return this.pos_0;
            case RoomPosEnum.GUN_POS_1:
                return this.pos_1;
            case RoomPosEnum.GUN_POS_2:
                return this.pos_2;
            case RoomPosEnum.GUN_POS_3:
                return this.pos_3;
        }
    }
    public posEff_3;
    public posEff_2;
    public posEff_1;
    public posEff_0;

    public getGunPointByPos(e, t) {
        if (t) switch (e) {
            case RoomPosEnum.GUN_POS_0:
                return this.posEff_3;
            case RoomPosEnum.GUN_POS_1:
                return this.posEff_2;
            case RoomPosEnum.GUN_POS_2:
                return this.posEff_1;
            case RoomPosEnum.GUN_POS_3:
                return this.posEff_0;
        } else switch (e) {
            case RoomPosEnum.GUN_POS_0:
                return this.posEff_0;
            case RoomPosEnum.GUN_POS_1:
                return this.posEff_1;
            case RoomPosEnum.GUN_POS_2:
                return this.posEff_2;
            case RoomPosEnum.GUN_POS_3:
                return this.posEff_3;
        }
        return null
    }
    // public setExchangeByPos(e, t, i) {
    //     if (t) switch (e) {
    //     case RoomPosEnum.GUN_POS_0:
    //         this.exchange_3.visible = i;
    //         break;
    //     case RoomPosEnum.GUN_POS_1:
    //         this.exchange_2.visible = i;
    //         break;
    //     case RoomPosEnum.GUN_POS_2:
    //         this.exchange_1.visible = i;
    //         break;
    //     case RoomPosEnum.GUN_POS_3:
    //         this.exchange_0.visible = i
    //     } else switch (e) {
    //     case RoomPosEnum.GUN_POS_0:
    //         this.exchange_0.visible = i;
    //         break;
    //     case RoomPosEnum.GUN_POS_1:
    //         this.exchange_1.visible = i;
    //         break;
    //     case RoomPosEnum.GUN_POS_2:
    //         this.exchange_2.visible = i;
    //         break;
    //     case RoomPosEnum.GUN_POS_3:
    //         this.exchange_3.visible = i
    //     }
    // }
    // public getRankByPos(e, t) {
        // if (t) switch (e) {
        // case RoomPosEnum.GUN_POS_0:
        //     return this.posEff_7;
        // case RoomPosEnum.GUN_POS_1:
        //     return this.posEff_6;
        // case RoomPosEnum.GUN_POS_2:
        //     return this.posEff_5;
        // case RoomPosEnum.GUN_POS_3:
        //     return this.posEff_4
        // } else switch (e) {
        // case RoomPosEnum.GUN_POS_0:
        //     return this.posEff_4;
        // case RoomPosEnum.GUN_POS_1:
        //     return this.posEff_5;
        // case RoomPosEnum.GUN_POS_2:
        //     return this.posEff_6;
        // case RoomPosEnum.GUN_POS_3:
        //     return this.posEff_7
        // }
        // return null
    // }
    public bShowChakan:boolean; // 是否显示查看
    public nChakanPos:number;
    public setShowChakan(e, t) {
        var i = e.getUserId(),
            n = Director.getModelByKey(UserModel),
            a = RoomUtil.getPosByFlip(e.getRoomPos(), t);
        if (i == n.getUserId()){
            // this.chakanUI.setMine();
            // [修改] 点击自己的炮，显示换炮界面
            var changeGunView = new ChangeGunView;
            var changeGunMediator = new ChangeGunMediator(changeGunView);
            Director.pushView(changeGunMediator)
            return;
        }else{
            a > 1 ? this.chakanUI.setOther(true, e) : this.chakanUI.setOther(false, e);
        }
        // 查看面板位置
        var o = this.getGunPointByPos(a, false),
            r = new egret.Point(o.x, o.y),
            s = r.x + CONFIG.adaptX,
            l = r.y + CONFIG.adaptY;
        if (l > 360){
            l -= 100;
            l -= CONFIG.adaptY;
        }else{
            l += 300;
            l += CONFIG.adaptY;
        }
        this.chakanUI.x = s,
        this.chakanUI.y = l,
        this.bShowChakan = true,
        this.nChakanPos = e.getRoomPos()
    }
    
    public setHideChakan() {
        this.chakanUI.x = -500,
        this.chakanUI.y = -500,
        this.bShowChakan = false,
        this.nChakanPos = -1
    }

    // 次日礼包
    // public addCiriBtn() {
        //     var e = this;
        //     if (! (this.ciriGroup.numChildren > 0)) {
        //         RES.getResAsync("CiRiLiBao_png",
        //         function(t, i) {
        //             var n = new eui.Image(t);
        //             n.x = -n.width / 2,
        //             n.y = -n.height / 2,
        //             n.touchEnabled = !1,
        //             e.ciriGroup.addChild(n)
        //         },
        //         this),
        //         this.ciriGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,
        //         function() {
        //             _Notification_.send(NotifyEnum.POP_CIRI)
        //         },
        //         this);
        //         var t = this.ciriGroup.x,
        //         i = this.ciriGroup.y;
        //         this.ciriGroup.x = CONFIG.contentWidth / 2,
        //         this.ciriGroup.y = CONFIG.contentHeight / 2,
        //         this.ciriGroup.scaleX = .3,
        //         this.ciriGroup.scaleY = .3;
        //         var n = egret.Tween.get(this.ciriGroup, {
        //             loop: !1
        //         }),
        //         a = this;
        //         n.to({
        //             x: t,
        //             y: i,
        //             scaleX: .7,
        //             scaleY: .7
        //         },
        //         1e3, egret.Ease.backOut).call(function() {
        //             egret.Tween.removeTweens(a.ciriGroup)
        //         })
        //     }
        // }
        // public addPhoenixShield (e, t) {
        //     if (this.shieldGroup.numChildren > 0) return this.setPhoenixShield(e, t),
        //     void(0 >= t - e && this.clearPhoenixUI());
        //     var i = this;
        //     EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/worldBossShield.exml",
        //     function() {
        //         i.shieldUI = new PhoenixShield,
        //         i.shieldUI.anchorOffsetX = i.shieldUI.width / 2,
        //         i.shieldUI.anchorOffsetY = 0,
        //         i.shieldGroup.addChild(i.shieldUI),
        //         i.setPhoenixShield(e, t),
        //         _Notification_.send(NotifyEnum.CHANGE_PHOENIX_UI)
        //     },
        //     this)
    // }
    public setPhoenixShield(e, t) {
        this.shieldUI && this.shieldUI.setData(e, t)
    }
    public addShieldTopPanel() {
        if (! (this.bossTopGroup.numChildren > 0)) {
            var e = this;
            EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/worldBoss/worldBossTips.exml",
            function() {
                e.shieldTips = new PhoenixTop,
                e.shieldTips.anchorOffsetX = e.shieldTips.width / 2,
                e.shieldTips.anchorOffsetY = 0,
                e.bossTopGroup.addChild(e.shieldTips),
                e.shieldTips.start()
            },
            this)
        }
    }

    public clearPhoenixTop() {
        this.bossTopGroup.removeChildren(),
        this.shieldTips = null
    }
    public clearPhoenixUI() {
        this.shieldGroup.removeChildren(),
        this.shieldUI = null
    }
    // public changePriceTask () {
    //     if (this.priceTaskUI) return void this.priceTaskUI.setTask();
    //     this.guideTaskGroup.removeChildren();
    //     var e = this;
    //     EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceTask.exml",
    //     function() {
    //         e.priceTaskUI = new PriceTaskUI,
    //         e.priceTaskUI.anchorOffsetX = e.priceTaskUI.width / 2,
    //         e.priceTaskUI.anchorOffsetY = 0,
    //         e.guideTaskGroup.addChild(e.priceTaskUI),
    //         _Notification_.send(NotifyEnum.PRICE_TASK_CHANGE)
    //     },
    //     this)
    // }
    // public clearPriceTask() {
        // this.guideTaskGroup.removeChildren(),
        // this.priceTaskUI = null
    // }
    // public showPriceRank(e, t, i) {
        // var n = this.getRankByPos(e, t);
        // if (n.removeChildren(), -1 != i) {
        //     var a = new PriceTaskRankUI(i);
        //     n.addChild(a)
        // }
    // }
    // public clearPriceRank() {
        // for (var e = 0; 4 > e; e++) {
        //     var t = this.getRankByPos(e, !0);
        //     t.removeChildren()
        // }
    // }

    // 挑战失败
    // public showPriceFail() {
        // var e = this;
        // EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/price/PriceFail.exml",
        // function() {
        //     var t = new PriceFailUI;
        //     e.addChild(t),
        //     t.anchorOffsetX = t.width / 2,
        //     t.anchorOffsetY = t.height / 2,
        //     t.x = e.width / 2,
        //     t.y = e.height / 2;
        //     var i = egret.Tween.get(t, {
        //         loop: !1
        //     });
        //     i.wait(2e3).call(function() {
        //         egret.Tween.removeTweens(t),
        //         e.removeChild(t)
        //     })
        // },
        // this)
    // }
    public getIsChakan() {
        return this.bShowChakan
    }
    public getFrozenAndLockUI() {
        return this._frozenAndLockUI;
    }
    public getUnlockUpdateUI() {
        return this._unlockGunUpdateUI
    }
    public getSidePropUI() {
        return this._sidePropUI
    }
    public getGoldBtn() {
        return this.goldBulletBtn
    }
    public getSilverBtn() {
        return this.silverBulletBtn
    }
    public getBronzeBtn() {
        return this.bronzeBulletBtn
    }
    public getNuclearBtn() {
        return this.nuclearBulletBtn
    }
    public getGuideTaskUI() {
        return this._guideTaskUI
    }
    public destory() {
        for (; this.btnWrapList.length > 0;) {
            var e = this.btnWrapList.pop();
            e.destroy()
        }
    this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.exitRoom, this),
        this.openWarHeadBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this),
        this.shrinkBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this),
        // this.shrinkBackBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseShrink, this),
        this.lotteryBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openLotteryGroup, this),
        this.lotteryBtn.name = "lotteryBtn",
        this.lotteryGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openLotteryView, this),
        this.lotteryGroup.name = "lotteryGroup",
        this.addRateBtn_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifPow, this),
        this.addRateBtn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifPow, this),
        this.reduceRateBtn_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifPow, this),
        this.reduceRateBtn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.modifPow, this),
        // this.getCoinsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getCoins, this),
        // this.exchangeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.exchange, this),
        this.shopBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openShopView, this),
        this.unlockBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openGunUpdateGroup, this),
        this.warUI.closeWarGroupBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAndCloseWarHead, this),
        TweenTools.clearTween(this.waiting_0),
        TweenTools.clearTween(this.waiting_1),
        TweenTools.clearTween(this.waiting_2),
        TweenTools.clearTween(this.waiting_3)
}


} 