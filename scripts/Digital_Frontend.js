
var digiDrawInterval;

const A_Button_Path = new Path2D();
const B_Button_Path = new Path2D();
const S_Button_Path = new Path2D();

const DU_Button_Path = new Path2D();
const DR_Button_Path = new Path2D();
const DD_Button_Path = new Path2D();
const DL_Button_Path = new Path2D();
const DC_Button_Path = new Path2D();
const DUT_Path = new Path2D();
const DRT_Path = new Path2D();
const DDT_Path = new Path2D();
const DLT_Path = new Path2D();
const DCC_Path = new Path2D();

const L_Button_Path = new Path2D();
const R_Button_Path = new Path2D();

const X_Button_Path = new Path2D();
const Y_Button_Path = new Path2D();
const Z_Button_Path = new Path2D();

const Read_Mapping_Button_Path = new Path2D();
const Send_Mapping_Button_Path = new Path2D();
const Save_Mapping_Button_Path = new Path2D();
const Done_Mapping_Button_Path = new Path2D();

const Redo_Last_Button_Path = new Path2D();
const Reset_Default_Mapping_Path = new Path2D();

const ax0 = 435;
const ay0 = 350;
A_Button_Path.arc(ax0,ay0,40,0,Math.PI*2,true);

const bx0 = 370;
const by0 = 410;
B_Button_Path.arc(bx0,by0,20,0,Math.PI*2,true);

const sx0 = 280;
const sy0 = 350;
S_Button_Path.arc(sx0,sy0,10,0,Math.PI*2,true);

const dux0 = 120;
const duy0 = 410;
DU_Button_Path.rect(dux0,duy0,20,20);

const drx0 = dux0+20;
const dry0 = duy0+20;
DR_Button_Path.rect(drx0,dry0,20,20);

const ddx0 = dux0;
const ddy0 = duy0+40;
DD_Button_Path.rect(ddx0,ddy0,20,20);

const dlx0 = dux0-20;
const dly0 = duy0+20;
DL_Button_Path.rect(dlx0,dly0,20,20);

const dcx0 = dux0;
const dcy0 = duy0+20;
DC_Button_Path.rect(dcx0,dcy0,20,20);

DUT_Path.moveTo(dux0+2,duy0+15);
DUT_Path.lineTo(dux0+9,duy0);
DUT_Path.lineTo(dux0+17,duy0+15);

DRT_Path.moveTo(drx0+3,dry0+2);
DRT_Path.lineTo(drx0+18,dry0+9);
DRT_Path.lineTo(drx0+3,dry0+16);

DDT_Path.moveTo(ddx0+2,ddy0+2);
DDT_Path.lineTo(ddx0+9,ddy0+17);
DDT_Path.lineTo(ddx0+17,ddy0+2);

DLT_Path.moveTo(dlx0+17,dly0+2);
DLT_Path.lineTo(dlx0+2,dly0+9);
DLT_Path.lineTo(dlx0+17,dly0+16);

DCC_Path.arc(dcx0+10,dcy0+10,8,0,Math.PI*2,true);

const xx0 = 490;
const xy0 = 335;
X_Button_Path.moveTo(xx0,xy0);
X_Button_Path.arc(xx0+15,xy0,15,Math.PI,0,false);
X_Button_Path.lineTo(xx0+30,xy0+50);
X_Button_Path.arc(xx0+15,xy0+50,15,0,Math.PI,false);
X_Button_Path.lineTo(xx0,xy0);

const yx0 = 420;
const yy0 = 295;
Y_Button_Path.moveTo(yx0,yy0);
Y_Button_Path.arc(yx0,yy0-15,15,Math.PI/2,3*Math.PI/2,false);
Y_Button_Path.lineTo(yx0+50,yy0-30);
Y_Button_Path.arc(yx0+50,yy0-15,15,3*Math.PI/2,Math.PI/2,false);
Y_Button_Path.lineTo(yx0,yy0);

const zx0 = 435;
const zy0 = 220;
Z_Button_Path.roundRect(zx0,zy0,90,25,8);

const lx0 = 50;
const ly0 = 200;
L_Button_Path.moveTo(lx0,ly0);
L_Button_Path.lineTo(lx0,ly0-70);
L_Button_Path.arc(lx0+30,ly0-70,30,Math.PI,0,false);
L_Button_Path.lineTo(lx0+60,ly0);
L_Button_Path.lineTo(lx0,ly0);

