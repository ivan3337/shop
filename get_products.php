    <?php
header('Content-Type: application/json');
include 'db_connect.php';

$sql = "SELECT id, name, price, description, image_url, type FROM products";
$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode($products);

$conn->close();
?>
