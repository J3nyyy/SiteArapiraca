// Exponha uma função global para o loader chamar depois que o HTML for inserido
window.initCarousel = function(root) {
  // "root" é o contêiner onde o HTML do Produtos foi colocado (ex: #content)
  const prevBtn = root.querySelector(".prev");
  const nextBtn = root.querySelector(".next");
  const carouselInner = root.querySelector(".carousel-inner");
  const produtos = root.querySelectorAll(".produto");

  if (!prevBtn || !nextBtn || !carouselInner || produtos.length === 0) {
    return () => {}; // nada a limpar
  }

  // Garanta a largura correta de cada slide
  produtos.forEach(p => (p.style.flex = "0 0 100%"));

  let index = 0;

  function showSlide(i) {
    if (i < 0) index = produtos.length - 1;
    else if (i >= produtos.length) index = 0;
    else index = i;

    carouselInner.style.transform = `translateX(${-index * 100}%)`;
  }

  prevBtn.addEventListener("click", () => showSlide(index - 1));
  nextBtn.addEventListener("click", () => showSlide(index + 1));

  const timer = setInterval(() => showSlide(index + 1), 5000);

  // retorna uma função para limpar o intervalo ao sair da página
  return () => clearInterval(timer);
};