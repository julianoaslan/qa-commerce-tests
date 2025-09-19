# language: pt
Funcionalidade: Remover itens do carrinho

  Contexto:
    Dado que estou autenticado como admin para limpar o carrinho

  @api @carrinho
  Cenário: Remover todos os itens do carrinho do usuário autenticado
    Quando eu removo todos os itens do carrinho do usuário autenticado
    Então o status code da remoção do carrinho deve ser 200
    E a resposta de remoção deve conter a mensagem "Todos os itens do carrinho removidos com sucesso."
    E ao consultar o carrinho novamente ele deve estar vazio
