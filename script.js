
let alunos = [];

const form = document.getElementById('form-aluno');
const tabelaCorpo = document.getElementById('corpo-tabela');
const feedback = document.getElementById('mensagem-feedback');

function exibirMensagem(texto, tipo) {
    feedback.textContent = texto;
    feedback.className = tipo; 
    feedback.classList.remove('hidden');

    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 3000);
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value.trim();
    const matricula = document.getElementById('matricula').value.trim();
    const email = document.getElementById('email').value.trim();
    const turma = document.getElementById('turma').value;

 
    const matriculaExiste = alunos.some(aluno => aluno.matricula === matricula);
    if (matriculaExiste) {
        exibirMensagem("Erro: Esta matrícula já está cadastrada!", "erro");
        document.getElementById('matricula').classList.add('input-erro');
        return; 
    }

    if (nome.length < 3) {
        exibirMensagem("Erro: O nome deve ter no mínimo 3 caracteres.", "erro");
        return;
    }

    document.getElementById('matricula').classList.remove('input-erro');
    
    const novoAluno = {
        id: Date.now(), 
        nome,
        matricula,
        email,
        turma
    };

    alunos.push(novoAluno);
    exibirMensagem("Aluno cadastrado com sucesso!", "sucesso");
    form.reset(); 
    renderizarTabela();
});

function renderizarTabela() {
    tabelaCorpo.innerHTML = "";

    alunos.forEach((aluno) => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.email}</td>
            <td>${aluno.turma}</td>
            <td>
                <button class="btn-remover" onclick="removerAluno(${aluno.id})">Remover</button>
            </td>
        `;

        tabelaCorpo.appendChild(linha);
    });
}

function removerAluno(id) {
    if (confirm("Tem certeza que deseja remover este aluno?")) {
        alunos = alunos.filter(aluno => aluno.id !== id);
        renderizarTabela();
        exibirMensagem("Aluno removido com sucesso.", "sucesso");
    }
}