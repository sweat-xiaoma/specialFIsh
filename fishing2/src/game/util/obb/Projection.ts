/**
 * 投影判断
 */
class Projection {
    private min:number = 0;
    private max:number = 0;
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

    public getMin(){
        return this.min;
    }

    public getMax(){
        return this.max;
    }

    /**
     * 判断是否叠加
     */
    public overlap(proj:Projection):boolean {
        if(this.min > proj.getMax())    return false;
        if(this.max < proj.getMin())    return false;

        return true;
    }
};