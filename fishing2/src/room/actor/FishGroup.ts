class FishGroup extends ActorBase {

	private _loadCallback;
	private _fishList:Array<FishBase>;

	public constructor(e, i, n=null) {
		super();
		this._loadCallback = n;
        this._fishList = new Array();
        this.init(e, i);
	}

	public init(groupId:number, uidArr:Array<number>) {
        var n = this;
        var group = T_FishGroup_Table.getVoByKey(groupId);
        this._fid = groupId;
        var fishId = group.fishId;
        var r = group.pos.split("|");
        var s = uidArr.length;
        var l = 0;
        for (var u = 0; s > u; u++) {
            var d = FishingObjPool.getInstance().getFishById(fishId);
            if (null != d) {
                setTimeout(function() {
                    l++,
                    l >= s && n._loadCallback && n._loadCallback()
                }, .001),
                egret.Tween.removeTweens(d),
                d.parent && d.parent.removeChild(d),
                this.addChild(d);
                var h = r[u].split(",");
                d.setFishPosition(new egret.Point(Number(h[0]), Number(h[1]))),
                d.setUniqId(uidArr[u]),
                this._fishList.push(d)
            } else {
                d = new FishBase(fishId,
                function() {
                    l++,
                    l >= s && n._loadCallback && n._loadCallback()
                });
                var h = r[u].split(",");
                d.setFishPosition(new egret.Point(Number(h[0]), Number(h[1]))),
                d.setType(AddFishType.FISH),
                d.setUniqId(uidArr[u]),
                this.addChild(d),
                this._fishList.push(d)
            }
        }
    }

    public setFishPosition(e) {
        this.x = e.x,
        this.y = e.y
    }

    public getFishList() {
        return this._fishList
    }

    public fishflipY() {
        for (var e = 0; e < this._fishList.length; e++) this._fishList[e].fishflipY()
    }
    
    public destory() {
        this.removeChildren(),
        this.parent && this.parent.removeChild(this)
    }
}