document.addEventListener('click', parseScreenClick, false);
// const canvas1 = document.getElementById("canvas");

var store_rect_interval;

function parseScreenClick(event){
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        var x = event.offsetX;
        var y = event.offsetY;
        // console.log("Clicked " + x + " " + y);
        if(analog_stick_flag && ctx.isPointInPath(analog_stick_bounding_rect, x, y)) {
            // Do Something with the click
            console.log("Clicked the analog stick");
            onAnalogStickClick();
        }
        if(c_stick_flag && ctx.isPointInPath(c_stick_bounding_rect, x, y)) {
            // Do Something with the click
            console.log("Clicked the c-stick");
            onCStickClick();
        }
        if(store_val_flag && ctx.isPointInPath(store_value_rect, x, y)){
            redo_last_store_flag = 1;
            storeValue();
        }
        if(redo_last_store_flag && ctx.isPointInPath(redo_last_rect, x, y)){
            redoStorageButtonClicked();
        }
        if(done_calib_flag && ctx.isPointInPath(done_calib_rect, x, y)){
            doneCalibration();
        }
        if(get_current_cal_flag && ctx.isPointInPath(get_current_cal_rect, x, y)){
            requestAnalogCalibration();
            console.log("request analog calibration values");
        }
        if(send_calib_flag && ctx.isPointInPath(send_calib_rect, x, y)){
            sendStickCalibration();
        }
        if(save_calib_flag && ctx.isPointInPath(save_calib_rect, x, y)){
            saveCalibValues();
        }
        if(finished_calib_flag && ctx.isPointInPath(finished_calib_rect, x, y)){
            finishedCalibration();
        }
    }
}

function onAnalogStickClick(){
    store_val_flag = 1;
    done_calib_flag = 1;
    storageCounter = 0;
}

function onCStickClick(){
    skipToCStick();
    store_val_flag = 1;
    done_calib_flag = 1;
}

