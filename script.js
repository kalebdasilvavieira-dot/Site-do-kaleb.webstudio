// ============================================
// Menu mobile
// ============================================
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha o menu ao clicar em um link (mobile)
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

// ============================================
// Revelar elementos ao rolar a página
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// ============================================
// Formulário de contato
// ============================================
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');

function setError(fieldName, message) {
  const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
  if (errorEl) errorEl.textContent = message || '';
}

function validateForm(data) {
  let isValid = true;

  if (!data.nome.trim()) {
    setError('nome', 'Informe seu nome.');
    isValid = false;
  } else {
    setError('nome', '');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email.trim())) {
    setError('email', 'Informe um e-mail válido.');
    isValid = false;
  } else {
    setError('email', '');
  }

  if (!data.mensagem.trim()) {
    setError('mensagem', 'Conte um pouco sobre o seu projeto.');
    isValid = false;
  } else {
    setError('mensagem', '');
  }

  return isValid;
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = {
      nome: form.nome.value,
      email: form.email.value,
      mensagem: form.mensagem.value,
    };

    if (!validateForm(data)) {
      successMessage.hidden = true;
      return;
    }

    // Sem backend conectado: apenas confirma o envio visualmente.
    // Para conectar de verdade, envie `data` para o seu endpoint aqui.
    successMessage.hidden = false;
    form.reset();
  });
}