class RankItem extends eui.Component {
    private img1;
    private img2;
    private img3;
    private orderImg;
    private nameLab;
    private numLal;
    private orderOther;
    private rewardNumTxt;
    public rewardImg;
    private headGroup;
    public constructor() {
        super();
        this.skinName = CONFIG.RES_PATH_PREFIX + "resource/" + GlobalManager.SkinPath + "/rank/RankItem.exml";
    }

    public setData(e) {
        var t = this;
        t.nameLab.text = e.userName;
        t.numLal.text = e.rankNum;
        if (e.prizeInfo || e.prizeInfo.length > 0) {
            t.rewardNumTxt.text = e.prizeInfo[0].totalCount.toString();
            IconUtil.getIconByIdAsync(IconType.PROP, e.prizeInfo[0].itemId, function (value) {
                if (value) {
                    value.width = 40;
                    value.height = 40;
                    t.rewardImg.addChild(value);
                }

            })
        }

        IconUtil.getHeadIcon(e.headUrl, function (b) {
            if (b) {
                b.x = (95 - b.width) / 2;
                b.y = (95 - b.height) / 2;
                t.headGroup.addChild(b);
            }
        });
        if (e.rankOrder <= 3) {
            switch (e.rankOrder) {
                case 1:
                    t.img1.visible = true;
                    t.img2.visible = false;
                    t.img3.visible = false;
                    break;
                case 2:
                    t.img1.visible = false;
                    t.img2.visible = true;
                    t.img3.visible = false;
                    break;
                case 3:
                    t.img1.visible = false;
                    t.img2.visible = false;
                    t.img3.visible = true;
                    break;
            }
        } else {
            t.orderOther.text = e.rankOrder.toString()
            // var order=e.rankOrder.toString().split();
            // for(var i=0;i<order.length;i++)
            // {
            //     var img=new eui.Image("C_"+order[i]);
            //     t.orderImg.addChild(img);
            // }
        }

    }

    public getWeekStrByIndex(e) {

    }
}