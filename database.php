<?php
try {
    $dbh = new PDO('mysql:host=lersais.exp.sis.pitt.edu;dbname=frivacy', 'appFrivacy', 'Wt2EeHrCn1Vy2M7vDvd5');
//    $dbh = new PDO('mysql:host=localhost;dbname=frivacy', 'root', 'seclab1');
//    $dbh = new PDO('mysql:host=lersais.exp.sis.pitt.edu;dbname=frivacy', 'amirreza', '?`kZsm4me!');

	$dbh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	print 'Error!: ' . $e->getMessage();
	die();
}
?>
