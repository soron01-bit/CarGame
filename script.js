
 document.getElementById("start").addEventListener("click",function(){  
  document.getElementById("start").style.display='none'
   document.getElementById("road").style.animation='roadanimation 20s linear infinite'


setInterval(() => {
  let num = Math.floor(Math.random() * (210 - 150 + 1) + 150);
  document.getElementById("enemycar1").style.left = `${num}px`;
}, 3000);

setInterval(() => {
  let num = Math.floor(Math.random() * (110 - 60 + 1) + 60);
  document.getElementById("enemycar2").style.left = `${num}px`;
}, 6000);


setInterval(() => {
  let num = Math.floor(Math.random() * (-130 + 70 + 1) - 70);
  document.getElementById("enemycar3").style.left = `${num}px`;
}, 5000);

setInterval(() => {
  let num = Math.floor(Math.random() * (-230 + 160 + 1) - 160);
  document.getElementById("enemycar4").style.left = `${num}px`;
}, 4000);





  document.getElementById("enemycar1").style.animation = "ecar1 3s linear infinite";
document.getElementById("enemycar2").style.animation = "ecar2 6s linear infinite";
document.getElementById("enemycar3").style.animation = "ecar3 5s linear infinite";
document.getElementById("enemycar4").style.animation = "ecar4 4s linear infinite";




let t=15;
let l=0



window.addEventListener("keydown", (e) => {
  switch(e.key.toLowerCase()){
    case "w":
      t=t-3;
      // move up
      break;
    case "a":
      l=l-2;
      // move left
      break;
    case "s":
      t=t+3;
      // move down
      break;
    case "d":
      l=l+2;
      // move right
      break;
  }

  document.getElementById("mycar").style.top=`${t}vh`
  document.getElementById("mycar").style.left=`${l}vw`
});
n=0
setInterval(()=>{
  document.getElementById("score").innerText=`score : ${n}`
  n=n+1

var ecar1_left   = Math.abs(document.getElementById("ecarimg1").getBoundingClientRect().left);
var ecar1_right  = Math.abs(document.getElementById("ecarimg1").getBoundingClientRect().right);
var ecar1_top    = Math.abs(document.getElementById("ecarimg1").getBoundingClientRect().top);
var ecar1_bottom = Math.abs(document.getElementById("ecarimg1").getBoundingClientRect().bottom);

var ecar2_left   = Math.abs(document.getElementById("ecarimg2").getBoundingClientRect().left);
var ecar2_right  = Math.abs(document.getElementById("ecarimg2").getBoundingClientRect().right);
var ecar2_top    = Math.abs(document.getElementById("ecarimg2").getBoundingClientRect().top);
var ecar2_bottom = Math.abs(document.getElementById("ecarimg2").getBoundingClientRect().bottom);

var ecar3_left   = Math.abs(document.getElementById("ecarimg3").getBoundingClientRect().left);
var ecar3_right  = Math.abs(document.getElementById("ecarimg3").getBoundingClientRect().right);
var ecar3_top    = Math.abs(document.getElementById("ecarimg3").getBoundingClientRect().top);
var ecar3_bottom = Math.abs(document.getElementById("ecarimg3").getBoundingClientRect().bottom);

var ecar4_left   = Math.abs(document.getElementById("ecarimg4").getBoundingClientRect().left);
var ecar4_right  = Math.abs(document.getElementById("ecarimg4").getBoundingClientRect().right);
var ecar4_top    = Math.abs(document.getElementById("ecarimg4").getBoundingClientRect().top);
var ecar4_bottom = Math.abs(document.getElementById("ecarimg4").getBoundingClientRect().bottom);

var  mycar_left   = Math.abs(document.getElementById("mycarimg").getBoundingClientRect().left);
var  mycar_right  = Math.abs(document.getElementById("mycarimg").getBoundingClientRect().right);
var  mycar_top    = Math.abs(document.getElementById("mycarimg").getBoundingClientRect().top);
var  mycar_bottom = Math.abs(document.getElementById("mycarimg").getBoundingClientRect().bomycarimg);

if (
  mycar_left < ecar1_right &&
  mycar_right > ecar1_left &&
  mycar_top < ecar1_bottom &&
  mycar_bottom > ecar1_top
) {
  alert("game");
}








}, 100)


 })


