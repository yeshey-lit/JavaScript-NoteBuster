<?php
/* * 
 *Name:Yeshey Dema
 * Date:4 Dec 2020
 * delete the note according to the id received
 */
session_start();
include "connect.php";
$enter = isset($_SESSION["email"]);
if (!$enter) {
    die("Error. Go back to <a href='login.html'>login</a>");
}

$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);
//match the note with same id stated and then delete the note
$command = "DELETE FROM note where id=?";
        $stmt = $dbh->prepare($command);
        $params=[$id];
        $success = $stmt->execute($params);
        echo 1;//indicator to tell addNote.js' function whetherLoadNote() above procedure is done