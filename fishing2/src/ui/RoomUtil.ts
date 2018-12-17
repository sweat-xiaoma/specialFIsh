
// 临时放这里
enum PointEventEnum
{
    FLIP_X = 1,
    FLIP_Y
}

class RoomUtil{
   static getAvaPosByFlip(e, t, i) {
        if (!t) return RoomAvaPosEnum["GUN_POS_" + e + "_" + (i + 1)];
        switch (e) {
        case RoomPosEnum.GUN_POS_0:
            return RoomAvaPosEnum["GUN_POS_3_" + (i + 1)];
        case RoomPosEnum.GUN_POS_1:
            return RoomAvaPosEnum["GUN_POS_2_" + (i + 1)];
        case RoomPosEnum.GUN_POS_2:
            return RoomAvaPosEnum["GUN_POS_1_" + (i + 1)];
        case RoomPosEnum.GUN_POS_3:
            return RoomAvaPosEnum["GUN_POS_0_" + (i + 1)];
        }
    }

    public static getPosByFlip(e, isFlip) {
        if (!isFlip) return e;
        switch (e) {
        case RoomPosEnum.GUN_POS_0:
            return RoomPosEnum.GUN_POS_3;
        case RoomPosEnum.GUN_POS_1:
            return RoomPosEnum.GUN_POS_2;
        case RoomPosEnum.GUN_POS_2:
            return RoomPosEnum.GUN_POS_1;
        case RoomPosEnum.GUN_POS_3:
            return RoomPosEnum.GUN_POS_0
        }
    }
    
    static getMyPosByFlip(e) {
        switch (e) {
        case RoomPosEnum.GUN_POS_0:
        case RoomPosEnum.GUN_POS_3:
            return RoomPosEnum.GUN_POS_0;
        case RoomPosEnum.GUN_POS_1:
        case RoomPosEnum.GUN_POS_2:
            return RoomPosEnum.GUN_POS_1
        }
        return 0
    }
    
    static getAngleByFlip(e, t) {
        return t ? e + 180 : e
    }
    static getAngleByPos(e, t) {
        switch (t) {
        case RoomPosEnum.GUN_POS_0:
            return e + 180;
        case RoomPosEnum.GUN_POS_1:
            return e + 180;
        case RoomPosEnum.GUN_POS_2:
            return e;
        case RoomPosEnum.GUN_POS_3:
            return e + 180
        }
    }
    static getPointByPos(e, t) {
        if (t) switch (e) {
        case RoomPosEnum.GUN_POS_0:
            return new egret.Point(1115, 65);
        case RoomPosEnum.GUN_POS_1:
            return new egret.Point(235, 65);
        case RoomPosEnum.GUN_POS_2:
            return new egret.Point(1115, 629);
        case RoomPosEnum.GUN_POS_3:
            return new egret.Point(235, 629)
        } else switch (e) {
        case RoomPosEnum.GUN_POS_0:
            return new egret.Point(235, 629);
        case RoomPosEnum.GUN_POS_1:
            return new egret.Point(1115, 629);
        case RoomPosEnum.GUN_POS_2:
            return new egret.Point(235, 65);
        case RoomPosEnum.GUN_POS_3:
            return new egret.Point(1115, 65)
        }
        return null
    }
    static getGunPointByPos(e, t) {
        if (t) switch (e) {
        case RoomPosEnum.GUN_POS_0:
            return new egret.Point(890, 165);
        case RoomPosEnum.GUN_POS_1:
            return new egret.Point(400, 165);
        case RoomPosEnum.GUN_POS_2:
            return new egret.Point(890, 529);
        case RoomPosEnum.GUN_POS_3:
            return new egret.Point(400, 529)
        } else switch (e) {
        case RoomPosEnum.GUN_POS_0:
            return new egret.Point(400, 529);
        case RoomPosEnum.GUN_POS_1:
            return new egret.Point(880, 529);
        case RoomPosEnum.GUN_POS_2:
            return new egret.Point(400, 165);
        case RoomPosEnum.GUN_POS_3:
            return new egret.Point(880, 165)
        }
        return null
    }
    static getMaxScoreFish(fishList):ActorBase {
        var len = fishList.length;
        if (0 >= len) return null;
        var n = fishList[0].getActor();
        if (n.getType() == AddFishType.FISH) {
            for (var a = 1; len > a; a++) {
                var o = fishList[a].getActor();
                if (o.getType() == AddFishType.FISH) {
                    var r = o;
                    n.getFishScore() < r.getFishScore() && (n = fishList[a].getActor())
                } else if (o.getType() == AddFishType.FISH_GROUP) {
                    var s = o.getFishList(),
                    l = RoomUtil.getMaxScoreFishFromGroup(s);
                    if (null == l) continue;
                    n.getFishScore() < l.getFishScore() && (n = l)
                }
            }
            return n
        }
        if (n.getType() == AddFishType.FISH_GROUP) {
            for (var l = RoomUtil.getMaxScoreFishFromGroup(n.getFishList()), a = 1; len > a; a++) {
                var o = fishList[a].getActor();
                if (o.getType() == AddFishType.FISH) {
                    var r = o;
                    l.getFishScore() < r.getFishScore() && (l = r)
                } else if (o.getType() == AddFishType.FISH_GROUP) {
                    var s = o.getFishList(),
                    u = RoomUtil.getMaxScoreFishFromGroup(s);
                    if (null == u) continue;
                    l.getFishScore() < u.getFishScore() && (l = u)
                }
            }
            return l
        }
        return null
    }
    static getMaxScoreFishFromGroup(e) {
        if (e.length <= 0) return null;
        for (var t = e[0], i = 1; i < e.length; i++) t.getFishScore() < e[i].getFishScore() && (t = e[i]);
        return t
    }

