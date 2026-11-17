// Morangos caindo no fundo: poucos elementos, tamanhos e velocidades variados.
(function () {
    const fundo = document.getElementById("background");
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // menos morangos em telas estreitas (celular), no máximo 60
    const quantidade = Math.min(60, Math.max(24, Math.round(window.innerWidth / 14)));

    for (let i = 0; i < quantidade; i++) {
        const morango = document.createElement("span");
        morango.textContent = "🍓";
        morango.classList.add("strawberry");
        morango.style.left = Math.random() * 100 + "%";
        morango.style.fontSize = 14 + Math.random() * 20 + "px";
        morango.style.opacity = 0.55 + Math.random() * 0.45;

        if (reduzirMovimento) {
            // parados, espalhados pela tela
            morango.style.top = Math.random() * 100 + "%";
        } else {
            const duracao = 8 + Math.random() * 10;
            morango.style.animationDuration = duracao + "s";
            // atraso negativo: já começam espalhados, sem esperar subir
            morango.style.animationDelay = -Math.random() * duracao + "s";
        }

        fundo.appendChild(morango);
    }
})();
