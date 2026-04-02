<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== NULL && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Internal Server Error: " . $error['message']
        ]);
    }
});

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'db_connect.php';

if (!isset($conn) || $conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$uploadDir = '../uploads/members/';

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

switch ($method) {
    case 'GET':
        $sql = "SELECT id, name, designation, COALESCE(designation, category) as role, email, phone, hostel_name, photo, category, DATE(created_at) as join_date FROM members ORDER BY name ASC";
        $result = $conn->query($sql);
        $members = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $members[] = $row;
            }
        }
        echo json_encode($members);
        break;

    case 'POST':
        // When using FormData, data is in $_POST and files in $_FILES
        $name = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : '';
        $category = isset($_POST['category']) ? $conn->real_escape_string($_POST['category']) : 'general';
        $designation = isset($_POST['designation']) ? $conn->real_escape_string($_POST['designation']) : '';
        $hostel_name = isset($_POST['hostel_name']) ? $conn->real_escape_string($_POST['hostel_name']) : '';
        $email = isset($_POST['email']) ? $conn->real_escape_string($_POST['email']) : '';
        $phone = isset($_POST['phone']) ? $conn->real_escape_string($_POST['phone']) : '';

        if (empty($name) || empty($hostel_name) || empty($phone)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Required fields missing (name, hostel_name, phone)"]);
            exit();
        }

        $photoPath = '';
        if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
            $fileName = time() . '_' . basename($_FILES["photo"]["name"]);
            $fileName = preg_replace("/[^a-zA-Z0-9._-]/", "_", $fileName);
            $targetFilePath = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES["photo"]["tmp_name"], $targetFilePath)) {
                $photoPath = 'uploads/members/' . $fileName;
            }
        }

        $id = isset($_POST['id']) ? $_POST['id'] : null;

        if ($id && $id !== '' && $id !== 'null' && $id !== 'undefined') {
            $id = $conn->real_escape_string($id);
            $sql = "UPDATE members SET name='$name', designation='$designation', email='$email', phone='$phone', category='$category', hostel_name='$hostel_name'";

            if ($photoPath !== '') {
                $sql_get = "SELECT photo FROM members WHERE id = '$id'";
                $res = $conn->query($sql_get);
                if ($res && $row = $res->fetch_assoc()) {
                    if (!empty($row['photo']) && file_exists('../' . $row['photo'])) {
                        @unlink('../' . $row['photo']);
                    }
                }
                $sql .= ", photo='$photoPath'";
            }
            $sql .= " WHERE id='$id'";

            if ($conn->query($sql) === TRUE) {
                echo json_encode([
                    "success" => true,
                    "message" => "Member updated successfully",
                    "id" => $id,
                    "photo" => $photoPath
                ]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Database Error: " . $conn->error]);
            }
        } else {
            $sql = "INSERT INTO members (name, designation, email, phone, category, hostel_name, photo) 
                    VALUES ('$name', '$designation', '$email', '$phone', '$category', '$hostel_name', '$photoPath')";

            if ($conn->query($sql) === TRUE) {
                echo json_encode([
                    "success" => true,
                    "message" => "Member added successfully",
                    "id" => $conn->insert_id,
                    "photo" => $photoPath
                ]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Database Error: " . $conn->error]);
            }
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $id = $conn->real_escape_string($_GET['id']);

            // Delete photo if exists
            $sql_get = "SELECT photo FROM members WHERE id = '$id'";
            $res = $conn->query($sql_get);
            if ($res && $row = $res->fetch_assoc()) {
                if (!empty($row['photo']) && file_exists('../' . $row['photo'])) {
                    unlink('../' . $row['photo']);
                }
            }

            $sql = "DELETE FROM members WHERE id = '$id'";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(["success" => true, "message" => "Member deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Error deleting record: " . $conn->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "ID is required"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["success" => false, "message" => "Method not allowed"]);
        break;
}

if (isset($conn)) {
    $conn->close();
}
?>