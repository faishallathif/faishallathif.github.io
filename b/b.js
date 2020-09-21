const btnKiri=document.getElementById("kiri");
const btnKanan=document.getElementById("kanan");
const a=document.getElementById("a");
// const p=document.createElement("p");
// document.body.appendChild(p);
// var countSpace=0;
// p.innerHTML=countSpace;
var l=0;
var u=0;
// btnKiri.addEventListener('click',turnLeft());
// btnKanan.addEventListener('click',turnRight());
function turnLeft(){
    l-=10;
    a.style.left=l+"px";
    console.log("left : "+l);
}
function turnRight(){
    l+=10;
    a.style.left=l+"px";
    console.log("Right : "+l);
}
function down(){
    u-=10;
    a.style.bottom=u+"px";
    console.log("Bottom : "+u);
}
function up(){
    u+=10;
    a.style.bottom=u+"px";
    console.log("Top : "+u);
}   

function jump(){
    a.classList.add("jump");
    setTimeout(function(){
        a.classList.remove("jump");
    },500)
}
document.body.addEventListener('keydown',myFunction);
function myFunction(el){
    console.log(el);
    console.log(el.key);
    switch(el.key){
        case "Enter":
            alert("enter");
            break;
        case "ArrowLeft":
            turnLeft();
            break;
        case "ArrowDown":
            down();
            break;
        case "ArrowRight":
            turnRight();
            break;
        case "ArrowUp":
            up();
            // jump()
            break;
        // case " ":
        //     const bullet=document.createElement("div");
        //     bullet.setAttribute("class", "bullet");
        //     const jmlBullet=document.getElementsByClassName("bullet");
        //     const game=document.getElementById("game");
        //     game.appendChild(bullet)
        //     p.innerHTML=jmlBullet.length;
        //     setTimeout(function(){
        //         bullet.remove();
        //     },1000);      
        //     break;
    }
    if(l==580 && u==(-350)){
        alert("Finish");    
    }
}
