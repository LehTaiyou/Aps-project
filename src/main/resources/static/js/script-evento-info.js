const urlParams = new URLSearchParams(window.location.search);
const idEvento = urlParams.get('evento');

const grupoBotoes = document.getElementById("button-group");
const botaoVoltar = document.getElementById("voltar-btn");

var matriculaAluno = '';
var matriculaProfessor = '';

function voltarParaEventos() {
    window.location.href = 'visualizaçao-dos-eventos.html?aluno=' + matriculaAluno;
}

function voltarParaProfessor() {
    window.location.href = 'tela-professor.html?professor=' + matriculaProfessor;
}

function voltarParaCoordenador() {
    window.location.href = 'tela-coordenador.html';
}

fetch('/eventos/' + idEvento)
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao buscar o evento');
    }
    return response.json(); // Pega o JSON da resposta
})
.then(evento => {
    criaBotoes(evento);
    preencherDados(evento);
})
.catch(error => {
    console.error('Erro:', error);
    alert('Erro ao exibir o evento');
});

function preencherDados(evento) {
    dataObjeto = new Date(evento.data)
    const formatador = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',  // mês por extenso
        year: 'numeric'
      });
    const dataFormatada = formatador.format(dataObjeto);

    document.getElementById('titulo-evento').textContent = evento.titulo;
    document.getElementById('descricao-evento').textContent = evento.descricao;
    document.getElementById('local-evento').textContent = evento.local;
    document.getElementById('data-evento').textContent = dataFormatada;
    document.getElementById('carga-horaria-evento').textContent = evento.cargaHoraria;
    document.getElementById('max-participantes-evento').textContent = evento.maxParticipantes;
}

function criaBotoes(evento) {
    if (urlParams.has('aluno')) {
        matriculaAluno = urlParams.get('aluno');
        criaBotoesAluno(evento)
    } else if (urlParams.has('professor')) {
        matriculaProfessor = urlParams.get('professor')
        criaBotoesProfessor();
    } else {
        botaoVoltar.onclick = voltarParaCoordenador;
    }
}

function criaBotoesAluno(evento) {
    botaoVoltar.onclick = voltarParaEventos;
    if (evento.alunosInscritos != null && evento.alunosInscritos.includes(matriculaAluno)) {
        criaBotoesAlunoInscrito();
    }
    else {
        criaBotoesAlunoNaoInscrito();
    }
}

function criaBotoesProfessor() {
    botaoVoltar.onclick = voltarParaProfessor;
    botaoValidar = document.createElement("button");
    botaoValidar.className = "btn validar-btn";
    botaoValidar.onclick = validar;
    botaoValidar.innerHTML = "Ler QR Code";

    grupoBotoes.appendChild(botaoValidar);
}

function criaBotoesAlunoInscrito() {
    botaoValidacao = document.createElement("button");
    botaoCancelar = document.createElement("button");

    botaoValidacao.className = "btn checkin-btn"
    botaoCancelar.className = "btn cancelar-btn"
    
    botaoValidacao.innerHTML = "Gerar QR Code"
    botaoCancelar.innerHTML = "Cancelar Inscrição"

    botaoValidacao.onclick = gerarQRCode;
    botaoCancelar.onclick = cancelarInscricao;

    grupoBotoes.appendChild(botaoValidacao);
    grupoBotoes.appendChild(botaoCancelar);
}

function criaBotoesAlunoNaoInscrito() {
    botaoInscricao = document.createElement("button");
    botaoInscricao.className = "btn inscrever-btn";
    botaoInscricao.onclick = inscrever;
    botaoInscricao.innerHTML = "Inscrever-se";

    grupoBotoes.appendChild(botaoInscricao)
}

function inscrever () {

    var inscricaoData = {
        alunoMatricula: matriculaAluno,
        eventoId: idEvento 
    }

    fetch('/inscricoes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inscricaoData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao inscrever aluno');
        }
    })
    .then(() => {
        window.location.reload()
        // alert('Inscrição realizada com sucesso');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao inscrever aluno: ' + error.message);
    });
}

function cancelarInscricao() {
    if (confirm('Tem certeza que deseja cancelar sua inscrição?')) {
        var inscricaoData = {
            alunoMatricula: matriculaAluno,
            eventoId: idEvento 
        }

        fetch('/inscricoes', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inscricaoData)
        })
        .then(response => {
            if (response.ok) {
                // alert('Inscrição cancelada com sucesso.');
                window.location.reload()
            } else {
                alert('Erro ao cancelar a inscrição.');
            }
        })
        .catch(error => {
            console.error('Erro ao cancelar inscrição:', error);
        });
    }
}

function gerarQRCode () {
    window.location.href = 'validaçao-aluno.html?aluno=' + matriculaAluno + '&evento=' + idEvento;
}

function validar() {
    window.location.href = 'validaçao-professor.html?professor=' + matriculaProfessor + '&evento=' + idEvento;
}
