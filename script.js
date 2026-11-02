// ==========================================
// BIRTHDAY MAGIC - JAVASCRIPT
// ==========================================

const $ = (id) => document.getElementById(id);

// Main elements
const nameInput = $("nameInput");
const messageInput = $("messageInput");

const heroName = $("heroName");
const photoName = $("photoName");
const surpriseName = $("surpriseName");

const heroPhoto = $("heroPhoto");
const mainPhotoInput = $("mainPhotoInput");

const galleryInput = $("galleryInput");
const memoryGallery = $("memoryGallery");

const birthdayMessage = $("birthdayMessage");
const surpriseText = $("surpriseText");

const formMessage = $("formMessage");
const surpriseModal = $("surpriseModal");

const birthdayMusic = $("birthdayMusic");
const musicInput = $("musicInput");
const musicButton = $("musicButton");

const defaultName = "My Favourite Person!";

const defaultMessage =
    "May your birthday bring you a thousand reasons to smile, " +
    "a heart full of happiness, and dreams that turn into reality. " +
    "May this new chapter of your life be the most beautiful one yet. " +
    "You deserve all the love and joy in the world! 💖";


// ==========================================
// UPDATE NAME AND BIRTHDAY MESSAGE
// ==========================================

function updateBirthdayDetails() {
    const name = nameInput.value.trim() || defaultName;

    const message = messageInput.value.trim() || defaultMessage;

    heroName.textContent = name;
    photoName.textContent = name;
    surpriseName.textContent = name;

    birthdayMessage.textContent = message;
    surpriseText.textContent = message;
}

nameInput.addEventListener("input", updateBirthdayDetails);

messageInput.addEventListener("input", updateBirthdayDetails);


// ==========================================
// MAIN BIRTHDAY PHOTO
// ==========================================

let mainPhotoURL = null;

mainPhotoInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        formMessage.textContent = "Please select a valid image.";
        this.value = "";
        return;
    }

    if (mainPhotoURL) {
        URL.revokeObjectURL(mainPhotoURL);
    }

    mainPhotoURL = URL.createObjectURL(file);

    heroPhoto.src = mainPhotoURL;

    formMessage.textContent = "Main birthday photo updated! 💖";
});


// ==========================================
// ADD PHOTOS TO MEMORY GALLERY
// ==========================================

// Six memory cards already exist in index.html.
// Newly selected photos will be added after those cards.

let selectedPhotos = [];

const MAX_EXTRA_PHOTOS = 12;

function addMemoryCard(photo) {
    const column = document.createElement("div");

    column.className = "col-md-6 col-lg-4";

    const card = document.createElement("article");

    card.className = "memory-card";

    const imageContainer = document.createElement("div");

    imageContainer.className = "memory-image";

    const image = document.createElement("img");

    image.src = photo.url;
    image.alt = photo.file.name || "Birthday memory";
    image.loading = "lazy";

    const number = document.createElement("span");

    number.className = "memory-number";
    number.textContent = String(
        memoryGallery.children.length + 1
    ).padStart(2, "0");

    imageContainer.append(image, number);

    const content = document.createElement("div");

    content.className = "memory-content";

    const category = document.createElement("span");

    category.className = "memory-category";
    category.textContent = "YOUR SPECIAL MEMORY";

    const title = document.createElement("h3");

    title.textContent = photo.file.name.replace(/\.[^.]+$/, "");

    const description = document.createElement("p");

    description.textContent = "A beautiful moment to remember. 💖";

    content.append(category, title, description);

    card.append(imageContainer, content);

    column.appendChild(card);

    memoryGallery.appendChild(column);

    photo.column = column;
}

galleryInput.addEventListener("change", function () {
    const files = Array.from(this.files);

    const remaining = MAX_EXTRA_PHOTOS - selectedPhotos.length;

    const validFiles = files.filter(
        file => file.type.startsWith("image/")
    );

    if (validFiles.length === 0) {
        formMessage.textContent = "Please select image files.";
        this.value = "";
        return;
    }

    const filesToAdd = validFiles.slice(0, remaining);

    filesToAdd.forEach(function (file) {
        const photo = {
            file: file,
            url: URL.createObjectURL(file),
            column: null
        };

        selectedPhotos.push(photo);

        addMemoryCard(photo);
    });

    if (validFiles.length > remaining) {
        formMessage.textContent =
            `Added ${filesToAdd.length} photos. ` +
            "The extra-photo limit is 12.";
    } else {
        formMessage.textContent =
            `${filesToAdd.length} new memory photo(s) added! 📸`;
    }

    // Permit choosing the same file again.
    this.value = "";
});


// ==========================================
// APPLY PERSONALIZATION
// ==========================================

$("applyButton").addEventListener("click", function () {
    updateBirthdayDetails();

    if (!nameInput.value.trim()) {
        formMessage.textContent =
            "Please enter the birthday person's name.";

        nameInput.focus();

        return;
    }

    formMessage.textContent =
        "Your personalized birthday surprise is ready! 🎉";

    launchConfetti();

    $("birthdayWish").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});


