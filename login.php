<?php

/**
 * A demonstration of:
 * 1.filter the incoming msg
 * 2.validate if there is any matching email and pw in db, if match, throw back message to login.js
 * 3.assign email to session
 * *Name:Yeshey Dema
 * Date:4 Dec 2020
 */

include "connect.php";

$email = filter_input(INPUT_POST, "email");
$password = filter_input(INPUT_POST, "password");

// Session Estable
session_start();
/**
 * make sure variables are not blank or invalid
 */
if (
    $email !== null && $password !== null &&
    $email !== "" && $password !== ""
) {
    $command = "SELECT password FROM user WHERE email=? ";
    //first see any match email in db
    $stmt = $dbh->prepare($command);
    $params = [$email];
    $success = $stmt->execute($params);
    $isLoginSucess = false;
    //if email match, next we match encrypted password by using password_verify(typed password,db password)
    if ($success) {
        $row = $stmt->fetch();
        if ($row != "" && $row != "no row returned") {
            $hash2 = $row["password"];

            if (password_verify($password, $hash2)) {
                $isLoginSucess = true;
                $_SESSION["email"] = $email;//after verification succss, assign email to the session
            }
        }
    }

    echo $isLoginSucess;//provide indicator to show login successful
}
