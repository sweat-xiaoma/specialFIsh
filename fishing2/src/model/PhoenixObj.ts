
class PhoenixObj {

    private _time;
    private _state;
    private _maxShield;
    private _curShield;
    constructor(e){
         this.changeData(e);
    }
   
    public changeData(e){
        var t = !1;
        e.getState() && (e.getState() != Phoenix_State.ShieldDead ? this._state = e.getState() : t = !0),
        e.getTime() && !t && (this._time = e.getTime()),
        null != e.getCurShieldValue() && (this._curShield = e.getCurShieldValue()),
        null != e.getShieldMax() && (this._maxShield = e.getShieldMax())
    };
    public getState(){
        return this._state
    };
    public getTime(){
        return this._time
    };
    public getCurShield(){
        return this._curShield
    };
    public getMaxShield(){
        return this._maxShield
    };
}