<?php
/**
 *Name:Yeshey Dema
 * Date:4 Dec 2020
 * 1. to retreive exisitng id and content by searching notes all under the email in session
 * 2. throw back the notes in [] to loadNotes() in addNote.js, where raise the request
 */
session_start();
include "connect.php";
$enter = isset($_SESSION["email"]);
if (!$enter) {
    die("Error. Go back to <a href='login.html'>login</a>");
}

//dig out all notes under email of the session
$command = "SELECT *  FROM note WHERE email=? ORDER BY id desc";
$stmt = $dbh->prepare($command);
    $params = [$_SESSION["email"]];
    $success = $stmt->execute($params);

//pack them and send it to loadNotes() in addNote.js, where raise the request
$noteList = [];
while ($row = $stmt->fetch()) {
    $user = [
        "id" => $row["id"],
        "content" => $row["content"],
    ];
    array_push($noteList, $user);
}


echo json_encode($noteList);

?>