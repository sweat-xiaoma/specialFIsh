class Language {
	public constructor() {
	}

			public static getText(t) {
                var i = T_Language_Table.getVoByKey(t);
                return i ? CONFIG.LANGUAGE == LanguageType.Simp_Chinese ? i.value: CONFIG.LANGUAGE == LanguageType.TW_Chinese ? i.value_tw: i.value: "Key:" + t
            }

            public static getDynamicText(strId:number, params:Array<any>) {
                var lang:T_Language = T_Language_Table.getVoByKey(strId),
                a = lang.value;
                CONFIG.LANGUAGE == LanguageType.Simp_Chinese ? a = lang.value: CONFIG.LANGUAGE == LanguageType.TW_Chinese && (a = lang.value_tw);
                var len:number = params.length;
                if (! (len > 0)) return a;
                for (var r = 0; len > r; r++) {
                    var s = params[r];
                    a = a.replace("{" + r + "}", s)
                }
                return a
            }

            public static getDynamicTextByStr(e, t) {
                var i = t.length;
                if (! (i > 0)) return e;
                for (var n = 0; i > n; n++) {
                    var a = t[n];
                    e = e.replace("{" + n + "}", a)
                }
                return e
            }
}