class GameUtil {
	public constructor() {
	}

	public static fazhenEffect(e=null, t, i, n, a) {
		var o;
		o = null == e ? egret.MainContext.instance.stage: e;
		var r = o.getChildByName("fazhen" + a);
		if (!r) {
			var s = new egret.Bitmap(RES.getRes("ef_fazhen_png"));
			TweenTools.rotation(s, 4e3),
			s.name = "fazhen" + a,
			o.addChild(s),
			s.anchorOffsetX = s.width / 2,
			s.anchorOffsetY = s.height / 2,
			s.x = i,
			s.y = n
		}
	}
	public static cloneEffect(e=null, t, i, n, a) {
		var o;
		o = null == e ? egret.MainContext.instance.stage: e;
		var r = new egret.DisplayObjectContainer,
		s = new egret.Bitmap(RES.getRes("ef_fazhen_png"));
		TweenTools.rotation(s, 4e3),
		s.anchorOffsetX = s.width / 2,
		s.anchorOffsetY = s.height / 2,
		r.addChild(s);
		var l = new egret.Bitmap(RES.getRes("ef_clone_png"));
		TweenTools.showOutAndInAndScale(l, 500),
		l.anchorOffsetX = l.width / 2,
		l.anchorOffsetY = l.height / 2,
		r.addChild(l),
		r.x = i,
		r.y = n,
		r.name = "clone" + a,
		o.addChild(r)
	}
	public static bobmHexEffect(e=null, t, i, n, a) {
		var o = this;
		var r;
		r = null == e ? egret.MainContext.instance.stage: e,
		RES.getResAsync("ef_war_json",
		function(e, s) {
			RES.getResAsync("ef_war_png",
			function(o, s) {
				var l = new egret.Bitmap(RES.getRes("ef_war_ji_png"));
				l.rotation = -36,
				l.alpha = .7,
				l.scaleX = 10,
				l.scaleY = 6,
				l.x = 732,
				l.y = 680,
				r.addChild(l);
				var u = egret.Tween.get(l);
				u.to({
					x: -488,
					y: -471,
					scaleX: .6,
					scaleY: .6
				},
				700).call(function() {
					egret.Tween.removeTweens(l),
					r.removeChild(l)
				});
				var d = new egret.Bitmap(RES.getRes("ef_war_dan_png"));
				d.x = 960,
				d.y = 0,
				d.anchorOffsetX = d.width / 2,
				d.anchorOffsetY = d.height / 2,
				d.scaleX = .7,
				d.scaleY = .7,
				d.visible = !1,
				r.addChild(d);
				var h = egret.Tween.get(d);
				h.wait(400).call(function() {
					d.visible = !0
				}).to({
					x: CONFIG.contentWidth / 2 + CONFIG.adaptX,
					y: CONFIG.contentHeight / 2 + CONFIG.adaptY
				},
				200).call(function() {
					egret.Tween.removeTweens(d),
					r.removeChild(d);
					var s = new egret.MovieClipDataFactory(e, o),
					l = new MovieFish(s.generateMovieClipData("ef_war"), egret.Event.COMPLETE);
					l.initEvent(),
					l.scaleX = l.scaleY = 2,
					l.gotoAndPlay("play", 1),
					l.frameRate = 10,
					l.x = CONFIG.contentWidth / 2 + CONFIG.adaptX,
					l.y = CONFIG.contentHeight / 2 + CONFIG.adaptY,
					l.scaleX = 3.6,
					l.scaleY = 3.6;
					var u = l.movieClipData,
					h = 0,
					c = new egret.Rectangle(u.frames[h].x, u.frames[h].y, 0, 0);
					l.anchorOffsetX = l.width / 2 + c.x,
					l.anchorOffsetY = l.height / 2 + c.y,
					r.addChild(l),
					setTimeout(function() {
						t.call(i, n, a)
					},
					200)
				})
			},
			o)
		},
		this)
	}
	public static baoFuEffect(e, t=null) {
		var i;
		i = null == t ? egret.MainContext.instance.stage: t;
		var n = RES.getRes("baofu_json"),
		a = RES.getRes("baofu_png"),
		o = new egret.MovieClipDataFactory(n, a),
		r = new egret.MovieClip(o.generateMovieClipData("baofu"));
		r.scaleX = r.scaleY = .95,
		r.y = 20;
		var s = new egret.DisplayObjectContainer;
		s.scaleX = 3,
		s.scaleY = 3,
		i.addChildAt(s, 1e3),
		s.addChild(r),
		s.x = CONFIG.contentWidth / 2 + CONFIG.adaptX,
		s.y = CONFIG.contentHeight / 2 + CONFIG.adaptY;
		var l = new egret.BitmapText;
		l.font = RES.getRes("number_fnt"),
		l.text = String(e),
		l.anchorOffsetX = l.width / 2,
		l.anchorOffsetY = l.height / 2,
		l.scaleX = .55,
		l.scaleY = .55,
		l.x = s.width / 2,
		l.y = CONFIG.contentHeight / 2 - 6,
		s.addChild(l),
		s.anchorOffsetX = s.width / 2,
		s.anchorOffsetY = s.height / 2 + 50,
		r.gotoAndPlay("play", -1);
		var u = egret.Tween.get(s);
		u.to({
			scaleX: 1.125,
			scaleY: 1.125
		},
		250).to({
			scaleX: 1.8,
			scaleY: 1.8
		},
		250).to({
			scaleX: 1.5,
			scaleY: 1.5
		},
		400).wait(2e3).call(function() {
			egret.Tween.removeTweens(s),
			i.removeChild(s)
		})
	}
	public static getIconById(t, i, n=0, a=false):egret.Bitmap {
		if ( t == IconType.PROP) {
			if (10001 == i) {
				var o = RES.getRes("common_coins_png"),
				r = new egret.Bitmap(o);
				return r
			}
			if (10002 == i) {
				var o = RES.getRes("common_diamond_png"),
				r = new egret.Bitmap(o);
				return r
			}
			if (30002 == i) {
				var o = RES.getRes("common_fish_ticket_png"),
				r = new egret.Bitmap(o);
				return r
			}
			var s = T_Item_Table.getVoByKey(i);
			if (null == s) return console.warn("道具[" + i + "]不存在！"),
			null;
			var o = RES.getRes("goodsicon_" + i + "_png"),
			r = new egret.Bitmap(o);
			return r
		}
		return t == IconType.SKILL,
		null
	}
	public static flyTickets(t, i, n, a=null, o=0) {
		var r;
		r = null == a ? egret.MainContext.instance.stage: a;
		var s = Director.getModelByKey(UserModel);
		s.getUserId() == o && (_Notification_.send(NotifyEnum.POP_EXCHANGE), n = new egret.Point(55, 260));
		var l = 60,
		u = 60,
		d = new egret.DisplayObjectContainer,
		h = new egret.Bitmap(RES.getRes("icon_tickets_bg_png"));
		h.anchorOffsetX = h.width >> 1,
		h.anchorOffsetY = h.height >> 1,
		d.addChild(h);
		var c = new eui.Label;
		c.stroke = 1,
		c.strokeColor = 16776960,
		c.text = t / 10 + "元",
		c.anchorOffsetX = c.width / 2,
		c.anchorOffsetY = c.height / 2,
		c.x = 0,
		c.y = 60,
		d.addChild(c),
		d.scaleX = 0,
		d.scaleY = 0;
		var p = new egret.Point(i.x, i.y),
		g = Math.random() > .5 ? !0 : !1,
		_ = Math.random() > .5 ? !0 : !1;
		g ? p.x += Math.random() * l: p.x -= Math.random() * l,
		_ ? p.y += Math.random() * u: p.y -= Math.random() * u,
		d.x = p.x,
		d.y = p.y,
		r.addChild(d);
		var y = egret.Point.distance(p, n) / .4;
		egret.Tween.get(d).to({
			y: d.y + 20,
			scaleX: 1.1,
			scaleY: 1.1,
			alpha: 1
		},
		400).to({
			y: d.y - 20,
			scaleX: 1.05,
			scaleY: 1.05
		},
		200).to({
			y: d.y - 20,
			scaleX: 1,
			scaleY: 1
		},
		200).to({
			y: d.y + 20,
			scaleX: 1,
			scaleY: 1
		},
		200).to({
			x: n.x,
			y: n.y,
			scaleX: 1,
			scaleY: 1
		},
		y, egret.Ease.backIn).call(function() {
			if (null != d) {
				r.removeChild(d),
				d = null,
				SoundManager.playEffectSound("diamondChange"),
				_Notification_.send(NotifyEnum.POP_UPDATEEXCHANGE);
				var t = RES.getRes("ef_addcoin_png"),
				i = new egret.Bitmap(t);
				i.anchorOffsetX = i.width / 2,
				i.anchorOffsetY = i.height / 2,
				r.addChild(i, 81),
				i.x = n.x,
				i.y = n.y,
				i.scaleX = .2,
				i.scaleY = .2;
				var a = egret.Tween.get(i, {
					loop: !1
				});
				a.to({
					scaleX: .7,
					scaleY: .7
				},
				120).to({
					scaleX: 1.2,
					scaleY: 1.2,
					alpha: 0
				},
				50).call(function() {
					egret.Tween.removeTweens(i),
					r.removeChild(i)
				})
			}
		})
	}

