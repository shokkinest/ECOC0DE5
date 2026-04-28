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
  lvl1: "CANOPY",
  lvl2: "FLOW",
  lvl3: "20130",
  lvl4: "2050",
  lvl5: "458" // New 5th level code
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
  inputs[lvl].addEventListener("keydown", (e) => {
    // Check if the user pressed the Enter key
    if (e.key === "Enter") {
      let value = e.target.value.trim().toUpperCase(); // Allow letters and make case-insensitive

      if (value === codes[lvl].toUpperCase()) {
        // SUCCESS
        circles[lvl].classList.remove("red");
        circles[lvl].classList.add("green");
        solved[lvl] = true;
        inputs[lvl].disabled = true;

        if (successSound) successSound.play();
        checkWin();
      } else {
        // ERROR - Triggered only on Enter
        circles[lvl].classList.add("red");
        if (errorSound) errorSound.play();
        
        // Optional: Remove red after 1 second so they can try again
        setTimeout(() => {
          circles[lvl].classList.remove("red");
        }, 1000);
      }
    }
  });

  // Remove the old 'input' listener that was blocking letters
  inputs[lvl].oninput = null; 
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
