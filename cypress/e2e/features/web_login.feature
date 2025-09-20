# language: pt
Funcionalidade: Login web

  @web @login
  Cenário: Login com credenciais válidas
    Dado que estou na home
    Quando acesso a página de login pela navbar
    E preencho o formulário de login com o usuário padrão
    E envio o formulário de login
    Então devo ver a área "Minha conta" com a saudação do admin

  @web @login @erro
  Cenário: Login com senha inválida
    Dado que estou na home
    Quando acesso a página de login pela navbar
    E preencho o formulário de login com o usuário padrão
    E informo a senha "senha_incorreta!"
    E envio o formulário de login
    Então devo permanecer na página de Login
    E devo ver a mensagem de erro "Email ou senha incorretos."
