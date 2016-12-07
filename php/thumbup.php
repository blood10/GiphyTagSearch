
<?php
$connection = mysqli_connect('mysql.cba.pl', 'uczelnia22290', 'haslo10', 'uczelnia22290_cba_pl');


if(isset($_POST['id'])) 
    {  
    $id=$_POST['id'];
    $query = mysqli_query($connection,"UPDATE thumbs SET thumbup = thumbup + 1 WHERE id='$id'");

    mysqli_close($connection);
    }

?>