/* pega os pacientes salvos no navegador */
let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

/* div onde a lista vai aparecer */
const listaDiv = document.getElementById("listaPacientes");

/* valida se o CPF é válido */
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

/* troca entre aba de cadastro e lista */
function trocarAba(aba){
    document.getElementById("cadastro").style.display = "none";
    document.getElementById("lista").style.display = "none";

    document.getElementById(aba).style.display = "block";

    /* quando abrir lista, atualiza dados */
    if(aba === "lista"){
        pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        render(pacientes);
    }
}

/* salva um novo paciente */
function salvarPaciente(){

    const cpfDigitado = cpf.value.trim();

    /* validações dos campos */
    if(nome.value.trim() === ""){
        alert("Nome é obrigatório.");
        return;
    }

    if(cpfDigitado === ""){
        alert("CPF é obrigatório.");
        return;
    }

    if(nascimento.value === ""){
        alert("Data de nascimento é obrigatória.");
        return;
    }

    if(sexo.value === ""){
        alert("Selecione o sexo.");
        return;
    }

    if(telefone.value.trim() === ""){
        alert("Telefone é obrigatório.");
        return;
    }

    if(email.value.trim() === ""){
        alert("E-mail é obrigatório.");
        return;
    }

    if(endereco.value.trim() === ""){
        alert("Endereço é obrigatório.");
        return;
    }

    if(convenio.value === ""){
        alert("Selecione o convênio.");
        return;
    }

    /* valida CPF */
    if(!validarCPF(cpfDigitado)){
        alert("CPF inválido.");
        return;
    }

    /* atualiza lista antes de verificar duplicado */
    pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    /* verifica se já existe */
    if(pacientes.find(p => p.cpf === cpfDigitado)){
        alert("CPF já cadastrado!");
        return;
    }

    /* cria objeto do paciente */
    const paciente = {
        nome: nome.value.trim(),
        cpf: cpfDigitado,
        nascimento: nascimento.value,
        sexo: sexo.value,
        telefone: telefone.value.trim(),
        email: email.value.trim(),
        endereco: endereco.value.trim(),
        convenio: convenio.value
    };

    /* salva no localStorage */
    pacientes.push(paciente);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    alert("Paciente cadastrado com sucesso.");

    /* limpa os campos */
    nome.value = "";
    cpf.value = "";
    nascimento.value = "";
    sexo.value = "";
    telefone.value = "";
    email.value = "";
    endereco.value = "";
    convenio.value = "";

    /* atualiza lista */
    render(pacientes);
}

/* renderiza os pacientes na tela */
function render(lista){
    listaDiv.innerHTML = "";

    if(lista.length === 0){
        listaDiv.innerHTML = "<p>Nenhum paciente encontrado.</p>";
        return;
    }

    lista.forEach(p => {
        const card = document.createElement("div");
        card.className = "card-paciente";

        card.innerHTML = `
            <h3>${p.nome}</h3>
            <p><strong>CPF:</strong> ${p.cpf}</p>
            <p><strong>Nascimento:</strong> ${p.nascimento}</p>
            <p><strong>Sexo:</strong> ${p.sexo}</p>
            <p><strong>Telefone:</strong> ${p.telefone}</p>
            <p><strong>E-mail:</strong> ${p.email}</p>
            <p><strong>Endereço:</strong> ${p.endereco}</p>
            <p><strong>Convênio:</strong> ${p.convenio}</p>
        `;

        listaDiv.appendChild(card);
    });
}

/* filtra pacientes por nome ou CPF */
function filtrar(){
    const termo = busca.value.toLowerCase();

    pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    const filtrados = pacientes.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.cpf.includes(termo)
    );

    render(filtrados);
}

/* volta para o dashboard */
function voltar(){
    window.location.href = "../Menu/dashboard.html";
}

/* carrega lista ao iniciar */
render(pacientes);