var BLE_Server;

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
    .then(server => { /* … */ })
    .catch(error => { console.error(error); });
}


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