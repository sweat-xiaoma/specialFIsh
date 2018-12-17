class Item {

    public _itemId;
    public _count;
    public _time;

    constructor(e, t, i=null){
        this._itemId = e;
        this._count = t;
        if (i){
           this._time = i 
        }else{
          this._time = 0;
        }
    }
  
    public getItemId = function() {
        return this._itemId
    }
    public setCount = function(e) {
        this._count = e
    }
    public getCount = function() {
        return this._count
    }
    public setTime = function(e) {
        this._time = e
    }
    public getTime = function() {
        return this._time
    }
    public isAct = function() {
        if (this._time <= 0) return ! 0;
        var t = this._time - TimeUtil.getCurrTime();
        return t > 0 ? !0 : !1
    }
}