const rx0 = 450;
const ry0 = 200;
R_Button_Path.moveTo(rx0,ry0);
R_Button_Path.lineTo(rx0,ry0-70);
R_Button_Path.arc(rx0+30,ry0-70,30,Math.PI,0,false);
R_Button_Path.lineTo(rx0+60,ry0);
R_Button_Path.lineTo(rx0,ry0);

const rmx0 = 10;
const rmy0 = 20;
Read_Mapping_Button_Path.rect(rmx0,rmy0,140,25);

const snmx0 = rmx0+150;
Send_Mapping_Button_Path.rect(snmx0,rmy0,140,25);

const svmx0 = snmx0+150;
Save_Mapping_Button_Path.rect(svmx0,rmy0,140,25);

const dmx0 = svmx0+150;
Done_Mapping_Button_Path.rect(dmx0,rmy0,140,25);

const rlbx0 = 200;
const rlby0 = 80;
Redo_Last_Button_Path.rect(rlbx0,rlby0,140,25);

const rdmx0 = 10;
const rdmy0 = 60;
Reset_Default_Mapping_Path.rect(rdmx0,rdmy0,140,25);

var A_Button_flag = 1;
var B_Button_flag = 1;
var S_Button_flag = 1;
var D_Button_flag = 1;
var X_Button_flag = 1;
var Y_Button_flag = 1;
var Z_Button_flag = 1;
var L_Button_flag = 1;
var R_Button_flag = 1;

var Read_Mapping_Button_Flag = 1;
var Send_Mapping_Button_Flag = 1;
var Save_Mapping_Button_Flag = 1;
var Done_Mapping_Button_Flag = 1;

var Redo_Last_Button_Flag = 0;
var Reset_Default_Mapping_Flag = 1;

