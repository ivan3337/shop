<?php
include 'db_connect.php';

$sql = "DESCRIBE images";
$result = $conn->query($sql);

if ($result) {
    while ($row = $result->fetch_assoc()) {
        echo $row['Field'] . " - " . $row['Type'] . "<br>";
    }
} else {
    echo "Error describing table: " . $conn->error;
}

$conn->close();
?>
