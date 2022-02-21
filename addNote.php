<?php
/**
 *  * Name:Yeshey Dema
 * Date:4 Dec 2020
 * user is bought from login.js, after verified they are user.
 * this is a platform to manage your notes. below shows a html interface for user.
 * php part of the code open session and verify the session validity
 */
session_start();
include "connect.php";
$enter = isset($_SESSION["email"]);
if (!$enter) {
    die("Error. Go back to <a href='login.html'>login</a>");//this will appear in addNote.php when fail
}
?><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Session Management</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="addNote.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="css1.css">
</head>

<body>
    <form >
        <p>welcome <b> <?php echo $_SESSION["email"] ?></b></p>
        <a href="logout.php">logout</a><br>
        <span id="newNote"> 
            <br><label>Note:</label>
        <br><textarea id='note'> </textarea> <br>  
        <input type='button' value='save' id='save'> </input>
        <input type='button' style="display: none;" value='update' id='update'> </input>
        </span>
    </form>
    <br>
    <span id="dispalyNote">
        
    </span>
</body>

</html>