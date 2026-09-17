// State management
let currentPage = 1;
const totalPages = 5;
let selectedMood = null;
let lampIsOn = true;
let audioContext = null;
let isPlayingAudio = false;
let musicInterval = null;

// Mood data & response messages
const moodReactions = {
  capek: {
    tag: "Capek Banget 🥺",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: "fa-battery-quarter text-orange-500",
    message: "Pasti hari ini kamu kerja padet banget ya? istirahat ya sayang, terima kasih ya udah jadi perempuan yang tangguh buat aku, aku sayang kamu. ❤️"
  },
  biasa: {
    tag: "Biasa Aja 🍃",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: "fa-leaf text-emerald-500",
    message: "alhamdulilah sayang harimu lancar, semoga kedepannya makin lancar lagi ya, istirahat ya sayang love you mwahhh ❤️"
  },
  seneng: {
    tag: "Seneng Banget! ✨",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: "fa-face-laugh-beam text-amber-500",
    message: "Yeay IKUT SENENG KALO KAMU SENENG, Semoga besok kamu bangun dengan mood yang happy, Mett bobo Sayangg akuhh  ❤️"
  },
  kangen: {
    tag: "Kangen Kamu 🤍",
    color: "bg-rose-100 text-rose-800 border-rose-200",
    icon: "fa-heart text-rose-500",
    message: "Aku juga kangen kamu sayang ❤️, bobo ya sayang biar besok bisa quality time sama aku lagi, ihh jadi salting 😁❤️"
  }
};

