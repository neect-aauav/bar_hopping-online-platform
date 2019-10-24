<?php

    $conn = mysqli_connect("localhost", "u824612971_d99", "bboby1!Power!", "u824612971_rali920");

    $key = "ralli";
    $pass = $_POST["pass"];
    
    //if ($key == $pass) {
        $ip = $_POST["ip"];
        $time = $_POST["time"];
        $db = "IpsAutorizados";
        
        $sql = "INSERT INTO $db (ip, time) VALUES ('$ip','$time');";
        
        $connect = mysqli_query($conn, $sql);
    //}

?>

<html lang=pt>
    <head>
        <link rel="icon" type="image/png" href="styles/images/ralli9-20_logo.png">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
        <title>Ralli9/20</title>
        <!-- Bootstrap minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/bootstrap.css">
        <!--<link href="styles/login.css" rel="stylesheet" type="text/css" /> <!-- type é importante para alguns browsers reconhecerem o css -->
    </head>
  
    <body>
        <input id="password" type="text">
        <a href="#" id="send">Enviar</a>
        
        <script>
            var connect = <?php echo json_encode($connection); ?>;
            console.log(connect);
        </script>
        
        <script src="scripts/jquery.js"></script>
        <script src="scripts/login.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>
  