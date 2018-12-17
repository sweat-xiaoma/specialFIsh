class OBBTest extends egret.DisplayObjectContainer {
    private obb1:OBB;
    private obb2:OBB;

    private points1:Array<egret.Point>;
    private points2:Array<egret.Point>;
    private sprite1:egret.Shape;
    private sprite2:egret.Shape;
    private obj1:egret.Sprite;
    private obj2:egret.Sprite;
    private resPoint:egret.Point = new egret.Point();
    constructor() {
        super();

        this.touchEnabled = true;
        var stage = egret.MainContext.instance.stage;
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

        this.points1 = [new egret.Point(300,0),new egret.Point(300,200),new egret.Point(400,200),new egret.Point(400,0)];
        this.sprite1 = this.drawSprite(this.points1);
        
        this.sprite1.x = 0;
        this.sprite1.y = 0;

        // this.obj1 = new egret.Sprite();
        // this.obj1.x = 300;
        // this.obj1.addChild(this.sprite1);
        this.addChild(this.sprite1);
         this.sprite1.rotation =  this.sprite1.rotation + 5;

        
        // this.sprite1.scaleX = 0.3;

        this.points2 = [new egret.Point(0,0),new egret.Point(0,100),new egret.Point(200,100),new egret.Point(200,0)];
        this.sprite2 = this.drawSprite(this.points2);
        this.addChild(this.sprite2);
        this.sprite2.x = 100;
        this.sprite2.y = 400;

        //创建两obb盒子
        this.obb1 = new OBB();
        this.obb2 = new OBB();
        
        egret.startTick(this.onEnterFrame, this);
    }

    private pt:egret.Point = new egret.Point(0,0);
        private pt2:egret.Point = new egret.Point(0,0);

    private onEnterFrame():boolean {
 
        for (var i = 0; i < this.points1.length; i++) {
            var point1:egret.Point = this.points1[i];
            this.sprite1.localToGlobal(point1.x, point1.y, this.pt);
            console.log(i, this.pt.x, this.pt.y);
            this.obb1.setVertex(i, this.pt.x, this.pt.y);
        }

        for (var j = 0; j < this.points2.length; j++) {
            var point2:egret.Point = this.points2[j];
            this.sprite2.localToGlobal(point2.x, point2.y, this.pt);
            this.obb2.setVertex(j, this.pt.x, this.pt.y);
        }

        this.sprite1.visible = !this.obb1.isCollidWithOBB(this.obb2);

        return false;
    }

    private drawSprite(points:Array<egret.Point>):egret.Shape {
        var startPoint:egret.Point = points[0];
        var sprite = new egret.Shape();
        sprite.graphics.clear();
        sprite.graphics.beginFill( 0xffffff, 0.5 );
        // sprite.graphics.drawRect(0,0,100,200);
        sprite.graphics.moveTo( startPoint.x, startPoint.y );
        for (var i = 1; i < points.length ; i++) {
            var point = points[i];
            sprite.graphics.lineTo( point.x, point.y );
        }
        sprite.graphics.endFill();

        return sprite;
    }

    private onTouchBegin(evt:egret.TouchEvent):void {
        var posX = evt.stageX;
        var posY = evt.stageY;

        this.sprite2.x = posX;
        this.sprite2.y = posY;
    }

    private onTouchMove(evt:egret.TouchEvent):void {
        var posX = evt.stageX;
        var posY = evt.stageY;

        this.sprite2.x = posX;
        this.sprite2.y = posY;
    }

    private onTouchEnd(evt:egret.TouchEvent):void {
        var posX = evt.stageX;
        var posY = evt.stageY;

        this.sprite2.x = posX;
        this.sprite2.y = posY;
    }
}