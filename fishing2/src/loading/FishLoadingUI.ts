
/**
 * 加载动画
 */
class FishLoadingUI extends eui.Component {

	public _movie:eui.Component;
	public progressBar:eui.ProgressBar;
	public tipText:eui.Label;

	public constructor() {
		super();

		this._movie = new eui.Component;
		// TODO：先用固定值
		this._movie.x = 180;
		this._movie.y = 450;
		 // 加载loading动画
        GlobalManager.isFirstOpenGame ? GlobalManager.isFirstOpenGame = false : EXML.load(CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/anim/LoadingFishAnim.exml",
        function(skinCls) {
            this._movie.skinName = skinCls;
            this.addChildAt(this._movie, 1);
			this._movie.play.play(0);
			this._movie.play.addEventListener("complete", function(){this._movie.play.play(0)}, this);
        },
        this);
	}


	public changeFishAnimPos(percent){
		var progressBarWidth = this.progressBar.width;
        this._movie.x = 180 + progressBarWidth * percent;
	}
}