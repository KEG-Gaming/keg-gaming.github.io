const analog_stick_cal_X_shifts = [0,-1/2,1/2,0,0,0,0,0,0,0,0,0,0];
const analog_stick_cal_Y_shifts = [0,0,0,0,1/2,-1/2,0,0,0,0,0,0,0];

const c_stick_cal_X_shifts = [0,0,0,0,0,0,0,-1/2,1/2,0,0,0,0];
const c_stick_cal_Y_shifts = [0,0,0,0,0,0,0,0,0,0,1/2,-1/2,0];

var analog_stick_X;
var analog_stick_Y;

var c_stick_X;
var c_stick_Y;

// document.body.style.backgroundColor = "#495096";
document.body.style.backgroundImage = "linear-gradient(to right, " + "#343A70" + ", " + "#646CB7" + ")";

const Analog_Instructions = [
    "Click on the stick you would like to calibrate",
    "Place your controlers stick to the position shown",
    "then hit the Store Value button",
    "Repeat until finished, if you make a mistake",
    "simply hit Redo"
];

var drawInterval;

var analog_stick_bounding_rect = new Path2D();
var c_stick_bounding_rect = new Path2D();

const store_value_rect = new Path2D();
const redo_last_rect = new Path2D();
const done_calib_rect = new Path2D();
const get_current_cal_rect = new Path2D();
const send_calib_rect = new Path2D();
const save_calib_rect = new Path2D();
const finished_calib_rect = new Path2D();
const deadzones_rect = new Path2D();
const send_deadzones_rect = new Path2D();
const save_deadzones_rect = new Path2D();

const button_w = 160;
const button_h = 65;

store_value_rect.rect(5,200,button_w,button_h);
redo_last_rect.rect(180,200,button_w,button_h);
done_calib_rect.rect(355,200,button_w,button_h);

get_current_cal_rect.rect(5,30,button_w,button_h);
send_calib_rect.rect(180,30,button_w,button_h);
save_calib_rect.rect(355,30,button_w,button_h);
finished_calib_rect.rect(530,30,button_w,button_h);
deadzones_rect.rect(10,75,button_w,button_h);
send_deadzones_rect.rect(150,75,button_w,button_h);
save_deadzones_rect.rect(290,75,button_w,button_h);


var analog_stick_flag = 0;
var c_stick_flag = 0;

var store_val_flag = 0;
var done_calib_flag = 0;
var redo_last_store_flag = 0;
var get_current_cal_flag = 0;
var send_calib_flag = 0;
var save_calib_flag = 0;
var finished_calib_flag = 0;
var deadzones_flag = 0;

var display_msg = "Message";

