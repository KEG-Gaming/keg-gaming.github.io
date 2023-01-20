var BLE_Server;
var currently_sending;
var PASSWORD_CH;
var password_correct = 0;

function isWebBluetoothEnabled() {
    // this is what generates the BLE pop up searching window
    navigator.bluetooth.requestDevice({
        filters: [{
            namePrefix: 'KEG'
        }],
        optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"]
    })

    .then(device => {
        return device.gatt.connect();
    })
    .then(server => {
        BLE_Server = server;
        console.log("Connected");
        return server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
    })
    .then(service => {
        return service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");
    })
    .then(characteristic => {
        if (characteristic.properties.notify){
            PASSWORD_CH = characteristic;
            characteristic.addEventListener("characteristicvaluechanged",handleNewPassMSG);
            characteristic.startNotifications();
            console.log("listening for incoming data");
        }
        return 0;
    })
    .then(server => { /* … */ })
    .catch(error => { console.error(error); });
}


function sendMSG(msg){
    console.log("Sending : " + msg);
    currently_sending = msg;
    BLE_Server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b")
    .then(service => {
        return service.getCharacteristic("da1e7d98-916b-11ed-a1eb-0242ac120002");
    })
    .then(characteristic => {
        var enc = new TextEncoder();
        characteristic.writeValue(enc.encode(msg));
    })
    .catch(error => { console.error(error); });
}


async function handleNewPassMSG(event){
    const value = event.target.value;
    var enc = new TextDecoder("utf-8");
    var reading = enc.decode(value);
    if(reading == "Password Correct"){
        console.log("Password Correct");
        PASSWORD_CH.stopNotifications();
        PASSWORD_CH.removeEventListener("characteristicvaluechanged",handleNewPassMSG);
        password_correct = 1;
    }
    else{
        console.log(reading);
    }
}
