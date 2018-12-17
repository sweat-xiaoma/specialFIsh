class LoaderUtil {
    static getFishResByType(roomType) {
        var t = [];
        t.push("background_" + roomType + "_jpg");
        CONFIG.isOpenMusic && (t.push("bgm_scene2_mp3"), t.push("gunFire_mp3"));
        return t;
    }
    static startLoginSilentLoad = function() {
        LoaderUtil.startSilentLoad(LoaderUtil.RES_LOGIN_SEQ)
    }
    static startMainSilentLoad = function() {
        LoaderUtil.startSilentLoad(LoaderUtil.RES_MAIN_SEQ)
    }
    static startFishingSilentLoad = function() {
        LoaderUtil.startSilentLoad(LoaderUtil.RES_FISHING_SEQ)
    }

    private static startSilentLoad = function(t) {
        if (! (t.length <= 0)) {
            var i = t.shift();
            if (1 == i.type) RES.getResAsync(i.name,
            function() {
                LoaderUtil.startSilentLoad(t)
            },
            this);
            else if (2 == i.type) {
                var n = function(a) {
                    a.groupName == i.name && (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, n, this), RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, o, this), LoaderUtil.startSilentLoad(t))
                },
                a = 0,
                o = function(r) {
                    r.groupName == i.name && (a++, 3 > a ? RES.loadGroup(i.name) : (RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, n, this), RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, o, this), LoaderUtil.startSilentLoad(t)))
                };
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, n, this),
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, o, this),
                RES.loadGroup(i.name, -1)
            } else 3 == i.type && EXML.load(CONFIG.RES_PATH_PREFIX + i.name,
            function() {
                LoaderUtil.startSilentLoad(t)
            },
            this)
        }
    }

    private static RES_LOGIN_SEQ = [{
        name: "resource/" + GlobalManager.SkinPath + "/component/newProgressButton.exml",
        type: 3
    },
    {
        name: "resource/" + GlobalManager.SkinPath + "/component/SideProp.exml",
        type: 3
    },
    {
        name: "resource/" + GlobalManager.SkinPath + "/component/FrozenAndLock.exml",
        type: 3
    },
    {
        name: "resource/" + GlobalManager.SkinPath + "/component/UnlockGunGroup.exml",
        type: 3
    },
    {
        name: "resource/" + GlobalManager.SkinPath + "/Gun.exml",
        type: 3
    },
    {
        name: "resource/" + GlobalManager.SkinPath + "/component/WarGroup.exml",
        type: 3
    },
    {
        name: "resource/" + GlobalManager.SkinPath + "/component/ChakanPanel.exml",
        type: 3
    },
    {
        name: "frozen_mask_png",
        type: 1
    },
    {
        name: "ef_caipanBg_png",
        type: 1
    },
    {
        name: "baofu_png",
        type: 1
    },
    {
        name: "ShaYu_png",
        type: 1
    },
    {
        name: "dayu_png",
        type: 1
    },
    {
        name: "Zhang_Tou_png",
        type: 1
    },
    {
        name: "Zhang_Zui_png",
        type: 1
    },
    {
        name: "Zhang_ShenTi_1_png",
        type: 1
    },
    {
        name: "Zhang_ShenTi_2_png",
        type: 1
    },
    {
        name: "ef_baojinbi_png",
        type: 1
    }];
    private static RES_MAIN_SEQ = [{
        name: "fishing",
        type: 2
    }];
    private static RES_FISHING_SEQ = [{
        name: "boss_coming",
        type: 2
    },
    {
        name: "common",
        type: 2
    }];
}