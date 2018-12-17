// 整体配置
class T_Config {
    public id = 0;
    public value = "";
}

class T_Config_Table{
    public static getVoByKey = function(t) {
        var i = Config_Table.length,
        a = SerchUtil.binary_search(Config_Table, "id", 0, i, t);
        return <T_Config>a
    }
    public static getAllVo = function() {
        return Config_Table
    }
    
}

var Config_Table = [{
            id: 12,
            value: "10000"
        },
        {
            id: 13,
            value: "15000"
        },
        {
            id: 14,
            value: "30000"
        },
        {
            id: 15,
            value: "5_10" 
        },
        {
            id: 17,
            value: "3000000"
        },
        {
            id: 20,
            value: "20000"
        },
        {
            id: 21,
            value: "30000"
        },
        {
            id: 24,
            value: "101,102,103"  // tips
        },
        {
            id: 29,
            value: "20"  // 子弹最大个数
        },
        {
            id: 30,
            value: "10"
        },
        {
            id: 32,
            value: "10000_100000_30000_0_0"      //房间类型需求金币，AutoLowRoom_AutoHighRoom_SelectRoom
        },
        {
            id: 33,
            value: "0_3"
        },
        {
            id: 34,
            value: "0_0"
        },
        {
            id: 35,    //狂暴， vip级别对应子弹的倍数，<3：1倍； 3 =< v < 6:2倍； >=6:3倍
            value: "3_6"
        },
        {
            id: 36,
            value: "12_25_3_14_14"   //房间类型需求gunId，AutoLowRoom_AutoHighRoom_SelectRoom_ _
        },
        {
            id: 37,
            value: "35"     // //新手场进入的最大级别
        },
        {
            id: 38,
            value: "100"     //新手场进入的最大炮倍
        },
        {
            id: 41,
            value: "30"
        },
        {
            id: 42,
            value: "30"
        },
        {
            id: 43,
            value: "1"
        },
        {
            id: 46,
            value: "0_5"
        },
        {
            id: 47,
            value: "1_3"
        },
        {
            id: 48,
            value: "11_13"
        },
        {
            id: 49,
            value: "12"
        },
        {
            id: 50,
            value: "1_7"
        },
        {
            id: 51,
            value: "20000"  //默认的枪皮肤id
        },
        {
            id: 52,
            value: "30"
        },
        {
            id: 53,
            value: "10001_80000,10002_100,20001_1_0_2592000"
        },
        {
            id: 54,
            value: "600_800_800"
        },
        {
            id: 55,
            value: "5"
        },
        {
            id: 56,
            value: "10002_30"
        },
        {
            id: 57,
            value: "30002_20,10001_2000,10002_10,40001_5"
        },
        {
            id: 58,
            value: "10"
        },
        {
            id: 59,
            value: "10001_1,30002_2,10001_8000,10002_20,40001_5,10001_4000,10002_10,50001_1,10001_800,10002_5"
        },
        {
            id: 60,
            value: "36_14_14"
        },
        {
            id: 61,
            value: "1_0_1"
        },
        {
            id: 62,
            value: "10002_100"
        },
        {
            id: 63,
            value: "2000_1500_600"
        },
        {
            id: 64,
            value: "1500_1000_500,1000_500"
        },
        {
            id: 65,
            value: "600_10,400_11,200_12"
        },
        {
            id: 66,
            value: "5001_5002_5003,5003_5004_5005,5006_5007_5008,5009_5001"
        },
        {
            id: 67,
            value: "240"
        },
        {
            id: 68,
            value: "1,2,3,4-10,11-20,21-50,51-100,101-200"
        },
        {
            id: 69,
            value: "100_200_300,100_200"
        },
        {
            id: 70,
            value: "50001_5"
        },
        {
            id: 71,
            value: "10002_20"
        },
        {
            id: 72,
            value: "4"
        },
        {
            id: 73,
            value: "2"
        },
        {
            id: 74,
            value: "2400,3200"
        },
        {
            id: 75,
            value: "5001_5002_5003,5003_5004_5005,5006_5007_5008,5009_5001"
        },
        {
            id: 76,
            value: "40006_2,40007_2"
        },
        {
            id: 77,
            value: "11"
        },
        {
            id: 78,
            value: "14"
        },
        {
            id: 79,
            value: "3"
        },
        {
            id: 80,
            value: "10001_20000"
        },
        {
            id: 81,
            value: "10001_20000"
        },
        {
            id: 82,
            value: "10000"
        },
        {
            id: 83,
            value: "3"
        },
        {
            id: 84,
            value: "10002_10"
        },
        {
            id: 85,
            value: "0"
        },
        {
            id: 86,
            value: "5"
        },
        {
            id: 87,   // 锁定时间
            value: "20"
        },
        {
            id: 88,  // 冰冻时间
            value: "8"
        },
        {
            id: 89,
            value: "2"
        },
        {
            id: 90,
            value: "30"
        },
        {
            id: 91,
            value: "10001_10000,10002_30"
        },
        {
            id: 92,
            value: "10002_10"
        },
        {
            id: 93,
            value: "3"
        },
        {
            id: 94,
            value: "0_e7788f671b0da28db2b990dc106da7f8,1_e7788f671b0da28db2b990dc106da7f8,2_e7788f671b0da28db2b990dc106da7f8,3_e7788f671b0da28db2b990dc106da7f8,4_e7788f671b0da28db2b990dc106da7f8,5_e7788f671b0da28db2b990dc106da7f8,6_e7788f671b0da28db2b990dc106da7f8,7_6faf10edfa4e80a4c375b804ab707cd5,100_f6a3a5c3aa0cf36736a432667c2f3391,200_59063d36aff28136183067b5017282be,201_03cc8aa636cda40c799c99319010f6a8,202_54111b02bb499765cee5cbcb29815e32,203_4b3a7efb215d59ff48a03273fe4551c8,204_65fff178fa6641b73f2237ba17c827d4,205_146e046e61ae4aacbd3a669ea3162ef6,206_83c05b5e0f9179dd835f407301c8aa37,207_a3d335381af6b5a121c44188fd426bcc,208_07878aaefea866b64df1e2179878e5fb,209_c025911bc29270ba1ba1f8acd328149d"
        },
        {
            id: 95,
            value: "28_1|1|1,32_2|2|2&3|3|3,39_4|4|4&5|5|5&6|6|6,40_1|1|2&1|1|3,41_2|2|3&2|2|4,44_3|3|4&3|3|5"
        }]