<?php

$dataFromUser = $_REQUEST[ "data" ];

$fileName = $dataFromUser;

$filePath = "../dat/gbk/" . $fileName;

echo readfile( $filePath );

?>