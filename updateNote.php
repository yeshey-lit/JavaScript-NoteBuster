<?php
/**
 * *Name:Yeshey Dema
 * Date:4 Dec 2020
 * session verification
 * and then find the matching note to update
 */
session_start();
include "connect.php";
$enter = isset($_SESSION["email"]);
if (!$enter) {
    die("Error. Go back to <a href='login.html'>login</a>");
}

$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);
$content = filter_input(INPUT_POST, "content", FILTER_SANITIZE_STRING);
//match the id, then system know which to update
$command = "UPDATE note SET content=?  where id=?";
        $stmt = $dbh->prepare($command);
        $params=[$content,$id];
        $success = $stmt->execute($params);
        echo 1;//indicator to tell addNote.js' function whetherLoadNote() above procedure is done