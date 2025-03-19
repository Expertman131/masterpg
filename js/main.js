// Анимация декоративных элементов
document.addEventListener('DOMContentLoaded', function() {
    const decorElement = document.querySelector('.services-decor');
    const servicesSection = document.querySelector('.services');
    let requestId;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Проверяем наличие элементов перед добавлением обработчиков
    if (decorElement && servicesSection) {
        window.addEventListener('scroll', function() {
            // Анимация для services-decor
            if (requestId) {
                cancelAnimationFrame(requestId);
            }
            
            requestId = requestAnimationFrame(function() {
                const rect = servicesSection.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
                
                const viewportHeight = window.innerHeight;
                const elementTop = rect.top;
                const elementHeight = rect.height;
                
                const startOffset = viewportHeight * 0.5;
                const totalDistance = viewportHeight + elementHeight;
                
                let progress = (startOffset - elementTop) / totalDistance;
                progress = Math.min(Math.max(progress, 0), 1);
                
                const translateX = -600 * progress;
                const inertiaFactor = 0.1;
                const smoothTranslateX = translateX + (scrollDirection * inertiaFactor * Math.abs(scrollTop - lastScrollTop));
                
                decorElement.style.setProperty('--tx', `${smoothTranslateX}px`);
            });
        });
    }

    // Элементы для why-us-decor
    const whyUsDecorElement = document.querySelector('.why-us-decor');
    const whyUsSection = document.querySelector('.why-us');
    let whyUsRequestId;
    
    // Проверяем наличие элементов перед добавлением обработчиков
    if (whyUsDecorElement && whyUsSection) {
        window.addEventListener('scroll', function() {
            // Анимация для why-us-decor
            if (whyUsRequestId) {
                cancelAnimationFrame(whyUsRequestId);
            }
            
            whyUsRequestId = requestAnimationFrame(function() {
                const rect = whyUsSection.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
                
                const viewportHeight = window.innerHeight;
                const elementTop = rect.top;
                const elementHeight = rect.height;
                
                const startOffset = viewportHeight * 0.5;
                const totalDistance = viewportHeight + elementHeight;
                
                let progress = (startOffset - elementTop) / totalDistance;
                progress = Math.min(Math.max(progress, 0), 1);
                
                const translateX = -600 * progress;
                const inertiaFactor = 0.1;
                const smoothTranslateX = translateX + (scrollDirection * inertiaFactor * Math.abs(scrollTop - lastScrollTop));
                
                whyUsDecorElement.style.setProperty('--tx-why', `${smoothTranslateX}px`);
                lastScrollTop = scrollTop;
            });
        });
    }
});

// Настройки для плавной прокрутки
if (typeof SmoothScroll === 'function') {
    SmoothScroll({
        animationTime    : 800,
        stepSize         : 85,
        accelerationDelta : 20,  
        accelerationMax   : 1.5,   
        keyboardSupport   : true,  
        arrowScroll       : 50,
        pulseAlgorithm   : true,
        pulseScale       : 4,
        pulseNormalize   : 1,
        touchpadSupport   : true,
    });
}

