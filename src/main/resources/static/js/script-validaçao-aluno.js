const urlParams = new URLSearchParams(window.location.search);
const matriculaAluno = urlParams.get('aluno');
const idEvento = urlParams.get('evento');

fetch('/alunos/' + matriculaAluno)
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao buscar aluno');
    }
    return response.json(); // Pega o JSON da resposta
})
.then(aluno => {
    gerarQRCode(aluno);
})
.catch(error => {
    console.error('Erro:', error);
    alert('Erro ao buscar aluno');
});

// Função para redirecionar para a página de evento-info
function voltarPagina() {
    window.location.href = 'evento-info.html?aluno=' + matriculaAluno + '&evento=' + idEvento; // Agora direciona para evento-info.html
}

// Função para gerar o QR Code automaticamente ao carregar a página
function gerarQRCode(aluno) {
    // Cria um objeto com nome e matrícula do aluno
    const qrData = JSON.stringify({
        nome: aluno.nome,
        matricula: aluno.matricula
    });

    // Seleciona o elemento canvas onde o QR code será renderizado
    const canvas = document.getElementById('qrcode');

    // Gera o QR Code
    QRCode.toCanvas(canvas, qrData, { width: 300 }, function (error) {
        if (error) {
            console.error('Erro ao gerar o QR Code:', error);
        } else {
            console.log('QR Code gerado com sucesso!');
        }
    });
}

// Chama a função de gerar QR Code quando a página é carregada
window.onload = gerarQRCode;
