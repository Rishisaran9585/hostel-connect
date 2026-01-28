<?php
include_once 'db_connect.php';
$res = $conn->query("SELECT id, name, photo FROM members");
while ($row = $res->fetch_assoc()) {
    echo "ID: " . $row['id'] . " | Name: " . $row['name'] . " | Photo: [" . $row['photo'] . "]\n";
}
?>