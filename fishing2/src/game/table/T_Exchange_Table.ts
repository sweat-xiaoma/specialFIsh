// 兑换
class T_Exchange {
    public id = 0;
    public type = 0;
    public price = "";
    public name = 0;
    public desc = 0;
    public icon = 0;
}

class T_Exchange_Table{
    public static getVoByKey = function(t) {
        var i = Exchange_Table.length,
        a = SerchUtil.binary_search(Exchange_Table, "id", 0, i, t);
        return <T_Exchange>a
    }
    public static getAllVo = function() {
        return Exchange_Table
    }
    
}

var Exchange_Table = [
{
	id:0,
	type:1,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
},
{
	id:1,
	type:1,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
},
{
	id:2,
	type:1,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
},
{
	id:3,
	type:1,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
},
{
	id:4,
	type:1,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
},
{
	id:5,
	type:1,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
},
{
	id:6,
	type:2,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
},
{
	id:7,
	type:2,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
},
{
	id:8,
	type:2,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
},
{
	id:9,
	type:2,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
},
{
	id:10,
	type:2,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
},
{
	id:11,
	type:2,
	price:"50002_100",
	name:2056,
	desc:2000,
	icon:20001
}]