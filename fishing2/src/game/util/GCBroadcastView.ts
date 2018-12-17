class GCBroadcastView extends egret.DisplayObjectContainer {
   
   public _type;

   constructor(e){
       super();
       this._type = e;
   }
    public setHallData = function(e) {
        this.createHallUI(e)
    }
    public setRoomData = function(e) {
        this.createRoomUI(e)
    }
    public createHallUI = function(e) {
        var t = new egret.DisplayObjectContainer, 
        i = new egret.Bitmap(RES.getRes("common_laba_bg_png")),
        n = new egret.Rectangle(13, 13, 31, 18);
        i.scale9Grid = n,
        i.width = 650,
        i.height = 38,
        i.anchorOffsetX = i.width >> 1,
        i.anchorOffsetY = i.height >> 1,
        this.addChild(i),
        this._tx = new egret.TextField,
        this._tx.height = i.height - 5,
        this._tx.textAlign = egret.HorizontalAlign.LEFT,
        this._tx.y -= (i.height >> 1) - 8,
        this._tx.x = CONFIG.contentWidth + CONFIG.adaptX >> 1,
        this._tx.size = 23;
        for (var a = "",
        o = 0; o < e.length; o++) a += e[o],
        o != e.length - 1 && (a += "                      ");
        this._tx.textFlow = (new egret.HtmlTextParser).parser(a),
        t.addChild(this._tx);
        var r = new egret.Bitmap(RES.getRes("common_laba_png"));
        this.addChild(r),
        r.x = -315,
        r.y = -16;
        var s = new egret.Shape;
        s.graphics.beginFill(16711680, 1),
        s.graphics.drawRect(0, 0, 580, 40),
        s.graphics.endFill(),
        t.addChild(s),
        s.anchorOffsetX = i.width / 2 + 60,
        s.anchorOffsetY = i.height >> 1,
        s.x = i.x + 115,
        s.y = i.y,
        t.mask = s,
        this.addChild(t)
    }
    public createRoomUI = function(t) {
        var i = new egret.Bitmap(RES.getRes("common_laba_bg_png")),
        n = new egret.Rectangle(13, 13, 31, 18);
        i.scale9Grid = n,
        i.height = 40,
        this._tx = new egret.TextField,
        this._tx.height = i.height - 5,
        3 == this._type ? this._tx.textFlow = (new egret.HtmlTextParser).parser("<font color='#2ca3fe' size='24'><b>" + Language.getText(221) + "</b></font><font color='#ff60cb' size='24'><b>" + t + "</b></font>") : this._tx.textFlow = (new egret.HtmlTextParser).parser(t),
        this._tx.anchorOffsetX = this._tx.width >> 1,
        this._tx.anchorOffsetY = (this._tx.height >> 1) - 5,
        i.width = this._tx.width + 100,
        i.anchorOffsetX = i.width >> 1,
        i.anchorOffsetY = i.height >> 1,
        this.addChild(i),
        this.addChild(this._tx)
    }
    public startHallMsg = function(e) {
        var t = this,
        i = egret.Tween.get(this._tx, {
            loop: !1
        }),
        n = (this._tx.width + (CONFIG.contentWidth >> 1)) / 100 * 1e3;
        i.to({
            x: -(this._tx.width + (CONFIG.contentWidth >> 1))
        },
        n).call(function() {
            egret.Tween.removeTweens(t._tx),
            t.parent && t.parent.removeChild(t),
            e()
        })
    }
    public startRoomMsg = function(e) {
        var t = this,
        i = 3500;
        3 == this._type && (i = 1e4),
        egret.setTimeout(function() {
            var i = egret.Tween.get(t);
            i.to({
                alpha: 0
            },
            500).call(function() {
                t.parent && t.parent.removeChild(t),
                e()
            })
        },
        this, i)
    }
    public destroy = function() {
        egret.Tween.removeTweens(this._tx),
        egret.Tween.removeTweens(this)
    }
}