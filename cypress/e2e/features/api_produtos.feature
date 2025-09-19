# language: pt
Funcionalidade: Produtos da API (/produtos)

  @api @produtos
  Cenário: Listar produtos paginados
    Dado que possuo o endpoint de produtos configurado
    Quando eu consulto a lista de produtos na página 1 com limite 1
    Então o status code da lista de produtos deve ser 200
    E a resposta de produtos deve conter pelo menos 1 item e a página atual 1

  @api @produtos
  Cenário: Consultar detalhes de um produto existente
    Dado que possuo o endpoint de produtos configurado
    Quando eu consulto o produto 1
    Então o status code da consulta por produto deve ser 200
    E a resposta de produto deve conter o id 1 e campos básicos

  @api @produtos @erro
  Cenário: Consultar um produto inexistente
    Dado que possuo o endpoint de produtos configurado
    Quando eu consulto o produto 99999
    Então o status code da consulta por produto deve ser 404
    E a resposta de erro de produto deve mencionar "não encontrado"
