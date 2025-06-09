<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$userId = $data['userId'] ?? '';
$productId = $data['productId'] ?? '';
$quantity = $data['quantity'] ?? 1;

if (!$userId || !$productId) {
    echo json_encode(['success' => false, 'message' => 'User ID and Product ID required']);
    exit;
}


$sql = "SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $userId, $productId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    
    $row = $result->fetch_assoc();
    $newQuantity = $row['quantity'] + $quantity;
    $updateSql = "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("iii", $newQuantity, $userId, $productId);
    $updateStmt->execute();
    $updateStmt->close();
} else {
    
    $insertSql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
    $insertStmt = $conn->prepare($insertSql);
    $insertStmt->bind_param("iii", $userId, $productId, $quantity);
    $insertStmt->execute();
    $insertStmt->close();
}

$stmt->close();
$conn->close();

echo json_encode(['success' => true]);
?>
