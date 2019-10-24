 <?php
    // Fetch from db Equipas
    //$conn = mysqli_connect();

    $sql = "SELECT * FROM Equipas;";
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
        <link href="styles/index.css" rel="stylesheet" type="text/css" /> <!-- type é importante para alguns browsers reconhecerem o css -->
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
                <div id="loading-bar"></div>
                <ul id="ranking-list">
                   <!-- <li id="first-place"><p class="lugar">1</p>Monstros<p class="pontos">2150 pts</p></li>
                    <li id="second-place"><p class="lugar">2</p>Monstros<p class="pontos">2000 pts</p></li>
                    <li id="third-place"><p class="lugar">3</p>Monstros<p class="pontos">1850 pts</p></li>
                    <li><p class="lugar">4</p>Monstros<p class="pontos">1025 pts</p></li>
                    <li><p class="lugar">5</p>Monstros<p class="pontos">105 pts</p></li>
                    <li><p class="lugar">6</p>Monstros<p class="pontos">20 pts</p></li>
                    <li><p class="lugar">7</p>Monstros<p class="pontos">-35 pts</p></li>
                    <li><p class="lugar">8</p>Monstros<p class="pontos">-100 pts</p></li>
                    <li><p class="lugar">9</p>Monstros<p class="pontos">-1200 pts</p></li> -->
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
          
        <footer>
             <ul>
                <li><a href="/equipas">Equipas</a></li>
                <li><a href="/postos">Postos</a></li>
                <li><a href="/premios">Prémios</a></li>
                <li><a href="/mapa">Mapa</a></li>
                <li><a href="/contacto">Contacto</a></li>
                <li><a href="/acerca">Acerca</a></li>
            </ul>
        </footer>
        
        <script src="scripts/jquery.js"></script>
        <script src="scripts/index.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>
</html>
  