<?php
// print_r($_POST['item']);

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
        move_uploaded_file($file_tmp,"../img/".$currentDate.$file_name);
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
?>
