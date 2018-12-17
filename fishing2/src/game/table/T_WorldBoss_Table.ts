// 世界boss
class T_WorldBoss {
    public id = 0;
    public fishId = 0;
}

class T_WorldBoss_Table{
    public static getVoByKey = function(t) {
        var i = WorldBoss_Table.length,
        a = SerchUtil.binary_search(WorldBoss_Table, "id", 0, i, t);
        return <T_WorldBoss>a
    }
    public static getAllVo = function() {
        return WorldBoss_Table
    }
}

var WorldBoss_Table = [{
    id: 1,
    fishId: 201
}]