// 捕鱼任务类型
class T_FishTaskType {
    public type = 0;
    public isIndex = 0;
    public showNum = 0;
    public roomType = "";
}

class T_FishTaskType_Table{
    public static getVoByKey = function(t) {
        var i = FishTaskType_Table.length,
        a = SerchUtil.binary_search(FishTaskType_Table, "type", 0, i, t);
        return <T_FishTaskType>a
    }
    public static getAllVo = function() {
        return FishTaskType_Table
    }
}

 var FishTaskType_Table = [{
    type: 1,
    isIndex: 1,
    showNum: 0,
    roomType: "1,2,3,4"
},
{
    type: 2,
    isIndex: 0,
    showNum: 0,
    roomType: "1,2,3,4,5,6,7"
},
{
    type: 3,
    isIndex: 0,
    showNum: 0,
    roomType: "1,2,3,4,5,6,7"
},
{
    type: 4,
    isIndex: 0,
    showNum: 0,
    roomType: "1,2,3,4,5,6,7"
},
{
    type: 5,
    isIndex: 1,
    showNum: 3,
    roomType: "5"
},
{
    type: 6,
    isIndex: 1,
    showNum: 3,
    roomType: "6"
},
{
    type: 7,
    isIndex: 1,
    showNum: 3,
    roomType: "7"
},
{
    type: 8,
    isIndex: 0,
    showNum: 0,
    roomType: "1,2,3,4,5,6,7"
},
{
    type: 9,
    isIndex: 0,
    showNum: 0,
    roomType: "1,2,3,4,5,6,7"
},
{
    type: 10,
    isIndex: 1,
    showNum: 3,
    roomType: "1,2,3"
}]