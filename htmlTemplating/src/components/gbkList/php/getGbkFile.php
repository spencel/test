<?php

$gbkDir = "../dat/gbk/";

$dataFromUser = $_REQUEST[ "data" ];

$fileName = $dataFromUser;

$filePath = $gbkDir . $fileName;

echo readfile( $filePath );

?>