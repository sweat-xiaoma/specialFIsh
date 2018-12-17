class PointsAction extends ActionBase {
	public constructor(e) {
		super(e);
	}

	public runByData(t, i=0) {
        var n = this;
        this.setActionAlive(!0);
        var a = this.getTween(), o = this.getActor(), r = t.length, s = o.x, l = o.y, u = o.rotation;
        for (var d = 0; r > d; d++) {
            var h = t[d];
            s += h.x,
            l += h.y,
            u += h.r;
            var c = h.e;
            a.to({ x: s, y: l, rotation: u }, h.t),
            function(t) {
                a.call(function() {
                    if (t > 0) {
                        var i = o.getType();
                        if (i == AddFishType.FISH)
                            t == PointEventEnum.FLIP_Y ? o.fishflipY() : t == PointEventEnum.FLIP_X;
                        else if (i == AddFishType.FISH_GROUP) 
                            for (var n = o.getFishList(), a = n.length, r = 0; a > r; r++) 
                                n[r].fishflipY();
                    }
                })
            } (c);
        }
        a.call(function() {
            n.setActionAlive(!1)
        })
    }

    public destory() {
        super.destory();
    }
}