function draw() {
    
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.style.zIndex = "0";

        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the old drawings from the screen so can animate the sticks etc...
  
        if(analog_stick_flag){
            // making the analog stick gates
            var R = 60;
            var oX = 100;
            var oY = 400;

            ctx.lineWidth = 13;
            ctx.strokeStyle = `rgb(255,255,255)`;
            if(storageCounter >= 6 && store_val_flag){
                ctx.strokeStyle = `rgb(255,255,255,0.5)`;
            }
            

            drawOctogon(ctx,R,oX,oY);
            pop_analog_stick_bound_rect(R,oX,oY);

            if(store_val_flag){
                // making analog stick circle
                ctx.lineWidth = 5;
                ctx.beginPath();
                analog_stick_X = oX+R+R*analog_stick_cal_X_shifts[storageCounter];
                analog_stick_Y = oY+R*analog_stick_cal_Y_shifts[storageCounter];
                ctx.arc(analog_stick_X, analog_stick_Y, R-15, 0, Math.PI * 2, true); // Outer circle
                ctx.stroke();
                drawReadingText(ctx,"X = " + currentAX.toString(),oX+R-25,oY+R+40);
                drawReadingText(ctx,"Y = " + currentAY.toString(),oX+R-25,oY+R+70);
            }
            else{
                ctx.lineWidth = 5;
                ctx.beginPath();
                analog_stick_X = oX+R+R*(-1/2+mapStickVals(Curr_AX_Cal_Vals[0], Curr_AX_Cal_Vals[1],Curr_AX_Cal_Vals[2], currentAX,AnalogStickXDeadzone)/255);
                analog_stick_Y = oY+R*(1/2-mapStickVals(Curr_AY_Cal_Vals[0], Curr_AY_Cal_Vals[1],Curr_AY_Cal_Vals[2], currentAY,AnalogStickYDeadzone)/255);
                ctx.arc(analog_stick_X, analog_stick_Y, R-15, 0, Math.PI * 2, true); // Outer circle
                ctx.stroke();
                drawReadingText(ctx,"X = " + Math.round(mapStickVals(Curr_AX_Cal_Vals[0], Curr_AX_Cal_Vals[1],Curr_AX_Cal_Vals[2], currentAX,AnalogStickXDeadzone)).toString(),oX+R-25,oY+R+40);
                drawReadingText(ctx,"Y = " + Math.round(mapStickVals(Curr_AY_Cal_Vals[0], Curr_AY_Cal_Vals[1],Curr_AY_Cal_Vals[2], currentAY,AnalogStickYDeadzone)).toString(),oX+R-25,oY+R+70);
            }
        }

        if(c_stick_flag){
            // making the c-stick gates
            var R = 50;
            var oX = 400;
            var oY = 410;

            ctx.lineWidth = 13;
            ctx.strokeStyle = `rgb(250,245,6)`;
            if(storageCounter < 6 && store_val_flag){
                ctx.strokeStyle = `rgb(250,245,6,0.5)`;
            }

            drawOctogon(ctx,R,oX,oY);
            pop_c_stick_bound_rect(R,oX,oY);

            if(store_val_flag){
                // making c-stick circle
                ctx.lineWidth = 5;
                ctx.beginPath();
                c_stick_X = oX+R+R*c_stick_cal_X_shifts[storageCounter];
                c_stick_Y = oY+R*c_stick_cal_Y_shifts[storageCounter];
                ctx.arc(c_stick_X, c_stick_Y, R-20, 0, Math.PI * 2, true); // Outer circle
                ctx.stroke();
                drawReadingText(ctx,"X = " + currentCX.toString(),oX+R-25,oY+R+40);
                drawReadingText(ctx,"Y = " + currentCY.toString(),oX+R-25,oY+R+70);
            }
            else{
                ctx.lineWidth = 5;
                ctx.beginPath();
                c_stick_X = oX+R+R*(-1/2+mapStickVals(Curr_CX_Cal_Vals[0], Curr_CX_Cal_Vals[1],Curr_CX_Cal_Vals[2], currentCX, CStickXDeadzone)/255);
                c_stick_Y = oY+R*(1/2-mapStickVals(Curr_CY_Cal_Vals[0], Curr_CY_Cal_Vals[1],Curr_CY_Cal_Vals[2], currentCY, CStickYDeadzone)/255);
                ctx.arc(c_stick_X, c_stick_Y, R-20, 0, Math.PI * 2, true); // Outer circle
                ctx.stroke();
                drawReadingText(ctx,"X = " + Math.round(mapStickVals(Curr_CX_Cal_Vals[0], Curr_CX_Cal_Vals[1],Curr_CX_Cal_Vals[2], currentCX, CStickXDeadzone)).toString(),oX+R-25,oY+R+40);
                drawReadingText(ctx,"Y = " + Math.round(mapStickVals(Curr_CY_Cal_Vals[0], Curr_CY_Cal_Vals[1],Curr_CY_Cal_Vals[2], currentCY, CStickYDeadzone)).toString(),oX+R-25,oY+R+70);
            }
        }

        // other buttons like store, redo, done, etc...
        if(store_val_flag){
            drawButton(ctx,store_value_rect);
            if(storageCounter == numCalPoints*4){
                drawText(ctx,"Done",50,239);
            }
            else{
                drawText(ctx,"Store Value", 10, 239);
                // drawText(ctx,"Store", 50, 225);
                // drawText(ctx,"Value", 50, 255);
            }
            if(storageCounter == 0 || storageCounter == 6){
                drawText(ctx,Analog_Instructions[1], 10, 140); // some instructions
                drawText(ctx,Analog_Instructions[2], 10, 170); // some instructions
            }
            else{
                drawText(ctx,Analog_Instructions[3], 10, 140); // some instructions
                drawText(ctx,Analog_Instructions[4], 10, 170); // some instructions
            }
        }
        else{
            if(send_calib_flag){
                drawText(ctx,Analog_Instructions[0], 10, 150); // Some instructions
            }
        }
        if(done_calib_flag){
            drawButton(ctx,done_calib_rect);

            drawText(ctx,"Exit", 400, 239);
        }
        if(redo_last_store_flag){
            drawButton(ctx,redo_last_rect);
            drawText(ctx,"Redo",225,239);
        }
        if(get_current_cal_flag == 1){
            drawButton(ctx,get_current_cal_rect);
            drawText(ctx,"Read",50,55);
            drawText(ctx,"Calibration",15,85);
        }
        if(get_current_cal_flag == 2){
            drawButton(ctx,get_current_cal_rect);
            drawText(ctx,"Read",50,55);
            drawText(ctx,"Analog",40,85);
        }
        if(send_calib_flag){
            drawButton(ctx,send_calib_rect);
            drawText(ctx,"Send",225,55);
            drawText(ctx,"Calibration",190,85);
        }
        if(save_calib_flag){
            drawButton(ctx,save_calib_rect);
            drawText(ctx,"Save",402,55);
            drawText(ctx,"Calibration",365,85);
        }
        if(deadzones_flag){
            drawButton(ctx,deadzones_rect);
            drawText(ctx,"Deadzones",13,94);
            drawButton(ctx,send_deadzones_rect);
            drawText(ctx,"Send Dead",153,94);
            drawButton(ctx,save_deadzones_rect);
            drawText(ctx,"Save Dead",293,94);
        }
        if(finished_calib_flag){
            drawButton(ctx,finished_calib_rect);
            drawText(ctx,"Finished",555,70);
        }
        else{
            clearInterval(drawInterval);
        }
        // drawText(ctx,display_msg,30,20);
    }
  }



