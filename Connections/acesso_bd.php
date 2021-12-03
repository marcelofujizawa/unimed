<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
date_default_timezone_set('America/Sao_Paulo');

$hostname_sic = "localhost";
$database_sic = "unimed";
$username_sic = "root";
$password_sic = "";

$con = mysqli_connect($hostname_sic, $username_sic, $password_sic, $database_sic);

function dbconnect()
{
  $hostname_PrintSchedDataCn = 'localhost';
  $database_PrintSchedDataCn = 'unimed';
  $username_PrintSchedDataCn = 'root';
  $password_PrintSchedDataCn = '';
  $PrintSchedDataCn = mysqli_connect($hostname_PrintSchedDataCn, $username_PrintSchedDataCn, $password_PrintSchedDataCn, $database_PrintSchedDataCn) or trigger_error(mysqli_error(),E_USER_ERROR);
  return $PrintSchedDataCn;
}
/*
$hostname_sic2 = "localhost";
$database_sic2 = "holerite";
$username_sic2 = "root";
$password_sic2 = "";

$con2 = mysqli_connect($hostname_sic2, $username_sic2, $password_sic2, $database_sic2);*/
