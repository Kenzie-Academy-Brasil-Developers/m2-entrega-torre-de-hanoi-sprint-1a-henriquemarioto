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
//Cria os botões de dificuldade e os mostra na tela
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
//Faz com que os botões definam qual dificuldade foi selecionada
function escolherDificuldade() {
    const botaoFacil = document.getElementById('botaoFacil')
    const botaoMedio = document.getElementById('botaoMedio')
    const botaoDificil = document.getElementById('botaoDificil')
    botaoFacil.addEventListener('click', definirDificuldade)
    botaoMedio.addEventListener('click', definirDificuldade)
    botaoDificil.addEventListener('click', definirDificuldade)
}
//Aplica a dificuldade ao jogo após ter sido selecionada na função anterior.
function definirDificuldade(event) {
    if (event.target.id === 'botaoFacil') {
        iniciarTorre(3)
    } else if (event.target.id === 'botaoMedio') {
        iniciarTorre(4)
    } else if (event.target.id === 'botaoDificil') {
        iniciarTorre(5)
    }
    document.getElementById('divBotoes').remove()
    criarBotaoReset()
}
// Cria o botao reset
function criarBotaoReset() {
    const corpo = document.getElementsByTagName('body')[0]
    const divReset = document.createElement('div')
    const botaoReset = document.createElement('button')
    botaoReset.id = 'botaoReset'
    botaoReset.innerText = 'Recomeçar'
    corpo.appendChild(divReset)
    divReset.appendChild(botaoReset)
    botaoReset.addEventListener('click', resetarJogo)
}
// faz com que o botão reset acabe o jogo atual e volte para a seleção de dificuldade
function resetarJogo() {
    const corpo = document.getElementsByTagName('body')[0]
    corpo.innerHTML = ''
    cirarBotoesDificulade()
}