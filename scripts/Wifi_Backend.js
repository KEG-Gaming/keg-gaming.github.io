var listening_for_wifi_confirm = 0;
var WIFI_CH;
var hosted_page = "";


function enableWifiUpload(){
    if(password_correct){
        const SSID = window.prompt("What's Your WiFi Network Name?");
        const WiFiPass = window.prompt("What's Your WiFi Network Password?");
        if(SSID!=null && WiFiPass!=null){
            const msg = "W/" + SSID + "/" + WiFiPass;
            setupListenWifiEstablish();
            sendMSG(msg);
            setTimeout(() => {
                sendMSG("Standby");
              }, 1000);
        }
    }
    else{
        console.log("Enter Password First");
        document.getElementById("on screen information").innerHTML = "Enter Password First";
    }
}

function setupListenWifiEstablish(){
    BLE_Server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b")
    .then(service => {
        return service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");
    })
    .then(characteristic => {
        if (characteristic.properties.notify){
            WIFI_CH = characteristic;
            characteristic.addEventListener("characteristicvaluechanged",handleNewWifiData);
            characteristic.startNotifications();
            console.log("Wifi Setup Notifications enabled");
        }
        return 0;
    })
    .catch(error => { console.error(error); });
}

function handleNewWifiData(event){
    const value = event.target.value;
    var enc = new TextDecoder("utf-8");
    var reading = enc.decode(value);
    var split_reading = reading.split(".");
    
    if(split_reading.length == 4){
        console.log("Wifi Server Hosted At " + reading);
        hosted_page = reading;
        document.getElementById("on screen information").innerHTML = "Wifi Server Hosted At " + reading;
        WIFI_CH.stopNotifications();
        WIFI_CH.removeEventListener("characteristicvaluechanged",handleNewPassMSG);
    }
    else{
        console.log(reading);
        document.getElementById("on screen information").innerHTML = reading;
    }
}

function redirectPage(){
    if(hosted_page != ""){
        window.open("http://"+hosted_page, '_blank').focus();
    }
}