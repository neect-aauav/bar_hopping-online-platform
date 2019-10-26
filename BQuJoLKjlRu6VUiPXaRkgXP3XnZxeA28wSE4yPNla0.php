<html lang=pt>
    <head>
        <link rel="icon" type="image/png" href="styles/images/ralli9-20_logo.png">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
        <title>Ralli9/20 - Registo</title>
        <!-- Bootstrap minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/bootstrap.css">
        <!--<link href="styles/login.css" rel="stylesheet" type="text/css" /> <!-- type é importante para alguns browsers reconhecerem o css -->
        <style>
            /*label {
                width: 87px;
                clear: left;
                text-align: right;
                padding-right: 10px;
            }*/
            
            a, a:hover {
                text-decoration: none;
                float: right;
                font-size: 19px;
                color: white;
            }
            
            i {
                border: solid #011897;
                border-width: 0 3px 3px 0;
                display: inline-block;
                padding: 4px;
                border-color: white;
                transition: 0.4s;
            }

            .right {
              transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
            }

            body {
                background-color: #64F13B;
                color: #011897;
            }
            
            div {
                border-bottom: 1.5px solid #011897;
            }
            
            input, input:focus, input:hover, input:active {
                background-color: #64F13B;
                color: black;
                outline: none;
                box-shadow:none;
                border: none;
                padding: 5px;
            }
            
            button, button:focus, button:hover, button:active {
                border-color: #011897;
                background-color: #011897;
                color: white;
                outline: none;
                box-shadow:none;
            }
            
            form {
                margin-top: 0px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        </style>
    </head>
  
    <body>
        <form action="login.php" method="post" id="loginform">
            <a style="float:right;" href="index">Ralli9/20<i class="right"></i></a><br>
            <label>Nome: </label><div><input type="text" name="name"></div><br>
            <label>Apelido: </label><div><input type="text" name="surname"></div><br>
            <label>Curso: </label><div><input type="text" name="curso"></div><br>
            <label>NMec: </label><div><input type="number" name="nmec"></div><br>
            <label>Mail UA: </label><div><input type="email" name="mail"></div><br>
            <label>Utilizador: </label><div><input type="text" name="user"></div><br>
            <label>Password: </label><div><input type="password" name="pass"></div><br>
            <button id="send" type="submit" form="loginform" value="submit">Enviar</button>
            <button type="reset" form="loginform" value="reset">Repor</button>
        </form>
        
        <script>
        </script>
        
        <script src="scripts/jquery.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>