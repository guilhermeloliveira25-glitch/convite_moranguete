const background = document.getElementById("background");
const quantidade = 250;
const espacamento = window.innerWidth / quantidade;
for (let i = 0; i < quantidade; i++){ 
const strawberry = document.createElement("span");
strawberry.textContent = "🍓";
strawberry.classList.add("strawberry");
strawberry.style.left = i * espacamento + Math.random() * 100 + "px";
strawberry.style.top = Math.random() * window.innerHeight +"px";
strawberry.style.animationDelay = Math.random() * 5 + "s";
background.appendChild(strawberry);
};