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

// Ensure the blog_posts table has an image_url column
$conn->query("ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image_url VARCHAR(255) AFTER author");

$method = $_SERVER['REQUEST_METHOD'];
$uploadDir = '../uploads/blog/';

// Create upload directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

switch ($method) {
    case 'GET':
        $sql = "SELECT id, title, content, author, image_url, created_at FROM blog_posts ORDER BY created_at DESC";
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
        // Handle multipart/form-data for image upload OR JSON for backward compatibility
        if (isset($_POST['title']) && isset($_POST['content']) && isset($_POST['author'])) {
            // Multipart upload
            $title = $conn->real_escape_string($_POST['title']);
            $content = $conn->real_escape_string($_POST['content']);
            $author = $conn->real_escape_string($_POST['author']);
            $dbPath = '';

            if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
                $fileName = time() . '_' . preg_replace("/[^a-zA-Z0-9._-]/", "_", basename($_FILES["image"]["name"]));
                $targetFilePath = $uploadDir . $fileName;
                if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
                    $dbPath = 'uploads/blog/' . $fileName;
                }
            }

            $sql = "INSERT INTO blog_posts (title, content, author, image_url) VALUES ('$title', '$content', '$author', '$dbPath')";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(["success" => true, "message" => "Post created successfully", "id" => $conn->insert_id, "image_url" => $dbPath]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Database Error: " . $conn->error]);
            }
        } else {
            // JSON fallback
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
                echo json_encode(["success" => false, "message" => "Incomplete data."]);
            }
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            $id = $conn->real_escape_string($_GET['id']);
            
            // Delete image file first
            $res = $conn->query("SELECT image_url FROM blog_posts WHERE id = '$id'");
            if ($res && $row = $res->fetch_assoc()) {
                if (!empty($row['image_url']) && file_exists('../' . $row['image_url'])) {
                    unlink('../' . $row['image_url']);
                }
            }

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