    /*
     *取得最大分值的几条鱼
     */
    static getMaxScoreFishByNum(fishList, num) {
        function i(e, t) {
            var i = 0,
            n = 0,
            a = e.getActor();
            if (a.getType() == AddFishType.FISH) i = a.getFishScore();
            else if (a.getType() == AddFishType.FISH_GROUP) {
                var o = a.getFishList();
                o && o.length > 0 && (i = o[0].getFishScore())
            }
            var r = t.getActor();
            if (r.getType() == AddFishType.FISH) n = r.getFishScore();
            else if (r.getType() == AddFishType.FISH_GROUP) {
                var o = r.getFishList();
                o && o.length > 0 && (n = o[0].getFishScore())
            }
            return i > n ? -1 : i === n ? 0 : 1
        }
        var n = new Array;
        fishList.sort(i);
        for (var a = 0,
        o = 0; o < fishList.length; o++) {
            var r = fishList[o].getActor();
            if (a >= num) break;
            if (r.getType() == AddFishType.FISH) n.push(r),
            a++;
            else if (r.getType() == AddFishType.FISH_GROUP) {
                var s = r.getFishList();
                s && s.length > 0 && s[0] && (n.push(s[0]), a++)
            }
        }
        return n
    }

    /** 根据id获取fish */
    static getFishById(e, t) {
        for (var i = e.length,n = 0; i > n; n++) {
            var a = e[n].getActor();
            if (a.getType() == AddFishType.FISH_GROUP){
                for (var o = a.getFishList(), r = o.length, s = 0; r > s; s++) 
                {
                    var l = o[s];
                    if (t == l.getUniqId()) return l
                }
            } else if (AddFishType.FISH) {
                var l = a;
                if (l.getUniqId() == t) return l
            }
        }
        return null
    }
    static getActionByUid(fishList:Array<ActionBase>, fishUid) {
        for (var i = fishList.length, n = 0; i > n; n++) {
            var a:ActorBase = fishList[n].getActor();
            if (a.getType() == AddFishType.FISH) {
                if (a.getUniqId() == fishUid) return fishList[n];
            }
        }
        return null
    }
    static getBonusFish(e) {
        for (var t = new Array,
        i = e.length,
        n = 0; i > n; n++) {
            var a = e[n].getActor();
            if (a.getType() == AddFishType.FISH_GROUP) for (var o = a.getFishList(), r = 0; r < o.length; r++) {
                var s = o[r],
                l = s.getFishId(),
                u = T_Fish_Table.getVoByKey(l);
                u.functionType == FishType.BOUNS && t.push(s)
            } else if (AddFishType.FISH) {
                var s = a,
                l = s.getFishId(),
                u = T_Fish_Table.getVoByKey(l);
                u.functionType == FishType.BOUNS && t.push(s)
            }
        }
        return t
    }

