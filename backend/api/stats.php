<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

include_once 'db_connect.php';

if (!isset($conn) || $conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

$stats = [];

// Total Members
$res = $conn->query("SELECT COUNT(*) as total FROM members");
$stats['total_members'] = (int) ($res->fetch_assoc()['total'] ?? 0);

// Blog Posts
$res = $conn->query("SELECT COUNT(*) as total FROM blog_posts");
$stats['blog_posts'] = (int) ($res->fetch_assoc()['total'] ?? 0);

// Active Notices
$res = $conn->query("SELECT COUNT(*) as total FROM notices WHERE is_active = 1");
$stats['active_notices'] = (int) ($res->fetch_assoc()['total'] ?? 0);

// Gallery Assets
$res = $conn->query("SELECT COUNT(*) as total FROM gallery");
$stats['gallery_assets'] = (int) ($res->fetch_assoc()['total'] ?? 0);

// Recent activity (dummy for now or real if there's an activity log)
$stats['system_status'] = 'Operational';
$stats['uptime'] = '99.9%';

echo json_encode([
    "success" => true,
    "stats" => $stats
]);

$conn->close();
?>