class SoundManager {
	public constructor() {
	}

	public static _backgroundMusicState;
	public static _soundEffectState;
	public static _volumeValue;
	public static fishSoundLoadEnd;
	public static effectSoundLoadEnd;
	public static uiSoundLoadEnd;
	public static _musicChannel;
	public static _musicName;


	public static init() {
		SoundManager._backgroundMusicState = !0,
		SoundManager._soundEffectState = !0,
		SoundManager._volumeValue = 1,
		SoundManager.fishSoundLoadEnd = !1,
		SoundManager.effectSoundLoadEnd = !1,
		SoundManager.uiSoundLoadEnd = !1
	}
	public static loadUISound() {}
	public static loadFishSound() {}
	
	public static playSound(e, t = 1, i = 1) {
		var n = RES.getRes(e);
		if (n) {
			var a = n.play(0, t);
			a.volume = i
		}
	}
	public static playSoundEffect(e, i=1) {
		SoundManager._soundEffectState && SoundManager.playSound(e, i, SoundManager._volumeValue)
	}
	public static playBackgroundMusic(e) {
		if (SoundManager._backgroundMusicState) {
			SoundManager._musicChannel && SoundManager._musicChannel.stop(),
			SoundManager._musicName = e;
			var i = RES.getRes(e);
			i && (SoundManager._musicChannel = i.play(0, -1), SoundManager._musicChannel.volume = SoundManager._volumeValue)
		}
	}
	public static setBackgroundMusicState(i, n = !0) {
		if (SoundManager._backgroundMusicState = i, i) {
			var a = RES.getRes(SoundManager._musicName);
			a && (SoundManager._musicChannel = a.play(0, -1), SoundManager._musicChannel.volume = SoundManager._volumeValue, n && GameUtil.popTips(Language.getText(62)))
		} else this._musicChannel && this._musicChannel.stop(),
		n && GameUtil.popTips(Language.getText(63))
	}
	public static setSoundEffectState(i, n = !0) {
		i ? n && GameUtil.popTips(Language.getText(60)) : n && GameUtil.popTips(Language.getText(61)),
		SoundManager._soundEffectState = i
	}
	public static setVolume(e) {
		SoundManager._volumeValue = e,
		SoundManager._musicChannel.volume = e
	}
	public static getBackgroundMusicState() {
		return SoundManager._backgroundMusicState
	}
	public static getSoundEffectState() {
		return SoundManager._soundEffectState
	}
	public static resetBackgroundMusicState(e) {
		SoundManager._backgroundMusicState = e
	}
	public static resetSoundEffectState(e) {
		SoundManager._soundEffectState = e
	}
	public static playFishDeathSound(i) {
		var n = T_Fish_Table.getVoByKey(i);
		"null" != n.sound && SoundManager.fishSoundLoadEnd && SoundManager.playSoundEffect(n.sound + "_mp3")
	}
	public static playEffectSound(e) {
		"null" != e && SoundManager.effectSoundLoadEnd && SoundManager.playSoundEffect(e + "_mp3")
	}
	public static playUISound(e) {
		"null" != e && SoundManager.uiSoundLoadEnd && SoundManager.playSoundEffect(e + "_mp3")
	}
}