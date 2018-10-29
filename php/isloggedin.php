<?php
require '../vendor/autoload.php';
  $db = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
  $auth = new \Delight\Auth\Auth($db);
  if ($auth->isLoggedIn()) {
    $outp ='{"isloggedin":true}';
  } else {
    $outp ='{"isloggedin":false}';
  }

echo ($outp);
?>
