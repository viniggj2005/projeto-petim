



rotas produtos:
http://localhost:3000/produtos/page/1/3 *esta rota pagina os produtos,o primeiro numero é a pagina e o segundo e o numero de itens na pagina.
voce pode alterar de produtos para pessoas
POST http://localhost:3000/produtos voce pode criar os produtos, passando os campos:valor,nome,descrição e favorito sendo opcional e booleano
POST http://localhost:3000/produtos/favoritar/:id voce passa o id do produto que voce quer favoritar e para favoritar voce deve passar por meio de um body o cpf 
do usuario, caso o usuario não seja adm ele não poderá favoritar