function getPageHtml(pageNum) {
  switch (pageNum) {
    case 1:
      return `
        <div class="text-center py-2 sm:py-4 flex flex-col items-center animate-fadeIn">
          <div class="washi-tape w-24 sm:w-28 h-4 sm:h-5 -top-3 sm:-top-4 mx-auto left-0 right-0"></div>
          
          <!-- Cute Moon Illustration Icon -->
          <div class="relative mb-4 sm:mb-6">
            <div class="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-300 via-amber-200 to-amber-100 flex items-center justify-center shadow-lg shadow-amber-300/30 animate-float-slow">
              <i class="fa-solid fa-moon text-3xl sm:text-5xl text-amber-700/80"></i>
            </div>
            <span class="absolute -top-1 -right-2 text-lg sm:text-xl animate-spin" style="animation-duration: 8s;">✨</span>
            <span class="absolute bottom-1 -left-2 text-sm sm:text-base">☁️</span>
          </div>

          <span class="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-amber-800/80 bg-amber-100/80 px-2.5 sm:px-3 py-1 rounded-full border border-amber-300/40 mb-2 sm:mb-3">
            Sedikit hadiah untuk kamu
          </span>

          <h1 class="font-serif-title text-2xl sm:text-4xl text-stone-800 font-bold mb-2 sm:mb-3 tracking-tight">
           Menjelang Tidur 
          </h1>

          <p class="font-handwriting text-xl sm:text-3xl text-stone-600 mb-3 sm:mb-4 max-w-md mx-auto leading-tight px-2">
            "Ada setumpuk apresiasi yang ingin aku sampaikan, dibaca ya sayang ku ❤️"
          </p>

          <div class="w-16 h-0.5 bg-amber-700/20 my-2"></div>
          <p class="text-xs sm:text-sm text-stone-500 italic">
            pencet tombol dibawah untuk halam selanjutnya
          </p>
        </div>
      `;

    case 2:
      return `
        <div class="py-1 sm:py-2 animate-fadeIn">
          <div class="flex items-center justify-between mb-3 sm:mb-4 border-b border-stone-200 pb-2">
            <span class="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-stone-500">Lembar 01 / Check-in</span>
            <span class="font-handwriting text-lg sm:text-xl text-rose-500">gimana harimu?</span>
          </div>

          <h2 class="font-serif-title text-xl sm:text-3xl text-stone-800 font-bold mb-1">
            Gimana harimu hari ini sayang?
          </h2>
          <p class="text-stone-600 text-xs sm:text-sm mb-3 sm:mb-5">
            Pilih salah satu ya: 
          </p>

          <!-- Mood Options Grid -->
          <div class="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-5">
            <button onclick="pickMood('capek')" class="mood-btn p-2.5 sm:p-3.5 rounded-2xl border-2 transition-all flex items-center gap-2 sm:gap-2.5 text-left text-xs sm:text-sm font-semibold active:scale-95 touch-manipulation ${selectedMood === 'capek' ? 'border-orange-500 bg-orange-50 shadow' : 'border-stone-200 hover:border-orange-300 bg-white'}">
              <i class="fa-solid fa-battery-quarter text-base sm:text-lg text-orange-500 shrink-0"></i>
              <span class="truncate">Capek Banget</span>
            </button>
            <button onclick="pickMood('biasa')" class="mood-btn p-2.5 sm:p-3.5 rounded-2xl border-2 transition-all flex items-center gap-2 sm:gap-2.5 text-left text-xs sm:text-sm font-semibold active:scale-95 touch-manipulation ${selectedMood === 'biasa' ? 'border-emerald-500 bg-emerald-50 shadow' : 'border-stone-200 hover:border-emerald-300 bg-white'}">
              <i class="fa-solid fa-leaf text-base sm:text-lg text-emerald-500 shrink-0"></i>
              <span class="truncate">Biasa Aja</span>
            </button>
            <button onclick="pickMood('seneng')" class="mood-btn p-2.5 sm:p-3.5 rounded-2xl border-2 transition-all flex items-center gap-2 sm:gap-2.5 text-left text-xs sm:text-sm font-semibold active:scale-95 touch-manipulation ${selectedMood === 'seneng' ? 'border-amber-500 bg-amber-50 shadow' : 'border-stone-200 hover:border-amber-300 bg-white'}">
              <i class="fa-solid fa-face-laugh-beam text-base sm:text-lg text-amber-500 shrink-0"></i>
              <span class="truncate">Seneng Banget</span>
            </button>
            <button onclick="pickMood('kangen')" class="mood-btn p-2.5 sm:p-3.5 rounded-2xl border-2 transition-all flex items-center gap-2 sm:gap-2.5 text-left text-xs sm:text-sm font-semibold active:scale-95 touch-manipulation ${selectedMood === 'kangen' ? 'border-rose-500 bg-rose-50 shadow' : 'border-stone-200 hover:border-rose-300 bg-white'}">
              <i class="fa-solid fa-heart text-base sm:text-lg text-rose-500 shrink-0"></i>
              <span class="truncate">Kangen Kamu</span>
            </button>
          </div>

          <!-- Reassurance Card Box -->
          <div id="moodReactionBox" class="p-3 sm:p-5 rounded-2xl border transition-all duration-500 min-h-[90px] sm:min-h-[110px] flex items-center ${selectedMood ? moodReactions[selectedMood].color : 'bg-stone-50 border-dashed border-stone-300'}">
            ${selectedMood ? `
              <div>
                <div class="flex items-center gap-1.5 sm:gap-2 mb-1">
                  <i class="fa-solid ${moodReactions[selectedMood].icon}"></i>
                  <strong class="text-[10px] sm:text-xs uppercase tracking-wide">Pesan untukmu:</strong>
                </div>
                <p class="font-handwriting text-lg sm:text-2xl leading-snug">
                  "${moodReactions[selectedMood].message}"
                </p>
              </div>
            ` : `
              <p class="text-stone-400 text-xs sm:text-sm italic text-center w-full">
                Sekarang kondisimu kamu lagi seperti apa sayang? 
              </p>
            `}
          </div>
        </div>
      `;

    case 3:
      return `
        <div class="py-1 sm:py-2 animate-fadeIn">
          <div class="flex items-center justify-between mb-2 sm:mb-3 border-b border-stone-200 pb-2">
            <span class="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-stone-500">Lembar 02 / Kenangan & Syukur</span>
            <span class="font-handwriting text-lg sm:text-xl text-amber-700">hal manis hari ini</span>
          </div>

          <h2 class="font-serif-title text-xl sm:text-3xl text-stone-800 font-bold mb-2 sm:mb-3">
            Potret & Hal yang Disyukuri
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-center">
            <!-- Polaroid Left -->
            <div class="polaroid-card p-2.5 sm:p-3 rounded-xl rotate-[-1deg] sm:rotate-[-2deg] border border-stone-200 relative group cursor-pointer active:scale-95 touch-manipulation" onclick="createBurst(event)">
              <div class="washi-tape w-14 sm:w-16 h-3.5 sm:h-4 -top-2 left-6 sm:left-8 rotate-3"></div>
              <div class="h-50 sm:h-50 rounded-lg overflow-hidden bg-stone-100 flex items-center justify-center relative">
                <img src="fotodappa3.jpeg" alt="Momen Senja Hangat" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[9px] sm:text-[10px] backdrop-blur-sm">Klik untuk cinta 💖</span>
              </div>
              <div class="pt-2 sm:pt-3 pb-0.5 sm:pb-1 text-center font-handwriting text-xl sm:text-2xl text-stone-700">
                "Dari Aku. Untukmu sayangku"
              </div>
            </div>

            <!-- Sticky Notes Right -->
            <div class="space-y-2.5 sm:space-y-3">
              <div class="bg-[#fef9c3] p-3 sm:p-3.5 rounded-xl border border-yellow-200 shadow-sm rotate-[1deg] relative">
                <span class="absolute -top-2 right-4 text-xs">📌</span>
                <h4 class="font-bold text-[10px] sm:text-xs text-yellow-900 uppercase mb-0.5">Catatan Apresiasi</h4>
                <p class="font-handwriting text-lg sm:text-xl text-stone-800 leading-snug">
                  Terima kasih sudah tertawa dan ngobrol sama aku ya sayang ❤️, kamu hebat sudah sampai di titik ini .
                </p>
              </div>

              <div class="bg-[#e0f2fe] p-3 sm:p-3.5 rounded-xl border border-sky-200 shadow-sm rotate-[-1deg] relative">
                <span class="absolute -top-2 left-4 text-xs">📎</span>
                <h4 class="font-bold text-[10px] sm:text-xs text-sky-900 uppercase mb-0.5">Catatan Malam</h4>
                <p class="font-handwriting text-lg sm:text-xl text-stone-800 leading-snug">
                  Maaf ya malam ini aku gabisa nemenin kamu ngobrol, bobo ya sayang jangan terlalu mikirn semua hal yang menggangumu 
                </p>
              </div>
            </div>
          </div>
        </div>
      `;

    case 4:
      return `
        <div class="py-1 sm:py-2 animate-fadeIn text-center flex flex-col items-center">
          <div class="w-full flex items-center justify-between mb-3 sm:mb-4 border-b border-stone-200 pb-2">
            <span class="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-stone-500">Lembar 03 / Waktu Rehat</span>
            <span class="font-handwriting text-lg sm:text-xl text-indigo-700">lampu tidur</span>
          </div>

          <h2 class="font-serif-title text-xl sm:text-3xl text-stone-800 font-bold mb-1.5 sm:mb-2">
            Matikan lampu kos?
          </h2>

          <p class="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mb-4 sm:mb-6 px-2">
            sekarang udah malem sayang, bobo ya jangan lupa cuci kaki dan sikat gigi ya hihihi 
          </p>

          <!-- Interactive Bedside Lamp Switch -->
          <div class="bg-amber-50 p-4 sm:p-6 rounded-3xl border-2 border-amber-200 shadow-inner max-w-[250px] sm:max-w-xs w-full flex flex-col items-center gap-3 sm:gap-4">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-100 flex items-center justify-center text-2xl sm:text-3xl text-amber-500 shadow-sm">
              <i class="fa-solid fa-lightbulb"></i>
            </div>

            <button onclick="toggleBedsideLamp(true)" class="w-full py-2.5 sm:py-3 px-4 sm:px-5 rounded-2xl bg-stone-900 text-amber-100 hover:bg-stone-800 active:scale-95 transition-all shadow font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 min-h-[44px] touch-manipulation">
              <i class="fa-solid fa-power-off text-xs text-amber-400"></i>
              <span>Matikan Lampu kamar kos</span>
            </button>
          </div>

          <p class="mt-3 sm:mt-4 font-handwriting text-lg sm:text-xl text-stone-500">
            (pencet tombol nya sayang )
          </p>
        </div>
      `;

    case 5:
      return `
        <div class="text-center py-1 sm:py-2 animate-fadeIn flex flex-col items-center">
          <div class="w-full flex items-center justify-between mb-2 sm:mb-3 border-b border-stone-200 pb-2">
            <span class="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-stone-500">Lembar Terakhir / Pelukan Hangat</span>
            <span class="font-handwriting text-lg sm:text-xl text-rose-600">goodnight lovely</span>
          </div>

          <!-- Big Heart / Hug Button -->
          <div class="relative my-1 sm:my-2">
            <button onclick="sendVirtualHug(event)" class="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex flex-col items-center justify-center shadow-xl shadow-rose-300/50 hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation">
              <i class="fa-solid fa-heart text-3xl sm:text-4xl mb-0.5 sm:mb-1 animate-pulse"></i>
              <span class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">Kirim Peluk</span>
            </button>
            <div class="washi-tape washi-tape-pink w-16 sm:w-20 h-3.5 sm:h-4 -top-2 -right-3 rotate-12"></div>
          </div>

          <h2 class="font-serif-title text-xl sm:text-3xl text-stone-800 font-bold mt-2 sm:mt-3 mb-1.5 sm:mb-2">
            Good Night, My Prettiest GF ❤️
          </h2>

          <p class="font-handwriting text-xl sm:text-3xl text-stone-700 max-w-lg leading-relaxed mb-3 sm:mb-4 px-2">
            have a nice dream ya sayang, Sleep well, Semoga lelahmu hari ini hilang dalam mimpi yang indah ya, maaf ya kalo aku selalu membuatmu merasa bersalah sayang, aku sayang kamu dan akan selalu jadi yang terbaik di mata aku 😊❤️
          </p>

          <!-- Final mini badges -->
          <div class="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            <span class="px-2.5 sm:px-3 py-1 bg-rose-50 border border-rose-200 rounded-full text-rose-700 text-[11px] sm:text-xs font-medium">
              🤍 Doa terbaik untuk kamu
            </span>
            <span class="px-2.5 sm:px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-[11px] sm:text-xs font-medium">
              🌙 Tidur yang nyenyak
            </span>
            <span class="px-2.5 sm:px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-700 text-[11px] sm:text-xs font-medium">
              🛌 Istirahat yang cukup
            </span>
          </div>

          <p class="text-[10px] sm:text-[11px] text-stone-400 mt-3 sm:mt-4">
            Klik tombol "Kirim Peluk" Jika kamu sangat mencintaiku 😁
          </p>
        </div>
      `;

    default:
      return '';
  }
}

