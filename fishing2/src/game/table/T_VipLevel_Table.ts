// vip等级
class T_VipLevel {
    public vipLevel = 0;
    public levelUpExp = 0;
    public levelUpAward = "";
    public descVip = 0;
    public makeUpConisTo = 0;
    public everydayAward = "";
    public grandPrix = 0;
    public couponBuyAdditionRatioByType = "";
    public arenaBuyTime = 0;
    public reliefMoneyTime = 0;
    public reliefMoney = 0;
    public autoShot = 0;   // 自动
    public signDouble = 0; // 双倍
    public gift = 0; // 赠送功能
    public bomb = 0; // 弹头开启
}

class T_VipLevel_Table{
    public static getVoByKey = function(t) {
        var i = VipLevel_Table.length,
        a = SerchUtil.binary_search(VipLevel_Table, "vipLevel", 0, i, t);
        return <T_VipLevel>a
    }
    public static getAllVo = function() {
        return VipLevel_Table
    }
}

  var VipLevel_Table = [
{
	vipLevel:0,
	levelUpExp:1000,
	levelUpAward:"20002_1",
	descVip:2324,
	makeUpConisTo:0,
	everydayAward:"0",
	grandPrix:0,
	couponBuyAdditionRatioByType:"0",
	arenaBuyTime:0,
	reliefMoneyTime:3,
	reliefMoney:5000,
	autoShot:0,
	signDouble:0,
	gift:0,
	bomb:0
},
{
	vipLevel:1,
	levelUpExp:5000,
	levelUpAward:"20002_2",
	descVip:2325,
	makeUpConisTo:0,
	everydayAward:"0",
	grandPrix:0,
	couponBuyAdditionRatioByType:"0",
	arenaBuyTime:1,
	reliefMoneyTime:4,
	reliefMoney:5000,
	autoShot:1,
	signDouble:1,
	gift:0,
	bomb:0
},
{
	vipLevel:2,
	levelUpExp:50000,
	levelUpAward:"20002_3",
	descVip:2326,
	makeUpConisTo:0,
	everydayAward:"0",
	grandPrix:0,
	couponBuyAdditionRatioByType:"0",
	arenaBuyTime:2,
	reliefMoneyTime:5,
	reliefMoney:10000,
	autoShot:1,
	signDouble:1,
	gift:1,
	bomb:0
},
{
	vipLevel:3,
	levelUpExp:100000,
	levelUpAward:"20002_4",
	descVip:2327,
	makeUpConisTo:0,
	everydayAward:"0",
	grandPrix:0,
	couponBuyAdditionRatioByType:"0",
	arenaBuyTime:3,
	reliefMoneyTime:6,
	reliefMoney:10000,
	autoShot:1,
	signDouble:1,
	gift:1,
	bomb:1
},
{
	vipLevel:4,
	levelUpExp:500000,
	levelUpAward:"20002_5",
	descVip:2328,
	makeUpConisTo:0,
	everydayAward:"0",
	grandPrix:0,
	couponBuyAdditionRatioByType:"1_10",
	arenaBuyTime:4,
	reliefMoneyTime:7,
	reliefMoney:50000,
	autoShot:1,
	signDouble:1,
	gift:1,
	bomb:1
},
{
	vipLevel:5,
	levelUpExp:1200000,
	levelUpAward:"20002_6",
	descVip:2329,
	makeUpConisTo:0,
	everydayAward:"0",
	grandPrix:0,
	couponBuyAdditionRatioByType:"1_20",
	arenaBuyTime:5,
	reliefMoneyTime:8,
	reliefMoney:100000,
	autoShot:1,
	signDouble:1,
	gift:1,
	bomb:1
},
{
	vipLevel:6,
	levelUpExp:2000000,
	levelUpAward:"20002_7",
	descVip:2330,
	makeUpConisTo:500000,
	everydayAward:"70001_5,70002_5,70003_5,70004_5",
	grandPrix:5,
	couponBuyAdditionRatioByType:"1_20",
	arenaBuyTime:6,
	reliefMoneyTime:9,
	reliefMoney:200000,
	autoShot:1,
	signDouble:1,
	gift:1,
	bomb:1
},
{
	vipLevel:7,
	levelUpExp:5000000,
	levelUpAward:"20051_1",
	descVip:2331,
	makeUpConisTo:1000000,
	everydayAward:"70001_10,70002_10,70003_10,70004_10",
	grandPrix:7,
	couponBuyAdditionRatioByType:"1_20",
	arenaBuyTime:7,
	reliefMoneyTime:10,
	reliefMoney:300000,
	autoShot:1,
	signDouble:1,
	gift:1,
	bomb:1
},
{
	vipLevel:8,
	levelUpExp:0,
	levelUpAward:"20052_1",
	descVip:2332,
	makeUpConisTo:2000000,
	everydayAward:"70001_15,70002_15,70003_15,70004_15",
	grandPrix:10,
	couponBuyAdditionRatioByType:"1_20",
	arenaBuyTime:8,
	reliefMoneyTime:11,
	reliefMoney:500000,
	autoShot:1,
	signDouble:1,
	gift:1,
	bomb:1
}]