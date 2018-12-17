// 月卡
class T_MonthCard {
    public id = 0;
    public value = 0;
    public price = 0;
    public award1 = "";
    public award2 = "";
    public award3 = "";
    public award4 = "";
    public award5 = "";
    public award6 = "";
}

class T_MonthCard_Table{
    public static getVoByKey = function(t) {
        var i = MonthCard_Table.length,
        a = SerchUtil.binary_search(MonthCard_Table, "id", 0, i, t);
        return <T_MonthCard>a
    }
    public static getAllVo = function() {
        return MonthCard_Table
    }
    
}

var MonthCard_Table = [
{
	id:1,
	value:1000,
	price:60,
	award1:"2056_100",
	award2:"2056_100",
	award3:"2056_100",
	award4:"2056_100",
	award5:"2056_100",
	award6:"2056_100"
}]