class ProtobufUtil {

	public static _isInit = false;
	public static _instance:ProtobufUtil;

	private _gunSendMsg:FishingGunReq;
	private _hitSendMsg:FishingHitReq;
	private _bulletDisappearMsg;

	public constructor() {
		if (ProtobufUtil._isInit) throw new SimpleError("");
        ProtobufUtil._isInit = !0
	}

	
	public static getInstance() {
		return this._instance ? this._instance: (this._instance = new ProtobufUtil, this._instance)
	}

	public initCacheProto() {
		this._gunSendMsg = new FishingGunReq,
		this._gunSendMsg.initData(),
		this._hitSendMsg = new FishingHitReq,
		this._hitSendMsg.initData();
		// this._bulletDisappearMsg = new BulletDisappearMessage,
		// this._bulletDisappearMsg.initData()
	}

	public getGunSend():FishingGunReq {
		return this._gunSendMsg
	}

	public getHitSend():FishingHitReq {
		return this._hitSendMsg
	}
	
	public getBulletDisappear() {
		return this._bulletDisappearMsg
	}
}