// 大奖赛
class T_GrandPrixRankRange {
    public type = 0;
    public isIndex = 0;
    public showNum = 0;
    public roomType = "";
}

class T_GrandPrixRankRange_Table{
    public static getVoByKey = function(t) {
        var i = GrandPrixRankRange_Table.length,
        a = SerchUtil.binary_search(GrandPrixRankRange_Table, "id", 0, i, t);
        return <T_GrandPrixRankRange>a
    }
    public static getAllVo = function() {
        return GrandPrixRankRange_Table
    }
}

var GrandPrixRankRange_Table = [{
    id: 1,
    roomType: 5,
    rangeMin: 1,
    rangeMax: 1,
    award: "50001_2"
},
{
    id: 2,
    roomType: 5,
    rangeMin: 2,
    rangeMax: 2,
    award: "50002_5"
},
{
    id: 3,
    roomType: 5,
    rangeMin: 3,
    rangeMax: 3,
    award: "50002_2"
},
{
    id: 4,
    roomType: 5,
    rangeMin: 4,
    rangeMax: 10,
    award: "10001_150000"
},
{
    id: 5,
    roomType: 5,
    rangeMin: 11,
    rangeMax: 20,
    award: "10001_100000"
},
{
    id: 6,
    roomType: 5,
    rangeMin: 21,
    rangeMax: 50,
    award: "10002_100"
},
{
    id: 7,
    roomType: 5,
    rangeMin: 51,
    rangeMax: 100,
    award: "10002_50"
},
{
    id: 8,
    roomType: 5,
    rangeMin: 101,
    rangeMax: 200,
    award: "40001_20"
},
{
    id: 9,
    roomType: 6,
    rangeMin: 1,
    rangeMax: 1,
    award: "10001_100000"
},
{
    id: 9,
    roomType: 99,
    rangeMin: 1,
    rangeMax: 1,
    award: "10001_30000000"
},
{
    id: 10,
    roomType: 6,
    rangeMin: 2,
    rangeMax: 2,
    award: "10001_80000"
},
{
    id: 10,
    roomType: 99,
    rangeMin: 2,
    rangeMax: 2,
    award: "10001_20000000"
},
{
    id: 11,
    roomType: 6,
    rangeMin: 3,
    rangeMax: 3,
    award: "10001_50000"
},
{
    id: 11,
    roomType: 99,
    rangeMin: 3,
    rangeMax: 3,
    award: "10001_1000000"
},
{
    id: 12,
    roomType: 6,
    rangeMin: 4,
    rangeMax: 10,
    award: "10001_30000"
},
{
    id: 12,
    roomType: 99,
    rangeMin: 4,
    rangeMax: 10,
    award: "10001_5000000"
},
{
    id: 13,
    roomType: 6,
    rangeMin: 11,
    rangeMax: 20,
    award: "10001_10000"
},
{
    id: 13,
    roomType: 99,
    rangeMin: 11,
    rangeMax: 20,
    award: "10001_2000000"
},
{
    id: 14,
    roomType: 6,
    rangeMin: 21,
    rangeMax: 50,
    award: "10002_10"
},
{
    id: 14,
    roomType: 99,
    rangeMin: 21,
    rangeMax: 50,
    award: "10001_1000000"
},
{
    id: 15,
    roomType: 6,
    rangeMin: 51,
    rangeMax: 100,
    award: "10002_5"
},
{
    id: 15,
    roomType: 99,
    rangeMin: 51,
    rangeMax: 100,
    award: "10001_500000"
},
{
    id: 16,
    roomType: 6,
    rangeMin: 101,
    rangeMax: 200,
    award: "40001_5"
},
{
    id: 16,
    roomType: 99,
    rangeMin: 101,
    rangeMax: 200,
    award: "10001_250000"
}]