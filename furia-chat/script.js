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
function addMessage(sender, text, isExpandable = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    if (sender === 'Você') {
        messageElement.classList.add('user');
    } else {
        messageElement.classList.add('bot');
    }

    messageElement.innerHTML = `<strong>${sender}:</strong> <span class="message-text">${text}</span>`;

    if (isExpandable) {
        const button = document.createElement('button');
        button.textContent = 'Ver mais';
        button.style.cursor = 'pointer';
        button.style.color = '#3399ff'; // azul claro
        button.style.textDecoration = 'underline';
        button.style.background = 'none';
        button.style.border = 'none';
        button.style.padding = '0';
        button.style.fontSize = '1em';
        button.style.marginLeft = '10px';

        button.onclick = () => {
            expandHistory(messageElement); // agora passamos o elemento pra função
        };

        messageElement.appendChild(button);
    }

    messages.appendChild(messageElement);

    // Sempre rola para baixo
    messages.scrollTop = messages.scrollHeight;
}

// Nova função para expandir a história
function expandHistory(messageElement) {
    const messageText = messageElement.querySelector('.message-text');
    messageText.innerHTML = `
        📜 História Completa:<br><br>
        A FURIA Esports nasceu em 2017 com o sonho de revolucionar os esportes eletrônicos no Brasil. Apostando em um elenco jovem e extremamente agressivo, o time de CS:GO rapidamente chamou atenção.<br><br>
        Em 2019, a equipe despontou no cenário internacional, com grandes campanhas no ECS Season 7 Finals e no DreamHack Masters Dallas, derrotando times tradicionais.<br><br>
        Jogadores como KSCERATO, yuurih e arT ajudaram a construir a identidade ousada da organização. Hoje, a FURIA é símbolo de garra e paixão no CS mundial! 🇧🇷👊
    `;
    const button = messageElement.querySelector('button');
    if (button) button.remove(); // remove o botão depois de expandir
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
    } else if (texto.includes('história')) {
        response = '🏆 História da FURIA:\nFundada em 2017, a FURIA rapidamente se tornou uma das maiores forças do CS:GO mundial. Jogadores como KSCERATO e yuurih brilharam em Majors! 🐆🔥';
        addMessage('FURIA Bot', response, true);
        return;
    } else {
        response = '🤔 Não entendi... você pode tentar perguntar sobre: jogos, status, notícias!';
    }
    

    addMessage('FURIA Bot', response);
}

const clearButton = document.getElementById('clear-chat');

clearButton.addEventListener('click', function () {
    messages.innerHTML = ''; // Limpa todas as mensagens
    isFirstMessage = true;   // Volta a permitir a saudação inicial
});