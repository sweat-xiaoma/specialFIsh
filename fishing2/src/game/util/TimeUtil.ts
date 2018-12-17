class TimeUtil {
	public constructor() {
	}

	public static SERVER_TIME_STAMP;
	public static CLIENT_TIME_STAMP;


    public static initServerTime(t) {
        TimeUtil.SERVER_TIME_STAMP = t; //(new Date).getTime() / 1e3;
        TimeUtil.CLIENT_TIME_STAMP = (new Date).getTime() / 1e3
    }

    public static getCurrTime() {
        var t = (new Date).getTime() / 1e3 - TimeUtil.CLIENT_TIME_STAMP;
        return TimeUtil.SERVER_TIME_STAMP + t
    }

    public static sceonds2MinStr(e) {
        var t = e / 60,
        i = e % 60,
        n = Math.floor(t);
        0 > n && (n = 0);
        var a = n + "";
        10 > n && (a = "0" + a);
        var o = Math.floor(i) + "";
        return Math.floor(i) < 10 && (o = "0" + o),
        a + ":" + o
        
    }

    public static longToDateStr(e) {
        var t = new Date(e);
        return t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日"
    }

    public static getActiveTime(e, t) {
        var i = new Date(1e3 * e),
        n = new Date(1e3 * t),
        a = i.getMinutes() < 10 ? "0" + i.getMinutes() : i.getMinutes(),
        o = n.getMinutes() < 10 ? "0" + n.getMinutes() : n.getMinutes();
        return i.getMonth() + 1 + "月" + i.getDate() + "日" + i.getHours() + ":" + a + ":" + i.getSeconds() + "-" + (n.getMonth() + 1) + "月" + n.getDate() + "日" + n.getHours() + ":" + o + ":" + n.getSeconds()
    }

    public static sceondsMonthCard(e) {
        return "月卡剩余:" + Math.floor(e / 86400) + "天"
    }

    public static expireTime(e) {
        var t = new Date;
        t.setHours(0),
        t.setMinutes(0),
        t.setSeconds(0),
        t.setMilliseconds(0);
        var i = this.getCurrTime(),
        n = t.getTime() / 1e3 + 86400 - i;
        return n = Math.floor(n / 3600),
        e + n + "小时"
    }
}