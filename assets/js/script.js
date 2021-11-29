//Cria elementos
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
let barraDaPeca = ''
let barraParaColocar = ''

//Zera as variaveis globais
function zerarVariaveisGlobais() {
    pecaEscolhida = ''
    barraDaPeca = ''
    barraParaColocar = ''
}

//Armazena nas variaveis globais as pecas e barras escolhidas
function armazenaPecasEBarras(event) {
    const barra = event.currentTarget
    const peca = event.target

    //Verifica se clicou em uma peca
    if (peca.tagName === 'LI') {

        //Verifica se é a peca de cima
        if (verficarPecaDeCima(event)) {
            //Armazena a primeira peca e barra
            if (pecaEscolhida === '') {
                pecaEscolhida = peca
                barraDaPeca = barra
                return false
            }
        }


    } else if (pecaEscolhida.tagName === 'LI') {

        barraParaColocar = barra
        return true

    }
}

//Verificar se é a peça de cima
function verficarPecaDeCima(event) {
    const barraAtual = event.currentTarget
    const primeiraPeca = barraAtual.lastChild

    if (event.target === primeiraPeca) {
        return true
    }
    return false
}

//Mover Pecas
function moverPeca(event) {
    //Verifica se esta armazenado a peca e qual barra ela vai
    if (armazenaPecasEBarras(event)) {

        if (barraParaColocar !== barraDaPeca) {

            const pecasDaBarraColocar = barraParaColocar.getElementsByTagName('li')
            let ultimaPecaBarraColocar = pecasDaBarraColocar[pecasDaBarraColocar.length - 1]
            ultimaPecaBarraColocar === undefined ? ultimaPecaBarraColocar = { id: 'vazio' } : ultimaPecaBarraColocar

            if (parseInt(pecaEscolhida.id.slice(-1)) < parseInt(ultimaPecaBarraColocar.id.slice(-1)) || ultimaPecaBarraColocar.id === 'vazio') {
                barraParaColocar.appendChild(pecaEscolhida)
                contarMovimentos()
                verificaVitoria(event.currentTarget)
            }

            zerarVariaveisGlobais()

        } else {
            zerarVariaveisGlobais()
        }
    }
}

//Verificar vitoria
function verificaVitoria(barra) {
    if (barra.id.slice(-1) !== '1') {
        const pecas = barra.childElementCount
        
        //Verifica se o numero de pecas na ultima barra é o mesmo do numero de pecas total
        if (pecas === numPecas) {
            for (let i = 0; i < pecas.length; i++) {
                //Verifica se elas estão na ordem certa
                if (parseInt(pecas[i].id.slice(-1)) === numPecas - i) {

                }
                else {
                    return false
                }
            }
            console.log('vitoria')
        }
    }
}

//Cria os botes para escolher dificuldade
function cirarBotoesDificulade() {
    const corpo = document.getElementsByTagName('body')[0]
    const divBotoes = criarElemento('div')
    divBotoes.id = 'divBotoes'
    const botaoFacil = criarElemento('button')
    botaoFacil.id = 'botaoFacil'
    botaoFacil.innerText = 'Fácil'
    const botaoMedio = criarElemento('button')
    botaoMedio.id = 'botaoMedio'
    botaoMedio.innerText = 'Médio'
    const botaoDificil = document.createElement('button')
    botaoDificil.id = 'botaoDificil'
    botaoDificil.innerText = 'Difícil'

    divBotoes.appendChild(botaoFacil)
    divBotoes.appendChild(botaoMedio)
    divBotoes.appendChild(botaoDificil)
    corpo.appendChild(divBotoes)
    adicionarEventosBotesDificuldade()
}

//Adiciona evento aos botes de escolher dificuldade
function adicionarEventosBotesDificuldade() {
    const botaoFacil = document.getElementById('botaoFacil')
    const botaoMedio = document.getElementById('botaoMedio')
    const botaoDificil = document.getElementById('botaoDificil')
    botaoFacil.addEventListener('click', definirDificuldade)
    botaoMedio.addEventListener('click', definirDificuldade)
    botaoDificil.addEventListener('click', definirDificuldade)

}

//Defini o valor de pecas pela dificuldade
let numPecas = 0
function definirDificuldade(event) {
    if (event.target.id === 'botaoFacil') {
        numPecas = 3
    } else if (event.target.id === 'botaoMedio') {
        numPecas = 4
    } else if (event.target.id === 'botaoDificil') {
        numPecas = 5
    }
    iniciarTorre(numPecas)
    capturarClique()
    document.getElementById('divBotoes').remove()
}

//Contador de movimentos
let movimentos = 0
function contarMovimentos(){
    movimentos++
    
}

//Funcoes ativadas no carregamento da pagina
cirarBotoesDificulade()
