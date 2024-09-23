const urlParams = new URLSearchParams(window.location.search);
const matriculaAluno = urlParams.get('aluno');

function voltarParaPerfil() {
    window.location.href = 'tela-aluno.html?aluno=' + matriculaAluno; // Redireciona para a página de perfil do aluno
}

function adicionarEvento(evento) {
    disponiveis = document.getElementById("eventos-disponiveis")
    participando = document.getElementById("eventos-participando")
    var eventoitem = document.createElement("li");
    var eventolink = document.createElement("a");

    eventolink.href = 'evento-info.html?aluno=' + matriculaAluno + '&evento=' + evento.id;
    eventolink.textContent = evento.titulo;
    eventolink.className = "evento-link";

    eventoitem.appendChild(eventolink);
    if (evento.alunosInscritos != null && evento.alunosInscritos.includes(matriculaAluno)) {
        participando.appendChild(eventoitem);
    } else {
        disponiveis.appendChild(eventoitem);
    }
}

fetch('/eventos')
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao buscar eventos');
    }
    return response.json(); // Pega o JSON da resposta
})
.then(eventos => {
    eventos.forEach(evento => {
        adicionarEvento(evento);
    })
})
.catch(error => {
    console.error('Erro:', error);
    alert('Erro ao buscar eventos');
});
