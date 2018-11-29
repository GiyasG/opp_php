<?php
// print_r($_POST['item']);
if (isset($_POST['item'])) {
  $items = $_POST['item'];
  // print_r($items);
}
if(isset($_FILES['file'])){
    $errors= array();
    $file_name = $_FILES['file']['name'];
    $file_size =$_FILES['file']['size'];
    $file_tmp =$_FILES['file']['tmp_name'];
    $file_type=$_FILES['file']['type'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $extensions = array("jpeg","jpg","png","pdf");
    if(in_array($file_ext,$extensions )=== false){
         $errors[]="File extension not allowed, please choose a JPEG or PNG file.";
    }
    if($file_size > 1097152){
        $errors[]='File size cannot exceed 1 MB';
    }
    if(file_exists('../img/'.$file_name)) {
      $errors[]='File '.$file_name.' already exists';
    }
    if(empty($errors)==true){
        $currentDate = date('ymdhms');
        $newFileName = $currentDate.$file_name;
        move_uploaded_file($file_tmp,"../img/".$newFileName);
        toDbase($items, $newFileName);
        echo 'File uploaded successfully';
    }else{
        print_r($errors[0]);
    }
}
else{
    $errors= array();
    $errors[]="No image found";
    print_r($errors[0]);
}

function toDbase($items, $newFileName) {
  include('class/mysql_crud.php');
  $db = new Database();
  $db->connect();
  $db->setName('SET NAMES \'utf8\'');

  $db->insert('stock',array('sname'=>$items['sname'],
            'sdescription'=>$items['sdescription'],
            'simage'=>$newFileName, 'sprice'=>$items['sprice'],
            's39_all'=>$items['sizes']['i39']['all'], 's39_reserved'=>'0', 's39_forsale'=>'0', 's39_sold'=>'0',
            's40_all'=>$items['sizes']['i40']['all'], 's40_reserved'=>'0', 's40_forsale'=>'0', 's40_sold'=>'0',
            's41_all'=>$items['sizes']['i41']['all'], 's41_reserved'=>'0', 's41_forsale'=>'0', 's41_sold'=>'0',
            's42_all'=>$items['sizes']['i42']['all'], 's42_reserved'=>'0', 's42_forsale'=>'0', 's42_sold'=>'0',
            's43_all'=>$items['sizes']['i43']['all'], 's43_reserved'=>'0', 's43_forsale'=>'0', 's43_sold'=>'0',
            's44_all'=>$items['sizes']['i44']['all'], 's44_reserved'=>'0', 's44_forsale'=>'0', 's44_sold'=>'0',
            's45_all'=>$items['sizes']['i45']['all'], 's45_reserved'=>'0', 's45_forsale'=>'0', 's45_sold'=>0));
  // Table name, column names and respective values
  // echo $db->getSql();
  $res = $db->getResult();
  // print_r($res);
  if (!$res)
  {
  die('Cant connect: ' . mysql_error());
  }
  else {
    // $my_file = '../img/'.$newFileName;
    // $handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file); //implicitly creates file
    //     if ($handle) {
    //     file_put_contents($my_file, file_get_contents($_FILES["userImage"]["tmp_name"]));
    //     echo 'Uploaded';
    //    } else {
        echo 'Uploaded';
       // }
      }
$db->disconnect();
}


?>
