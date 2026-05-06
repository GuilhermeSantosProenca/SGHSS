/* pega o formulário de cadastro */
document.getElementById("formCadastro").addEventListener("submit", function(e){
    e.preventDefault(); // evita recarregar a página

    /* pega os campos */
    const userInput = document.getElementById("novoUser");
    const senhaInput = document.getElementById("novaSenha");
    const msg = document.getElementById("msg");

    const user = userInput.value.trim();
    const senha = senhaInput.value.trim();

    /* pega usuários salvos no navegador */
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    /* limpa mensagem */
    msg.textContent = "";

    /* valida usuário */
    if(user.length < 5){
        msg.textContent = "Usuário deve ter pelo menos 5 caracteres.";
        msg.style.color = "red";
        return;
    }

    /* valida senha */
    if(senha.length < 3){
        msg.textContent = "Senha muito curta.";
        msg.style.color = "red";
        return;
    }

    /* verifica se já existe (ignorando maiúsculo/minúsculo) */
    let existe = usuarios.find(u => u.user.toLowerCase() === user.toLowerCase());

    if(existe){
        msg.textContent = "Usuário já existe!";
        msg.style.color = "red";
        return;
    }

    /* adiciona novo usuário */
    usuarios.push({
        user: user,
        senha: senha
    });

    /* salva no localStorage */
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    /* mensagem de sucesso */
    msg.textContent = "Conta criada com sucesso!";
    msg.style.color = "green";

    /* limpa os campos */
    userInput.value = "";
    senhaInput.value = "";
});

/* volta para tela de login */
function voltar(){
    window.location.href = "../Login/index.html";
}