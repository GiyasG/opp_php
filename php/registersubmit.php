<?php
// print_r ($_POST);
// str_replace("-dot-", ".", $_POST);
if ( $_POST ) {
    foreach ( $_POST as $key => $value ) {
        $key = str_replace("-dot-", ".", $key);
        $key = str_replace("-sqbl-", "[", $key);
        $postdata = json_decode($key);
    }

require '../vendor/autoload.php';
$db = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
$auth = new \Delight\Auth\Auth($db);
$outp = "";
if (isset($postdata->rm)) {
  if ($postdata->rm == 1) {
    $callback = function ($selector, $token) {
      // $var = '{"sitems":[{"Selector":"'.htmlspecialchars($selector).'","Token":"'.htmlspecialchars($token).'"}]}';
      $url = 'http://localhost/opp_php/#/verify_email?selector=' . \urlencode($selector) . '&token=' . \urlencode($token);
      return $var;
    };
  } else {
    $callback = null;
  }
}

try {
    $auth->registerWithUniqueUsername($postdata->em, $postdata->ps, $postdata->un, $callback);
    echo $var;
   }
    catch (\Delight\Auth\InvalidEmailException $e) {
      $outp ='{"Error":"invalid email address"}';
    }
    catch (\Delight\Auth\InvalidPasswordException $e) {
      $outp ='{"Error":"invalid password"}';
    }
    catch (\Delight\Auth\UserAlreadyExistsException $e) {
      $outp ='{"Error":"email address already exists"}';
    }
    catch (\Delight\Auth\DuplicateUsernameException $e) {
      $outp ='{"Error":"username already exists"}';
    }

}

  // $outp ='{"sitems":['.$outp.']}';
  // echo ($outp);
?>
