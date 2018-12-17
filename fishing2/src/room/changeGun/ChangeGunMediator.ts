
class ChangeGunMediator extends SimpleMediator {

    public constructor (changeGun:ChangeGunView){
        super(changeGun);
    }
     public onAdded () {
        super.onAdded.call(this);
        this.subscrib(NotifyEnum.CHANGE_GUN_UI_LOADED, this.loaded),
        this.getView().initView()
    }
    public loaded (e, t) {
        var changeGunView:ChangeGunView = t.getView();
        var n = t.getGunVos();
        var user = Director.getModelByKey(UserModel);
        var gunList = new Array;
        for (var s = 0; s < n.length; s++) {
            var l = n[s];
            // console.log(l);
            var gunState = -1;
            var d = new Item(l.id, 1);            
            if (user.isExist(d)){
                if (user.getCurSkinId() == l.id){
                    gunState = GunState.Equip;
                }else{
                    gunState = GunState.Act;
                }
            }else{
                gunState = GunState.UnGain;
            }
            
            // console.log(n[s]);
            // console.log(u);
            
            var h = new GunItem(n[s], gunState);
            gunList.push(h)
        }
        changeGunView.showList(gunList)
    }
    public init () {};
    public getGunVos () {
        for (var e = new Array,
        t = T_Item_Table.getAllVo(), i = t.length, n = 0; i > n; n++) 
            t[n].type == BagItemType.BATTERY && e.push(t[n]);
        return e
    }
    public update () {
        this.loaded(null, this)
    }
    public destroy () {
        this.unsubscribByType(NotifyEnum.CHANGE_GUN_UI_LOADED),
        this.getView().destroy()
    }
}