    static getFishPathById(id) {
        var fishPaht:T_FishPath = T_FishPath_Table.getVoByKey(id);
        var ptArr = fishPaht.path.points;
        var pathArr = new Array();
        for (var a = 0; a < ptArr.length; a++) {
            var o = ptArr[a];
            pathArr.push(new PathPoint(Number(o.x), Number(o.y), Number(o.r), Number(o.d), Number(o.e)));
        }
        return pathArr;
    }

    // 碰撞检测  子弹和鱼
    static hitRect(e:BulletBase, fish:FishBase, fishType:Number):number {
        var n = -1;
        if (fishType == AddFishType.FISH || fishType == AddFishType.CATCH_WHOLE_FISH){
            n = fish.hitRect(e.x, e.y);
        }
        return n
        // if (fishType == AddFishType.FISH || fishType == AddFishType.CATCH_WHOLE_FISH) 
        //     n = fish.hitRect(e.x, e.y);
        // else if (fishType == AddFishType.FISH_GROUP) {
        //     var a = (<FishGroup>fish).getFishList();
        //     if (!a) return n;
        //     for (var o = a.length,
        //     r = 0; o > r && (n = a[r].hitRect(e.x, e.y), !(n > 0)); r++);
        // }
    }
    // 碰撞检测 鱼和鱼网
    static hitRectByNet(bullet:BulletBase,net:netObj, fish:FishBase, fishType:Number):number {
        var n = -1;
        if (fishType == AddFishType.FISH || fishType == AddFishType.CATCH_WHOLE_FISH) {
            if (net && net.gunType != GunType.Laser){
                n = fish.getHitFishByNet(net);
            }else{
                n = fish.getHitFishByNet(bullet);
            }
        }
        return n
    }

