<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'db_connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM members ORDER BY name ASC";
        $result = $conn->query($sql);
        $members = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $members[] = $row;
            }
        }
        echo json_encode($members);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if (!empty($data->name) && !empty($data->role) && !empty($data->email)) {
            $name = $conn->real_escape_string($data->name);
            $role = $conn->real_escape_string($data->role);
            $email = $conn->real_escape_string($data->email);
            $phone = isset($data->phone) ? $conn->real_escape_string($data->phone) : '';
            $join_date = isset($data->join_date) ? $conn->real_escape_string($data->join_date) : date('Y-m-d');
            
            $sql = "INSERT INTO members (name, role, email, phone, join_date) VALUES ('$name', '$role', '$email', '$phone', '$join_date')";
            
            if ($conn->query($sql) === TRUE) {
                echo json_encode(["message" => "Member added successfully", "id" => $conn->insert_id]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Error: " . $sql . "<br>" . $conn->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Incomplete data"]);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $id = $conn->real_escape_string($_GET['id']);
            $sql = "DELETE FROM members WHERE id = '$id'";
            
            if ($conn->query($sql) === TRUE) {
                echo json_encode(["message" => "Member deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Error deleting record: " . $conn->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "ID is required"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

$conn->close();
?>
