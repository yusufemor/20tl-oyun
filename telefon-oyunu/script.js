let money = 0;
let timeLeft = 30;
let timer;
let player = null;
let trashInterval;
let gameArea = document.getElementById("game-area");
let playerWidth = 50; // Karakterin genişliği
let gameAreaWidth = 600; // Oyun alanı genişliği

// Ses elementleri
const moveSound = document.getElementById("move-sound");
const clickSound = document.getElementById("click-sound");
const successSound = document.getElementById("success-sound");
const failSound = document.getElementById("fail-sound");

// Oyun başlat
document.getElementById("game").style.display = "block";

// Sokak sahnesine geçiş
function startStreet() {
  document.getElementById("game").style.display = "none";
  document.getElementById("street").style.display = "block";

  player = document.getElementById("player"); // Karakter objesini alıyoruz
  window.addEventListener("keydown", movePlayer); // Klavye tuşlarıyla hareketi tetikliyoruz

  timer = setInterval(updateTimer, 1000); // Zamanlayıcıyı başlatıyoruz
  trashInterval = setInterval(spawnTrash, 1500); // Çöp kutuları rastgele aralıklarla çıkacak
}

// Karakterin hareketini sağla
function movePlayer(e) {
  const left = parseInt(player.style.left || "275"); // Karakterin mevcut "left" pozisyonunu alıyoruz
  if (e.key === "ArrowLeft" && left > 0) { // Sol ok tuşu ile hareket
    player.style.left = (left - 20) + "px"; // 20px sola kaydır
    moveSound.play(); // Hareket sesi çalsın
  }
  if (e.key === "ArrowRight" && left < gameAreaWidth - playerWidth) { // Sağ ok tuşu ile hareket
    player.style.left = (left + 20) + "px"; // 20px sağa kaydır
    moveSound.play(); // Hareket sesi çalsın
  }
}

// Çöp kutularını rastgele yarat
function spawnTrash() {
  const trash = document.createElement("img");
  trash.src = "img/cop.png";
  trash.className = "trash";
  trash.style.top = Math.floor(Math.random() * 300) + "px"; // Yükseklik rastgele
  trash.style.left = Math.floor(Math.random() * (gameAreaWidth - 40)) + "px"; // Çöp kutusunu ekranda rastgele bir yere yerleştir
  trash.onclick = () => {
    trash.remove(); // Çöp kutusu tıklanınca kaybolacak
    clickSound.play(); // Tıklama sesi çalsın
    earnMoney(); // Para kazanılacak
  };
  gameArea.appendChild(trash);
}

// Para kazanma
function earnMoney() {
  money += 5;
  document.getElementById("money").textContent = `Paran: ${money} TL`;
  if (money >= 20) {
    clearInterval(timer);
    clearInterval(trashInterval);
    setTimeout(() => {
      document.getElementById("street").style.display = "none";
      document.getElementById("building").style.display = "block";
    }, 500);
  }
}

// Zamanlayıcı
function updateTimer() {
  timeLeft--;
  document.getElementById("timer").textContent = `Süre: ${timeLeft}`;
  if (timeLeft <= 0) {
    clearInterval(timer);
    clearInterval(trashInterval);
    failSound.play(); // Başarısızlık sesi çalsın
    alert("Süre doldu! Telefonunu geri alamadın.");
    location.reload();
  }
}

// Bina sahnesinde para verme
function giveMoney() {
  if (money >= 20) {
    document.getElementById("building").style.display = "none";
    document.getElementById("win").style.display = "block";
    successSound.play(); // Başarı sesi çalsın
  }
}
