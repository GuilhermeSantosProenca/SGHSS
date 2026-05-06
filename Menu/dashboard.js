let perfil = null;

/* mostra o usuário logado no topo */
document.getElementById("usuario").textContent =
    localStorage.getItem("usuarioAtivo") || "Usuário";

/* inicia a tela verificando se já existe perfil salvo */
window.onload = () => {
    perfil = localStorage.getItem("perfilAtivo");

    if(!perfil){
        document.getElementById("tela-perfil").style.display = "flex";
    } else {
        document.getElementById("tela-perfil").style.display = "none";
        aplicarPerfil();
    }

    atualizarTextoPerfil();
};

/* navega para a página escolhida */
function ir(pagina){
    window.location.href = pagina;
}

/* sai do sistema e limpa o usuário/perfil */
function logout(){
    localStorage.removeItem("usuarioAtivo");
    localStorage.removeItem("perfilAtivo");
    window.location.href = "../Login/index.html";
}

/* filtra os cards respeitando o perfil escolhido */
function filtrar(){
    const texto = document.getElementById("busca").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const nome = card.innerText.toLowerCase();

        const combinaBusca = nome.includes(texto);
        const permitidoPerfil = verificarPermissao(nome);

        card.style.display = combinaBusca && permitidoPerfil ? "" : "none";
    });
}

/* verifica quais telas cada perfil pode acessar */
function verificarPermissao(nome){

    if(perfil === "medico"){
        return (
            nome.includes("prontuário") ||
            nome.includes("teleconsulta")
        );
    }

    if(perfil === "adm"){
        return (
            nome.includes("pacientes") ||
            nome.includes("agendamento")
        );
    }

    return true;
}

/* salva o perfil escolhido */
function setPerfil(tipo){
    perfil = tipo;

    localStorage.setItem("perfilAtivo", tipo);

    document.getElementById("tela-perfil").style.display = "none";

    aplicarPerfil();
    atualizarTextoPerfil();
}

/* permite trocar o perfil depois */
function mudarPerfil(){
    localStorage.removeItem("perfilAtivo");
    perfil = null;

    document.querySelectorAll(".card").forEach(card => {
        card.style.display = "";
    });

    document.getElementById("tela-perfil").style.display = "flex";
    atualizarTextoPerfil();
}

/* aplica as permissões na tela */
function aplicarPerfil(){
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const nome = card.innerText.toLowerCase();
        const permitidoPerfil = verificarPermissao(nome);

        card.style.display = permitidoPerfil ? "" : "none";
    });
}

/* abre e fecha o menu do usuário */
function toggleUserMenu(){
    const menu = document.getElementById("dropdownUser");

    if(menu.style.display === "block"){
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

/* fecha o menu se clicar fora */
document.addEventListener("click", function(e){
    const userArea = document.querySelector(".user-area");

    if(!userArea.contains(e.target)){
        document.getElementById("dropdownUser").style.display = "none";
    }
});

/* atualiza o texto do perfil no dropdown */
function atualizarTextoPerfil(){
    const perfilTexto = document.getElementById("perfilTexto");
    const perfilSalvo = localStorage.getItem("perfilAtivo");

    perfilTexto.textContent =
        perfilSalvo === "medico" ? "Médico" :
        perfilSalvo === "adm" ? "Administrador" :
        "Não definido";
}

/* mostra o perfil salvo ao abrir */
atualizarTextoPerfil();