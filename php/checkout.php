<?php
// session_start();
// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json; charset=UTF-8");

// include('class/mysql_crud.php');
$bsk = $_GET['items'];
// print_r($bsk);
// echo '</br>';
// echo gettype($bsk);


$outp = "";
$outp ='{"basketitems":'.$bsk.'}';

echo ($outp);

?>
