Page({
   data: {
   heartList:[],
  },
  onReady:function(e){
    var list=[];
    for(var i=0;i<60;i++){
     var random= Math.ceil(Math.random()*100);
     random=random%2;
     if(random==0)
     { 
       random=2;
     }
     var mode=this.createAnimationObj(random,i);
     list.push(mode);
    }
    this.setData({
        heartList:list
      })
    setTimeout(()=>{
      var list=this.data.heartList;
      if(list!=null){
      for(var i=0;i<list.length;i++){
      var mode=list[i];
      this.echoAnimation(mode);
      }}
      this.setData({
      heartList: list
    })
    }, 16);
  },
  run:function(){
    var list=this.data.hearList;
    for(var i=0;i<list.lenght;i++){
      var mode=list[i];
      this.echoAnimation(mode);
    }    
  },
  echoAnimation:function(animation){
  
  },
  createAnimationObj:function(value,num){
    var result={};
    result.path=value;
    result.w=15;
    result.h=12;
    result.position = "fixed";
    result.left = -1000;
    result.N =num;
    result.x0 = 0;
    result.y0 = -1000;
    result.v = 1 + Math.round((80 / 12) * Math.random());
    result.p = 1 + Math.round((15/ 8) * Math.random());
    result.xx = 0;
    result.yy = 0;
    result.ec = 0;
    result.animationData = this.animationData(result);
    return result;
  },
  animationData:function(value){
    this.getOffset(value);
    var animation=wx.createAnimation({
     duration: 400,
     timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
     delay: 0,
     success: function(res) {
       this.getOffset(value,res);
      }
    });
    return animation;
  },
  xm : 0,
  ym :9999,
  nx : 0,
  ny : 0,
  getOffset:function(value,res){
        if (value.ec < 20) {
            if (Math.abs(value.x0 - this.xm) < 100 && Math.abs(value.y0 - this.ym) < 100) {
                value.xx = (this.xm - value.x0) / 8;
                value.yy = (this.ym - value.y0) / 8;
                value.ec++;
            }
        }
        value.xx *= 0.99;
        value.yy *= 0.99;
        value.x0 = Math.round(value.x0 + Math.cos(value.y0 / 15) * value.p) + value.xx;
        value.y0 += value.yy - value.v;
        if (value.y0 < -value.h * 2 || value.x0 < -value.w * 2 || value.x0 > this.nx + value.w * 2) {
            value.y0 = this.ny + value.N + value.h * 2;
            value.x0 = this.nx / 2 - 100 + Math.random() * 100;
            value.ec = 0;
        }
       value.top = value.y0 - value.h;
       value.left = value.x0 - value.w;
    }
})