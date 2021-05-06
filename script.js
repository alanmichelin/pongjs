var container = document.getElementById("#container")
var cont = document.querySelector(".cont")
var bar1 = document.getElementById("#bar1")
var bar2 = document.getElementById("#bar2")
var ball = document.getElementById("#ball")
var button = document.getElementById("#start")
var p1score=0
var p2score=0
var playerhit = new sound('playerhit.mp3')
var point = new sound('point.mp3')
var collision= new sound('collision.mp3')
var player1Score=document.getElementById("#player2")
var player2Score= document.getElementById("#player1")
var modal = document.getElementById("myModal")
var playerName




player1Score.style.zIndex='-5'
player2Score.style.zIndex='-5'


let parameterX = -5
let parameterY = -5
let changeDirection= false;
button.addEventListener('click',(e)=>{
    playerName = document.getElementById("#name").value
    modal.style.display = "none";
    startGame()
    player1Score.innerHTML= playerName+ ":"
})
const startGame =()=>{

        setInterval(ballMove,10)
        setInterval(iaMove,15)


}


window.addEventListener('keydown',(e)=>{
    if(e.key=='s'){
        moveDown(e)
    }
    else if(e.key=='w'){
        moveUp(e)
    }
     
          
})
const canMoveDown = (bar) =>{
    return bar.getBoundingClientRect().bottom<=container.getBoundingClientRect().bottom
}

const canMoveUp = (bar) =>{
    return bar.getBoundingClientRect().top>=container.getBoundingClientRect().top
}
function moveDown(e){
    if(canMoveDown(bar1)){
    bar1.style.marginTop= bar1.offsetTop + 10 +'px'

    }
}
function moveUp(e){
    if(canMoveUp(bar1)){
    bar1.style.marginTop= -10+ bar1.offsetTop+'px'
    }
}
const touchXborder = () =>{
    return ball.getBoundingClientRect().bottom>=container.getBoundingClientRect().bottom || ball.getBoundingClientRect().top<=container.getBoundingClientRect().top
}
const touchYborder = () =>{
    if(ball.getBoundingClientRect().left<=container.getBoundingClientRect().left){
        p1score+=1
        player2Score.innerHTML= 'CPU:' + p1score

        point.play()

    }
    else if( ball.getBoundingClientRect().right>=container.getBoundingClientRect().right){
        p2score+=1
        
            player1Score.innerHTML= playerName+ ":" + p2score
        

        
        point.play()
    }
    return ball.getBoundingClientRect().left<=container.getBoundingClientRect().left || ball.getBoundingClientRect().right>=container.getBoundingClientRect().right
}
const touchBar1 = ()=>{
    return ball.getBoundingClientRect().left<=bar1.getBoundingClientRect().right && bar1.getBoundingClientRect().top<=ball.getBoundingClientRect().y && bar1.getBoundingClientRect().bottom>=ball.getBoundingClientRect().y
}

const touchBar2 =()=>{
    return ball.getBoundingClientRect().right>=bar2.getBoundingClientRect().left && bar2.getBoundingClientRect().top<=ball.getBoundingClientRect().y && bar2.getBoundingClientRect().bottom>=ball.getBoundingClientRect().y
}






function ballMove(){
    var directionX= parameterX
    var directionY= parameterY

    let rect = cont.getBoundingClientRect();
    let x = ball.getBoundingClientRect().x - rect.left;
    let y = ball.getBoundingClientRect().y - rect.top;
    cont.style.setProperty('--x', x + 'px');
    cont.style.setProperty('--y', y + 'px');





    if(touchXborder() && !changeDirection){
        collision.play()
        changeDirection=true

        parameterY=-parameterY
    }
    else if(!touchXborder() && !touchBar1() && !touchBar2() && changeDirection){
        changeDirection=false
    }
    else if((touchBar1()|| touchBar2()) && !changeDirection){
        changeDirection=true
 
        playerhit.play()
        parameterX=-parameterX
    }

    if(touchYborder()){
        ball.style.marginTop= 25+'%'
        ball.style.marginLeft= 50+'%'
    }

    ball.style.marginTop= ball.offsetTop + directionY +'px'
    ball.style.marginLeft= ball.offsetLeft + directionX +'px'
        

}

function iaMove(){

    if(bar2.getBoundingClientRect().top<=ball.getBoundingClientRect().y && bar2.getBoundingClientRect().bottom<=ball.getBoundingClientRect().y){
        if(canMoveDown(bar2)){
            bar2.style.marginTop= bar2.offsetTop + 5 +'px'
            }
    }
    else if(bar2.getBoundingClientRect().top>=ball.getBoundingClientRect().y && bar2.getBoundingClientRect().bottom>=ball.getBoundingClientRect().y){
        if(canMoveUp(bar2)){
            bar2.style.marginTop= -5 + bar2.offsetTop +'px'
            }
    }

    
}

function sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = 0.5;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }

}