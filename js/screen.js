// ============================================================
//  CONFIGURAÇÃO DO CONVITE (é aqui que você muda textos e fotos)
// ============================================================

const CONFIG = {
    // WhatsApp que recebe as respostas: 55 + DDD + número, só números
    whatsapp: "5511977876885",
};

// Tela final (a foto é a "finalcat")
const TELA_FINAL = {
    image: "assets/finalcat.jpg",
    alt: "Gatinho fofo com bochechas rosadas apontando com os dedos",
};

// Cada tela tem:
//   title / cardSize / type ("button", "date" ou "time")
//   image + alt  -> meme da tela (opcional; o arquivo fica em assets/)
//   resumo(valor, opcao) -> linha mostrada na tela final
//   zap(valor, opcao)    -> frase enviada no WhatsApp (na voz de quem responde)
const telas = [
    {
        title: "Você aceitaria sair comigo?",
        image: "assets/voceaceita.jpg",
        alt: "Gato de olhos grandes olhando de lado",
        cardSize: "card-medio",
        type: "button",
        resumo: () => "Convite aceito 💕",
        zap: () => "Aceito sim! 💕",
        options: [
            { text: "Sim" },
            {
                text: "Não",
                effect: "runaway",
                message: [
                    "Tem certeza? 😢",
                    "Sério mesmo?",
                    "Por favor, me dê uma chance!",
                    "Olha que eu vou chorar 😭",
                    "Desiste de mim não 😭",
                    "Você é difícil, né?",
                ],
            },
        ],
    },
    {
        title: "O que vamos comer?",
        image: "assets/vamoscomer.jpg",
        alt: "Gato de óculos escuros pronto para comer",
        cardSize: "card-medio",
        type: "button",
        resumo: (valor, opcao) => `Comida: ${opcao.text}`,
        zap: (valor) => `Quero comer ${valor}.`,
        options: [
            { text: "🍕 Pizza", value: "pizza" },
            { text: "🍣 Sushi", value: "sushi" },
            { text: "🥩 Carne", value: "carne" },
            { text: "🍝 Massa", value: "massa" },
        ],
    },
    {
        title: "Para onde vamos?",
        image: "assets/aondevamos.jpg",
        alt: "Gatinho desenhado andando de scooter",
        cardSize: "card-medio",
        type: "button",
        resumo: (valor, opcao) => `Programa: ${opcao.text}`,
        zap: (valor) => `Vamos ${valor}.`,
        options: [
            { text: "🏖️ A praia", value: "à praia" },
            { text: "🎬 Ao cinema", value: "ao cinema" },
            { text: "🍷 A um restaurante", value: "a um restaurante" },
        ],
    },
    {
        title: "Quando vamos sair? 📅",
        cardSize: "card-grande",
        type: "date",
        label: "Escolha um dia para sairmos",
        input: { type: "date" },
        resumo: (valor) => `Dia: ${formatarData(valor)}`,
        zap: (valor) => `Pode ser ${formatarData(valor)}.`,
    },
    {
        title: "Que horas vamos sair? ⏰",
        cardSize: "card-grande",
        type: "time",
        label: "Escolha um horário para sairmos",
        input: { type: "time" },
        resumo: (valor) => `Hora: ${valor}`,
        zap: (valor) => `Pode me buscar às ${valor}.`,
    },
];
