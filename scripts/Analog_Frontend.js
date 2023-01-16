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

store_value_rect.rect(10,50,120,25);
redo_last_rect.rect(150,50,120,25);
done_calib_rect.rect(290,50,120,25);

var store_val_flag = 0;
var done_calib_flag = 0;
var redo_last_store_flag = 0;

function draw() {
    
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.style.zIndex = "0";

        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the old drawings from the screen so can animate the sticks etc...
  
        // making the analog stick gates
        var R = 60;
        var oX = 100;
        var oY = 200;

        ctx.lineWidth = 13;
        ctx.strokeStyle = `rgb(255,255,255)`;

        drawOctogon(ctx,R,oX,oY);
        pop_analog_stick_bound_rect(R,oX,oY);

        // making analog stick circle
        ctx.lineWidth = 5;
        ctx.beginPath();
        analog_stick_X = oX+R+R*analog_stick_cal_X_shifts[storageCounter];
        analog_stick_Y = oY+R*analog_stick_cal_Y_shifts[storageCounter];
        ctx.arc(analog_stick_X, analog_stick_Y, R-15, 0, Math.PI * 2, true); // Outer circle
        ctx.stroke();


        // making the c-stick gates
        var R = 50;
        var oX = 400;
        var oY = 250;

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


        // other buttons like store, redo, done, etc...
        if(store_val_flag){
            ctx.fillStyle = `rgb(192,192,192)`
            ctx.strokeStyle = `rgb(0,0,0)`;
            ctx.stroke(store_value_rect);
            ctx.fill(store_value_rect);
            ctx.fillStyle = `rgb(0,0,0)`
            ctx.font = "20px sans-serif";
            if(storageCounter == numCalPoints*4){
                ctx.fillText("Done", 50,69 )
            }
            else{
                ctx.fillText("Store Value", 19,69 )
            }
            
        }
        if(done_calib_flag){
            ctx.fillStyle = `rgb(192,192,192)`
            ctx.strokeStyle = `rgb(0,0,0)`;
            ctx.stroke(done_calib_rect);
            ctx.fill(done_calib_rect);
            ctx.fillStyle = `rgb(0,0,0)`
            ctx.font = "20px sans-serif";
            ctx.fillText("Exit", 335, 69)
        }
        if(redo_last_store_flag){
            ctx.fillStyle = `rgb(192,192,192)`
            ctx.strokeStyle = `rgb(0,0,0)`;
            ctx.stroke(redo_last_rect);
            ctx.fill(redo_last_rect);
            ctx.fillStyle = `rgb(0,0,0)`
            ctx.font = "20px sans-serif";
            ctx.fillText("Redo", 190, 69)
        }
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
    drawInterval = setInterval(draw, 10); // calls draw every 10 ms
}

