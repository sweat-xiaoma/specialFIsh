class MsgActionDefine {
public static responseList = new Map();

public static Heartbeat = 1001;
public static CommonStatus = 1002;
public static BroadcastMessage = 1003;
public static BroadcastMessageList = 1004;
public static ExchangeGoodsItem = 1005;
public static ExchangeGoodsRes = 1006;
public static ExchangeGoodsReq = 1007;
public static LoopExchangeRecord = 1008;
public static LoopExchangeRecordsRes = 1009;
public static LoopExchangeRecordsReq = 1010;
public static ActiveConfigMessage = 1011;
public static ActiveConfigMessageListRes = 1012;
public static ActiveConfigMessagesReq = 1013;
public static LoginReq = 1014;
public static LoginRes = 1015;
public static TaskInfo = 1016;
public static MonthSignActiveInfo = 1017;
public static LockRelation = 1018;
public static ItemInfo = 1019;
public static PlayerInfo = 1020;
public static RoomInfoReq = 1021;
public static RoomInfoRes = 1022;
public static IntoRoomReq = 1023;
public static IntoRoomRes = 1024;
public static RoomInfo = 1025;
public static GetReliefMoneyReq = 1026;
public static DailySignReq = 1027;
public static GetMonthAwardReq = 1028;
public static BuyMonthCardReq = 1029;
public static RoomServerInfo = 1030;
public static ManualChooseRoomReq = 1031;
public static ManualChooseRoomRes = 1032;
public static VipLevelUp = 1033;
public static LevelUp = 1034;
public static FishingGunReq = 1035;
public static FishingGunRes = 1036;
public static FishingHitReq = 1037;
public static FishingHit = 1038;
public static RandomFishHitRes = 1039;
public static GetItem = 1040;
public static PondFishes = 1041;
public static AddFish = 1042;
public static Coordinate = 1043;
public static PondState = 1044;
public static GunFishPosInfoMessage = 1045;
public static FishPosInfo = 1046;
public static UseItemReq = 1047;
public static UseItemRes = 1048;
public static ChangeGunReq = 1049;
public static ChangeGunRes = 1050;
public static UseWarheadReq = 1051;
public static UseWarheadRes = 1052;
public static UseLockItem = 1053;
public static LockItemEnd = 1054;
public static QuitRoom = 1055;
public static MajorParameterChange = 1056;
public static UserBalanceRes = 1057;
public static Bankrupt = 1058;
public static ShopBuyReq = 1059;
public static ShopBuyRes = 1060;
public static FindUserReq = 1061;
public static FindUserRes = 1062;
public static GiveItemReq = 1063;
public static GiveItemRes = 1064;
public static SellItemReq = 1065;
public static SellItemRes = 1066;
public static ItemProto = 1067;
public static UpgradeOrForgeReq = 1068;
public static UpgradeOrForgeRes = 1069;
public static RankDataMessage = 1070;
public static GetRankDataReq = 1071;
public static GetRankDataRes = 1072;
public static WorldBossInfo = 1073;
public static DrawLotteryReq = 1074;
public static DrawLotteryRes = 1075;
public static LotteryConditonAccumulate = 1076;
public static FishingHitRes = 1077;
public static FishingUnlockStatus = 1078;
public static EmailInfo = 1079;
public static EmailListReq = 1080;
public static EmailListRes = 1081;
public static EmailOperationReq = 1082;
public static EmailOperationRes = 1083;
public static NoticeInfo = 1084;
public static NoticeListReq = 1085;
public static NoticeListRes = 1086;
public static RankInfo = 1087;
public static RankReq = 1088;
public static RankRes = 1089;

public static init() {
this.responseList.put(this.Heartbeat, Heartbeat);
this.responseList.put(this.CommonStatus, CommonStatus);
this.responseList.put(this.BroadcastMessage, BroadcastMessage);
this.responseList.put(this.BroadcastMessageList, BroadcastMessageList);
this.responseList.put(this.ExchangeGoodsItem, ExchangeGoodsItem);
this.responseList.put(this.ExchangeGoodsRes, ExchangeGoodsRes);
this.responseList.put(this.ExchangeGoodsReq, ExchangeGoodsReq);
this.responseList.put(this.LoopExchangeRecord, LoopExchangeRecord);
this.responseList.put(this.LoopExchangeRecordsRes, LoopExchangeRecordsRes);
this.responseList.put(this.LoopExchangeRecordsReq, LoopExchangeRecordsReq);
this.responseList.put(this.ActiveConfigMessage, ActiveConfigMessage);
this.responseList.put(this.ActiveConfigMessageListRes, ActiveConfigMessageListRes);
this.responseList.put(this.ActiveConfigMessagesReq, ActiveConfigMessagesReq);
this.responseList.put(this.LoginReq, LoginReq);
this.responseList.put(this.LoginRes, LoginRes);
this.responseList.put(this.TaskInfo, TaskInfo);
this.responseList.put(this.MonthSignActiveInfo, MonthSignActiveInfo);
this.responseList.put(this.LockRelation, LockRelation);
this.responseList.put(this.ItemInfo, ItemInfo);
this.responseList.put(this.PlayerInfo, PlayerInfo);
this.responseList.put(this.RoomInfoReq, RoomInfoReq);
this.responseList.put(this.RoomInfoRes, RoomInfoRes);
this.responseList.put(this.IntoRoomReq, IntoRoomReq);
this.responseList.put(this.IntoRoomRes, IntoRoomRes);
this.responseList.put(this.RoomInfo, RoomInfo);
this.responseList.put(this.GetReliefMoneyReq, GetReliefMoneyReq);
this.responseList.put(this.DailySignReq, DailySignReq);
this.responseList.put(this.GetMonthAwardReq, GetMonthAwardReq);
this.responseList.put(this.BuyMonthCardReq, BuyMonthCardReq);
this.responseList.put(this.RoomServerInfo, RoomServerInfo);
this.responseList.put(this.ManualChooseRoomReq, ManualChooseRoomReq);
this.responseList.put(this.ManualChooseRoomRes, ManualChooseRoomRes);
this.responseList.put(this.VipLevelUp, VipLevelUp);
this.responseList.put(this.LevelUp, LevelUp);
this.responseList.put(this.FishingGunReq, FishingGunReq);
this.responseList.put(this.FishingGunRes, FishingGunRes);
this.responseList.put(this.FishingHitReq, FishingHitReq);
this.responseList.put(this.FishingHit, FishingHit);
this.responseList.put(this.RandomFishHitRes, RandomFishHitRes);
this.responseList.put(this.GetItem, GetItem);
this.responseList.put(this.PondFishes, PondFishes);
this.responseList.put(this.AddFish, AddFish);
this.responseList.put(this.Coordinate, Coordinate);
this.responseList.put(this.PondState, PondState);
this.responseList.put(this.GunFishPosInfoMessage, GunFishPosInfoMessage);
this.responseList.put(this.FishPosInfo, FishPosInfo);
this.responseList.put(this.UseItemReq, UseItemReq);
this.responseList.put(this.UseItemRes, UseItemRes);
this.responseList.put(this.ChangeGunReq, ChangeGunReq);
this.responseList.put(this.ChangeGunRes, ChangeGunRes);
this.responseList.put(this.UseWarheadReq, UseWarheadReq);
this.responseList.put(this.UseWarheadRes, UseWarheadRes);
this.responseList.put(this.UseLockItem, UseLockItem);
this.responseList.put(this.LockItemEnd, LockItemEnd);
this.responseList.put(this.QuitRoom, QuitRoom);
this.responseList.put(this.MajorParameterChange, MajorParameterChange);
this.responseList.put(this.UserBalanceRes, UserBalanceRes);
this.responseList.put(this.Bankrupt, Bankrupt);
this.responseList.put(this.ShopBuyReq, ShopBuyReq);
this.responseList.put(this.ShopBuyRes, ShopBuyRes);
this.responseList.put(this.FindUserReq, FindUserReq);
this.responseList.put(this.FindUserRes, FindUserRes);
this.responseList.put(this.GiveItemReq, GiveItemReq);
this.responseList.put(this.GiveItemRes, GiveItemRes);
this.responseList.put(this.SellItemReq, SellItemReq);
this.responseList.put(this.SellItemRes, SellItemRes);
this.responseList.put(this.ItemProto, ItemProto);
this.responseList.put(this.UpgradeOrForgeReq, UpgradeOrForgeReq);
this.responseList.put(this.UpgradeOrForgeRes, UpgradeOrForgeRes);
this.responseList.put(this.RankDataMessage, RankDataMessage);
this.responseList.put(this.GetRankDataReq, GetRankDataReq);
this.responseList.put(this.GetRankDataRes, GetRankDataRes);
this.responseList.put(this.WorldBossInfo, WorldBossInfo);
this.responseList.put(this.DrawLotteryReq, DrawLotteryReq);
this.responseList.put(this.DrawLotteryRes, DrawLotteryRes);
this.responseList.put(this.LotteryConditonAccumulate, LotteryConditonAccumulate);
this.responseList.put(this.FishingHitRes, FishingHitRes);
this.responseList.put(this.FishingUnlockStatus, FishingUnlockStatus);
this.responseList.put(this.EmailInfo, EmailInfo);
this.responseList.put(this.EmailListReq, EmailListReq);
this.responseList.put(this.EmailListRes, EmailListRes);
this.responseList.put(this.EmailOperationReq, EmailOperationReq);
this.responseList.put(this.EmailOperationRes, EmailOperationRes);
this.responseList.put(this.NoticeInfo, NoticeInfo);
this.responseList.put(this.NoticeListReq, NoticeListReq);
this.responseList.put(this.NoticeListRes, NoticeListRes);
this.responseList.put(this.RankInfo, RankInfo);
this.responseList.put(this.RankReq, RankReq);
this.responseList.put(this.RankRes, RankRes);

}}