function criarElemento(name){
    return document.createElement(name)
}

//Inicia as torres quando carrega a pagina
function IniciarTorre(){
    //Criar barras
    const barra1 = criarElemento('div')
    const barra2 = criarElemento('div')
    const barra3 = criarElemento('div')
    barra1.id = 'barra1'
    barra2.id = 'barra2'
    barra3.id = 'barra3'
    
    //Cria as peças
    const peca1 = criarElemento('div')
    const peca2 = criarElemento('div')
    const peca3 = criarElemento('div')
    const peca4 = criarElemento('div')
    peca1.id = 'peca1'
    peca2.id = 'peca2'
    peca3.id = 'peca3'
    peca4.id = 'peca4'

    barra1.appendChild(peca1)
    barra1.appendChild(peca2)
    barra1.appendChild(peca3)
    barra1.appendChild(peca4)

    const body = document.getElementsByTagName('body')[0]
    body.appendChild(barra1)
    body.appendChild(barra2)
    body.appendChild(barra3)
}

IniciarTorre()