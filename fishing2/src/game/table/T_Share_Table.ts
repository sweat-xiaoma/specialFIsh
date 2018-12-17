// 分享
class T_Share {
    public id = 0;
    public type = 0;
    public parameter = 0;
    public dec = "";
    public award = "";
}

class T_Share_Table{
    public static getVoByKey = function(t) {
        var i = Share_Table.length,
        a = SerchUtil.binary_search(Share_Table, "id", 0, i, t);
        return <T_Share>a
    }
    public static getAllVo = function() {
        return Share_Table
    }
}

 var Share_Table = [{
    id: 101,
    type: 1,
    parameter: 30,
    dec: "2426",
    award: "10001_5000"
},
{
    id: 102,
    type: 1,
    parameter: 300,
    dec: "2427",
    award: "10002_100"
},
{
    id: 201,
    type: 2,
    parameter: 0,
    dec: "2428",
    award: "30002_10"
},
{
    id: 301,
    type: 3,
    parameter: 50,
    dec: "2429",
    award: "30002_50"
},
{
    id: 302,
    type: 3,
    parameter: 100,
    dec: "2430",
    award: "30002_100"
}]