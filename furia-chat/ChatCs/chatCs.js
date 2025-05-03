const form = document.getElementById('message-form');
const input = document.getElementById('user-input');
const messages = document.getElementById('messages');
const clearButton = document.getElementById('clear-chat');

let respostasBot = {}; // Aqui vão as respostas carregadas do JSON

// Carrega as respostas do arquivo JSON
async function carregarRespostas() {
    const respostaData = await fetch('respostas.json');
    respostasBot = await respostaData.json();
}

// Carrega mensagens salvas
function carregarMensagensSalvas() {
    const mensagensSalvas = JSON.parse(localStorage.getItem("chatMessages")) || [];
    mensagensSalvas.forEach(msg => {
        addMessage(msg.sender, msg.text, msg.isExpandable);
    });
    if (mensagensSalvas.length > 0) {
        localStorage.setItem("isFirstVisit", "false");
    }
}

// Salva cada nova mensagem no localStorage
function salvarMensagem(sender, text, isExpandable = false) {
    const mensagens = JSON.parse(localStorage.getItem("chatMessages")) || [];
    mensagens.push({ sender, text, isExpandable });
    localStorage.setItem("chatMessages", JSON.stringify(mensagens));
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const userMessage = input.value.trim();
    if (userMessage === '') return;

    addMessage(localStorage.getItem("nomeTorcedor"), userMessage);
    salvarMensagem(localStorage.getItem("nomeTorcedor"), userMessage);

    setTimeout(() => {
        botResponse(userMessage);
    }, 500);

    input.value = '';
});

// Função que adiciona as mensagens
function addMessage(sender, text, isExpandable = false, txtExpandable = 0) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    if (sender === localStorage.getItem("nomeTorcedor")) {
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
            expandHistory(messageElement, txtExpandable);
        };

        messageElement.appendChild(button);
    }
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}

function expandHistory(messageElement, txtExpandable) {
    let response = '';

    if (messages.lastElementChild) {
        messages.removeChild(messages.lastElementChild);
    }

    if (txtExpandable == 1){
        response = respostasBot.historia.historiaCompleta;
    } else if(txtExpandable == 2){
        response = respostasBot.jogos.all;
    }else if (txtExpandable == 3) {
        const lista = respostasBot.noticias.todas;
        response = '📰 Últimas notícias da FURIA:<br><br>';
        lista.forEach(n => {
            response += `<strong>${n.titulo}</strong><br>${n.conteudo}<br><br>`;
        });
    }
    
    addMessage('FURIA Bot', response);
    salvarMensagem('FURIA Bot', response);

    const button = messageElement.querySelector('button');
    if (button) button.remove();
}

function enviarQuiz() {
    const perguntas = respostasBot.quiz.perguntas;
    const sorteada = perguntas[Math.floor(Math.random() * perguntas.length)];
  
    let respostaHtml = `<strong>🧠 Quiz FURIA:</strong><br><br>${sorteada.pergunta}<br><br>`;
    sorteada.alternativas.forEach((alt, index) => {
      respostaHtml += `<button id="ola" onclick="verificarResposta('${alt}', '${sorteada.correta}', this)">${alt}</button><br>`;
    });
    salvarMensagem('FURIA Bot', respostaHtml);
    addMessage('FURIA Bot', respostaHtml);
  }
  
  function verificarResposta(escolhida, correta, btn) {
    const buttons = btn.parentNode.querySelectorAll('button');
    buttons.forEach(b => {
      b.disabled = true;
      if (b.textContent === correta) {
        b.style.backgroundColor = '#4CAF50';
      } else if (b.textContent === escolhida) {
        b.style.backgroundColor = '#f44336';
      }
    });
  
    const msg = escolhida === correta
      ? '✅ Resposta correta! Você manja de FURIA!<br><button id="more" onclick="enviarQuiz()">🎲 Mais uma pergunta?</button>'
      : `❌ Resposta errada! A correta era: <strong>${correta}</strong><br><button id="more" onclick="enviarQuiz()">🎲 Mais uma pergunta?</button>`;
  
    setTimeout(() => addMessage('FURIA Bot', msg), salvarMensagem('FURIA Bot', msg), 1000);
}  

function botResponse(userText) {
    let response = '';
    const texto = userText.toLowerCase();

    if (localStorage.getItem("isFirstVisit") === null) {
        response = respostasBot.boas_vindas.texto;
        addMessage('FURIA Bot', response);
        salvarMensagem('FURIA Bot', response);
        localStorage.setItem("isFirstVisit", "false");
    } else {
        if (texto.includes('/jogos')) {
            response = respostasBot.jogos.preview;
            addMessage('FURIA Bot', response, true, 2);
            return;
        } else if (texto.includes('/historia')) {
            response = respostasBot.historia.preview;
            addMessage('FURIA Bot', response, true, 1);
            return;
        } else if (texto.includes('/quiz')) {
            enviarQuiz();
            return;
        }else if (texto.includes('/noticias')) {
            response = respostasBot.noticias.preview;
            addMessage('FURIA Bot', response, true, 3);
            return;
        } else if (texto.includes('/comandos')) {
            response = respostasBot.comandos.texto;
        } else if (texto.includes('/aovivo')) {
            response = respostasBot.aovivo.status;
        } else if (texto.includes('/torcida')) {
            response = respostasBot.torcida.mensagem;
            abrirChatTorcida();
        } else {
            response = respostasBot.comando_invalido.texto;
        }

        salvarMensagem('FURIA Bot', response);
        addMessage('FURIA Bot', response);
    }
}

clearButton.addEventListener('click', function () {
    messages.innerHTML = '';
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("isFirstVisit");
});

carregarRespostas();
carregarMensagensSalvas();

function abrirChatTorcida() {
    document.getElementById("chatTorcida").style.display = "flex";
}

function enviarMensagem() {
    const input = document.getElementById("inputMensagem");
    const mensagens = document.getElementById("mensagensChat");

    if (input.value.trim() !== "") {
        const novaMensagem = document.createElement("p");
        novaMensagem.innerHTML = `<strong>${localStorage.getItem("nomeTorcedor")}:</strong> ${input.value}`;
        mensagens.appendChild(novaMensagem);
        mensagens.scrollTop = mensagens.scrollHeight;

        input.value = "";

        // Simula uma resposta automática de outro fã
        setTimeout(() => {
            const resposta = document.createElement("p");
            resposta.innerHTML = `<strong>Fã aleatório:</strong> Bora apoiar! 💪`;
            mensagens.appendChild(resposta);
            mensagens.scrollTop = mensagens.scrollHeight;
        }, 1000);
    }
}

function fecharChatTorcida() {
    document.getElementById("chatTorcida").style.display = "none";
}