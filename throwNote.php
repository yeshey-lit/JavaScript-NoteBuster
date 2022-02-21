<?php
/**
 * *Name:Yeshey Dema
 * Date:4 Dec 2020
 * php part verify the session is correct, then start.
 * this page receive message from addNote.js, line 78, a fetch function active after save button pressed,
 * then we throw newly created note to db, and reply 
 */
session_start();
include "connect.php";
$enter = isset($_SESSION["email"]);
if (!$enter) {
    die("Error. Go back to <a href='login.html'>login</a>");//this will appear in addNote.php when fail
}

$message = filter_input(INPUT_POST, "message", FILTER_SANITIZE_STRING);
//find the matching email and open new row for content of newly created note 
$command = "INSERT INTO note (email,content)
        VALUES (?,?);";
        $stmt = $dbh->prepare($command);
        $params=[$_SESSION["email"],$message];
        $success = $stmt->execute($params);
        echo 1;//indicator to tell addNote.js' function whetherLoadNote() above procedure is done
?>