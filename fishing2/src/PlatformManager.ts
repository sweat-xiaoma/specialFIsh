class PlatformManager {
	public constructor() {
	}

	public  static isPlatform = !1;
	public  static isAutoLogin = !1;
	public  static isThirdPartyLogin = !1;

	public static platformParseHandler(e, i) {
		switch (CONFIG.PLATFORM_ID = e, e) {
		case PlatformTypeEnum.SOUGOU:
			PlatformManager.sougouFillData(i);
			break;
		case PlatformTypeEnum.EGRET:
			PlatformManager.egretFillData();
			break;
		case PlatformTypeEnum.QQ_ZONE:
			PlatformManager.qqZoneFillData(i);
			break;
		case PlatformTypeEnum.QUN_HEI:
			PlatformManager.qunHeiFillData(i);
			break;
		case PlatformTypeEnum.ZI_YOU:
			PlatformManager.ziyouFillData(i);
			break;
		case PlatformTypeEnum.COMBUNET:
			PlatformManager.combunetFillData(i);
			break;
		case PlatformTypeEnum.YI_WAN_TANG:
			PlatformManager.yiwantangtFillData();
		}
		PlatformManager.isPlatform = !0
	}

	public static sougouFillData(e) {}
	public static egretFillData() {}
	public static qqZoneFillData(e) {}
	public static qunHeiFillData(e) {}
	public static ziyouFillData(e) {}

	public static combunetFillData(i) {
		// if ("" != i) {
		// 	var n = egret.Base64Util.decode(i),
		// 	a = String.fromCharCode.apply(null, new Uint8Array(n));
		// 	PlatformManager.sendLoginMsg(a),
		// 	PlatformManager.isAutoLogin = !0
		// } else CONFIG.ACCOUNT = window.FISHING_CONFIG.oauthCode,
		// "" == CONFIG.ACCOUNT ? PlatformManager.isThirdPartyLogin = !0 : PlatformManager.isThirdPartyLogin = !1
	}

	public static yiwantangtFillData() {}

	public static gotoLoginByPlatform(e, t, i) {
		// switch (e) {
		// case PlatformTypeEnum.EGRET:
		// 	break;
		// case PlatformTypeEnum.QQ_ZONE:
		// 	break;
		// case PlatformTypeEnum.COMBUNET:
		// 	HttpManager.init(CONFIG.LOGIN_ADDR + "login.action", egret.HttpResponseType.TEXT, egret.HttpMethod.POST, t, i),
		// 	HttpManager.addParam("oauthCode", CONFIG.ACCOUNT),
		// 	HttpManager.addParam("platform", "" + CONFIG.PLATFORM_ID),
		// 	HttpManager.addParam("loginType", window.FISHING_CONFIG.loginType),
		// 	HttpManager.addParam("subplatform", window.FISHING_CONFIG.subplatform),
		// 	HttpManager.addParam("invitationCode", window.FISHING_CONFIG.invitationCode),
		// 	HttpManager.send();
		// 	break;
		// case PlatformTypeEnum.YI_WAN_TANG:
		// }
	}

	public static thirdPartyLogin(e, t) {
		// switch (e) {
		// case PlatformTypeEnum.COMBUNET:
		// 	window.location.href = CONFIG.LOGIN_ADDR + "combunet/combunetGame.jsp?loginType=" + t + "&invitationCode=" + window.FISHING_CONFIG.invitationCode + "&subplatform=" + window.FISHING_CONFIG.subplatform;
		// 	break;
		// case PlatformTypeEnum.YI_WAN_TANG:
		// 	window.location.href = CONFIG.LOGIN_ADDR + "combunetGame.jsp?loginType=" + t + "&invitationCode=" + window.FISHING_CONFIG.invitationCode + "&subplatform=" + window.FISHING_CONFIG.subplatform
		// }
	}

	public static setResPrefix(e) {
		CONFIG.RES_PATH_PREFIX = e
	}

	// retcode
	// accId
	// platform
	// subPlatform
	// userName

	// public static sendLoginMsg(e) {
	// 	var t = JSON.parse(e),
	// 	i = PlatformManager.retcode;
	// 	i == ServerState.BAN ? CONFIG.SERVER_USER_STATE = i: i == ServerState.CLOSED ? CONFIG.SERVER_USER_STATE = i: (CONFIG.SERVER_IP = PlatformManager.host, CONFIG.SERVER_PORT = PlatformManager.port, CONFIG.USER_SECRET = PlatformManager.secret, CONFIG.USER_ID = PlatformManager.userId, CONFIG.ACCOUNT = PlatformManager.accId, CONFIG.PLATFORM_ID = PlatformManager.platform, CONFIG.USER_NAME = PlatformManager.userName, CONFIG.OPEN_ID = PlatformManager.openId, CONFIG.OPEN_KEY = PlatformManager.openKey, CONFIG.APP_ID = PlatformManager.appId, PlatformManager.subPlatform && (CONFIG.SUB_PLATFORM_ID = PlatformManager.subPlatform))
	// }

	public static payState(t, i) {
		void 0 === i && (i = "");
		var n = "";
		"__paySuccess" == t ? n = "支付成功\n如果没有及时到账请尝试刷新游戏": "__payError" == t ? n = "支付失败": "__getInfoError" == t ? n = "获取账户余额失败": "__payClose" == t && (n = "支付已取消"),
		GameUtil.openConfirm(null,
		function() {
			_Notification_.send(NotifyEnum.UPDATE_MAIN_DATA)
		},
		this, n + i)
	}


}