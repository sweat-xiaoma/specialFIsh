
/**
 * 设备工具类
 */
class DeviceUtil{

    /** 判断是否oppo或者vivo */
    public static isOppoOrVivo():boolean{
        var ua = navigator.userAgent;  
        if (ua.indexOf("OPPO")>0 || ua.indexOf("vivo")>0){
            return true;
        }

        return false;
    }
}