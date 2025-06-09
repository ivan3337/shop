<?php
header('Content-Type: application/json');
include 'db_connect.php';

$userId = $_GET['userId'] ?? '';

if (!$userId) {
    echo json_encode(['success' => false, 'message' => 'User ID required']);
    exit;
}

$sql = "SELECT c.product_id, p.name, p.price, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$cartItems = array();

while ($row = $result->fetch_assoc()) {
    $cartItems[] = $row;
}

echo json_encode(['success' => true, 'cart' => $cartItems]);

$stmt->close();
$conn->close();
?>
