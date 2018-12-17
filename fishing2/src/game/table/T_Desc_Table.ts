// 描述 没用到
class T_Desc {
    public id = 0;
    public descW_H = "";
    public descVip = 0;
}

class T_Desc_Table{
    public static getVoByKey = function(t) {
        var i = Desc_Table.length,
        a = SerchUtil.binary_search(Desc_Table, "id", 0, i, t);
        return <T_Desc>a
    }
    public static getAllVo = function() {
        return Desc_Table
    }
}

 var Desc_Table = [{
    id: 1,
    descW_H: "400_150",
    descVip: 2323
},
{
    id: 2,
    descW_H: "420_180",
    descVip: 2324
},
{
    id: 3,
    descW_H: "420_180",
    descVip: 2325
},
{
    id: 4,
    descW_H: "420_180",
    descVip: 2326
},
{
    id: 5,
    descW_H: "420_180",
    descVip: 2327
},
{
    id: 6,
    descW_H: "420_180",
    descVip: 2328
},
{
    id: 7,
    descW_H: "420_220",
    descVip: 2329
},
{
    id: 8,
    descW_H: "420_220",
    descVip: 2330
},
{
    id: 9,
    descW_H: "420_220",
    descVip: 2331
}]