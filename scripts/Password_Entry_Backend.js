


function getPassword(){
    if(connected_flag){
        if(password_correct || reset_password){
            console.log("password correct = " + password_correct);
            console.log("reset password = " + reset_password);
            changePassword();
        }
        else{
            const pass = window.prompt("What's your KEG Controller Password?\nPlease Hold X+Y while you submit your password");
            if(pass!=null){
                sendMSG(pass);
                setTimeout(() => {
                    sendMSG("Standby");
                  }, 1000);
            }
        }
    }
    else{
        console.log("Connect to controller first");
        document.getElementById("on screen information").innerHTML = "Connect to controller first";
    }
}


function changePassword(){
    if(connected_flag){
        if(password_correct || reset_password){
            const newPass = window.prompt("What would you like your password to be?\nPlease keep it between 5 and 15 Characters if possible.");
            if(newPass!=null){
                if(newPass.length <= 15 && newPass.length >= 5){
                    sendMSG("P" + newPass);
                    document.getElementById("on screen information").innerHTML = "Sending new password";
                    reset_password = 0;
                }
                else{
                    document.getElementById("on screen information").innerHTML = "Outside [5,15] character range, kindly try again";
                }
            }
        }
    }
    else{
        console.log("Connect to controller first");
        document.getElementById("on screen information").innerHTML = "Connect to controller first";
    }
}


