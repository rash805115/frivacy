<?php
// check if POST contains data
if (empty($_POST))
	die("dead");
	
$time = time();
try {
	// include database codes
	require 'database.php';

	// convert to lower case and decode the input json into an array
	$userSettings = json_decode(strtolower($_POST['jsondata']), true);

	// read userFBId
	$userId = $userSettings['userfbid'];
	unset($userSettings['userfbid']);

	// dump the data
	$sth = $dbh->prepare('INSERT INTO dump(time, `data`) VALUES(:time, :data)');
	$sth->bindValue(':time', $time);
	$sth->bindValue(':data', $userSettings, PDO::PARAM_STR);	// *** Notice: array to string
	$sth->execute();
	$dumpRef = $dbh->lastInsertId();

	// *** record user *** should be moved to the index.php
	$sth = $dbh->prepare('INSERT IGNORE INTO user(id) Values(:userId)');
	$sth->bindValue(':userId', $userId);
	$sth->execute();
	
	// record transaction info
	$sth = $dbh->prepare('INSERT INTO transaction(time, userRef, typeRef, dumpRef) SELECT :time, :userRef, id, :dumpRef FROM transactionType WHERE name=:typeName');
	$sth->bindValue(':time', $time);
	$sth->bindValue(':userRef', $userId);
	$sth->bindValue(':typeName', 'userSettings');
	$sth->bindValue(':dumpRef', $dumpRef);
	$sth->execute();
	$transactionRef = $dbh->lastInsertId();

	foreach ($userSettings as $name => $value) {
		// strip html tags. There was a problem with hidden elemtns in the caption
		$name = strip_tags($name);
		// check if setting already exists and insert if not
		$sth = $dbh->prepare('SELECT id FROM setting WHERE label=:label');
		$sth->bindValue(':label', $name);
		$sth->execute();
		if ($sth->rowCount() > 0) {	// already exists
			$row = $sth->fetch();
			$settingRef = $row['id'];
		}
		else {						// insert a new setting
			$sth = $dbh->prepare('INSERT INTO setting(label) VALUES(:label)');
			$sth->bindValue(':label', $name);
			$sth->execute();
			$settingRef = $dbh->lastInsertId();
		}
		
		// Record user setting
		$sth = $dbh->prepare('INSERT INTO userSetting(transactionRef, settingRef, settingValue, settingValueId) VALUES(:transactionRef, :settingRef, :settingValue, :settingValueId)');
		$sth->bindParam(':transactionRef', $transactionRef);
		$sth->bindParam(':settingRef', $settingRef);
		$sth->bindParam(':settingValue', $settingValue);
		$sth->bindParam(':settingValueId', $settingValueId);
		if (strpos($value, 'custom') !== 0) {	// non-custom value
			$settingValue = $value;
			$settingValueId = NULL;
			$sth->execute();
		}
		else {									// custom value
			// sample value: "Custom;audience[8787375733][custom_value]:111;audience[8787375733][friends]:30;audience[8787375733][list_anon]:10150227122627328;audience[8787375733][list_x_anon]:10150215286147328;audience[8787375733][lists][0]:120479517327;audience[8787375733][ids_anon][0]:622983691;audience[8787375733][networks][0]:16777359;audience[8787375733][ids_x_anon][0]:504622067"
			$values = explode(';', $value);		// split the string
			unset($values[0]);
			foreach ($values as $v) {
				$v = substr($v, strpos($v, ']') + 1);		// remove first brackets (item id?)
				$settingValue = substr($v, strpos($v, '[') + 1, strpos($v, ']') - strpos($v, '[') - 1);
				$settingValueId = substr($v, strrpos($v, ':') + 1);
				$sth->execute();
			}
		}
	}
} catch (Exception $e) {
	$firephp->log('Exception: '. $e->getMessage());
	$firephp->log(json_decode(strtolower($_POST['jsondata']), true));
	
	debug('Exception: '. $e->getMessage());
	debug(json_decode(strtolower($_POST['jsondata']), true));
	// *** record recovery log on the server
}

// closing database connection
$dbh = null;
?>
