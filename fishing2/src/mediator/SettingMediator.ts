class SettingMediator extends SimpleMediator {
    public constructor(t) {
        super(t);
    }

    public onAdded() {
        super.onAdded();
        this.getView().initView();
        this.subscrib(NotifyEnum.CHANGE_SETTING, this.changeStateX);
    }
    public init() { }
    public changeStateX(e, t) {
        var i = t.getView();
        // if (e.type == "shake") {
        //     i.changeSoundState(SoundManager.getSoundEffectState());
        // }
        return null == e ? (i.changeMusicState(SoundManager.getBackgroundMusicState()), void i.changeSoundState(SoundManager.getSoundEffectState())) : void ("music" == e.type ? (SoundManager.setBackgroundMusicState(!SoundManager.getBackgroundMusicState()), i.changeMusicState(SoundManager.getBackgroundMusicState())) : "sound" == e.type && (SoundManager.setSoundEffectState(!SoundManager.getSoundEffectState()), i.changeSoundState(SoundManager.getSoundEffectState())));


    }
    public destroy() {
        this.getView().destroy(),
            this.unsubscribByType(NotifyEnum.CHANGE_SETTING);
    }
}