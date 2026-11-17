// Elemento onde cada tela é desenhada
const card = document.getElementById("card");
// Qual tela está sendo mostrada
let telaAtual = 0;
// Respostas: { resumo, zap }
const respostas = [];

// ---------- utilidades ----------

function criar(tag, classe, texto) {
    const elemento = document.createElement(tag);
    if (classe) elemento.className = classe;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

function criarImagem(src, alt) {
    const imagem = criar("img", "meme");
    imagem.src = src;
    imagem.alt = alt;
    // se o arquivo não existir, a tela continua sem a imagem
    imagem.addEventListener("error", () => imagem.remove());
    return imagem;
}

function hojeISO() {
    const agora = new Date();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    return `${agora.getFullYear()}-${mes}-${dia}`;
}

// "2026-11-20" -> "sexta-feira, 20 de novembro"
function formatarData(iso) {
    return new Date(iso + "T00:00:00").toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
}

// ---------- desenha a tela atual ----------

function renderScreen() {
    const tela = telas[telaAtual];

    card.className = tela.cardSize;
    card.replaceChildren();
    card.append(criar("p", "progress", `Pergunta ${telaAtual + 1} de ${telas.length}`));

    if (tela.image) card.append(criarImagem(tela.image, tela.alt));

    card.append(criar("h1", "title", tela.title));

    // decide o tipo de interação a ser gerada
    if (tela.type === "button") {
        renderButtons(tela);
    } else {
        renderInput(tela);
    }
}

// ---------- botões ----------

function renderButtons(tela) {
    const container = criar("div", "button-container");

    tela.options.forEach((opcao) => {
        const botao = criar("button", "btn", opcao.text);
        botao.type = "button";

        if (opcao.effect === "runaway") {
            configurarFuga(botao, opcao.message);
        } else {
            botao.addEventListener("click", () => {
                const valor = opcao.value ?? opcao.text;
                respostas.push({ resumo: tela.resumo(valor, opcao), zap: tela.zap(valor, opcao) });
                nextScreen();
            });
        }

        container.append(botao);
    });

    card.append(container);
}

// Botão que corre: funciona com mouse, toque e teclado, e sempre dentro da tela.
function configurarFuga(botao, mensagens) {
    let espaco = null;
    let ultima = -1;

    function fugir(evento) {
        evento.preventDefault();

        // na primeira vez, deixa um espaço vazio para o layout não pular
        if (!espaco) {
            const medida = botao.getBoundingClientRect();
            espaco = document.createElement("div");
            espaco.style.width = medida.width + "px";
            espaco.style.height = medida.height + "px";
            botao.after(espaco);
            botao.classList.add("btn-fugitivo");
            botao.style.position = "fixed";
        }

        // mensagem diferente da anterior
        let indice;
        do {
            indice = Math.floor(Math.random() * mensagens.length);
        } while (indice === ultima && mensagens.length > 1);
        ultima = indice;
        botao.textContent = mensagens[indice];

        // novo lugar, sempre visível (mede depois de trocar o texto)
        const margem = 8;
        const medida = botao.getBoundingClientRect();
        const maxX = Math.max(margem, window.innerWidth - medida.width - margem);
        const maxY = Math.max(margem, window.innerHeight - medida.height - margem);
        botao.style.left = margem + Math.random() * (maxX - margem) + "px";
        botao.style.top = margem + Math.random() * (maxY - margem) + "px";
    }

    botao.addEventListener("pointerenter", fugir); // mouse
    botao.addEventListener("pointerdown", fugir); // toque no celular
    botao.addEventListener("focus", fugir); // teclado
    botao.addEventListener("click", (evento) => evento.preventDefault());
}

// ---------- campos de data e hora ----------

function renderInput(tela) {
    const rotulo = criar("label", "label", tela.label);
    rotulo.htmlFor = "campo";

    const campo = document.createElement("input");
    campo.id = "campo";
    campo.className = "input";
    campo.type = tela.input.type;
    if (tela.type === "date") campo.min = hojeISO();

    const salvar = criar("button", "btn btn-cheio", "Confirmar");
    salvar.type = "button";
    salvar.disabled = true;

    // só libera o botão com um valor válido (e data que ainda não passou)
    campo.addEventListener("input", () => {
        salvar.disabled = !campo.value || (campo.min && campo.value < campo.min);
    });

    salvar.addEventListener("click", () => {
        if (salvar.disabled) return;
        respostas.push({ resumo: tela.resumo(campo.value), zap: tela.zap(campo.value) });
        nextScreen();
    });

    card.append(rotulo, campo, salvar);
}

// ---------- navegação ----------

function nextScreen() {
    telaAtual++;

    if (telaAtual < telas.length) {
        renderScreen();
    } else {
        renderEndScreen();
    }
}

// ---------- tela final ----------

function renderEndScreen() {
    card.className = "card-grande";
    card.replaceChildren();

    card.append(criarImagem(TELA_FINAL.image, TELA_FINAL.alt));
    card.append(criar("h1", "title", "Encontro marcado! 💕"));
    card.append(criar("p", "subtitle", "Espero por você."));

    const lista = criar("ul", "resumo");
    respostas.forEach((resposta) => lista.append(criar("li", "", resposta.resumo)));
    card.append(lista);

    card.append(criarBotaoWhatsApp());
}

// Abre o WhatsApp já na conversa de quem mandou o convite, com a mensagem pronta
function criarBotaoWhatsApp() {
    const mensagem = respostas.map((resposta) => resposta.zap).join(" ");

    const link = criar("a", "btn btn-cheio", "Enviar minhas respostas no WhatsApp");
    link.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    return link;
}

renderScreen();
