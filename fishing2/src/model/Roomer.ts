class Roomer {
    private _userrId;
    private _roomPos;
    private _roomName;
    private _gunRate;
    private _gunPow:number;
    private _coins;
    private _money;
    private _isInLock;
    private _isInClone;
    private _isInRage;
    private _arrItemId;
    private _arrLockedId;
    private _curSkinId;   // 炮的皮肤
    private _curSkinBgId; // 炮的底座
    private _nLv;
    private _isBankrupt;
    private _viplevel;
    private _nGunNum;
    private _djsObj;

    public constructor(t, i, n, gunId, coins, gem, s, l, u, d, h, c, gunPow) {
        this._userrId = t,
        this._roomPos = i,
        this._roomName = n,
        this._gunRate = gunId,
        this._coins = coins,
        this._money = gem,
        this._isInLock = !1,
        this._isInClone = !1,
        this._isInRage = !1,
        this._arrItemId = s,
        this._arrLockedId = l;
        for (var p = 0; p < s.length; p++) 
            s[p] == PropEnum.LOCK ? this._isInLock = !0 : s[p] == PropEnum.RAGE ? this._isInRage = !0 : s[p] == PropEnum.CLONE && (this._isInClone = !0);
        if (this._isBankrupt = !1, this._viplevel = u, this._nGunNum = 2, this.setGunNum(), 0 == d) {
            var g = T_Config_Table.getVoByKey(51).value;
            d = Number(g)
        }
        this._curSkinId = d,
        this._curSkinBgId = h,
        this._nLv = c;
        this._gunPow = gunPow;
    }

    public getUserId() {
        return this._userrId
    }
    public getRoomPos() {
        return this._roomPos
    }
    public getName() {
        return this._roomName
    }
    public setGunRate(e) {
        this._gunRate = e
    }
    public getGunRate() {
        return this._gunRate
    }
    public setGunPow(e) {
        this._gunPow = e
    }
    public getGunPow() {
        return this._gunPow
    }
    public getCoins() {
        return this._coins
    }
    public setCoins(e) {
        this._coins = e
    }
    public getMoney() {
        return this._money
    }
    public setMoney(e) {
        this._money = e
    }
    public setIsClone(e) {
        this._isInClone = e
    }
    public getIsClone() {
        return this._isInClone
    }
    public setIsRage(e) {
        this._isInRage = e
    }
    public getIsRage() {
        return this._isInRage
    }
    public setIsLock(e) {
        this._isInLock = e
    }
    public getIsLock() {
        return this._isInLock
    }
    public getBankrupt() {
        return this._isBankrupt
    }

    public setBankrupt(e) {
        this._isBankrupt = e
    }

    public getVipLevel() {
        return this._viplevel
    }

    public setGunNum() {
        var t = this._viplevel,
        i = T_Config_Table.getVoByKey(35).value,
        n = i.split("_"),
        a = Number(n[0]),
        o = Number(n[1]),
        r = 2;
        t >= a && o > t ? r = 2 : t >= o && (r = 3),
        this._nGunNum = r;
        var s = Director.getModelByKey(UserModel);
        s.getMatchRoomLevel() == RequesetRoomState.QmsRoom && (this._nGunNum = 3)
    }

    public getGunNum() {
        return this._nGunNum
    }
    public getLockedIdByGun(e) {
        return this._arrLockedId.length < e ? -1 : this._arrLockedId[e]
    }
    public setCurSkinId(e) {
        this._curSkinId = e
    }
    public getCurSkinId() {
        return this._curSkinId
    }
    public setCurSkinBgId(e) {
        this._curSkinBgId = e
    }
    public getCurSkinBgId() {
        return this._curSkinBgId
    }
    public getLv() {
        return this._nLv
    }
    public setLv(e) {
        this._nLv = e
    }
    public getDjsObj() {
        return this._djsObj
    }
    public setDjsObj(e) {
        this._djsObj = e
    }
}