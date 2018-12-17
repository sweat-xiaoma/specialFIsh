class ScrollEvent extends egret.Event {

	public static CLICK = "click_scroll_item";
    public static SCROLL_END = "view_scroll_end";

	public constructor(type: string, bubbles: boolean = !1, cancelable: boolean = !1) {
		super(type, bubbles, cancelable);
	}
}