// Анимация для types-image
document.addEventListener('DOMContentLoaded', function() {
    const typesImageElement = document.querySelector('.types-image');
    const typesDecorElement = document.querySelector('.types-decor');
    const typesSection = document.querySelector('.site-types');
    const typesContent = document.querySelector('.types-content');
    let requestId;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Проверяем наличие всех необходимых элементов
    if (typesImageElement && typesDecorElement && typesSection && typesContent) {
        function calculateMaxTranslation() {
            const contentHeight = typesContent.offsetHeight;
            const imageHeight = typesImageElement.offsetHeight;
            return contentHeight - imageHeight;
        }

        function calculateScrollProgress() {
            const rect = typesSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;
            const startOffset = viewportHeight * 0.5;
            const totalDistance = viewportHeight + elementHeight;
            let progress = (startOffset - elementTop) / totalDistance;
            return Math.min(Math.max(progress, 0), 1);
        }
        
        window.addEventListener('scroll', function() {
            if (requestId) {
                cancelAnimationFrame(requestId);
            }
            
            requestId = requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
                const progress = calculateScrollProgress();
                
                const maxTranslation = calculateMaxTranslation();
                const translateY = maxTranslation * progress;
                const inertiaFactor = 0.1;
                const smoothTranslateY = translateY + (scrollDirection * inertiaFactor * Math.abs(scrollTop - lastScrollTop));
                typesImageElement.style.setProperty('--ty', `${smoothTranslateY}px`);

                const translateYDecor = -120 * progress;
                const smoothTranslateYDecor = translateYDecor + (scrollDirection * inertiaFactor * Math.abs(scrollTop - lastScrollTop));
                typesDecorElement.style.setProperty('--ty-decor', `${smoothTranslateYDecor}px`);
                
                lastScrollTop = scrollTop;
            });
        });

        window.addEventListener('resize', function() {
            const maxTranslation = calculateMaxTranslation();
            const progress = calculateScrollProgress();
            const translateY = maxTranslation * progress;
            typesImageElement.style.setProperty('--ty', `${translateY}px`);
        });
    }
});

// Модальное окно
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('callback-modal');
    const openButtons = document.querySelectorAll('.header-callback, .order-btn');
    const closeButton = modal.querySelector('.modal-close');
    const form = modal.querySelector('.callback-form');
    const submitButton = form.querySelector('.submit-btn');

    // Открытие модального окна
    openButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    closeButton.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Закрытие по клику вне окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Отправка формы
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        try {
            // Здесь будет отправка данных на сервер
            await new Promise(resolve => setTimeout(resolve, 1000));

            await Swal.fire({
                title: 'Успешно!',
                text: 'Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.',
                icon: 'success',
                confirmButtonText: 'Хорошо',
                confirmButtonColor: '#9747FF',
                customClass: {
                    popup: 'swal-custom-popup',
                    confirmButton: 'swal-custom-confirm'
                }
            });

            form.reset();
            modal.classList.remove('active');
            document.body.style.overflow = '';
        } catch (error) {
            await Swal.fire({
                title: 'Ошибка!',
                text: 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.',
                icon: 'error',
                confirmButtonText: 'Закрыть',
                confirmButtonColor: '#9747FF'
            });
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Отправить заявку';
        }
    });

    // Форматирование номера телефона
    const phoneInput = modal.querySelector('input[type="tel"]');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '(' + value;
        }
        if (value.length > 4) {
            value = value.slice(0, 4) + ') ' + value.slice(4);
        }
        if (value.length > 9) {
            value = value.slice(0, 9) + '-' + value.slice(9);
        }
        if (value.length > 12) {
            value = value.slice(0, 12) + '-' + value.slice(12);
        }
        if (value.length > 15) {
            value = value.slice(0, 15);
        }
        e.target.value = value;
    });
});

// Общая функция для обработки форм
function initFormHandlers() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const submitButton = form.querySelector('button[type="submit"]');
        const isInlineForm = form.classList.contains('callback-inline-form');
        const isModalForm = form.classList.contains('callback-form');
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Отправка...';
            }

            const phone = form.querySelector('input[type="tel"]').value;
            const formData = new FormData();
            formData.append('phone', phone);

            try {
                const response = await fetch('send.php', {
                    method: 'POST',
                    body: formData
                });
                
                let data;
                const contentType = response.headers.get('content-type');
                
                if (contentType && contentType.includes('application/json')) {
                    data = await response.json();
                } else {
                    // Если сервер вернул не JSON
                    const text = await response.text();
                    console.error('Сервер вернул не JSON:', text);
                    throw new Error('Ошибка сервера. Пожалуйста, попробуйте позже.');
                }
                
                if (data.success) {
                    await Swal.fire({
                        title: 'Успешно!',
                        text: data.message,
                        icon: 'success',
                        confirmButtonText: 'Хорошо',
                        confirmButtonColor: '#9747FF',
                        customClass: {
                            popup: 'swal-custom-popup',
                            confirmButton: 'swal-custom-confirm'
                        }
                    });

                    form.reset();
                    
                    // Если это модальная форма, закрываем модальное окно
                    if (isModalForm) {
                        const modal = document.getElementById('callback-modal');
                        if (modal) {
                            modal.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    }
                } else {
                    throw new Error(data.message || 'Произошла ошибка при отправке.');
                }
            } catch (error) {
                console.error('Ошибка отправки формы:', error);
                
                await Swal.fire({
                    title: 'Ошибка!',
                    text: error.message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.',
                    icon: 'error',
                    confirmButtonText: 'Закрыть',
                    confirmButtonColor: '#9747FF',
                    customClass: {
                        popup: 'swal-custom-popup',
                        confirmButton: 'swal-custom-confirm'
                    }
                });
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = isInlineForm ? 'Заказать звонок' : 'Отправить заявку';
                }
            }
        });
    });
}

