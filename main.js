status = "";
objects = [];

function preload(){

}

function setup(){
    canvas = createCanvas("480, 380");
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Object Detecting";
    input_value = document.getElementById("text_input");
}

function draw(){
    image(video, 0, 0, 480, 380);
    if (status != ""){
        objectDetector.detect(video, gotResults);
        for(i=0; i<=objects.length; i++){
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            rect(objects[i].x,objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
    }
}