<?php

$gbkDir = "../dat/gbk";

if ( $handle = opendir( $gbkDir ) ) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != "..") {
            echo "$entry\n";
        }
    }
    closedir($handle);
}

?>