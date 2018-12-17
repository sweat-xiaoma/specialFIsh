
// 所有ENUM临时放到这里
enum CommonEnum {
    LOGIN_FAIL = 0,
    RECONNECT = 1,
    SERVER_EXCEPTION = 2,
    SERVER_CLOSED = 3,
    RELOGIN = 4,
    REPLACED = 5,
    ACCOUNT_BAN = 6,
    DALAY_LOGIN = 7,
    PARAM_ERROR = 5001,
    USER_NOT_EXIST = 5002,
    NEED_RELOAD_GAME = 3001,
    INTO_ROOM_ERROR = 5003,
    GOLD_NOT_ENOUGH = 5103,
    UNKOWN_ERROR = 5107,
    BULLET_NON_EXISTENT = 6001, // TODO 子弹不存在
    FISH_NON_EXISTENT = 6002 // TODO 鱼存在
};

enum ServerState {
    SUCC = 200,
    BAN = -113,
    CLOSED = -101,
};

enum RequesetRoomState {
    SelectRoom = 1,
    AutoLowRoom = 2,
    AutoHighRoom = 3,
    NewbieRoom = 4,
    DjsRoom = 5,
    QmsRoom = 6,
    KssRoom = 7,
    KssRoomChu = 8,
    KssRoomZhong = 9,
    KssRoomJingying = 10,
    Phoenix = 99,
    QuickGame = 0,
    // QuickGame = 2,
    SoltMachine = 11,
    FruitMachine = 12
};

enum CurrencyEnum {

    COINS = 1,
    MONEY = 2
};
enum PropEnum {

    GOLD = 10001,
    GEM = 10002,
    FISH_TICKIT = 30002,
    LOCK = 40001,
    FROZEN = 40002,
    CALABASH = 40003,
    RAGE = 40004,
    CLONE = 40005,
    FREE_RAGE = 40006,
    FREE_CLONE = 40007,
    GOLD_WARHEAD = 60001,
    SILVER_WARHEAD = 60002,
    BRONZE_WARHEAD = 60003,
    NUCLEAR_WARHEAD = 60004,
    ACT_DAY = 10010,
    ACT_WEED = 10011,
    TICKET = 10012
};
enum IconType {

    PROP = 1,
    SKILL = 2,
    EXCHANGE = 3,
    BIG_PROP = 4,
    CHARGE = 5,
    PAO = 6,
    PAOBG = 7,
    PAOSHOW = 8,
    PAO_CLONE = 9,
    CAIPAN = 10,
    VIP_SHOW = 11
};
enum GetLotteryState {

    FISH_NOT_ENOUGH = 0,
    GET_SUCC = 1,
    SCORE_NOT_ENOUGH = 2,
    C_S_INCONFORMITY = 3
};

enum BagItemType {

    BASE = 1,//代币 不在背包显示
    BATTERY = 2,   // 炮 装备
    HAMMER = 3,//限时炮 装备
    PROP_CARD = 4, //技能道具 出售、使用、赠送（出售\赠送暂时不做）
    FISH_TICKET = 5,//兑换券 使用
    WARHEAN = 6,//弹头 出售 使用 赠送
    TEAM_PROP = 7,//金币场参赛卷
    FORGE_PROP = 8,//锻造道具 出售 使用赠送
    BARBETTE = 9   // 实物场参赛卷
};
enum UpdateOrForgeType {

    TYPE_NULL = 0,
    TYPE_SUC = 1,
    TYPE_NOENOUGH = 2,
    TYPE_MAX = 3,
    TYPE_FAIL = 4
};
enum GunUpdateType {

    UNLOCK = 1,
    NO_ESSENCE_FORGE_TYPE = 2,
    USE_ESSENCE_FORGE_TYPE = 3    //锻造使用精华
};
enum BankruptStauts {

    BANKRUPT = 0,
    GET_SUCC = 1,
    NOT_TO_TIME = 2,
    STATE_RESUME = 3,
    GET_LIMIT = 5
};
enum CommonRequest {

    EMAIL = 1,
    RECODE = 2,
    COMMON_REQUEST_WECHAT_SHARE_INFO = 5,
    SHARE = 10
};
enum SendItemState {

    ITEM_NO_ENOUGH = 0,
    SUC = 1,
    USER_BAG_MAX = 2,
    SEND_TIMES_MAX = 3,
    USER_TIMES_MAX = 4,
    CHARGE_NO_ENOUGH = 5
};
enum FishDeadType {

