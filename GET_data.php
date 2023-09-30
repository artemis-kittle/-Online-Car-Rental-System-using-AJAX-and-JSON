<?php
if(isset ( $_POST['email'])){
    $email=$_POST['email'];
    $date=$_POST['date'];
    $amount=$_POST['amount'];

    $conx=mysqli_connect("localhost","root","qwerty123","utshertz");

    $sql="INSERT INTO Renting_History (user_email, rent_date, bond_amount) VALUES ('$email', '$date', $amount);"    
}