function renderPage() {
  const content = document.getElementById('pageContentArea');
  content.innerHTML = getPageHtml(currentPage);

  document.getElementById('currentPageNum').innerText = currentPage;

  // Update Prev Button
  const prevBtn = document.getElementById('prevBtn');
  if (currentPage === 1) {
    prevBtn.classList.add('opacity-0', 'pointer-events-none');
  } else {
    prevBtn.classList.remove('opacity-0', 'pointer-events-none');
  }

  // Update Next Button & Hints
  const nextBtnText = document.getElementById('nextBtnText');
  const nextBtnIcon = document.getElementById('nextBtnIcon');
  const stepMiniHint = document.getElementById('stepMiniHint');

  if (currentPage === 1) {
    nextBtnText.innerText = "Buka Buku 🌙";
    if (stepMiniHint) stepMiniHint.innerText = "Buka lembaran pertama";
  } else if (currentPage === totalPages) {
    nextBtnText.innerText = "Ulangi Catatan 🔄";
    nextBtnIcon.className = "fa-solid fa-rotate-right text-xs";
    if (stepMiniHint) stepMiniHint.innerText = "Mimpi indah ya!";
  } else {
    nextBtnText.innerText = "Lanjut 📖";
    nextBtnIcon.className = "fa-solid fa-arrow-right text-xs";
    if (stepMiniHint) stepMiniHint.innerText = `Halaman ${currentPage} dari ${totalPages}`;
  }
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
  } else {
    currentPage = 1;
  }
  renderPage();
  triggerPageFlipEffect();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
    triggerPageFlipEffect();
  }
}