function drawDigital(){
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.canvas.style.zIndex = "0";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Start Generate Gamecube Buttons
        if(A_Button_flag){
            ctx.strokeStyle = `rgb(68,213,208)`;
            ctx.fillStyle = `rgb(68,213,208)`;
            ctx.stroke(A_Button_Path);
            ctx.fill(A_Button_Path);
            ctx.strokeStyle = `rgb(53,179,175)`;
            ctx.fillStyle = `rgb(53,179,175)`;
            ctx.font = "45px sans-serif";
            ctx.fillText("A", ax0-15, ay0+15);
        }

        if(B_Button_flag){
            ctx.strokeStyle = `rgb(249,21,48)`;
            ctx.fillStyle = `rgb(249,21,48)`;
            ctx.stroke(B_Button_Path);
            ctx.fill(B_Button_Path);
            ctx.strokeStyle = `rgb(174,4,26)`;
            ctx.fillStyle = `rgb(174,4,26)`;
            ctx.font = "22px sans-serif";
            ctx.fillText("B", bx0-7, by0+8);
        }
        if(S_Button_flag){
            ctx.strokeStyle = `rgb(240,237,246)`;
            ctx.fillStyle = `rgb(240,237,246)`;
            ctx.stroke(S_Button_Path);
            ctx.fill(S_Button_Path);
            ctx.strokeStyle = `rgb(240,237,246)`;
            ctx.fillStyle = `rgb(240,237,246)`;
            ctx.font = "10px sans-serif";
            ctx.fillText("START/PAUSE", sx0-33, sy0-15);
        }

        if(D_Button_flag){
            ctx.strokeStyle = `rgb(240,237,246)`;
            ctx.fillStyle = `rgb(240,237,246)`;
            ctx.stroke(DU_Button_Path);
            ctx.fill(DU_Button_Path);
            ctx.stroke(DR_Button_Path);
            ctx.fill(DR_Button_Path);
            ctx.stroke(DD_Button_Path);
            ctx.fill(DD_Button_Path);
            ctx.stroke(DL_Button_Path);
            ctx.fill(DL_Button_Path);
            ctx.stroke(DC_Button_Path);
            ctx.fill(DC_Button_Path);

            ctx.fillStyle = `rgb(203,200,207)`;
            ctx.fill(DUT_Path);
            ctx.fill(DRT_Path);
            ctx.fill(DDT_Path);
            ctx.fill(DLT_Path);
            ctx.fill(DCC_Path);
        }

        if(X_Button_flag){
            ctx.strokeStyle = `rgb(240,237,246)`;
            ctx.fillStyle = `rgb(240,237,246)`;
            ctx.stroke(X_Button_Path);
            ctx.fill(X_Button_Path);
            ctx.fillStyle = `rgb(203,200,207)`;
            ctx.font = "20px sans-serif";
            ctx.fillText("X", xx0+8, xy0+32);
        }

        if(Y_Button_flag){
            ctx.strokeStyle = `rgb(240,237,246)`;
            ctx.fillStyle = `rgb(240,237,246)`;
            ctx.stroke(Y_Button_Path);
            ctx.fill(Y_Button_Path);
            ctx.fillStyle = `rgb(203,200,207)`;
            ctx.font = "20px sans-serif";
            ctx.fillText("Y", yx0+20, yy0-5);
        }

        if(Z_Button_flag){
            ctx.strokeStyle = `rgb(67,94,225)`;
            ctx.fillStyle = `rgb(67,94,225)`;
            ctx.stroke(Z_Button_Path);
            ctx.fill(Z_Button_Path);
            ctx.fillStyle = `rgb(33,64,207)`;
            ctx.font = "20px sans-serif";
            ctx.fillText("Z", zx0+40, zy0+20);
        }

        if(L_Button_flag){
            ctx.strokeStyle = `rgb(240,237,246)`;
            ctx.fillStyle = `rgb(240,237,246)`;
            ctx.stroke(L_Button_Path);
            ctx.fill(L_Button_Path);
            ctx.fillStyle = `rgb(203,200,207)`;
            ctx.font = "30px sans-serif";
            ctx.fillText("L", lx0+23, ly0-37);
        }
        if(R_Button_flag){
            ctx.strokeStyle = `rgb(240,237,246)`;
            ctx.fillStyle = `rgb(240,237,246)`;
            ctx.stroke(R_Button_Path);
            ctx.fill(R_Button_Path);
            ctx.fillStyle = `rgb(203,200,207)`;
            ctx.font = "30px sans-serif";
            ctx.fillText("R", rx0+18, ry0-37);
        }
        // End Generate Gamecube Buttons

        // Start Generate IO Buttons
        if(Read_Mapping_Button_Flag){
            drawButton(ctx,Read_Mapping_Button_Path);
            drawText(ctx,"Read Mapping", rmx0+5, rmy0+20);
        }
        if(Send_Mapping_Button_Flag){
            drawButton(ctx,Send_Mapping_Button_Path);
            drawText(ctx,"Send Mapping", snmx0+5, rmy0+20);
        }
        if(Save_Mapping_Button_Flag){
            drawButton(ctx,Save_Mapping_Button_Path);
            drawText(ctx,"Save Mapping", svmx0+5, rmy0+20);
        }
        if(Redo_Last_Button_Flag){
            drawButton(ctx,Redo_Last_Button_Path);
            drawText(ctx,"Redo Last", rlbx0, rlby0+20);
        }
        if(Reset_Default_Mapping_Flag){
            drawButton(ctx,Reset_Default_Mapping_Path);
            drawText(ctx,"Reset", rdmx0, rdmy0+20);
        }
        if(Done_Mapping_Button_Flag){
            drawButton(ctx,Done_Mapping_Button_Path);
            drawText(ctx,"Done Mapping", dmx0+5, rmy0+20);
        }
        else{
            clearInterval(digiDrawInterval);
        }

    }
}

function DigitalInter(){
    A_Button_flag = 1;
    B_Button_flag = 1;
    S_Button_flag = 1;
    D_Button_flag = 1;
    X_Button_flag = 1;
    Y_Button_flag = 1;
    Z_Button_flag = 1;
    L_Button_flag = 1;
    R_Button_flag = 1;

    Read_Mapping_Button_Flag = 1;
    Send_Mapping_Button_Flag = 1;
    Save_Mapping_Button_Flag = 1;
    Done_Mapping_Button_Flag = 1;
    Reset_Default_Mapping_Flag = 1;
    digiDrawInterval = setInterval(drawDigital, 10); // calls draw every 10 ms
}

