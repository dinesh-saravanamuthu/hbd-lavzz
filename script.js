// Personalise these two names before sharing the page.
const birthdayNames = {
    her: "My Dear Lavzz",
    you: "Your Future Husband"
};

const startButton = document.getElementById("startButton");
const letterButton = document.getElementById("letterButton");
const loveLetter = document.getElementById("loveLetter");
const heartsContainer = document.getElementById("hearts");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const birthdayHeading = document.getElementById("birthdayName");

if (birthdayHeading) {
    birthdayHeading.textContent = `${birthdayNames.her}!`;
}

startButton?.addEventListener("click", () => {
    document.getElementById("our-memories")?.scrollIntoView({ behavior: "smooth" });
    createHearts(12);
});

letterButton?.addEventListener("click", () => {
    const isOpening = loveLetter.hidden;
    loveLetter.hidden = !isOpening;
    letterButton.textContent = isOpening ? "Close my love letter 💕" : "Open my love letter 💌";
    letterButton.setAttribute("aria-expanded", String(isOpening));
    if (isOpening) {
        createHearts(8);
        loveLetter.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
});

// Mobile navigation: close after a link is selected or when Escape is pressed.
menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    mainNav.classList.toggle("is-open", !isOpen);
});

mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMobileMenu());
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
});

function closeMobileMenu() {
    if (!menuToggle || !mainNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mainNav.classList.remove("is-open");
}

function createHearts(count) {
    if (!heartsContainer) return;
    const emojis = ["💗", "💕", "♡", "💖", "♥"];

    for (let i = 0; i < count; i += 1) {
        const heart = document.createElement("span");
        heart.className = "heart";
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${16 + Math.random() * 20}px`;
        heart.style.animationDuration = `${3 + Math.random() * 4}s`;
        heartsContainer.appendChild(heart);
        heart.addEventListener("animationend", () => heart.remove(), { once: true });
    }
}

// A gentle occasional background heart, with a cap to keep mobile devices smooth.
function createBackgroundHeart() {
    if (!heartsContainer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (heartsContainer.childElementCount >= 12) return;

    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${15 + Math.random() * 15}px`;
    heart.style.animationDuration = `${5 + Math.random() * 4}s`;
    heartsContainer.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(createBackgroundHeart, 1400);
}


// Welcome-screen reveal.
const welcomeScreen = document.getElementById("welcomeScreen");
const welcomeName = document.getElementById("welcomeName");
const enterBirthday = document.getElementById("enterBirthday");
if (welcomeName) welcomeName.textContent = birthdayNames.her;
const musicToggle = document.getElementById("musicToggle");
const birthdayAudio = document.getElementById("birthdayAudio");

// Play your own MP3 in the background while she explores the birthday website.
if (birthdayAudio) {
  birthdayAudio.volume = 0.18;
  birthdayAudio.loop = true;
}

async function startBirthdayMusic() {
  if (!birthdayAudio) return;
  try {
    await birthdayAudio.play();
    if (musicToggle) {
      musicToggle.textContent = "♫ Music: On";
      musicToggle.setAttribute("aria-pressed", "true");
      musicToggle.setAttribute("aria-label", "Turn birthday music off");
    }
  } catch (error) {
    if (musicToggle) musicToggle.textContent = "♫ Tap to Play";
  }
}

function stopBirthdayMusic() {
  if (birthdayAudio) birthdayAudio.pause();
  if (musicToggle) {
    musicToggle.textContent = "♫ Music: Off";
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Turn birthday music on");
  }
}

musicToggle?.addEventListener("click", () => {
  if (!birthdayAudio) return;
  if (birthdayAudio.paused) startBirthdayMusic();
  else stopBirthdayMusic();
});

enterBirthday?.addEventListener("click", () => {
  welcomeScreen.classList.add("welcome-screen--leaving");
  document.body.classList.add("birthday-entered");
  document.getElementById("home")?.classList.add("birthday-reveal");
  createHearts(26);
  startBirthdayMusic();
  window.setTimeout(() => { welcomeScreen.hidden = true; }, 650);
});

// Interactive cake: tap flames to blow out candles.
const candles = [...document.querySelectorAll(".candle")];
const cakeStatus = document.getElementById("cakeStatus");
const cakeWishButton = document.getElementById("cakeWishButton");
const cakeWish = document.getElementById("cakeWish");
candles.forEach((candle, index) => {
  candle.addEventListener("click", () => {
    candle.classList.toggle("candle--out");
    const remaining = candles.filter(c => !c.classList.contains("candle--out")).length;
    if (cakeStatus) cakeStatus.textContent = remaining
      ? `${remaining} candle${remaining === 1 ? "" : "s"} still glowing. Make a wish! 🕯️`
      : "All the candles are out! Your wish is on its way. ✨";
    createHearts(4);
  });
});
cakeWishButton?.addEventListener("click", () => {
  candles.forEach(c => c.classList.add("candle--out"));
  if (cakeStatus) cakeStatus.textContent = "Wish made! Sending you a thousand kisses. 💋";
  if (cakeWish) cakeWish.hidden = false;
  cakeWishButton.textContent = "Wish sent with love 💖";
  cakeWishButton.disabled = true;
  createHearts(32);
});

// Missing personal photos get a graceful, attractive fallback instead of broken icons.
document.querySelectorAll(".photo-card img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.display = "none";
    const placeholder = document.createElement("div");
    placeholder.className = "photo-fallback";
    placeholder.innerHTML = '<span>♡</span><p>Our memory goes here</p><small>Add your photo to make this moment yours</small>';
    img.parentElement.insertBefore(placeholder, img.nextSibling);
  }, { once: true });
});
