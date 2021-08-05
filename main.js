song = "";
left_wrist_x = 0;
left_wrist_y =0;
right_wrist_x =0;
right_wrist_y =0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600,500)
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);



}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("left wrist x = "+left_wrist_x + "left wrist y = "+left_wrist_y);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("right wrist x = "+right_wrist_x + "right wrist y = "+right_wrist_y);
    }
}



function modelLoaded(){
    console.log("model is loaded");

}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    circle(left_wrist_x,left_wrist_y,20);

    in_number = Number(left_wrist_y);
    remove_decimal = floor(in_number);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = volume;
    song.setVolume(volume);

    

   
}

function start(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


   