    RotationAndScale = 1,
    SpeedAndScale = 2,
    Speed = 3,
    DeadAtOnce = 4,
    N_1 = 5,
    N_2 = 6,
    Alpha = 7
};
enum UseItemFail {

    USE_ITEM_NO_ITEM_NO_MONEY = 0,
    USE_ITEM_NO_VIP_LEVEL = 2,
    USE_ITEM_LOCK_CONFLICT = 3,
    USE_ITEM_BEFORE_TIDE = 4,
    USE_ITEM_SCORE_TOO_SMALL_USE_TOKEN = 5,
    USE_ITEM_ALIVE_FISHES_TOO_MUCH = 6
};
enum GuideTrriger {

    First = 1,
    GunSend = 2,
    FishDead = 3,
    GunSendTimes = 4,
    Open = 5,
    TaskFinish = 6
};
enum GuideShow {

    Texture = 1,
    Txt = 2,
    Finger = 3,
    Finger_Txt = 4,
    NONE = 5
};
enum GuideOpen {

    GUIDE_OPEN_UNLOCK = 0,
    GUIDE_OPEN_ADDFISH = 1,
    GUIDE_OPEN_FISHDEAD = 2,
    GUIDE_OPEN_OPENLOTTERY = 3,
    GUIDE_OPEN_TRRIGERTASK = 4,
    GUIDE_OPEN_EXCHANGE = 5,
    GUIDE_OPEN_POP_RMB_GAIN = 7
};
enum GuideClose {

    GUIDE_CLOSE_UNLOCK = 10,
    GUIDE_CLOSE_TRRIGER_NEXT = 11,
    GUIDE_CLOSE_LOCK = 12,
    GUIDE_CLOSE_OPENLOTTERY = 13,
    GUIDE_CLOSE_LOTTERY = 14,
    GUIDE_CLOSE_INTOROOM = 15,
    GUIDE_CLOSE_CLOSE_RMB_GAIN = 16,
    GUIDE_CLOSE_CLICK_EXCHAGE = 17,
    GUIDE_CLOSE_EXCHNANGE_END = 18
};
enum TaskType {

    TASK_TYPE_NEWBIE = 1,
    TASK_TYPE_EVERYDAY = 2,
    TASK_TYPE_EVERY_WEEK = 3,
    TASK_TYPE_LIFETIME = 4,
    TASK_TYPE_GRAND_PRIX = 5,
    TASK_TYPE_THE_PEOPLE = 6,
    TASK_TYPE_THE_FAST = 7,
    TASK_TYPE_AVT_DAY = 8,
    TASK_TYPE_AVT_WEEK = 9,
    TASK_TYPE_PRICE = 10
};
enum TaskState {

    TAST_STATE_CANT_RECEIVE = 2,
    TAST_STATE_CAN_RECEIVE = 1,
    TAST_STATE_RECEIVED = 0
};
enum ChargeType {

    Gold = 1,
    Gem = 2,
    Ticket = 3
};
enum GunState {

    UnGain = 0,  // 获取
    UnAct = 1,   // 续费
    Act = 2,     // 装备
    Equip = 3    //已装备
};

enum GunType {
    Normal = 1,  // 普通炮
    High = 2,    // 高级炮
    Scatter = 3, // 散弹
    Light = 4,   // 闪电
    Laser = 5    // 激光
}
enum Exchange_type {

    Ticket = 1,
    Items = 3,
    Goods = 0,
    RedPackage = 4,
    CinemaTicket = 5
};
enum Ciri_State {

    Time_Up = 0,
    Un_Gain = 1,
    Gained = 2,
    Expired = 3
};
enum Sign_State {

    ACTIVE_MONTH_SIGN_STATE_NO_TOKEN_MAKED_UP = -7,
    ACTIVE_MONTH_SIGN_STATE_TYPE_ERROR = -6,
    ACTIVE_MONTH_SIGN_STATE_MAKED_UP_ERROR = -5,
    ACTIVE_MONTH_SIGN_STATE_MAKED_UP_TIMES_ERROR = -4,
    ACTIVE_MONTH_SIGN_STATE_MAKED_UP_BEFORE_SIGN_ERROR = -3,
    ACTIVE_MONTH_SIGN_STATE_MAKED_UP = -2,
    ACTIVE_MONTH_SIGN_STATE_SIGNED = -1,
    ACTIVE_MONTH_SIGN_STATE_FRESH = 0
};
enum Pop_State {

