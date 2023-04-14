<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Newsletter";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to create table
$sql = "CREATE TABLE Members (
Name VARCHAR(255) NOT NULL,
Email VARCHAR(255) NOT NULL,
Phone VARCHAR(10) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
    echo "Table created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>
