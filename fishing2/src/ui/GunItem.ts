class GunItem {
    public _vo;
    public _state;
     public constructor (e,t){
        this._vo = e
        this._state = t
    }
    public getVO () {
            return this._vo
    }
    public getState () {
        return this._state;
    }
    public setState (e) {
        this._state = e;
    }
}