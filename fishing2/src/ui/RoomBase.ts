class RoomBase extends FullView {
	public constructor() {
		super();
	}

    private _arrFish:Array<ActionBase>;
    private _arrBullet;

    public initFishList() {
        this._arrFish = new Array
    }
    public getFishList():Array<ActionBase> {
        return this._arrFish
    }
    public initBulletList() {
        this._arrBullet = new Array();
    }
    public getBulletList() {
        return this._arrBullet
    }
    public getBulletNumByPos(e, t) {
        for (var i = 0, n = 0; n < this._arrBullet.length; n++) {
            var pos = RoomUtil.getPosByFlip(e, t);
            this._arrBullet[n].belongGun == pos && i++;
        }
        return i;
    }
}