<?php
    // Fetch from db Equipas
    $conn = mysqli_connect("localhost", "u824612971_d99", "bboby1!Power!", "u824612971_rali920");

    $sql = "SELECT * FROM Equipas;";
    $result = mysqli_query($conn, $sql);

    $nome = array();
    $ordem = array();
    $visitados = array();
    $nmrJogadores = array();
    $nomesJogadores = array();
    $curso = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $nome[] = $row['Nome'];
        $ordem[] = $row['Ordem'];
        $visitados[] = $row['Visitados'];
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
    
    // Fetch authorized ips
    $ips = array();
    $sql3 = "SELECT * FROM IpsAutorizados;";
    $result3 = mysqli_query($conn, $sql3);
    while ($row3 = mysqli_fetch_assoc($result3)) {
        array_push($ips, $row3['ip']);
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
        <link href="styles/admin.css" rel="stylesheet" type="text/css" /> <!-- type é importante para alguns browsers reconhecerem o css -->
    </head>
  
    <body>
        <div class="admin-navbar-container">
            <div class="admin-navbar-wrapper">
                <div class="admin-navbar" id="navbar-left">
                    <ul>
                        <li><a href="/index">Ralli9/20</a></li>
                        <li><img src="styles/images/lock.png"></li>
                        <li>Administração da equipa</li>
                    </ul>
                </div>
                <div class="admin-navbar" id="navbar-right">
                    <ul>
                        <li><a href="#">Sair</a></li>
                    </ul>
                </div>
            </div>
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
            <div>
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
            var ordemArray = <?php echo json_encode($ordem); ?>;  
            var visitadosArray = <?php echo json_encode($visitados); ?>;  
            var nmrJogadoresArray = <?php echo json_encode($nmrJogadores); ?>;
            var nomesJogadoresArray = <?php echo json_encode($nomesJogadores); ?>;
            var cursoArray = <?php echo json_encode($curso); ?>;
            
            // Equipas info
            var info = <?php echo json_encode($info); ?>;
            
            // Ips autorizados
            var ipsAutorizados = <?php echo json_encode($ips); ?>;
            
        </script> 
    
        <script src="scripts/admin.js"></script>
        <script src="scripts/jquery.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>
    
</html>    