class LotteryModel extends ModelBase {

    private _todayCount = 0;
    private _getArr;
    private _score = 0;
    private _killNum = 0;
    constructor(){
        super();
    }
   
    public init(){
        this._getArr = new Array;
        var e = T_Config_Table.getVoByKey(15).value;
        var t = e.split("_");
        for (var i = 0; i < t.length; i++) 
            this._getArr.push(Number(t[i]));
    }
    public getMaxKill(e) {
        return this._getArr[e];
    }
    public setScore(e) {
        this._score = e
    }
    public getScore() {
        return this._score
    }
    public setKillNum(e) {
        this._killNum = e
    }
    public getKillNum() {
        return this._killNum
    }
    public setTodayCount(e) {
        if (e > 1) e = 1;
        this._todayCount = e;
    }
    public getTodayCount() {
        return this._todayCount;
    }
    public clear(){}
    public destroy(){}
}