// Удаляем старые обработчики форм
const oldFormHandlers = document.querySelectorAll('.callback-form, .callback-inline-form');
oldFormHandlers.forEach(form => {
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
});

// Инициализация всех обработчиков при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Модальное окно
    const modal = document.getElementById('callback-modal');
    const openButtons = document.querySelectorAll('.header-callback, .order-btn');
    const closeButton = modal.querySelector('.modal-close');

    // Открытие модального окна
    openButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    closeButton.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Закрытие по клику вне окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Форматирование номера телефона для всех телефонных инпутов
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '(' + value;
            }
            if (value.length > 4) {
                value = value.slice(0, 4) + ') ' + value.slice(4);
            }
            if (value.length > 9) {
                value = value.slice(0, 9) + '-' + value.slice(9);
            }
            if (value.length > 12) {
                value = value.slice(0, 12) + '-' + value.slice(12);
            }
            if (value.length > 15) {
                value = value.slice(0, 15);
            }
            e.target.value = value;
        });
    });

    // Инициализация обработчиков форм
    initFormHandlers();
});

// Card tilt effect
document.querySelectorAll('.card-wrap').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xRotation = ((y - rect.height / 2) / rect.height) * 20;
        const yRotation = ((x - rect.width / 2) / rect.width) * 20;
        
        card.querySelector('.card').style.transform = `
            perspective(800px)
            rotateX(${-xRotation}deg)
            rotateY(${yRotation}deg)
            translateY(-5px)
        `;
        
        card.querySelector('.card-bg').style.transform = `
            translateX(${yRotation * 1.5}px)
            translateY(${xRotation * 1.5}px)
            translateZ(0)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        const cardEl = card.querySelector('.card');
        const bgEl = card.querySelector('.card-bg');
        
        cardEl.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        bgEl.style.transform = 'translateX(0) translateY(0) translateZ(0)';
    });
});

// Анимация стрелки при скролле
const processArrow = document.querySelector('.process-arrow');
const processSection = document.querySelector('.process');

window.addEventListener('scroll', () => {
    if (processSection && processArrow) {
        const sectionTop = processSection.offsetTop;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition > sectionTop - window.innerHeight / 2) {
            processArrow.classList.add('scrolled');
        } else {
            processArrow.classList.remove('scrolled');
        }
    }
});

// Анимация для process-content
document.addEventListener('DOMContentLoaded', function() {
    const processContentElement = document.querySelector('.process-content');
    const processSection = document.querySelector('.process');
    let processRequestId;
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    function calculateMaxTranslation() {
        const contentHeight = processContentElement.offsetHeight;
        const targetStep = document.querySelector('.step-card:last-child'); // Последняя карточка
        const processSteps = document.querySelector('.process-steps');
        const targetStepBottom = targetStep.offsetTop + targetStep.offsetHeight;
        const offset = processSteps.offsetTop;
        return targetStepBottom - offset - contentHeight + 40; // Добавляем отступ для полного показа последней карточки
    }

    function calculateScrollProgress() {
        const rect = processSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementTop = rect.top;
        const targetStep = document.querySelector('.step-.card-bg:last-child');
        const processSteps = document.querySelector('.process-steps');
        const stepsRect = processSteps.getBoundingClientRect();
        const targetStepRect = targetStep.getBoundingClientRect();
        const elementHeight = targetStepRect.bottom - stepsRect.top;
        const startOffset = viewportHeight * 0.7; // Начинаем анимацию раньше
        const totalDistance = viewportHeight + elementHeight; // Полная дистанция до конца последней карточки
        let progress = (startOffset - elementTop) / totalDistance;
        return Math.min(Math.max(progress, 0), 1);
    }
    
    window.addEventListener('scroll', function() {
        if (processRequestId) {
            cancelAnimationFrame(processRequestId);
        }
        
        processRequestId = requestAnimationFrame(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
            const progress = calculateScrollProgress();
            
            const maxTranslation = calculateMaxTranslation();
            const translateY = maxTranslation * progress;
            const inertiaFactor = 0.1;
            const smoothTranslateY = translateY + (scrollDirection * inertiaFactor * Math.abs(scrollTop - lastScrollTop));
            
            processContentElement.style.setProperty('--ty-process', `${smoothTranslateY}px`);
            lastScrollTop = scrollTop;
        });
    });

    window.addEventListener('resize', function() {
        const maxTranslation = calculateMaxTranslation();
        const progress = calculateScrollProgress();
        const translateY = maxTranslation * progress;
        processContentElement.style.setProperty('--ty-process', `${translateY}px`);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.querySelector('.show-more-btn');
    const hiddenCards = document.querySelector('.hidden-cards');
    
    // Проверяем наличие скрытых карточек
    if (!hiddenCards || hiddenCards.children.length === 0) {
        showMoreBtn.style.display = 'none';
    }
    
    showMoreBtn.addEventListener('click', function() {
        const btn = this;
        
        if (hiddenCards.classList.contains('show')) {
            hiddenCards.style.opacity = '0';
            hiddenCards.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                hiddenCards.classList.remove('show');
                setTimeout(() => {
                    hiddenCards.style.opacity = '';
                    hiddenCards.style.transform = '';
                }, 50);
            }, 600);
        } else {
            hiddenCards.classList.add('show');
            setTimeout(() => {
                hiddenCards.style.opacity = '1';
                hiddenCards.style.transform = 'translateY(0)';
                const cards = hiddenCards.querySelectorAll('.card-wrap');
                cards.forEach(card => {
                    const vm = card.__vue__;
                    if (vm) {
                        vm.width = card.offsetWidth;
                        vm.height = card.offsetHeight;
                    }
                });
                // Скрываем кнопку после показа карточек
                btn.classList.add('hidden');
                setTimeout(() => {
                    btn.style.display = 'none';
                }, 300);
            }, 50);
        }
    });
});

// Плавный скролл к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Обработчик для inline-формы обратного звонка
document.addEventListener('DOMContentLoaded', function() {
    const inlineForm = document.querySelector('.callback-inline-form');
    const inlinePhoneInput = inlineForm.querySelector('input[type="tel"]');
    
    // Форматирование номера телефона
    inlinePhoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '(' + value;
        }
        if (value.length > 4) {
            value = value.slice(0, 4) + ') ' + value.slice(4);
        }
        if (value.length > 9) {
            value = value.slice(0, 9) + '-' + value.slice(9);
        }
        if (value.length > 12) {
            value = value.slice(0, 12) + '-' + value.slice(12);
        }
        if (value.length > 15) {
            value = value.slice(0, 15);
        }
        e.target.value = value;
    });

    // Отправка формы
    inlineForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('.callback-submit');
        const phone = inlinePhoneInput.value;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        try {
            // Здесь будет отправка данных на сервер
            await new Promise(resolve => setTimeout(resolve, 1000));

            await Swal.fire({
                title: 'Успешно!',
                text: 'Спасибо! Мы перезвоним вам в ближайшее время.',
                icon: 'success',
                confirmButtonText: 'Хорошо',
                confirmButtonColor: '#9747FF',
                customClass: {
                    popup: 'swal-custom-popup',
                    confirmButton: 'swal-custom-confirm'
                }
            });

            inlineForm.reset();
        } catch (error) {
            await Swal.fire({
                title: 'Ошибка!',
                text: 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.',
                icon: 'error',
                confirmButtonText: 'Закрыть',
                confirmButtonColor: '#9747FF'
            });
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Заказать звонок';
        }
    });
});

// Функция для скрытия/показа шапки при скроле
function handleHeaderVisibility() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    function updateHeaderVisibility() {
        const currentScrollY = window.scrollY;
        
        // Если скролим вниз и не в самом верху страницы - скрываем шапку
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            header.classList.add('hidden');
        } 
        // Если скролим вверх или в самом верху - показываем шапку
        else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
            header.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    }

    // Вызываем функцию при загрузке страницы
    updateHeaderVisibility();
    
    // Добавляем обработчик события скролла
    window.addEventListener('scroll', updateHeaderVisibility);
}

// Инициализация функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Vue для портфолио
    const appElement = document.getElementById('app');
    if (appElement) {
        new Vue({
            el: '#app',
            data: {
                showHidden: false
            },
            methods: {
                toggleHidden: function() {
                    this.showHidden = !this.showHidden;
                    const hiddenCards = document.querySelector('.hidden-cards');
                    if (hiddenCards) {
                        if (this.showHidden) {
                            hiddenCards.classList.add('show');
                            const showMoreBtn = document.querySelector('.show-more-btn');
                            if (showMoreBtn) {
                                showMoreBtn.textContent = 'Скрыть';
                            }
                        } else {
                            hiddenCards.classList.remove('show');
                            const showMoreBtn = document.querySelector('.show-more-btn');
                            if (showMoreBtn) {
                                showMoreBtn.textContent = 'Показать еще';
                            }
                        }
                    }
                }
            },
            mounted: function() {
                const showMoreBtn = document.querySelector('.show-more-btn');
                if (showMoreBtn) {
                    showMoreBtn.addEventListener('click', this.toggleHidden);
                }
            }
        });
    }

    // Инициализация скрытия/показа шапки при скроле
    handleHeaderVisibility();
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка отправки формы обратного звонка
    const callbackForms = document.querySelectorAll('.callback-form, .callback-inline-form');
    callbackForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить валидацию формы
            
            // Отправка данных формы
            const formData = new FormData(this);
            const name = formData.get('name') || 'Клиент';
            const phone = formData.get('phone');
            
            // Пример отправки через EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_id', 'template_id', {
                    name: name,
                    phone: phone
                })
                .then(function() {
                    Swal.fire({
                        title: 'Спасибо!',
                        text: 'Мы перезвоним вам в ближайшее время',
                        icon: 'success',
                        customClass: {
                            popup: 'swal-custom-popup',
                            confirmButton: 'swal-custom-confirm'
                        }
                    });
                    
                    // Сброс формы
                    form.reset();
                    
                    // Закрытие модального окна, если форма в модальном окне
                    const modal = document.getElementById('callback-modal');
                    if (modal && modal.classList.contains('active')) {
                        modal.classList.remove('active');
                    }
                })
                .catch(function(error) {
                    console.error('Ошибка отправки:', error);
                    Swal.fire({
                        title: 'Ошибка!',
                        text: 'Не удалось отправить заявку. Пожалуйста, попробуйте позже.',
                        icon: 'error',
                        customClass: {
                            popup: 'swal-custom-popup',
                            confirmButton: 'swal-custom-confirm'
                        }
                    });
                });
            } else {
                // Если EmailJS не доступен, используем обычный fetch
                fetch('server.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка отправки');
                    }
                    return response.json();
                })
                .then(() => {
                    Swal.fire({
                        title: 'Спасибо!',
                        text: 'Мы перезвоним вам в ближайшее время',
                        icon: 'success',
                        customClass: {
                            popup: 'swal-custom-popup',
                            confirmButton: 'swal-custom-confirm'
                        }
                    });
                    
                    // Сброс формы
                    form.reset();
                    
                    // Закрытие модального окна, если форма в модальном окне
                    const modal = document.getElementById('callback-modal');
                    if (modal && modal.classList.contains('active')) {
                        modal.classList.remove('active');
                    }
                })
                .catch(error => {
                    console.error('Ошибка отправки:', error);
                    Swal.fire({
                        title: 'Ошибка!',
                        text: 'Не удалось отправить заявку. Пожалуйста, попробуйте позже.',
                        icon: 'error',
                        customClass: {
                            popup: 'swal-custom-popup',
                            confirmButton: 'swal-custom-confirm'
                        }
                    });
                });
            }
        });
    });

    // Открытие и закрытие модального окна
    const callbackButtons = document.querySelectorAll('.header-callback, a[href="#callback-modal"]');
    const modal = document.getElementById('callback-modal');
    if (modal) {
        const closeButton = modal.querySelector('.modal-close');
        
        callbackButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Вертикальное перелистывание портфолио с эффектом sticky-карточек
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что GSAP и ScrollTrigger загружены
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Очищаем предыдущие анимации, если они есть
        ScrollTrigger.getAll().forEach(st => st.kill());
        gsap.globalTimeline.clear();
        
        // Получаем карточки портфолио
        const portfolioSection = document.querySelector('.portfolio');
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        
        if (portfolioCards.length > 0 && portfolioSection) {
            // Устанавливаем больше места для прокрутки
            const portfolioGrid = document.querySelector('.portfolio-grid');
            if (portfolioGrid) {
                portfolioGrid.style.height = `${portfolioCards.length * 100 + 300}px`;
            }
            
            // Таймлайн для анимации заголовков
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".portfolio",
                    start: "top 100",
                    end: "bottom bottom",
                    scrub: 1,
                    ease: "linear",
                }
            });
            
            // Применяем анимацию к каждой карточке
            portfolioCards.forEach((card, index) => {
                gsap.to(card, {
                    position: "sticky",
                    ease: "power2.inOut",
                    top: `${18 + index * 52}px`,
                    scrollTrigger: {
                        trigger: card,
                        start: "top center",
                        end: "bottom 300",
                        scrub: true,
                    }
                });
                
                // Анимируем заголовки
                const cardTitle = card.querySelector('h3');
                if (cardTitle) {
                    tl.to(cardTitle, {
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.inOut",
                        delay: index * 0.1
                    }, index * 0.2);
                }
            });
        }
    } else {
        console.warn('GSAP или ScrollTrigger не загружены');
    }
});

// Анимация декоративных элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    const decor2 = document.querySelector('.why-us .decor2');
    const whyUsSection = document.querySelector('.why-us');
    
    // Проверка наличия элементов перед добавлением обработчиков
    if (decor2 && whyUsSection) {
        let requestId;
        let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        window.addEventListener('scroll', function() {
            if (requestId) {
                cancelAnimationFrame(requestId);
            }
            
            requestId = requestAnimationFrame(function() {
                const rect = whyUsSection.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
                
                const viewportHeight = window.innerHeight;
                const elementTop = rect.top;
                const elementHeight = rect.height;
                
                const startOffset = viewportHeight * 0.5;
                const totalDistance = viewportHeight + elementHeight;
                
                let progress = (startOffset - elementTop) / totalDistance;
                progress = Math.min(Math.max(progress, 0), 1);
                
                const translateX = 600 * progress;
                const inertiaFactor = 0.1;
                const smoothTranslateX = translateX + (scrollDirection * inertiaFactor * Math.abs(scrollTop - lastScrollTop));
                
                decor2.style.setProperty('--tx', `${smoothTranslateX}px`);
                lastScrollTop = scrollTop;
            });
        });
    }
}); 