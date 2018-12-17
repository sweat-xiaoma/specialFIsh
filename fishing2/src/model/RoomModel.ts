class RoomModel extends ModelBase {

	private _roomerList:Array<Roomer>;
	private _fishList:Array<Fish>;
	private _phoenixObj;

	public constructor() {
		super();
	}

	public init() {
        this._roomerList = new Array();
        this._fishList = new Array();
    }

    public addRoomer(e:Roomer) {
        this._roomerList.length < 4 ? this._roomerList.push(e) : console.error("房间人数已满!")
    }

    public removeRoomer(e:Roomer) {
        for (var t = 0; t < this._roomerList.length; t++) 
            if (this._roomerList[t].getUserId() == e.getUserId()) {
                this._roomerList.splice(t, 1);
                break
            }
    }

    public getRoomerById(e) {
        for (var t = this._roomerList.length, i = 0; t > i; i++) {
            if (this._roomerList[i].getUserId() == e) 
                return this._roomerList[i];
        }
        return null;
    }

    public getRoomerByPos(e) {
        for (var t = this._roomerList.length, i = 0; t > i; i++) {
            if (this._roomerList[i].getRoomPos() == e) 
                return this._roomerList[i];
        }
        return null;
    }

    public getRoomerList():Array<Roomer> {
        return this._roomerList;
    }

    public addRoomLiveFish(e) {
        this._fishList.push(e);
    }

    public isPathExist(e):boolean {
        for (var t = 0; t < this._fishList.length; t++) {
            var i = this._fishList[t];
            if (i.pathId == e) return ! 0
        }
        return ! 1
    }

    public getFishList():Array<Fish> {
        return this._fishList;
    }

    public setPhoenix(e) {
        this._phoenixObj = e
    }

    public getPhoenix() {
        return this._phoenixObj
    }

    public clearRoom() {
        console.log("clearRoom");
        this._roomerList = new Array();
        this._fishList = new Array();
        this._phoenixObj = null;
    }

    public clear() {}

    public destroy() {
        this._roomerList = null,
        this._fishList = null
    }
}