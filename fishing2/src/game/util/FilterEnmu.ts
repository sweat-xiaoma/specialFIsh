class FilterEnmu 
{
    public static GRAY = 1;
    public static LESS_LIGTH =  2;
    public static LIGHT =   3;
    public static DARK =    4;
    public static RED =     5;
    public static FISH_TYPE_1 = 6;
    public static FISH_TYPE_2 = 7;
    public static FISH_TYPE_MATRIX_1 = 1;
    public static FISH_TYPE_MATRIX_2 = 2;

    public constructor() {
    }


    public static getFilter(type) {
        if (egret.Capabilities.renderMode != "webgl") 
                return null;
        
        switch (type) {
            case FilterEnmu.GRAY: {
                return [new egret.ColorMatrixFilter([.3, .6, 0, 0, 0,  .3, .6, 0, 0, 0,  .3, .6, 0, 0, 0,  0, 0, 0, 1, 0])];
            }
            case FilterEnmu.LESS_LIGTH: {
                return [new egret.ColorMatrixFilter([1, 0, 0, 0, 0,   0, 1, .25, 0, 0,  0, 50, 1, 0, 0,  0, 0, 0, 1, 0])];
            }
            case FilterEnmu.LIGHT: {
                return [new egret.ColorMatrixFilter([1, 0, 0, 0, 100,     0, 1, 0, 0, 100,    0, 0, 1, 0, 100,   0, 0, 0, 1, 0])];
            }
            case FilterEnmu.DARK: {
                return [new egret.ColorMatrixFilter([1, 0, 0, 0, -40,     0, 1, 0, 0, -40,    0, 0, 1, 0, -40,   0, 0, 0, 1, 0])];
            }
            case FilterEnmu.RED: {
                return [new egret.ColorMatrixFilter([1, 0, 0, 0, 100,     0, 1, 0, 0, 0,      0, 0, 1, 0, 0,     0, 0, 0, 1, 0])];
            }
            case FilterEnmu.FISH_TYPE_1: {
                return [new egret.ColorMatrixFilter([1, 0, 0, 0, 0, 0, .45, 0, 0, 0, 0, 0, .45, 0, 0, 0, 0, 0, 1, 0])];
            }
            case FilterEnmu.FISH_TYPE_2: {
                return [new egret.ColorMatrixFilter([1.3, 0, 0, 0, 160, 0, .45, 0, 0, 0, 0, 0, .45, 0, 0, 0, 0, 0, 1, 0])];
            }
            default: {
                return null;
            }
        }
    }
}