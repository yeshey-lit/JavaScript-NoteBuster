<?php

/**
 * *Name:Yeshey Dema
 * Date:4 Dec 2020
 * it process 
 * 1.filter the incoming msg
 * 2.validate if there is any matching email in db before insert credentials to db
 * 3.writing a greeting message with username, so getusername() first fetch a request to getUsername.php, a php that retreive
 * username from database, and then getusername pass the username to success to do simple amendment on greeting msg and print it out
 */

include "connect.php";
$nameInput = filter_input(INPUT_POST, "name", FILTER_SANITIZE_STRING);
$emailInput = filter_input(INPUT_POST, "email", FILTER_SANITIZE_STRING);
$passwordInput = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

if (//make sure variable contain valid informations
    $nameInput !== null && $emailInput !== null && $passwordInput !== null &&
    $nameInput !== "" && $emailInput !== "" && $passwordInput !== ""
) {//make sure email are not used before on registration
    $command = $command = "SELECT * FROM user where email=?";
    $stmt = $dbh->prepare($command);
    $params = [$emailInput];
    $success = $stmt->execute($params);
    //if the email is not found in db, it return 0 row of match result, then we can insert details
    if ($stmt->rowCount() === 0) {
        $hash = password_hash($passwordInput, PASSWORD_DEFAULT);//password proceed a one way encryption before upload to db
        $command = "INSERT INTO user (name, email,password)
        VALUES (?,?,?);";
        $stmt = $dbh->prepare($command);
        $params = [$nameInput, $emailInput, $hash];//send encrypted pw, username and email to db
        $success = $stmt->execute($params);
        echo 1;//if echo launch, it means above procedure is done,msg can be found in js.js line 27
    }else {
        echo 2;
    }
}else{
    echo 3;
}
