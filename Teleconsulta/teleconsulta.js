/* pega os elementos principais da tela */
const listaDiv = document.getElementById("listaConsultas");
const area = document.getElementById("areaConsulta");

/* guarda a consulta selecionada */
let consultaAtual = null;

/* retorna a data de hoje no formato correto */
function hoje(){
    return new Date().toISOString().split("T")[0];
}

/* volta para o dashboard */
function voltar(){
    window.location.href = "../Menu/dashboard.html";
}

/* carrega as consultas marcadas para o dia atual */
function carregarConsultas(){

    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
    const hojeData = hoje();

    listaDiv.innerHTML = "";

    /* filtra apenas consultas do dia */
    const consultasHoje = consultas.filter(c => c.data === hojeData);

    if(consultasHoje.length === 0){
        listaDiv.innerHTML = "Nenhuma consulta hoje.";
        return;
    }

    /* monta a lista de consultas */
    consultasHoje.forEach(c => {

        let div = document.createElement("div");

        div.className = "item";
        div.textContent = `${c.hora || "--"} - ${c.nome}`;

        div.onclick = () => abrirConsulta(c);

        listaDiv.appendChild(div);
    });
}

/* abre os dados da consulta selecionada */
function abrirConsulta(c){

    consultaAtual = c;

    const dados = JSON.parse(localStorage.getItem("prontuario_" + c.cpf)) || {
        evolucao: ""
    };

    area.innerHTML = `
        <h4>${c.nome}</h4>
        <p><strong>Hora:</strong> ${c.hora || "--"}</p>
        <p><strong>Médico:</strong> ${c.medico}</p>

        <div class="video">
            📹 Videochamada (Simulação)
        </div>

        <h4>Evolução</h4>
        <textarea id="evolucao">${dados.evolucao}</textarea>

        <button onclick="iniciar()">Iniciar</button>
        <button onclick="finalizar()">Finalizar</button>
    `;
}

/* simula início da teleconsulta */
function iniciar(){
    alert("Consulta iniciada!");
}

/* finaliza a teleconsulta e salva a evolução no prontuário */
function finalizar(){

    if(!consultaAtual){
        alert("Selecione uma consulta!");
        return;
    }

    const evolucao = document.getElementById("evolucao").value;

    const dados = {
        evolucao: evolucao
    };

    localStorage.setItem("prontuario_" + consultaAtual.cpf, JSON.stringify(dados));

    alert("Consulta finalizada e salva!");
}

/* inicia a tela carregando as consultas */
carregarConsultas();