<?php 
 error_reporting(E_ALL);
 ini_set('display_errors', 1);
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: *");
 header("Access-Control-Allow-Methods: *");

 header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

 header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Authorization");
 
 
 
 $db_conn = mysqli_connect("sql204.infinityfree.com","if0_37012824", "A0mCl9h0ne", "if0_37012824_form");
    if(!$db_conn){
        die("Error: Could not connect".mysqli_connect_error());
    }
 $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case "GET":
            $allUsers = mysqli_query($db_conn, "SELECT * FROM create_account");
            if(mysqli_num_rows($allUsers) > 0){
                
                while($row = mysqli_fetch_array($allUsers)) {
                   $json_array["userdata"][] = array("id" => $row["id"], "username" => $row["username"], "email" => $row["email"],  "password" => $row["password"]);
                }
                echo json_encode($json_array["userdata"]);
                return;
            } else{
                echo json_encode(["result" => "Please check the data"]);
            }
            break;


        case "POST" : 
            
            $userPostData = json_decode(file_get_contents("php://input"));
            $username = $userPostData->username;
            $email = $userPostData->email;
            $password = $userPostData->password;
            $result = mysqli_query($db_conn, "INSERT INTO create_account (username,email,password) VALUES( '$username','$email', '$password')");

                  
         if($result){
           echo json_encode(["success"=>"Sucessfully Added!"]);
           return;
         }
         else{
            echo json_encode(["error"=>"Please Check the data"]);
            return;
         }
         break;

  
        
    }
 ?>