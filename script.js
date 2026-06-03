/* ============================================================
   JavaScript - Agro Forte • Futuro Sustentável
   Funcionalidades: navegação suave, menu mobile, quiz,
   contadores animados, revelação ao scroll, back-to-top
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== ELEMENTOS DO DOM ==========
    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav__link');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section[id]');
    const revealElements = document.querySelectorAll(
        '.card, .practice-card, .tech__item, .about__quote-box, .future__banner, .stat'
    );
    const statNumbers = document.querySelectorAll('.stat__number[data-target]');

    // Quiz
    const quizBox = document.getElementById('quiz');
    const quizQuestionEl = document.getElementById('quizQuestion');
    const quizOptionsEl = document.getElementById('quizOptions');
    const quizFeedbackEl = document.getElementById('quizFeedback');
    const quizNextBtn = document.getElementById('quizNextBtn');
    const quizRestartBtn = document.getElementById('quizRestartBtn');
    const quizRestartBtn2 = document.getElementById('quizRestartBtn2');
    const quizProgressBar = document.getElementById('quizProgressBar');
    const quizResultEl = document.getElementById('quizResult');
    const quizResultIcon = document.getElementById('quizResultIcon');
    const quizResultTitle = document.getElementById('quizResultTitle');
    const quizResultText = document.getElementById('quizResultText');
    const quizMainBox = document.querySelector('.quiz__box');

    let currentQuestionIndex = 0;
    let score = 0;
    let quizAnswered = false;

    // ========== PERGUNTAS DO QUIZ ==========
    const quizData = [
        {
            question: 'Qual prática agrícola ajuda a proteger o solo contra erosão?',
            options: ['Queimada controlada', 'Plantio direto na palhada', 'Aração profunda', 'Monocultura intensiva'],
            correct: 1,
            explanation: 'O plantio direto mantém a palhada que protege o solo da chuva e do vento, evitando erosão e retendo umidade.'
        },
        {
            question: 'O que significa a sigla ILPF na agricultura sustentável?',
            options: [
                'Instituto Livre de Pesquisa Florestal',
                'Integração Lavoura-Pecuária-Floresta',
                'Índice de Luminosidade para Plantio Fechado',
                'Isolamento Laminar de Proteção Fitossanitária'
            ],
            correct: 1,
            explanation: 'ILPF é um sistema que integra agricultura, pecuária e floresta na mesma área, otimizando recursos e regenerando o solo.'
        },
        {
            question: 'Qual fonte de energia renovável é mais comum em propriedades rurais?',
            options: ['Carvão mineral', 'Energia nuclear', 'Placas solares fotovoltaicas', 'Gasolina'],
            correct: 2,
            explanation: 'As placas solares são uma solução limpa e cada vez mais acessível para o campo, reduzindo custos e emissões.'
        },
        {
            question: 'O controle biológico de pragas utiliza:',
            options: [
                'Mais agrotóxicos',
                'Predadores naturais das pragas',
                'Queima da plantação',
                'Fertilizantes nitrogenados'
            ],
            correct: 1,
            explanation: 'Predadores naturais, como joaninhas e vespas, controlam pragas sem necessidade de produtos químicos agressivos.'
        },
        {
            question: 'Qual é o principal benefício da rotação de culturas?',
            options: [
                'Aumentar o uso de fertilizantes',
                'Melhorar a fertilidade do solo e quebrar ciclos de pragas',
                'Reduzir a biodiversidade',
                'Plantar sempre a mesma cultura'
            ],
            correct: 1,
            explanation: 'Alternar culturas repõe nutrientes, melhora a estrutura do solo e dificulta a proliferação de pragas específicas.'
        }
    ];

    // ========== FUNÇÕES DO QUIZ ==========
    function loadQuestion() {
        if (currentQuestionIndex >= quizData.length) {
            showResult();
            return;
        }

        quizAnswered = false;
        const q = quizData[currentQuestionIndex];

        quizQuestionEl.textContent = q.question;
        quizOptionsEl.innerHTML = '';
        quizFeedbackEl.textContent = '';
        quizNextBtn.style.display = 'none';
        quizProgressBar.style.width = ((currentQuestionIndex / quizData.length) * 100) + '%';

        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'quiz__option';
            btn.textContent = opt;
            btn.addEventListener('click', () => selectOption(index, q.correct, q.explanation));
            quizOptionsEl.appendChild(btn);
        });
    }

    function selectOption(selectedIndex, correctIndex, explanation) {
        if (quizAnswered) return;
        quizAnswered = true;

        const options = document.querySelectorAll('.quiz__option');
        options.forEach((opt, i) => {
            opt.classList.add('quiz__option--disabled');
            if (i === correctIndex) {
                opt.classList.add('quiz__option--correct');
            } else if (i === selectedIndex && i !== correctIndex) {
                opt.classList.add('quiz__option--wrong');
            }
        });

        if (selectedIndex === correctIndex) {
            score++;
            quizFeedbackEl.textContent = '✅ Correto! ' + explanation;
            quizFeedbackEl.style.color = '#28a745';
        } else {
            quizFeedbackEl.textContent = '❌ Ops! ' + explanation;
            quizFeedbackEl.style.color = '#dc3545';
        }

        quizNextBtn.style.display = 'inline-block';
        quizProgressBar.style.width = (((currentQuestionIndex + 1) / quizData.length) * 100) + '%';
    }

    function showResult() {
        quizMainBox.style.display = 'none';
        quizResultEl.style.display = 'block';
        quizProgressBar.style.width = '100%';

        const percentage = Math.round((score / quizData.length) * 100);

        if (percentage >= 80) {
            quizResultIcon.textContent = '🌟';
            quizResultTitle.textContent = 'Agricultor Sustentável!';
            quizResultText.textContent = `Você acertou ${score} de ${quizData.length} (${percentage}%). Você realmente entende o equilíbrio entre produção e sustentabilidade!`;
        } else if (percentage >= 50) {
            quizResultIcon.textContent = '🌱';
            quizResultTitle.textContent = 'Bom conhecimento!';
            quizResultText.textContent = `Você acertou ${score} de ${quizData.length} (${percentage}%). Continue aprendendo sobre práticas sustentáveis!`;
        } else {
            quizResultIcon.textContent = '📚';
            quizResultTitle.textContent = 'Hora de estudar!';
            quizResultText.textContent = `Você acertou ${score} de ${quizData.length} (${percentage}%). Explore as seções do site para aprender mais!`;
        }
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizAnswered = false;
        quizMainBox.style.display = 'block';
        quizResultEl.style.display = 'none';
        quizNextBtn.style.display = 'none';
        quizFeedbackEl.textContent = '';
        quizFeedbackEl.style.color = '';
        loadQuestion();
    }

    // Event listeners do quiz
    quizNextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    quizRestartBtn.addEventListener('click', restartQuiz);
    if (quizRestartBtn2) quizRestartBtn2.addEventListener('click', restartQuiz);

    // Iniciar quiz
    loadQuestion();

    // ========== MENU MOBILE ==========
    navToggle.addEventListener('click', () => {
        nav.querySelector('.nav__list').classList.toggle('nav__list--open');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.querySelector('.nav__list').classList.remove('nav__list--open');
        });
    });

    // ========== HEADER SCROLL EFFECT ==========
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    // ========== ATUALIZAR LINK ATIVO NA NAVEGAÇÃO ==========
    function updateActiveNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    // ========== BACK TO TOP ==========
    function updateBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('back-to-top--visible');
        } else {
            backToTop.classList.remove('back-to-top--visible');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== REVELAÇÃO AO SCROLL (Intersection Observer) ==========
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-on-scroll--visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    // ========== CONTADORES ANIMADOS ==========
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.6 });

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    function animateCounter(element, target) {
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing suave
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(startValue + (target - startValue) * eased);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    // ========== SCROLL COMBINADO ==========
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                updateActiveNavLink();
                updateBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Inicializar estados
    updateHeader();
    updateActiveNavLink();
    updateBackToTop();

    // ========== EFEITO DE PARTÍCULAS (FOLHAS CAINDO NO HERO) ==========
    function createFallingLeaves() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const leafEmojis = ['🍃', '🌿', '🍂', '🍁', '✨'];
        const container = document.createElement('div');
        container.className = 'falling-leaves-container';
        container.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        `;
        hero.appendChild(container);

        setInterval(() => {
            const leaf = document.createElement('span');
            leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
            leaf.style.cssText = `
                position: absolute;
                top: -30px;
                left: ${Math.random() * 100}%;
                font-size: ${1 + Math.random() * 1.5}rem;
                opacity: ${0.4 + Math.random() * 0.5};
                animation: fallLeaf ${6 + Math.random() * 8}s linear forwards;
            `;
            container.appendChild(leaf);

            // Remover após animação
            setTimeout(() => {
                leaf.remove();
            }, 15000);
        }, 1500);
    }

    // Adicionar keyframe para folhas caindo
    const leafStyle = document.createElement('style');
    leafStyle.textContent = `
        @keyframes fallLeaf {
            0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0.8; }
            25% { transform: translateY(25vh) rotate(90deg) translateX(30px); opacity: 0.9; }
            50% { transform: translateY(50vh) rotate(180deg) translateX(-20px); opacity: 0.7; }
            75% { transform: translateY(75vh) rotate(270deg) translateX(40px); opacity: 0.5; }
            100% { transform: translateY(105vh) rotate(360deg) translateX(-10px); opacity: 0; }
        }
    `;
    document.head.appendChild(leafStyle);

    createFallingLeaves();

    console.log('🌾 Agro Forte • Futuro Sustentável — Site carregado com sucesso!');
    console.log('💚 Pronto para o Agrinho 2025!');
});