<?php
    // Fetch from db _Equipas
    //$conn = mysqli_connect();

    $sql = "SELECT * FROM _Equipas;";
    $result = mysqli_query($conn, $sql);

    $nome = array();
    $ordem = array();
    $nmrJogadores = array();
    $nomesJogadores = array();
    $curso = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $nome[] = $row['Nome'];
        $ordem[] = $row['Ordem'];
        $nmrJogadores[] = $row['NmrJogadores'];
        $nomesJogadores[] = $row['NomesJogadores'];
        $curso[] = $row['Curso'];
    }
    
    // Fetch from all equipa tables
    $info = array();
    $postos = array();
    $ordemCorreta = array();
    
    for ($i = 0; $i < count($nome); $i++) {
        $currentNome = $nome[$i];
        $finalNome="";
        
        for ($j=0; $j<strlen($currentNome); $j++) {
            if ($currentNome{$j} === " ") {
                $finalNome = $finalNome . '_';
            }
            else {
                $finalNome = $finalNome . $currentNome{$j};
            }
        }
        
        if ($finalNome === "Drink++") {
            $finalNome = "Drink__";
        }
        
        if ($finalNome === "GRUA_-_Grupo_de_Rallys_da_Universidade_de_Aveiro") {
            $finalNome = "GRUA__Grupo_de_Rallys_da_Universidade_de_Aveiro";
        }
        
        if ($finalNome === "ESSUAr_toda_a_noite!!") {
            $finalNome = "ESSUAr_toda_a_noite__";
        }
        
        $sql2 = "SELECT * FROM $finalNome;";
        $result2 = mysqli_query($conn, $sql2);
        while ($row2 = mysqli_fetch_assoc($result2)) {
            array_push($postos, $row2['posto']);
        }
        $ordemCorreta = array($ordem[$i]);
        $wrapper = array($nome[$i], $postos, $ordemCorreta);
        array_push($info, $wrapper);
        $postos = array();
    }
    
    // Fetch from db _Registos

    $sql3 = "SELECT * FROM _Registos;";
    $result3 = mysqli_query($conn, $sql3);

    $usersArray = array();
    $passArray = array();
    
    while ($row3 = mysqli_fetch_assoc($result3)) {
        $usersArray[] = $row3['user'];
        $passArray[] = $row3['pass'];
    }


    // check login
    $user = $_POST['user'];
    $pass = $_POST['pass'];

    $connection=false;
    
    for ($i=0; $i<count($usersArray); $i++) {
        if (in_array($user, $usersArray)) {
            if (password_verify($pass,$passArray[$i])) {
                $connection=true;
            }
        }
    }

    
?>

