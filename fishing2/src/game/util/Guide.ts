class Guide {

	public static _bOpen = !1;
	public static gunSendTimes = 0;
	public static isOpentask = !1;

	public constructor() {
	}

	public static checkGuide(i) {
		var n = Director.getModelByKey(UserModel),
		a = n.getGuideID(),
		o = Number(a) + 1,
		r = T_Guide_Table.getVoByKey(o);
		r && r.trrigertype == i && Guide.openGuide(o)
	}

	public static completeGuide() {
		var t = Director.getModelByKey(UserModel),
		i = t.getGuideID(),
		n = Number(i) + 1,
		a = T_Guide_Table.getVoByKey(n);
		// if (a) {
		// 	switch (t.setGuideID(n, !1), this._bOpen = !1, a.closetype) {
		// 	case GuideClose.GUIDE_CLOSE_INTOROOM:
		// 		var o = new Array,
		// 		r = T_Guide_Table.getVoByKey(9999);
		// 		if (!r.gain || "null" == r.gain) return;
		// 		for (var s = r.gain.split(","), l = s.length, u = 0; l > u; u++) {
		// 			var d = s[u].split("_");
		// 			o.push(new Item(Number(d[0]), Number(d[1]), 0))
		// 		}
		// 		GameUtil.openQihangByPos(null, o, new egret.Point(262, 659),
		// 		function() {
		// 			_Notification_.send(NotifyEnum.CHECK_POP)
		// 		});
		// 		break;
		// 	case GuideClose.GUIDE_CLOSE_UNLOCK:
		// 		_Notification_.send(NotifyEnum.GUIDE_CLOSE, a.closetype);
		// 		break;
		// 	case GuideClose.GUIDE_CLOSE_TRRIGER_NEXT:
		// 		_Notification_.send(NotifyEnum.GUIDE_CLOSE, a.closetype);
		// 		break;
		// 	case GuideClose.GUIDE_CLOSE_LOCK:
		// 		_Notification_.send(NotifyEnum.GUIDE_CLOSE, a.closetype);
		// 		break;
		// 	case GuideClose.GUIDE_CLOSE_OPENLOTTERY:
		// 		_Notification_.send(NotifyEnum.GUIDE_CLOSE, a.closetype);
		// 		break;
		// 	case GuideClose.GUIDE_CLOSE_LOTTERY:
		// 		_Notification_.send(NotifyEnum.GUIDE_CLOSE, a.closetype);
		// 		break;
		// 	case GuideClose.GUIDE_CLOSE_CLOSE_RMB_GAIN:
		// 		_Notification_.send(NotifyEnum.GUIDE_CLOSE, a.closetype);
		// 		break;
		// 	case GuideClose.GUIDE_CLOSE_CLICK_EXCHAGE:
		// 		_Notification_.send(NotifyEnum.GUIDE_CLOSE, a.closetype);
		// 		break;
		// 	case GuideClose.GUIDE_CLOSE_EXCHNANGE_END:
		// 		_Notification_.send(NotifyEnum.GUIDE_CLOSE, a.closetype)
		// 	}
		// 	var h = new NewbieGuideSendMessage;
		// 	if (h.initData(), h.setGuideId(n), NetManager.send(h), e.util.ReyunUtil.sendEvent(i + e.util.LogEnum.GUIDE_END), !this.isOpentask) for (var c = T_Config_Table.getVoByKey(48).value, p = c.split(","), u = 0; u < p.length; u++) {
		// 		var g = p[u].split("_");
		// 		n >= Number(g[0]) && n <= Number(g[1]) && _Notification_.send(NotifyEnum.TASK_GUIDE_LOAD)
		// 	}
		// 	var _ = T_Config_Table.getVoByKey(77).value;
		// 	i == Number(_) && _Notification_.send(NotifyEnum.POP_CIRI)
		// }
	}

	public static openGuide(t) {
		if (!this._bOpen && CONFIG.openGuide) {
			this._bOpen = !0;
			// var i = T_Guide_Table.getVoByKey(t);
			// switch (i.opentype) {
			// case GuideOpen.GUIDE_OPEN_UNLOCK:
			// 	_Notification_.send(NotifyEnum.GUIDE_OPEN, i.opentype);
			// 	break;
			// case GuideOpen.GUIDE_OPEN_ADDFISH:
			// 	_Notification_.send(NotifyEnum.GUIDE_OPEN, i.opentype);
			// 	break;
			// case GuideOpen.GUIDE_OPEN_FISHDEAD:
			// 	this._bOpen = !1,
			// 	_Notification_.send(NotifyEnum.GUIDE_OPEN, i.opentype);
			// 	break;
			// case GuideOpen.GUIDE_OPEN_OPENLOTTERY:
			// 	_Notification_.send(NotifyEnum.GUIDE_OPEN, i.opentype);
			// 	break;
			// case GuideOpen.GUIDE_OPEN_TRRIGERTASK:
			// 	_Notification_.send(NotifyEnum.GUIDE_OPEN, i.opentype);
			// 	break;
			// case GuideOpen.GUIDE_OPEN_EXCHANGE:
			// 	_Notification_.send(NotifyEnum.GUIDE_OPEN, i.opentype);
			// 	break;
			// case GuideOpen.GUIDE_OPEN_POP_RMB_GAIN:
			// 	_Notification_.send(NotifyEnum.GUIDE_OPEN, i.opentype)
			// }
			// if (i.opentype == GuideOpen.GUIDE_OPEN_POP_RMB_GAIN) EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/guide/RmbGain.exml",
			// function() {
			// 	var e = new GuideView,
			// 	i = new GuideMediator(e, t);
			// 	Director.pushView(i)
			// },
			// this);
			// else {
			// 	var n = new GuideView,
			// 	a = new GuideMediator(n, t);
			// 	Director.pushView(a)
			// }
			// e.util.ReyunUtil.sendEvent(t + e.util.LogEnum.GUIDE_START)
		}
	}
}