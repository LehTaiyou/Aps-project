document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Coleta os dados do formulário
    var titulo = document.getElementById('titulo').value;
    var descricao = document.getElementById('descricao').value;
    var local = document.getElementById('local').value;
    var data = document.getElementById('data').value;
    var cargaHoraria = parseFloat(document.getElementById('carga-horaria').value);
    var maxParticipantes = parseInt(document.getElementById('participantes').value);

    // Verifica se a data está no formato dd/MM/yyyy usando uma expressão regular
    var datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(data)) {
        alert("Por favor, insira a data no formato DD/MM/YYYY.");
        return;
    }

    // Converte a data de dd/MM/yyyy para yyyy-MM-dd
    var dateParts = data.split("/");  // Divide a data em [dia, mes, ano]
    var formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];  // Reorganiza para yyyy-MM-dd

    // Cria um objeto com os dados
    var eventoData = {
        titulo: titulo,
        descricao: descricao,
        local: local,
        data: formattedDate,  // Agora a data está no formato yyyy-MM-dd
        cargaHoraria: cargaHoraria,
        maxParticipantes: maxParticipantes
    };

    // Envia os dados via fetch
    fetch('/eventos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventoData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao criar o evento');
        }
        return response.json(); // Pega o JSON da resposta
    })
    .then(() => {
        alert('Evento criado com sucesso');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar o formulário: ' + error.message);
    });
});
