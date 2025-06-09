<?php
// Helper functions for JSON file operations

function read_json_file($filename) {
    if (!file_exists($filename)) {
        file_put_contents($filename, json_encode([]));
    }
    $json = file_get_contents($filename);
    return json_decode($json, true);
}

function write_json_file($filename, $data) {
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    file_put_contents($filename, $json, LOCK_EX);
}
?>
