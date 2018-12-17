// 没用到
class T_FishCatchAll {
    public id = 0;
    public type = 0;
    public descVip = "";
    public nameUrl = "";
}

class T_FishCatchAll_Table{
    public static getVoByKey = function(t) {
        var i = FishCatchAll_Table.length,
        a = SerchUtil.binary_search(FishCatchAll_Table, "id", 0, i, t);
        return <T_FishCatchAll>a
    }
    public static getAllVo = function() {
        return FishCatchAll_Table
    }
}

 var FishCatchAll_Table = [{
    id: 1,
    name: 2219,
    fishIds: "29,30,35,36,37,38,39",
    moves: "102901,102902,102903,102904,102910,102911,102912"
}]