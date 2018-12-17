// 首充
class T_FirstCharge {
    public id = 0;
    public value = 0; 
    public award1 = "";
    public award2 = "";
    public award3 = "";
    public award4 = "";
}

class T_FirstCharge_Table{
    public static getVoByKey = function(t) {
        var i = FirstCharge_Table.length,
        a = SerchUtil.binary_search(FirstCharge_Table, "id", 0, i, t);
        return <T_FirstCharge>a
    }
    public static getAllVo = function() {
        return FirstCharge_Table
    }
    
}

var FirstCharge_Table = [
{
	id:1,
	value:1000,
	award1:"2056_100",
	award2:"2056_101",
	award3:"2056_102",
	award4:"2056_103"
}]