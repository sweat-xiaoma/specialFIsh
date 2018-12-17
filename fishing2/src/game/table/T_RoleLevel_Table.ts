// 角色升级
class T_RoleLevel {
    public roleLevel = 0;
    public levelUpExp = 0;
    public levelUpAward = "";   //升级奖励物品和数量
}

class T_RoleLevel_Table{
    public static getVoByKey = function(t) {
        var i = RoleLevel_Table.length,
        a = SerchUtil.binary_search(RoleLevel_Table, "roleLevel", 0, i, t);
        return <T_RoleLevel>a
    }
    public static getAllVo = function() {
        return RoleLevel_Table
    }
}

 var RoleLevel_Table = [{
    roleLevel: 1,
    levelUpExp: 188,
    levelUpAward: "10002_2,40001_2,40002_1"
},
{
    roleLevel: 2,
    levelUpExp: 498,
    levelUpAward: "10002_3,40001_2,40002_1"
},
{
    roleLevel: 3,
    levelUpExp: 693,
    levelUpAward: "10002_3,40001_2,40002_1"
},
{
    roleLevel: 4,
    levelUpExp: 1593,
    levelUpAward: "10002_5,40001_2,40002_1"
},
{
    roleLevel: 5,
    levelUpExp: 2793,
    levelUpAward: "10002_5,40001_2,40002_1"
},
{
    roleLevel: 6,
    levelUpExp: 6886,
    levelUpAward: "10002_10,40001_2,40002_1"
},
{
    roleLevel: 7,
    levelUpExp: 9498,
    levelUpAward: "10002_10,40001_2,40002_1"
},
{
    roleLevel: 8,
    levelUpExp: 18998,
    levelUpAward: "10002_20,40001_2,40002_1"
},
{
    roleLevel: 9,
    levelUpExp: 48998,
    levelUpAward: "10002_20,40001_2,40002_1"
},
{
    roleLevel: 10,
    levelUpExp: 7e4,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 11,
    levelUpExp: 15e4,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 12,
    levelUpExp: 3e5,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 13,
    levelUpExp: 72e4,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 14,
    levelUpExp: 115e4,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 15,
    levelUpExp: 16e5,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 16,
    levelUpExp: 23e5,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 17,
    levelUpExp: 28e5,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 18,
    levelUpExp: 32e5,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 19,
    levelUpExp: 45e5,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 20,
    levelUpExp: 6e6,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 21,
    levelUpExp: 9e6,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 22,
    levelUpExp: 135e5,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 23,
    levelUpExp: 18e6,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 24,
    levelUpExp: 3e7,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 25,
    levelUpExp: 45e6,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 26,
    levelUpExp: 6e7,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 27,
    levelUpExp: 75e6,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 28,
    levelUpExp: 9e7,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 29,
    levelUpExp: 15e7,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 30,
    levelUpExp: 3e8,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 31,
    levelUpExp: 45e7,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 32,
    levelUpExp: 6e8,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 33,
    levelUpExp: 75e7,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 34,
    levelUpExp: 9e8,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 35,
    levelUpExp: 1e9,
    levelUpAward: "10002_40,40001_2,40002_1"
},
{
    roleLevel: 36,
    levelUpExp: 5e9,
    levelUpAward: "10002_40,40001_2,40002_1"
}]