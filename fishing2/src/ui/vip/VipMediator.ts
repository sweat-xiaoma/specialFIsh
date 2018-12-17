class VipMediator extends SimpleMediator{
   	public constructor(t) {
		super(t);
	}
    public onAdded() {
        super.onAdded.call(this);
        this.getView().initView();
    }
    public init () {}
    public destroy () {
        this.getView().destroy()
    }

} 