    VIP = 0,
    FIRST_CHARGE = 1,
    MONTH_CARD = 2,
    CIRI = 3,
    CIRCLE = 4
};
enum Exchange_Color {

    White = 1,
    Green = 2,
    Blue = 3,
    Purple = 4,
    Origen = 5,
    Red = 6
};
enum Phoenix_State {

    Coming = 0,
    Ing = 1,
    ToDisappear = 2,
    Dead = 3,
    ShieldDead = 4,
    Paolule = 5
};
enum Especial_Fish {

    Phoenix = 99,
    Shield = 98,
    Guide_Fish = 97
};
enum Active_Type {

    LIMIT_TIME_ACTIVE_TYPE_FISH_SEND = 1,
    LIMIT_TIME_ACTIVE_TYPE_CHARGE_SEND = 2,
    LIMIT_TIME_ACTIVE_TYPE_VIP_SEND = 3,
    LIMIT_TIME_ACTIVE_TYPE_SECRET_SHOP = 4
};
enum Active_State {

    LIMIT_TIME_ACTIVE_STATE_INIT = 0,
    LIMIT_TIME_ACTIVE_STATE_CAN_RECEIVE = 1,
    LIMIT_TIME_ACTIVE_STATE_RECEIVED = 2,
    LIMIT_TIME_ACTIVE_STATE_OVERDUE = 3,
    LIMIT_TIME_ACTIVE_STATE_ACCEPTED = 4
};
enum SignUp_State {

    ARENA_SIGN_UP_TIMES_MORE = -3,
    ARENA_SIGN_UP_TOCKEN_LESS = -2,
    ARENA_SIGN_UP_SIGNED = 0,
    AERNA_SIGN_UP_SUCCESS = 1
};
enum Rule_State {

    DjsRoom = 0,
    KssRoom = 1,
    WorldBoss = 2,
    QmsRoom = 3
};
enum LanguageType {

    Simp_Chinese = 1,
    TW_Chinese = 2,
    English = 3
};
enum ShareType {

    Share_Money = 1,
    Share_Djs = 2,
    Forge_Succ = 3,
    Circle_GoldWar = 4,
    Share_GuangYU = 5,
    NORMAL = 6
};
enum BroadType {

    NewsWorld = 3,
    NewsActive = 1,
    NewsFishing = 2
};
enum ShareSuccType {

    EXCHANGE_SUCC = 1,
    FORGING_SUCC = 2,
    DANTOU_SUCC = 3,
    DAJIANGSAI_SUCC = 3
};

enum NotifyEnum {

