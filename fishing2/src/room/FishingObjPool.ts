
class FishingObjPool  {
    public static _instance:FishingObjPool = null;
    public _isInit = false;
    public maxBulletNum = 80;

    public nBulletObjPool:Array<BulletBase>;  // 子弹池
    public nFishingNetPool;   // 网池
    public nFishPool ;        // 鱼池
    public nGroupFishPool; 

    constructor() {
        if (this._isInit) throw new SimpleError("");
        this._isInit = true,
        this.reset()
    }
    public reset() {
        this.nBulletObjPool = new Array,
        this.nFishingNetPool = new Array,
        this.nFishPool = new Array,
        this.nGroupFishPool = new Array
    }
    public static getInstance() {
        if (!this._instance) {
			 this._instance = new FishingObjPool();
		}
        return this._instance;
    }
    // 从缓存池里取出子弹对象
    public getBulletObj(m) {
        if (0 == this.nBulletObjPool.length) return new BulletBase(m);
        // var bulletType = T_Bullet_Table.getVoByKey(bulletId).type;
        // var bulletType = bulletId; // 子弹id和type一致
        var bullet:BulletBase = this.getBulletObjByType(m);
        bullet.resetData();
        return bullet;
    }
    /** 根据子弹类型获取子弹对象 */
    private getBulletObjByType(m) {
        let bullet:BulletBase = null;
        for (var a = 0; a < this.nBulletObjPool.length; a++) {
            var poolBullet = this.nBulletObjPool[a];
            if (poolBullet.getBulletType() == m.bulletId) {
                bullet = poolBullet;
                break
            }
        }
        if (null == bullet) 
            bullet = new BulletBase(m);
        else {
            var r = this.nBulletObjPool.indexOf(bullet);
            this.nBulletObjPool.splice(r, 1)
        }
        return bullet
    }

    // 把子弹放到子弹缓存池里
    public insertBulletPool(bullet:BulletBase):Boolean {
        var bType = bullet.getBulletType();
        var a = 0;
        for (var i = 0; this.nBulletObjPool.length > i; i++) {
            if (this.nBulletObjPool[i].getBulletType() == bType && (a++, a > this.maxBulletNum)) 
                return false;
        }

        FishingObjPool.getInstance().nBulletObjPool.push(bullet);
        return true;
    }

   // 获取渔网  
   public getFishingNetById(n:T_Gun_skin):netObj {
        var t = this.nFishingNetPool.length;
        let net:netObj;
        if ( t <= 0) {
            net = new netObj(n);
        }else{
            net = this.getNetByID(n);
        }
        
        return net
    }

    private getNetByID(e:T_Gun_skin) {
        var net:netObj = null;
        var i = this.nFishingNetPool.length;
        for (var n = 0; i > n; n++) {
            var a = this.nFishingNetPool[n];
            if (a.nId == e.net) {
                net = a;
                break
            }
        }
        if (null == net) 
            net = new netObj(e);
        else {
            var o = this.nFishingNetPool.indexOf(net);
            this.nFishingNetPool.splice(o, 1)
        }

        return net;
    }
    public getFishById(e) {
        for (var t = null,
        i = -1,
        n = this.nFishPool.length,
        a = 0; n > a; a++) {
            var o = this.nFishPool[a];
            if (o.getFishId() == e) {
                t = o,
                i = a;
                break
            }
        }
        return - 1 != i ? (this.nFishPool.splice(i, 1), t.resetData(), t) : null
    }
    public isMaxFishById(e) {
        var t = 0,
        i = T_Fish_Table.getVoByKey(e);
        i && (t = i.cacheNum);
        for (var n = 0,
        a = this.nFishPool.length,
        o = 0; a > o; o++) {
            var r = this.nFishPool[o];
            if (r.getFishId() == e && (n++, n >= t)) return ! 0
        }
        return ! 1
    }

    public insertFishPool(e) {
        var t = e.getFishId();
        return this.isMaxFishById(t) ? (e.destory(), void(e && e.parent && (e.parent.removeChild(e), e = null))) : (e.destory(), e.resetData(), void this.nFishPool.push(e))
    }
}