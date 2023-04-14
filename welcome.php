<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
       * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
        }

        body { 
            font: 14px sans-serif; 
            background: url(background1.jpg) center center fixed;
            height: 100vh;
        }
        
        .wrapper { 
            width: 80%; 
            padding: 20px; 
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: auto;
            margin-top: 30vh;
            background-color: #FEF3B1;
            border: 3px solid olive;
            border-radius: 30px;
            text-align: center;
        }

        .wrapper p {
            display: flex;
            justify-content: space-around;
            width: 500px;
            margin: auto;
        }

        @font-face {
            font-family: 'sweet_sen';
            src: url('SweetSensations.ttf') format('truetype');
        }

        header {
            text-align: center;
            font-family: sweet_sen, Helvetica;
            font-size: 84px;
            color: teal;
            font-weight: bold;
            margin-top: 20px; 
        }

    </style>
</head>
<body>
    <div class="wrapper">
        <div class="page-header" style="border: none;">
            <h1>Welcome to Maple Oak <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>!</h1>
        </div>
        <p>
            <a href="reset-password.php" class="btn btn-warning" style="border: none; padding: 12px;">Reset Your Password</a>
            <a href="logout.php" class="btn btn-danger" style="border: none; padding: 12px;">Sign Out</a>
            <a href="00home.html" class="btn btn-danger" style="background: teal; border: none; padding: 12px;">Go To Homepage</a>
        </p>
    </div>
</body>
</html>