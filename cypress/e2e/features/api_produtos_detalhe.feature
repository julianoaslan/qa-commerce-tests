# language: pt
Funcionalidade: Detalhar produto por ID

  Contexto:
    Dado que a API de produtos está disponível

  @api @produtos
  Esquema do Cenário: Buscar detalhes do produto existente
    Quando eu consulto o produto de id <id>
    Então o status code de detalhes deve ser 200
    E o corpo deve conter o id <id>, nome, preço e imagem válidos

    Exemplos:
      | id |
      | 2  |
      | 3  |
      | 4  |
      | 5  |
