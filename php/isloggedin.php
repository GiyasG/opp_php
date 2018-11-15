<?php
session_start();

require '../vendor/autoload.php';
  $db = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
  $auth = new \Delight\Auth\Auth($db);
  $outp1 = "";
  if ($auth->isLoggedIn()) {
    $outp1 ='{"isIn":true}';
  } else {
    $outp1 ='{"isIn":false}';
  }

if (isset($_SESSION['cart'])) {
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
  $outp2 ='{"items":['.$outp2.']}';
} else {
  $outp2 = '{"items": null}';
}
$outp = '{"isloggedin":['.$outp1.','.$outp2.']}';
echo ($outp);
?>
