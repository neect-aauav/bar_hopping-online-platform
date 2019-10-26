<?php

//$conn = mysqli_connect();

$postPosto = $_POST["posto"];
$postOrdemCorreta = $_POST["ordemCorreta"];
$postOrdemCorretaPts = $_POST["ordemCorretaPts"];
$postBebidaMinima = $_POST["bebidaMinima"];
$postNmrBebidaMinima = $_POST["nmrBebidaMinima"];
$postBebidaMinimaPts = $_POST["bebidaMinimaPts"];
$postDesafio = $_POST["desafio"];
$postDesafioPts = $_POST["desafioPts"];
$postGregou = $_POST["gregou"];
$postNmrGregar = $_POST["nmrGregar"];
$postNmrGregarPts = $_POST["nmrGregarPts"];
$postExtra = $_POST["extra"];
$postNmrExtras = $_POST["nmrExtras"];
$postNmrExtrasPts = $_POST["extraPts"];
$postFaltas = $_POST["faltas"];
$postNmrFaltas = $_POST["nmrFaltas"];
$postNmrFaltasPts = $_POST["faltasPts"];
$postTotalPts = $_POST["totalPts"];
$postObs = $_POST["obs"];
$postTime = $_POST["time"];
$db = $_POST["db"];
$user = $_POST['user'];
$ovo = $_POST['ovo'];


if ($db === "Drink++") {
    $db = "Drink__";
}

if ($db === "GRUA_-_Grupo_de_Rallys_da_Universidade_de_Aveiro") {
    $db = "GRUA__Grupo_de_Rallys_da_Universidade_de_Aveiro";
}

if ($db === "ESSUAr_toda_a_noite!!") {
    $db = "ESSUAr_toda_a_noite__";
}

$sql = "INSERT INTO $db (posto, ordemCorreta, ordemCorretaPts, bebidaMinima, nmrBebidaMinima, bebidaMinimaPts, desafio, desafioPts, gregou, nmrGregar, nmrGregarPts, extra, nmrExtras, nmrExtrasPts, faltas, nmrFaltas, nmrFaltasPts, ovo, totalPts, obs, time) VALUES ('$postPosto','$postOrdemCorreta','$postOrdemCorretaPts','$postBebidaMinima', '$postNmrBebidaMinima', '$postBebidaMinimaPts', '$postDesafio', '$postDesafioPts', '$postGregou', '$postNmrGregar', '$postNmrGregarPts', '$postExtra', '$postNmrExtras', '$postNmrExtrasPts','$postFaltas', '$postNmrFaltas', '$postNmrFaltasPts', '$ovo', '$postTotalPts', '$postObs', '$postTime');";

$connect = mysqli_query($conn, $sql);

$size="";
function logString() {
    global $size, $postTime, $user, $db, $postPosto, $postOrdemCorreta, $postOrdemCorretaPts, $postBebidaMinima, $postNmrBebidaMinima, $postBebidaMinimaPts, $postDesafio, $postDesafioPts, $postGregou, $postNmrGregar, $postNmrGregarPts, $postExtra, $postNmrExtras, $postNmrExtrasPts, $postFaltas, $postNmrFaltas, $postNmrFaltasPts, $postTotalPts, $postObs, $ovo;
    
    $fileR = fopen("admin_log.txt", "r");
    $sizeS = fgets($fileR);
    $size = explode(":", $sizeS)[1];
    
    $currentLog = $postTime . " <- " . $user . " -> Equipa: [" . $db . "] | Posto: [" . $postPosto . "] | Ordem Correta: [" .  $postOrdemCorreta ."][" . $postOrdemCorretaPts . "pts] | Bebida Mínima: [" .  $postBebidaMinima ."][" . $postBebidaMinimaPts . "pts] | Desafio: [" .  $postDesafio ."][" . $postDesafioPts . "pts] | Gregar: [" .  $postGregou ."][" . $postNmrGregar . "][" . $postNmrGregarPts . "] | Extra: [" .  $postExtra ."][" . $postNmrExtras . "][" . $postNmrExtrasPts . "pts] | Extra: [" .  $postExtra ."][" . $postNmrExtras . "][" . $postNmrExtrasPts . "pts] | Ovo: [" . $ovo ."] | Total: [" . $postTotalPts . "pts] | Observação: [" . $postObs . "]/";
    
    $finalS="";
    
    // ver se o ficheiro tem conteúdo

    if ($size === "0") {
        $finalS = $currentLog;   
    }
    
    else {
        $sFromFile = stringFromFile();
        $fromFile = explode("/", $sFromFile);
        
        foreach ($fromFile as $line) {
            if ($finalS !== "") {
                $finalS = $finalS . PHP_EOL . $line;    
            }
            else {
                $finalS = $line;
            }
        }
        
        $finalS = $finalS . PHP_EOL . $currentLog;
    }
    $size = intval($size) + 1;
    fclose($fileR);
    return $finalS;
}

function stringFromFile() {
    $fileR2 = fopen("admin_log.txt", "r");
    $firstLine=true;
    $string="";
    while(!feof($fileR2))  {
        if (!$firstLine) {
            $string = $string . fgets($fileR2); 
            echo $string ."<br>";    
        }
        else {
            fgets($fileR2);
            $firstLine=false;    
        }
    }
    fclose($fileR2);
    return $string;
}

// LOG
$log = logString();
$fileW = fopen("admin_log.txt","w");
$sizeRepresent = "logs:" . $size . PHP_EOL;
fwrite($fileW, $sizeRepresent);
echo fwrite($fileW, $log);
fclose($fileW);

?>

<script>
    var ff = <?php echo json_encode($fromFile) ?>;
    console.log(ff);
    var sff = <?php echo json_encode($sFromFile) ?>;
    console.log(sff);
</script>