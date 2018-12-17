class ModelBase { //extends IDestory{
    constructor(){};
    public init() {};
    public send(t, i) {
        _Notification_.send(t, i)
    };
    public clear() {};
    public destroy() {
        throw new SimpleError("Subclass must be override destory!")
    };
}