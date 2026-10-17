// Personalise these two names before sharing the page.
const birthdayNames = {
    her: "My Dear Lavzz",
    you: "Your Future Husband"
};

const startButton = document.getElementById("startButton");
const letterButton = document.getElementById("letterButton");
const loveLetter = document.getElementById("loveLetter");
const wishButton = document.getElementById("wishButton");
const wishMessage = document.getElementById("wishMessage");
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

wishButton?.addEventListener("click", () => {
    wishMessage.hidden = false;
    wishButton.textContent = "Wish sent with love 💖";
    wishButton.disabled = true;
    createHearts(28);
    wishMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

const notes = [
    {
        title: "When you miss me ❤️",
        message: "Close your eyes for a moment and imagine me holding your hand. No matter how far apart we are, you always have a special place in my heart. I'm only a thought away, my love."
    },
    {
        title: "When you feel sad 🫂",
        message: "You don't have to be strong every moment. I'm here to listen, to support you, and to remind you how amazing you are. We will face the difficult days together."
    },
    {
        title: "On your birthday 🎂",
        message: "Today is all about celebrating YOU. Your smile, your kindness, your dreams, and everything that makes you special. I hope this year brings you so many reasons to smile."
    },
    {
        title: "For our future 💍",
        message: "I get excited thinking about all the beautiful moments waiting for us. Our engagement is just one of the special chapters ahead. I look forward to building a future filled with love, laughter, understanding, and countless memories with you."
    }
];

const noteCards = document.querySelectorAll(".note-card");
const noteReveal = document.getElementById("noteReveal");
const noteRevealTitle = document.getElementById("noteRevealTitle");
const noteRevealText = document.getElementById("noteRevealText");
const closeNote = document.getElementById("closeNote");

noteCards.forEach((card) => {
    card.addEventListener("click", () => {
        const selectedNote = notes[Number(card.dataset.note)];
        if (!selectedNote) return;

        noteRevealTitle.textContent = selectedNote.title;
        noteRevealText.textContent = selectedNote.message;
        noteReveal.hidden = false;
        noteCards.forEach((item) => item.setAttribute("aria-expanded", String(item === card)));
        createHearts(6);
        noteReveal.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
});

closeNote?.addEventListener("click", () => {
    noteReveal.hidden = true;
    noteCards.forEach((card) => card.setAttribute("aria-expanded", "false"));
});

const unlockSecret = document.getElementById("unlockSecret");
const secretLock = document.getElementById("secretLock");
const secretMessage = document.getElementById("secretMessage");
const celebrateAgain = document.getElementById("celebrateAgain");

unlockSecret?.addEventListener("click", () => {
    secretLock.hidden = true;
    secretMessage.hidden = false;
    createHearts(30);
    secretMessage.scrollIntoView({ behavior: "smooth", block: "center" });
});

celebrateAgain?.addEventListener("click", () => createHearts(40));

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
enterBirthday?.addEventListener("click", () => {
  welcomeScreen.classList.add("welcome-screen--leaving");
  document.body.classList.add("birthday-entered");
  createHearts(26);
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

// A lighthearted quiz. Correct answers are intentionally affectionate rather than factual.
const quizQuestions = [
  { q: "What's my favourite thing about you?", options: ["Your smile 😊", "Your heart 💗", "Everything about you ✨"], correct: 2, feedback: "Correct answer: ALL OF YOU. No contest. 💖" },
  { q: "What kind of future do I dream about?", options: ["A fancy holiday only ✈️", "A lifetime of little moments with you 🏡", "Being famous 🌟"], correct: 1, feedback: "Yes! The ordinary days are special when they're with you. 🫶" },
  { q: "What's your official birthday title?", options: ["My favourite human 👑", "The boss of snacks 🍰", "All of the above 😌"], correct: 2, feedback: "Obviously all of the above. Birthday rules! 🎀" },
  { q: "Who gets to love you for a very long time?", options: ["Your future husband 💍", "Your biggest cheerleader 📣", "Both — that's me! 💗"], correct: 2, feedback: "That's right. Your future husband and forever teammate. 💍❤️" }
];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizCount = document.getElementById("quizCount");
const quizProgress = document.getElementById("quizProgress");
const quizFeedback = document.getElementById("quizFeedback");
const quizNext = document.getElementById("quizNext");

function renderQuiz() {
  const item = quizQuestions[quizIndex];
  if (!item || !quizQuestion || !quizOptions) return;
  quizAnswered = false;
  quizCount.textContent = `QUESTION ${quizIndex + 1} OF ${quizQuestions.length}`;
  quizQuestion.textContent = item.q;
  quizProgress.style.width = `${(quizIndex / quizQuestions.length) * 100}%`;
  quizFeedback.textContent = "";
  quizNext.hidden = true;
  quizNext.textContent = quizIndex === quizQuestions.length - 1 ? "See my result 💗" : "Next question →";
  quizOptions.innerHTML = "";
  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => {
      if (quizAnswered) return;
      quizAnswered = true;
      if (index === item.correct) quizScore += 1;
      [...quizOptions.children].forEach((b, i) => {
        b.disabled = true;
        if (i === item.correct) b.classList.add("quiz-option--correct");
        else if (i === index) b.classList.add("quiz-option--chosen");
      });
      quizFeedback.textContent = item.feedback;
      quizProgress.style.width = `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
      quizNext.hidden = false;
      createHearts(5);
    });
    quizOptions.appendChild(button);
  });
}
renderQuiz();
quizNext?.addEventListener("click", () => {
  if (quizIndex < quizQuestions.length - 1) {
    quizIndex += 1;
    renderQuiz();
  } else {
    quizCount.textContent = "LOVE QUIZ COMPLETE";
    quizQuestion.textContent = "Your score doesn't matter…";
    quizOptions.innerHTML = "";
    quizFeedback.textContent = "Because you already won my heart. You get 1000/10 for being you. 💗";
    quizProgress.style.width = "100%";
    quizNext.hidden = false;
    quizNext.textContent = "Play again ↻";
    quizNext.onclick = () => {
      quizIndex = 0; quizScore = 0; quizNext.onclick = null; renderQuiz();
    };
    createHearts(20);
  }
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
