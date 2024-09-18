const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

mongoose.connect("").then(() => console.log('Conectado ao MongoDB'))
.catch((erro) => console.error('Erro ao conectar ao MongoBD: ', erro))

const esquemaProjeto = new mongoose.Schema({
    nome: { type: String, required: true},
    fio: {type: String, required: true},
    data: {type: String, required: true },
    preco: {type: Number, required: true},
    concluido: {type: String, required: true}
})

const Projeto = mongoose.model('Projeto', esquemaProjeto)

//LISTAR
async function listarProjetos(){
    try{
        return await Projeto.find()
    } catch(erro){
    console.error('Erro ao listar projetos: '. erro)
    throw erro
    }
}

app.get("/projetos", async (req, res) => {
    try{
        const projetos = await listarProjetos()
        res.status(200).json(projetos)
    } catch(erro){
        res.status(500).json({mensagem: 'Erro ao listar projetos', erro: erro.message})
    }
})

//DELETAR
async function deletarProjeto(id){
    try{
        const projetoDeletado = await Projeto.findByIdAndDelete(id)
        return projetoDeletado
    } catch(erro){
        console.error('Erro ao deletar projeto: ', erro)
        throw erro
    }
}

app.delete('/projeto/:id', async (req, res) => {
    try{
        const {id} = req. params
        const projetoDeletado = await deletarProjeto(id)
        if(projetoDeletado){
            res.status(200).json({mensagem: 'Projeto deletado com sucesso', projeto: projetoDeletado})
        } else{
            res.status(404).json({mensagem: 'Projeto não encontrado'})
        }
    } catch (erro){
        res.status(500).json({mensagem: "Erro ao deletar projeto", erro: erro.message})
    }
})

const port = 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})