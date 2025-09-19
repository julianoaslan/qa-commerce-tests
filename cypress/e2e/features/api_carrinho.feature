# language: pt
Funcionalidade: Carrinho do usuário

  Contexto:
    Dado que estou autenticado como admin

  @api @carrinho
  Cenário: Listar itens do carrinho do usuário autenticado
    Quando eu consulto o carrinho do usuário autenticado
    Então o status code do carrinho deve ser 200
    E a resposta do carrinho deve ter um formato válido
