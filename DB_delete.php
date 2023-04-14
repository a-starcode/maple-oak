<?php
$servername = "localhost";
$username = "root";
$password = "";


// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to create database
$sql = "DROP DATABASE Customers";

if ($conn->query($sql) === TRUE) {
    echo "Database deleted successfully";
} else {
    echo "Error deleting database: " . $conn->error;
}

$conn->close();
?>
