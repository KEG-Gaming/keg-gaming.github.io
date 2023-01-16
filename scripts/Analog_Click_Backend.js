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
        if(ctx.isPointInPath(analog_stick_bounding_rect, x, y)) {
            // Do Something with the click
            console.log("Clicked the analog stick");
            onAnalogStickClick();
        }
        if(ctx.isPointInPath(c_stick_bounding_rect, x, y)) {
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

