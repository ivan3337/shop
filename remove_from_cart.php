<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$userId = $data['userId'] ?? '';
$productId = $data['productId'] ?? '';

if (!$userId || !$productId) {
    echo json_encode(['success' => false, 'message' => 'User ID and Product ID required']);
    exit;
}

$sql = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $userId, $productId);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Item not found in cart']);
}

$stmt->close();
$conn->close();
?>
