// 1. Primeiro carrega o header
fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    
    // 2. Depois que o header foi carregado, adiciona a funcionalidade do menu
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('itens');
    
    // Verifica se os elementos existem (para evitar erros em páginas sem menu)
    if (hamburger && menu) {
      // Função para abrir/fechar o menu
      function toggleMenu() {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animação do hamburguer para X
        if (menu.classList.contains('active')) {
          document.body.style.overflow = 'hidden'; // Impede scroll quando menu está aberto
        } else {
          document.body.style.overflow = ''; // Restaura scroll
        }
      }
      
      // Evento de clique no hamburguer
      hamburger.addEventListener('click', toggleMenu);
      
      // Fechar menu ao clicar em um link
      document.querySelectorAll('#itens a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) { // Só fecha se for mobile
            toggleMenu();
          }
        });
      });
      
      // Fechar menu ao clicar fora
      document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && 
            !e.target.closest('#itens') && 
            !e.target.closest('#hamburger')) {
          toggleMenu();
        }
      });
      
      // Fechar menu ao redimensionar a tela (se ficar maior que mobile)
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menu.classList.contains('active')) {
          toggleMenu();
        }
      });
    }
  })
  .catch(error => {
    console.error('Erro ao carregar o header:', error);
  });