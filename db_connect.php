<?php
$myserver = "localhost";
$mylogin = "root";
$mypassword = "";
$mydb = "gunshop";

$conn = new mysqli($myserver, $mylogin, $mypassword, $mydb);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
