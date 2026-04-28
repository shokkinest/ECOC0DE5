// -------------------- STATE --------------------
// Hearts and Timer removed for unlimited environmental mission

// -------------------- ELEMENTS --------------------
const startScreen = document.getElementById("startScreen");
const insideScreen = document.getElementById("insideScreen");
const gameScreen = document.getElementById("gameScreen");
const winScreen = document.getElementById("winScreen");

const startBtn = document.getElementById("startBtn");
const finalBtn = document.getElementById("finalBtn");
const countdownEl = document.getElementById("insideCountdown");

// -------------------- AUDIO --------------------
// Removed background music and error sounds as requested
const successSound = document.getElementById("successSound");
const winSound = document.getElementById("winSound");

// -------------------- REBOOT CODES --------------------
// You can change these 4-digit codes to whatever you prefer
const codes = {
  lvl1: "1368",
  lvl2: "4621",
  lvl3: "2600",
  lvl4: "2312",
  lvl5: "5555" // New 5th level code
};

// -------------------- STATUS CIRCLES --------------------
const circles = {
  lvl1: document.getElementById("c1"),
  lvl2: document.getElementById("c2"),
  lvl3: document.getElementById("c3"),
  lvl4: document.getElementById("c4"),
  lvl5: document.getElementById("c5")
};

// -------------------- INPUTS --------------------
const inputs = {
  lvl1: document.getElementById("lvl1"),
  lvl2: document.getElementById("lvl2"),
  lvl3: document.getElementById("lvl3"),
  lvl4: document.getElementById("lvl4"),
  lvl5: document.getElementById("lvl5")
};

// -------------------- PROGRESS TRACKER --------------------
const solved = {
  lvl1: false,
  lvl2: false,
  lvl3: false,
  lvl4: false,
  lvl5: false
};

// -------------------- FUNCTIONS --------------------
function showScreen(screen) {
  startScreen.classList.remove("active");
  insideScreen.classList.remove("active");
  gameScreen.classList.remove("active");
  winScreen.classList.remove("active");

  screen.classList.add("active");
}

// -------------------- MISSION START --------------------
startBtn.onclick = () => {
  showScreen(insideScreen);

  let count = 10;
  countdownEl.innerText = count;

  const insideTimer = setInterval(() => {
    count--;
    countdownEl.innerText = count;

    if (count <= 0) {
      clearInterval(insideTimer);
      showScreen(gameScreen);
    }
  }, 1000);
};

// -------------------- CODE VERIFICATION --------------------
Object.keys(codes).forEach(lvl => {
  inputs[lvl].addEventListener("input", (e) => {
    let value = e.target.value;

    // Numbers only
    value = value.replace(/[^0-9]/g, "");
    e.target.value = value;

    if (value.length !== 4) return;

    if (value === codes[lvl]) {
      // Turn circle green on success
      circles[lvl].classList.remove("red");
      circles[lvl].classList.add("green");

      solved[lvl] = true;
      inputs[lvl].disabled = true;

      if (successSound) successSound.play();
      checkWin();
    } else {
      // Show red briefly if wrong, but no lives lost
      circles[lvl].classList.add("red");
      setTimeout(() => {
        circles[lvl].classList.remove("red");
        e.target.value = "";
      }, 500);
    }
  });
});

// -------------------- FINAL REBOOT --------------------
function checkWin() {
  if (Object.values(solved).every(v => v)) {
    finalBtn.disabled = false;
  }
}

finalBtn.onclick = () => {
  if (!Object.values(solved).every(v => v)) return;

  if (winSound) winSound.play();
  showScreen(winScreen);
};