    static getChasisByType(e, t) {
        if (e == ChasisFish.GROUP_FISH) switch (t) {
        case ChasisType.GROUP_S:
            return "chassis_group_small_png";
        case ChasisType.GROUP_B:
            return "chassis_group_big_png";
        default:
            return "chassis_group_big_png"
        }
    }
    static getAngle(e, t, i, n) {
        var a = Math.abs(e - i),
        o = Math.abs(t - n),
        r = Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2)),
        s = o / r,
        l = (Math.acos(s), Math.floor(Math.asin(o / r) / Math.PI * 180));
        return i >= e && t >= n ? l: e >= i && t >= n ? 180 - l: e >= i && n >= t ? 180 + l: i >= e && n >= t ? 360 - l: l
    }
    static fishDeadHandlerByQms(e, t, i, n, a, o) {
        for (var r = 0,
        s = 0,
        l = 0,
        u = e.length,
        d = 0; u > d; d++) {
            var h = e[d].getActor();
            if (h.getType() == AddFishType.FISH || h.getType() == AddFishType.CATCH_WHOLE_FISH) {
                if (h.getUniqId() == t) {
                    var c = h.localToGlobal();
                    r = c.x,
                    s = c.y,
                    l = h.getFishId(),
                    h.getIsGroupFish() ? h.playDead(!0) : h.playDead(!1);
                    var p = e.indexOf(e[d]);
                    p >= 0 && e.splice(p, 1);
                    break
                }
            } else if (h.getType() == AddFishType.FISH_GROUP) for (var g = h.getFishList(), _ = 0; _ < g.length; _++) {
                var y = g[_];
                if (y.getUniqId() == t) {
                    var c = y.localToGlobal();
                    r = c.x,
                    s = c.y,
                    l = y.getFishId(),
                    y.playDead(!0),
                    g.splice(_, 1);
                    break
                }
            }
            if (0 != l) break
        }
        if (! (0 >= l)) {
            var m = Director.getModelByKey(RoomModel).getRoomerById(i);
            GameUtil.flyScores(l, new egret.Point(r, s), new egret.Point(n.x, n.y), a, i);
            var f = T_Fish_Table.getVoByKey(l),
            v = T_Gun_Table.getVoByKey(m.getGunRate()),
            T = v.bulletNum;
            FrameUtil.playAddCoinsEff(f.score * T, new egret.Point(r, s), a, i),
            SoundManager.playEffectSound("drop_gold")
        }
    }

    // 鱼死亡 fishList, fishId, userId
    static fishDeadHandler(fishList, fishUid, userId, n, a, o, r) {
        for (var s = 0,
        l = 0,
        u = 0,
        len = fishList.length,
        h = 0; len > h; h++) {
            var c = fishList[h].getActor();
            if (c.getType() == AddFishType.FISH || c.getType() == AddFishType.CATCH_WHOLE_FISH) {
                if (c.getUniqId() == fishUid) {
                    var p = c.localToGlobal();
                    s = p.x,
                    l = p.y,
                    u = c.getFishId(),
                    c.getIsGroupFish() ? c.playDead(!0) : c.playDead(!1);
                    var g = fishList.indexOf(fishList[h]);
                    g >= 0 && fishList.splice(g, 1);
                    break
                }
            } else if (c.getType() == AddFishType.FISH_GROUP) 
                for (var _ = c.getFishList(), y = 0; y < _.length; y++) {
                    var m = _[y];
                    if (m.getUniqId() == fishUid) {
                        var p = m.localToGlobal();
                        s = p.x,
                        l = p.y,
                        u = m.getFishId(),
                        m.playDead(!0),
                        _.splice(y, 1);
                        break
                    }
                }
            if (0 != u) break
        }
        if (! (0 >= u || null == a || 0 == n.x && 0 == n.y)) {
            for (var f = (Director.getModelByKey(RoomModel).getRoomerById(userId), new Array), h = 0; h < a.length; h++) {
                var v = Number(a[h].itemId),
                T = Number(a[h].count);
                10001 == v ? (FrameUtil.playAddCoinsEff(T, new egret.Point(s, l), o, userId), 
                GameUtil.flyCoins(T, u, new egret.Point(s, l), new egret.Point(n.x, n.y), o, userId), 
                SoundManager.playEffectSound("drop_gold")) : v == PropEnum.FISH_TICKIT ? 
                GameUtil.flyTickets(T, new egret.Point(s, l), new egret.Point(n.x, n.y), o, userId) : f.push(a[h])
            }
            if (f.length > 0) for (var E = f.length,  h = 0; E > h; h++) {
                var I = Number(f[h].itemId),
                b = Number(f[h].count),
                C = new egret.Point(s, l);
                GameUtil.flyItems(b, I, C, new egret.Point(n.x, n.y), o, userId);
                var x = Language.getText(T_Item_Table.getVoByKey(I).name),
                w = x + "X" + b; !
                function(e, t) {
                    setTimeout(function() {
                        GameUtil.popTips(e, new egret.Point(s, l))
                    },
                    500 * t)
                } (w, h)
            }
        }
    }

    //黑洞死亡
    static fishDeadHandlerHeidong(fishList, fishUid, userId, n, a, o, r) {
        for (var s = 0,
        l = 0,
        u = 0,
        len = fishList.length,
        h = 0; len > h; h++) {
            var c = fishList[h].getActor();
            if (c.getType() == AddFishType.FISH || c.getType() == AddFishType.CATCH_WHOLE_FISH) {
                if (c.getUniqId() == fishUid) {
                    var p = c.localToGlobal();
                    s = p.x,
                    l = p.y,
                    u = c.getFishId(),
                    c.playDeadHeidong();
                    var g = fishList.indexOf(fishList[h]);
                    g >= 0 && fishList.splice(g, 1);
                    break
                }
            } else if (c.getType() == AddFishType.FISH_GROUP) 
                for (var _ = c.getFishList(), y = 0; y < _.length; y++) {
                    var m = _[y];
                    if (m.getUniqId() == fishUid) {
                        var p = m.localToGlobal();
                        s = p.x,
                        l = p.y,
                        u = m.getFishId(),
                        m.playDeadHeidong(),
                        _.splice(y, 1);
                        break
                    }
                }
            if (0 != u) break
        }
        if (! (0 >= u || null == a || 0 == n.x && 0 == n.y)) {
            for (var f = (Director.getModelByKey(RoomModel).getRoomerById(userId), new Array), h = 0; h < a.length; h++) {
                var v = Number(a[h].itemId),
                T = Number(a[h].count);
                10001 == v ? (FrameUtil.playAddCoinsEff(T, new egret.Point(s, l), o, userId), 
                GameUtil.flyCoins(T, u, new egret.Point(s, l), new egret.Point(n.x, n.y), o, userId), 
                SoundManager.playEffectSound("drop_gold")) : v == PropEnum.FISH_TICKIT ? 
                GameUtil.flyTickets(T, new egret.Point(s, l), new egret.Point(n.x, n.y), o, userId) : f.push(a[h])
            }
            if (f.length > 0) for (var E = f.length,  h = 0; E > h; h++) {
                var I = Number(f[h].itemId),
                b = Number(f[h].count),
                C = new egret.Point(s, l);
                GameUtil.flyItems(b, I, C, new egret.Point(n.x, n.y), o, userId);
                var x = Language.getText(T_Item_Table.getVoByKey(I).name),
                w = x + "X" + b; !
                function(e, t) {
                    setTimeout(function() {
                        GameUtil.popTips(e, new egret.Point(s, l))
                    },
                    500 * t)
                } (w, h)
            }
        }
    }

    static shakeWindow(e) {
        egret.Tween.get(e).to({
            x: 0,
            y: 0
        },
        100).wait(800).to({
            x: 2,
            y: 2
        },
        50).to({
            x: -20,
            y: -20
        },
        50).to({
            x: 30,
            y: 25
        },
        5).to({
            x: -20,
            y: -30
        },
        50).to({
            x: 0,
            y: 20
        },
        50).to({
            x: 20,
            y: 20
        },
        50).to({
            x: -20,
            y: -10
        },
        50).to({
            x: 14,
            y: 5
        },
        50).to({
            x: -14,
            y: -24
        },
        50).to({
            x: 0,
            y: 26
        },
        50).to({
            x: -20,
            y: -10
        },
        50).to({
            x: 14,
            y: 5
        },
        50).to({
            x: -14,
            y: -24
        },
        50).to({
            x: 0,
            y: 26
        },
        50).to({
            x: 2,
            y: 2
        },
        50).to({
            x: -20,
            y: -20
        },
        50).to({
            x: 0,
            y: 0
        },
        5)
    }
    static shakeWindowByBomb(e) {
        egret.Tween.get(e).to({
            x: 0,
            y: 0
        },
        100).to({
            x: 2,
            y: 2
        },
        50).to({
            x: -20,
            y: -20
        },
        50).to({
            x: 30,
            y: 25
        },
        5).to({
            x: -20,
            y: -30
        },
        50).to({
            x: 0,
            y: 20
        },
        50).to({
            x: 20,
            y: 20
        },
        50).to({
            x: -20,
            y: -10
        },
        50).to({
            x: 14,
            y: 5
        },
        50).to({
            x: -14,
            y: -24
        },
        50).to({
            x: 0,
            y: 26
        },
        50).to({
            x: -20,
            y: -10
        },
        50).to({
            x: 14,
            y: 5
        },
        50).to({
            x: -14,
            y: -24
        },
        50).to({
            x: 0,
            y: 26
        },
        50).to({
            x: 2,
            y: 2
        },
        50).to({
            x: -20,
            y: -20
        },
        50).to({
            x: 0,
            y: 0
        },
        5)
    }
    static shakeWindowByFish(e) {
        egret.Tween.get(e).to({
            x: 0,
            y: 0
        },
        100).to({
            x: 2,
            y: 2
        },
        50).to({
            x: -2,
            y: -2
        },
        50).to({
            x: 5,
            y: 7
        },
        5).to({
            x: -4,
            y: -9
        },
        50).to({
            x: -4,
            y: -1
        },
        50).to({
            x: 0,
            y: 0
        },
        5).to({
            x: -14,
            y: -24
        },
        50).to({
            x: 0,
            y: 26
        },
        50).to({
            x: 0,
            y: 0
        },
        5)
    }
    static getFrozenEffectPos() {
        var e = new Array,
        t = 200 * Math.random(),
        i = 200 * Math.random();
        e.push({
            x: 100 + t,
            y: i + 100
        });
        var n = 200 * Math.random(),
        a = 200 * Math.random();
        e.push({
            x: 626 + n,
            y: a + 100
        });
        var o = 200 * Math.random(),
        r = 200 * Math.random();
        e.push({
            x: 1060 + o,
            y: r + 100
        });
        var s = 400 * Math.random(),
        l = 200 * Math.random();
        e.push({
            x: 200 + s,
            y: l + 460
        });
        var u = 400 * Math.random(),
        d = 200 * Math.random();
        return e.push({
            x: 725 + u,
            y: 460 + d
        }),
        e
    }
    // e：线路   t存活时间
    static getPointsAndPos(path, alive) {
        var retArr = new Array();
        var ptArr = new Array();
        var time = 0;
        var len = path.length;
        var ptx = 0;
        var pty = 0;
        var angle = 0;
        var u = 0;
        var totalTime = 0;
        for (var d = len - 1; d >= 0; d--) {
            time += path[d].t;
            if (time >= alive && len - 1 > d) {
                if (totalTime == 0) {
                    totalTime = time;
                }
                ptx += path[d].x;
                pty += path[d].y;
                angle += path[d].r;
                path[d].e == PointEventEnum.FLIP_Y && (u += 1);
            } else {
                ptArr.push(path[d]);
            }
        }

        /////////////////精确计算起始点//////
        // let dt = totalTime - alive;
        // if (dt > 0) {
        //     let x1 = ptx;
        //     let y1 = pty;
        //     let lpt:PathPoint = ptArr[ptArr.length - 1];
        //     let x2 = ptx + lpt.x;
        //     let y2 = pty + lpt.y;
        //     let lt = lpt.t;
        //     let tsc = dt / lt;
        //     ptx = ptx + (x2 - x1) / tsc;
        //     pty = pty + (y2 - y1) / tsc
        // }
        ///////////////////////////////////
        
        ptArr = ptArr.reverse();
        retArr.push(ptArr);
        retArr.push(new egret.Point(ptx, pty));
        retArr.push(angle);
        var isFlip = !1;
        isFlip = u % 2 == 0 ? !1 : !0;
        retArr.push(isFlip);
        return retArr;
    }
    
    static getPointsAndPosByCala(e, t) {
        var i = new Array();
        var n = new Array();
        var a = 0,
        o = 0,
        r = 0,
        s = 0;
        for (var l = 0; l < e.length; l++) 
            t > l ? (a += e[l].x, o += e[l].y, r += e[l].r, e[l].e == PointEventEnum.FLIP_Y && (s += 1)) : n.push(e[l]);

        i.push(n);
        i.push(new egret.Point(a, o));
        i.push(r);
        var u = !1;
        u = s % 2 == 0 ? !1 : !0;
        i.push(u);
        return i;
    }

    static getPointsByCala(e, t) {
        for (var i = 0,
        n = 0,
        a = 0,
        o = 0; o < e.length; o++) t > o && (i += e[o].x, n += e[o].y, a += e[o].r);
        return {
            point: new egret.Point(i, n),
            rotation: a
        }
    }
}

