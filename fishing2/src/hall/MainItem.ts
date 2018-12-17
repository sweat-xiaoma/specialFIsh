class MainItem extends PageItem {
	private _isSelected;
	private id;
	private _callback;
	private isLocked;
	private container;
	private _item;
	private _alivePerson;

	public touchRect:eui.Rect;

	public constructor(id, isSelect = !1, callBack) {
		super();
		this._isSelected = isSelect,
		this.id = id,
		this._callback = callBack;
		// if (CONFIG.IS_WEB) {
		// 	this.init(void 0, void 0);
		// } else {
			EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/main_func_" + this.id + ".exml", this.init, this);
		// }
	}

	public init(e, i) {
		// if (CONFIG.IS_WEB) {
			// n.container = new eui.Group;
			// n.addChild(n.container);
			// n.container.width = 106, n.container.height = 0;
			// 1 == n.id ? (n.container.x = 150, n.container.y = 530) : 2 == n.id ? (n.container.x = 160, n.container.y = 515) : 3 == n.id ? (n.container.x = 160, n.container.y = 565) : 4 == n.id ? (n.container.x = 150, n.container.y = 575) : (n.container.x = 150, n.container.y = 530), n._item = new DragonBonesUtil(n.id, DragonBonesUtil.itemMovie), n.container.addChild(n._item), n.touchEnabled = !0, n.touchChildren = !1, n._item.createMovie(function() {
			// n._item.setMovieXY(0, 0),
			// n._item.gotoAndStopMovie(),
			// n._isSelected && n._item.playMovie(0)
			// });
		// } else {
			this._item = new MainItemUI();
			this._item.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/main_func_" + this.id + ".exml";
			this.addChild(this._item);
			this._item.anchorOffsetX = this._item.width >> 1;
			this._item.anchorOffsetY = this._item.height >> 1;
			this.touchRect = this._item.touchRect;
			// this.touchEnabled = false;
			// this.touchChildren = false;
			this._item.play.addEventListener("complete", this.onTweenGroupComplete, this);
			this._item.x = 240;
			this._item.y = 360;
			this._item.play.play(0);
		// }
		this.isLocked = !1;
		var o = T_Config_Table.getVoByKey(36).value,
		r = o.split("_"),
		sp = new egret.DisplayObjectContainer,
		l = Director.getModelByKey(UserModel),
		u = l.getCurGunID();
		if (2 == this.id) {
			var d = Number(r[0]);
			if (d > u) {
				var h = new egret.Bitmap(RES.getRes("MainviewUnlockBg_Bg_png")),
				c = new egret.Bitmap(RES.getRes("MainviewUnlockBg_png")),
				p = new egret.Bitmap(RES.getRes("MainviewUnlock_1_png"));
				p.anchorOffsetX = p.width,
				p.x = 0,
				p.y = 5,
				h.x = -60,
				h.y = -2,
				sp.addChild(h),
				sp.addChild(c),
				sp.addChild(p);
				var g = new egret.Bitmap(RES.getRes("MainviewUnlock_Suo_png"));
				g.anchorOffsetX = g.width,
				g.anchorOffsetY = g.height,
				g.x = 40,
				g.y = -30,
				sp.addChild(g),
				this.isLocked = !0
			}
		} else if (3 == this.id) {
			var _ = Number(r[1]);
			if (_ > u) {
				var h = new egret.Bitmap(RES.getRes("MainviewUnlockBg_Bg_png")),
				c = new egret.Bitmap(RES.getRes("MainviewUnlockBg_png")),
				p = new egret.Bitmap(RES.getRes("MainviewUnlock_2_png"));
				p.anchorOffsetX = p.width,
				p.x = 0,
				p.y = 5,
				h.x = -60,
				h.y = -2,
				sp.addChild(h),
				sp.addChild(c),
				sp.addChild(p);
				var g = new egret.Bitmap(RES.getRes("MainviewUnlock_Suo_png"));
				g.anchorOffsetX = g.width,
				g.anchorOffsetY = g.height,
				g.x = 40,
				g.y = -30,
				sp.addChild(g),
				this.isLocked = !0
			}
		} else if (4 == this.id) {
			var y = Number(r[2]);
			if (y > u) {
				var h = new egret.Bitmap(RES.getRes("MainviewUnlockBg_Bg_png")),
				c = new egret.Bitmap(RES.getRes("MainviewUnlockBg_png")),
				p = new egret.Bitmap(RES.getRes("MainviewUnlock_3_png"));
				p.anchorOffsetX = p.width,
				p.x = 0,
				p.y = 5,
				h.x = -60,
				h.y = -2,
				sp.addChild(h),
				sp.addChild(c),
				sp.addChild(p);
				var g = new egret.Bitmap(RES.getRes("MainviewUnlock_Suo_png"));
				g.anchorOffsetX = g.width,
				g.anchorOffsetY = g.height,
				g.x = 40,
				g.y = -30,
				sp.addChild(g),
				this.isLocked = !0
			}
		}
		sp.anchorOffsetX = sp.width >> 1;
		sp.anchorOffsetY = sp.height >> 1;
		var a = 20;
		sp.x = this._item.x + a,
		sp.y = 367.5,
		this.addChild(sp);

		var _me = this;
		egret.setTimeout(function() {_me.setSelected(_me._isSelected, true)}, _me, 100);

		this._callback();
		// if (1 == this.id || 2 == this.id || 3 == this.id) {
		// 	EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/alivePerson/AlivePerson.exml",
		// 		function() {
		// 			n._alivePerson = new AlivePersonItem,
		// 			n._alivePerson.setPersonNumById(n.id),
		// 			CONFIG.IS_WEB ? n.container.addChild(n._alivePerson) : n._item.addChild(n._alivePerson),
		// 			3 == n.id && _Notification_.send(NotifyEnum.REFRES_ROOM_ONLINE)
		// 		}, this);
		// }
	}

	public setSelected(isSel, t = false) {
		this._isSelected = isSel
		if (isSel) {
			// if (CONFIG.IS_WEB) {
			// 	this.container.scaleX = this.container.scaleY = 1;
			// } else {
				this._item.scaleX = this._item.scaleY = 1;
				this._item.filters = null;
				if (!t) {
					// if (CONFIG.IS_WEB) {
					// 	this._item.playMovie(0);
					// } else {
						this._item.play.play();
					// }
				}
			// }
		} else {
			// if (CONFIG.IS_WEB) {
			// 	this.container.scaleX = this.container.scaleY = .8;
			// } else {
				this._item.scaleX = this._item.scaleY = .8;
			// }
			var i = FilterEnmu.getFilter(FilterEnmu.DARK);
			this._item.filters = i;
			// if (CONFIG.IS_WEB) {
			// 	this._item.movie && this._item.gotoAndStopMovie()
			// } else {
				this._item.play.pause();
			// }
		}
	}

	public onTweenGroupComplete() {
		this._item.play.play(0);
	}

	public getSelected() {
		return this._isSelected;
	}

	public clicked() {
		super.clicked();
		var t = Director.getModelByKey(UserModel);
		console.log("----clicked itemid="+this.id);
		if (! (CONFIG.openGuide && t.getGuideID() <= 1)) {
			if (this._isSelected) {
				if (4 == this.id) {
					_Notification_.send(NotifyEnum.OPEN_SELECT_ROOM);
				} else if (1 == this.id) {
					_Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {
						type: RequesetRoomState.NewbieRoom,
						id: 0
					});
				} else if (2 == this.id) {
					_Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {
						type: RequesetRoomState.AutoLowRoom,
						id: 0
					});
				} else if (3 == this.id) {
					_Notification_.send(NotifyEnum.OPEN_MAINVIEW_LOADING_AND_INTO_ROOM, {
						type: RequesetRoomState.AutoHighRoom,
						id: 0
					});
				// } else if (5 == this.id) {
					// var i = t.getCurGunID(),
					// n = T_Config_Table.getVoByKey(78).value;
					// if (i < Number(n)) return void GameUtil.popTips(Language.getText(154));
					// var a = new DjsMainView,
					// o = new DjsMainMediator(a);
					// Director.pushView(o)
				} else {
					GameUtil.popTips(Language.getText(47));
				}
			} else {
				_Notification_.send(NotifyEnum.CLICK_MAIN_FUN_ITEM, this.id);
			}
		}
	}

	public destory() {
		if (!CONFIG.IS_WEB && this._item ) {
			this._item.play.removeEventListener("complete", this.onTweenGroupComplete, this);
			RES.destroyRes(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/main_func_" + this.id + ".exml");
		}
		this.removeChildren();
	}
}