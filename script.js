const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

var timeout;

function firstpageanim(){
        var tl = gsap.timeline();

        tl.from(".nav",{
             y:'-10',
             opacity:0,
             duration:1.5,
             ease: Expo.easeInOut  
        })

        .to(".boundingelem",{
            y:0,
            ease:Expo.easeInOut,
            duration:2,
            delay: -1,
            Stagger :.2
       })
       .from(".herofooter",{
        y:'-10',
        opacity: 0,
        duration:1.5,
        delay: -1,
        ease :Expo.easeInOut
       })
}


function circlemousefollower(xscale,yscale){
    var screen = document.querySelector(".main");
var mouse =document.querySelector(".minicircle");


screen.addEventListener("mousemove",function(dets){
 mouse.style.left =dets.x +"px";
 mouse.style.top =dets.y +"px";

 mouse.style.transform = `scale(${xscale},${yscale})`;
})

}

function circlesize(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2,dets.clientY - xprev);
       
        xprev = dets.clientX;
        yprev = dets.clientY;

        circlemousefollower(xscale,yscale);

        timeout = setTimeout(function(){
            document.querySelector(".minicircle").transform= `scale(1,1)`;
        },100)
       
    })
}



circlemousefollower();
firstpageanim();
circlesize();

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mousemove" , function (dets) {
          var diff = dets.clientY  - elem.getBoundingClientRect().top;
          diffrot = dets.clientX - rotate;
          rotate = dets.clientX;
            
       
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            // top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp( -20, 20, diffrot * 0.5),
        })

    })

    elem.addEventListener("mouseleave" , function (dets) {
         gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5
         
      })

  })
})