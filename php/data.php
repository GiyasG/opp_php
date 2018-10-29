<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include('class/mysql_crud.php');
$db = new Database();
$db->connect();
$db->setName('SET NAMES \'utf8\'');
// $db->sql("SET NAMES 'utf8'")
$db->select('stock'); // Table name, Column Names, JOIN, WHERE conditions, ORDER BY conditions
$res = $db->getResult();

// print_r ($res);

$outp = "";

// if (isset($res)) {
//     foreach ($res as $k => $v) {
//       array_push($outp1, $res);
//     }
//   }
//
// print_r ($outp1);

foreach ($res as $rs) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"id":"'.$rs["id"].'",';
    $outp .= '"name":"'.$rs["sname"].'",';
    $outp .= '"description":"'.$rs["sdescription"].'",';
    $outp .= '"price":"'.$rs["sprice"].'",';
    for ($i=39; $i < 46; $i++) {
      $outp .= '"i'.$i.'all":"'.$rs["s".$i."_all"].'",';
      $outp .= '"i'.$i.'reserv":"'.$rs["s".$i."_reserved"].'",';
      $outp .= '"i'.$i.'forsale":"'.$rs["s".$i."_forsale"].'",';
      $outp .= '"i'.$i.'sold":"'.$rs["s".$i."_sold"].'",';
    }
    $outp .= '"image":"'.$rs["simage"].'"}';
}

$outp ='{"items":['.$outp.']}';

$db->disconnect();

echo ($outp);
?>
