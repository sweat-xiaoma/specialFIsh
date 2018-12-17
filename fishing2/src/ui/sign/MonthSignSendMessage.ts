class MonthSignSendMessage extends MessageBase {
    public _data;
    public _clazz;
   	public constructor() {
        super();
        var t = this;
        t._data = null,
        t._clazz = null;
        var i = dcodeIO.ProtoBuf.loadProto(ProtoFileEnum.fish);
        i.build("MonthSignSend");
    }
     public setOperationType = function(e) {
        this._data.set("operationType", e)
    }
     public getOperationType = function() {
        return this._data.get("operationType")
    }
     public setCurMonth = function(e) {
        this._data.set("curMonth", e)
    }
     public getCurMonth = function() {
        return this._data.get("curMonth")
    }
     public getPID = function() {
        return 2040
    }
     public initData () {
        this._data = new this._clazz
    }
     public setData (e) {
        this._data = this._clazz.decode(e)
    }
     public toByteArray () {
        var e = this._data.toArrayBuffer();
        return new egret.ByteArray(e)
    }
} 