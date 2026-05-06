const tabela = document.getElementById("tabela");
let horaSelecionada = "";

/* gera os horários da agenda */
function gerarHorarios(){
    let horarios = [];

    for(let i = 8; i <= 17; i++){
        horarios.push(i + ":00");
        horarios.push(i + ":30");
    }

    return horarios;
}

/* define a data atual ao abrir a tela */
function definirDataHoje(){
    const hoje = new Date().toISOString().split("T")[0];
    document.getElementById("data").value = hoje;
}

/* carrega a agenda conforme médico e data */
function carregarAgenda(){

    tabela.innerHTML = "";

    const medico = medicoEl().value;
    const data = dataEl().value;
    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];

    gerarHorarios().forEach(hora => {

        const agendamento = consultas.find(c =>
            c.hora === hora &&
            c.medico === medico &&
            c.data === data
        );

        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${hora}</td>
            <td>${agendamento ? agendamento.nome : "-"}</td>
            <td>
                ${agendamento
                    ? `<span class="ocupado">Ocupado</span>
                       <button onclick="cancelar('${hora}')">Cancelar</button>`
                    : `<button onclick="abrirModal('${hora}')">Agendar</button>`
                }
            </td>
        `;

        tabela.appendChild(tr);
    });
}

/* abre o modal para escolher o paciente */
function abrirModal(hora){

    if(!dataEl().value){
        alert("Selecione uma data.");
        return;
    }

    horaSelecionada = hora;

    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    const lista = document.getElementById("listaPacientes");

    lista.innerHTML = "";

    if(pacientes.length === 0){
        lista.innerHTML = "<p>Nenhum paciente cadastrado.</p>";
    }

    pacientes.forEach(p => {
        let div = document.createElement("div");

        div.className = "item";
        div.textContent = `${p.nome} - CPF: ${p.cpf}`;

        div.onclick = () => selecionarPaciente(p);

        lista.appendChild(div);
    });

    document.getElementById("modal").style.display = "flex";
}

/* salva o agendamento do paciente escolhido */
function selecionarPaciente(p){

    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];

    consultas.push({
        hora: horaSelecionada,
        nome: p.nome,
        cpf: p.cpf,
        medico: medicoEl().value,
        data: dataEl().value
    });

    localStorage.setItem("consultas", JSON.stringify(consultas));

    fecharModal();
    alert("Consulta agendada!");
    carregarAgenda();
}

/* cancela uma consulta marcada */
function cancelar(hora){

    let consultas = JSON.parse(localStorage.getItem("consultas")) || [];

    consultas = consultas.filter(c =>
        !(c.hora === hora &&
          c.medico === medicoEl().value &&
          c.data === dataEl().value)
    );

    localStorage.setItem("consultas", JSON.stringify(consultas));

    alert("Consulta cancelada!");
    carregarAgenda();
}

/* pega o campo do médico */
function medicoEl(){
    return document.getElementById("medico");
}

/* pega o campo da data */
function dataEl(){
    return document.getElementById("data");
}

/* fecha o modal */
function fecharModal(){
    document.getElementById("modal").style.display = "none";
}

/* volta para o menu */
function voltar(){
    window.location.href = "../Menu/dashboard.html";
}

/* atualiza a agenda quando mudar médico ou data */
medicoEl().addEventListener("change", carregarAgenda);
dataEl().addEventListener("change", carregarAgenda);

/* inicia a tela */
definirDataHoje();
carregarAgenda();