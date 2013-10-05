<?php
session_start();

require "database.php";

$sth = $dbh->prepare("update user set consented=1 where id='{$_SESSION['uid']}'");
$sth->execute();

echo "success";

?>
