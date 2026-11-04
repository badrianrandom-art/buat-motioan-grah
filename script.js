const camera = document.querySelector("#camera");
const hero = document.querySelector("#hero");
const caption = document.querySelector("#caption");
const impact = document.querySelector(".impact");
const pauseBtn = document.querySelector("#pause");
const status = document.querySelector("#status");

gsap.set(".blink",{opacity:0});
gsap.set(".mouth",{transformOrigin:"50% 50%"});
gsap.set(".point-hand",{transformOrigin:"25% 80%"});

let master;
let paused = false;

function buildScene(){
  if(master) master.kill();
  gsap.set(camera,{scale:1,x:0,y:0,rotation:0});
  gsap.set(hero,{y:0,rotation:0,transformOrigin:"50% 90%"});
  gsap.set(".brows",{rotation:0,transformOrigin:"50% 50%"});
  gsap.set(".point-arm",{rotation:0,transformOrigin:"20% 20%"});
  gsap.set(".point-hand",{rotation:0});
  gsap.set(".eyes",{scaleY:1,transformOrigin:"50% 50%"});
  gsap.set(".mouth",{scaleY:1});
  gsap.set(".impact",{opacity:0,scale:.4});
  gsap.set(".dust",{opacity:0,scale:.5});
  caption.textContent="";

  master = gsap.timeline({repeat:-1,repeatDelay:1.2});
  master
    .to(camera,{scale:1.08,duration:5,ease:"sine.inOut"},0)
    .to(camera,{x:-18,y:4,duration:4,ease:"sine.inOut"},1)
    .to(".cloud-a",{x:90,duration:18,ease:"none"},0)
    .to(".cloud-b",{x:-65,duration:22,ease:"none"},0)
    .to(hero,{y:-8,rotation:-1.2,duration:.7,ease:"power2.out"},.4)
    .to(hero,{y:0,rotation:0,duration:.8,ease:"bounce.out"},1.1)
    .to(".point-arm",{rotation:-7,duration:.3,yoyo:true,repeat:1,ease:"power1.inOut"},1.25)
    .to(".point-hand",{rotation:9,duration:.22,yoyo:true,repeat:1},1.3)
    .to(".impact",{opacity:1,scale:1.15,duration:.25,ease:"back.out(3)"},1.35)
    .to(".impact",{opacity:0,scale:.8,duration:.35},2.05)
    .to(".brows",{rotation:-3,duration:.25,yoyo:true,repeat:1},2.25)
    .to(".eyes",{scaleY:.08,duration:.09,yoyo:true,repeat:1},2.65)
    .to(".mouth",{scaleY:.55,duration:.13,yoyo:true,repeat:5,ease:"sine.inOut"},2.8)
    .to(".dust-a",{opacity:.7,scale:1.5,x:35,duration:1.2,ease:"sine.out"},3)
    .to(".dust-b",{opacity:.5,scale:1.7,x:50,duration:1.5,ease:"sine.out"},3.3)
    .to(".dust",{opacity:0,duration:.6},4.2)
    .to(camera,{scale:1.14,x:8,y:-3,duration:2.5,ease:"power2.inOut"},4.1)
    .to(camera,{scale:1.02,x:0,y:0,duration:2,ease:"power2.inOut"},6.7)
    .call(()=>caption.textContent="HEY, PARTNER!",null,1.45)
    .call(()=>caption.textContent="THIS TOWN AIN'T BIG ENOUGH!",null,3.1)
    .call(()=>caption.textContent="...JUST KIDDING.",null,5.7)
    .call(()=>caption.textContent="",null,7.7);
  paused=false;
  pauseBtn.textContent="Ⅱ Pause";
  status.textContent="SCENE PLAYING";
}
buildScene();

pauseBtn.addEventListener("click",()=>{
  if(!master) return;
  paused=!paused;
  if(paused){master.pause();pauseBtn.textContent="▶ Play";status.textContent="SCENE PAUSED";}
  else{master.resume();pauseBtn.textContent="Ⅱ Pause";status.textContent="SCENE PLAYING";}
});
document.querySelector("#replay").addEventListener("click",()=>buildScene());

// Subtle pointer camera parallax on desktop.
const stage=document.querySelector(".stage");
stage.addEventListener("pointermove",e=>{
  if(window.matchMedia("(max-width:650px)").matches || paused) return;
  const r=stage.getBoundingClientRect();
  const nx=(e.clientX-r.left)/r.width-.5;
  const ny=(e.clientY-r.top)/r.height-.5;
  gsap.to(camera,{x:nx*10,y:ny*7,duration:.7,ease:"power2.out",overwrite:"auto"});
});
stage.addEventListener("pointerleave",()=>{
  if(!paused) gsap.to(camera,{x:0,y:0,duration:1,ease:"power2.out"});
});
