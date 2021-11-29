function criarElemento(name) {
    return document.createElement(name)
}

//Inicia as torres quando carrega a pagina
function iniciarTorre(pecas) {
    //Criar barras
    const barra1 = criarElemento('ul')
    const barra2 = criarElemento('ul')
    const barra3 = criarElemento('ul')
    barra1.id = 'barra1'
    barra2.id = 'barra2'
    barra3.id = 'barra3'

    //Cria as peças
    for (let i = pecas; i > 0; i--) {
        const peca = criarElemento('li')
        peca.id = `peca${i}`
        barra1.appendChild(peca)
    }

    const body = document.getElementsByTagName('body')[0]
    body.appendChild(barra1)
    body.appendChild(barra2)
    body.appendChild(barra3)
}



//função que captura o clique de cada barra
function capturarClique() {
    const getBarra1 = document.getElementById('barra1')
    const getBarra2 = document.getElementById('barra2')
    const getBarra3 = document.getElementById('barra3')

    getBarra1.addEventListener('click', moverPeca)
    getBarra2.addEventListener('click', moverPeca)
    getBarra3.addEventListener('click', moverPeca)

}



//Armazena pecas e barras
let pecaEscolhida = ''
let barraPeca = ''
let barraParaColocar = ''

//Zera as variaveis globais
function zerarVariaveisGlobais() {
    pecaEscolhida = ''
    barraPeca = ''
    barraParaColocar = ''
}

//Armazena nas variaveis globais as pecas e barras escolhidas
function armazenaPecasEBarras(event) {
    const barra = event.currentTarget
    const peca = event.target

    //Verifica se clicou em uma peca
    if (peca.tagName === 'LI') {

        //Armazena a primeira peca e barra
        if (pecaEscolhida === '') {
            pecaEscolhida = peca
            barraPeca = barra
            return false
        }

    } else if (pecaEscolhida.tagName === 'LI') {

        barraParaColocar = barra
        return true

    }
}

//Mover Pecas
function moverPeca(event) {
    //Roda a funcao
    if (armazenaPecasEBarras(event)) {

        if (barraParaColocar !== barraPeca) {

            const pecasDaBarraColocar = barraParaColocar.getElementsByTagName('li')
            let ultimaPecaBarraColocar = pecasDaBarraColocar[pecasDaBarraColocar.length - 1]
            ultimaPecaBarraColocar === undefined ? ultimaPecaBarraColocar = {id: 'vazio'} : ultimaPecaBarraColocar
            console.log(parseInt(pecaEscolhida.id.slice(-1)))
            console.log(parseInt(ultimaPecaBarraColocar.id.slice(-1)))

            if (parseInt(pecaEscolhida.id.slice(-1)) < parseInt(ultimaPecaBarraColocar.id.slice(-1)) || ultimaPecaBarraColocar.id === 'vazio') {
                pecaEscolhida.remove()
                barraParaColocar.appendChild(pecaEscolhida)
            }

            zerarVariaveisGlobais()

        } else {
            zerarVariaveisGlobais()
        }
    }
}

//Chama funcoes no carregamento

capturarClique()

function cirarBotoesDificulade() {
    const corpo = document.getElementsByTagName('body')[0]
    const divBotoes = document.createElement('div')
    divBotoes.id = 'divBotoes'
    const botaoFacil = document.createElement('button')
    botaoFacil.id = 'botaoFacil'
    botaoFacil.innerText = 'Fácil'
    const botaoMedio = document.createElement('button')
    botaoMedio.id = 'botaoMedio'
    botaoMedio.innerText = 'Médio'
    const botaoDificil = document.createElement('button')
    botaoDificil.id = 'botaoDificil'
    botaoDificil.innerText = 'Difícil'

    divBotoes.appendChild(botaoFacil)
    divBotoes.appendChild(botaoMedio)
    divBotoes.appendChild(botaoDificil)
    corpo.appendChild(divBotoes)
    escolherDificuldade()
}

function escolherDificuldade() {
    const botaoFacil = document.getElementById('botaoFacil')
    const botaoMedio = document.getElementById('botaoMedio')
    const botaoDificil = document.getElementById('botaoDificil')
    botaoFacil.addEventListener('click', definirDificuldade)
    botaoMedio.addEventListener('click', definirDificuldade)
    botaoDificil.addEventListener('click', definirDificuldade)

}

function definirDificuldade(event) {
    console.log(event.target)
    if (event.target.id === 'botaoFacil') {
        iniciarTorre(3)
    } else if (event.target.id === 'botaoMedio') {
        iniciarTorre(4)
    } else if (event.target.id === 'botaoDificil') {
        iniciarTorre(5)
    }
    document.getElementById('divBotoes').remove()
}

