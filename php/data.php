<?php
session_start();
// print_r ($_SESSION);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include('class/mysql_crud.php');
$db = new Database();
if (isset($db)) {
  $tb = new Table();
  $res = $tb->get_ParentResult('stock');
// print_r ($res);
  $outp1 = "";

  foreach ($res as $rs) {
      if ($outp1 != "") {$outp1 .= ",";}
      $outp1 .= '{"id":"'.$rs["id"].'",';
      $outp1 .= '"name":"'.$rs["sname"].'",';
      $outp1 .= '"description":"'.$rs["sdescription"].'",';
      $outp1 .= '"price":"'.$rs["sprice"].'",';
      for ($i=39; $i < 46; $i++) {
        $outp1 .= '"i'.$i.'all":"'.$rs["s".$i."_all"].'",';
        $outp1 .= '"i'.$i.'reserv":"'.$rs["s".$i."_reserved"].'",';
        $outp1 .= '"i'.$i.'forsale":"'.$rs["s".$i."_forsale"].'",';
        $outp1 .= '"i'.$i.'sold":"'.$rs["s".$i."_sold"].'",';
      }
      $outp1 .= '"image":"'.$rs["simage"].'"}';
  }

  $outp1 ='{"all":['.$outp1.']}';
} else {
  $outp1 ='{"all":["No items found"]}';
}

if (isset($_SESSION['cart'])) {
  // var_dump($_SESSION);
  $outp2 = "";
  foreach ($_SESSION['cart'] as $rs) {
      if ($outp2 != "") {$outp2 .= ",";}
      $outp2 .= '{"name":"'.$rs["sname"].'",';
      $outp2 .= '"description":"'.$rs["sdescription"].'",';
      $outp2 .= '"price":"'.$rs["sprice"].'",';
      // for ($i=39; $i < 45; $i++) {
      //   $outp .= '"'.$i.'all":"'.$rs["s".$i."_all"].'",';
      //   $outp .= '"'.$i.'reserv":"'.$rs["s".$i."_reserved"].'",';
      //   $outp .= '"'.$i.'forsale":"'.$rs["s".$i."_forsale"].'",';
      //   $outp .= '"'.$i.'sold":"'.$rs["s".$i."_sold"].'",';
      // }
      $outp2 .= '"size":"'.$rs["size"].'",';
      $outp2 .= '"quantity":"'.$rs["quantity"].'",';
      $outp2 .= '"image":"'.$rs["simage"].'"}';
  }
  $outp2 ='{"cart":['.$outp2.']}';
} else {
  // var_dump($_SESSION);
  $outp2 = '{"cart": null}';
}
$outp = '{"items":['.$outp1.','.$outp2.']}';

$db->disconnect();

echo ($outp);
?>
