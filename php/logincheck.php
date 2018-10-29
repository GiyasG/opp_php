<?php
require '../vendor/autoload.php';
$db = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
// or
// $db = new \PDO('sqlite:../Databases/php_auth.sqlite');

$auth = new \Delight\Auth\Auth($db);

// $result = \processRequestData($auth);

$outp = "";

if ($outp != "") {$outp .= ",";}
// $outp .= '{"LastOperation":"'.\var_dump($result).'",';
$outp .= '{"SessionID":"'.\session_id().'",';
$outp .= '"isLoggedIn":"'.$auth->isLoggedIn().'"}';
// $outp .= '{"AuthCheck":"'.\var_dump($auth->check()).'",';
// $outp .= '{"getUserId":"'.\var_dump($auth->getUserId()).'",';
// $outp .= '{"AuthId":"'.\var_dump($auth->id()).'",';
// $outp .= '{"getEmail":"'.\var_dump($auth->getEmail()).'",';
// $outp .= '{"getUsername":"'.\var_dump($auth->getUsername()).'",';
// $outp .= '{"getStatus":"'.\var_dump($auth->getStatus()).'",';
// $outp .= '{"SupermModerator":"'.\var_dump($auth->hasRole(\Delight\Auth\Role::SUPER_MODERATOR)).'",';
// $outp .= '{"isRemembered":"'.\var_dump($auth->isRemembered()).'",';
// $outp .= '{"getIpAddress":"'.\var_dump($auth->getIpAddress()).'",';
// $outp .= '{"createCookieName":"'.\var_dump(\Delight\Auth\Auth::createCookieName('session')).'",';
// $outp .= '{"createRandomString":"'.\var_dump(\Delight\Auth\Auth::createRandomString()).'",';
// $outp .= '"Auth::createUuid()":"'.\var_dump(\Delight\Auth\Auth::createUuid()).'"}';


$outp ='{"litems":['.$outp.']}';
echo ($outp);
?>
