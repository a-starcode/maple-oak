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

// Fetching data
$name = $email = $phone = "";

$name = $_POST["Name"];
$email = $_POST["Email"];
$phone = $_POST["Phone"];

// Validations
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);

  return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $nameError = $emailError = $phoneError = ""; // errors

  if (empty($name)) $nameError = "Name field is empty";
  else {
    $data = test_input($name);

    if (!preg_match("/^[a-zA-Z]*$/", $data))
      $nameError = "Only letters and white spaces allowed";
  }

  if (empty($email)) $emailError = "Email field is empty";
  else {
    $data = test_input($email);

    if (!filter_var($data, FILTER_VALIDATE_EMAIL))
      $emailError = "Invalid email format";
  }

  if (empty($phone)) $phoneError = "Phone number field is empty";
  else {
    if (strlen($phone) != 10) $phoneError = "Phone number must be 10 digits";
    else {
      $data = test_input($phone);

      if (!preg_match("/^[0-9]*$/", $data))
        $phoneError = "Only digits allowed";
    }
  }

}
// End of Validations

if ($nameError === "" && $emailError === "" && $phoneError === "") {
  $sql = "INSERT INTO Members(Name, Email, Phone)
  VALUES ('$name','$email','$phone');";

  if ($conn->query($sql) === TRUE) echo "New record created successfully";
  else echo "Error: " . $sql . "<br>" . $conn->error;
}

else echo $nameError . "<br>" . $emailError . "<br>" . $phoneError . "<br>Record not stored";


?>
