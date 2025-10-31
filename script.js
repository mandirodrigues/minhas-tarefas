// Seleciona elementos da página
const input = document.getElementById('novaTarefa');
const btnAdicionar = document.getElementById('adicionarBtn');
const lista = document.getElementById('listaTarefas');
const contador = document.getElementById('contador');

// Carrega tarefas do LocalStorage
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Atualiza a lista na tela
function atualizarLista() {
    lista.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.textContent = tarefa.texto;

        if (tarefa.concluida) {
            li.classList.add('concluida');
        }

        // Marca como concluída ao clicar no texto
        li.addEventListener('click', () => {
            tarefas[index].concluida = !tarefas[index].concluida;
            salvarTarefas();
            atualizarLista();
        });

        // Botão de excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = '✖';
        btnExcluir.classList.add('excluir');
        btnExcluir.addEventListener('click', (event) => {
            event.stopPropagation();
            tarefas.splice(index, 1);
            salvarTarefas();
            atualizarLista();
        });

        li.appendChild(btnExcluir);
        lista.appendChild(li);
    });

    atualizarContador();
}

// Adiciona nova tarefa
function adicionarTarefa() {
    const texto = input.value.trim();
    if (texto === '') {
        alert('Digite uma tarefa!');
        return;
    }

    tarefas.push({ texto, concluida: false });
    input.value = '';
    salvarTarefas();
    atualizarLista();
}

// Salva no LocalStorage
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Atualiza contador
function atualizarContador() {
    const pendentes = tarefas.filter(t => !t.concluida).length;
    contador.textContent = `Tarefas pendentes: ${pendentes}`;
}

// Eventos
btnAdicionar.addEventListener('click', adicionarTarefa);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') adicionarTarefa();
});

// Inicializa
atualizarLista();