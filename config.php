<?php

$baseurl = "https://shades.sh20raj.com/";
// $baseurl = ""; // for local testing only, remove the slash at the end if using a domain

function get_data($url) { 
    global $ch; 
    curl_setopt ($ch, CURLOPT_URL,$url);    
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true); 
    $output = curl_exec ($ch);  
    return $output;  
}  

$ch = curl_init();


get_data($baseurl);