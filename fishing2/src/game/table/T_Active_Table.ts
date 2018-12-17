// 活动   没用到
class T_Active {
    public id = 0;
    public type = 0;
    public descVip = "";
    public nameUrl = "";
}

class T_Active_Table{
    public static getVoByKey = function(t) {
        var i = Active_Table.length,
        a = SerchUtil.binary_search(Active_Table, "id", 0, i, t);
        return <T_Active>a
    }
    public static getAllVo = function() {
        return Active_Table
    }
}

 var Active_Table = [{
    id: 1,
    type: 1,
    descVip: "xx1",
    nameUrl: "active_dian"
},
{
    id: 2,
    type: 2,
    descVip: "xx2",
    nameUrl: "active_song"
},
{
    id: 3,
    type: 3,
    descVip: "xx3",
    nameUrl: "active_song_li"
},
{
    id: 4,
    type: 4,
    descVip: "xx4",
    nameUrl: "active_song_ling"
}]