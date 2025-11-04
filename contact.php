<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = trim($input['name'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $email = trim($input['email'] ?? '');
    $message = trim($input['message'] ?? '');
    $color = trim($input['color'] ?? '');
    
    // Валидация
    $errors = [];
    
    if (empty($name)) {
        $errors[] = 'Имя обязательно для заполнения';
    }
    
    if (empty($phone)) {
        $errors[] = 'Телефон обязателен для заполнения';
    }
    
    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Некорректный email';
    }
    
    // Если есть ошибки
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }
    
    // Здесь должна быть логика отправки email или сохранения в БД
    // Например, отправка на email:
    $to = "info@akvatoria.ru";
    $subject = "Новая заявка с сайта Акватория";
    $body = "
    Новая заявка с сайта:
    
    Имя: $name
    Телефон: $phone
    Email: $email
    Выбранный цвет: $color
    Сообщение: $message
    ";
    
    $headers = "From: website@akvatoria.ru\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";
    
    // В реальном проекте раскомментировать:
    // if (mail($to, $subject, $body, $headers)) {
    //     echo json_encode(['success' => true, 'message' => 'Форма отправлена успешно']);
    // } else {
    //     http_response_code(500);
    //     echo json_encode(['success' => false, 'message' => 'Ошибка отправки email']);
    // }
    
    // Для демонстрации всегда возвращаем успех
    echo json_encode(['success' => true, 'message' => 'Форма отправлена успешно']);
    
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не разрешен']);
}
?>
