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
    const barraAtual = event.target.parentNode
    const pecas = barraAtual.getElementsByTagName('li')
    const primeiraPeca = pecas[pecas.length - 1]

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
                pecaEscolhida.remove()
                barraParaColocar.appendChild(pecaEscolhida)
                verificaVitoria()
            }

            zerarVariaveisGlobais()

        } else {
            zerarVariaveisGlobais()
        }

    }
}

//Verificar vitoria
function verificaVitoria(){
    const barra3 = document.getElementById('barra3')
    const pecas = barra3.getElementsByTagName('li')

    if(pecas.length === 4){
        for(let i = 0; i < pecas.length; i++){
            if(parseInt(pecas[i].id.slice(-1)) === 4 - i){
                
            }
            else{
                return false
            }
        }
        console.log('vitoria')
    }
    
}

//Chama funcoes no carregamento
iniciarTorre(4)
capturarClique()