// draws a filled octagon on canvas ctx, with "Radius" R, leftmost vertex at (oX,oY)
function drawOctogon(ctx,R,oX,oY){
    ctx.beginPath();
    ctx.moveTo(oX, oY);
    ctx.lineTo(oX+R-(Math.cos(Math.PI/4)*R),oY-(Math.sin(Math.PI/4)*R));
    ctx.lineTo(oX+R, oY-R);
    ctx.lineTo(oX+R+(Math.cos(Math.PI/4)*R),oY-(Math.sin(Math.PI/4)*R));
    ctx.lineTo(oX+2*R, oY);
    ctx.lineTo(oX+R+(Math.cos(Math.PI/4)*R),oY+(Math.sin(Math.PI/4)*R));
    ctx.lineTo(oX+R, oY+R);
    ctx.lineTo(oX+R-(Math.cos(Math.PI/4)*R),oY+(Math.sin(Math.PI/4)*R));
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function pop_analog_stick_bound_rect(R,oX,oY){
    analog_stick_bounding_rect.moveTo(oX,oY+R);
    analog_stick_bounding_rect.lineTo(oX,oY-R);
    analog_stick_bounding_rect.lineTo(oX+2*R,oY-R);
    analog_stick_bounding_rect.lineTo(oX+2*R,oY+R);
    analog_stick_bounding_rect.closePath();
}

function pop_c_stick_bound_rect(R,oX,oY){
    c_stick_bounding_rect.moveTo(oX,oY+R);
    c_stick_bounding_rect.lineTo(oX,oY-R);
    c_stick_bounding_rect.lineTo(oX+2*R,oY-R);
    c_stick_bounding_rect.lineTo(oX+2*R,oY+R);
    c_stick_bounding_rect.closePath();
}

function inter(){
    analog_stick_flag = 1;
    c_stick_flag = 1;
    get_current_cal_flag = 1;
    send_calib_flag = 1;
    save_calib_flag = 1;
    // deadzones_flag = 1; // ADD THIS BACK IF YOU WANT DEADZONE CALIBRATION
    finished_calib_flag = 1;
    drawInterval = setInterval(draw, 10); // calls draw every 10 ms
}

function drawButton(ctx,rect){
    ctx.fillStyle = `rgb(192,192,192)`
    ctx.strokeStyle = `rgb(0,0,0)`;
    ctx.stroke(rect);
    ctx.fill(rect);
}

function drawText(ctx,text,x,y){
    ctx.fillStyle = `rgb(0,0,0)`;
    ctx.font = "30px sans-serif";
    ctx.fillText(text, x, y)
}

function drawReadingText(ctx,text,x,y){
    ctx.fillStyle = `rgb(0,0,0)`;
    ctx.font = "20px sans-serif";
    ctx.fillText(text, x, y)
}

function mapStickVals(neutch, low, high, val, dead){
    var mapped = -1;
    var lowS;
    var highS;
    var highSGood = 0; // for checking division by 0
    var lowSGood = 0; // for checking division by 0

    // make the slopes
    if((high-neutch)!=0){
      highS = 127.0/(high-neutch);
      highSGood = 1;
    }
    if((neutch-low)!=0){
      lowS = 127.0/(neutch-low);
      lowSGood = 1;
    }

    // map the value onto the line
    if(val <= neutch && lowSGood == 1){
        mapped = Math.round(lowS*val-lowS*neutch+127.0);
    }
    if(val > neutch && highSGood == 1){
        mapped = Math.round(highS*val-highS*neutch+127.0);
    }

    // display_msg = mapped.toString();

    // check if the mapped value exceeds the bounds
    if(mapped<0){
        return 0;
    }
    if(mapped > 255){
        return 255;
    }

    if(mapped >= dead.low && mapped <= dead.high){
        mapped = dead.value;
    }

    return mapped;
}
