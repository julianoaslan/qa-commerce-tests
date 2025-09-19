# language: pt
Funcionalidade: Adicionar produto ao carrinho

  Contexto:
    Dado que estou autenticado como admin para adicionar produtos

  @api @carrinho
  Cenário: Adicionar um produto ao carrinho com sucesso
    Quando eu envio o produto 1 com a quantidade 1 ao carrinho do usuário autenticado
    Então o status code da resposta de adição deve ser 201
    E a resposta de adição ao carrinho deve conter a mensagem "Produto adicionado ao carrinho com sucesso."
    E ao consultar o carrinho deve existir pelo menos um item