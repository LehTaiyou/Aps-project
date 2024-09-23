const urlParams = new URLSearchParams(window.location.search);
const matriculaProfessor = urlParams.get('professor');

fetch('/professores/' + matriculaProfessor)
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao buscar professor');
    }
    return response.json(); // Pega o JSON da resposta
})
.then(result => {
    document.getElementById('nome-professor').textContent = result.nome;

    document.getElementById('matricula-professor').textContent = result.matricula;
})
.catch(error => {
    console.error('Erro:', error);
    alert('Erro ao buscar professor');
});

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

function adicionarEvento(evento) {
    listaEventos = document.getElementById("eventos")

    var eventoitem = document.createElement("li");
    var eventolink = document.createElement("a");

    eventolink.href = 'evento-info.html?professor=' + matriculaProfessor + '&evento=' + evento.id;
    eventolink.textContent = evento.titulo;
    eventolink.className = "evento-link";

    eventoitem.appendChild(eventolink);
    if (evento.professorResponsavel == matriculaProfessor) {
        listaEventos.appendChild(eventoitem);
    }
}

// Função para redirecionar para a página de login
function voltarParaLogin() {
    window.location.href = 'login.html'; // Redireciona para login.html
}

// Função para redirecionar para a página de cadastro de evento
function criarEvento() {
    window.location.href = 'cadastro-evento.html?professor=' + matriculaProfessor; // Redireciona para cadastro-de-evento.html
}