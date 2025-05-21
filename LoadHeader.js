// Carrega o cabecalho em todas as paginas, tem que adicionar  <script src="loadHeader.js"></script>
fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });