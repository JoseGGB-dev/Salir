const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const respuesta = document.getElementById("respuesta");

btnSi.addEventListener("click", function() {
    respuesta.innerHTML = "¡Sabía que dirías que sí! Nos vamos al Hatun a bailar ⚡🕺💃";
    lanzarRayos();
});

function moverBotonNo() {
    const maxX = window.innerWidth - btnNo.offsetWidth - 30;
    const maxY = window.innerHeight - btnNo.offsetHeight - 30;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    btnNo.style.position = "fixed";
    btnNo.style.left = x + "px";
    btnNo.style.top = y + "px";
    btnNo.style.transform = "none";
}

// Para PC
btnNo.addEventListener("mouseover", moverBotonNo);

// Para celular
btnNo.addEventListener("touchstart", function(e) {
    e.preventDefault();
    moverBotonNo();
});

// Por si toca rápido
btnNo.addEventListener("click", function(e) {
    e.preventDefault();
    moverBotonNo();
});

function lanzarRayos() {
    for (let i = 0; i < 25; i++) {
        const rayo = document.createElement("div");
        rayo.classList.add("rayo");
        rayo.innerHTML = "⚡";

        rayo.style.left = Math.random() * 100 + "vw";
        rayo.style.animationDuration = Math.random() * 2 + 3 + "s";

        document.body.appendChild(rayo);

        setTimeout(() => {
            rayo.remove();
        }, 5000);
    }
}