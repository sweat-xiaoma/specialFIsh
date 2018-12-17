class PageEvent extends egret.Event {

	public static SCROLL_END = "view_scroll_end";

	public scrollType;

	public constructor(type: string, bubbles: boolean = !1, cancelable: boolean = !1) {
		super(type, bubbles, cancelable);
	}
}