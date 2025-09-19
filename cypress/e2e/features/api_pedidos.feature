# language: pt
Funcionalidade: Listar pedidos do usuário (/orders)

  Contexto:
    Dado que estou autenticado como admin para consultar pedidos

  @api @pedidos
  Cenário: Listar pedidos do usuário autenticado
    Quando eu consulto os pedidos do usuário autenticado
    Então o status code de pedidos deve ser 200
    E a lista de pedidos deve conter pelo menos 1 itens
    E cada pedido retornado deve pertencer ao usuário autenticado

  @api @pedidos @vazio
  Cenário: Consultar pedidos de um usuário inexistente retorna lista vazia
    Quando eu consulto os pedidos do usuário 99999
    Então o status code de pedidos deve ser 200
    E a lista de pedidos deve estar vazia
