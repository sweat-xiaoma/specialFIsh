class MsgEvent extends egret.Event {

	public static RCV_DATA:string = "rcv_data";
	public static RCV_RESULT:string = "rcv_result";

	public constructor(type:string, data:Object) {
		super(type, false, false, data);
	}
}
