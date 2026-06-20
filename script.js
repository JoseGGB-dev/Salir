const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const respuesta = document.getElementById("respuesta");

btnSi.addEventListener("click", function () {
    respuesta.innerHTML = "¡Sabía que dirías que sí! Nos vamos al Hatun a bailar ⚡🕺💃";
    lanzarRayos();
});

function moverBotonNo(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const anchoPantalla = window.innerWidth;
    const altoPantalla = window.innerHeight;

    const anchoBoton = btnNo.offsetWidth;
    const altoBoton = btnNo.offsetHeight;

    const margen = 20;

    const maxX = anchoPantalla - anchoBoton - margen;
    const maxY = altoPantalla - altoBoton - margen;

    const x = Math.floor(Math.random() * (maxX - margen)) + margen;
    const y = Math.floor(Math.random() * (maxY - margen)) + margen;

    btnNo.style.position = "fixed";
    btnNo.style.left = x + "px";
    btnNo.style.top = y + "px";
    btnNo.style.transform = "none";
    btnNo.style.zIndex = "9999";
}

// PC
btnNo.addEventListener("mouseenter", moverBotonNo);

// Celular moderno
btnNo.addEventListener("pointerdown", moverBotonNo);

// Celular antiguo
btnNo.addEventListener("touchstart", moverBotonNo, { passive: false });

// Por si logra tocarlo
btnNo.addEventListener("click", moverBotonNo);

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