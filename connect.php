<?php
/**
 *  * Name:Yeshey Dema
 * Date:4 Dec 2020
 * this is a file to state the database connection account content
 *
 */
try {
    $dbh = new PDO(
        "mysql:host=sql113.epizy.com;dbname=epiz_31095500_000826521",//database name
        "epiz_31095500",//database login
        "GZ4E90pxNPWznZ1"
    );
} catch (Exception $e) {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}
