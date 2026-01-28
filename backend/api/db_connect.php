<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hostel_connect";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}
?>