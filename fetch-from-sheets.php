<?php

// Fetch from DB
//$conn = mysqli_connect();

$sql = "SELECT * FROM _Equipas;";
$result = mysqli_query($conn, $sql);

$nome = array();
while ($row = mysqli_fetch_assoc($result)) {
    $nome[] = $row['Nome'];
}


// Fetch from SPREADSHEET
require __DIR__ . '/google-api-php-client-2.4.0/vendor/autoload.php';

$client = new \Google_Client();
$client->setApplicationName('Google Sheets and PHP');
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
$client->setAuthConfig(__DIR__ . '/credentials.json');
$service = new Google_Service_Sheets($client);
$spreadsheetId="1L6YNK2dSsoJas68goJpw5IQnpIMFiQ3GMgy7bCauNaw";

$rangeToEndValue = "Form responses 1!T2";
$responseToEndValue = $service->spreadsheets_values->get($spreadsheetId, $rangeToEndValue);
$valueOfEndValue = $responseToEndValue->getValues();
$endValue = $valueOfEndValue[0][0];
if (intval($endValue) == 0) {
    echo "<b>INFO: </b>The spreadsheet is empty!<br>";
}

$alreadyAdded=array();
if (intval($endValue) > 0) {
    $end = intval($endValue)+2;
    $range = "Form responses 1!A3:R".$end;
    $response = $service->spreadsheets_values->get($spreadsheetId, $range);
    $values = $response->getValues();
    
    if (empty($values)) {
        print "<b>ERROR: </b>No data found.<br>";
    }
    else {
        $added=false;
        $cursosList;
        //$largerCursoArray = array();
        for ($i=0; $i<count($values); $i++) {
            $goToDB=true;
            $currentNomes="";
            $nmrJog=0;
            $cursoRespons;
            
            for ($z=4; $z<17; $z = $z + 3) {
                if ($values[$i][$z] !== "") {
                    $cursosList[$i][] = $values[$i][$z];
                }
            }
            
            /*$cursosFreq;
            foreach ($cursosList[$i] as $curso) {
                $cursosFreq[$i][$curso] = $cursosFreq[$i][$curso]+1; 
            }
            
            $largerValue = $cursosFreq[$i][$cursosList[$i][0]];
            $largerCurso = $cursosList[$i][0];
            for ($b=0; $b<count($cursosFreq[$i]); $b++) {
                for ($c=0; $c<count($cursosList[$i]);$c++) {
                    if ($cursosFreq[$i][$cursosList[$i][$c]]>$largerValue) {
                        $largerValue = $cursosFreq[$i][$cursosList[$i][$c]];
                        $largerCurso = $cursosList[$i][$c];
                    }
                }
            }$stringFinal
            
            $largerCursoArray[]=$largerCurso;*/
            
            $auxCursos = array();
            $cursoAdded = array();
            $allCursosString="";
            foreach ($cursosList[$i] as $curso) {
                $curso = strtolower($curso);
                if ($curso{strlen($curso)-1} === " ") {
                    $stringFinal = "";
                    for ($g=0; $g<strlen($curso)-1; $g++) {
                        $stringFinal = $stringFinal . $curso{$g};
                    }
                    $curso = $stringFinal;
                    $auxCursos[] = $curso;
                }
                
                if (! in_array($curso, $cursoAdded)) {
                    $cursoAdded[] = $curso;
                    $allCursosString = $allCursosString . " #" . spacesToUnderScore($curso);    
                }
            }
            
            for ($a=2; $a<15; $a = $a+3) {
                if ($values[$i][$a] != "") {
                    
                    $nmrJog++;
                    if ($a == 2) {
                        $currentNomes = $currentNomes . $values[$i][$a];
                    }
                    else {
                        $currentNomes = $currentNomes."/".$values[$i][$a];   
                    }
                }
            }
            
            for ($j=0; $j<count($nome); $j++) {
                if ($values[$i][1] == $nome[$j]) {
                    $goToDB=false;
                }
            }
            
            $currentNomeEquipa = $values[$i][1];
            if ($goToDB) {
                if (!in_array($currentNomeEquipa, $alreadyAdded)) {
                    $added = true;
                    $sql = "INSERT INTO _Equipas (Nome, Ordem, nmrJogadores, NomesJogadores, Curso) VALUES ('$currentNomeEquipa','TBD/TBD/TBD/TBD/TBD', '$nmrJog','$currentNomes','$allCursosString');";    
                    $finalNome="";
                    $len = strlen($currentNomeEquipa);
                    for ($j=0; $j<$len; $j++) {
                        if ($currentNomeEquipa{$j} === " " && $j < ($len-1)) {
                            $finalNome = $finalNome . '_';
                        }
                        else {
                            $finalNome = $finalNome . $currentNomeEquipa{$j};
                        }
                    }
                    
                    $sql2 = "CREATE TABLE $finalNome (posto INT(11) NOT NULL , ordemCorreta VARCHAR(256) NOT NULL , ordemCorretaPts INT(11) NOT NULL , bebidaMinima VARCHAR(256) NOT NULL , nmrBebidaMinima INT(11) NOT NULL, bebidaMinimaPts INT(11) NOT NULL , desafio VARCHAR(256) NOT NULL , desafioPts INT(11) NOT NULL , gregou VARCHAR(256) NOT NULL , nmrGregar INT(11) NOT NULL , nmrGregarPts INT(11) NOT NULL , extra VARCHAR(256) NOT NULL , nmrExtras INT(11) NOT NULL , nmrExtrasPts INT(11) NOT NULL , faltas VARCHAR(256) NOT NULL , nmrFaltas INT(11) NOT NULL , nmrFaltasPts INT(11) NOT NULL,  ovo VARCHAR(256) NOT NULL, totalPts INT(11) NOT NULL , obs VARCHAR(256) NOT NULL , time VARCHAR(256) NOT NULL , Id INT(11) NOT NULL AUTO_INCREMENT , PRIMARY KEY (Id)) ENGINE = InnoDB;";
                        
                    $createRow = mysqli_query($conn, $sql);
                    $createTable = mysqli_query($conn, $sql2);
                    
                    if ($createRow) {
                        $alreadyAdded[] = $currentNomeEquipa;
                        echo "<b>SUCCESS:</b> Created row to <i>" . $currentNomeEquipa . "</i> with success!";
                        echo "<br>";
                    }
                    else {
                        echo "<b>ERROR:</b> Something went wrong while trying to connect with the data base. Couldn't create row to <i>" . $currentNomeEquipa ."</i>.";
                        echo "<br>";
                    }
                    
                    if ($createTable) {
                        echo "<b>SUCCESS:</b> Created table for <i>" . $currentNomeEquipa . "</i> with success!";
                        echo "<br>";
                    }
                    else {
                        echo "<b>ERROR:</b> Something went wrong while trying to connect with the data base. Couldn't create table for <i>" . $currentNomeEquipa ."</i>.";
                        echo "<br>";
                    }   
                }
                else {
                    echo "<b>WARNING:</b> <i>".$currentNomeEquipa."</i> is already assigned to the database.<br>";
                }
            }
        }
        if (!$added) {
            echo "<b>INFO:</b> There were no new rows in the spreadsheet! The data base is already up to date!<br>";
        }
        echo "<b>INFO: </b>".count($alreadyAdded)." rows were added to the data base!";
    }    
}

