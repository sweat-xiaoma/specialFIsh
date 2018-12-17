
/**
 * (Oriented bounding box)方向包围盒算法
 */
class OBB {
    private pList:Array<any> = []                   //保存盒子顶点数
    constructor() {
        this.pList = [];
    }

    public getVertex(idx):egret.Point {
        if (idx >= this.pList.length) {
            return null;
        }

        return this.pList[idx];
    };

    public setVertex(idx:number, x:number, y:number):void {
        if (!this.pList[idx]) {
            this.pList[idx] = new egret.Point(0, 0);
        }

        this.pList[idx].x = x;
        this.pList[idx].y = y;
    }

    /**
     * 计算分离轴
     * 如果边向量为(x,y)，那么法向量为(-y,x)，你也可以设置为(y,-x)。结果没有什么变化。 
     */
    public getAxies():Array<egret.Point> {
        var axies = [];
        var len = this.pList.length;
        var pOut = new egret.Point(0,0);
        for(var i = 0; i < len; i++) {    
            var startPoint:egret.Point = this.pList[i];
            var endPoint:egret.Point = this.pList[(i + 1) % len];
            var point = startPoint.subtract(endPoint);

            var length = Math.sqrt(point.x * point.x + point.y * point.y);
            pOut.x = point.x / length;
            pOut.y = point.y / length;

            axies[i] = new egret.Point();
            axies[i].x = -pOut.y ;
            axies[i].y = pOut.x ;
        }
        return axies;
    }

    /**
     * 计算投影
     * 计算出一个投影线条
     * 只是保存了两个float形的数据，分别表示OBB盒在分离轴上投影的最小值和最大值
     */
    public getProjection(axies:egret.Point):Projection {
        var min = this.pList[0].x * axies.x + this.pList[0].y * axies.y;
        var max = min ;

        var len = this.pList.length;
        for (var i = 1; i < len; i++) {
            var temp = this.pList[i].x * axies.x + this.pList[i].y * axies.y;
            if (temp > max) {
                max = temp;
            } else if (temp < min) {
                min = temp;
            }
        }// end for

        return new Projection(min, max);
    }

    //对传递进来的OBB判断是否与调用这个方法的OBB发生了交叉
    public isCollidWithOBB(obb:OBB):boolean {
        //获取分离轴
        var axies1 = this.getAxies();
        var axies2 = obb.getAxies();

        var p1:Projection = null;
        var p2:Projection = null;
        
        //Check for overlap for all of the axies
        for(var i = 0; i < axies1.length; i++)
        {
            p1 = this.getProjection(axies1[i]);
            p2 = obb.getProjection(axies1[i]);
            if(!p1.overlap(p2))
            {
                return false ;
            }
        }

        for(var j = 0; j < axies2.length; j ++)
        {
            p1 = this.getProjection(axies2[j]);
            p2 = obb.getProjection(axies2[j]);
            if(!p1.overlap(p2))
            {
                return false ;
            }
        }

        return true ;
    }
}