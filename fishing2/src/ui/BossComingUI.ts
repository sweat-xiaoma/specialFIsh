class BossComingUI extends eui.Component {

	public constructor() {
		super();
	}

     public setData = function(e, t) {
        var i = RES.getRes(e),
        n = RES.getRes(t),
        a = new egret.Bitmap(i);
        a.anchorOffsetX = a.width,
        a.anchorOffsetY = a.height,
        this.name_1.addChild(a);
        var o = new egret.Bitmap(n);
        o.anchorOffsetX = o.width,
        o.anchorOffsetY = o.height,
        this.rate_1.addChild(o);
        var r = new egret.Bitmap(i);
        r.anchorOffsetX = r.width,
        r.anchorOffsetY = r.height,
        this.name_2.addChild(r);
        var s = new egret.Bitmap(n);
        s.anchorOffsetX = s.width,
        s.anchorOffsetY = s.height,
        this.rate_2.addChild(s);
        var l = new egret.Bitmap(i);
        l.anchorOffsetX = l.width,
        l.anchorOffsetY = l.height,
        this.name_3.addChild(l);
        var u = new egret.Bitmap(n);
        u.anchorOffsetX = u.width,
        u.anchorOffsetY = u.height,
        this.rate_3.addChild(u)
    }
}