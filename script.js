
document.getElementById("start").addEventListener("click", function () {
  document.getElementById("start").style.display = 'none'
  document.getElementById("road").style.animation = 'animate 0.13s linear infinite'


  let music = document.getElementById("bgMusic");

// First touch এ music start হবে
document.addEventListener("touchstart", function () {
  music.play();
}, { once: true });


music.volume = 0.1; // 30% sound



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


  // try------------start  

  let carLeft = 1;
  let carTop = 25;
  const speed = 10;


  const keyMap = {
    w: "up",
    arrowup: "up",
    home: "up",

    s: "down",
    arrowdown: "down",
    end: "down",

    a: "left",
    arrowleft: "left",
    pageup: "left",

    d: "right",
    arrowright: "right",
    pagedown: "right"
  };

  window.addEventListener("keydown", (e) => {
    const action = keyMap[e.key.toLowerCase()];
    if (!action) return;

    e.preventDefault(); // VERY IMPORTANT

    switch (action) {
      case "left":
        carLeft -= speed + 20;
        break;

      case "right":
        carLeft += speed + 20;
        break;

      case "up":
        carTop -= speed;
        break;

      case "down":
        carTop += speed;
        break;
    }

    mycar.style.left = carLeft + "px";
    mycar.style.top = carTop + "vh";
  });


  //try--------End


  let score = 0
  setInterval(() => {
    document.getElementById("score").innerText = `score : ${score}`
    score = score + 1


    var ecar1_left = Math.abs(document.getElementById("ecarimg1").getBoundingClientRect().left);
    var ecar1_right = Math.abs(document.getElementById("ecarimg1").getBoundingClientRect().right);
    var ecar1_top = Math.abs(document.getElementById("ecarimg1").getBoundingClientRect().top);
    var ecar1_bottom = Math.abs(document.getElementById("ecarimg1").getBoundingClientRect().bottom);

    var ecar2_left = Math.abs(document.getElementById("ecarimg2").getBoundingClientRect().left);
    var ecar2_right = Math.abs(document.getElementById("ecarimg2").getBoundingClientRect().right);
    var ecar2_top = Math.abs(document.getElementById("ecarimg2").getBoundingClientRect().top);
    var ecar2_bottom = Math.abs(document.getElementById("ecarimg2").getBoundingClientRect().bottom);

    var ecar3_left = Math.abs(document.getElementById("ecarimg3").getBoundingClientRect().left);
    var ecar3_right = Math.abs(document.getElementById("ecarimg3").getBoundingClientRect().right);
    var ecar3_top = Math.abs(document.getElementById("ecarimg3").getBoundingClientRect().top);
    var ecar3_bottom = Math.abs(document.getElementById("ecarimg3").getBoundingClientRect().bottom);

    var ecar4_left = Math.abs(document.getElementById("ecarimg4").getBoundingClientRect().left);
    var ecar4_right = Math.abs(document.getElementById("ecarimg4").getBoundingClientRect().right);
    var ecar4_top = Math.abs(document.getElementById("ecarimg4").getBoundingClientRect().top);
    var ecar4_bottom = Math.abs(document.getElementById("ecarimg4").getBoundingClientRect().bottom);

    var mycar_left = Math.abs(document.getElementById("mycarimg").getBoundingClientRect().left);
    var mycar_right = Math.abs(document.getElementById("mycarimg").getBoundingClientRect().right);
    var mycar_top = Math.abs(document.getElementById("mycarimg").getBoundingClientRect().top);
    var mycar_bottom = Math.abs(document.getElementById("mycarimg").getBoundingClientRect().bomycarimg);

    if (
      (
        (
          (ecar1_left < mycar_left && mycar_left < ecar1_right) ||
          (ecar1_left < mycar_right && mycar_right < ecar1_right)
        ) &&
        (
          (ecar1_top < mycar_top && mycar_top < ecar1_bottom) ||
          (ecar1_top < mycar_bottom && mycar_bottom < ecar1_bottom)
        )
      )
      ||
      (
        (
          (ecar2_left < mycar_left && mycar_left < ecar2_right) ||
          (ecar2_left < mycar_right && mycar_right < ecar2_right)
        ) &&
        (
          (ecar2_top < mycar_top && mycar_top < ecar2_bottom) ||
          (ecar2_top < mycar_bottom && mycar_bottom < ecar2_bottom)
        )
      )
      ||
      (
        (
          (ecar3_left < mycar_left && mycar_left < ecar3_right) ||
          (ecar3_left < mycar_right && mycar_right < ecar3_right)
        ) &&
        (
          (ecar3_top < mycar_top && mycar_top < ecar3_bottom) ||
          (ecar3_top < mycar_bottom && mycar_bottom < ecar3_bottom)
        )
      )
      ||
      (
        (
          (ecar4_left < mycar_left && mycar_left < ecar4_right) ||
          (ecar4_left < mycar_right && mycar_right < ecar4_right)
        ) &&
        (
          (ecar4_top < mycar_top && mycar_top < ecar4_bottom) ||
          (ecar4_top < mycar_bottom && mycar_bottom < ecar4_bottom)
        )
      )
    ) {
      alert(`Game Over! Your score is ${score - 2}`);
      location.reload();
    }
  }, 200);


//mobile//
let car = document.getElementById("mycar");

 // starting position

// Touch anywhere on screen
document.addEventListener("touchstart", function (e) {

  let screenWidth = window.innerWidth;
  // finger touch position X
  let touchX = e.touches[0].clientX;
   

  // If touch on left side → move left
  if (touchX < screenWidth / 2) {
    if (carLeft > -120) {
      carLeft -= 90;
      car.style.left = carLeft + "px";
    }
  }

  // If touch on right side → move right
  else {
    if (carLeft < 200) {
      carLeft += 90;
      car.style.left = carLeft + "px";
    }
  }

});
//mobile//




});
