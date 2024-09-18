const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let croche = []
let feito
exibirMenu()

function exibirMenu(){
    console.log(`
    - Menu Onuvelo -
    1. Adicionar projeto
    2. Listar projetos
    3. Mudar projeto
    4. Concluir projetos
    5. Excluir projeto
    6. Sair    
    `)

    rl.question('Escolha uma opção: ', (opcao) => {
        switch(opcao){
            case '1':
                adicionar()
                break
            case '2':
                listarProjetos()
                break
            case '3':
                mudarProjeto()
                break
            case '4':
                projetoConcluido()
                break
            case '5':
                excluir()
                break
            case '6':
                rl.close()
                break
            default:
                console.log('Opção inválida, tente novamente :)')
                exibirMenu()
        }
    })
}

function adicionar(){
    rl.question('Digite o nome do projeto: ', (nome) => {
        rl.question('Digite o fio/material usado: ', (fio) => {
            rl.question('Data de entrega: ', (data) => {
                rl.question('Preço: ', (preco) => {
                    croche.push({nome: nome, fio: fio, data: data, preco: parseFloat(preco), concluido: false})
                    console.log('Projeto adicionado com sucesso!')
                    exibirMenu()
                })               
            })           
        })
    })
}

function listarProjetos(){
    if(croche.length == 0){
        console.log('Nenhum projeto cadastrado')
    } else {
        console.log('Lista de projetos: ')
        croche.forEach((croches, index) => {
            if(croches.concluido == false){
                feito = 'Não'
            } else if(croches.concluido == true){
                feito = 'Sim'
            }
            console.log(`${index + 1}. Nome: ${croches.nome}
   Fio/material: ${croches.fio}
   Data de entrega: ${croches.data}
   Preço: R$${croches.preco.toFixed(2)}
   Concluído: ${feito}
   `)
        })
    }
    exibirMenu()
}

function mudarProjeto(){
    if(croche.length == 0){
        console.log('Nenhum projeto cadastrado')
        exibirMenu()
    } else {
        console.log('Lista de projetos: ')
        croche.forEach((croches, index) => {
        console.log(`${index + 1}. Nome: ${croches.nome}`)
        })
        rl.question('Digite o número do projeto que deseja mudar: ', (numero) => {
            if(numero > 0 && numero <= croche.length){
                rl.question('Digite o novo nome do projeto: ', (nome) => {
                    rl.question('Digite o novo fio/material usado: ', (fio) => {
                        rl.question('Nova data de entrega: ', (data) => {
                            rl.question('Novo preço: ', (preco) => {
                                croche[numero - 1] = {
                                    nome: nome, 
                                    fio: fio,
                                    data: data, 
                                    preco: parseFloat(preco),
                                }
                                console.log('Projeto alterado com sucesso!!!')
                                exibirMenu()
                            })                           
                        })                       
                    })
                })
            } else {
                console.log('Número inválido, tente novamente!')
                exibirMenu()
            }
        })
    }
}

function projetoConcluido(){
    if(croche.length == 0){
        console.log('Nenhum projeto cadastrado')
        exibirMenu()
    } else {
        console.log('Lista de projetos: ')
        croche.forEach((croches, index) => {1
        console.log(`${index + 1}. Nome: ${croches.nome}`)
        })
        rl.question('Digite o número do projeto que deseja marcar como concluído: ', (numero) => {
            if(numero > 0 && numero <= croche.length){
                croche[numero -1].concluido = true
                console.log('Projeto concluído com sucesso!!!')
                exibirMenu()
            } else {
                console.log('Número inválido, tente novamente!')
                exibirMenu()
            }
        })
    }
}

function excluir(){
    if(croche.length == 0){
        console.log('Nenhum projeto cadastrado')
        exibirMenu()
    } else {
        console.log('Lista de projetos: ')
        croche.forEach((croches, index) => {
        console.log(`${index + 1}. Nome: ${croches.nome}`)
        })
        rl.question('Digite o número do projeto que deseja excluir: ', (numero) => {
            if(numero > 0 && numero <= croche.length){
                croche.splice(numero - 1, 1)
                console.log('Projeto excluido com sucesso!!!')
                exibirMenu()
            } else {
                console.log('Número inválido, tente novamente!')
                exibirMenu()
            } 
        })
    }
}