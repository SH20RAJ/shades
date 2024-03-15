<?php
// GitHub Repo Details
$githubUser = 'host-static';
$repoName = 'css';
$branch = 'main'; // Or any other branch
$accessToken = 'ghp_e1L0c3Of28zyGr-ctoCVS763y2Quub32e1b4e'; // Generate this in your GitHub account
$accessToken =  str_replace("-","",$accessToken);;
// CDN Base URL
$cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/';

// File Upload Handling
if (isset($_POST["submit"])) {
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // Check file size (if needed)
    // if ($_FILES["fileToUpload"]["size"] > 500000) {
    //     echo "Sorry, your file is too large.";
    //     $uploadOk = 0;
    // }

    // Allow certain file formats
    // if($imageFileType != "css") {
    //     echo "Sorry, only CSS files are allowed.";
    //     $uploadOk = 0;
    // }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";

            // Upload to GitHub
            $fileContent = file_get_contents($target_file);
            $commitMessage = 'Uploaded new file via API';
            $content = base64_encode($fileContent);

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://api.github.com/repos/{$githubUser}/{$repoName}/contents/{$target_file}");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
                'message' => $commitMessage,
                'content' => $content,
                'branch' => $branch
            ]));
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_USERAGENT, 'PHP Script');
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: token ' . $accessToken,
                'Content-Type: application/json',
                'Accept: application/vnd.github.v3+json'
            ]);

            $result = curl_exec($ch);
            curl_close($ch);

            $responseData = json_decode($result, true);

            if (isset($responseData['content']['html_url'])) {
                // Construct CDN URL
                $cdnUrl = $cdnBaseUrl . $githubUser . '/' . $repoName . '@' . $responseData['content']['sha'] . '/' . $target_file;
                echo "<br>CDN URL: <a href='{$cdnUrl}'>{$cdnUrl}</a>";
            } else {
                echo "<br>Error uploading to GitHub.";
            }
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
?>
