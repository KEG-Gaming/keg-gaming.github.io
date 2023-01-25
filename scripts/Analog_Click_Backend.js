document.addEventListener('click', parseScreenClick, false);
document.addEventListener('touchstart', parseScreenClick, false);
// const canvas1 = document.getElementById("canvas");

var store_rect_interval;

function parseScreenClick(event){
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        var x = event.offsetX;
        var y = event.offsetY;
        // console.log("Clicked " + x + " " + y);

        // Start Analog Screen Click Parsing
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
        if(deadzones_flag && ctx.isPointInPath(deadzones_rect, x, y)){
            editDeadzones();
            // console.log("deadzone tuning selected");
        }
        if(deadzones_flag && ctx.isPointInPath(send_deadzones_rect, x, y)){
            sendStickDeadzones();
        }
        if(deadzones_flag && ctx.isPointInPath(save_deadzones_rect, x, y)){
            saveStickDeadzones();
        }
        if(finished_calib_flag && ctx.isPointInPath(finished_calib_rect, x, y)){
            finishedCalibration();
        }
        // End Analog Screen Click Parsing

        //Start Digital Screen Click Parsing
        if(A_Button_flag && ctx.isPointInPath(A_Button_Path,x,y)){
            console.log("Clicked A Button");
            onGCSimButtonClicked("A");
        }
        if(B_Button_flag && ctx.isPointInPath(B_Button_Path,x,y)){
            console.log("Clicked B Button");
            onGCSimButtonClicked("B");
        }
        if(S_Button_flag && ctx.isPointInPath(S_Button_Path,x,y)){
            console.log("Clicked Start Button");
            onGCSimButtonClicked("S");
        }
        if(D_Button_flag && ctx.isPointInPath(DU_Button_Path,x,y)){
            console.log("Clicked D-Pad Up Button");
            onGCSimButtonClicked("u");
        }
        if(D_Button_flag && ctx.isPointInPath(DR_Button_Path,x,y)){
            console.log("Clicked D-Pad Rigth Button");
            onGCSimButtonClicked("r");
        }
        if(D_Button_flag && ctx.isPointInPath(DD_Button_Path,x,y)){
            console.log("Clicked D-Pad Down Button");
            onGCSimButtonClicked("d");
        }
        if(D_Button_flag && ctx.isPointInPath(DL_Button_Path,x,y)){
            console.log("Clicked D-Pad Left Button");
            onGCSimButtonClicked("l");
        }
        if(X_Button_flag && ctx.isPointInPath(X_Button_Path,x,y)){
            console.log("Clicked X Button");
            onGCSimButtonClicked("X");
        }
        if(Y_Button_flag && ctx.isPointInPath(Y_Button_Path,x,y)){
            console.log("Clicked Y Button");
            onGCSimButtonClicked("Y");
        }
        if(Z_Button_flag && ctx.isPointInPath(Z_Button_Path,x,y)){
            console.log("Clicked Z Button");
            onGCSimButtonClicked("Z");
        }
        if(L_Button_flag && ctx.isPointInPath(L_Button_Path,x,y)){
            console.log("Clicked L Button");
            onGCSimButtonClicked("L");
        }
        if(R_Button_flag && ctx.isPointInPath(R_Button_Path,x,y)){
            console.log("Clicked R Button");
            onGCSimButtonClicked("R");
        }
        if(Read_Mapping_Button_Flag && ctx.isPointInPath(Read_Mapping_Button_Path,x,y)){
            console.log("Read Mapping Button Clicked");
            requestButtonMapping();
        }
        if(Send_Mapping_Button_Flag && ctx.isPointInPath(Send_Mapping_Button_Path,x,y)){
            console.log("Send Mapping Button Clicked");
            sendButtonMapping();
        }
        if(Save_Mapping_Button_Flag && ctx.isPointInPath(Save_Mapping_Button_Path,x,y)){
            saveButtonMapping();
            console.log("Save Mapping Button Clicked");
        }
        if(Redo_Last_Button_Flag && ctx.isPointInPath(Redo_Last_Button_Path,x,y)){
            console.log("Redo Last Button clicked");
            redoLastButtonClick();
        }
        if(Reset_Default_Mapping_Flag && ctx.isPointInPath(Reset_Default_Mapping_Path,x,y)){
            console.log("Reset Mapping Button clicked");
            setDefaultMapping();
        }
        if(Done_Mapping_Button_Flag && ctx.isPointInPath(Done_Mapping_Button_Path,x,y)){
            finishedDigitalSettings();
            console.log("Done Mapping Button Clicked");
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

function onGCSimButtonClicked(tag){
    switch (num_clicked){
        case 0:
            first_clicked = tag;
            num_clicked++;
            break;
        case 1:
            second_clicked = tag;
            num_clicked = 0;
            twoClicked();
            break;
    }
    Redo_Last_Button_Flag = num_clicked;
}