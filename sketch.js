let r, g ,b ;
let brain;
//let which ;

function pickcolor(){
    r=random(255) ; 
    g=random(255) ; 
    b=random(255) ;
}

 function setup(){
    createCanvas(600,300);
    // noLoop();
    brain = new NeuralNetwork(3,3,2);
    automateTraining() ; 

    pickcolor()
}

function colorPredictor(r,g,b){
    //  console.log(r+g+b)
    let inputs = [r/255 , g/225 , b /255];      // Normalize the data for first layer to make it between 0 to 1 
    let outputs = brain.predict(inputs);  // this predicts the the output  from input (r,g,b)
    // console.log(outputs);

    if(outputs[0] > outputs[1]){
        return "black"
    }else{
        return "white"
    }

    //  #This was just a simple algorithm
    // if(r+g+b > 200 ){
    //     return "black"
    // }else{
    //     return "white"
    // }
}

function mousePressed(){
    // manualTraing()
    pickcolor()
}


//Lets automate the training 
function automateTraining(){
    for(let i = 0 ; i<100000 ; i++){
        let ro = random(255) //this r , g , b values are diff from the one set globally
        let go = random(255)
        let bo = random(255)
        let targets = trainColor(ro,go,bo);
        let inputs = [ro/255 , go/255 , bo/255];
        brain.train(inputs , targets);
    }
}

//Using the same r+g+b < 200 algorithm as training algorithm 
function trainColor(r,g,b){
    if(r+g+b > 350 ){
        return [1,0]   //black
    }else{
        return [0,1]   // white
    }
}

//manual color picking is tiresome 
function manualTraing(){
     // We click on the black or white side of choice 
    // here we are doing a supervised learning
    let targets ;
    if(mouseX > width/2){
        targets = [0 , 1];
    }else{
        targets = [1 , 0 ];
    }
    let inputs = [r/255 , g/255 , b/255];
    brain.train(inputs,targets)   //tain this inputs with this targets

}


function draw(){
    background(r,g,b);

    strokeWeight(4);
    stroke(0);
    line(width/2 ,0, width/2 , height);

    textSize(64);
    noStroke();
    fill(0);
    textAlign(CENTER , CENTER);
    text('black' , 150 , 150);
    fill(255);
    text('white' , 400,  150);

    let which = colorPredictor(r,g,b);
    if(which === 'black'){
        fill(0)
        ellipse(150,220,60);
    }else{
        fill(255);
        ellipse(400,220,60);
    }
}