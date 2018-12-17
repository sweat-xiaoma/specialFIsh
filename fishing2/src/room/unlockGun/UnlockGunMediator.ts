class UnlockGunMediator extends SimpleMediator {

    constructor(t){
        super(t, "UnlockGunMediator");
    }

    public onAdded() {
        super.onAdded.call(this),
        this.getView().initView()
    }
    public init() {}

    public destroy() {
        this.getView().destroy()
    }
}