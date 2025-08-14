
async function loadHeader() {
  try {
    const res = await fetch("HTML/COMPONENTS/header.html");
    const html = await res.text();
    document.getElementById("header").innerHTML = html;

    // Ativar navegação após inserir o header
    handleNavLinks();

    // Configurar menu hambúrguer
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
  } catch (error) {
    console.error('Erro ao carregar o header:', error);
  }
}

function handleNavLinks() {
  const links = document.querySelectorAll('.nav-link');
  const contentDiv = document.getElementById('content');

  links.forEach(link => {
    link.addEventListener('click', async e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      const index = pages.indexOf(page);
      if (index !== -1) {
        await loadPage(index);
      }
    });
  });
}

// Quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", async () => {
  await loadHeader();   // primeiro carrega o header
  await loadPage(0);    // depois carrega a primeira página com transição
});
