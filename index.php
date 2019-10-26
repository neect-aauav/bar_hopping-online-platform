 <?php
    // Fetch from db Equipas
    //$conn = mysqli_connect();

    $sql = "SELECT * FROM _Equipas;";
    $result = mysqli_query($conn, $sql);

    $nome = array();
    $curso = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $nome[] = $row['Nome'];
        $curso[] = $row['Curso'];
    }
    
    // Fetch from all equipa tables
    $pontos = array();
    
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
        
        if ($finalNome == "Drink++") {
            $finalNome = "Drink__";
        }
        
        if ($finalNome === "GRUA_-_Grupo_de_Rallys_da_Universidade_de_Aveiro") {
            $finalNome = "GRUA__Grupo_de_Rallys_da_Universidade_de_Aveiro";
        }
        
         if ($finalNome === "ESSUAr_toda_a_noite!!") {
            $finalNome = "ESSUAr_toda_a_noite__";
        }
        
        $total = 0;
        $sql2 = "SELECT * FROM $finalNome;";
        $result2 = mysqli_query($conn, $sql2);
        
        while ($row2 = mysqli_fetch_assoc($result2)) {
            $total+=$row2['totalPts'];
        }
        
        array_push($pontos, $total);
    }
?>

<!doctype html>
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
        <link href="styles/index.css" rel="stylesheet" type="text/css" />
        <link href="styles/footer.css" rel="stylesheet" type="text/css" />
    </head>
  
    <body>
        <div class="navbar-container">
            <div id="navbar-wrapper">
                <div style="position: relative; margin: auto;" class="themed-button" id="button-logo">
                    <a href="/index" class="centered-content" id="logo">Ralli9/20</a>
                </div>
                <div id="navbar">
                    <ul>
                        <li class="themed-button"><a href="/equipas" class="centered-content">Equipas</a></li>
                        <li class="themed-button"><a href="/postos" class="centered-content">Postos</a></li>
                        <li class="themed-button"><a href="/premios" class="centered-content">Prémios</a></li>
                        <li class="themed-button"><a href="/mapa" class="centered-content">Mapa</a></li>
                        <li class="themed-button"><a href="/contacto" class="centered-content">Contacto</a></li>
                        <li class="themed-button"><a href="/acerca" class="centered-content">Acerca</a></li>
                    </ul>
                </div>
                <div id="arrow-container">
                    <i id="arrow" class="down"></i>
                </div>
            </div>
               
            <div id="ranking-container">
                <div id="ranking-wrapper">
                <p id="ranking-title">Ranking</p>
                <div style="color: purple; padding: 10px;">(Ainda faltam os pontos para a equipa com o nome mais original. A ser decidido...)</div>
                <ul id="ranking-list">
                </ul>
                </div>
            </div>
        </div>
        
        <script>
        
            // Equipa info
            var equipasArray = <?php echo json_encode($nome); ?>;
            var cursoArray = <?php echo json_encode($curso); ?>;
            
            // Equipas info
            var totalPontos = <?php echo json_encode($pontos); ?>;
            
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
        <script src="scripts/index.js"></script>
        <script src="scripts/footer.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>
</html>
  