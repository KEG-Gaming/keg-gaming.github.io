var currentAX;
var currentAY;
var currentCX;
var currentCY;

var storageCounter = 0;

var AX_Cal_Vals = [0,0,0];
var AY_Cal_Vals = [0,0,0];
var CX_Cal_Vals = [0,0,0];
var CY_Cal_Vals = [0,0,0];

let numCalPoints = 3;

var storeValueButtonFlag = 0;




function requestAnalogReadings(){
    inter();
    var msg = "A";
    sendMSG(msg);

    BLE_Server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b")
    .then(service => {
        return service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");
    })
    .then(characteristic => {
        if (characteristic.properties.notify){
            characteristic.addEventListener("characteristicvaluechanged",handleNewAnalogData);
            characteristic.startNotifications();
            console.log("Analog Notifications enabled");
        }
        return 0;
    })
    .catch(error => { console.error(error); });
}

async function handleNewAnalogData(event){
    const value = event.target.value;
    var enc = new TextDecoder("utf-8");
    var AnalogValues = enc.decode(value).split(',');
    currentAX = parseInt(AnalogValues[0]);
    currentAY = parseInt(AnalogValues[1]);
    currentCX = parseInt(AnalogValues[2]);
    currentCY = parseInt(AnalogValues[3]);
    // console.log(currentAX);
    // console.log(currentAY);
    // console.log("");
}

function storeValue(){
    // console.log("store value button clicked");
    
    if(storageCounter < numCalPoints){
        AX_Cal_Vals[storageCounter] = currentAX;
    } else if(storageCounter < numCalPoints*2){
        AY_Cal_Vals[storageCounter-numCalPoints] = currentAY;
    } else if(storageCounter < numCalPoints*3){
        CX_Cal_Vals[storageCounter-numCalPoints*2] = currentCX;
    } else{
        CY_Cal_Vals[storageCounter-numCalPoints*3] = currentCY;
    }

    storageCounter = storageCounter +1;
    

    console.log("Storage counter = " + storageCounter);
    for(let i=0;i<numCalPoints;i++){
        console.log(AX_Cal_Vals[i])
    }
    console.log("");
    for(let i=0;i<numCalPoints;i++){
        console.log(AY_Cal_Vals[i])
    }
    console.log("");
    for(let i=0;i<numCalPoints;i++){
        console.log(CX_Cal_Vals[i])
    }
    console.log("");
    for(let i=0;i<numCalPoints;i++){
        console.log(CY_Cal_Vals[i])
    }
    console.log("");

    if(storageCounter >= numCalPoints*4+1){
        doneCalibration();
    }

}

function redoStorageButtonClicked(){
    if(storageCounter > 0){
        storageCounter = storageCounter-1;
    }
    console.log("Storage counter = " + storageCounter);
    if(storageCounter==0){
        redo_last_store_flag = 0;
    }
}

function skipToCStick(){
    storageCounter = 6;
}

function doneCalibration(){
    storageCounter = 0;
    store_val_flag = 0;
    done_calib_flag = 0;
    redo_last_store_flag = 0;
}



function checkAndRemoveChild(child){
    if(document.contains(child)){
        child.parentNode.removeChild(child);
    }
}

function sendStickCalibration(){
    if(AX_Cal_Vals[0]==0 && AX_Cal_Vals[1]==0 && AX_Cal_Vals[2]==0){
        console.log("Analog Stick X Callibration Unchanged");
    }
    if(AY_Cal_Vals[0]==0 && AY_Cal_Vals[1]==0 && AY_Cal_Vals[2]==0){
        console.log("Analog Stick Y Callibration Unchanged");
    }
    if(CX_Cal_Vals[0]==0 && CX_Cal_Vals[1]==0 && CX_Cal_Vals[2]==0){
        console.log("C-Stick X Callibration Unchanged");
    }
    if(CY_Cal_Vals[0]==0 && CY_Cal_Vals[1]==0 && CY_Cal_Vals[2]==0){
        console.log("C-Stick Y Callibration Unchanged");
    }
    var msg = "";
    // msg = msg + AX_Cal_Vals[0].toString() + "," + AX_Cal_Vals[1].toString() + "," + AX_Cal_Vals[2].toString() + ":";
    // msg = msg + AY_Cal_Vals[0].toString() + "," + AY_Cal_Vals[1].toString() + "," + AY_Cal_Vals[2].toString() + ":";
    // msg = msg + CX_Cal_Vals[0].toString() + "," + CX_Cal_Vals[1].toString() + "," + CX_Cal_Vals[2].toString() + ":";
    // msg = msg + CY_Cal_Vals[0].toString() + "," + CY_Cal_Vals[1].toString() + "," + CY_Cal_Vals[2].toString();

    msg = msg + String(AX_Cal_Vals[0]).padStart(4, '0') + "," + String(AX_Cal_Vals[1]).padStart(4, '0') + "," + String(AX_Cal_Vals[2]).padStart(4, '0') + ":";
    msg = msg + String(AY_Cal_Vals[0]).padStart(4, '0') + "," + String(AY_Cal_Vals[1]).padStart(4, '0') + "," + String(AY_Cal_Vals[2]).padStart(4, '0') + ":";
    msg = msg + String(CX_Cal_Vals[0]).padStart(4, '0') + "," + String(CX_Cal_Vals[1]).padStart(4, '0') + "," + String(CX_Cal_Vals[2]).padStart(4, '0') + ":";
    msg = msg + String(CY_Cal_Vals[0]).padStart(4, '0') + "," + String(CY_Cal_Vals[1]).padStart(4, '0') + "," + String(CY_Cal_Vals[2]).padStart(4, '0');

    sendMSG(msg);
}