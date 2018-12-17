class ChargeSendMessage extends MessageBase {
    public _data;
    public _clazz;
   	public constructor() {
        super();
        var t = this;
        t._data = null,
        t._clazz = null;
        var i = dcodeIO.ProtoBuf.loadProto(ProtoFileEnum.fish);
        i.build("ChargeSend");
    }
    public setChargeId (e) {
        this._data.set("chargeId", e)
    }
    public getChargeId = function() {
        return this._data.get("chargeId")
    }
    public getPID () {
        return 2037
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
