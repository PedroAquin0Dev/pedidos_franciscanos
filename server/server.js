const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let pedidos = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.emit('atualizarPedidos', pedidos);

  socket.on('adicionarPedido', (pedido) => {
    pedidos.push(pedido);
    io.emit('atualizarPedidos', pedidos);
  });

  socket.on('removerPedido', (index) => {
    pedidos.splice(index, 1);
    io.emit('atualizarPedidos', pedidos);
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
