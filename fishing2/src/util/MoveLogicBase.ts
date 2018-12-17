class MoveLogicBase {
	public constructor() {
	}

        public _nType;
        public _ojbParent;
        public _posDest;
        public _nCostTime ;
        public _nObjRotation;

	public create(e, t, i, n, a) {
        this._nType = e,
        this._ojbParent = t,
        this._posDest = n,
        this._nCostTime = a,
        this._nObjRotation = i
    }
    public start() {
        this._ojbParent && egret.Tween.get(this._ojbParent).to({
            x: this._posDest.x,
            y: this._posDest.y
        },
        this._nCostTime)
    }

    public startWithCall(e, t) {
        egret.Tween.get(this._ojbParent).to({
            rotation: this._ojbParent.rotation + this._nObjRotation,
            x: this._posDest.x,
            y: this._posDest.y
        },
        this._nCostTime).call(e, t)
    }

    public end() {
        this._ojbParent && (egret.Tween.removeTweens(this._ojbParent), this._ojbParent = null)
    }
}