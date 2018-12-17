declare var config;
declare var version;

module CommonLib {
    /**
     * 从页面上获取配置数据 var config
     */
    export  function setServerConfigData() {

        if (!config) return;

        CONFIG.HTTPS_HALL_HOST = config["game_api_domain"]["HTTPS_HALL_HOST"];
        if (DEBUG) {
            CONFIG.RES_PATH_PREFIX = "/";
        } else {
            CONFIG.RES_PATH_PREFIX = config["game_api_domain"]["HTTPS_GAMERES_HOST"] + "/fishing/";
        }
        CONFIG.HERDICON_ADDR = config["game_api_domain"]["HTTPS_HEADER_HOST"]+"/";
        CONFIG.IDENDTITY = config["params"]["identity"];
        CONFIG.liveRoomId = config["params"]["game_room_id"];
        if (isNaN(parseInt(config["params"]["platform"])))
            CONFIG.PLATFORM_ID = 0;
        else
            CONFIG.PLATFORM_ID = parseInt(config["params"]["platform"]);
        // CONFIG.client_version = config["client_version"];
        CONFIG.CHANNEL_ID = config["params"]["channel_id"];
        // CONFIG.refer_type = config["refer_type"];
        CONFIG.SERVER_IP = config["game_socket_domain"]["WSS_FISHHALL_HOST"];
        CONFIG.WSS_CHAT_HOST = config["game_socket_domain"]["WSS_CHAT_HOST"];
        if (isNaN(parseInt(config["params"]["user_id"])))
            CONFIG.USER_ID = 0;
        else
            CONFIG.USER_ID = parseInt(config["params"]["user_id"]);
        CONFIG.ACCOUNT = config["params"]["account"];
        CONFIG.msgToken = config["params"]["msg_token"];

        // 赋值版本号
        if (typeof(version) != "undefined"){
            CONFIG.VERSION = version;
        }
    }
}