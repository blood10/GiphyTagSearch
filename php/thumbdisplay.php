<?php
  $connection = mysqli_connect('mysql.cba.pl', 'uczelnia22290', 'haslo10', 'uczelnia22290_cba_pl');
  
if(isset($_POST['id'])) 
    {  
    $id=$_POST['id'];
    $query = mysqli_query($connection,"SELECT thumbup,thumbdown FROM `thumbs` WHERE id='$id'");
    if ($query)
    {
        $query = mysqli_query($connection,"INSERT INTO thumbs(id,thumbup,thumbdown) VALUES ('$id',0,0)");   
    }
    $emparray = array();
    $out = mysqli_query($connection,"SELECT * FROM `thumbs` WHERE id='$id'");
    while($row =mysqli_fetch_assoc($out))
    {
        $emparray[] = $row;
    }
    echo json_encode($emparray);
    }

mysqli_close($connection);
?>