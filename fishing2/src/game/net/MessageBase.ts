class MessageBase {

    public static appModel;

    protected msgBodyCls;
    protected msgBodyIns;

	public constructor() {

	}

    public static initModule() {
        var builder = dcodeIO.ProtoBuf.loadProto(ProtoFileEnum.fish);
        MessageBase.appModel = builder.build("Proto.Model");
    }

    public initData() {
        this.msgBodyIns = new this.msgBodyCls();
    }

    public setData(buf) {
        this.msgBodyIns = this.msgBodyCls.decode(buf);
    }

    public toByteArray() {
        var b = this.msgBodyIns.toArrayBuffer();
        return b;
    }


    public toJson() {
        return this.msgBodyIns.encodeJSON();
    }
}