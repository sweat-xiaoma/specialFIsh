class UserModel extends ModelBase {
        private _bagList;
        private _bankruptTime = -1;
        private _nGuideID = 0;
        private _nCurGunSkinId = 20007;
        private _nCurGunBgId = null;
        private _objSign;
        private _nCiriState;
        private _arrRankList;
        private _bIsTodayDraw = !1;
        private _arrRoomOnline;
        private _arrChargedGears;
        private _arrExchangeGears;
        private bOpenedActiveUI = !1;
        private bOpenedExchangeUI = !1;
        private bOpenedMonthUI = !1;
        
        private _currRoomType;
        private _exp:number;
        private _level:number;
        private _nMoney:number;
        private _nCoins:number;
        private _nTicket:number;
        private _userName:string;
        private _userId;
        private _account:string;
        private _identity:string;

        private _strInviteCode;
        private _shareTimes;
        private _isFocusFlag;
        private _bIsTodayFirstLogin;
        private _nMonthEndTime;
        private _nTotalChargeRMB;
        private _everyWeekActive;
        private _vipLevel;
        private _headUrl;
        private _nCurGunId;
        private _everydayActive;
        private _roomId;

	public constructor() {
		super();
	}

	public init() {
        this._bagList = new Array,
        this._bankruptTime = -1,
        this._nGuideID = 0,
        this._nCurGunSkinId = 20007,
        this._nCurGunBgId = null,
        // this._objSign = new game.model.SignObj,
        this._nCiriState = Ciri_State.Expired,
        this._arrRankList = new Array,
        this._bIsTodayDraw = !1,
        this._arrRoomOnline = new Array,
        this._arrRoomOnline.push(0),
        this._arrRoomOnline.push(0),
        this._arrRoomOnline.push(0),
        this._arrChargedGears = new Array,
        this._arrExchangeGears = new Array,
        this.bOpenedActiveUI = !1,
        this.bOpenedExchangeUI = !1,
        this.bOpenedMonthUI = !1;
    }

    public addItem(e) {
        if (e.getItemId() == PropEnum.GOLD || e.getItemId() == PropEnum.GEM) 
            return void console.log("#----------bag can't insert GemOrGold");
        var t = this.isExist(e);
        if (!t) 
            return void this._bagList.push(e);
        for (var i = this._bagList.length, n = !1, a = 0; i > a; a++) {
            var o = this._bagList[a];
            e.getItemId() == o.getItemId() && (o.setCount(o.getCount() + e.getCount()), n = !0)
        }
        n || this._bagList.push(e);
    }

    public updateItem(e, t, i = 0) {
        for (var n = this._bagList.length,
        a = !1,
        o = 0; n > o; o++) {
            var r = this._bagList[o];
            if (e == r.getItemId()) {
                r.setCount(t),
                r.setTime(i),
                a = !0;
                break
            }
        }
        if (!a) {
            var s = new Item(e, t, i);
            this.addItem(s)
        }
    }
    public removeItem(e, t) {
        for (var i = this._bagList.length,
        n = 0; i > n; n++) {
            var a = this._bagList[n];
            if (e == a.getItemId()) {
                var o = a.getCount() - t;
                return 0 > o ? (console.warn("物品【" + e + "】数量不足!"), !1) : 0 == o ? (this._bagList.splice(n, 1), !0) : (a.setCount(o), !0)
            }
        }
        return ! 1
    }
    public isExist(e) {
        for (var t = this._bagList.length,
        i = 0; t > i; i++) {
            var n = this._bagList[i];
            if (e.getItemId() == n.getItemId()) return ! 0
        }
        return ! 1
    }
    //获取背包物品list数据
    public getItemList() {
        return this._bagList
    }
    //根据物品id 从背包中获取物品数据
    public getItemById(e) {
        for (var t = this._bagList.length,
        i = 0; t > i; i++) {
            var n = this._bagList[i];
            if (e == n.getItemId()) return n
        }
        return null
    }
    public getCurGunID() {
        return this._nCurGunId
    }
    public setCurGunID(e) {
        this._nCurGunId = e
    }
    public getMatchRoomLevel() {
        return this._currRoomType
    }
    public setMatchRoomLevel(e) {
        this._currRoomType = e
    }
    public setUserId(e) {
        this._userId = e
    }
    public getUserId() {
        return this._userId
    }
    public setUserName(e) {
        this._userName = e
    }
    public getUserName() {
        return this._userName
    }
    public setHeadUrl(e) {
        this._headUrl = e
    }
    public getHeadUrl() {
        return CONFIG.HERDICON_ADDR + this._headUrl
    }
    public setLevel(e) {
        this._level = e
    }
    public getLevel() {
        return this._level
    }
    public getExp() {
        return this._exp
    }
    public setExp(e) {
        this._exp = e
    }
    public getVipLevel() {
        return this._vipLevel
    }
    public setVipLevel(e) {
        this._vipLevel = e
    }
    public setMoney(e) {
        this._nMoney = e
    }
    public getMoney() {
        return this._nMoney
    }
    public setCoins(e) {
        this._nCoins = e
    }
    public getCoins() {
        return this._nCoins
    }
    public setTicket(e) {
        this._nTicket = e
    }
    public getTicket() {
        return this._nTicket
    }
    public setBankruptTime(e) {
        this._bankruptTime = e
    }
    public getBankruptTime() {
        return this._bankruptTime
    }
    public getGuideID() {
        return this._nGuideID
    }
    public setGuideID(e, t = !0) {
        if (this._nGuideID = e, 0 != this._nGuideID && t && 9998 != this._nGuideID && 9999 != this._nGuideID) {
            var i = T_Config_Table.getVoByKey(49).value,
            n = i.split(",");
            this._nGuideID = Number(n[0]) + 1
        }
    }
    public setEverydayActive(e) {
        this._everydayActive = e
    }
    public getEverydayActive() {
        return this._everydayActive
    }
    public setEveryWeekActive(e) {
        this._everyWeekActive = e
    }
    public getEveryWeekActive() {
        return this._everyWeekActive
    }
    public getCurSkinId() {
        return this._nCurGunSkinId
    }
    public setCurSkinId(e) {
        if (0 == e) {
            var t = T_Config_Table.getVoByKey(51).value;
            e = Number(t)
        }
        this._nCurGunSkinId = e
    }
    public setCurGunBgId(e) {
        this._nCurGunBgId = e
    }
    public getCurGunBgId() {
        return this._nCurGunBgId
    }
    public getTatolChargeRMB() {
        return this._nTotalChargeRMB
    }
    public setTatolChargeRMB(e) {
        this._nTotalChargeRMB = e
    }
    public getMonthEndTime() {
        return this._nMonthEndTime
    }
    public setMonthEndTime(e) {
        this._nMonthEndTime = e
    } 
    public isTodayFirstLogin() {
        return this._bIsTodayFirstLogin
    }
    public setTodayFirstLogin(e) {
        0 == e ? this._bIsTodayFirstLogin = !1 : 1 == e && (this._bIsTodayFirstLogin = !0)
    }
    public setSignObj(e) {
        this._objSign.setData(e)
    }
    public getSignObj() {
        return this._objSign
    }
    public setCiriState(e) {
        this._nCiriState = e
    }
    public getCiriState() {
        return this._nCiriState
    }
    public setShareTimes(e) {
        this._shareTimes = e
    }
    public getShareTimes() {
        return this._shareTimes
    }
    public setIsFocusFlag(e) {
        this._isFocusFlag = e
    }
    public getIsFocusFlag() {
        return this._isFocusFlag
    }
    public getRankListByType(e) {
        for (var t = new Array,
        i = this._arrRankList.length,
        n = 0; i > n; n++) {
            var a = this._arrRankList[n];
            a._nRankType == e && t.push(a)
        }
        return t
    }
    public setRankList(e) {
        this._arrRankList.push(e)
    }
    public setIsTodayDraw(e) {
        0 == e ? this._bIsTodayDraw = !1 : 1 == e && (this._bIsTodayDraw = !0)
    }
    public isTodayDraw() {
        return this._bIsTodayDraw
    }
    public setRoomOnLine(e) {
        this._arrRoomOnline = e
    }
    public getRoomOnLineByID(e) {
        return this._arrRoomOnline[e]
    }
    public addChargedGears(e) {
        this._arrChargedGears.push(e)
    }
    public isCharged(e) {
        for (var t = this._arrChargedGears.length,
        i = 0; t > i; i++) if (this._arrChargedGears[i] == e) return ! 0;
        return ! 1
    }
    public addExchangeGears(e) {
        this._arrExchangeGears.push(e)
    }
    public isInExchanged(e) {
        for (var t = 0,
        i = this._arrExchangeGears; t < i.length; t++) {
            var n = i[t];
            if (n == e) return ! 0
        }
        return ! 1
    }
    public setInviteCode(e) {
        this._strInviteCode = e
    }
    public getInviteCode() {
        return this._strInviteCode
    }

    public setRoomId(e) {
        this._roomId = e;
    }
    public getRoomId() {
        return this._roomId;
    }

    public getAccount() {
        return this._account;
    }
    public setAccount(e) {
        this._account = e;
    }
    public getIdentity() {
        return this._identity
    }
    public setIdentity(e) {
        this._identity = e
    }

    public clear() {}
    public destroy() {}
}