<html lang=pt>
    <head>
        <link rel="icon" type="image/png" href="styles/images/ralli9-20_logo.png">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
        <title>Ralli9/20 - Admin</title>
        <!-- Bootstrap minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/bootstrap.css">
        <link href="styles/admin.css" rel="stylesheet" type="text/css" />
        <link href="styles/footer.css" rel="stylesheet" type="text/css" />
    </head>
  
    <body>
        <div class="admin-navbar-container">
            <div class="admin-navbar-wrapper">
                <div class="admin-navbar" id="navbar-left">
                    <ul>
                        <li><a id="admin-navbar-a" href="index">Ralli9/20</a></li>
                        <li><a href="admin"><img src="styles/images/lock.png"></a></li>
                        <li id="admin-navbar-li">Administração das equipas</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="hidden" id="dark-back"></div>
        
        <div id="side-navbar-container">
            <div id="arrow-wrapper">
                <i id="arrow" class="right"></i>
            </div>
            <ul id="side-navbar-ul">
                <div style="height: 45px; overflow: auto;"><li id="equipa">__</li></div>
                <li id="posto">__</li>
                <li class="option">
                    <ul>
                        <li>Ordem correta: <p id="oC_bool">?</p></li>
                        <li><p id="oC_pts" class="pontos">__</p></li>
                    </ul>
                </li>
                <li class="option">
                    <ul>
                        <li>Consumo mínimo: <p id="cM_bool">?</p></li>
                        <li id="cM_qnt">0</li>
                        <li><p id="cM_pts" class="pontos">__</p></li>
                    </ul>
                </li>
                <li class="option">
                    <ul>
                        <li>Completou o desafio: <p id="cD_bool">?</p></li>
                        <li><p id="cD_pts" class="pontos">__</p></li>
                    </ul>
                </li>
                <li class="option">
                    <ul>
                        <li>Alguém gregou: <p id="aG_bool">?</p></li>
                        <li id="aG_qnt">0</li>
                        <li><p id="aG_pts" class="pontos">__</p></li>
                    </ul>
                </li>
                <li class="option">
                    <ul>
                        <li>Bebeu bebida extra: <p id="bE_bool">?</p></li>
                        <li id="bE_qnt">0</li>
                        <li><p id="bE_pts" class="pontos">__</p></li>
                    </ul>
                </li>
                <li class="option">
                    <ul>
                        <li>Nmr correto elems: <p id="nE_bool">?</p></li>
                        <li id="nE_qnt">0</li>
                        <li><p id="nE_pts" class="pontos">__</p></li>
                    </ul>
                </li>
                <li id="total">Total: <p id="total_pts" class="pontos">__</p></li>
            </ul>
        </div>
        
        <div class="centered-content" style="padding-top:100px;">
            <div id="equipas-wrapper">
                <div id="equipas-dropdown-wrapper">
                   <p id="equipas-dropdown-button" class="title">Equipa</p>
                   <i id="equipas-dropdown-arrow" class="down"></i>
                </div id="equipas-onDropdown-wrapper">
            </div>
        </div>
        
        <div class="centered-content" id="postos-container">
            <div id="postos-title-wrapper">
                <p class="title" id="postos-title">Postos</p>
            </div>
            <ul id="postos-wrapper" style="pointer-events: none">
                <li><p class="super-centered-content" style="z-index: -1">1</p></li>
                <li><p class="super-centered-content" style="z-index: -1">2</p></li>
                <li><p class="super-centered-content" style="z-index: -1">3</p></li>
                <li><p class="super-centered-content" style="z-index: -1">4</p></li>
                <li><p class="super-centered-content" style="z-index: -1">5</p></li>
                <li><p class="super-centered-content" style="z-index: -1">6</p></li>
            </ul>
        </div>
        
        <div class="centered-content">
            <p class="title">Observações</p>
            <div style="margin-bottom: 25px">
                <textarea id="observacaoInput" placeholder="Escreve aqui alguma observação..." name="msg" rows="4" cols="50"></textarea>
            </div>
            <div id="send-button">
                <p class="super-centered-content">Enviar</p></div>
        </div>
        
        <script>
        
            // Equipa info
            var equipasArray = <?php echo json_encode($nome); ?>;
            console.log(equipasArray);
            var ordemArray = <?php echo json_encode($ordem); ?>;  
            var nmrJogadoresArray = <?php echo json_encode($nmrJogadores); ?>;
            var nomesJogadoresArray = <?php echo json_encode($nomesJogadores); ?>;
            var cursoArray = <?php echo json_encode($curso); ?>;
            
            // Equipas info
            var info = <?php echo json_encode($info); ?>;
            
            // connection
            var conn = <?php echo json_encode($connection) ?>;
            
            // username
            var username = <?php echo json_encode($user) ?>;
            console.log(username);
        </script> 
        
        <footer style="border-top: 3px solid white;">
            <ul>
                <li>
                    <ul id="footer-menu">
                        <li><a href="equipas">Equipas</bt></li>
                        <li><a href="postos">Postos</bt></li>
                        <li><a href="premios">Prémios</bt></li>
                        <li><a href="mapa">Mapa</bt></li>
                        <li><a href="contacto">Contacto</bt></li>
                        <li><a href="acerca">Acerca</bt></li>
                        <li><a href="admin"><img src="styles/images/lock.png" style="width: 22px;margin-top: 6px;"></a></li>
                    </ul>
                </li>
                <li style="border-top: 1.2px solid white; padding: 20px 0;">
                    <ul id="nucleos">
                        <li><a href="contacto#naessua"><img src="styles/images/NAE-ESSUA_AC_4.png" alt="NAE-ESSUA LOGO"></bt></li>
                        <li><a href="contacto#naeisca"><img src="styles/images/NAE-ISCAA_AC_4.png" alt="NAE-ISCA LOGO"></bt></li>
                        <li><a href="contacto#neg"><img src="styles/images/NEG_AC_4.png" alt="NEG LOGO"></bt></li>
                        <li><a href="contacto#neect"><img src="styles/images/NEECT_AC_4.png" alt="NEECT LOGO"></bt></li>
                    </ul>
                </li>
            </ul>
        </footer>
    
        <script src="scripts/jquery.js"></script>
        <script src="scripts/admin.js"></script>
        <script src="scripts/footer.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>
    
</html>