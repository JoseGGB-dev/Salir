
const card = document.getElementById('card');
const question = document.getElementById('question');
const subtitle = document.getElementById('subtitle');
const buttonsContainer = document.getElementById('buttons');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const result = document.getElementById('result');
const resultMessage = document.getElementById('resultMessage');
const boltsContainer = document.getElementById('boltsContainer');
 
// =====================================================
// LÓGICA DEL BOTÓN "NO" QUE SE ESCAPA
// =====================================================
 
// Indica si el botón ya pasó de su posición original (flujo normal)
// a posición "fixed" para poder moverse libremente por la pantalla.
let noMoved = false;
 
// Calcula una posición aleatoria dentro del área visible,
// dejando un margen para que el botón nunca quede cortado.
function getRandomPosition() {
  const margin = 12;
  const rect = btnNo.getBoundingClientRect();
 
  const maxX = Math.max(margin, window.innerWidth - rect.width - margin);
  const maxY = Math.max(margin, window.innerHeight - rect.height - margin);
 
  const x = margin + Math.random() * (maxX - margin);
  const y = margin + Math.random() * (maxY - margin);
 
  return { x, y };
}
 
// Mueve el botón "No" a una nueva posición aleatoria.
function moveNoButton() {
  const { x, y } = getRandomPosition();
  btnNo.style.left = x + 'px';
  btnNo.style.top = y + 'px';
}
 
// La primera vez que se activa, sacamos el botón del flujo normal
// (display flex) y lo convertimos en "fixed" para poder moverlo
// libremente por toda la pantalla, sin romper el diseño de la tarjeta.
function activateEscapeMode() {
  if (!noMoved) {
    const rect = btnNo.getBoundingClientRect();
 
    // Placeholder invisible para que el botón "Sí" no salte de lugar
    const placeholder = document.createElement('span');
    placeholder.style.display = 'inline-block';
    placeholder.style.width = rect.width + 'px';
    placeholder.style.height = rect.height + 'px';
    placeholder.setAttribute('aria-hidden', 'true');
    btnNo.parentNode.insertBefore(placeholder, btnNo);
 
    btnNo.style.position = 'fixed';
    btnNo.style.left = rect.left + 'px';
    btnNo.style.top = rect.top + 'px';
    btnNo.style.margin = '0';
 
    noMoved = true;
  }
 
  moveNoButton();
}
 
// --- Eventos para computadora ---
btnNo.addEventListener('mouseenter', activateEscapeMode);
 
// --- Eventos para celular (Android / iPhone) ---
btnNo.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  activateEscapeMode();
});
 
btnNo.addEventListener(
  'touchstart',
  (e) => {
    e.preventDefault();
    activateEscapeMode();
  },
  { passive: false }
);
 
// Por si algún dispositivo dispara un "click" directo
btnNo.addEventListener('click', (e) => {
  e.preventDefault();
  activateEscapeMode();
});
 
// Si el usuario rota el celular o cambia el tamaño de la ventana,
// nos asegurarnos de que el botón no quede fuera de la pantalla.
window.addEventListener('resize', () => {
  if (!noMoved) return;
 
  const rect = btnNo.getBoundingClientRect();
  const margin = 12;
  const maxX = window.innerWidth - rect.width - margin;
  const maxY = window.innerHeight - rect.height - margin;
 
  const currentX = parseFloat(btnNo.style.left) || 0;
  const currentY = parseFloat(btnNo.style.top) || 0;
 
  btnNo.style.left = Math.min(Math.max(margin, currentX), maxX) + 'px';
  btnNo.style.top = Math.min(Math.max(margin, currentY), maxY) + 'px';
});
 
// =====================================================
// LÓGICA DEL BOTÓN "SÍ"
// =====================================================
btnYes.addEventListener('click', () => {
  question.textContent = '¡Sabía que dirías que sí! ⚡';
  subtitle.style.display = 'none';
  buttonsContainer.style.display = 'none';
 
  resultMessage.textContent =
    '¡Sabía que dirías que sí! Nos vamos al Hatun a bailar ⚡🕺💃';
  result.classList.add('show');
 
  card.classList.add('celebrate');
 
  launchLightningRain();
});
 
// =====================================================
// LLUVIA DE RAYOS ANIMADOS ⚡
// =====================================================
function createBolt() {
  const bolt = document.createElement('span');
  bolt.className = 'bolt';
  bolt.textContent = '⚡';
 
  const startX = Math.random() * window.innerWidth;
  const size = 16 + Math.random() * 22; // tamaño entre 16px y 38px
  const fallDuration = 2 + Math.random() * 2; // entre 2s y 4s
  const delay = Math.random() * 0.3;
 
  bolt.style.left = startX + 'px';
  bolt.style.fontSize = size + 'px';
  bolt.style.animationDuration = fallDuration + 's';
  bolt.style.animationDelay = delay + 's';
 
  boltsContainer.appendChild(bolt);
 
  // Limpieza: quitamos el rayo del DOM cuando termina su animación
  bolt.addEventListener('animationend', () => {
    bolt.remove();
  });
}
 
function launchLightningRain() {
  const totalDuration = 4000; // 4 segundos de lluvia de rayos
  const interval = 90; // crea un rayo nuevo cada 90ms
  const endTime = Date.now() + totalDuration;
 
  const rainTimer = setInterval(() => {
    createBolt();
 
    if (Date.now() >= endTime) {
      clearInterval(rainTimer);
    }
  }, interval);
}