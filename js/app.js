
//encontra o elemento card
const card = document.getElementById("card");
//mostra que tela esta sendo renderizada
let currentScreen = 0;
//guarda respostas
const answers = {};
//decide a tela atual
function renderScreen() {
    let screens = screen [currentScreen];
     card.className = screens.cardSize;
    card.innerHTML= `<h1 class="title">${screens.title}</h1>`;
    //decide o tipo de interação a ser gerada
   switch(screens.type){
    case "button": renderbutton(screens);
    break;
    case "date":
    case "time":
     renderinput(screens);
    break;
}
}
//gera o botão
function renderbutton(screens){
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");  
 screens.options.forEach((option) => {
    const button = document.createElement('button');
    button.classList.add("btn");
    button.textContent = option.text;
    //efeito do botão correr
    button.addEventListener('mouseover', () => {
        if (option.effect === "runaway" ) {
            button.style.position="absolute";
            button.style.top = Math.random() * window.innerHeight - 50 + "px";
            button.style.left = Math.random() * window.innerWidth -100 + "px";
            const message = option.message;
            const randomIndex = Math.floor(Math.random() * message.length);
            button.textContent= message[randomIndex];
        }
    })
    button.addEventListener('click', ()=>{
        if(option.effect !== "runaway"){
            answers[screens.key] = option.text;
            nextscreen()
        }
    });
   buttonContainer.appendChild(button);
 });
 card.appendChild(buttonContainer);
}
//gera o input
function renderinput(screens){
    const input = document.createElement('input');
    input.classList.add("input");
    input.type = screens.input.type;
    card.appendChild(input);
     input.placeholder = screens.input.placeholder;
    const saveButton = document.createElement('button');
    saveButton.textContent = "marcado";
    card.appendChild(saveButton);
     saveButton.addEventListener('click', () => {
       answers[screens.key] = input.value;
       nextscreen();
    });
}
//passa pra proxima tela
function nextscreen(){
    currentScreen++;
    if(currentScreen < screen.length) {
        renderScreen();
    }
    else{renderEndScreen();}
}
//mostra a tela final
function renderEndScreen(){
    card.innerHTML= `<h1>Encontro marcado espero por você</h1>`;
    for (const key in answers) {card.innerHTML +=`<p>${key} ${answers[key]}`};
     shareAnswers();
}
//compartilhar as respostas com quem enviou o convite
function shareAnswers() {
    const shareButton = document.createElement('button');
    shareButton.textContent = "Compartilhar respostas";
    shareButton.addEventListener('click', () => {
        const shareText = Object.entries(answers)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
        const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
        window.open(shareUrl, '_blank');
    });
    card.appendChild(shareButton);
}
renderScreen();