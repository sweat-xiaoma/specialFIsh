class TweenTools {
	public constructor() {
	}

	public static upAndDown(t, i, n) {
    TweenTools.upOutIn(t, i, n)
}
public static showOutAndIn(t, i) {
    TweenTools.outAndIn(t, i)
}
public static showOutAndInHalf(t, i) {
    TweenTools.outAndInHalf(t, i)
}
public static ShowOutAndInMoreHalf(t, i) {
    TweenTools.outAndInMoreHalf(t, i)
}
public static showOutAndInAndScale(t, i) {
    TweenTools.outAndInAndScale(t, i)
}
public static showOuntAndInAndRotation(t, i) {
    TweenTools.outAndInAndRotation(t, i)
}
public static rotation(t, i) {
    TweenTools._rotate(t, i)
}
public static doop(t, i) {
    TweenTools._doop(t, i)
}
public static rotationFan(t, i) {
    TweenTools._rotateFan(t, i)
}
public static shrink(t, i, n) {
    TweenTools._shrink(t, i, n)
}
public static circle(t) {
    TweenTools._circle(t)
}
public static _circle(t) {
    t.scaleX = .2,
    t.scaleY = .2,
    t.alpha = 1;
    var i = egret.Tween.get(t, {
        loop: !1
    });
    i.to({
        scaleX: .7,
        scaleY: .7
    },
    700).to({
        scaleX: 1.2,
        scaleY: 1.2,
        alpha: 0
    },
    300).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools._circle(t)
    })
}
public static hop(t, i, n) {
    TweenTools._hop(t, i, n)
}
public static hopOnce(e, t, i) {
    var n = egret.Tween.get(e, {
        loop: !1
    });
    n.to({
        rotation: -4
    },
    100).to({
        rotation: -8
    },
    30).to({
        rotation: 0
    },
    30).to({
        rotation: 8
    },
    30).to({
        rotation: 0
    },
    30).to({
        rotation: -8
    },
    30).to({
        rotation: 0
    },
    30).to({
        rotation: 8
    },
    30).to({
        rotation: 4
    },
    30).to({
        rotation: 0
    },
    30).wait(1e3).call(function() {
        egret.Tween.removeTweens(e)
    })
}
public static _hop(t, i, n) {
    var a = egret.Tween.get(t, {
        loop: !1
    });
    a.to({
        rotation: -4
    },
    100).to({
        rotation: -8
    },
    30).to({
        rotation: 0
    },
    30).to({
        rotation: 8
    },
    30).to({
        rotation: 0
    },
    30).to({
        rotation: -8
    },
    30).to({
        rotation: 0
    },
    30).to({
        rotation: 8
    },
    30).to({
        rotation: 4
    },
    30).to({
        rotation: 0
    },
    30).wait(1e3).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools._hop(t, i, n)
    })
}
public static _shrink(t, i, n) {
    var a = egret.Tween.get(t, {
        loop: !1
    });
    a.to({
        scaleX: 1 - i,
        scaleY: 1 - i
    },
    n / 2).to({
        scaleX: 1 + i,
        scaleY: 1 + i
    },
    n / 2).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools._shrink(t, i, n)
    })
}

public static _rotate(t, i) {
    var n = egret.Tween.get(t, {
            loop: !1
        });
        n.to({
            rotation: t.rotation + 360
        },
        i).call(function() {
            egret.Tween.removeTweens(t);
            TweenTools._rotate(t, i);
        });
}

public static _doop(t, i) {
    var n = egret.Tween.get(t, {
        loop: !1
    });
    n.to({
        scaleY: .8,
        y: t.y + 10
    },
    i / 4).to({
        y: t.y - 30
    },
    i / 2).to({
        scaleY: 1,
        y: t.y
    },
    i / 4).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools._doop(t, i)
    })
}
public static _rotateFan(t, i) {
    var n = egret.Tween.get(t, {
        loop: !1
    });
    n.to({
        rotation: t.rotation - 360
    },
    i).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools._rotateFan(t, i)
    })
}
public static outAndIn(t, i) {
    var n = egret.Tween.get(t, {
        loop: !1
    });
    n.to({
        alpha: 0
    },
    i / 2).to({
        alpha: 1
    },
    i / 2).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools.outAndIn(t, i)
    })
}
public static outAndInHalf(t, i) {
    var n = egret.Tween.get(t, {
        loop: !1
    });
    n.to({
        alpha: .5
    },
    i / 2).to({
        alpha: 1
    },
    i / 2).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools.outAndInHalf(t, i)
    })
}
public static outAndInMoreHalf(t, i) {
    var n = egret.Tween.get(t, {
        loop: !1
    });
    n.to({
        alpha: .5
    },
    i / 2).to({
        alpha: 1
    },
    i / 2).wait(1e3).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools.outAndInHalf(t, i)
    })
}
public static outAndInAndScale(t, i) {
    var n = egret.Tween.get(t, {
        loop: !1
    });
    n.to({
        alpha: 0,
        scaleX: 1.2,
        scaleY: 1.2
    },
    i).call(function() {
        t.alpha = 1,
        t.scaleX = 1,
        t.scaleY = 1,
        egret.Tween.removeTweens(t),
        TweenTools.outAndInAndScale(t, i)
    })
}
public static outAndInAndRotation(t, i) {
    var n = egret.Tween.get(t, {
        loop: !1
    });
    n.to({
        alpha: 0,
        rotation: t.rotation + 180
    },
    i / 2).to({
        alpha: 1,
        rotation: t.rotation + 360
    },
    i / 2).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools.outAndInAndRotation(t, i)
    })
}
public static downOutIn(t, i, n) {
    var a = egret.Tween.get(t, {
        loop: !1
    });
    a.to({
        y: t.y + i
    },
    n / 2).to({
        y: t.y - i
    },
    n / 2).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools.upOutIn(t, i, n)
    })
}
public static upOutIn(t, i, n) {
    var a = egret.Tween.get(t, {
        loop: !1
    });
    a.to({
        y: t.y - i
    },
    n / 2).to({
        y: t.y + i
    },
    n / 2).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools.downOutIn(t, i, n)
    })
}
public static clearTween(e) {
    egret.Tween.removeTweens(e)
}
public static jump(t) {
    TweenTools.jumpOnce(t)
}
public static jumpOnce(t) {
    t.anchorOffsetY = t.height - 12.4;
    var i = t.x,
    n = t.y,
    a = egret.Tween.get(t, {
        loop: !1
    });
    a.to({
        x: i,
        y: n,
        scaleX: 1,
        scaleY: 1
    },
    10).to({
        x: i,
        y: n,
        scaleX: 1,
        scaleY: .84
    },
    30).to({
        x: i,
        y: n - 19,
        scaleX: 1,
        scaleY: 1.12
    },
    210).to({
        x: i,
        y: n,
        scaleX: 1,
        scaleY: .71
    },
    90).to({
        x: i,
        y: n,
        scaleX: 1,
        scaleY: 1.04
    },
    90).to({
        x: i,
        y: n,
        scaleX: 1,
        scaleY: 1
    },
    60).wait(690).call(function() {
        egret.Tween.removeTweens(t),
        TweenTools.jump(t)
    })
}
}