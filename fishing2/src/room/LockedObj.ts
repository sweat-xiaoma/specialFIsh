class LockedObj  {

    private _arrLocekdId;
    private _nLockedPos;
    private _nUserId;

    constructor(e, t, i){
        this._arrLocekdId = e;
        this._nLockedPos = t;
        this._nUserId = i;
    }

    public setLockedId = function(e, t) {
        this._arrLocekdId[t] = e
    }
    public getLockedID = function() {
        return this._arrLocekdId
    }
    public spliceLockedID = function() {
        this._arrLocekdId.splice(1, 1),
        this._arrLocekdId.splice(2, 1)
    }
    public getLockedPos = function() {
        return this._nLockedPos
    }
    public getUserId = function() {
        return this._nUserId
    }
}