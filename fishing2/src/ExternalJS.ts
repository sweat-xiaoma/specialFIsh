
/** 
 * 和外界js交互
 * 
 * */

/** 
 * 和外界js交互
 * 
 * */
module CommonLib {
    export class ExternalJS{
        // 注册回调事件 使用前先注册
        public static registerCallback(){
            window.addEventListener("message", ExternalJS.jsCallback, false);
        }

        /** 充值  0没提示(默认) 1有提示*/
        public static jumpRecharge(i=0){
            ExternalJS.postGameMessage({name: "jumpRecharge", args: {"isShowTip":i}});
        }

        /** 兑换 0没提示(默认) 1有提示*/
        public static jumpExchange(i=0){
            ExternalJS.postGameMessage({name: "jumpExchange", args: {"isShowTip":i}});
        }

        /** 是否native  0 不是 1是*/
        public static isNative(){
            ExternalJS.postGameMessage({name: "isNative"});
        }

        /** 改变屏幕方向 0竖着(默认) 1横着 */
        public static jumpOrientation(orientation=0){
            ExternalJS.postGameMessage({name: "jumpOrientation", args: {"orientation":orientation}});
        }

        /** 签到 */
        public static jumpSign(){
            ExternalJS.postGameMessage({name: "jumpSign"});
        }

        /** 关闭游戏 */
        public static jumpClose(){
            ExternalJS.postGameMessage({name: "jumpClose"});
        }

        /** 跳转登录 */
        public static jumpLogin(){
            ExternalJS.postGameMessage({name: "jumpLogin"});
        }

        /** 跳转分享 */
        public static jumpShare(){
            ExternalJS.postGameMessage({name: "jumpShare"});
        }

        /** 跳转实物兑换 */
        public static jumpEntityExchange(){
            ExternalJS.postGameMessage({name: "jumpEntityExchange"});
        }

        /** 排行榜 */
        public static jumpRank(){
            ExternalJS.postGameMessage({name: "jumpRank"});
        }

        // 通过postmessage的方式发送消息 解决跨域问题
        private static postGameMessage(data) {
            if (window.top.postMessage) {
                window.top.postMessage(data, "*");
            }
        }

        // js回调事件
        private static jsCallback(event){
            if (!event || !event.data) return;
            switch (event.data.name) {
                case "updateGold": {
                    //更新金币 {name: "updateGold", args: {"gold":999}}
                    CommonLib.ExternalJS.updateGold(event.data.args.gold);
                    break;
                }
                case "updateDWBean": {
                    //更新大王豆 {name: "updateDWBean", args: {"bean":999}}
                    CommonLib.ExternalJS.updateDWBean(event.data.args.bean);
                    break;
                }
                case "modifyNickname": {
                    //更新昵称 {name: "modifyNickname", args: {"nickname":"123"}}
                    // GameData.getUserData().setNickname(event.data.args.nickname);
                    break;
                }
                case "isNativeResult": {
                    //是否走原生 {name: "isNativeResult", args: {"isNativeResult":true}}
                    // Const.IS_NATIVE = event.data.args.isNativeResult;
                    break;
                }
                default: {
                }
            }    
        }
  
        
        /**更新大王豆回调 */
        public static  updateDWBean(beanNum) {
            var userModel:UserModel = Director.getModelByKey(UserModel);
            if (!userModel) return;
            userModel.setCoins(beanNum);
            _Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
            _Notification_.send(NotifyEnum.UPDATE_ROOM_UI_COINS, {userId: userModel.getUserId()});
            // _Notification_.send(NotifyEnum.BANKRUPT_MESSAGE, {
            //         status: BankruptStauts.STATE_RESUME,
            //         userId: userModel.getUserId()
            //     });
            _Notification_.send(NotifyEnum.FISHING_UNLOCK_STATUS, 1);
        }

        /**更新金币回调 */
        public static  updateGold(goldNum){
            var userModel:UserModel = Director.getModelByKey(UserModel);
            if (!userModel) return;
            userModel.setMoney(goldNum);
            _Notification_.send(NotifyEnum.UPDATE_MAIN_DATA);
        }

    }
}