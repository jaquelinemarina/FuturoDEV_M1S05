// Simulação de base de dados de produtos
let produtos = {
    '1': { nome: 'Abacate', preco: 3.99 },
    '2': { nome: 'Abacaxi', preco: 5.99 },
    '3': { nome: 'Acerola', preco: 0.80 },
    '4': { nome: 'Amora', preco: 0.90 },
    '5': { nome: 'Banana', preco: 0.99 },
    '6': { nome: 'Laranja', preco: 1.50 },
    '7': { nome: 'Lichia', preco: 2.00 },
    '8': { nome: 'Limão', preco: 1.99 },
    '9': { nome: 'Maçã', preco: 2.50 },
    '10': { nome: 'Mamão', preco: 5.50 },
    '11': { nome: 'Manga', preco: 3.00 },
    '12': { nome: 'Melancia', preco: 15.00 }
}

//Ex 2 - Adicione um evento ao botão de consultar preço do produto
function consultarPreco() {
    let codigo = document.getElementById('codigoProduto').value
    let produto = produtos[codigo]
    if (produto) {
        document.getElementById('resultado').innerHTML = produto.nome + ' - R$ ' + produto.preco.toFixed(2) + ' a unidade '
    } else {
        document.getElementById('resultado').innerHTML = 'Produto não encontrado.'
    }
}

//Ex 3 - Adicione um evento ao botão de comprar o produto
document.querySelector('#comprarProduto').addEventListener('click', function () {
    let nomeProduto = produtos.nome
    let precoProduto = produtos.preco
})

// Função para simular a compra do produto
let carrinho = []

function comprarProduto() {
    let codigo = document.getElementById('codigoProduto').value
    let produto = produtos[codigo]

    if (produto) {
        carrinho.push(produto)
        atualizarQuantidadeCarrinho()
        atualizarListaCarrinho()
        calcularTotal()
        salvarCarrinhoLocalStorage()

    } else {
        alert('Nenhum produto foi selecionado.\nPor favor, digite um código válido.')
    }
}

// Ex 6 - Coloque na tela o número de produtos presentes no carrinho de forma dinâmica
function atualizarQuantidadeCarrinho() {
    let quantidadeCarrinho = document.getElementById('quantidadeCarrinho')
    quantidadeCarrinho.textContent =  carrinho.length
}

// Função para atualizar a lista dos produtos no carrinho
function atualizarListaCarrinho() {
    let listaCarrinho = document.getElementById('listaCarrinho')
    listaCarrinho.innerHTML = '' // Limpa a lista atual

    carrinho.forEach(function (produto) {
        let li = document.createElement('li')
        li.textContent = produto.nome + ' - R$' + produto.preco.toFixed(2)
        listaCarrinho.appendChild(li)
    });
}

// Ex 4 - Adicione um botão para consultar o valor total da compra
function calcularTotal() {
    let total = carrinho.reduce(function (acc, produto) {
        return acc + produto.preco
    }, 0);

    //Ex 5 - Coloque na tela o valor total do carrinho de forma dinâmica
    let totalCarrinho = document.getElementById('totalCarrinho')
    if (total > 0) {
        totalCarrinho.textContent = 'Total R$ ' + total.toFixed(2)
    } else {
        totalCarrinho.textContent = 'Carrinho vazio'
    }
}

//Ex 7 - Adicione os itens do carrinho em localStorage para manter armazenado
function salvarCarrinhoLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
}

// Função para carregar o carrinho do localStorage quando a página é carregada
function carregarCarrinhoLocalStorage() {
    let carrinhoSalvo = localStorage.getItem('carrinho')
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo)
        atualizarQuantidadeCarrinho()
        atualizarListaCarrinho()
    }
}
document.addEventListener('DOMContentLoaded', carregarCarrinhoLocalStorage) // Adiciona o evento DOMContentLoaded para carregar o carrinho

// Função para limpar o carrinho
function limparCarrinho() {
    carrinho = [] // Redefine o carrinho para um array vazio

    atualizarQuantidadeCarrinho()
    atualizarListaCarrinho()
    calcularTotal()
    localStorage.removeItem('carrinho') // Remove o carrinho do localStorage
}
document.querySelector('#botaoLimparCarrinho').addEventListener('click', limparCarrinho);