// 秘密商店
class T_SecretShop {
    public id = 0;
    public type = 0;
    public descVip = "";
    public nameUrl = "";
}

class T_SecretShop_Table{
    public static getVoByKey = function(t) {
        var i = SecretShop_Table.length,
        a = SerchUtil.binary_search(SecretShop_Table, "id", 0, i, t);
        return <T_SecretShop>a
    }
    public static getAllVo = function() {
        return SecretShop_Table
    }
}

 var SecretShop_Table = [{
    id: 1,
    goods: "40001_5",
    price: "10001_10,10013_2"
},
{
    id: 2,
    goods: "40001_10",
    price: "10001_20,10013_4"
},
{
    id: 3,
    goods: "40002_5",
    price: "10001_10,10013_2"
},
{
    id: 4,
    goods: "40003_10",
    price: "10001_20,10013_4"
},
{
    id: 5,
    goods: "50001_1",
    price: "10001_500000,10013_100000"
},
{
    id: 6,
    goods: "50002_1",
    price: "10001_200000,10013_40000"
},
{
    id: 7,
    goods: "20001_1_720",
    price: "10001_500000,10013_100000"
},
{
    id: 8,
    goods: "20002_1_720",
    price: "10001_1000000,10013_200000"
},
{
    id: 9,
    goods: "10002_50",
    price: "10001_25000,10013_5000"
},
{
    id: 10,
    goods: "10002_100",
    price: "10001_50000,10013_10000"
}]