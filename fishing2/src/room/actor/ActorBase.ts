class ActorBase extends egret.DisplayObjectContainer {

    private _actorType;
    private _uniqId:number;
    protected _bFlipY:boolean;
    protected _fid:number;
    
    public FISH_LAYER;
    public EFFECT_LAYER;
    public CHASIS_LAYER;
    public FISH_POP_LAYER;

	public constructor() {
		super();
	}

    public actionEndCallback() {}
    public getFishId() {
        return this._fid
    }
    public resetData() {}

    public hitRect(e, t):number {
        var i = this.hitTestPoint(e, t);
        return i ? 0 : -1
    }

    public setUniqId(e) {
        this._uniqId = e
    }
    public getUniqId() {
        return this._uniqId
    }
    public setType(e) {
        this._actorType = e
    }
    public getType() {
        return this._actorType
    }
    public flipX(e) {
        this.FISH_LAYER.scaleX = 1 == e ? -1 : 1
    }
    public flipY(e) {
        for (var t = this.FISH_LAYER.numChildren,
        i = 0; t > i; i++) {
            var n = this.FISH_LAYER.getChildAt(i);
            n.scaleY = 1 == e ? -1.5 : 1.5
        }
    }
    public isFlipY() {
        return this._bFlipY
    }
    public fishflipY() {}
    public playHitEffect() {}
    public playDead(e) {
        void 0 === e && (e = !1)
    }
    public getFISH_LAYER() {
        return this.FISH_LAYER
    }
    public getEFFECT_LAYER() {
        return this.EFFECT_LAYER
    }
    public destory() {
        this.removeChildren()
    }
}