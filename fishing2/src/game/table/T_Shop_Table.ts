// 商店
class T_Shop {
    public id = 0;
    public shopType = 0;
    public itemId = 0;
    public num = 0;
    public price = "";
    public validPeriod = 0;
}

class T_Shop_Table{
    public static getVoByKey = function(t) {
        var i = Shop_Table.length,
        a = SerchUtil.binary_search(Shop_Table, "id", 0, i, t);
        return <T_Shop>a
    }
    public static getAllVo = function() {
        return Shop_Table
    }
}

 var Shop_Table = [
{
	id:1,
	shopType:1,
	itemId:20001,
	num:1,
	price:"10012_100",
	validPeriod:720
},
{
	id:2,
	shopType:1,
	itemId:20006,
	num:1,
	price:"10012_100",
	validPeriod:720
},
{
	id:3,
	shopType:1,
	itemId:20005,
	num:1,
	price:"10012_100",
	validPeriod:720
},
{
	id:4,
	shopType:1,
	itemId:20004,
	num:1,
	price:"10012_100",
	validPeriod:720
},
{
	id:5,
	shopType:2,
	itemId:40001,
	num:100,
	price:"10002_50",
	validPeriod:0
},
{
	id:6,
	shopType:2,
	itemId:40002,
	num:40,
	price:"10002_50",
	validPeriod:0
},
{
	id:7,
	shopType:2,
	itemId:70001,
	num:10,
	price:"10012_10",
	validPeriod:0
},
{
	id:8,
	shopType:2,
	itemId:70002,
	num:10,
	price:"10012_10",
	validPeriod:0
},
{
	id:9,
	shopType:2,
	itemId:70003,
	num:10,
	price:"10012_10",
	validPeriod:0
},
{
	id:10,
	shopType:2,
	itemId:70004,
	num:10,
	price:"10012_10",
	validPeriod:0
}]