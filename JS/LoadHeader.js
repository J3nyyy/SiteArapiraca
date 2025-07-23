// 1. Primeiro carrega o header
fetch("HTML/COMPONENTS/header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    fetch("HTML/COMPONENTS/header.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("header").innerHTML = data;

        // Ativar navegação após inserir o header
        handleNavLinks();

        // Configura o menu hamburguer como você já faz...
        const hamburger = document.getElementById('hamburger');
        const menu = document.getElementById('itens');

        if (hamburger && menu) {
          function toggleMenu() {
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
          }

          hamburger.addEventListener('click', toggleMenu);
          document.querySelectorAll('#itens a').forEach(link => {
            link.addEventListener('click', () => {
              if (window.innerWidth <= 768) toggleMenu();
            });
          });

          document.addEventListener('click', (e) => {
            if (menu.classList.contains('active') &&
              !e.target.closest('#itens') &&
              !e.target.closest('#hamburger')) {
              toggleMenu();
            }
          });

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

    // Essa função deve ser declarada no mesmo escopo ou antes
    function handleNavLinks() {
      const links = document.querySelectorAll('.nav-link');
      const contentDiv = document.getElementById('content'); // ou onde você mostra as páginas

      links.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault(); // evita o # no href
          const page = link.getAttribute('data-page');
          if (page && contentDiv) {
            fetch(page)
              .then(res => res.text())
              .then(html => {
                contentDiv.innerHTML = html;
                // Opcional: scrolla pro topo
                window.scrollTo(0, 0);
              })
              .catch(err => console.error('Erro ao carregar página:', err));
          }
        });
      });
    };
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