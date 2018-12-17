/** mc动画扩展类 */
class MovieFish extends egret.MovieClip {
    public _type:any;
    public _callFun:Function;
	public constructor(t, i = egret.Event.COMPLETE,n = null) {
		super(t);
        this._type = i,
        this._callFun = n;
	}
 
    public initEvent():void{
        this.addEventListener(this._type, this.complete, this)
    }
    private complete():void{
        this.removeEventListener(this._type, this.complete, this);
        this && this._callFun && this._callFun(),
        this.parent && this.parent.removeChild(this),
        this._callFun = null,
        this._type = null
    }
}
