const form = document.getElementById('message-form');
const input = document.getElementById('user-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const userMessage = input.value.trim();
    if (userMessage === '') return;

    addMessage('Você', userMessage);

    setTimeout(() => {
        botResponse(userMessage);
    }, 500);

    input.value = '';
});

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
        button.style.color = '#3399ff';
        button.style.textDecoration = 'underline';
        button.style.background = 'none';
        button.style.border = 'none';
        button.style.padding = '0';
        button.style.fontSize = '1em';
        button.style.marginLeft = '10px';

        button.onclick = () => {
            expandHistory(messageElement);
        };

        messageElement.appendChild(button);
    }

    messages.appendChild(messageElement);

    messages.scrollTop = messages.scrollHeight;
}

function expandHistory(messageElement) {
    const messageText = messageElement.querySelector('.message-text');
    messageText.innerHTML = `
        📜 História Completa:<br><br>
        A FURIA Esports nasceu em 2017 com o sonho de revolucionar os esportes eletrônicos no Brasil. Apostando em um elenco jovem e extremamente agressivo, o time de CS:GO rapidamente chamou atenção.<br><br>
        Em 2019, a equipe despontou no cenário internacional, com grandes campanhas no ECS Season 7 Finals e no DreamHack Masters Dallas, derrotando times tradicionais.<br><br>
        Jogadores como KSCERATO, yuurih e arT ajudaram a construir a identidade ousada da organização. Hoje, a FURIA é símbolo de garra e paixão no CS mundial! 🇧🇷👊
    `;
    const button = messageElement.querySelector('button');
    if (button) button.remove();
}

let isFirstMessage = true;

function botResponse(userText) {
    let response = '';
    const texto = userText.toLowerCase();

    if (isFirstMessage) {
        response = '🎉 Olá, admirador(a) do nosso time de CS da FURIA!!! 🐆<br><br>';
        response += 'Aqui é o chat Furioso, responsável por tudo que está acontecendo com o nosso querido time de CS! 🎮🔥<br><br>';
        response += 'Quer ficar por dentro de tudo? Aqui está o nosso menu interativo:<br><br>';
        response += '🔹 <strong>/historia</strong>: Conheça a trajetória do nosso time de CS!<br>';
        response += '🔹 <strong>/jogos</strong>: Acompanhe a agenda de jogos e nossos adversários!<br>';
        response += '🔹 <strong>/aovivo</strong>: Veja o status atual dos jogos ao vivo!<br>';
        response += '🔹 <strong>/torcida</strong>: Entre no chat da torcida e interaja com outros fãs! 🎉<br>';
        response += '🔹 <strong>/noticias</strong>: Fique por dentro das últimas novidades da FURIA! 📰<br>';
        response += '🔹 <strong>/quiz</strong>: Teste seus conhecimentos sobre a FURIA! 🤓<br><br>';
        response += 'Digite qualquer uma das palavras-chave ou escolha uma opção acima para começar!<br>';
        response += '🚀 Divirta-se e mostre seu apoio à FURIA! ⚡';        

        isFirstMessage = false;
    } else if (texto.includes('/jogos')) {
        response = '📅 Próximo jogo: FURIA vs NAVI - 28/04 às 17h! (Status: Em andamento)';
    } else if (texto.includes('/aovivo')) {
        response = '🚨 Status ao vivo: FURIA 16-12 NAVI. Faltando 3 minutos para o fim!';
    } else if (texto.includes('/noticias')) {
        response = '📰 Última notícia: FURIA avança para as semifinais do campeonato!';
    } else if (texto.includes('/historia')) {
        response = '🏆 História da FURIA:\nFundada em 2017, a FURIA rapidamente se tornou uma das maiores forças do CS:GO mundial. Jogadores como KSCERATO e yuurih brilharam em Majors! 🐆🔥';
        addMessage('FURIA Bot', response, true);
        return;
    } else if(texto.includes('/comandos')){
        response = 'Lista da Comandos:<br>';
        response += '/jogos<br>';
        response += '/historia<br>';
        response += '/aovivo<br>';
        response += '/torcida<br>';
        response += '/noticias<br>';
        response += '/quiz<br>';
    } else {
        response = '🤔 Esse comando não existe! Para saber nossa lista de comandos digite <strong>/comandos<strong>';
    }
    

    addMessage('FURIA Bot', response);
}

const clearButton = document.getElementById('clear-chat');

clearButton.addEventListener('click', function () {
    messages.innerHTML = '';
});