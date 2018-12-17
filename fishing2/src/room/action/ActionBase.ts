class ActionBase {

	public _actor;
	public _tween:egret.Tween;
	public _actionAlive;

	public constructor(e) {
        this._actor = e,
        this._tween = egret.Tween.get(this._actor, {loop: false})
	}

    public getActor() {
        return this._actor
    }

    public getTween() {
        return this._tween
    }

    public action(e) {}

    public runaway() {
        var e = this;
        this._tween = egret.Tween.get(this._actor);
        this._tween.wait(2700).to({
            alpha: 0
        },
        2500, egret.Ease.backOut),
        this._tween.call(function() {
            egret.Tween.removeTweens(e._actor),
            e.setActionAlive(!1),
            e._actor.destory(),
            e._actor.alpha = 1
        })
    }

    public pause() {
        egret.Tween.pauseTweens(this._actor)
    }

    public resume() {
        egret.Tween.resumeTweens(this._actor)
    }

    public getActionAlive() {
        return this._actionAlive
    }

    public setActionAlive(e) {
        this._actionAlive = e
    }

    public destory() {
        egret.Tween.removeTweens(this._actor),
        this._actor.destory(),
        this._actor = null,
        this._tween = null
    }
}