    UPDATE_LOGIN_BTN = 0,
    ROOM_UI_INIT_END = 1,
    MAIN_UI_INIT = 2,
    RES_LOAD_OVER = 3,
    GUN_SEND = 4,
    RESET_RATE = 5,
    HIT_FISH = 6,
    USE_PROP_ITEM = 7,
    USE_WARHEAD = 8,
    OPEN_LOTTERY_UI = 9,
    LOCKED_FISH_DISAPPEAR = 10,
    UPDATE_ROOM_UI_COINS = 11,
    UPDATE_ROOM_UI_BULLETS = 12,
    UPDATE_ROOM_UI_MONEY = 13,
    SEND_CLICK_FISH = 14,
    CLICK_MAIN_BTN = 15,
    FRUIT_BTN_CLICK = 16,
    CLICK_MAIN_FUN_ITEM = 17,
    CLICK_EXIT_ROOM = 18,
    OPEN_SELECT_ROOM = 19,
    ROOMLIST_RESOUCE_LOADED = 20,
    OPEN_MAINVIEW_LOADING_AND_INTO_ROOM = 21,
    OPEN_SOLT_MACHINE = 22,
    ON_SOLT_CLICK = 23,
    FRUIT_START_GAME = 24,
    LOCKED_FISH_CHANGE = 25,
    LOTTERY_UI_LOAD_END = 26,
    SET_PROP_NUM = 27,
    CLICK_BAG_ITEM = 28,
    CHECK_UNLOCKGUNUI_LOADED = 29,
    SET_USEENSENCE_FLAG = 30,
    TRIGGER_CONFIRM_OK = 31,
    CHECK_FORGEUI_LOADED = 32,
    BANKRUPT_MESSAGE = 33,
    SHOW_EMAIL_LIST = 34,
    SEND_ITEM_TO_USER = 35,
    USE_ITEM_BY_BAG = 36,
    RECEIVE_MAIL_SEND = 37,
    GIVE_ITEM_DATA = 38,
    REFRESH_EMAIL = 39,
    SET_EXCHANGE_LIST = 40,
    EXCHANGE_ITEM = 41,
    CHECK_GUN_RESET = 42,
    USER_INFO_UI_LOADED = 43,
    EXCHANGE_SURE_LOADED = 44,
    EXCHANGE_RECODE_LOADED = 45,
    SHOW_CHAKAN_PANEL = 46,
    AUTO_GUN_FIRE = 47,
    TASK_UI_LOADED = 48,
    UPDATE_MAIN_DATA = 49,
    TASK_CHANGE_LIST = 50,
    GUIDE_OPEN = 51,
    GUIDE_CLOSE = 52,
    TASK_GUIDE_PANEL_LOADED = 53,
    TASK_GUIDE_CHANGE = 54,
    TASK_GUIDE_LOAD = 55,
    CHECK_MAIN_ALERT = 56,
    SHOP_BUY_ITEM = 57,
    CHANGE_SETTING = 58,
    SHOW_CHARGE_LIST = 59,
    CHANGE_GUN_UI_LOADED = 60,
    BUY_CHARGE_ITEM = 61,
    TASK_ACT_CHANGE = 62,
    OPEN_NOTICE_UI = 63,
    CLICK_NOTICE_ITEM = 64,
    REQ_QQZONE_GIFT = 65,
    CLOSE_QQZONE_GIFT = 66,
    SIGN_UI_LOADED = 67,
    CHECK_POP = 68,
    POP_EXCHANGE = 69,
    POP_UPDATEEXCHANGE = 70,
    SET_RANK_LIST = 71,
    DJS_ITEM_LOADED = 72,
    SIGN_UP_DJS = 73,
    DJS_TASK_CHANGE = 74,
    DJS_RESULT_SEND = 75,
    CLOSE_SIGN_VIEW = 76,
    POP_CHARGE = 77,
    CHANGE_WAIT_PEOPLE = 78,
    POP_CIRI = 79,
    CLOSE_CIRI = 80,
    CHANGE_PHOENIX_UI = 81,
    CHANGE_ACTIVE = 82,
    PRICE_TASK_CHANGE = 83,
    CLEAR_PRICE_TASK = 84,
    SHOW_PRICE_RANK = 85,
    REFRES_ROOM_ONLINE = 86,
    CHECN_VIP_ITEM = 87,
    UPDATE_GORGEOUS_STATE = 88,
    ACTIVE_CONFIG_DATA_LOAEDED = 89,
    PRICE_CHALLENGE_FAIL = 90,
    SEND_TRUMPET_MSG = 91,
    SHARE_GAIN_UI_LOADED = 92,
    CHNAGE_RECEIVE_ID = 93,
    RE_REGIST_CHANGEGUNBACK = 94,
    CHANGE_GUN_RATE = 95,
    FISHING_UNLOCK_STATUS = 96,
    QUICK_GAME = 97,
    SHOW_SELL_VIEW = 98,
    SELL_ITEM = 99,
    EMAIL_OPERATION = 100,
    EMAIL_GET_EMAIL_LIST = 101,
    BAG_CHANGE_ITEM_INFO = 102,//改变背包物品数据
    NOTICE_GET_NOTICE_LIST=103
};

//RoomPosEnum
enum RoomPosEnum {

    GUN_POS_0 = 0,
    GUN_POS_1 = 1,
    GUN_POS_2 = 2,
    GUN_POS_3 = 3
};
enum RoomAvaPosEnum {

    GUN_POS_0_1 = 10,
    GUN_POS_0_2 = 11,
    GUN_POS_0_3 = 12,
    GUN_POS_1_1 = 20,
    GUN_POS_1_2 = 21,
    GUN_POS_1_3 = 22,
    GUN_POS_2_1 = 30,
    GUN_POS_2_2 = 31,
    GUN_POS_2_3 = 32,
    GUN_POS_3_1 = 40,
    GUN_POS_3_2 = 41,
    GUN_POS_3_3 = 42
};
enum AddFishType {

