// 捕鱼任务  没用到
class T_FishTaskItem{
    public id = 0;
    public type = 0;
    public award = "";
    public logicType = 0;
    public parameter1 = 0;
    public parameter2 = 0;
    public finishId = 0;
    public describe = 0;
    public descModify = 0;
}

class T_FishTaskItem_Table{
    public static getVoByKey = function(t) {
        var i = FishTaskItem_Table.length,
        a = SerchUtil.binary_search(FishTaskItem_Table, "id", 0, i, t);
        return <T_FishTaskItem>a
    }
    public static getAllVo = function() {
        return FishTaskItem_Table
    }
}

 var FishTaskItem_Table = [{
    id: 1001,
    type: 1,
    award: "30002_2",
    logicType: 3,
    parameter1: 0,
    parameter2: 8,
    finishId: 1002,
    describe: 2332,
    descModify: 2360
},
{
    id: 1002,
    type: 1,
    award: "10002_5",
    logicType: 3,
    parameter1: 0,
    parameter2: 15,
    finishId: 1003,
    describe: 2333,
    descModify: 2361
},
{
    id: 1003,
    type: 1,
    award: "40001_2",
    logicType: 3,
    parameter1: 2,
    parameter2: 1,
    finishId: 1004,
    describe: 2334,
    descModify: 2362
},
{
    id: 1004,
    type: 1,
    award: "10001_1000",
    logicType: 7,
    parameter1: 40001,
    parameter2: 1,
    finishId: 1005,
    describe: 2335,
    descModify: 2363
},
{
    id: 1005,
    type: 1,
    award: "40002_1",
    logicType: 3,
    parameter1: 0,
    parameter2: 20,
    finishId: 1006,
    describe: 2336,
    descModify: 2364
},
{
    id: 1006,
    type: 1,
    award: "10002_5",
    logicType: 7,
    parameter1: 40002,
    parameter2: 1,
    finishId: 1007,
    describe: 2337,
    descModify: 2365
},
{
    id: 1007,
    type: 1,
    award: "30002_2",
    logicType: 3,
    parameter1: 2,
    parameter2: 2,
    finishId: 1008,
    describe: 2338,
    descModify: 2366
},
{
    id: 1008,
    type: 1,
    award: "10001_1000",
    logicType: 7,
    parameter1: 40003,
    parameter2: 1,
    finishId: 1009,
    describe: 2339,
    descModify: 2367
},
{
    id: 1009,
    type: 1,
    award: "10002_10",
    logicType: 3,
    parameter1: 0,
    parameter2: 30,
    finishId: 1010,
    describe: 2340,
    descModify: 2368
},
{
    id: 1010,
    type: 1,
    award: "10001_1000",
    logicType: 3,
    parameter1: 2,
    parameter2: 3,
    finishId: 1011,
    describe: 2341,
    descModify: 2369
},
{
    id: 1011,
    type: 1,
    award: "10002_10",
    logicType: 3,
    parameter1: 0,
    parameter2: 50,
    finishId: 0,
    describe: 2342,
    descModify: 2370
},
{
    id: 2001,
    type: 2,
    award: "10002_5,10010_10",
    logicType: 5,
    parameter1: 1,
    parameter2: 1,
    finishId: 0,
    describe: 2343,
    descModify: 2371
},
{
    id: 2002,
    type: 2,
    award: "10001_1500,10010_20",
    logicType: 1,
    parameter1: 10001,
    parameter2: 1e4,
    finishId: 0,
    describe: 2344,
    descModify: 2372
},
{
    id: 2003,
    type: 2,
    award: "10001_3000,10010_20",
    logicType: 5,
    parameter1: 4,
    parameter2: 1,
    finishId: 0,
    describe: 2345,
    descModify: 2373
},
{
    id: 2004,
    type: 2,
    award: "10002_20,10010_20",
    logicType: 5,
    parameter1: 3,
    parameter2: 1,
    finishId: 0,
    describe: 2346,
    descModify: 2374
},
{
    id: 2005,
    type: 2,
    award: "10002_5,10010_20",
    logicType: 5,
    parameter1: 2,
    parameter2: 1,
    finishId: 0,
    describe: 2347,
    descModify: 2375
},
{
    id: 2006,
    type: 2,
    award: "10001_1800,10010_20",
    logicType: 2,
    parameter1: 24,
    parameter2: 5,
    finishId: 0,
    describe: 2348,
    descModify: 2376
},
{
    id: 2007,
    type: 2,
    award: "10001_1800,10010_20",
    logicType: 3,
    parameter1: 0,
    parameter2: 100,
    finishId: 0,
    describe: 2349,
    descModify: 2377
},
{
    id: 2008,
    type: 2,
    award: "10001_10000,10010_20",
    logicType: 5,
    parameter1: 6,
    parameter2: 1,
    finishId: 0,
    describe: 2451,
    descModify: 2452
},
{
    id: 3001,
    type: 3,
    award: "10001_15000,10011_15",
    logicType: 2,
    parameter1: 22,
    parameter2: 30,
    finishId: 0,
    describe: 2350,
    descModify: 2378
},
{
    id: 3002,
    type: 3,
    award: "10001_20000,10011_10",
    logicType: 1,
    parameter1: 10001,
    parameter2: 2e6,
    finishId: 0,
    describe: 2351,
    descModify: 2379
},
{
    id: 3003,
    type: 3,
    award: "10001_15000,10011_20",
    logicType: 3,
    parameter1: 0,
    parameter2: 1e3,
    finishId: 0,
    describe: 2352,
    descModify: 2380
},
{
    id: 3004,
    type: 3,
    award: "10002_20,10011_20",
    logicType: 5,
    parameter1: 1,
    parameter2: 5,
    finishId: 0,
    describe: 2353,
    descModify: 2381
},
{
    id: 3005,
    type: 3,
    award: "10001_10000,10011_20",
    logicType: 6,
    parameter1: 4,
    parameter2: 5,
    finishId: 0,
    describe: 2354,
    descModify: 2382
},
{
    id: 3006,
    type: 3,
    award: "10002_80,10011_30",
    logicType: 6,
    parameter1: 3,
    parameter2: 5,
    finishId: 0,
    describe: 2355,
    descModify: 2383
},
{
    id: 3007,
    type: 3,
    award: "10002_20,10011_20",
    logicType: 6,
    parameter1: 2,
    parameter2: 5,
    finishId: 0,
    describe: 2356,
    descModify: 2384
},
{
    id: 3008,
    type: 3,
    award: "10001_50000,10011_20",
    logicType: 5,
    parameter1: 6,
    parameter2: 5,
    finishId: 0,
    describe: 2453,
    descModify: 2454
},
{
    id: 5001,
    type: 5,
    award: "0",
    logicType: 2,
    parameter1: 36,
    parameter2: 2,
    finishId: 0,
    describe: 2357,
    descModify: 2385
},
{
    id: 5002,
    type: 5,
    award: "0",
    logicType: 2,
    parameter1: 37,
    parameter2: 2,
    finishId: 0,
    describe: 2357,
    descModify: 2385
},
{
    id: 5003,
    type: 5,
    award: "0",
    logicType: 2,
    parameter1: 38,
    parameter2: 2,
    finishId: 0,
    describe: 2357,
    descModify: 2385
},
{
    id: 5004,
    type: 5,
    award: "0",
    logicType: 2,
    parameter1: 39,
    parameter2: 2,
    finishId: 0,
    describe: 2357,
    descModify: 2385
},
{
    id: 5005,
    type: 5,
    award: "0",
    logicType: 2,
    parameter1: 40,
    parameter2: 2,
    finishId: 0,
    describe: 2357,
    descModify: 2385
},
{
    id: 5006,
    type: 5,
    award: "0",
    logicType: 2,
    parameter1: 41,
    parameter2: 2,
    finishId: 0,
    describe: 2357,
    descModify: 2385
},
{
    id: 5007,
    type: 5,
    award: "0",
    logicType: 2,
    parameter1: 42,
    parameter2: 2,
    finishId: 0,
    describe: 2357,
    descModify: 2385
},
{
    id: 5008,
    type: 5,
    award: "0",
    logicType: 2,
    parameter1: 43,
    parameter2: 2,
    finishId: 0,
    describe: 2357,
    descModify: 2385
},
{
    id: 5009,
    type: 5,
    award: "0",
    logicType: 2,
    parameter1: 44,
    parameter2: 2,
    finishId: 0,
    describe: 2357,
    descModify: 2385
},
{
    id: 8001,
    type: 8,
    award: "10001_3000",
    logicType: 1,
    parameter1: 10010,
    parameter2: 30,
    finishId: 0,
    describe: 2358,
    descModify: 2386
},
{
    id: 8002,
    type: 8,
    award: "40001_5",
    logicType: 1,
    parameter1: 10010,
    parameter2: 60,
    finishId: 0,
    describe: 2358,
    descModify: 2386
},
{
    id: 8003,
    type: 8,
    award: "40002_8",
    logicType: 1,
    parameter1: 10010,
    parameter2: 90,
    finishId: 0,
    describe: 2358,
    descModify: 2386
},
{
    id: 8004,
    type: 8,
    award: "10001_8000",
    logicType: 1,
    parameter1: 10010,
    parameter2: 120,
    finishId: 0,
    describe: 2358,
    descModify: 2386
},
{
    id: 9001,
    type: 9,
    award: "10001_10000",
    logicType: 1,
    parameter1: 10011,
    parameter2: 30,
    finishId: 0,
    describe: 2358,
    descModify: 2386
},
{
    id: 9002,
    type: 9,
    award: "10002_100",
    logicType: 1,
    parameter1: 10011,
    parameter2: 60,
    finishId: 0,
    describe: 2358,
    descModify: 2386
},
{
    id: 9003,
    type: 9,
    award: "10001_20000",
    logicType: 1,
    parameter1: 10011,
    parameter2: 90,
    finishId: 0,
    describe: 2358,
    descModify: 2386
},
{
    id: 9004,
    type: 9,
    award: "50002_1",
    logicType: 1,
    parameter1: 10011,
    parameter2: 120,
    finishId: 0,
    describe: 2358,
    descModify: 2386
},
{
    id: 10001,
    type: 10,
    award: "0",
    logicType: 2,
    parameter1: 36,
    parameter2: 2,
    finishId: 0,
    describe: 2359,
    descModify: 2387
},
{
    id: 10002,
    type: 10,
    award: "0",
    logicType: 2,
    parameter1: 37,
    parameter2: 2,
    finishId: 0,
    describe: 2359,
    descModify: 2387
},
{
    id: 10003,
    type: 10,
    award: "0",
    logicType: 2,
    parameter1: 38,
    parameter2: 2,
    finishId: 0,
    describe: 2359,
    descModify: 2387
},
{
    id: 10004,
    type: 10,
    award: "0",
    logicType: 2,
    parameter1: 39,
    parameter2: 2,
    finishId: 0,
    describe: 2359,
    descModify: 2387
},
{
    id: 10005,
    type: 10,
    award: "0",
    logicType: 2,
    parameter1: 40,
    parameter2: 2,
    finishId: 0,
    describe: 2359,
    descModify: 2387
},
{
    id: 10006,
    type: 10,
    award: "0",
    logicType: 2,
    parameter1: 41,
    parameter2: 2,
    finishId: 0,
    describe: 2359,
    descModify: 2387
},
{
    id: 10007,
    type: 10,
    award: "0",
    logicType: 2,
    parameter1: 42,
    parameter2: 2,
    finishId: 0,
    describe: 2359,
    descModify: 2387
},
{
    id: 10008,
    type: 10,
    award: "0",
    logicType: 2,
    parameter1: 43,
    parameter2: 2,
    finishId: 0,
    describe: 2359,
    descModify: 2387
},
{
    id: 10009,
    type: 10,
    award: "0",
    logicType: 2,
    parameter1: 44,
    parameter2: 2,
    finishId: 0,
    describe: 2359,
    descModify: 2387
}]