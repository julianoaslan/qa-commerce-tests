# language: pt
Funcionalidade: Autenticação via API (/login)

  @api
  Cenário: Login bem-sucedido retorna 200 e token
    Dado que possuo credenciais válidas
    Quando eu autentico na API de login
    Então o status code deve ser 200
    E a resposta deve conter um token JWT

  @api
  Cenário: Login com senha inválida retorna 401
    Dado que possuo um email válido e uma senha inválida
    Quando eu autentico na API de login
    Então o status code deve ser 401
    E a resposta deve conter a mensagem "Email ou senha incorretos"
