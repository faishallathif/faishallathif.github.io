const satu = document.querySelector('.satu');
const dua = document.querySelector('.dua');
const tiga= document.querySelector('.tiga');
const empat = document.querySelector('.empat');
const kanan = document.querySelector('.container');
const lorem1=document.getElementById('w-satu');
const lorem2=document.getElementById('w-dua');
const lorem3=document.getElementById('w-tiga');
const lorem4=document.getElementById('w-empat');
const control2=document.querySelector('.control2');
const slider=document.querySelectorAll('.control2 input');
const r=document.getElementById('wc2-red');
const g=document.getElementById('wc2-green');
const b=document.getElementById('wc2-blue');
const a=document.getElementById('wc2-t');
const warnaBackground=document.getElementById("warnaBackground");

warnaBackground.innerHTML='rgba('+ r.value +','+ g.value +','+ b.value + ','+ a.value +')';

lorem1.addEventListener('change',function(){
    satu.style.backgroundColor=lorem1.value;
});
lorem2.addEventListener('change',function(){
    dua.style.backgroundColor=lorem2.value;
});lorem3.addEventListener('change',function(){
    tiga.style.backgroundColor=lorem3.value;
});lorem4.addEventListener('change',function(){
    empat.style.backgroundColor=lorem4.value;
});


const tombol = document.getElementById("tombolAcak");
tombol.addEventListener('click',function(){
    const r=Math.round(Math.random()*255+1);
    const g=Math.round(Math.random()*255+1);
    const b=Math.round(Math.random()*255+1);
    const a=(Math.random()).toFixed(1);
    console.log(kanan.style.backgroundColor='rgba('+ r +','+ g +','+ b + ','+ a +')');
    warnaBackground.innerHTML='rgba('+ r +','+ g +','+ b + ','+ a +')';
});
// function gantiWarnaHuruf(){
//         r.addEventListener('input', function(){
//             console.log(kanan.style.color='rgba('+ r.value +','+ g.value +','+ b.value + ','+ a.value +')');
//         });
//         g.addEventListener('input', function(){
//             console.log(kanan.style.color='rgba('+ r.value +','+ g.value +','+ b.value + ','+ a.value +')');
//         });
//         b.addEventListener('input', function(){
//             console.log(kanan.style.color='rgba('+ r.value +','+ g.value +','+ b.value + ','+ a.value +')');
//         });
//         a.addEventListener('input', function(){
//             console.log(kanan.style.color='rgba('+ r.value +','+ g.value +','+ b.value + ','+ a.value +')');
//         });   
// }
// function gantiWarnaBackground(){
//     r.addEventListener('input', function(){
//         console.log(kanan.style.backgroundColor='rgba('+ r.value +','+ g.value +','+ b.value + ','+ a.value +')');
//     });
//     g.addEventListener('input', function(){
//         console.log(kanan.style.backgroundColor='rgba('+ r.value +','+ g.value +','+ b.value + ','+ a.value +')');
//     });
//     b.addEventListener('input', function(){
//         console.log(kanan.style.backgroundColor='rgba('+ r.value +','+ g.value +','+ b.value + ','+ a.value +')');
//     });
//     a.addEventListener('input', function(){
//         console.log(kanan.style.backgroundColor='rgba('+ r.value +','+ g.value +','+ b.value + ','+ a.value +')');
//     });  
// }
    slider.forEach(function(el){
        el.addEventListener('input',function(){
            console.log(kanan.style.backgroundColor='rgba('+ r.value +','+ g.value +','+ b.value + ','+ a.value +')');
            warnaBackground.innerHTML='rgba('+ r.value +','+ g.value +','+ b.value + ','+ a.value +')';
        });
    });

    console.log("Ini styel.backgroundColor"+kanan.style.backgroundColor);