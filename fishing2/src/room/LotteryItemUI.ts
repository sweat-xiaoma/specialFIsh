
class LotteryItemUI extends eui.Component {

    private name_txt;
    private count_txt;
    
    constructor(t,i){
        super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/component/LotteryItem.exml",
        this.setData(t, i);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }
  
    public setData(e, t) {
        var i = T_Item_Table.getVoByKey(e);
        this.name_txt.text = Language.getText(i.name),
        i.id == PropEnum.FISH_TICKIT ? this.count_txt.text = t / 10 + "元": this.count_txt.text = String(t);
        var n = this;
        IconUtil.getIconByIdAsync(IconType.PROP, i.id,
        function(e) {
            if (e) {
                var t = n.getChildByName("icon_lottery");
                t && n.removeChild(t),
                e.width = 76,
                e.height = 76,
                e.anchorOffsetX = e.width / 2;
                e.anchorOffsetY = e.height / 2;
                e.x = e.width / 2 + 33;
                e.y = e.height / 2 + 52;
                e.name = "icon_lottery";
                n.addChildAt(e, 2);
            }
        })
    }
}