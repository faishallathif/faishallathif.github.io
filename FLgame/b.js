const btnKiri=document.getElementById("kiri");
const btnKanan=document.getElementById("kanan");
const a=document.getElementById("a");
const b=document.getElementById("b");
let score=0;
setInterval(function(){
    var bLeft= parseInt( getComputedStyle(b).getPropertyValue("left"));
    var bTop= parseInt( getComputedStyle(b).getPropertyValue("top"));
    var aLeft= parseInt( getComputedStyle(a).getPropertyValue("left"));
    if(aLeft==bLeft&&bTop>300&&bTop<400){
        alert("game over\nScore : "+score );
        score=0;
    }
}),1;

b.addEventListener("animationiteration",function(){
    var random=Math.floor( Math.random()*3);
    let Left=random*100;
    b.style.left=Left+"px";
    score++;
});
var l=0;
var u=0;
function turnLeft(){
    l-=100;
    if(l>=0){
        a.style.left=l+"px";
    }
    console.log("left : "+l);
}
function turnRight(){
    l+=100;
    if(l<300){
        a.style.left=l+"px";
    }
    console.log("Right : "+l);
}
function jump(){
    a.classList.add("jump");
    setTimeout(function(){
        a.classList.remove("jump");
    },500)
}
document.body.addEventListener('keydown',myFunction);
function myFunction(el){
 
        switch(el.key){
            case "Enter":
                alert("enter");
                break;
            case "ArrowLeft":
                turnLeft();
                break;
        
            case "ArrowRight":
                turnRight();
                break;
          
        }
}