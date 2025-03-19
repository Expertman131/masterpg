<?php
// Отключаем вывод ошибок в браузер
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
// Но логируем их в файл
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');

// Устанавливаем заголовок JSON
header('Content-Type: application/json');

// Получаем данные из POST запроса
$data = json_decode(file_get_contents('php://input'), true);

// Проверяем наличие всех необходимых данных
if (!isset($data['name']) || !isset($data['phone']) || !isset($data['email']) || !isset($data['answers'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Формируем текст письма
$message = "Новая заявка с квиза:\n\n";
$message .= "Имя: " . $data['name'] . "\n";
$message .= "Телефон: " . $data['phone'] . "\n";
$message .= "Email: " . $data['email'] . "\n\n";
$message .= "Ответы на вопросы:\n";

// Добавляем ответы на вопросы
foreach ($data['answers'] as $questionIndex => $answer) {
    $question = getQuestionById($questionIndex);
    $option = getOptionById($questionIndex, $answer);
    
    $message .= "\n" . $question['title'] . ":\n";
    $message .= "- " . $option['title'] . "\n";
    $message .= "  " . $option['description'] . "\n";
}

// Настройки для отправки письма
$to = "your-email@example.com"; // Замените на ваш email
$subject = "Новая заявка с квиза";
$headers = "From: " . $data['email'] . "\r\n";
$headers .= "Reply-To: " . $data['email'] . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Отправляем письмо
$mailSent = mail($to, $subject, $message, $headers);

if ($mailSent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}

// Вспомогательные функции для получения вопросов и ответов
function getQuestionById($index) {
    $questions = [
        0 => [
            'title' => 'Какой тип сайта вам нужен?',
            'options' => [
                'landing' => ['title' => 'Лендинг', 'description' => 'Одностраничный сайт для продвижения конкретного товара или услуги'],
                'corporate' => ['title' => 'Корпоративный сайт', 'description' => 'Многостраничный сайт для представления компании и её услуг'],
                'shop' => ['title' => 'Интернет-магазин', 'description' => 'Сайт для продажи товаров с корзиной и системой оплаты']
            ]
        ],
        1 => [
            'title' => 'Какие функции должны быть на сайте?',
            'options' => [
                'basic' => ['title' => 'Базовые функции', 'description' => 'Главная страница, каталог, контакты'],
                'advanced' => ['title' => 'Расширенные функции', 'description' => 'Личный кабинет, онлайн-оплата, интеграция с CRM'],
                'custom' => ['title' => 'Индивидуальные функции', 'description' => 'Специальные функции под ваши задачи']
            ]
        ],
        2 => [
            'title' => 'Какой бюджет вы готовы выделить?',
            'options' => [
                'budget' => ['title' => 'До 50 000 ₽', 'description' => 'Базовый сайт с основными функциями'],
                'medium' => ['title' => '50 000 - 150 000 ₽', 'description' => 'Сайт с расширенным функционалом'],
                'premium' => ['title' => 'Более 150 000 ₽', 'description' => 'Премиум-решение с индивидуальным дизайном']
            ]
        ],
        3 => [
            'title' => 'Нужна ли интеграция с другими сервисами?',
            'options' => [
                'none' => ['title' => 'Не требуется', 'description' => 'Стандартный сайт без интеграций'],
                'crm' => ['title' => 'CRM система', 'description' => 'Интеграция с CRM для управления клиентами'],
                'payment' => ['title' => 'Платежные системы', 'description' => 'Интеграция с платежными системами']
            ]
        ],
        4 => [
            'title' => 'Нужна ли поддержка сайта?',
            'options' => [
                'no-support' => ['title' => 'Без поддержки', 'description' => 'Только разработка и запуск'],
                'basic-support' => ['title' => 'Базовая поддержка', 'description' => 'Обновление контента и техническая поддержка'],
                'full-support' => ['title' => 'Полная поддержка', 'description' => 'Комплексное обслуживание и развитие сайта']
            ]
        ]
    ];
    
    return $questions[$index];
}

function getOptionById($questionIndex, $optionId) {
    $question = getQuestionById($questionIndex);
    return $question['options'][$optionId];
} 