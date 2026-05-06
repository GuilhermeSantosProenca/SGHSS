/* evento de envio do formulário */
document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault(); // evita recarregar a página

    /* pega os campos */
    const userInput = document.getElementById("user");
    const passInput = document.getElementById("pass");
    const erro = document.getElementById("msg-erro");

    const user = userInput.value.trim();
    const pass = passInput.value.trim();

    /* limpa mensagem de erro */
    erro.textContent = "";

    /* valida usuário */
    if(user.length < 5){
        erro.textContent = "Usuário deve ter pelo menos 5 caracteres.";
        return;
    }

    /* valida senha */
    if(pass.length < 3){
        erro.textContent = "Senha muito curta.";
        return;
    }

    /* pega usuários salvos no navegador */
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    /* procura usuário ignorando maiúsculo/minúsculo */
    const usuarioEncontrado = usuarios.find(u =>
        u.user.toLowerCase() === user.toLowerCase() &&
        u.senha === pass
    );

    /* se não encontrar, mostra erro */
    if(!usuarioEncontrado){
        erro.textContent = "Usuário ou senha inválidos.";
        return;
    }

    /* salva usuário logado */
    localStorage.setItem("usuarioAtivo", usuarioEncontrado.user);

    /* mensagem de sucesso */
    alert("Login realizado com sucesso!");

    /* redireciona para o dashboard */
    window.location.href = "../Menu/dashboard.html";
});

/* vai para tela de cadastro */
function irCadastro(){
    window.location.href = "../Cadastrar-Login/cadastro.html";
}