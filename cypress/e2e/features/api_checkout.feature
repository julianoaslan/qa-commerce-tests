# language: pt
Funcionalidade: Checkout via API (/checkout)

  Contexto:
    Dado que estou autenticado como admin e com um item no carrinho

  @api @checkout
  Cenário: Finalizar pedido com cartão de crédito
    Quando eu finalizo o checkout usando o método "Cartão de crédito"
    Então o status do checkout deve ser 201 e deve retornar um número de pedido

  @api @checkout @erro
  Cenário: Tentar finalizar o checkout sem preencher campos obrigatórios
    Quando eu tento finalizar o checkout com dados inválidos
    Então o status do checkout deve ser 400
    E a mensagem de erro do checkout deve mencionar "required"
