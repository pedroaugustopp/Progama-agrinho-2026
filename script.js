document.addEventListener('DOMContentLoaded', () => {

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

    const quizData = [
        {
            question: 'Qual sistema de irrigação leva a água diretamente à raiz da planta, reduzindo drasticamente o desperdício?',
            options: ['Pivô tradicional por aspersão', 'Microaspersão de alta pressão', 'Gotejamento localizado', 'Inundação por sulcos artificiais'],
            correct: 2,
            explanation: 'O gotejamento aplica a água de forma localizada e lenta, diminuindo perdas por evaporação e escoamento superficial na lavoura.'
        },
        {
            question: 'Qual é a principal função da vegetação nativa (mata ciliar) ao redor de nascentes e rios?',
            options: [
                'Aumentar a temperatura térmica da água',
                'Proteger contra o assoreamento e filtrar impurezas do solo',
                'Apenas servir de ornamentação para a propriedade',
                'Reduzir o fluxo de oxigênio do ecossistema hídrico'
            ],
            correct: 1,
            explanation: 'A mata ciliar funciona como um filtro biológico protetor que segura a estrutura do solo e evita o soterramento dos cursos dágua.'
        },
        {
            question: 'Como os sensores de Internet das Coisas (IoT) atuam na economia hídrica do campo?',
            options: ['Monitorando o preço de mercado das safras', 'Medindo a umidade do solo em tempo real para acionar a rega só quando necessário', 'Substituindo o uso de adubação orgânica', 'Alterando o ciclo natural de chuvas da região'],
            correct: 1,
            explanation: 'Os sensores mapeiam a real necessidade da terra, evitando irrigações excessivas e aplicando o volume exato exigido pela planta.'
        },
        {
            question: 'A captação e o armazenamento de água pluvial por meio de cisternas rurais serve para:',
            options: [
                'Substituir integralmente o consumo de poços artesianos residenciais',
                'Otimizar tarefas de limpeza, manejo animal e pequenas irrigações sem esgotar fontes naturais',
                'Aumentar o índice de evaporação local da propriedade',
                'Eliminar os processos de infiltração natural da água no solo'
            ],
            correct: 1,
            explanation: 'As cisternas preservam os mananciais ao estocar água da chuva para atividades secundárias do cotidiano rural.'
        },
        {
            question: 'O plantio feito em curvas de nível atua como uma estratégia hídrica essencial porque:',
            options: [
                'Atrai polinizadores específicos para as flores',
                'Acelera a descida rápida das enxurradas morro abaixo',
                'Retém os fluxos de água na terra, favorecendo a infiltração e a recarga dos lençóis freáticos',
                'Diminui a necessidade de radiação solar direta na plantação'
            ],
            correct: 2,
            explanation: 'As curvas de nível quebram a velocidade da enxurrada, permitindo que a água ganhe tempo para penetrar profundamente no solo.'
        }
    ];

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
            quizFeedbackEl.textContent = '✅ Perfeito! ' + explanation;
            quizFeedbackEl.style.color = '#28a745';
        } else {
            quizFeedbackEl.textContent = '❌ Quase lá! ' + explanation;
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
            quizResultIcon.textContent = '💧';
            quizResultTitle.textContent = 'Guardião das Águas!';
            quizResultText.textContent = `Você acertou ${score} de ${quizData.length} (${percentage}%). Sua propriedade é um modelo exemplar de gestão e preservação hídrica!`;
        } else if (percentage >= 50) {
            quizResultIcon.textContent = '🌱';
            quizResultTitle.textContent = 'Bom manejo!';
            quizResultText.textContent = `Você acertou ${score} de ${quizData.length} (${percentage}%). Você compreende bem a importância do recurso, continue praticando!`;
        } else {
            quizResultIcon.textContent = '🌊';
            quizResultTitle.textContent = 'Precisa de atenção!';
            quizResultText.textContent = `Você acertou ${score} de ${quizData.length} (${percentage}%). Explore os conteúdos do site para aprender mais técnicas de conservação!`;
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

    quizNextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    quizRestartBtn.addEventListener('click', restartQuiz);
    if (quizRestartBtn2) quizRestartBtn2.addEventListener('click', restartQuiz);

    loadQuestion();

    navToggle.addEventListener('click', () => {
        nav.querySelector('.nav__list').classList.toggle('nav__list--open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.querySelector('.nav__list').classList.remove('nav__list--open');
        });
    });

    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

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

    updateHeader();
    updateActiveNavLink();
    updateBackToTop();

    function createFallingLeaves() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const leafEmojis = ['💧', '🌧️', '💦', '🌱', '✨'];
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

            setTimeout(() => {
                leaf.remove();
            }, 15000);
        }, 1500);
    }

    createFallingLeaves();

    console.log('💧 Agro Forte • Gestão Hídrica Inteligente — pronto para o Agrinho 2026!');
});
