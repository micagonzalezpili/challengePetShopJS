const button = document.getElementById("button")
function enviarFormulario() {
  // Mostrar la ventana emergente
  document.getElementById('myModal').style.display = 'block';
}

function cerrarModal() {
  // Cerrar la ventana emergente
  document.getElementById('myModal').style.display = 'none';
  window.location.href = "inicio.html"
}