function triggerPageFlipEffect() {
  const book = document.getElementById('scrapbookBook');
  book.classList.add('scale-[0.98]');
  setTimeout(() => {
    book.classList.remove('scale-[0.98]');
  }, 180);
}

// Mood picker handler
function pickMood(mood) {
  selectedMood = mood;
  renderPage();
  playChimeNote(440, 0.2); // sweet soft bell sound
}

function toggleBedsideLamp(turnOff) {
  const dimmer = document.getElementById('bedsideDimmer');
  const dimmerContent = document.getElementById('dimmerContent');

  if (turnOff) {
    lampIsOn = false;
    dimmer.classList.remove('pointer-events-none');
    dimmer.classList.remove('opacity-0');
    dimmer.classList.add('opacity-100');
    setTimeout(() => {
      dimmerContent.classList.remove('opacity-0', 'translate-y-6');
    }, 200);
    playChimeNote(220, 0.4);
  } else {
    lampIsOn = true;
    dimmerContent.classList.add('opacity-0', 'translate-y-6');
    setTimeout(() => {
      dimmer.classList.remove('opacity-100');
      dimmer.classList.add('opacity-0', 'pointer-events-none');
    }, 300);
    playChimeNote(523.25, 0.2);
  }
}

function sendVirtualHug(event) {
  playChimeNote(587.33, 0.3);
  setTimeout(() => playChimeNote(880, 0.4), 120);

  const burst = document.getElementById('burstContainer');
  const emojis = ['💖', '✨', '🌸', '🧸', '🌙', '💤', '🤍'];

  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'absolute text-2xl sm:text-3xl select-none transition-all duration-1000 ease-out pointer-events-none';
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    // Start from center or button
    const startX = event ? event.clientX : window.innerWidth / 2;
    const startY = event ? event.clientY : window.innerHeight / 2;

    el.style.left = `${startX}px`;
    el.style.top = `${startY}px`;
    burst.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 180;
    const destX = startX + Math.cos(angle) * distance;
    const destY = startY + Math.sin(angle) * distance - 80;

    setTimeout(() => {
      el.style.transform = `translate(${destX - startX}px, ${destY - startY}px) scale(1.4) rotate(${Math.random() * 40 - 20}deg)`;
      el.style.opacity = '0';
    }, 20);

    setTimeout(() => {
      el.remove();
    }, 1100);
  }
}

