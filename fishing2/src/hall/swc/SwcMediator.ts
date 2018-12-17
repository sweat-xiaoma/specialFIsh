class SwcMediator extends SimpleMediator {
	public constructor(t) {
		super(t);
	}

	public onAdded() {
		super.onAdded();
        this.getView().initView();
        // this.subscrib(NotifyEnum.CHANGE_SETTING, this.changeStateX);
    }
    public init() {}
    
    public destroy() {
        this.getView().destroy();
        // this.unsubscribByType(NotifyEnum.CHANGE_SETTING);
    }
}