<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$name = isset($data['name']) ? htmlspecialchars(trim($data['name'])) : '';
$email = isset($data['email']) ? htmlspecialchars(trim($data['email'])) : '';
$phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone'])) : '';

if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['error' => 'Заполните все поля']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Некорректный email']);
    exit;
}

$to = 'email@btbsales.ru';
$subject = '=?UTF-8?B?' . base64_encode('Новая заявка с сайта "Драйвер сделки"') . '?=';

$message = "
<html>
<head>
    <meta charset='UTF-8'>
    <title>Новая заявка</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
    <div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;'>
        <h2 style='color: #1e40af; border-bottom: 2px solid #10b981; padding-bottom: 10px;'>
            Новая заявка с лендинга «ДРАЙВЕР СДЕЛКИ»
        </h2>
        
        <div style='margin: 20px 0;'>
            <p style='margin: 10px 0;'><strong>Имя:</strong> {$name}</p>
            <p style='margin: 10px 0;'><strong>Email:</strong> <a href='mailto:{$email}' style='color: #1e40af;'>{$email}</a></p>
            <p style='margin: 10px 0;'><strong>Телефон:</strong> <a href='tel:{$phone}' style='color: #1e40af;'>{$phone}</a></p>
        </div>
        
        <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;'>
            <p>Время получения: " . date('d.m.Y H:i:s') . "</p>
            <p>IP адрес: " . $_SERVER['REMOTE_ADDR'] . "</p>
        </div>
    </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $message, $headers)) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Заявка отправлена']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка отправки письма']);
}
?>
