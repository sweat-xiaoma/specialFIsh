// 充值
class T_Charge {
    public id = 0;
    public type = 0; // 1：rmb买钻石  2：钻石买金币
    public goods = "";
    public award = "";
    public price = "";
    public icon = 0;
}

class T_Charge_Table{
    public static getVoByKey = function(t) {
        var i = Charge_Table.length,
        a = SerchUtil.binary_search(Charge_Table, "id", 0, i, t);
        return <T_Charge>a
    }
    public static getAllVo = function() {
        return Charge_Table
    }
    
}

var Charge_Table = [
{
	id:0,
	type:1,
	goods:"10002_60",
	award:"10002_60",
	price:"10000_6",
	icon:20000
},
{
	id:1,
	type:1,
	goods:"10002_300",
	award:"10002_300",
	price:"10000_30",
	icon:20001
},
{
	id:2,
	type:1,
	goods:"10002_980",
	award:"10002_980",
	price:"10000_98",
	icon:20002
},
{
	id:3,
	type:1,
	goods:"10002_1880",
	award:"10002_1880",
	price:"10000_188",
	icon:20003
},
{
	id:4,
	type:1,
	goods:"10002_3280",
	award:"10002_3280",
	price:"10000_328",
	icon:20004
},
{
	id:5,
	type:1,
	goods:"10002_6480",
	award:"10002_6480",
	price:"10000_648",
	icon:20005
},
{
	id:6,
	type:2,
	goods:"10001_10000",
	award:"10001_10000",
	price:"10002_10",
	icon:20006
},
{
	id:7,
	type:2,
	goods:"10001_100000",
	award:"10001_100000",
	price:"10002_100",
	icon:20007
},
{
	id:8,
	type:2,
	goods:"10001_300000",
	award:"10001_300000",
	price:"10002_300",
	icon:20008
},
{
	id:9,
	type:2,
	goods:"10001_1000000",
	award:"10001_1000000",
	price:"10002_1000",
	icon:20009
},
{
	id:10,
	type:2,
	goods:"10001_3000000",
	award:"10001_3000000",
	price:"10002_3000",
	icon:20010
},
{
	id:11,
	type:2,
	goods:"10001_10000000",
	award:"10001_10000000",
	price:"10002_10000",
	icon:20011
}]