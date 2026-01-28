<?php
include_once 'db_connect.php';

$sql = "ALTER TABLE blog_posts 
        MODIFY excerpt text NULL,
        MODIFY date date NULL,
        MODIFY read_time varchar(20) NULL,
        MODIFY image varchar(500) NULL,
        MODIFY category varchar(100) NULL";

if ($conn->query($sql) === TRUE) {
    echo "Table 'blog_posts' updated successfully.\n";
} else {
    echo "Error updating table: " . $conn->error . "\n";
}

$conn->close();
?>