    FISH = 1,
    FISH_GROUP = 2,
    CATCH_WHOLE_FISH = 3
};
enum FishGroupType {

    SIMPLE = 1,
    QUEUE = 3
};
enum GunFireType {

    SIMPLE = 1
};
enum ChangeGunState {
    ////1表示改变炮倍（gunId），2表示改变威力（power），3换皮肤（skinId）5 卸下皮肤
    CHANGE_RATE = 1,
    CHANGE_POWER = 2,
    CHANGE_SKIN = 3,
    AUTO_CHANGE = 4,
    UNLOAD_ZUO = 5
};
enum pondState {

    FROZEN_END = 1,
    WAVE_COMING = 2,
    BOSS_COMING = 3,
    USER_EXCHANGE = 4,
    USER_EXCHANGED = 5
};
enum FishType {

    SIMPLE = 1,
    BOUNS = 2
};
enum ChasisType {

    CATCH_WHOLE_S = 1,
    CATCH_WHOLE_M = 2,
    CATCH_WHOLE_B = 3,
    GROUP_S = 1,
    GROUP_B = 2
};
enum ChasisFish {

    GROUP_FISH = 1,
    CATCH_WHOLE_FISH = 2,
    BOSS_FISH = 3
};
enum OneKillManyType {
    CATCH_WHOLE = 0,
    ELECTRIC = 3,
    BOMB = 4,
    BLACKHOLE = 5
};

// PlatformTypeEnum
enum PlatformTypeEnum {

    COMBUNET = 2,
    ZI_YOU = 9,
    SOUGOU = 10,
    EGRET = 11,
    QQ_ZONE = 12,
    QUN_HEI = 15,
    YI_WAN_TANG = 5
};

enum EmailOperationTypeEnum {
    /**领取、一键领取邮件*/
    EMAIL_GET = 1,
    /**删除\一键删除 邮件 */
    EMAIL_DELETE = 2,
    /**查看邮件 */
    EMAIL_READ = 3


};



class CONFIG {
    public constructor() {
    }

    public static VERSION = "1.0.1";
    public static DEBUG = false;   // 调试模式
    public static IS_NATIVE_SERVER = false;  // 是否本地服务器
    public static IS_WEB = false;
    public static LANGUAGE = LanguageType.Simp_Chinese;
    public static ACCOUNT = "";
    public static LOGIN_ADDR = "";
    public static HERDICON_ADDR = "";
    public static SERVER_USER_STATE = 200;
    // public static USER_NAME = "游客";
    public static USER_ID = 0;
    public static SERVER_IP = CONFIG.IS_NATIVE_SERVER ? "127.0.0.1" : "fishhall.gamedev.dwtv.tv";
    public static SERVER_PORT = 443;
    public static IDENDTITY = "";
    public static OPEN_ID = "";
    public static OPEN_KEY = "";
    public static APP_ID = "";
    public static PLATFORM_ID = 2;//window.FISHING_CONFIG.platformId;
    public static SUB_PLATFORM_ID = "";//window.FISHING_CONFIG.subplatform;
    public static CHANNEL_ID = "";
    public static CHANNEL_EXT_TYPE = "";
    public static RES_PATH_PREFIX = "";
    public static contentWidth = 1280;
    public static contentHeight = 720;
    public static adaptX = 0;
    public static adaptY = 0;
    public static defaultFishFrameRate = 9;
    public static isOpenMusic = !0;
    public static isInMobile = egret.Capabilities.isMobile;
    public static logAppID = "";
    public static openGuide = !1;
    public static BULLET_SPEED = 1.2;
    public static TEST_fishFrameRate = -1;
    public static TEST_FISH_ID = 39;
    public static TEST_PATH_ID = 999999999;
    public static EFFECT_1 = "ef_jinbiDi";
    public static EFFECT_1_SCALE = 1.5;
    public static EFFECT_2 = "ef_jinbiS";
    public static EFFECT_2_SCALE = 1.5;
    public static EFFECT_DELAY = 200;

    public static HAS_LOGIN_VIEW: boolean = false;

    public static liveRoomId;

    public static WSS_CHAT_HOST;
    public static CHAT_PORT;
    public static HTTPS_HALL_HOST;

    public static msgToken = "NoToken";

    public static IS_PRINT_LOG = true;
    public static PROTOCOL = "wss://";

    // public static isInRoom:boolean = false;
    public static isDeactivate: boolean = false;
}