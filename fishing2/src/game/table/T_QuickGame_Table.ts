// 快速游戏
class T_QuickGame {
    public id = 0;
    public admissionFee = "";
    public minGunId = 0;
    public theFirst = "";
    public theSecond = "";
    public theThird = "";
}

class T_QuickGame_Table{
    public static getVoByKey = function(t) {
        var i = QuickGame_Table.length,
        a = SerchUtil.binary_search(QuickGame_Table, "id", 0, i, t);
        return <T_QuickGame>a
    }
    public static getAllVo = function() {
        return QuickGame_Table
    }
}

 var QuickGame_Table = [{
        id: 7,
        admissionFee: "10001_2000",
        minGunId: 1,
        theFirst: "10001_8000",
        theSecond: "10001_4000",
        theThird: "10001_2400"
    },
    {
        id: 8,
        admissionFee: "10001_12500",
        minGunId: 1,
        theFirst: "10001_50000",
        theSecond: "10001_25000",
        theThird: "10001_15000"
    },
    {
        id: 9,
        admissionFee: "10001_125000",
        minGunId: 1,
        theFirst: "50001_1",
        theSecond: "10001_250000",
        theThird: "10001_150000"
    },
    {
        id: 10,
        admissionFee: "10001_500000",
        minGunId: 1,
        theFirst: "50001_4",
        theSecond: "10001_1000000",
        theThird: "10001_600000"
    }]