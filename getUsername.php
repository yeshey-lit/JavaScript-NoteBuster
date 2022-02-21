<?php
/**
 *Name:Yeshey Dema
 * Date:4 Dec 2020
 * 1. after receive request from js.js, use SQL command to inquire the db for username
 * 2. send username after json encode
 */

include "connect.php";


// Prepare and execute the DB query
$command = "SELECT *  FROM user ORDER BY lastLoginTIme desc LIMIT 1";
$stmt = $dbh->prepare($command);
$success = $stmt->execute();

// Fill an array with User objects based on the results.
$userlist = [];
while ($row = $stmt->fetch()) {
    $user = [
        "name" => $row["name"]
    ];
    array_push($userlist, $user);
}

// Write the json encoded array to the HTTP Response
echo json_encode($userlist);
