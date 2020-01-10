phina.globalize();
const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;
const GOALX=1490;
const GOALY=790;
let dx=0;
let dy=0;
let moveX=0
let moveY=0

var score = 0;
var time = 30;
var isTsuru = false;

function goToGoal(){
  var num  = Math.random()
  if(num<0.1){
    return true;
  }else{
    return false;
  }
}

phina.define("MainScene", {
  superClass: "DisplayScene",
  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    });


    //背景設定
    this.background = Sprite("background", 1920, 1080).addChildTo(this);
    this.background.origin.set(0, 0);
    this.tsuru = Sprite("tsuru")
      .addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.center() - 200);
      //各ラベル設定
      var scoreTitleLabel = Label({text:"Score",fontSize:64,align:"left",fill:"white"}).addChildTo(this)
        .setPosition(this.gridX.center()-800,this.gridY.center()-400);
      var scoreLabel = Label({text:String(score),fontSize:100,align:"left",fill:"white"}).addChildTo(this).setPosition(this.gridX.center()-800,this.gridY.center()-300);

      var timeTitleLabel = Label({text:"Time",fontSize:64,align:"left",fill:"white"}).addChildTo(this)
          .setPosition(this.gridX.center()-800,this.gridY.center()-100);
      var timeLabel  = Label({text:time,fontSize:100,align:"left",fill:"white"}).addChildTo(this)
                .setPosition(this.gridX.center()-800,this.gridY.center());

                //当たり判定用の図形
                      var shapeForHit = Shape({
                           backgroundColor: 'blue',
                           x: this.gridX.center()+530,
                           y: this.gridY.center()-150,
                           width: 280,
                           height: 50,
                         }).addChildTo(this);
//人の移動範囲(-800,50)から(+800,330)まで
      var person = Sprite("hito1").addChildTo(this).setPosition(this.gridX.center()+500,this.gridY.center()+50);

    //キー入力受付
    this.update = function(app){
      var key = app.keyboard;
      if (key.getKey("enter")  && time>0) {
        this.tsuru.setImage("tsuru");
        isTsuru=true;
        score+=5;
        scoreLabel.text=score;

      }else{
        this.tsuru.setImage("hime");
        isTsuru=false;
      }

    person.update = function(app){
        person.moveBy(moveX,moveY)
      }


    if (person.hitTestElement(shapeForHit)) {
       shapeForHit.backgroundColor = 'red';
     }
     else {
       shapeForHit.backgroundColor = 'blue';
     }
    }
    //カウントダウン処理
    var countDown=function(){
      time-=1;
      timeLabel.text=time;
    }
    var movePerson=function(){
      dx=0;
      dy=0;
      dx=Math.random()*1700+100//100~1800まで
      dy=Math.random()*271+630; //630~900まで
      moveX=(dx-person.x)/90
      moveY=(dy-person.y)/90
      console.log("dx"+dx)
      console.log("movex"+moveX)
      console.log("y"+person.x)
    }
    //1秒ごとに時間を更新して0になったら終了
    var upDateTime= setInterval(
    function(){
      countDown();
      if(time<=0){
        clearInterval(upDateTime);
      }
    },1000);

    var moveTimer=setInterval(function(){
      movePerson();
      if(time<=0){
        clearInterval(moveTimer);
      }
    },3000);
  }
});

phina.main(function() {
  var app = GameApp({
    startLabel: "main",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: {
      image: {
        background: "images/background.png",
        tsuru: "images/tsuru_continue.png",
        hime:"images/syozi_hime.png",
        hito1:"images/granpa.png",
        hito2:"images/granma.png"
      }
    }
  });
  app.run();
});