function spacesToUnderScore($w) {
    $s="";
    for ($i=0; $i<strlen($w); $i++) {
        if ($w{$i} === " " && $i < strlen($w)-1) {
            $s = $s . "_";
        }
        else {
            $s = $s . $w{$i};
        }
    }
    return $s;
}

$file = fopen("ensaio-sobre-a-morte.php","w");
echo fwrite($file,createPage());
fclose($file);

function createPage() {
    $finalS="";
    $strings = array();
    $strings = ["<!doctype html>", "<html lang=pt>", '<link rel="icon" type="image/png" href="../styles/images/serius_icon_2.png">', '<meta charset="utf-8">', '<meta http-equiv="X-UA-Compatible" content="IE=edge">', '<meta name="viewport" content="width=device-width, initial-scale=1">', '<title>Eventos | Ensaio sobre a morte</title>', '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">', '<link rel="stylesheet" href="../styles/bootstrap.css">', '</head>', '</body>', '</body>', '</html>'];
    foreach ($strings as $s) {
        $finalS = $finalS . PHP_EOL . $s;
    }
    return $finalS;
}

?>

<html lang=pt>
    <head>
        <link rel="icon" type="image/png" href="styles/images/ralli9-20_logo.png">
        <title>Fetch from Sheets</title>
    </head>
    
    <script>
        var vals = <?php echo json_encode($values); ?>;
        console.log(vals);
        var cursoResp = <?php echo json_encode($cursosList); ?>;
        console.log(cursoResp);
        var auxCursos = <?php echo json_encode($auxCursos); ?>;
        console.log(auxCursos);
    </script>
</html>