class FirstChargeMediator extends SimpleMediator {
    public constructor(t) {
		super(t);
	}
    public onAdded () {
        super.onAdded.call(this),
        this.getView().initView()
    }
    public nit = function() {}
    public destroy () {
        this.getView().destroy()
    }
} 