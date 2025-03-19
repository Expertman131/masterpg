import { supabase } from './supabase.js';

const questions = [
    {
        id: 1,
        title: 'Какой тип сайта вам нужен?',
        options: [
            {
                id: 'landing',
                title: 'Лендинг',
                description: 'Одностраничный сайт для продвижения конкретного товара или услуги',
                icon: 'images/landing-icon.svg'
            },
            {
                id: 'corporate',
                title: 'Корпоративный сайт',
                description: 'Многостраничный сайт для представления компании и её услуг',
                icon: 'images/corporate-icon.svg'
            },
            {
                id: 'shop',
                title: 'Интернет-магазин',
                description: 'Сайт для продажи товаров с корзиной и системой оплаты',
                icon: 'images/shop-icon.svg'
            }
        ]
    },
    {
        id: 2,
        title: 'Какие функции должны быть на сайте?',
        options: [
            {
                id: 'basic',
                title: 'Базовые функции',
                description: 'Главная страница, каталог, контакты',
                icon: 'images/basic-icon.svg'
            },
            {
                id: 'advanced',
                title: 'Расширенные функции',
                description: 'Личный кабинет, онлайн-оплата, интеграция с CRM',
                icon: 'images/advanced-icon.svg'
            },
            {
                id: 'custom',
                title: 'Индивидуальные функции',
                description: 'Специальные функции под ваши задачи',
                icon: 'images/custom-icon.svg'
            }
        ]
    },
    {
        id: 3,
        title: 'Какой бюджет вы готовы выделить?',
        options: [
            {
                id: 'budget',
                title: 'До 50 000 ₽',
                description: 'Базовый сайт с основными функциями',
                icon: 'images/budget-icon.svg'
            },
            {
                id: 'medium',
                title: '50 000 - 150 000 ₽',
                description: 'Сайт с расширенным функционалом',
                icon: 'images/medium-icon.svg'
            },
            {
                id: 'premium',
                title: 'Более 150 000 ₽',
                description: 'Премиум-решение с индивидуальным дизайном',
                icon: 'images/premium-icon.svg'
            }
        ]
    },
    {
        id: 4,
        title: 'Нужна ли интеграция с другими сервисами?',
        options: [
            {
                id: 'none',
                title: 'Не требуется',
                description: 'Стандартный сайт без интеграций',
                icon: 'images/none-icon.svg'
            },
            {
                id: 'crm',
                title: 'CRM система',
                description: 'Интеграция с CRM для управления клиентами',
                icon: 'images/crm-icon.svg'
            },
            {
                id: 'payment',
                title: 'Платежные системы',
                description: 'Интеграция с платежными системами',
                icon: 'images/payment-icon.svg'
            }
        ]
    },
    {
        id: 5,
        title: 'Нужна ли поддержка сайта?',
        options: [
            {
                id: 'no-support',
                title: 'Без поддержки',
                description: 'Только разработка и запуск',
                icon: 'images/no-support-icon.svg'
            },
            {
                id: 'basic-support',
                title: 'Базовая поддержка',
                description: 'Обновление контента и техническая поддержка',
                icon: 'images/basic-support-icon.svg'
            },
            {
                id: 'full-support',
                title: 'Полная поддержка',
                description: 'Комплексное обслуживание и развитие сайта',
                icon: 'images/full-support-icon.svg'
            }
        ]
    }
];

let currentQuestion = 0;
let answers = {};

export function initQuiz() {
    console.log('Initializing quiz...');
    const container = document.querySelector('.question-container');
    if (!container) {
        console.error('Question container not found!');
        return;
    }
    console.log('Question container found, rendering questions...');
    
    // Проверяем наличие всех необходимых элементов
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    const currentQuestionSpan = document.querySelector('.current-question');
    const totalQuestionsSpan = document.querySelector('.total-questions');
    
    console.log('Progress elements:', {
        progressBar: !!progressBar,
        progressFill: !!progressFill,
        currentQuestionSpan: !!currentQuestionSpan,
        totalQuestionsSpan: !!totalQuestionsSpan
    });
    
    // Проверяем наличие вопросов
    console.log('Questions array:', questions);
    
    renderQuestions();
    updateProgress();
    setupNavigation();
    setupFormSubmission();
    console.log('Quiz initialized successfully');
}

function renderQuestions() {
    console.log('Rendering questions...');
    const container = document.querySelector('.question-container');
    if (!container) {
        console.error('Question container not found in renderQuestions!');
        return;
    }
    
    const questionsHTML = questions.map((question, index) => `
        <div class="question ${index === 0 ? 'active' : ''}" data-question="${index}">
            <h2 class="question-title">${question.title}</h2>
            <div class="options-grid">
                ${question.options.map(option => `
                    <div class="option-card" data-option="${option.id}">
                        <img src="${option.icon}" alt="${option.title}" class="option-icon">
                        <h3 class="option-title">${option.title}</h3>
                        <p class="option-description">${option.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    console.log('Generated HTML:', questionsHTML);
    container.innerHTML = questionsHTML;
    console.log('Questions rendered successfully');

    // Добавляем обработчики для опций
    const optionCards = document.querySelectorAll('.option-card');
    console.log('Found option cards:', optionCards.length);
    
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const questionIndex = parseInt(card.closest('.question').dataset.question);
            const optionId = card.dataset.option;
            
            console.log('Option clicked:', { questionIndex, optionId });
            
            // Убираем выделение у других опций в этом вопросе
            card.closest('.options-grid').querySelectorAll('.option-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Выделяем выбранную опцию
            card.classList.add('selected');
            
            // Сохраняем ответ
            answers[questionIndex] = optionId;
            console.log('Current answers:', answers);
        });
    });
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const currentQuestionSpan = document.querySelector('.current-question');
    const totalQuestionsSpan = document.querySelector('.total-questions');
    
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    currentQuestionSpan.textContent = currentQuestion + 1;
    totalQuestionsSpan.textContent = questions.length;
}

function setupNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');

    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateProgress();
            updateNavigationButtons();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            if (answers[currentQuestion]) {
                currentQuestion++;
                showQuestion(currentQuestion);
                updateProgress();
                updateNavigationButtons();
            } else {
                Swal.fire({
                    title: 'Выберите ответ',
                    text: 'Пожалуйста, выберите один из вариантов ответа',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            showResults();
        }
    });
}

function showQuestion(index) {
    document.querySelectorAll('.question').forEach((question, i) => {
        question.classList.toggle('active', i === index);
    });
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.submit-btn');

    prevBtn.disabled = currentQuestion === 0;
    
    if (currentQuestion === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function showResults() {
    const quizContainer = document.querySelector('.quiz-container');
    const quizResult = document.querySelector('.quiz-result');
    
    quizContainer.style.display = 'none';
    quizResult.style.display = 'block';
}

function setupFormSubmission() {
    const form = document.querySelector('.contact-form');
    if (!form) {
        console.error('Form not found!');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submission started');
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            answers: answers
        };
        
        console.log('Form data prepared:', data);

        try {
            console.log('Sending data to server...');
            const response = await fetch('send.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Data sent successfully:', result);

            Swal.fire({
                title: 'Спасибо!',
                text: 'Мы свяжемся с вами в ближайшее время',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire({
                title: 'Ошибка',
                text: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
} 