<?php

// Fetch from DB
$conn = mysqli_connect("localhost", "u824612971_d99", "bboby1!Power!", "u824612971_rali920");

$sql = "SELECT * FROM Equipas;";
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
$spreadsheetId = "1tFkIknYnkUT7-kNcACtBbXYOefQJRrrjkbenMJT0n_4";

$count=0;
$begin=2;
$end=4;
$range = "Respostas do Formulário 1!A".$begin.":R".$end;
$response = $service->spreadsheets_values->get($spreadsheetId, $range);
$values = $response->getValues();

if (empty($values)) {
    print "No data found.\n";
}
else {
    
    for ($i=0; $i<count($values); $i++) {
        $goToDB=true;
        $currentNomes="";
        $nmrJog=0;
        $cursoRespons;
        for ($a=2; $a<15; $a = $a+3) {
            if ($values[$i][$a] != "") {
                
                // ver se é o responsável
                if ($values[$i][$a] == $values[$i][17]) {
                    $cursoRespons = $values[$i][$a+2]; 
                }
                
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
            $sql = "INSERT INTO Equipas (Nome, nmrJogadores, NomesJogadores, Curso) VALUES ('$currentNomeEquipa','$nmrJog','$currentNomes','$cursoRespons');";

            $connect = mysqli_query($conn, $sql);
        }
    }
}

?>

<script>
    var array = <?php echo json_encode($values); ?>;
    console.log(array);
</script>