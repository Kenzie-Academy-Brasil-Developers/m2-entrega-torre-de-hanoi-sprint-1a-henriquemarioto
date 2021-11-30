//body
const body = document.getElementsByTagName('body')[0]

//Cria elementos
function criarElemento(name) {
    return document.createElement(name)
}

//Inicia as torres quando carrega a pagina
function iniciarTorre(pecas) {
    //Criar container
    const container = criarElemento('div')
    container.id = 'container'

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

    container.appendChild(barra1)
    container.appendChild(barra2)
    container.appendChild(barra3)

    body.appendChild(container)
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
function resetarVariaveisGlobais() {
    pecaEscolhida = ''
    barraDaPeca = ''
    barraParaColocar = ''
    movimentos = 0
}

//Zera variaveis de movimento
function resetarVariaveisMovimento(){
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

            resetarVariaveisMovimento()

        } else {
            resetarVariaveisMovimento()
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
            alertaVitoria()
        }
    }
}

//Cria os botes para escolher dificuldade
function cirarBotoesDificulade() {
    const divBotoes = criarElemento('div')
    const botaoFacil = criarElemento('button')
    const botaoMedio = criarElemento('button')
    const botaoDificil = criarElemento('button')

    divBotoes.id = 'divBotoes'
    botaoFacil.id = 'botaoFacil'
    botaoMedio.id = 'botaoMedio'
    botaoDificil.id = 'botaoDificil'

    botaoDificil.innerText = 'Difícil'
    botaoMedio.innerText = 'Médio'
    botaoFacil.innerText = 'Fácil'

    divBotoes.appendChild(botaoFacil)
    divBotoes.appendChild(botaoMedio)
    divBotoes.appendChild(botaoDificil)
    body.appendChild(divBotoes)
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

    iniciarJogo()
}

// Cria o botao reset
function criarBotaoReset() {
    const divReset = document.createElement('div')
    const botaoReset = document.createElement('button')

    botaoReset.id = 'botaoReset'
    botaoReset.innerText = 'Recomeçar'
    body.appendChild(divReset)
    divReset.appendChild(botaoReset)
    botaoReset.addEventListener('click', resetarJogo)
}
// faz com que o botão reset acabe o jogo atual e volte para a seleção de dificuldade
function resetarJogo() {
    body.innerHTML = ''
    resetarVariaveisGlobais()
    cirarBotoesDificulade()
}

//Contador de movimentos
let movimentos = 0
function contarMovimentos() {
    movimentos++
    document.getElementById('contador').innerText = `movimentos: ${movimentos}`
}

//Criar contador de movimentos na tela
function criarContadorDeMovimentos(){
    const div = criarElemento('div')
    const p = criarElemento('p')

    p.innerText = `movimentos: ${movimentos}`
    p.id = 'contador'

    div.appendChild(p)
    body.appendChild(div)
}

//Inicia o jogo
function iniciarJogo(){
    resetarVariaveisGlobais()
    criarContadorDeMovimentos()
    iniciarTorre(numPecas)
    capturarClique()
    document.getElementById('divBotoes').remove()
    criarBotaoReset()
}

function alertaVitoria() {
    const corpo = document.getElementsByTagName('body')[0]
    const divVitoria = criarElemento('div')
    divVitoria.id = 'divVitoria'
    const alertaVitoria = criarElemento('div')
    alertaVitoria.id = 'alertaVitoria'
    const alertaTexto = criarElemento('p')
    alertaTexto.id = 'alertaTexto'
    alertaTexto.innerText = 'Parabéns! \nVocê moveu todas as peças corretamente!'

    corpo.appendChild(divVitoria)
    divVitoria.appendChild(alertaVitoria)
    alertaVitoria.appendChild(alertaTexto)

    setTimeout(() => {removerAlertaVitoria()}, 2000)
}   

function removerAlertaVitoria() {
    document.getElementById('divVitoria').remove()
}


//Funcoes ativadas no carregamento da pagina
cirarBotoesDificulade()