const urlParams = new URLSearchParams(window.location.search);
const matriculaAluno = urlParams.get('aluno');

fetch('/alunos/' + matriculaAluno)
.then(response => {
    if (!response.ok) {
        throw new Error('Erro ao buscar aluno');
    }
    return response.json(); // Pega o JSON da resposta
})
.then(result => {
    console.log(result)
    document.getElementById('nome-aluno').textContent = result.nome;

    document.getElementById('matricula-aluno').textContent = result.matricula;

    const horasCompletadas = result.horasCumpridas;
    const horasTotais = 22;
    document.getElementById('horas-completas').textContent = `${horasCompletadas}/${horasTotais}`;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${(horasCompletadas / horasTotais) * 100}%`;
})
.catch(error => {
    console.error('Erro:', error);
    alert('Erro ao buscar aluno');
});

// Função para redirecionar para a página de visualização de eventos
function irParaEventos() {
    window.location.href = 'visualizaçao-dos-eventos.html?aluno=' + matriculaAluno; // Redireciona para a página de eventos
}

// Função para redirecionar para a página de login (logoff)
function fazerLogoff() {
    window.location.href = 'login.html'; // Redireciona para a página de login
}
