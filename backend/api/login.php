<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== NULL && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Internal Server Error"
        ]);
    }
});

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->username) && isset($data->password)) {
    $username = $conn->real_escape_string($data->username);
    $password = $data->password;

    $sql = "SELECT * FROM admin_users WHERE username = '$username' AND is_active = 1";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Update last login
            $conn->query("UPDATE admin_users SET last_login = NOW() WHERE id = " . $row['id']);

            echo json_encode([
                "success" => true,
                "message" => "Login successful",
                "user" => [
                    "id" => $row['id'],
                    "username" => $row['username']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid password"]);
        }
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete data"]);
}

if (isset($conn)) {
    $conn->close();
}
?>