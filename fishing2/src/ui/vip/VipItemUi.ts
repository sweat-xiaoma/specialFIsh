class VipItemUI extends eui.Component {
    public vipLvGroup;
    public desc0;
    public nameLab;
    public desc;
    public iconGroup;
    public lock;
    public strVipDescID;
    public root;
    public vip_lv_ico;
    public constructor(t ,i ) {
        super();
 
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipItem.exml";

        var a = T_VipLevel_Table.getVoByKey(t.vipLevel - 1);
        var o = new egret.BitmapText;
        o.font = RES.getRes("vipShow_fnt");
        o.text = String(t.vipLevel);

        // this.vipLvGroup.addChild(o);

        this.vip_lv_ico.source = "c_"+i+"_png";
        this.strVipDescID = Number(t.descVip),
        this.root.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);

        o.textAlign = egret.HorizontalAlign.CENTER,
        o.anchorOffsetX = o.width / 2,
        o.anchorOffsetY = o.height / 2,
        i >= t.vipLevel ;
        //&& (this.lock.visible = !1);
        // this.desc0.text = t.desc,
        // this.nameLab.text = t.name;
        var r = new Array;
        r.push(a.levelUpExp / 100 + "");
    //    this.desc.text = Language.getDynamicText(94, r);
        var s = this;
        return IconUtil.getIconByIdAsync(IconType.VIP_SHOW, t.vipLevel,
        function(e) {
            console.log(s.width);
            console.log(e.width);
             e.x = (186-e.width) / 2;
             e.y = (s.height-e.height) / 2;
             s.iconGroup.addChild(e);
        })

        

    }

    public onTap (e) {
        //GameUtil.openCommonHelp(null, this.strVipDescID)
    }
} 


    // function t(t, i) {
    //     var n = e.call(this) || this;
    //     n.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/vip/VipItem.exml";
    //     var a = game.table.T_VipLevel_Table.getVoByKey(t.vipLevel - 1),
    //     o = new egret.BitmapText;
    //     o.font = RES.getRes("vipShow_fnt"),
    //     o.text = String(t.vipLevel),
    //     n.vipLvGroup.addChild(o),
    //     o.textAlign = egret.HorizontalAlign.CENTER,
    //     o.anchorOffsetX = o.width / 2,
    //     o.anchorOffsetY = o.height / 2,
    //     i >= t.vipLevel && (n.lock.visible = !1),
    //     n.desc0.text = t.desc,
    //     n.nameLab.text = t.name;
    //     var r = new Array;
    //     r.push(a.levelUpExp / 100 + ""),
    //     n.desc.text = game.util.Language.getDynamicText(94, r);
    //     var s = n;
    //     return game.util.IconUtil.getIconByIdAsync(IconType.VIP_SHOW, t.vipLevel,
    //     function(e) {
    //         e && (e.anchorOffsetX = e.width / 2, e.anchorOffsetY = e.height / 2, s.iconGroup.addChild(e))
    //     }),
    //     n.strVipDescID = Number(t.descVip),
    //     n.root.addEventListener(egret.TouchEvent.TOUCH_TAP, n.onTap, n),
    //     n
    // }
    // return __extends(t, e),
    // t.prototype.onTap = function(e) {
    //     game.util.GameUtil.openCommonHelp(null, this.strVipDescID)
    // },
    // t