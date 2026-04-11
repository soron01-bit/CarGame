
document.getElementById("start").addEventListener("click", function () {
  const startButton = document.getElementById("start");
  const road = document.getElementById("road");
  const scoreBox = document.getElementById("score");
  const music = document.getElementById("bgMusic");
  const mycar = document.getElementById("mycar");
  const mycarImg = document.getElementById("mycarimg");

  startButton.style.display = "none";

  document.addEventListener("touchstart", function () {
    music.play();
  }, { once: true });

  music.volume = 0.1;

  const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const enemyCars = [
    { id: "enemycar1", imgId: "ecarimg1", keyframe: "ecar1", baseDuration: 3, laneMin: 150, laneMax: 210, hp: 3, maxHp: 3, alive: true },
    { id: "enemycar2", imgId: "ecarimg2", keyframe: "ecar2", baseDuration: 6, laneMin: 60, laneMax: 110, hp: 3, maxHp: 3, alive: true },
    { id: "enemycar3", imgId: "ecarimg3", keyframe: "ecar3", baseDuration: 5, laneMin: -130, laneMax: -70, hp: 3, maxHp: 3, alive: true },
    { id: "enemycar4", imgId: "ecarimg4", keyframe: "ecar4", baseDuration: 4, laneMin: -230, laneMax: -160, hp: 3, maxHp: 3, alive: true }
  ];

  enemyCars.forEach((enemy) => {
    const enemyElement = document.getElementById(enemy.id);
    enemyElement.style.left = `${randomInRange(enemy.laneMin, enemy.laneMax)}px`;
    enemyElement.style.animation = `${enemy.keyframe} ${enemy.baseDuration}s linear infinite`;
    enemyElement.style.animationPlayState = "running";

    enemyElement.addEventListener("animationiteration", () => {
      if (!enemy.alive || gameOver) return;
      enemyElement.style.left = `${randomInRange(enemy.laneMin, enemy.laneMax)}px`;
    });
  });

  let speedMultiplier = 1;
  let score = 0;
  let gameOver = false;
  let playerLife = 8;
  const maxPlayerLife = 8;

  const bestScore = Number(localStorage.getItem("carGameBestScore") || 0);
  let liveBest = bestScore;

  road.style.animationPlayState = "running";

  function updateScoreUI() {
    const level = Math.floor((speedMultiplier - 1) / 0.2) + 1;
    const totalEnemyHp = enemyCars.reduce((sum, enemy) => sum + enemy.hp, 0);
    scoreBox.innerHTML = `Score: ${score}<br>Best: ${liveBest}<br>Level: ${level}<br>Your HP: ${playerLife}/${maxPlayerLife}<br>Enemy HP Pool: ${totalEnemyHp}`;
  }

  function applyDynamicSpeed() {
    const roadDuration = Math.max(0.06, 0.13 / speedMultiplier);
    road.style.animationDuration = `${roadDuration}s`;

    enemyCars.forEach((enemy) => {
      const dynamicDuration = Math.max(enemy.baseDuration * 0.45, enemy.baseDuration / speedMultiplier);
      const enemyElement = document.getElementById(enemy.id);
      enemyElement.style.animationDuration = `${dynamicDuration}s`;
    });
  }

  function isColliding(rectA, rectB) {
    return !(
      rectA.right < rectB.left ||
      rectA.left > rectB.right ||
      rectA.bottom < rectB.top ||
      rectA.top > rectB.bottom
    );
  }

  function applyDamageToPlayer(amount) {
    if (gameOver) return;
    playerLife = Math.max(0, playerLife - amount);
    updateScoreUI();
    if (playerLife <= 0) {
      endGame();
    }
  }

  function respawnEnemy(enemy) {
    if (gameOver) return;

    const enemyElement = document.getElementById(enemy.id);
    enemy.hp = enemy.maxHp;
    enemy.alive = true;
    enemyElement.style.opacity = "1";
    enemyElement.style.left = `${randomInRange(enemy.laneMin, enemy.laneMax)}px`;

    const dynamicDuration = Math.max(enemy.baseDuration * 0.45, enemy.baseDuration / speedMultiplier);
    enemyElement.style.animation = "none";
    enemyElement.offsetHeight;
    enemyElement.style.animation = `${enemy.keyframe} ${dynamicDuration}s linear infinite`;
    enemyElement.style.animationPlayState = "running";
  }

  function killEnemy(enemy) {
    enemy.alive = false;
    enemy.hp = 0;

    const enemyElement = document.getElementById(enemy.id);
    enemyElement.style.opacity = "0.15";
    enemyElement.style.animationPlayState = "paused";

    score += 35;
    if (score > liveBest) {
      liveBest = score;
    }

    updateScoreUI();
    setTimeout(() => respawnEnemy(enemy), 1200);
  }

  const playerBullets = [];
  const enemyBullets = [];
  const lifeMaterials = [];
  let lifeMaterialSpawnTimeout;

  function createBullet(x, y, enemyShot) {
    const bullet = document.createElement("div");
    bullet.className = enemyShot ? "enemy-bullet" : "bullet";
    bullet.style.left = `${x}px`;
    bullet.style.top = `${y}px`;
    document.body.appendChild(bullet);
    return bullet;
  }

  function firePlayerBullet() {
    if (gameOver) return;

    const playerRect = mycarImg.getBoundingClientRect();
    const bulletX = playerRect.left + playerRect.width / 2 - 4;
    const bulletY = playerRect.top - 12;

    const bulletElement = createBullet(bulletX, bulletY, false);
    playerBullets.push({ element: bulletElement, x: bulletX, y: bulletY, speed: 20 + speedMultiplier * 2 });
  }

  function fireEnemyBullet(enemy) {
    if (!enemy.alive || gameOver) return;

    const enemyRect = document.getElementById(enemy.imgId).getBoundingClientRect();
    const bulletX = enemyRect.left + enemyRect.width / 2 - 4;
    const bulletY = enemyRect.bottom + 4;

    const bulletElement = createBullet(bulletX, bulletY, true);
    enemyBullets.push({ element: bulletElement, x: bulletX, y: bulletY, speed: 13 + speedMultiplier * 1.5 });
  }

  function removeBullet(list, index) {
    const item = list[index];
    item.element.remove();
    list.splice(index, 1);
  }

  function getRoadSpawnX() {
    const roadRect = road.getBoundingClientRect();
    const minX = Math.floor(roadRect.left + 20);
    const maxX = Math.floor(roadRect.right - 20);
    return randomInRange(minX, maxX);
  }

  function spawnLifeMaterial() {
    if (gameOver) return;

    const lifeItem = document.createElement("div");
    lifeItem.className = "life-material";

    const x = getRoadSpawnX();
    const y = -40;
    lifeItem.style.left = `${x}px`;
    lifeItem.style.top = `${y}px`;
    document.body.appendChild(lifeItem);

    lifeMaterials.push({ element: lifeItem, x, y, speed: 7 + speedMultiplier });
  }

  function queueLifeMaterialSpawn() {
    if (gameOver) return;

    const delay = randomInRange(3000, 4000);
    lifeMaterialSpawnTimeout = setTimeout(() => {
      spawnLifeMaterial();
      queueLifeMaterialSpawn();
    }, delay);
  }

  function removeLifeMaterial(index) {
    lifeMaterials[index].element.remove();
    lifeMaterials.splice(index, 1);
  }

  let carLeft = 1;
  let carTop = 25;
  const speed = 10;
  const minLeft = -220;
  const maxLeft = 220;
  const minTop = 5;
  const maxTop = 80;

  function updatePlayerPosition() {
    mycar.style.left = `${carLeft}px`;
    mycar.style.top = `${carTop}vh`;
  }

  function endGame() {
    if (gameOver) return;
    gameOver = true;

    if (score > bestScore) {
      localStorage.setItem("carGameBestScore", String(score));
    }

    clearInterval(gameplayTimer);
    clearInterval(speedIncreaseTimer);
    clearInterval(enemyFireTimer);
    clearInterval(playerAutoFireTimer);
    clearTimeout(lifeMaterialSpawnTimeout);

    for (let i = lifeMaterials.length - 1; i >= 0; i -= 1) {
      lifeMaterials[i].element.remove();
    }

    alert(`Game Over! Your score: ${score}`);
    location.reload();
  }

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
    if (gameOver) return;

    const key = e.key === " " ? " " : e.key.toLowerCase();
    const action = keyMap[key];
    if (!action) return;

    e.preventDefault();

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

    carLeft = Math.max(minLeft, Math.min(maxLeft, carLeft));
    carTop = Math.max(minTop, Math.min(maxTop, carTop));
    updatePlayerPosition();
  });

  const mobileStep = 90;
  document.addEventListener("touchstart", function (e) {
    if (gameOver) return;

    const screenWidth = window.innerWidth;
    const touchX = e.touches[0].clientX;

    if (touchX < screenWidth / 2) {
      carLeft -= mobileStep;
    } else {
      carLeft += mobileStep;
    }

    carLeft = Math.max(minLeft, Math.min(maxLeft, carLeft));
    updatePlayerPosition();
  });

  const playerAutoFireTimer = setInterval(() => {
    if (gameOver) return;
    firePlayerBullet();
  }, 220);

  applyDynamicSpeed();
  updateScoreUI();
  queueLifeMaterialSpawn();

  const speedIncreaseTimer = setInterval(() => {
    speedMultiplier += 0.2;
    applyDynamicSpeed();
    updateScoreUI();
  }, 5000);

  const gameplayTimer = setInterval(() => {
    if (gameOver) return;

    score += Math.ceil(speedMultiplier);
    if (score > liveBest) {
      liveBest = score;
    }
    updateScoreUI();

    const mycarRect = mycarImg.getBoundingClientRect();

    const bodyHit = enemyCars.some((enemy) => {
      if (!enemy.alive) return false;
      const enemyRect = document.getElementById(enemy.imgId).getBoundingClientRect();
      return isColliding(mycarRect, enemyRect);
    });

    if (bodyHit) {
      applyDamageToPlayer(2);
    }

    for (let i = playerBullets.length - 1; i >= 0; i -= 1) {
      const bullet = playerBullets[i];
      bullet.y -= bullet.speed;
      bullet.element.style.top = `${bullet.y}px`;

      if (bullet.y < -30) {
        removeBullet(playerBullets, i);
        continue;
      }

      const bulletRect = bullet.element.getBoundingClientRect();
      const target = enemyCars.find((enemy) => {
        if (!enemy.alive) return false;
        const enemyRect = document.getElementById(enemy.imgId).getBoundingClientRect();
        return isColliding(bulletRect, enemyRect);
      });

      if (target) {
        target.hp = Math.max(0, target.hp - 1);
        score += 8;
        removeBullet(playerBullets, i);

        if (target.hp <= 0) {
          killEnemy(target);
        } else {
          updateScoreUI();
        }
      }
    }

    for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
      const bullet = enemyBullets[i];
      bullet.y += bullet.speed;
      bullet.element.style.top = `${bullet.y}px`;

      if (bullet.y > window.innerHeight + 40) {
        removeBullet(enemyBullets, i);
        continue;
      }

      const bulletRect = bullet.element.getBoundingClientRect();
      if (isColliding(bulletRect, mycarRect)) {
        removeBullet(enemyBullets, i);
        applyDamageToPlayer(1);
      }
    }

    for (let i = lifeMaterials.length - 1; i >= 0; i -= 1) {
      const lifeItem = lifeMaterials[i];
      lifeItem.y += lifeItem.speed;
      lifeItem.element.style.top = `${lifeItem.y}px`;

      if (lifeItem.y > window.innerHeight + 50) {
        removeLifeMaterial(i);
        continue;
      }

      const lifeRect = lifeItem.element.getBoundingClientRect();
      if (isColliding(lifeRect, mycarRect)) {
        playerLife = maxPlayerLife;
        score += 15;
        if (score > liveBest) {
          liveBest = score;
        }
        updateScoreUI();
        removeLifeMaterial(i);
      }
    }
  }, 40);

  const enemyFireTimer = setInterval(() => {
    if (gameOver) return;

    const shooters = enemyCars.filter((enemy) => enemy.alive);
    shooters.forEach((enemy) => {
      fireEnemyBullet(enemy);
    });
  }, 650);
});