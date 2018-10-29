<?php

if ( $_POST ) {
    foreach ( $_POST as $key => $value ) {
    }
}

require '../vendor/autoload.php';

if ($key === 'logOut') {
  $db = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
  $auth = new \Delight\Auth\Auth($db);
  if ($auth->isLoggedIn()) {
    $auth->logOut();
    $outp ="Logged out";
  } else {
  $outp ="You are not logged in";
  }
}
echo ($outp);
?>
