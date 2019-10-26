<?php
    // Fetch from db _Equipas
    //$conn = mysqli_connect();

    $sql = "SELECT * FROM _Equipas;";
    $result = mysqli_query($conn, $sql);

    $nome = array();
    $ordem = array();
    $curso = array();
    $membros = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $nome[] = $row['Nome'];
        $ordem[] = $row['Ordem'];
        $curso[] = $row['Curso'];
        $membros[] = $row['NomesJogadores'];
    }
    
    // Fetch from all equipa tables
    $postos = array();
    $pontos = array();
    $gregar = array();
    $extra = array();
    $ovo = array();
    
    for ($i = 0; $i < count($nome); $i++) {
        
        $currentNome = $nome[$i];
        
        if ($currentNome === "GRUA - Grupo de Rallys da Universidade de Aveiro") {
            $currentNome = "GRUA  Grupo de Rallys da Universidade de Aveiro";
        }
        
        if ($currentNome === "ESSUAr toda a noite!!") {
            $currentNome = "ESSUAr toda a noite  ";
        }
        
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
        
        $postosLocal = array();
        $gregarLocal = array();
        $extraLocal = array();
        $ovoLocal = array();
        $total = 0;
        $sql2 = "SELECT * FROM $finalNome;";
        $result2 = mysqli_query($conn, $sql2);
        
        while ($row2 = mysqli_fetch_assoc($result2)) {
            $postosLocal[] = $row2['posto'];
            $gregarLocal[] = $row2['nmrGregar'];
            $extraLocal[] = $row2['nmrExtras'];
            $total+=$row2['totalPts'];
            $ovoLocal[] = $row2['ovo'];
        }
        
        array_push($pontos, $total);
        array_push($postos, $postosLocal);
        array_push($gregar, $gregarLocal);
        array_push($extra, $extraLocal);
        array_push($ovo, $ovoLocal[count($ovoLocal)-1]);
    }
?>

<html lang=pt>
    <head>
        <link rel="icon" type="image/png" href="styles/images/ralli9-20_logo.png">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
        <title>Ralli9/20 - Equipas</title>
        <!-- Bootstrap minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/bootstrap.css">
        <link href="styles/navbar.css" rel="stylesheet" type="text/css" />
        <link href="styles/equipas.css" rel="stylesheet" type="text/css" />
        <link href="styles/footer.css" rel="stylesheet" type="text/css" />
    </head>
    
    <body>
        <div id="navbar-container">
            <div id="navbar-wrapper">
                <div id="navbar-left">
                    <a href="/index">Ralli9/20</a>
                </div>
                <div id="navbar-right">
                    <ul id="navbar-ul">
                        <li class="active"><a href="/equipas">Equipas</a></li>
                        <li><a href="/postos">Postos</a></li>
                        <li><a href="/premios">Prémios</a></li>
                        <li><a href="/mapa">Mapa</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                        <li><a href="/acerca">Acerca</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div id="content-container">
            <div id=equipas-lista>
                <div id="equipas-lista-arrows-wrapper">
                    <i class="up"></i>
                    <i class="down"></i>
                </div>
                <ul id="lista-equipas-ul"></ul>
            </div>
        </div>
        
        <script>
        
            // Equipa info
            var equipasArray = <?php echo json_encode($nome); ?>;
            var ordemArray = <?php echo json_encode($ordem); ?>;
            var cursoArray = <?php echo json_encode($curso); ?>;
            var membrosArray = <?php echo json_encode($membros); ?>;
            
            // Equipas info
            var pontosArray = <?php echo json_encode($pontos); ?>;
            var postosArray = <?php echo json_encode($postos); ?>;
            var gregarArray = <?php echo json_encode($gregar); ?>;
            var extraArray = <?php echo json_encode($extra); ?>;
            var ovoValue = <?php echo json_encode($ovo); ?>;
            
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
        
        <script type="text/javascript" src="scripts/jquery.js"></script>
        <script type="text/javascript" src="scripts/navbar.js"></script>
        <script type="text/javascript" src="scripts/equipas.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>
</html>    