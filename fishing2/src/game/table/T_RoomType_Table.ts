// 房间类型
class T_RoomType {
    public id = 0;
    public enName = "";
    public onlineNum = 0;
    public enterRequire ='';
    public gunInterval = [];
}

class T_RoomType_Table{
    public static getVoByKey = function(t) {
        var i = RoomType_Table.length,
        a = SerchUtil.binary_search(RoomType_Table, "id", 0, i, t);
        return <T_RoomType>a
    }
    public static getAllVo = function() {
        return RoomType_Table;
    }
}

 var RoomType_Table = [
{
	id:1,
	enName:"selectroom",
	onlineNum:0,
	enterRequire:"0_-1_1,1_-1_2",
	gunInterval:[1,10]
},
{
	id:2,
	enName:"autolowroom",
	onlineNum:0,
	enterRequire:"10000_-1_1,1_-1_2",
	gunInterval:[10,19]
},
{
	id:3,
	enName:"autohighroom",
	onlineNum:0,
	enterRequire:"100000_-1_1,1_-1_2",
	gunInterval:[19,28]
},
{
	id:4,
	enName:"newbieroom",
	onlineNum:0,
	enterRequire:"0_-1_1,1_-1_2",
	gunInterval:[1,10]
},
{
	id:5,
	enName:"djsoom",
	onlineNum:0,
	enterRequire:"0_20000_1,10_40_2",
	gunInterval:[1,43]
},
{
	id:6,
	enName:"qmsroom",
	onlineNum:0,
	enterRequire:"0_20000_1,10_40_2",
	gunInterval:[1,43]
},
{
	id:7,
	enName:"kssroom",
	onlineNum:0,
	enterRequire:"0_20000_1,10_40_2",
	gunInterval:[1,43]
}]