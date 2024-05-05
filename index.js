const express = require('express')
const uuid = require('uuid')

const porta = 3000

const app = express()
app.use(express.json())


const pedidos = []


const middLeware = (request, response, next) => {
    const {id} = request.params

    const index = pedidos.findIndex(item => item.id === id) 

    if (index < 0){ 

        return response.status(404).json({Error: "Pedido não encontrado"})
    }

    request.itemindex = index
    request.itemId = id

    next ()   

}

const checkMetodo = (request, responde, next) => {

    console.log(request.url)
    console.log(request.method)

    next()

}


app.get('/pedidos', checkMetodo, (request, response) =>{
console.log(pedidos)
    return response.json(pedidos)
})



app.post('/pedidos', checkMetodo, (request, response) => {
   
    const {nome, pedido, preco, status} = request.body

    const novoPedido = {id: uuid.v4(), nome, pedido, preco, status}    

    pedidos.push(novoPedido)
    
    return response.status(201).json(novoPedido)    
    

})


app.put('/pedidos/:id', middLeware, checkMetodo, (request, response) =>{

    const {nome, pedido, preco, status} = request.body

    const index = request.itemindex 
    const id = request.itemId

    const pedidoAtualizado = {id,nome, pedido, preco, status}
    

    pedidos[index] = pedidoAtualizado
    
    return response.json(pedidoAtualizado)
})

app.delete('/pedidos/:id', middLeware, checkMetodo, (request, response) =>{
    
    const id = request.itemId 

    const index = request.itemindex 
    
    pedidos.splice(index,1)

    return response.status(204).json()
})

app.get('/pedidos/:id', middLeware, checkMetodo, (request, response) =>{
    
    const id = request.itemId
    
    const meuPedido = pedidos.find(item => item.id ===id)

    console.log(meuPedido)

    return response.json(meuPedido)
})


app.patch('/pedidos/:id', middLeware, checkMetodo, (request, response) =>{

    const {nome, pedido, preco, status} = request.body

    const index = request.itemindex 
    const id = request.itemId

    const statusAtualizado = {id, nome:pedidos[index].nome, pedido:pedidos[index].pedido, preco:pedidos[index].preco, status:"Pronto"}
    
    pedidos[index] = statusAtualizado
    
    return response.json(statusAtualizado)
})




app.listen(porta, () => {
    console.log(`🚀 server started on port ${porta}`)
})
