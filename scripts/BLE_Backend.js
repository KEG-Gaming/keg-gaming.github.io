var BLE_Server;

function isWebBluetoothEnabled() {
    // document.getElementById("demo").innerHTML = "Yes";

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
    .then(server => { /* … */ })
    .catch(error => { console.error(error); });
}

// async function handleCharacteristicValueChanged(event) {
//     const value = event.target.value;
//     var enc = new TextDecoder("utf-8");
//     console.log(enc.decode(value));
// }

// function receiveMSG(){
//     BLE_Server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b")
//     .then(service => {
//         return service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");
//     })
//     .then(characteristic => {
//         if (characteristic.properties.notify){
//             var enc = new TextDecoder("utf-8");
//             console.log("Notifications enabled");
//             characteristic.addEventListener("characteristicvaluechanged",handleCharacteristicValueChanged);
//             characteristic.startNotifications();
//         }
//     })
//     .catch(error => { console.error(error); });
// }

// sends the string message msg over BLE to the connected device over the specified topic
function sendMSG(msg){
    console.log("Sending : " + msg);
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