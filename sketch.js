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
    brain = new NeuralNetwork(3,3,2);
    pickcolor()
}

function colorPredictor(r,g,b){

    // Normalize the data for first layer
    let inputs = [r/255 , g/225 , b /255];  
    let outputs = brain.predict(inputs);
    console.log(outputs);

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

    pickcolor()
}


//manual color picking is tiresome 


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