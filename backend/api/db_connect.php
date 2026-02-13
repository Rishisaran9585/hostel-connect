<?php
$whitelist = array(
    '127.0.0.1',
    '::1',
    'localhost'
);

if (in_array($_SERVER['HTTP_HOST'], $whitelist)) {
    // Localhost Credentials (XAMPP)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "hostel_connect";
} else {
    // Production Credentials (Hostinger)
    $servername = "localhost";
    $username = "u891495087_hostel";
    $password = "hostelCHOA123@";
    $dbname = "u891495087_hostel";
}

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}
?>