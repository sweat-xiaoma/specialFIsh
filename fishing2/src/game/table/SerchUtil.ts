
class SerchUtil {
    public static binary_search(t, i, n, a, o) {
        if (n > a) return null;
        var r = Math.floor((a + n) / 2);
        return r >= t.length ? null: t[r][i] == o ? t[r] : t[r][i] > o ? (a = r - 1, SerchUtil.binary_search(t, i, n, a, o)) : t[r][i] < o ? (n = r + 1, SerchUtil.binary_search(t, i, n, a, o)) : void 0
    }
}