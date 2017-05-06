Page({
  data: {},
  tree:{},
  onReady: function (e) {
    var ctx = wx.createContext();
    var width=370;
    var height=500;
    var opts = {
            seed: {
                x: width / 2 - 20,
                color: "rgb(190, 26, 37)",
                scale: 2
            },
            branch: [
                [535, 680, 570, 250, 500, 200, 30, 100, [
                    [540, 500, 455, 417, 340, 400, 13, 100, [
                        [450, 435, 434, 430, 394, 395, 2, 40]
                    ]],
                    [550, 445, 600, 356, 680, 345, 12, 100, [
                        [578, 400, 648, 409, 661, 426, 3, 80]
                    ]],
                    [539, 281, 537, 248, 534, 217, 3, 40],
                    [546, 397, 413, 247, 328, 244, 9, 80, [
                        [427, 286, 383, 253, 371, 205, 2, 40],
                        [498, 345, 435, 315, 395, 330, 4, 60]
                    ]],
                    [546, 357, 608, 252, 678, 221, 6, 100, [
                        [590, 293, 646, 277, 648, 271, 2, 80]
                    ]]
                ]] 
            ],
            bloom: {
                num: 700,
                width: 1080,
                height: 650,
            },
            footer: {
                width: 1200,
                height: 5,
                speed: 10,
            }
        }
    this.tree.ctx=ctx;
    this.tree.opts=opts;
    var seed = opts.seed || {};
            var x = seed.x || width / 2;
            var y = seed.y || height / 2;
            var point =  { x: x, y: y };;
            var color = seed.color || '#FF0000';
            var scale = seed.scale || 1;
   
     
    this.drawHeart(ctx,point,scale,color);
    ctx.fill(color);
    this.drawText(ctx,color,scale);
   
      wx.drawCanvas({
      canvasId:"canvas",
      actions:ctx.getActions()
    });

  },
  drawHeart: function(ctx, point, scale, color) {
        var scale = scale || 1
        var color = color || '#FF0000';
        var heart = {
            point  : point,
            scale  : scale,
            color  : color,
            figure :  this.Heart(),
        }
        var cirle = {
            point  : point,
            scale  : scale,
            color  : color,
            radius : 5,
        }
 
            var point = heart.point, color = heart.color, 
                scale = heart.scale;
            ctx.setStrokeStyle(color);
            ctx.setFillStyle(color)
           
            //ctx.moveTo(10,10);
            ctx.translate(point.x, point.y);
            ctx.moveTo(0, 0);
            for (var i = 0; i < heart.figure.length; i++) {
                var points=heart.figure[i];
                ctx.lineTo(points.x, -points.y);
            }
           ctx.stroke();
  },
  drawText:function(ctx,color,scale){
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.scale(scale, scale);
    ctx.moveTo(0, 0);
    ctx.lineTo(15, 15);
    ctx.lineTo(60, 15);
    ctx.stroke();
    ctx.moveTo(0, 0);
    ctx.scale(0.75, 0.75);
    ctx.font = "12px 微软雅黑,Verdana"; // 字号肿么没有用? (ˉ(∞)ˉ)
    ctx.fillText("click here", 23, 16);
  },
  clickHandle:function(e){
    this.seedAnimate(e);
  },
  seedAnimate:function(e){
    this.tree.ctx.clearActions();
       wx.drawCanvas({
      canvasId:"canvas",
      actions:this.tree.ctx.getActions()
    });
  },
  Heart:function() {
        // x = 16 sin^3 t
        // y = 13 cos t - 5 cos 2t - 2 cos 3t - cos 4t
        // http://www.wolframalpha.com/input/?i=x+%3D+16+sin%5E3+t%2C+y+%3D+(13+cos+t+-+5+cos+2t+-+2+cos+3t+-+cos+4t)
        var points = [], x, y, t;
        for (var i = 10; i < 30; i += 0.2) {
            t = i / Math.PI;
            x = 16 * Math.pow(Math.sin(t), 3);
            y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            points.push({x:x,y:y});
        }
        return points;
    }
})


