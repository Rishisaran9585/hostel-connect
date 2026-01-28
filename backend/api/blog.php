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

switch ($method) {
    case 'GET':
        $sql = "SELECT id, title, content, author, created_at FROM blog_posts ORDER BY created_at DESC";
        $result = $conn->query($sql);
        $posts = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $posts[] = $row;
            }
        }
        echo json_encode($posts);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->title) && !empty($data->content) && !empty($data->author)) {
            $title = $conn->real_escape_string($data->title);
            $content = $conn->real_escape_string($data->content);
            $author = $conn->real_escape_string($data->author);

            $sql = "INSERT INTO blog_posts (title, content, author) VALUES ('$title', '$content', '$author')";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(["success" => true, "message" => "Post created successfully", "id" => $conn->insert_id]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Database Error: " . $conn->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Incomplete data. Please provide title, content and author."]);
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $id = $conn->real_escape_string($_GET['id']);
            $sql = "DELETE FROM blog_posts WHERE id = '$id'";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(["success" => true, "message" => "Post deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Error deleting record: " . $conn->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "ID is required for deletion"]);
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