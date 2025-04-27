// script.js

// Pega o formulário e o campo de mensagens
const form = document.getElementById('message-form');
const input = document.getElementById('user-input');
const messages = document.getElementById('messages');

// Escuta o envio do formulário
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede a página de recarregar

    const userMessage = input.value.trim();
    if (userMessage === '') return; // Não envia mensagens vazias

    // Adiciona a mensagem do usuário no chat
    addMessage('Você', userMessage);

    // Responde baseado no que o usuário escreveu
    setTimeout(() => {
        botResponse(userMessage);
    }, 500); // Pequeno delay para parecer mais "real"

    // Limpa o campo de input
    input.value = '';
});

// Função para adicionar uma mensagem no chat
function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    if (sender === 'Você') {
        messageElement.classList.add('user');
    } else {
        messageElement.classList.add('bot');
    }

    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messages.appendChild(messageElement);

    // Sempre rola para baixo
    messages.scrollTop = messages.scrollHeight;
}

let isFirstMessage = true; // Variável para verificar se é a primeira mensagem

function botResponse(userText) {
    let response = '';
    const texto = userText.toLowerCase();

    if (isFirstMessage) {
        // Primeira mensagem do bot
        response = '🎉 Olá, admirador(a) do nosso time de CS da FURIA!!! 🐆\n\n';
        response += 'Aqui é o chat Furioso, responsável por tudo que está acontecendo com o nosso querido time de CS! 🎮🔥\n\n';
        response += 'Quer ficar por dentro de tudo? Aqui está o nosso menu interativo: \n\n';
        response += '🔹 **História**: Conheça a trajetória do nosso time de CS! \n';
        response += '🔹 **Jogos**: Acompanhe a agenda de jogos e nossos adversários! \n';
        response += '🔹 **Ao Vivo**: Veja o status atual dos jogos ao vivo! \n';
        response += '🔹 **Torcida**: Entre no chat da torcida e interaja com outros fãs! 🎉\n';
        response += '🔹 **Notícias**: Fique por dentro das últimas novidades da FURIA! 📰\n';
        response += '🔹 **Quiz**: Teste seus conhecimentos sobre a FURIA! 🤓\n\n';
        response += 'Digite qualquer uma das palavras-chave ou escolha uma opção acima para começar! \n';
        response += '🚀 Divirta-se e mostre seu apoio à FURIA! ⚡';

        isFirstMessage = false; // Marca que já enviamos a primeira mensagem
    } else if (texto.includes('jogos')) {
        response = '📅 Próximo jogo: FURIA vs NAVI - 28/04 às 17h! (Status: Em andamento)';
    } else if (texto.includes('ao vivo')) {
        // Simulação de status de jogo
        response = '🚨 Status ao vivo: FURIA 16-12 NAVI. Faltando 3 minutos para o fim!';
    } else if (texto.includes('notícias')) {
        response = '📰 Última notícia: FURIA avança para as semifinais do campeonato!';
    } else {
        response = '🤔 Não entendi... você pode tentar perguntar sobre: jogos, status, notícias!';
    }

    addMessage('FURIA Bot', response);
}
