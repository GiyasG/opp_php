<?php
// print_r ($_POST);
// str_replace("-dot-", ".", $_POST);
if ( $_POST ) {
    foreach ( $_POST as $key => $value ) {
        $key = str_replace("-dot-", ".", $key);
        $key = str_replace("-sqbl-", "[", $key);
        $postdata = json_decode($key);
    }

    // print_r($postdata->un);

require '../vendor/autoload.php';
$db = new \PDO('mysql:dbname=auth;host=127.0.0.1;charset=utf8mb4', 'authz', 'xP9tM715UK');
$auth = new \Delight\Auth\Auth($db);
$outp = "";
if (isset($postdata->rm)) {
  if ($postdata->rm == 1) {
    $em = $postdata->em;
    $un = $postdata->un;
    $callback = function ($selector, $token) use ($em, $un) {

       $sl = urlencode($selector);
       $tk = urlencode($token);
       $to = $em;
       $subject = "Confirmation for $un";
       $header = "Confirmation from";
       $message = "Please click the link below to verify and activate your account ";
       $message .= 'http://localhost/opp_php/#/verifyemail/'.$sl.'/'.$tk;
       $sentmail = mail($to,$subject,$message,$header);

       if($sentmail)
                {
       echo '{"sitems":[{"Info":"Your confirmation link has been sent to your e-mail address"}]}';
       }
       else
             {
       echo '{"sitems":[{"Info":"Your confirmation link has been sent to your e-mail address"}]}';
       }
     };
  } else {
    $callback = null;
  }
}

try {
    $auth->registerWithUniqueUsername($postdata->em, $postdata->ps, $postdata->un, $callback);
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

  // function myUrlEncode($string) {
  //     $entities = array('%21', '%2A', '%27', '%28', '%29', '%3B', '%3A', '%40', '%26', '%3D', '%2B', '%24', '%2C', '%2F', '%3F', '%25', '%23', '%5B', '%5D');
  //     $replacements = array('!', '*', "'", "(", ")", ";", ":", "@", "&", "=", "+", "$", ",", "/", "?", "%", "#", "[", "]");
  //     return str_replace($entities, $replacements, urlencode($string));
  // }

?>
