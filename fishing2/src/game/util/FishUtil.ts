class FishUtil {
	public constructor() {
	}

	public  static CLONE_NUM = 3;
	public  static CLONE_GUN_ROTATION = [0, -45, 45];
	public  static CLONE_GUN_MAXBULLET = 20;
	public  static FISH_SCORE_MAX = 99999999;
	public  static ELE_FRAME_RESNAME = "eleFrame";
	public  static FISH_ELE_FRAME_RESNAME = "fishEleFrame";
	public  static GOLD_MOVIE_RESNAME = "fishEleFrame";
	public  static FISH_ELE_MAXFRAME = 3;
	public  static FISHING_DEBUG = !0;


	public static GET_BULLET_MOVELOGIC(e, t, i, n, a) {
        var o = new MoveLogicBase,
        r = new egret.Point(t, i);
        return o.create(n, e, 0, r, a),
        o
    }
    public static GET_FISHING_RECT() {
        var e = egret.MainContext.instance.stage.stageWidth,
        t = egret.MainContext.instance.stage.stageHeight;
        return new egret.Rectangle((e - CONFIG.contentWidth) / 2, (t - CONFIG.contentHeight) / 2, (e - CONFIG.contentWidth) / 2 + CONFIG.contentWidth, (t - CONFIG.contentHeight) / 2 + CONFIG.contentHeight)
    }
    public static getAngle(e, t, i, n) {
        var a = Math.abs(e - i),
        o = Math.abs(t - n),
        r = Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2)),
        s = o / r,
        l = Math.acos(s),
        u = Math.floor(180 / (Math.PI / l));
        return i > e && n > t && (u = 180 - u),
        i == e && n > t && (u = 180),
        i > e && n == t && (u = 90),
        e > i && n > t && (u = 180 + u),
        e > i && n == t && (u = 270),
        e > i && t > n && (u = 360 - u),
        u
    }

    /**鱼是否在屏幕中 */
    public static isFishInScreen(fish:FishBase){
        var u = fish.localToGlobal();
        if (u.x + (fish.measuredWidth >> 1) >= 0 && u.x - (fish.measuredWidth >> 1) <= 1280 
        && u.y + (fish.measuredHeight >> 1) >= 0 && u.y - (fish.measuredHeight >> 1) <= 720) {
            return true;
        }else{
            return false;
        }
    }

    public static getMusicByRoomType(e) {
        switch (e) {
        case RequesetRoomState.NewbieRoom:
            return "bgm_scene1_mp3";
        default:
            return "bgm_scene2_mp3"
        }
    }
}