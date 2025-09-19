# language: pt
Funcionalidade: Usuários POST e GET

  @api @usuarios
  Cenário: Criar usuário e validar na listagem
    Dado que tenho um usuário aleatório para cadastro
    Quando eu crio esse usuário
    Então o status da criação de usuário deve ser 201
    E a resposta de criação deve conter a mensagem "Usuário criado com sucesso."
    Quando eu listar os usuários
    Então o status da listagem de usuários deve ser 200
    E a lista de usuários deve conter o e-mail do usuário gerado

  @api @usuarios @erro
  Cenário: Tentar criar o mesmo e-mail deve retornar 400
    Dado que tenho um usuário aleatório para cadastro
    E que eu já criei esse usuário com sucesso
    Quando eu tento criar novamente o mesmo usuário
    Então o status da criação duplicada deve ser 400
    E a resposta de erro da criação duplicada deve conter a mensagem "Email já cadastrado."
