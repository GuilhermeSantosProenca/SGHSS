/* pega os elementos principais da tela */
const listaDiv = document.getElementById("listaPacientes");
const conteudo = document.getElementById("conteudo");

/* guarda o paciente selecionado */
let pacienteAtual = null;

/* volta para o dashboard */
function voltar(){
    window.location.href = "../Menu/dashboard.html";
}

/* carrega os pacientes cadastrados */
function carregarPacientes(){

    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    listaDiv.innerHTML = "";

    pacientes.forEach(p => {
        let div = document.createElement("div");

        div.className = "item";
        div.textContent = `${p.nome} - CPF: ${p.cpf}`;

        div.onclick = () => abrirProntuario(p);

        listaDiv.appendChild(div);
    });
}

/* abre o prontuário do paciente selecionado */
function abrirProntuario(p){

    pacienteAtual = p;

    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];

    /* busca consultas desse paciente */
    const historico = consultas.filter(c => c.nome === p.nome);

    /* pega dados salvos do prontuário */
    const dados = JSON.parse(localStorage.getItem("prontuario_" + p.cpf)) || {
        evolucao: "",
        prescricao: "",
        atestado: "",
        observacoes: ""
    };

    let html = `
        <h4>${p.nome}</h4>
        <p><strong>CPF:</strong> ${p.cpf}</p>

        <h4>Histórico</h4>
    `;

    /* mostra histórico ou mensagem vazia */
    if(historico.length === 0){
        html += "<p>Nenhuma consulta registrada.</p>";
    } else {
        historico.forEach(c => {
            html += `
                <div class="consulta">
                    <p><strong>Data:</strong> ${c.data}</p>
                    <p><strong>Médico:</strong> ${c.medico}</p>
                </div>
            `;
        });
    }

    /* campos do prontuário */
    html += `
        <h4>Evolução</h4>
        <textarea id="evolucao">${dados.evolucao}</textarea>

        <h4>Prescrição</h4>
        <textarea id="prescricao">${dados.prescricao}</textarea>

        <h4>Atestado</h4>
        <textarea id="atestado">${dados.atestado}</textarea>

        <h4>Observações</h4>
        <textarea id="obs">${dados.observacoes}</textarea>

        <button onclick="salvar()">Salvar</button>
    `;

    conteudo.innerHTML = html;
}

/* salva os dados do prontuário */
function salvar(){

    if(!pacienteAtual){
        alert("Selecione um paciente!");
        return;
    }

    const dados = {
        evolucao: document.getElementById("evolucao").value,
        prescricao: document.getElementById("prescricao").value,
        atestado: document.getElementById("atestado").value,
        observacoes: document.getElementById("obs").value
    };

    localStorage.setItem("prontuario_" + pacienteAtual.cpf, JSON.stringify(dados));

    alert("Prontuário salvo!");
}

/* inicia carregando os pacientes */
carregarPacientes();