const analog_stick_cal_X_shifts = [0,-1/2,1/2,0,0,0,0,0,0,0,0,0,0];
const analog_stick_cal_Y_shifts = [0,0,0,0,1/2,-1/2,0,0,0,0,0,0,0];

const c_stick_cal_X_shifts = [0,0,0,0,0,0,0,-1/2,1/2,0,0,0,0];
const c_stick_cal_Y_shifts = [0,0,0,0,0,0,0,0,0,0,1/2,-1/2,0];

var analog_stick_X;
var analog_stick_Y;

var c_stick_X;
var c_stick_Y;

document.body.style.backgroundColor = "#495096";

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

store_value_rect.rect(10,90,120,25);
redo_last_rect.rect(150,90,120,25);
done_calib_rect.rect(290,90,120,25);
get_current_cal_rect.rect(10,30,160,25);
send_calib_rect.rect(200,30,160,25);
save_calib_rect.rect(390,30,160,25);
finished_calib_rect.rect(580,30,160,25);

var analog_stick_flag = 0;
var c_stick_flag = 0;

var store_val_flag = 0;
var done_calib_flag = 0;
var redo_last_store_flag = 0;
var get_current_cal_flag = 0;
var send_calib_flag = 0;
var save_calib_flag = 0;
var finished_calib_flag = 0;

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
            var oY = 270;

            ctx.lineWidth = 13;
            ctx.strokeStyle = `rgb(255,255,255)`;

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
            }
            else{
                ctx.lineWidth = 5;
                ctx.beginPath();
                analog_stick_X = oX+R+R*(-1/2+mapStickVals(Curr_AX_Cal_Vals[0], Curr_AX_Cal_Vals[1],Curr_AX_Cal_Vals[2], currentAX)/255);
                analog_stick_Y = oY+R*(1/2-mapStickVals(Curr_AY_Cal_Vals[0], Curr_AY_Cal_Vals[1],Curr_AY_Cal_Vals[2], currentAY)/255);
                ctx.arc(analog_stick_X, analog_stick_Y, R-15, 0, Math.PI * 2, true); // Outer circle
                ctx.stroke();
            }
        }

        if(c_stick_flag){
            // making the c-stick gates
            var R = 50;
            var oX = 400;
            var oY = 320;

            ctx.lineWidth = 13;
            ctx.strokeStyle = `rgb(250,245,6)`;

            drawOctogon(ctx,R,oX,oY);
            pop_c_stick_bound_rect(R,oX,oY);

            // making c-stick circle
            ctx.lineWidth = 5;
            ctx.beginPath();
            c_stick_X = oX+R+R*c_stick_cal_X_shifts[storageCounter];
            c_stick_Y = oY+R*c_stick_cal_Y_shifts[storageCounter];
            ctx.arc(c_stick_X, c_stick_Y, R-20, 0, Math.PI * 2, true); // Outer circle
            ctx.stroke();
        }

        // other buttons like store, redo, done, etc...
        if(store_val_flag){
            drawButton(ctx,store_value_rect);
            if(storageCounter == numCalPoints*4){
                drawText(ctx,"Done",50,109);
            }
            else{
                drawText(ctx,"Store Value", 19, 109);
            }
            
        }
        if(done_calib_flag){
            drawButton(ctx,done_calib_rect);
            drawText(ctx,"Exit", 335, 109);
        }
        if(redo_last_store_flag){
            drawButton(ctx,redo_last_rect);
            drawText(ctx,"Redo",190,109);
        }
        if(get_current_cal_flag){
            drawButton(ctx,get_current_cal_rect);
            drawText(ctx,"Read Calibration",13,49);
        }
        if(send_calib_flag){
            drawButton(ctx,send_calib_rect);
            drawText(ctx,"Send Calibration",203,49);
        }
        if(save_calib_flag){
            drawButton(ctx,save_calib_rect);
            drawText(ctx,"Save Calibration",393,49);
        }
        if(finished_calib_flag){
            drawButton(ctx,finished_calib_rect);
            drawText(ctx,"Finished",625,49);
        }
        drawText(ctx,display_msg,30,20);
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
    ctx.font = "20px sans-serif";
    ctx.fillText(text, x, y)
}

function mapStickVals(neutch, low, high, val){
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

    display_msg = mapped.toString();

    // check if the mapped value exceeds the bounds
    if(mapped<0){
        return 0;
    }
    if(mapped > 255){
        return 255;
    }
    return mapped;
}
