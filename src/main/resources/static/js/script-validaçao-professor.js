const urlParams = new URLSearchParams(window.location.search);
const idEvento = urlParams.get('evento');
const matriculaProfessor = urlParams.get('professor');

const infobox = document.getElementById('resultado');

async function iniciarLeitura() {
    const video = document.getElementById('preview');
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } });
    
    video.srcObject = stream;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    });

    infobox.innerText = '';

    video.play();
    const intervalId = setInterval(() => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        
        if (code) {
            const dados = JSON.parse(code.data);
            validarDados(dados);

            clearInterval(intervalId);
            video.pause();  // Pausa o vídeo
            video.srcObject.getTracks().forEach(track => track.stop()); // Para o stream de vídeo
            return;
        }
    }, 1000);
}

function validarDados(dados) {
    const { nome, matricula } = dados;

    const dadosValidacao = { 
        alunoMatricula: matricula,
        eventoId: idEvento
    }

    fetch('/validacoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosValidacao)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao validar presença');
        }
        return response.text();
    })
    .then(data => {
        infobox.innerText = nome + ': ' + data;
    })
    .catch(error => {
        alert('Erro ao validar os dados' + error)
        console.error('Erro ao validar os dados:', error);
    });
}

function voltarPagina() {
    window.location.href = 'evento-info.html?professor=' + matriculaProfessor + '&evento=' + idEvento;
}