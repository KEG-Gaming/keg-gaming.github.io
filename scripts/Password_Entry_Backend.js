


function getPassword(){
    if(connected_flag){
        const pass = window.prompt("What's your KEG Controller Password?");
        if(pass!=null){
            sendMSG(pass);
        }
    }
    else{
        console.log("Connect to controller first");
        document.getElementById("on screen information").innerHTML = "Connect to controller first";
    }
}


