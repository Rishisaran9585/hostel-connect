<?php
// Suppress errors from being displayed as HTML
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Catch any fatal errors and return as JSON
register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== NULL && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Internal Server Error: " . $error['message'],
            "file" => $error['file'],
            "line" => $error['line']
        ]);
    }
});

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'db_connect.php';

// Check if $conn exists (it should come from db_connect.php)
if (!isset($conn) || $conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$uploadDir = '../uploads/gallery/';

// Create upload directory if it doesn't exist
if (!file_exists($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to create upload directory"]);
        exit();
    }
}

switch ($method) {
    case 'GET':
        // Get all gallery items using 'src' as per DB schema
        $sql = "SELECT id, title, src as image_url, category, created_at FROM gallery ORDER BY created_at DESC";
        $result = $conn->query($sql);
        $gallery = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $gallery[] = $row;
            }
        }
        echo json_encode($gallery);
        break;

    case 'POST':
        // Add new image
        if (isset($_FILES['image']) && isset($_POST['title']) && isset($_POST['category'])) {
            $title = $conn->real_escape_string($_POST['title']);
            $category = $conn->real_escape_string($_POST['category']);

            $fileName = basename($_FILES["image"]["name"]);
            $fileName = preg_replace("/[^a-zA-Z0-9._-]/", "_", $fileName); // Sanitize filename

            // Generate unique filename to prevent overwrites
            $targetFilePath = $uploadDir . time() . '_' . $fileName;
            $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

            $allowTypes = array('jpg', 'png', 'jpeg', 'gif', 'webp');
            if (in_array($fileType, $allowTypes)) {
                if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
                    // Store the relative path in the database
                    $dbPath = str_replace('../', '', $targetFilePath);

                    // Use 'src' column instead of 'image_url' to match DB schema
                    // Check if category needs to be adjusted for ENUM, but we'll try to insert first
                    $sql = "INSERT INTO gallery (title, src, category) VALUES ('$title', '$dbPath', '$category')";

                    if ($conn->query($sql) === TRUE) {
                        echo json_encode([
                            "success" => true,
                            "message" => "Image uploaded successfully",
                            "id" => $conn->insert_id,
                            "image_url" => $dbPath
                        ]);
                    } else {
                        // If it fails due to ENUM, we might want to alert the user or log it
                        http_response_code(500);
                        echo json_encode([
                            "success" => false,
                            "message" => "Database Error: " . $conn->error,
                            "sql" => $sql
                        ]);
                    }
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "message" => "Sorry, there was an error uploading your file."]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Sorry, only " . implode(", ", $allowTypes) . " files are allowed."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Incomplete data. Received: " . json_encode($_POST) . " and FILES: " . json_encode($_FILES)]);
        }
        break;

    case 'DELETE':
        // Delete image
        if (isset($_GET['id'])) {
            $id = $conn->real_escape_string($_GET['id']);

            // First get the image path to delete the file
            $sql_get = "SELECT src FROM gallery WHERE id = '$id'";
            $result = $conn->query($sql_get);

            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $filePath = '../' . $row['src'];

                $sql = "DELETE FROM gallery WHERE id = '$id'";

                if ($conn->query($sql) === TRUE) {
                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                    echo json_encode(["success" => true, "message" => "Image deleted successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["success" => false, "message" => "Error deleting record: " . $conn->error]);
                }
            } else {
                http_response_code(404);
                echo json_encode(["success" => false, "message" => "Image not found"]);
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