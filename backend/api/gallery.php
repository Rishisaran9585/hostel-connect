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
$uploadDir = '../uploads/gallery/';

// Create upload directory if it doesn't exist
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

switch ($method) {
    case 'GET':
        // Get all gallery items
        $sql = "SELECT * FROM gallery ORDER BY created_at DESC";
        $result = $conn->query($sql);
        $gallery = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                // Add full URL to image path for frontend
                // Assuming the backend is hosted at the same domain/IP in a typical XAMPP setup
                // Adjust base URL as needed based on actual deployment
                // For local dev, we might return the relative path and handle base URL in frontend
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
            // Generate unique filename to prevent overwrites
            $targetFilePath = $uploadDir . time() . '_' . $fileName;
            $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
            
            $allowTypes = array('jpg', 'png', 'jpeg', 'gif');
            if (in_array(strtolower($fileType), $allowTypes)) {
                if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
                    // Store the relative path in the database
                    // Removing '../' to make it cleaner for serving
                    $dbPath = str_replace('../', '', $targetFilePath);
                    
                    $sql = "INSERT INTO gallery (title, image_url, category) VALUES ('$title', '$dbPath', '$category')";
                    
                    if ($conn->query($sql) === TRUE) {
                        echo json_encode(["message" => "Image uploaded successfully", "id" => $conn->insert_id, "image_url" => $dbPath]);
                    } else {
                        http_response_code(500);
                        echo json_encode(["message" => "Database Error: " . $conn->error]);
                    }
                } else {
                    http_response_code(500);
                    echo json_encode(["message" => "Sorry, there was an error uploading your file."]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Sorry, only JPG, JPEG, PNG, & GIF files are allowed."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Incomplete data. Please provide title, category and image file."]);
        }
        break;

    case 'DELETE':
        // Delete image
        if (isset($_GET['id'])) {
            $id = $conn->real_escape_string($_GET['id']);
            
            // First get the image path to delete the file
            $sql_get = "SELECT image_url FROM gallery WHERE id = '$id'";
            $result = $conn->query($sql_get);
            
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $filePath = '../' . $row['image_url'];
                
                $sql = "DELETE FROM gallery WHERE id = '$id'";
                
                if ($conn->query($sql) === TRUE) {
                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                    echo json_encode(["message" => "Image deleted successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["message" => "Error deleting record: " . $conn->error]);
                }
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Image not found"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "ID is required for deletion"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

$conn->close();
?>
