const btnSi = document.getElementById("btnSi");
const btnNo = document.getElementById("btnNo");
const respuesta = document.getElementById("respuesta");

btnSi.addEventListener("click", function() {
    respuesta.innerHTML = "¡Sabía que dirías que sí! Nos vamos al Hatun a bailar ⚡🕺💃";
    lanzarRayos();
});

btnNo.addEventListener("mouseover", function() {
    const x = Math.random() * 250 - 125;
    const y = Math.random() * 250 - 125;

    btnNo.style.transform = `translate(${x}px, ${y}px)`;
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