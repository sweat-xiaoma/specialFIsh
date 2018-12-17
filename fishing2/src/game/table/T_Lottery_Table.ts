// 抽奖
class T_Lottery {
    public id = 0;
    public name = 0;
    public integral = 0; // 积分
    public award1 = "";
    public award2 = "";
    public award3 = "";
    public award4 = "";
    public award5 = "";
    public award6 = "";
}

class T_Lottery_Table{
    public static getVoByKey = function(t) {
        var i = Lottery_Table.length,
        a = SerchUtil.binary_search(Lottery_Table, "id", 0, i, t);
        return <T_Lottery>a
    }
    public static getAllVo = function() {
        return Lottery_Table
    }
}

  var Lottery_Table = [
{
	id:1,
	name:2416,
	integral:1000,
	award1:"40001_1_200",
	award2:"40002_1_200",
	award3:"10001_5000_100",
	award4:"10001_2000_100",
	award5:"10001_1000_200",
	award6:"10001_500_1000"
},
{
	id:2,
	name:2417,
	integral:10000,
	award1:"40001_5_200",
	award2:"40002_5_200",
	award3:"10001_50000_100",
	award4:"10001_20000_100",
	award5:"10001_10000_200",
	award6:"10001_5000_1000"
},
{
	id:3,
	name:2418,
	integral:50000,
	award1:"40001_10_200",
	award2:"40002_10_200",
	award3:"10001_250000_100",
	award4:"10001_100000_100",
	award5:"10001_50000_200",
	award6:"10001_25000_1000"
},
{
	id:4,
	name:2419,
	integral:200000,
	award1:"40001_20_200",
	award2:"40002_20_200",
	award3:"10001_1000000_100",
	award4:"10001_400000_100",
	award5:"10001_200000_200",
	award6:"10001_100000_1000"
},
{
	id:5,
	name:2420,
	integral:1000000,
	award1:"40001_40_200",
	award2:"40002_40_200",
	award3:"10001_5000000_100",
	award4:"10001_2000000_100",
	award5:"10001_1000000_200",
	award6:"10001_500000_1000"
},
{
	id:6,
	name:2421,
	integral:5000000,
	award1:"40001_100_200",
	award2:"40002_100_200",
	award3:"10001_25000000_100",
	award4:"10001_10000000_100",
	award5:"10001_5000000_200",
	award6:"10001_2500000_1000"
}]