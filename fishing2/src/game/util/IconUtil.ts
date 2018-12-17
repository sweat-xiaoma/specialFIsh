
class IconUtil {
    static getHeadIcon(e, t, i = 1) {
        var n = function(e) {
            var i = new egret.DisplayObjectContainer;
            // var n = new egret.DisplayObjectContainer;
            // var a = new egret.Bitmap(RES.getRes("main_iamge_avaBgR_png"));
            // a.x = a.y = -6,
            // i.addChild(a);
            var o = e.currentTarget;
            var r = o.data;
            var bmp:egret.Bitmap = new egret.Bitmap(r);
            bmp.width=65;
            bmp.height=65;
            // bmp.width = 140;
            // bmp.height = 140;
            // bmp.x = 8;
            // bmp.y = -40;
            // var shap:egret.Shape = new egret.Shape();
            // shap.graphics.beginFill(0);
            // shap.graphics.drawCircle(0, 0, 70);
            // shap.graphics.endFill();
            // shap.x = 79;
            // shap.y = 34;
            // bmp.mask = shap;
            // i.addChild(shap);
            // n.addChild(s);
            
            i.addChild(bmp);
            t(i);
        },
        a = function(e) {
            RES.getResAsync("TouXiang_2_png",
            function() {
                var e = new egret.DisplayObjectContainer;
                // var i = new egret.DisplayObjectContainer;
                // n = new egret.Bitmap(RES.getRes("main_iamge_avaBgR_png"));
                // n.x = n.y = -6,
                // e.addChild(n);
                var bmp:egret.Bitmap = new egret.Bitmap(RES.getRes("TouXiang_2_png"));
                bmp.width=65;
                bmp.height=65;
                // bmp.width = 177;
                // bmp.height = 177;
                // bmp.x = -10;
                // bmp.y = -52;
                // var shap:egret.Shape = new egret.Shape();
                // shap.graphics.beginFill(0);
                // shap.graphics.drawCircle(0, 0, 70);
                // shap.graphics.endFill();
                // shap.x = 79;
                // shap.y = 34;
                // bmp.mask = shap;
                // e.addChild(shap);
                // i.addChild(a),
                e.addChild(bmp);
                t(e);
            },
            self)
        },
        o = (Director.getModelByKey(UserModel), new egret.ImageLoader);
        o.crossOrigin = "anonymous",
        o.once(egret.Event.COMPLETE, n, self);
        o.once(egret.IOErrorEvent.IO_ERROR, a, self);
        o.load(e);
    }
    static getIconByIdAsync(t, i, n) {
        if (t == IconType.PROP) {
            var a = "";
            if (10001 == i) a = "common_coins_png";  // 金币
            else if (10002 == i) a = "common_diamond_png"; // 钻石
            else if (30002 == i) a = "common_fish_ticket_png";
            else if (10012 == i) a = "common_point_ticket_png";  // 点券
            else if (10013 == i) a = "common_active_icon_png";
            else {
                var o = T_Item_Table.getVoByKey(i);
                if (null == o) return console.warn("道具[" + i + "]不存在！"),
                void n(null);
                a = "goodsicon_" + i + "_png"
            }
            if (!RES.hasRes(a)) return console.warn("贴图资源不存在：" + a),
            void n(null);
            RES.getResAsync(a,
            function() {
                var e = RES.getRes(a),
                t = new egret.Bitmap(e);
                n(t)
            },
            this)
        } else if (t == IconType.BIG_PROP) {
            var r = "";
            if (10001 == i) r = "common_coins_png";
            else if (10002 == i) r = "common_diamond_png";
            else if (30002 == i) r = "common_fish_ticket_png";
            else {
                var o = T_Item_Table.getVoByKey(i);
                if (null == o) return console.warn("道具[" + i + "]不存在！"),
                void n(null);
                r = "goodsicon_big_" + i + "_png"
            }
            if (!RES.hasRes(r)) return console.warn("贴图资源不存在：" + r),
            void n(null);
            RES.getResAsync(r,
            function() {
                var e = RES.getRes(r),
                t = new egret.Bitmap(e);
                n(t)
            },
            this)
        } else if (t == IconType.EXCHANGE){}
        else if (t == IconType.CHARGE) {
            var s = "";
            if (s = "charge_" + i + "_png", !RES.hasRes(s)) return console.warn("贴图资源不存在：" + s),
            void n(null);
            RES.getResAsync(s,
            function() {
                var e = RES.getRes(s),
                t = new egret.Bitmap(e);
                n(t)
            },
            this)
        } else if (t == IconType.PAO) {
            var l = "",
            u = T_Item_Table.getVoByKey(i);
            if (null == u) return console.warn("道具[" + i + "]不存在！"),
            void n(null);
            if (l = "gunsicon_" + i + "_png", !RES.hasRes(l)) return console.warn("贴图资源不存在：" + l),
            void n(null);
            RES.getResAsync(l,
            function() {
                var e = RES.getRes(l),
                t = new egret.Bitmap(e);
                n(t)
            },
            this)
        } else if (t == IconType.PAOBG) {
            var d = "",
            h = T_Item_Table.getVoByKey(i);
            if (null == h) return console.warn("道具[" + i + "]不存在！"),
            void n(null);
            if (d = "gunBgsicon_" + i + "_png", !RES.hasRes(d)) return console.warn("贴图资源不存在：" + d),
            void n(null);
            RES.getResAsync(d,
            function() {
                var e = RES.getRes(d),
                t = new egret.Bitmap(e);
                n(t)
            },
            this)
        } else if (t == IconType.PAOSHOW) {
            var c = "",
            h = T_Item_Table.getVoByKey(i);
            if (null == h) return console.warn("道具[" + i + "]不存在！"),
            void n(null);
            if (c = "gunShowsicon_" + i + "_png", !RES.hasRes(c)) return console.warn("贴图资源不存在：" + c),
            void n(null);
            RES.getResAsync(c,
            function() {
                var e = RES.getRes(c),
                t = new egret.Bitmap(e);
                n(t)
            },
            this)
        } else if (t == IconType.PAO_CLONE) {
            var p = "",
            u = T_Item_Table.getVoByKey(i);
            if (null == u) return console.warn("道具[" + i + "]不存在！"),
            void n(null);
            if (p = "gunsiconClone_" + i + "_png", !RES.hasRes(p)) return console.warn("贴图资源不存在：" + p),
            void n(null);
            RES.getResAsync(p,
            function() {
                var e = RES.getRes(p),
                t = new egret.Bitmap(e);
                n(t)
            },
            this)
        } else if (t == IconType.CAIPAN) {
            var g = "";
            if (g = "caipan_" + i + "_png", !RES.hasRes(g)) return console.warn("贴图资源不存在：" + g),
            void n(null);
            RES.getResAsync(g,
            function() {
                var e = RES.getRes(g),
                t = new egret.Bitmap(e);
                n(t)
            },
            this)
        } else if (t == IconType.VIP_SHOW) {
            var _ = "";
            if (_ = "vip_" + i + "_png", !RES.hasRes(_)) return console.warn("贴图资源不存在：" + _),
            void n(null);
            RES.getResAsync(_,
            function() {
                var e = RES.getRes(_),
                t = new egret.Bitmap(e);
                n(t)
            },
            this)
        }
    }
}