	public static flyItems(t, i, n, a, o=null, r=0) {
		var s;
		s = null == o ? egret.MainContext.instance.stage: o,
		t > 10 && (t = 10);
		var l = 60,
		u = 60;
		3 > t ? (l = 75, u = 75) : 5 >= t && t >= 3 ? (l = 100, u = 90) : (l = 200, u = 125);
		var d = Director.getModelByKey(UserModel);
		i == PropEnum.FISH_TICKIT && d.getUserId() == r && (_Notification_.send(NotifyEnum.POP_EXCHANGE), a = new egret.Point(55, 260));
		for (var h = 0; t > h; h++) {
			var c = new egret.DisplayObjectContainer; !
			function(t, o) {
				IconUtil.getIconByIdAsync(IconType.PROP, i,
				function(o) {
					var d = null;
					10002 == i && (d = new egret.Bitmap(RES.getRes("gain_gem_effect_png")), d.anchorOffsetX = d.width >> 1, d.anchorOffsetY = d.height >> 1, d.scaleX = .8, d.scaleY = .8, t.addChild(d)),
					t.addChild(o),
					o.anchorOffsetX = o.width >> 1,
					o.anchorOffsetY = o.height >> 1,
					t.scaleX = 0,
					t.scaleY = 0;
					var h = new egret.Point(n.x, n.y),
					c = Math.random() > .5 ? !0 : !1,
					p = Math.random() > .5 ? !0 : !1;
					c ? h.x += Math.random() * l: h.x -= Math.random() * l,
					p ? h.y += Math.random() * u: h.y -= Math.random() * u,
					t.x = h.x,
					t.y = h.y,
					s.addChild(t);
					var g = egret.Point.distance(h, a) / .8;
					egret.Tween.get(t).to({
						y: t.y + 20,
						scaleX: 1.1,
						scaleY: 1.1,
						alpha: 1
					},
					200).to({
						y: t.y - 20,
						scaleX: 1.05,
						scaleY: 1.05
					},
					100).to({
						y: t.y - 20,
						scaleX: 1,
						scaleY: 1
					},
					100).to({
						y: t.y + 20,
						scaleX: 1,
						scaleY: 1
					},
					100).to({
						x: a.x,
						y: a.y,
						scaleX: 1,
						scaleY: 1
					},
					g, egret.Ease.backIn).call(function() {
						if (null != t) {
							s.removeChild(t),
							t = null,
							10002 == i ? (_Notification_.send(NotifyEnum.UPDATE_ROOM_UI_MONEY, {
								userId: r
							}), SoundManager.playEffectSound("ls_blinkc")) : (_Notification_.send(NotifyEnum.SET_PROP_NUM), SoundManager.playEffectSound("diamondChange"));
							var n = RES.getRes("ef_addcoin_png"),
							o = new egret.Bitmap(n);
							o.anchorOffsetX = o.width / 2,
							o.anchorOffsetY = o.height / 2,
							s.addChild(o, 81),
							o.x = a.x,
							o.y = a.y,
							o.scaleX = .2,
							o.scaleY = .2;
							var l = egret.Tween.get(o, {
								loop: !1
							});
							l.to({
								scaleX: .7,
								scaleY: .7
							},
							120).to({
								scaleX: 1.2,
								scaleY: 1.2,
								alpha: 0
							},
							50).call(function() {
								egret.Tween.removeTweens(o),
								s.removeChild(o)
							})
						}
					})
				})
			} (c, h)
		}
	}
	public static flyCoinsTOTOTO(t, i, n, a=null, o=0) {
		var r;
		r = null == a ? egret.MainContext.instance.stage: a;
		var s = RES.getRes("iconEffect_json"),
		l = RES.getRes("iconEffect_png"),
		u = new egret.MovieClipDataFactory(s, l);
		i = 20;
		var d = new egret.Point(200, 500);
		var h = GameUtil.getPosByCountOld(i, d);
		for (var c = 0; c < h.length; c++) {
			var p = new egret.MovieClip(u.generateMovieClipData("iconEffect"));
			p.anchorOffsetX = p.width >> 1;
			p.anchorOffsetY = p.height >> 1;
			p.x = h[c].x;
			p.y = h[c].y;
			r.addChildAt(p, 81);
			p.visible = !1;
			p.frameRate = 15;
			var g = n.x,
			_ = n.y,
			y = egret.Point.distance(n, new egret.Point(p.x, p.y)) / .8; !
			function(i, a, s, l, u) {
				egret.Tween.get(i).wait(800 + 100 * a).call(function() {
					i.visible = !0,
					i.gotoAndPlay("play", -1)
				}).to({
					y: i.y + 20
				},
				120).to({
					y: i.y - 20
				},
				90).to({
					y: i.y - 20
				},
				75).to({
					y: i.y + 20
				},
				120).to({
					x: n.x,
					y: n.y
				},
				u, egret.Ease.backIn).call(function() {
					if (null != i) {
						r.removeChild(i),
						i = null,
						0 == a && (_Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {
							userId: o,
							isTween: !0,
							count: t
						}), SoundManager.playEffectSound("ls_blinkc"));
						var n = Director.getModelByKey(UserModel);
						if (n.getUserId() == o) {
							var u = RES.getRes("ef_addcoin_png"),
							d = new egret.Bitmap(u);
							d.anchorOffsetX = d.width / 2,
							d.anchorOffsetY = d.height / 2,
							r.addChild(d, 81),
							d.x = s,
							d.y = l,
							d.scaleX = .2,
							d.scaleY = .2;
							var h = egret.Tween.get(d, {
								loop: !1
							});
							h.to({
								scaleX: .7,
								scaleY: .7
							},
							120).to({
								scaleX: 1.2,
								scaleY: 1.2,
								alpha: 0
							},
							50).call(function() {
								egret.Tween.removeTweens(d),
								r.removeChild(d)
							})
						}
					}
				})
			} (p, c, g, _, y)
		}
	}
	public static flyScores(t, i, n, a=null, o=0) {
		var r;
		r = null == a ? egret.MainContext.instance.stage: a;
		for (var s = T_Fish_Table.getVoByKey(t), l = this.getCoinNumByScore(s.score), u = RES.getRes("ef_score_json"), d = RES.getRes("ef_score_png"), h = new egret.MovieClipDataFactory(u, d), c = GameUtil.getPosByCount(l, i), p = 0; p < c.length; p++) {
			var g = new egret.MovieClip(h.generateMovieClipData("ef_score"));
			g.anchorOffsetX = g.width >> 1,
			g.anchorOffsetY = g.height >> 1,
			g.x = c[p].x,
			g.y = c[p].y,
			r.addChildAt(g, 81),
			g.visible = !1,
			g.frameRate = 15;
			var _ = n.x,
			y = n.y,
			m = egret.Point.distance(n, new egret.Point(g.x, g.y)) / .5; !
			function(e, t, i, a, o) {
				egret.Tween.get(e).wait(800 + 50 * t).call(function() {
					e.visible = !0,
					e.gotoAndPlay("play", -1)
				}).to({
					y: e.y + 60
				},
				120).to({
					y: e.y - 20
				},
				90).to({
					y: e.y - 20
				},
				75).to({
					y: e.y + 20
				},
				120).wait(200).to({
					x: n.x,
					y: n.y
				},
				400, egret.Ease.backIn).call(function() {
					null != e && (r.removeChild(e), e = null)
				})
			} (g, p, _, y, m)
		}
	}
	
	public static flyCoins(t, i, n, a, o=null, userId=0) {
		var s;
		s = null == o ? egret.MainContext.instance.stage: o;
		var l = T_Fish_Table.getVoByKey(i);
		var u = this.getCoinNumByScore(l.score);
		var d = RES.getRes("iconEffect_json");
		var h = RES.getRes("iconEffect_png");
		var c = new egret.MovieClipDataFactory(d, h);
		var p = this.getPosByCount(u, n);
		for (var g = 0; g < p.length; g++) {
			var iconMc = new egret.MovieClip(c.generateMovieClipData("iconEffect"));
			iconMc.anchorOffsetX = iconMc.width >> 1,
			iconMc.anchorOffsetY = iconMc.height >> 1,
			iconMc.x = p[g].x,
			iconMc.y = p[g].y,
			s.addChildAt(iconMc, 81);
			iconMc.visible = !1;
			iconMc.frameRate = 15;
			var y = a.x,
			m = a.y,
			f = egret.Point.distance(a, new egret.Point(iconMc.x, iconMc.y)) / .5; !
			function(i, n, o, l, u) {
				egret.Tween.get(i).wait(800 + 50 * n).call(function() {
					i.visible = !0,
					i.gotoAndPlay("play", -1)
				}).to({
					y: i.y + 60
				},
				120).to({
					y: i.y - 20
				},
				90).to({
					y: i.y - 20
				},
				75).to({
					y: i.y + 20
				},
				120).wait(200).to({
					x: a.x,
					y: a.y
				},
				400, egret.Ease.backIn).call(function() {
					if (null != i) {
						s.removeChild(i),
						i = null,
						0 == n && (_Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {
							userId: userId,
							isTween: !0,
							count: t
						}), SoundManager.playEffectSound("ls_blinkc"));
						var a = Director.getModelByKey(UserModel);
						if (a.getUserId() == userId) {
							var u = RES.getRes("ef_addcoin_png"),
							d = new egret.Bitmap(u);
							d.anchorOffsetX = d.width / 2,
							d.anchorOffsetY = d.height / 2,
							s.addChild(d, 81),
							d.x = o,
							d.y = l,
							d.scaleX = .2,
							d.scaleY = .2;
							var h = egret.Tween.get(d, {
								loop: !1
							});
							h.to({
								scaleX: .7,
								scaleY: .7
							},
							120).to({
								scaleX: 1.2,
								scaleY: 1.2,
								alpha: 0
							},
							50).call(function() {
								egret.Tween.removeTweens(d),
								s.removeChild(d)
							})
						}
					}
				})
			} (iconMc, g, y, m, f)
		}
	}
	public static getPosByCount(e, t, i=-1) {
		var n = new Array;
		var a = 75 * e / 2;
		for (var o = 0; e > o; o++) {
			// var r = (Math.random() > .5 ? !0 : !1, Math.random() > .5 ? !0 : !1, new egret.Point(t.x, t.y));
			var r = new egret.Point(t.x, t.y);
			r.x += 75 * o - a,
			n.push(r)
		}
		return n
	}
	public static getPosByCountOld(e, t, i=-1) {
		var n = new Array,
		a = 20;
		8 >= e ? a = 20 : e > 8 && 15 >= e ? a = 40 : e > 15 && (a = 60),
		-1 != i && (a = i);
		for (var o = 0; e > o; o++) {
			var r = Math.random() > .5 ? !0 : !1,
			s = Math.random() > .5 ? !0 : !1,
			l = new egret.Point(t.x, t.y);
			r ? l.x += Math.random() * a: l.x -= Math.random() * a,
			s ? l.y += Math.random() * a: l.y -= Math.random() * a,
			n.push(l)
		}
		return n
	}
	public static getCoinNumByScore(e) {
		var t = 1;
		if (e >= 2 && 3 > e) t = 2;
		else {
			if (e >= 3 && 6 > e) return 2;
			if (e >= 6 && 9 > e) return 2;
			if (e >= 10 && 11 > e) return 3;
			if (e >= 11 && 13 > e) return 3;
			if (e >= 13 && 45 > e) return 5;
			if (e >= 45 && 101 > e) return 7;
			if (e >= 101) return 9
		}
		return 2 * t
	}
	public static isEnough(type, num, isPopCharge=true):boolean {
		var um:UserModel = Director.getModelByKey(UserModel);
		if (type == CurrencyEnum.COINS) {
			var a = um.getCoins();
			if (a >= num) {
				return true;
			} else {
				isPopCharge && _Notification_.send(NotifyEnum.POP_CHARGE, {type: ChargeType.Gold});
				return false;
			}
		}
		if (type == CurrencyEnum.MONEY) {
			var o = um.getMoney();
			if (o >= num) {
				return true;
			} else {
				isPopCharge && _Notification_.send(NotifyEnum.POP_CHARGE, {type: ChargeType.Gem});
				return false;
			}
		}
		return ! 1
	}
	public static popTips(e, t=null) {
		var i = egret.MainContext.instance.stage,
		n = new egret.DisplayObjectContainer,
		a = new egret.TextField;
		a.size = 35,
		a.text = e,
		a.cacheAsBitmap = !0,
		a.anchorOffsetX = a.width >> 1,
		a.anchorOffsetY = a.height >> 1,
		a.textAlign = egret.HorizontalAlign.CENTER;
		var o = RES.getRes("tipsBg_png"),
		r = new egret.Bitmap(o);
		r.scale9Grid = new egret.Rectangle(83, 0, 6, 42),
		r.width = a.width + 70,
		r.anchorOffsetX = r.width >> 1,
		r.anchorOffsetY = r.height >> 1,
		n.addChild(r),
		n.addChild(a),
		i.addChildAt(n, 9999),
		null == t ? (n.x = CONFIG.contentWidth / 2 + CONFIG.adaptX, n.y = CONFIG.contentHeight / 2 + CONFIG.adaptY) : (n.x = t.x, n.y = t.y),
		n.cacheAsBitmap = !0;
		var s = egret.Tween.get(n, {
			loop: !1
		});
		s.to({
			y: n.y - 100,
			alpha: 0
		},
		1500).call(function() {
			egret.Tween.removeTweens(n),
			i.removeChild(n)
		})
	}
	public static setLockedEffect(t, i, n, a = false) {
		if (null != t) {
			var o = T_Fish_Table.getVoByKey(t.getFishId()),
			r = o.posLocked,
			s = r.split(",");
			if (!t.getEFFECT_LAYER().getChildByName(i)) {
				var l = new egret.Bitmap(RES.getRes(n));
				if (null != l) {
					l.name = i;
					var u = t.isFlipY(),
					d = t.getIsGroupFish();
					if (a) {
						l.scaleX = 12,
						l.scaleY = 12,
						l.x = parseInt(s[0]) + t.getModifyRect().x,
						l.y = parseInt(s[1]) + t.getModifyRect().y,
						u && (d ? t.getChasisModify() && (l.y -= 2 * t.getChasisModify()) : l.y = -l.y);
						var h = t.addEffect(l, i);
						h && (l.anchorOffsetX = l.width / 2, l.anchorOffsetY = l.height / 2);
						var c = egret.Tween.get(l, {
							loop: !1
						});
						c.to({
							scaleX: 8,
							scaleY: 8,
							rotation: 60
						},
						350).to({
							scaleX: 2.5,
							scaleY: 2.5,
							rotation: 150
						},
						250).to({
							scaleX: .8,
							scaleY: .8,
							rotation: 240
						},
						150).call(function() {
							egret.Tween.removeTweens(l),
							TweenTools.rotation(l, 3e3)
						})
					} else {
						l.x = parseInt(s[0]) + t.getModifyRect().x,
						l.y = parseInt(s[1]) + t.getModifyRect().y,
						u && (d ? t.getChasisModify() && (l.y -= 2 * t.getChasisModify()) : l.y = -l.y);
						var h = t.addEffect(l, i);
						h && (l.anchorOffsetX = l.width / 2, l.anchorOffsetY = l.height / 2, TweenTools.rotation(l, 3e3), l.scaleX = .8, l.scaleY = .8)
					}
				}
			}
		}
	}
	public static playWarAction(e) {
		for (var t = 0; t < e.length; t++) {
			var i = egret.Tween.get(e[t], {
				loop: !1
			});
			e[t].scaleX = 0,
			e[t].scaleY = 0;
			var n = 20;
			i.wait(300 - 60 * t).to({
				scaleY: .2,
				scaleX: .15
			},
			n).to({
				scaleY: .4,
				scaleX: .3
			},
			n).to({
				scaleY: .6,
				scaleX: .45
			},
			n).to({
				scaleY: .8,
				scaleX: .6
			},
			n).to({
				scaleY: 1,
				scaleX: .75
			},
			n).to({
				scaleY: 1.05,
				scaleX: .9
			},
			n).to({
				scaleY: 1.15,
				scaleX: 1.05
			},
			n).to({
				scaleY: 1.13,
				scaleX: 1.1
			},
			n).to({
				scaleY: 1.05,
				scaleX: 1.15
			},
			n).to({
				scaleY: 1,
				scaleX: 1.1
			},
			n).to({
				scaleY: .9,
				scaleX: 1.05
			},
			n).to({
				scaleY: .75,
				scaleX: 1
			},
			n).to({
				scaleY: .65,
				scaleX: .85
			},
			n).to({
				scaleY: .75,
				scaleX: .7
			},
			n).to({
				scaleY: .85,
				scaleX: .75
			},
			n).to({
				scaleY: 1,
				scaleX: .9
			},
			n).to({
				scaleY: 1,
				scaleX: 1
			},
			n)
		}
	}
	public static playWaitAction(t) {
		for (var i = 0; i < t.length; i++) {
			var n = egret.Tween.get(t[i], {
				loop: !1
			}),
			a = 100,
			o = t[i].y;
			n.wait(600 - 60 * i).to({
				y: o - 60
			},
			a).to({
				y: o - 20
			},
			a).to({
				y: o + 10
			},
			a).to({
				y: o - 5
			},
			a).to({
				y: o
			},
			a)
		}
		setTimeout(function() {
			GameUtil.playWaitAction(t)
		},
		3e3)
	}
	public static playChakanAction(e) {
		for (var t = 0; t < e.length; t++) {
			var i = egret.Tween.get(e[t], {
				loop: !1
			});
			e[t].scaleX = 0,
			e[t].scaleY = 0;
			var n = e[t].x,
			a = e[t].y,
			o = 20;
			i.wait(200 - 150 * t).to({
				x: 150,
				y: 200
			},
			10).to({
				scaleY: .2,
				scaleX: .15,
				x: n,
				y: a
			},
			200).to({
				scaleY: .4,
				scaleX: .3
			},
			o).to({
				scaleY: .6,
				scaleX: .45
			},
			o).to({
				scaleY: .8,
				scaleX: .6
			},
			o).to({
				scaleY: 1,
				scaleX: .75
			},
			o).to({
				scaleY: 1.05,
				scaleX: .9
			},
			o).to({
				scaleY: 1.15,
				scaleX: 1.05
			},
			o).to({
				scaleY: 1.13,
				scaleX: 1.1
			},
			o).to({
				scaleY: 1.05,
				scaleX: 1.15
			},
			o).to({
				scaleY: 1,
				scaleX: 1.1
			},
			o).to({
				scaleY: .9,
				scaleX: 1.05
			},
			o).to({
				scaleY: .75,
				scaleX: 1
			},
			o).to({
				scaleY: .65,
				scaleX: .85
			},
			o).to({
				scaleY: .75,
				scaleX: .7
			},
			o).to({
				scaleY: .85,
				scaleX: .75
			},
			o).to({
				scaleY: 1,
				scaleX: .9
			},
			o).to({
				scaleY: 1,
				scaleX: 1
			},
			o)
		}
	}

	public static openUserLvip(root=null, lv) {
		var parent, n = 0, a = 0;
		null == root ? (parent = egret.MainContext.instance.stage, n = CONFIG.contentWidth, a = CONFIG.contentHeight) : (parent = root, n = parent.width, a = parent.height),
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml",
		function() {
			var e = new UserLvUpView(lv, parent);
			e.anchorOffsetX = e.width >> 1,
			e.anchorOffsetY = e.height >> 1,
			e.x = n >> 1,
			e.y = a >> 1,
			parent && parent.addChild(e);
		}, this)
	}

	public static openConfirmByTwoButton(e=null, t, i, n) {
		var a, o = 0, r = 0;
		if (null == e) {
			a = egret.MainContext.instance.stage, o = CONFIG.contentWidth, r = CONFIG.contentHeight;
		} else {
			a = e, o = a.width, r = a.height;
		}
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Confirm.exml",
			function() {
				var e = new ConfirmView(function() {
					e.setGroupTwo(),
					e.setTips(n);
				});
				e.setOkCallFun(t, i, a),
				// e.anchorOffsetX = e.width / 2,
				// e.anchorOffsetY = e.height / 2,
				a && a.addChild(e);
			},
			this);
	}
	public static openConfirm(e=null, t, i, n) {
		var a, o = 0,
		r = 0;
		if (null == e) {
			a = egret.MainContext.instance.stage, o = CONFIG.contentWidth, r = CONFIG.contentHeight;
		} else {
			a = e, o = a.width, r = a.height;
		}
		EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Confirm.exml",
			function() {
				var e = new ConfirmView(function() {
					e.setGroupOne();
					e.setTips(n);
				});
				e.setOkCallFun(t, i, a);
				// e.anchorOffsetX = e.width / 2,
				// e.anchorOffsetY = e.height / 2,
				a && a.addChild(e);
			},
			this);
	}
	// public static openEmailChakan(e, t, i, n, a) {
	// 	void 0 === e && (e = null);
	// 	var o, r = 0,
	// 	s = 0;
	// 	null == e ? (o = egret.MainContext.instance.stage, r = CONFIG.contentWidth, s = CONFIG.contentHeight) : (o = e, r = o.width, s = o.height),
	// 	EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/EmailChakanPanel.exml",
	// 	function() {
	// 		var e = new EmailChakanView(i, t, o, n, a);
	// 		e.anchorOffsetX = e.width / 2,
	// 		e.anchorOffsetY = e.height / 2,
	// 		e.x = r / 2,
	// 		e.y = s / 2,
	// 		o && o.addChild(e)
	// 	},
	// 	this)
	// }
	public static addGoldEffect(t=null) {
		var i;
		i = null == t ? egret.MainContext.instance.stage: t;
		var n = RES.getRes("ef_goldGuangtiao_png"),
		a = new egret.Bitmap(n);
		a.blendMode = egret.BlendMode.ADD,
		a.anchorOffsetX = a.width / 2,
		a.anchorOffsetY = a.height / 2;
		var o = new egret.Shape;
		if (o.graphics.beginFill(255), o.graphics.drawCircle(26, 26, 25), o.graphics.endFill(), i) {
			a.x = -50,
			a.y = 0,
			a.name = "imgName",
			o.name = "circleName";
			var r = i.getChildByName("imgName");
			r && i.removeChild(r);
			var s = i.getChildByName("circleName");
			s && i.removeChild(s),
			i.addChild(a),
			i.addChild(o),
			a.mask = o
		}
		GameUtil.playOnce(a, i)
	}
	public static playOnce(t, i) {
		GameUtil._playLoop(t, i)
	}
	public static _playLoop(t, i) {
		var n = egret.Tween.get(t, {
			loop: !1
		});
		n.wait(9e3).to({
			x: 200
		},
		1500).call(function() {
			egret.Tween.removeTweens(t);
			var n = RES.getRes("ef_goldGuandian_png"),
			a = new egret.Bitmap(n);
			if (i) {
				a.anchorOffsetX = a.width / 2,
				a.anchorOffsetY = a.height / 2,
				a.x = i.width - 10,
				a.y = 10,
				i.addChild(a);
				var o = egret.Tween.get(a, {
					loop: !1
				});
				o.to({
					rotation: 270
				},
				500).call(function() {
					egret.Tween.removeTweens(a),
					i.removeChild(a),
					t.x = -50,
					GameUtil._playLoop(t, i)
				})
			}
		})
	}
	public static verifyRoomCoins(roomType, num):boolean {
		var n = T_Config_Table.getVoByKey(32);
		if (null == n) {
			console.log("T_Config_Table[32] is null");
			return !1;
		}
		var a = n.value.split("_"),
		o = 0;
		switch (roomType) {
		case RequesetRoomState.AutoLowRoom:
			o = Number(a[0]);
			break;
		case RequesetRoomState.AutoHighRoom:
			o = Number(a[1]);
			break;
		case RequesetRoomState.SelectRoom:
			o = Number(a[2])
		}
		return num >= o ? !0 : !1
	}

	public static getNeedCoinsByRoomType(t) {
		var i = T_Config_Table.getVoByKey(32);
		if (null == i) return console.log("T_Config_Table[32] is null"),
		0;
		var n = i.value.split("_"),
		a = 0;
		switch (t) {
		case RequesetRoomState.AutoLowRoom:
			a = Number(n[0]);
			break;
		case RequesetRoomState.AutoHighRoom:
			a = Number(n[1]);
			break;
		case RequesetRoomState.SelectRoom:
			a = Number(n[2])
		}
		return a
	}
	public static getNeedGunByRoomType(roomType, gunId) {
		var n = T_Config_Table.getVoByKey(36);
		if (null == n) return console.log("T_Config_Table[36] is null"), 0;
		var arr = n.value.split("_");
		var o = 0;
		switch (roomType) {
		case RequesetRoomState.AutoLowRoom:
			o = Number(arr[0]);
			break;
		case RequesetRoomState.AutoHighRoom:
			o = Number(arr[1]);
			break;
		case RequesetRoomState.SelectRoom:
			o = Number(arr[2]);
		}
		return gunId >= o ? -1 : o
	}
	
	public static getMaxGunRateByGold(t) {
		for (var i = -1,
		n = T_Gun_Table.getAllVo(), a = n.length, o = a - 1; o >= 0; o--) if (n[o].bulletNum <= t) {
			i = n[o].id;
			break
		}
		return i;
	}
	public static getRoomTypeByCoinsAndRate(t, i) {
		var n = T_Config_Table.getVoByKey(32);
		if (null == n) return console.log("T_Config_Table[32] is null"),
		0;
		var a = n.value.split("_"),
		o = 0;
		t < Number(a[0]) ? o = 0 : t >= Number(a[0]) && t < Number(a[1]) ? o = 2 : t >= Number(a[1]) && (o = 3);
		var r = T_Config_Table.getVoByKey(36);
		if (null == r) return console.log("T_Config_Table[36] is null"),
		0;
		var s = r.value.split("_"),
		l = 0;
		i < Number(s[0]) ? l = 0 : i >= Number(s[0]) && i < Number(s[1]) ? l = 2 : i >= Number(s[1]) && (l = 3);
		var u = Math.min(o, l);
		if (2 > u) return RequesetRoomState.NewbieRoom;
		var d = 0;
		switch (u) {
		case 2:
			d = RequesetRoomState.AutoLowRoom;
			break;
		case 3:
			d = RequesetRoomState.AutoHighRoom
		}
		return d
	}
	// public static openCommongain(e, t) {
	// 	void 0 === e && (e = null);
	// 	var i, n = 0,
	// 	a = 0;
	// 	null == e ? (i = egret.MainContext.instance.stage, n = CONFIG.contentWidth, a = CONFIG.contentHeight) : (i = e, n = i.width, a = i.height),
	// 	EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml",
	// 	function() {
	// 		var e = new CommonGainView(t, i);
	// 		e.anchorOffsetX = e.width >> 1,
	// 		e.anchorOffsetY = e.height >> 1,
	// 		e.x = n >> 1,
	// 		e.y = a >> 1,
	// 		i && i.addChild(e)
	// 	},
	// 	this)
	// }
	// public static openCommonGainByPos(e, t, i, n) {
	// 	void 0 === e && (e = null);
	// 	var a, o = 0,
	// 	r = 0;
	// 	null == e ? (a = egret.MainContext.instance.stage, o = CONFIG.contentWidth, r = CONFIG.contentHeight) : (a = e, o = a.width, r = a.height),
	// 	EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/userInfo/UserLvUp.exml",
	// 	function() {
	// 		var e = new CommonGainView(t, a);
	// 		e.setPosFun(i, n),
	// 		e.anchorOffsetX = e.width >> 1,
	// 		e.anchorOffsetY = e.height >> 1,
	// 		e.x = o >> 1,
	// 		e.y = r >> 1,
	// 		a && a.addChild(e)
	// 	},
	// 	this)
	// }
	// public static openRMBGain(e) {
	// 	void 0 === e && (e = null);
	// 	var t, i = 0,
	// 	n = 0;
	// 	null == e ? (t = egret.MainContext.instance.stage, i = CONFIG.contentWidth, n = CONFIG.contentHeight) : (t = e, i = t.width, n = t.height),
	// 	EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/guide/RmbGain.exml",
	// 	function() {
	// 		var e = new RmbGainView(t);
	// 		e.anchorOffsetX = e.width >> 1,
	// 		e.anchorOffsetY = e.height >> 1,
	// 		e.x = i >> 1,
	// 		e.y = n >> 1,
	// 		e.name = "RMBGAIN",
	// 		t && t.addChild(e)
	// 	},
	// 	this)
	// }
	// public static openQihangByPos(e, t, i, n) {
	// 	void 0 === e && (e = null);
	// 	var a, o = 0,
	// 	r = 0;
	// 	null == e ? (a = egret.MainContext.instance.stage, o = CONFIG.contentWidth, r = CONFIG.contentHeight) : (a = e, o = a.width, r = a.height),
	// 	EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Qihang/Qihang.exml",
	// 	function() {
	// 		var e = new QihangView(t, a, !0);
	// 		e.setPosFun(i, n),
	// 		e.anchorOffsetX = e.width >> 1,
	// 		e.anchorOffsetY = e.height >> 1,
	// 		e.x = o >> 1,
	// 		e.y = r >> 1,
	// 		a && a.addChild(e)
	// 	},
	// 	this)
	// }
	public static getCircle() {
		var e = RES.getRes("ef_addcoin_png"),
		t = new egret.Bitmap(e);
		return t.anchorOffsetX = t.width / 2,
		t.anchorOffsetY = t.height / 2,
		TweenTools.circle(t),
		t
	}
	public static getCircle1() {
		var e = RES.getRes("ef_addcoin_png"),
		t = new egret.Bitmap(e);
		return t.anchorOffsetX = t.width / 2,
		t.anchorOffsetY = t.height / 2,
		setTimeout(function() {
			TweenTools.circle(t)
		},
		500),
		t
	}
	// public static openCiriByPos(t, i, n, a) {
	// 	void 0 === t && (t = null),
	// 	void 0 === n && (n = null),
	// 	void 0 === a && (a = null);
	// 	var o, r = 0,
	// 	s = 0;
	// 	null == t ? (o = egret.MainContext.instance.stage, r = CONFIG.contentWidth, s = CONFIG.contentHeight) : (o = t, r = o.width, s = o.height),
	// 	EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Qihang/Qihang.exml",
	// 	function() {
	// 		var t = new QihangView(i, o);
	// 		a ? (t.setPosFun(n, a), t.setCiri(TimeUtil.expireTime(T_Language_Table.getVoByKey(119).value))) : (t.setPosFun(null, null), t.setCiri(TimeUtil.expireTime(T_Language_Table.getVoByKey(118).value))),
	// 		t.anchorOffsetX = t.width >> 1,
	// 		t.anchorOffsetY = t.height >> 1,
	// 		t.x = r >> 1,
	// 		t.y = s >> 1,
	// 		o && o.addChild(t)
	// 	},
	// 	this)
	// }
	// public static openCommonHelp(e, t) {
	// 	void 0 === e && (e = null),
	// 	void 0 === t && (t = 1);
	// 	var i, n = 0,
	// 	a = 0;
	// 	null == e ? (i = egret.MainContext.instance.stage, n = CONFIG.contentWidth, a = CONFIG.contentHeight) : (i = e, n = i.width, a = i.height);
	// 	var o = new CommonHelpView(i, t);
	// 	o.anchorOffsetX = o.width >> 1,
	// 	o.anchorOffsetY = o.height >> 1,
	// 	i && i.addChild(o)
	// }
	// public static openVipCommonPanel(e, t, i, n, a) {
	// 	void 0 === e && (e = null),
	// 	void 0 === i && (i = null),
	// 	void 0 === n && (n = null);
	// 	var o, r = 0,
	// 	s = 0;
	// 	null == e ? (o = egret.MainContext.instance.stage, r = CONFIG.contentWidth, s = CONFIG.contentHeight) : (o = e, r = o.width, s = o.height),
	// 	EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/Qihang/CommonVip.exml",
	// 	function() {
	// 		var e = new CommonVipPanel(t, o);
	// 		e.setPosFun(i, n),
	// 		e.setGoldNum(a),
	// 		e.anchorOffsetX = e.width >> 1,
	// 		e.anchorOffsetY = e.height >> 1,
	// 		e.x = r >> 1,
	// 		e.y = s >> 1,
	// 		o && o.addChild(e)
	// 	},
	// 	this)
	// }
	public static isKss(e) {
		return e != RequesetRoomState.KssRoom && e != RequesetRoomState.KssRoomChu && e != RequesetRoomState.KssRoomZhong && e != RequesetRoomState.KssRoomJingying ? !1 : !0
	}
	public static play321Go(e, t) {
		var i, n = 0,
		a = 0;
		null == e ? (i = egret.MainContext.instance.stage, n = CONFIG.contentWidth, a = CONFIG.contentHeight) : (i = e, n = i.width, a = i.height);
		var o = new egret.DisplayObjectContainer;
		o.width = n,
		o.height = a,
		o.anchorOffsetX = o.width >> 1,
		o.anchorOffsetY = o.height >> 1,
		o.x = CONFIG.contentWidth / 2,
		o.y = CONFIG.contentHeight / 2,
		i && i.addChild(o);
		var r = new eui.Rect;
		r.alpha = .5,
		r.width = n,
		r.height = a,
		r.x = CONFIG.contentWidth / 2 + CONFIG.adaptX,
		r.y = CONFIG.contentHeight / 2 + CONFIG.adaptY,
		r.anchorOffsetX = r.width / 2,
		r.anchorOffsetY = r.height / 2,
		o.addChild(r);
		var s = new egret.BitmapText;
		s.font = RES.getRes("number_fnt"),
		s.text = "3",
		s.x = CONFIG.contentWidth / 2 + CONFIG.adaptX,
		s.y = CONFIG.contentHeight / 2 + CONFIG.adaptY,
		s.anchorOffsetX = s.width / 2,
		s.anchorOffsetY = s.height / 2,
		s.scaleX = 3.6,
		s.scaleY = 3.6,
		o.addChild(s);
		var l = egret.Tween.get(s, {
			loop: !1
		});
		l.to({
			scaleX: 1.8,
			scaleY: 1.8
		},
		300).to({
			scaleX: 2.2,
			scaleY: 2.21
		},
		200).to({
			scaleX: 1.9,
			scaleY: 1.9
		},
		150).call(function() {
			s.visible = !1,
			s.text = "2"
		}).to({
			scaleX: 3.6,
			scaleY: 3.6
		},
		10).wait(500).call(function() {
			s.visible = !0
		}).to({
			scaleX: 1.8,
			scaleY: 1.8
		},
		300).to({
			scaleX: 2.2,
			scaleY: 2.21
		},
		200).to({
			scaleX: 1.9,
			scaleY: 1.9
		},
		150).call(function() {
			s.visible = !1,
			s.text = "1"
		}).to({
			scaleX: 3.6,
			scaleY: 3.6
		},
		10).wait(500).call(function() {
			s.visible = !0
		}).to({
			scaleX: 1.8,
			scaleY: 1.8
		},
		300).to({
			scaleX: 2.2,
			scaleY: 2.21
		},
		200).to({
			scaleX: 1.9,
			scaleY: 1.9
		},
		150).call(function() {
			egret.Tween.removeTweens(s),
			o.removeChild(s);
			var e = new egret.Bitmap(RES.getRes("Go_png"));
			e.x = CONFIG.contentWidth / 2 + CONFIG.adaptX,
			e.y = CONFIG.contentHeight / 2 + CONFIG.adaptY,
			e.anchorOffsetX = e.width / 2,
			e.anchorOffsetY = e.height / 2,
			e.scaleX = 3.6,
			e.scaleY = 3.6,
			o.addChild(e);
			var n = egret.Tween.get(e, {
				loop: !1
			});
			n.to({
				scaleX: 1.8,
				scaleY: 1.8
			},
			300).to({
				scaleX: 2.2,
				scaleY: 2.21
			},
			200).to({
				scaleX: 1.9,
				scaleY: 1.9
			},
			150).call(function() {
				egret.Tween.removeTweens(e),
				o.removeChild(e),
				i.removeChild(o),
				t && t()
			})
		})
	}
}