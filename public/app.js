const socket = io();

function adicionarPedido() {
  const pedidoInput = document.getElementById('pedidoInput');
  const pedido = pedidoInput.value.trim();
  if (pedido) {
    socket.emit('adicionarPedido', pedido);
    pedidoInput.value = '';
  }
}

socket.on('atualizarPedidos', (pedidos) => {
  const listaPedidos = document.getElementById('listaPedidos');
  listaPedidos.innerHTML = '';
  pedidos.forEach((pedido, index) => {
    const li = document.createElement('li');
    li.textContent = pedido;
    li.onclick = () => removerPedido(index);
    listaPedidos.appendChild(li);
  });
});

function removerPedido(index) {
  socket.emit('removerPedido', index);
}
