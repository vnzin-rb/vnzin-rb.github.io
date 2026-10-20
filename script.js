(() => {
  'use strict';
  const header = document.querySelector('.header');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('open');
    document.body.classList.remove('menu-open');
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    navigation.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu(); menuButton.focus();
    }
  });
  const mobileLayout = matchMedia('(max-width: 800px)');
  mobileLayout.addEventListener('change', event => { if (!event.matches) closeMenu(); });
  const links = [...navigation.querySelectorAll('a')];
  const floatingTop = document.querySelector('.floating-top');
  function updateNavigation() {
    header.classList.toggle('scrolled', scrollY > 24);
    if (floatingTop) floatingTop.hidden = scrollY < 600;
    let current = 'home';
    document.querySelectorAll('main section[id]').forEach(section => {
      if (section.getBoundingClientRect().top <= 180) current = section.id;
    });
    links.forEach(link => {
      const selected = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  addEventListener('scroll', updateNavigation, { passive: true });
  updateNavigation();
  document.querySelector('#year').textContent = new Date().getFullYear();
  const timelineItems = [...document.querySelectorAll('.timeline-item')];
  function alignTimeline() {
    timelineItems.filter(item => !item.hidden).forEach((item, index) => {
      item.classList.toggle('timeline-left', index % 2 === 0);
    });
  }
  alignTimeline();
  document.querySelectorAll('[data-timeline-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.timelineFilter;
      document.querySelectorAll('[data-timeline-filter]').forEach(option => {
        option.classList.toggle('active', option === button);
        option.setAttribute('aria-pressed', String(option === button));
      });
      timelineItems.forEach(item => { item.hidden = filter !== 'all' && item.dataset.kind !== filter; });
      alignTimeline();
      document.querySelector('.filter-status').textContent = `${timelineItems.filter(item => !item.hidden).length} etapas exibidas.`;
    });
  });

  const projectDialog = document.querySelector('#project-dialog');
  const projectDetails = {
    enterprise: {
      category: 'IA APLICADA / PROJETO DEMONSTRATIVO',
      title: 'Enterprise AI GraphRAG Agent',
      summary: 'Um agente que explora conhecimento empresarial conectado para apoiar respostas com contexto e relações explícitas.',
      challenge: 'Informações sobre clientes, contratos, equipamentos e regras estão relacionadas. Uma pergunta de suporte pode exigir que essas conexões sejam consideradas em conjunto.',
      approach: 'Modelagem do domínio em um grafo de conhecimento, consultas em Cypher e recuperação de relações relevantes para o agente. O projeto simula questões de cobertura, garantia, políticas e atendimento empresarial.',
      technologies: ['Python', 'FastAPI', 'Google ADK', 'Neo4j', 'Cypher', 'SQLite', 'GraphRAG'],
      url: 'https://github.com/vnzin-rb/enterprise-ai-graphrag-agent'
    },
    rag: {
      category: 'PESQUISA / EXPERIMENTAÇÃO',
      title: 'RAG & GraphRAG',
      summary: 'Experimentos de recuperação de conhecimento que também se conectam à minha pesquisa acadêmica em IA conversacional.',
      challenge: 'Respostas de modelos de linguagem podem extrapolar as fontes. O desafio é recuperar contexto e avaliar a fundamentação das respostas.',
      approach: 'Processamento de documentos, recuperação por similaridade e exploração de entidades e relações em grafos. No TCC, comparei RAG tradicional e GraphRAG considerando aderência documental, rastreabilidade e respostas não fundamentadas.',
      technologies: ['Python', 'Google ADK', 'Gemini', 'FAISS', 'LangChain', 'Neo4j'],
      url: 'https://github.com/vnzin-rb/Agentes'
    },
    apis: {
      category: 'DESENVOLVIMENTO / EDUCAÇÃO',
      title: 'Fundamentos de APIs',
      summary: 'Uma estrutura de projeto para aproximar os conceitos de desenvolvimento web da prática de programação.',
      challenge: 'Compreender uma API envolve mais do que chamar um endpoint: é preciso relacionar requisições, lógica da aplicação e organização do código.',
      approach: 'Código e materiais de apoio para estudar a estrutura de uma API em Python. O repositório funciona como ponto de partida para explorar o desenvolvimento de aplicações web.',
      technologies: ['Python', 'APIs REST', 'Desenvolvimento web', 'Educação'],
      url: 'https://github.com/vnzin-rb/Estrutura-basica-web-API'
    }
  };
  if (projectDialog) {
    let projectTrigger = null;
    document.querySelectorAll('[data-project]').forEach(button => {
      button.addEventListener('click', () => {
        const project = projectDetails[button.dataset.project];
        if (!project) return;
        projectTrigger = button;
        ['category', 'title', 'summary', 'challenge', 'approach'].forEach(field => {
          document.querySelector(`#dialog-project-${field}`).textContent = project[field];
        });
        const technologies = document.querySelector('#dialog-project-technologies');
        technologies.replaceChildren(...project.technologies.map(name => {
          const item = document.createElement('li'); item.textContent = name; return item;
        }));
        document.querySelector('#dialog-project-link').href = project.url;
        projectDialog.showModal();
        document.body.classList.add('dialog-open');
      });
    });
    projectDialog.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
    projectDialog.addEventListener('click', event => {
      if (event.target !== projectDialog) return;
      const box = projectDialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) projectDialog.close();
    });
    projectDialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      projectTrigger?.focus();
    });
  }

  // Rede desenhada em canvas: nenhum framework, vídeo ou imagem de fundo pesada.
  const canvas = document.querySelector('#neural-network');
  const context = canvas.getContext('2d');
  const motionButton = document.querySelector('#motion-toggle');
  if (!context) { motionButton.hidden = true; return; }
  const hero = document.querySelector('.hero');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, nodes = [], edges = [], animation = 0, last = 0, elapsed = 0;
  let paused = reducedMotion.matches, inView = true;
  // Seed fixo mantém a composição visual ao redimensionar a janela.
  let seed = 28;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  function resize() {
    width = hero.clientWidth; height = hero.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * ratio; canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    seed = 28;
    const count = width < 700 ? 62 : 115;
    nodes = Array.from({ length: count }, (_, index) => {
      const x = index < count * .83 ? .44 + random() * .6 : random() * .48;
      return { x: x * width, y: random() * height, phase: random() * Math.PI * 2, speed: .18 + random() * .26, radius: random() < .14 ? 2.7 : .8 + random() * 1.2, amplitude: 8 + random() * 18 };
    });
    const maxDistance = width < 700 ? 145 : 200;
    edges = [];
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach((other, offset) => {
        const distance = Math.hypot(node.x - other.x, node.y - other.y);
        if (distance < maxDistance) edges.push({ a: i, b: i + 1 + offset, alpha: (1 - distance / maxDistance) * .4 + .025, pulse: random(), speed: .06 + random() * .09 });
      });
    });
    draw();
  }
  function draw() {
    context.clearRect(0, 0, width, height);
    const points = nodes.map(node => ({ x: node.x + Math.sin(elapsed * node.speed + node.phase) * node.amplitude, y: node.y + Math.cos(elapsed * node.speed * .7 + node.phase) * node.amplitude }));
    edges.forEach((edge, index) => {
      const a = points[edge.a], b = points[edge.b];
      context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y);
      context.strokeStyle = `rgba(0,202,222,${edge.alpha})`; context.lineWidth = .65; context.stroke();
      if (index % 13 !== 0) return;
      const progress = (elapsed * edge.speed + edge.pulse) % 1;
      const x = a.x + (b.x - a.x) * progress, y = a.y + (b.y - a.y) * progress;
      const glow = context.createRadialGradient(x, y, 0, x, y, 9);
      glow.addColorStop(0, '#d5ffff'); glow.addColorStop(.13, '#50faff'); glow.addColorStop(1, 'rgba(0,225,245,0)');
      context.fillStyle = glow; context.beginPath(); context.arc(x, y, 9, 0, Math.PI * 2); context.fill();
    });
    nodes.forEach((node, i) => {
      const point = points[i];
      if (node.radius > 2.5) {
        const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 17);
        glow.addColorStop(0, '#12e8fa80'); glow.addColorStop(1, '#00dfff00');
        context.fillStyle = glow; context.beginPath(); context.arc(point.x, point.y, 17, 0, Math.PI * 2); context.fill();
      }
      context.beginPath(); context.arc(point.x, point.y, node.radius, 0, Math.PI * 2);
      context.fillStyle = node.radius > 2.5 ? '#5cf9ff' : '#00c6dd'; context.fill();
    });
  }
  function frame(timestamp) {
    animation = 0;
    if (paused || !inView || document.hidden) { last = 0; return; }
    if (!last) last = timestamp;
    elapsed += Math.min((timestamp - last) / 1000, .05); last = timestamp;
    draw(); animation = requestAnimationFrame(frame);
  }
  function syncAnimation() {
    cancelAnimationFrame(animation); animation = 0; last = 0;
    if (!paused && inView && !document.hidden) animation = requestAnimationFrame(frame);
  }
  function updateMotionButton() {
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.innerHTML = paused ? '<span aria-hidden="true">▷</span> Ativar animação' : '<span aria-hidden="true">Ⅱ</span> Pausar animação';
    document.body.classList.toggle('motion-paused', paused);
    syncAnimation();
  }
  motionButton.addEventListener('click', () => { paused = !paused; updateMotionButton(); });
  reducedMotion.addEventListener('change', event => { paused = event.matches; updateMotionButton(); });
  document.addEventListener('visibilitychange', syncAnimation);
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; syncAnimation(); }).observe(hero);
  new ResizeObserver(resize).observe(hero);
  resize(); updateMotionButton();
})();
