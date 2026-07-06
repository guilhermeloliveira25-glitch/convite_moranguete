const screen = [
   { 
    title: " Você aceitaria sair comigo ?",
    key: " Não achei que ia dizer",
    cardSize: "card-pequeno",
    type: "button",
    options:[
       { text:"sim"},
       { text:"não",
        effect: "runaway",
        message: ["Tem certeza ? 😢","Serio mesmo ?",
              "Por favor, me dê uma chance !", "Olha que eu vou chorar 😭",
              "desiste de mim não 😭", "Você é difícil né"]
       }
    ]
},
{
        title: " O que vamos comer ?",
        key: "vamos comer ",
        cardSize: "card-medio",
        type: "button",
        options:[
            { text: "🍕 Pizza" },
            { text: "🍣 Sushi" },
            { text: "🥩 Carne" },
            { text: "🍝 Massa" }
        ]
    },
    {
        title: " Para onde vamos ?",
        key: "Vamos",
        cardSize: "card-medio",
        type: "button",
        options:[
            { text: "🏖️ a Praia" },
            { text: "🎬 ao cinema" },
            { text: "🍷 a um restaurante" }
        ]
    },
    {
        title: "Quando vamos sair ? ⏰",
        key: "no dia",
        cardSize: "card-grande",
        type: "date",
        label: "escolhe um dia para sairmos",
           input: { type: "date"}
    },
    {
        title: "Que horas vamos sair ? ⏰",
        key: "vou te buscar as",
        cardSize: "card-grande",
        type: "time",
        label: "escolhe um horário para sairmos",
           input: { type: "time"}
    }

]
