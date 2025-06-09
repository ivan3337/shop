<?php
header('Content-Type: application/json');
include 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

$userId = $data['userId'] ?? '';
$cartItems = $data['cartItems'] ?? [];

if (!$userId || empty($cartItems)) {
    echo json_encode(['success' => false, 'message' => 'User ID and cart items required']);
    exit;
}


$conn->begin_transaction();

try {
    
    $sqlPurchase = "INSERT INTO purchases (user_id, purchase_date) VALUES (?, NOW())";
    $stmtPurchase = $conn->prepare($sqlPurchase);
    $stmtPurchase->bind_param("i", $userId);
    $stmtPurchase->execute();
    $purchaseId = $stmtPurchase->insert_id;
    $stmtPurchase->close();

    
    $sqlItem = "INSERT INTO purchase_items (purchase_id, product_id, quantity) VALUES (?, ?, ?)";
    $stmtItem = $conn->prepare($sqlItem);

    foreach ($cartItems as $item) {
        $productId = $item['product_id'];
        $quantity = $item['quantity'];
        $stmtItem->bind_param("iii", $purchaseId, $productId, $quantity);
        $stmtItem->execute();
    }
    $stmtItem->close();

    
    $sqlClear = "DELETE FROM cart WHERE user_id = ?";
    $stmtClear = $conn->prepare($sqlClear);
    $stmtClear->bind_param("i", $userId);
    $stmtClear->execute();
    $stmtClear->close();

    $conn->commit();

    echo json_encode(['success' => true, 'message' => 'Purchase completed successfully']);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Purchase failed: ' . $e->getMessage()]);
}

$conn->close();
?>
