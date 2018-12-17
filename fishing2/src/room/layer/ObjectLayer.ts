class ObjectLayer extends egret.DisplayObjectContainer {
    public _layer_1:egret.DisplayObjectContainer;
    public _layer_2:egret.DisplayObjectContainer;
    public _layer_3:egret.DisplayObjectContainer;
	public constructor() {
		super();
        this._layer_1 = new egret.DisplayObjectContainer;
        this._layer_2 = new egret.DisplayObjectContainer;
        this._layer_3 = new egret.DisplayObjectContainer;
        this.addChildAt(this._layer_1, 1);
        this.addChildAt(this._layer_2, 2);
        this.addChildAt(this._layer_3, 3);
	}
    public addFishAt(e,t):void{
     switch (t) {
        case 1:
            this._layer_1.addChildAt(e, t);
            break;
        case 2:
            this._layer_2.addChildAt(e, t);
            break;
        case 3:
            this._layer_3.addChildAt(e, t)
        }
    }

}