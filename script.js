const camera = document.querySelector("#camera");
const hero = document.querySelector("#hero");
const caption = document.querySelector("#caption");
const captionSub = document.querySelector("#captionSub");
const impact = document.querySelector(".impact");
const pauseBtn = document.querySelector("#pause");
const status = document.querySelector("#status");
const stage = document.querySelector(".stage");

gsap.set(".blink",{opacity:0});
gsap.set(".mouth",{transformOrigin:"50% 50%"});
gsap.set(".point-hand",{transformOrigin:"25% 80%"});
gsap.set(".eyes",{transformOrigin:"50% 50%"});
gsap.set(".brows",{transformOrigin:"50% 50%"});

let master;
let paused = false;

function resetScene(){
  if(master) master.kill();
  gsap.set(camera,{scale:1,x:0,y:0,rotation:0});
  gsap.set(hero,{y:0,rotation:0,transformOrigin:"50% 88%"});
  gsap.set(".point-arm",{rotation:0,transformOrigin:"20% 20%"});
  gsap.set(".left-arm",{rotation:0,transformOrigin:"90% 15%"});
  gsap.set(".point-hand",{rotation:0});
  gsap.set(".eyes",{scaleY:1});
  gsap.set(".mouth",{scaleY:1});
  gsap.set(".brows",{rotation:0});
  gsap.set(".impact",{opacity:0,scale:.4});
  gsap.set(".dust",{opacity:0,scale:.5});
  caption.textContent="";
  captionSub.textContent="A WESTERN STORY";
}

function buildScene(){
  resetScene();
  master = gsap.timeline({repeat:-1,repeatDelay:1.4});
  master
    // Establishing shot: slow cinematic push-in and subtle handheld drift.
    .to(camera,{scale:1.075,duration:4.8,ease:"power1.inOut"},0)
    .to(camera,{x:-13,y:3,duration:3.8,ease:"sine.inOut"},.4)
    .to(camera,{rotation:.25,duration:2.2,yoyo:true,repeat:1,ease:"sine.inOut"},1.2)
    .to(".cloud-a",{x:95,duration:20,ease:"none"},0)
    .to(".cloud-b",{x:-75,duration:24,ease:"none"},0)
    // Idle breathing and weight shift.
    .to(hero,{y:-4,rotation:.65,duration:1.1,ease:"sine.inOut"},0)
    .to(hero,{y:0,rotation:-.45,duration:1.2,ease:"sine.inOut"},1.1)
    .to(hero,{y:-3,rotation:0,duration:1.1,ease:"sine.inOut"},2.3)
    // Greeting gesture.
    .to(".point-arm",{rotation:-9,duration:.32,ease:"power2.out"},1.05)
    .to(".point-arm",{rotation:0,duration:.48,ease:"elastic.out(1,.55)"},1.37)
    .to(".point-hand",{rotation:8,duration:.2,yoyo:true,repeat:1,ease:"sine.inOut"},1.15)
    .to(".impact",{opacity:1,scale:1.12,duration:.24,ease:"back.out(3)"},1.28)
    .to(".impact",{opacity:0,scale:.78,duration:.35},1.95)
    // Expressive brows, eyes, blink, and speech mouth movement.
    .to(".brows",{rotation:-2.5,duration:.22,yoyo:true,repeat:1,ease:"sine.inOut"},2.05)
    .to(".eyes",{scaleY:.08,duration:.09,yoyo:true,repeat:1,ease:"power1.inOut"},2.45)
    .to(".mouth",{scaleY:.55,duration:.12,yoyo:true,repeat:7,ease:"sine.inOut"},2.7)
    .to(".mouth",{scaleY:1,duration:.18,ease:"back.out(2)"},3.75)
    // Dust puffs and camera push for the punchline.
    .to(".dust-a",{opacity:.72,scale:1.65,x:42,duration:1.25,ease:"sine.out"},3.05)
    .to(".dust-b",{opacity:.52,scale:1.8,x:55,duration:1.5,ease:"sine.out"},3.35)
    .to(".dust",{opacity:0,duration:.65},4.25)
    .to(camera,{scale:1.13,x:9,y:-4,duration:1.9,ease:"power2.inOut"},4.15)
    .to(hero,{rotation:1.1,duration:.22,yoyo:true,repeat:1,ease:"power1.inOut"},4.5)
    .to(".eyes",{scaleY:.08,duration:.08,yoyo:true,repeat:1},5.25)
    .to(camera,{scale:1.015,x:0,y:0,rotation:0,duration:2.3,ease:"power2.inOut"},6.25)
    .call(()=>{caption.textContent="HEY, PARTNER!";captionSub.textContent="WELCOME TO THE WILD WEST";},1.45)
    .call(()=>{caption.textContent="THIS TOWN AIN'T BIG ENOUGH!";captionSub.textContent="...OR IS IT?";},3.15)
    .call(()=>{caption.textContent="JUST KIDDING.";captionSub.textContent="THE LITTLE OUTLAW";},5.7)
    .call(()=>{caption.textContent="";captionSub.textContent="A WESTERN STORY";},7.8);
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
document.querySelector("#replay").addEventListener("click",buildScene);

// Desktop pointer parallax. Touch screens keep the authored camera move.
stage.addEventListener("pointermove",e=>{
  if(window.matchMedia("(max-width:650px)").matches || paused) return;
  const r=stage.getBoundingClientRect();
  const nx=(e.clientX-r.left)/r.width-.5;
  const ny=(e.clientY-r.top)/r.height-.5;
  gsap.to(camera,{x:nx*9,y:ny*6,duration:.8,ease:"power2.out",overwrite:"auto"});
});
stage.addEventListener("pointerleave",()=>{
  if(!paused) gsap.to(camera,{x:0,y:0,duration:1.1,ease:"power2.out"});
});
