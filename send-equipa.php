<?php

$conn = mysqli_connect("localhost", "u824612971_d99", "bboby1!Power!", "u824612971_rali920");

$postPosto = $_POST["posto"];
$postOrdemCorreta = $_POST["ordemCorreta"];
$postOrdemCorretaPts = $_POST["ordemCorretaPts"];
$postNmrElementosCorreto = $_POST["nmrElementosCorreto"];
$postNmrElementosCorretoPts = $_POST["nmrElementosCorretoPts"];
$postDesafio = $_POST["desafio"];
$postDesafioPts = $_POST["desafioPts"];
$postGregou = $_POST["gregou"];
$postNmrGregar = $_POST["nmrGregar"];
$postNmrGregarPts = $_POST["nmrGregarPts"];
$postExtra = $_POST["extra"];
$postNmrExtras = $_POST["nmrExtras"];
$postNmrExtrasPts = $_POST["extraPts"];
$postTotalPts = $_POST["totalPts"];
$postObs = $_POST["obs"];
$postTime = $_POST["time"];
$db = $_POST["db"];

$sql = "INSERT INTO $db (posto, ordemCorreta, ordemCorretaPts, nmrElementosCorreto, nmrElementosCorretoPts, desafio, 	desafioPts, gregou, nmrGregar, nmrGregarPts, extra,	nmrExtras, nmrExtrasPts, totalPts, obs, time) VALUES ('$postPosto','$postOrdemCorreta','$postOrdemCorretaPts','$postNmrElementosCorreto', '$postNmrElementosCorretoPts', '$postDesafio', '$postDesafioPts', '$postGregou', '$postNmrGregar', '$postNmrGregarPts', '$postExtra', '$postNmrExtras', '$postNmrExtrasPts', '$postTotalPts', '$postObs', '$postTime');";

$connect = mysqli_query($conn, $sql);

?>