function createBurst(event) {
  sendVirtualHug(event);
}

function initAudioContext() {
  if (!audioContext) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

function playChimeNote(frequency, duration = 0.5) {
  try {
    initAudioContext();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, audioContext.currentTime);

    gain.gain.setValueAtTime(0.001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + duration);
  } catch (e) {
    console.log("Audio not allowed yet without user interaction");
  }
}

function toggleAudio() {
  const bgAudio = document.getElementById('bgAudio');
  const audioBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioIcon');
  const audioText = document.getElementById('audioText');

  if (!bgAudio) return;

  if (!isPlayingAudio) {
    bgAudio.play().then(() => {
      isPlayingAudio = true;
      audioBtn.classList.add('bg-amber-400/20', 'border-amber-300');
      audioIcon.className = "fa-solid fa-volume-high text-amber-300 animate-pulse";
      audioText.innerText = "Memutar Lagu...";
    }).catch((err) => {
      console.warn("Audio play failed:", err);
      alert("⚠️ File musik 'Lofi-MP3.mp3' belum ditemukan di folder ini.");
    });
  } else {
    bgAudio.pause();
    isPlayingAudio = false;
    audioBtn.classList.remove('bg-amber-400/20', 'border-amber-300');
    audioIcon.className = "fa-solid fa-music text-amber-300";
    audioText.innerText = "Lagu Pengantar Tidur";
  }
}

const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
}

function initStars() {
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 4500);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.3 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.3 ? '#fef3c7' : '#e0e7ff'
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    star.alpha += star.speed;
    const currentAlpha = (Math.sin(star.alpha) + 1) / 2 * 0.8 + 0.15;

    ctx.fillStyle = star.color;
    ctx.globalAlpha = currentAlpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeCanvas);

window.onload = function() {
  resizeCanvas();
  drawStars();
  renderPage();
};
