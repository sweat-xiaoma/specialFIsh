class ChargeItemUI extends eui.Component {
    private ico1;
    private ico2;
    private ico3;
    private chongzhi_btn;
    public constructor() {
       super();
    }
    public setData (e) {
        var t = this;
        t.ico1.source = "JinBi_png";
         t.ico2.source = "JinBi_png";
          t.ico3.source = "JinBi_png";
          this.chongzhi_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this)
    }
    public onBuyClick (e) {

        _Notification_.send(NotifyEnum.BUY_CHARGE_ITEM, {
            // id: this._nChargeID,
            // type: this._nType
        })
    }
    public clearItem () {
         this.chongzhi_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this)
    }
 
} 