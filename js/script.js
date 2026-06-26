// ===================== COUNTDOWN TIMER =====================

const now = new Date();
const targetDate = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const message = document.getElementById("countdownMessage");
const toggleBtn = document.getElementById("toggleBtn");

let countdownInterval = null;
let isRunning = false;

const pad = (num) => String(num).padStart(2, "0");

function updateCountdown() {
    const diff = targetDate - new Date();

    if (diff <= 0) {
        clearInterval(countdownInterval);
        isRunning = false;

        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";

        message.innerHTML = "Time's up! The event has started.";

        toggleBtn.disabled = true;
        toggleBtn.innerHTML = "Finished";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    days.innerHTML = pad(d);
    hours.innerHTML = pad(h);
    minutes.innerHTML = pad(m);
    seconds.innerHTML = pad(s);
}

function startCountdown() {
    if (isRunning) return;

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    isRunning = true;
    toggleBtn.innerHTML = "Pause";
}

function pauseCountdown() {
    clearInterval(countdownInterval);
    isRunning = false;
    toggleBtn.innerHTML = "Start";
}

toggleBtn.addEventListener("click", () => {
    if (isRunning) pauseCountdown();
    else startCountdown();
});

startCountdown();


// ===================== QUOTES SLIDER =====================

const quotes = [
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Do not wait for opportunity. Create it.", author: "George Bernard Shaw" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" }
];

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const dotsContainer = document.getElementById("quoteDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let quoteIndex = 0;
let quoteInterval = null;
const quoteIntervalMS = 4000;

for (let i = 0; i < quotes.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dotsContainer.appendChild(dot);
}

const dots = dotsContainer.querySelectorAll(".dot");

function renderQuote(index) {
    quoteText.classList.add("fade");
    quoteAuthor.classList.add("fade");

    setTimeout(() => {
        quoteText.innerHTML = `“${quotes[index].text}”`;
        quoteAuthor.innerHTML = `— ${quotes[index].author}`;

        quoteText.classList.remove("fade");
        quoteAuthor.classList.remove("fade");
    }, 180);

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

function nextQuote() {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    renderQuote(quoteIndex);
}

function prevQuote() {
    quoteIndex = (quoteIndex - 1 + quotes.length) % quotes.length;
    renderQuote(quoteIndex);
}

function startQuoteAutoSlide() {
    quoteInterval = setInterval(nextQuote, quoteIntervalMS);
}

function restartQuoteAutoSlide() {
    clearInterval(quoteInterval);
    startQuoteAutoSlide();
}

nextBtn.addEventListener("click", () => {
    nextQuote();
    restartQuoteAutoSlide();
});

prevBtn.addEventListener("click", () => {
    prevQuote();
    restartQuoteAutoSlide();
});

renderQuote(quoteIndex);
startQuoteAutoSlide();


// ===================== MODAL POPUP =====================

const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

setTimeout(() => {
    modalOverlay.classList.add("visible");
}, 5000);

function closeModal() {
    modalOverlay.classList.remove("visible");
}

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});