// ==========================================
// SURPRISE POPUP
// ==========================================

function openSurprise() {
    updateBirthdayDetails();

    surpriseModal.classList.add("show");

    surpriseModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    $("closeModal").focus();

    launchConfetti();
}

function closeSurprise() {
    surpriseModal.classList.remove("show");

    surpriseModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    $("surpriseButton").focus();
}

$("surpriseButton").addEventListener("click", openSurprise);

$("celebrateButton").addEventListener("click", openSurprise);

$("closeModal").addEventListener("click", closeSurprise);

surpriseModal.addEventListener("click", function (event) {
    if (event.target === surpriseModal) {
        closeSurprise();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && surpriseModal.classList.contains("show")) {
        closeSurprise();
    }
});

$("confettiButton").addEventListener("click", launchConfetti);


// ==========================================
// BACKGROUND MUSIC
// ==========================================

let musicURL = null;

musicInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("audio/")) {
        formMessage.textContent = "Please select an audio file.";
        this.value = "";
        return;
    }

    if (musicURL) {
        URL.revokeObjectURL(musicURL);
    }

    musicURL = URL.createObjectURL(file);

    birthdayMusic.src = musicURL;

    birthdayMusic.load();

    formMessage.textContent =
        "Birthday music is ready. Click Play / Pause Music.";

    this.value = "";
});

musicButton.addEventListener("click", async function () {
    if (!birthdayMusic.src) {
        musicInput.click();
        return;
    }

    try {
        if (birthdayMusic.paused) {
            await birthdayMusic.play();

            musicButton.innerHTML =
                '<i class="bi bi-pause-circle-fill"></i> Pause Music';
        } else {
            birthdayMusic.pause();

            musicButton.innerHTML =
                '<i class="bi bi-music-note-beamed"></i> Play Music';
        }
    } catch {
        formMessage.textContent =
            "Music could not be played. Please select another audio file.";
    }
});

birthdayMusic.addEventListener("pause", function () {
    musicButton.innerHTML =
        '<i class="bi bi-music-note-beamed"></i> Play Music';
});

birthdayMusic.addEventListener("play", function () {
    musicButton.innerHTML =
        '<i class="bi bi-pause-circle-fill"></i> Pause Music';
});


// ==========================================
// FLOATING HEARTS AND BALLOONS
// ==========================================

const floatingElements = $("floatingElements");

const symbols = ["💖", "💕", "🎈", "✨", "🌸", "💗"];

function createFloatingElement() {
    const element = document.createElement("span");

    element.className = "float-item";

    element.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    element.style.left = Math.random() * 100 + "vw";

    element.style.fontSize = 14 + Math.random() * 20 + "px";

    const duration = 9 + Math.random() * 8;

    element.style.animationDuration = duration + "s";

    floatingElements.appendChild(element);

    setTimeout(function () {
        element.remove();
    }, duration * 1000);
}

for (let i = 0; i < 12; i++) {
    setTimeout(createFloatingElement, i * 300);
}

setInterval(createFloatingElement, 1000);


// ==========================================
// CONFETTI ANIMATION
// ==========================================

const canvas = $("confettiCanvas");

const ctx = canvas.getContext("2d");

let confettiPieces = [];

let animationFrame = null;

function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * ratio;

    canvas.height = window.innerHeight * ratio;

    canvas.style.width = window.innerWidth + "px";

    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function launchConfetti() {
    const colors = [
        "#ff4d91",
        "#a855f7",
        "#ffd166",
        "#06d6a0",
        "#ff85a1",
        "#7c83fd"
    ];

    confettiPieces = [];

    for (let i = 0; i < 180; i++) {
        confettiPieces.push({
            x: Math.random() * window.innerWidth,

            y: -Math.random() * window.innerHeight,

            size: 4 + Math.random() * 6,

            speed: 2 + Math.random() * 5,

            drift: Math.random() * 4 - 2,

            rotation: Math.random() * 360,

            spin: Math.random() * 10 - 5,

            color: colors[
                Math.floor(Math.random() * colors.length)
            ]
        });
    }

    if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
    }

    animateConfetti();
}

function animateConfetti() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    confettiPieces.forEach(function (piece) {
        piece.y += piece.speed;

        piece.x += piece.drift;

        piece.rotation += piece.spin;

        ctx.save();

        ctx.translate(piece.x, piece.y);

        ctx.rotate(piece.rotation * Math.PI / 180);

        ctx.fillStyle = piece.color;

        ctx.fillRect(
            -piece.size / 2,
            -piece.size / 2,
            piece.size,
            piece.size * 0.7
        );

        ctx.restore();
    });

    confettiPieces = confettiPieces.filter(
        piece => piece.y < window.innerHeight + 20
    );

    if (confettiPieces.length > 0) {
        animationFrame = requestAnimationFrame(animateConfetti);
    } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        animationFrame = null;
    }
}


// ==========================================
// INITIALIZE
// ==========================================

updateBirthdayDetails();

console.log("Birthday Magic website is ready! 🎂");