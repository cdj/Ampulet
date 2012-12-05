<?php
include 'dbConnection.php';

if (isset($_POST['EmailText']) && (strlen(trim($_POST['EmailText'])) > 0))
{
	if (filter_var($_POST['EmailText'], FILTER_VALIDATE_EMAIL))
	{
		$emailAddress = mysql_real_escape_string(strip_tags($_POST['EmailText']));
		
		$con = mysql_connect($dbServerName,$dbUserName,$dbUserPassword);
		if (!$con)
		{
			die('Could not connect: ' . mysql_error());
		}
		
		mysql_select_db($dbName, $con);
		
		$sql = "SELECT `EmailNum` FROM `Emails` WHERE  `EmailAddress` =  '".$emailAddress."'";
		$result = mysql_query($sql);
		$num_rows = mysql_num_rows($result);
		if ($num_rows > 0)
		{
			header('HTTP/1.1 400 Invailid email address');
			die('Invalid email');
		}
		
		$sql = "INSERT INTO `Emails` (`EmailAddress`) VALUES ('".$emailAddress."')";
		if (!mysql_query($sql,$con))
		{
			header('HTTP/1.1 500 Internal server error');
			die('Error: ' . mysql_error());
		}
		
		mysql_close($con);
	}
	else
	{
		header('HTTP/1.1 400 Invailid email address');
		die('Invalid email');
	}
}
else
{
	header('HTTP/1.1 400 No email provided');
	die('No email provided');
}
?>