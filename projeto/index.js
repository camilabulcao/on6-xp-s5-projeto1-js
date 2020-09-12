console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('--------------------------------------')

const db = require('./database')

const {produtos} = db
produtos.sort((a,b) =>a.preco - b.preco)
console.table(produtos);

const readline = require('readline-sync')
let idProduto, quantidade, subTotal, total, valorDesconto
let produtosComprados = []
let i = 0
let continuar
do {
    continuar = 'S'
    idProduto = readline.question("Digite o id do produto")
    quantidade = readline.question("Digite a quantidade")

    const produtoEncontrado = produtos.find( x => x.id == idProduto)

    if (produtoEncontrado !== null || produtoEncontrado !== undefined){
        const item = { ...produtoEncontrado, quant: quantidade}
        produtosComprados.push(item)

        continuar = readline.question("Deseja algo mais? S/N")

        if (continuar === 'N'){
            let desconto = readline.question("Possui cupom de desconto?")

            if (desconto < 0 && desconto > 15){
                console.log("Não foi possível dar desconto. Valor inválido.")
                desconto = 0
            }
            
            subTotal = calculaSubTotal(produtosComprados)
            valorDesconto = subTotal * (desconto/100)
            total = subTotal - valorDesconto


        }


    }else{
        console.log("Id de produto invalido. Digite novamente")
    }

    i++

} while (continuar === 'S');


function calculaSubTotal (itensAdquiridos){

    let soma = 0

    for (let i = 0; i < itensAdquiridos.length; i++) {
        soma = soma + itensAdquiridos[i].preco;        
    }

    return soma
}

console.table(produtosComprados)
console.log('Desconto ' + valorDesconto)
console.log('Total ' + total)
console.log('Subtotal ' + subTotal)

