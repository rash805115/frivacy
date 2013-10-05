<?php
	// check if POST contains data
	if (!empty($_POST)) {
		echo "processing post";
		// name the file
		$file = 'collectedData.txt';
		// open the file
		$fp = fopen($file, 'a');
		
		// get the current server timestamp
		$currentTime = time();

		// write to the file
		fwrite($fp, $_POST["jsondata"]);

		// close the file
		fclose($fp);
	}
?>
