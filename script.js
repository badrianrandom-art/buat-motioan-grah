const camera = document.querySelector("#camera");
const hero = document.querySelector("#hero");
const caption = document.querySelector("#caption");
const captionSub = document.querySelector("#captionSub");
const impact = document.querySelector(".impact");
const pauseBtn = document.querySelector("#pause");
const status = document.querySelector("#status");
const stage = document.querySelector(".stage");
const shotLabel = document.querySelector("#shotLabel");
const dialogueMark = document.querySelector("#dialogueMark");

let master;
let paused = false;
let gazeX = 0, gazeY = 0;

function resetScene(){
  if(master) master.kill();
  gsap.killTweensOf("*");
  gsap.set(camera,{scale:1,x:0,y:0,rotation:0});
  gsap.set(hero,{x:0,y:0,rotation:0,transformOrigin:"50% 88%"});
  gsap.set(".point-arm",{rotation:0,transformOrigin:"20% 20%"});
  gsap.set(".left-arm",{rotation:0,transformOrigin:"90% 15%"});
  gsap.set(".point-hand",{rotation:0});
  gsap.set(".front-leg",{rotation:0,transformOrigin:"50% 0%"});
  gsap.set(".back-leg",{rotation:0,transformOrigin:"50% 0%"});
  gsap.set(".eyes",{scaleY:1,transformOrigin:"50% 50%"});
  gsap.set(".pupil",{x:0,y:0});
  gsap.set(".mouth",{scaleY:1,scaleX:1,transformOrigin:"50% 50%"});
  gsap.set(".brows",{rotation:0});
  gsap.set(".impact",{opacity:0,scale:.4});
  gsap.set(".dust",{opacity:0,scale:.5});
  gsap.set(".shot-label",{opacity:0});
  gsap.set(".dialogue-mark",{opacity:0});
  caption.textContent="";
  captionSub.textContent="A WESTERN STORY";
  shotLabel.textContent="MEDIUM SHOT";
  gazeX=0;gazeY=0;
}

function blink(at, tl=master){
  tl.to(".eyes",{scaleY:.07,duration:.075,ease:"power1.in"},at)
    .to(".eyes",{scaleY:1,duration:.12,ease:"power2.out"},at+.075);
}
function speak(at,duration){
  const t=master;
  t.set(".dialogue-mark",{opacity:1},at)
   .to(".mouth",{scaleY:.52,scaleX:.94,duration:.12,yoyo:true,repeat:Math.max(3,Math.floor(duration/.19)),ease:"sine.inOut"},at)
   .to(".mouth",{scaleY:1,scaleX:1,duration:.14,ease:"back.out(2)"},at+duration)
   .set(".dialogue-mark",{opacity:0},at+duration+.08);
}
function shot(label,at){
  master.call(()=>{shotLabel.textContent=label;gsap.to(".shot-label",{opacity:1,duration:.25});},null,at);
}

function buildScene(){
  resetScene();
  master = gsap.timeline({repeat:-1,repeatDelay:1.4});
  // Establishing shot and layered camera choreography.
  master
    .to(camera,{scale:1.055,duration:2.2,ease:"power2.inOut"},0)
    .to(camera,{x:-10,y:2,duration:2.6,ease:"sine.inOut"},0)
    .to(".cloud-a",{x:95,duration:20,ease:"none"},0)
    .to(".cloud-b",{x:-75,duration:24,ease:"none"},0)
    .to(hero,{y:-3,rotation:.5,duration:.8,ease:"sine.inOut"},0)
    .to(hero,{y:0,rotation:-.5,duration:.9,ease:"sine.inOut"},.8)
    .to(hero,{y:-2,rotation:0,duration:.8,ease:"sine.inOut"},1.7)
    .call(()=>gsap.to(".shot-label",{opacity:0,duration:.2}),null,1.8)

    // Character notices the viewer: eye-line shift, eyebrow acting, blink.
    .to(".pupil-left",{x:5,y:-1,duration:.22,ease:"power2.out"},2)
    .to(".pupil-right",{x:5,y:-1,duration:.22,ease:"power2.out"},2)
    .to(".brows",{rotation:-3,duration:.2,yoyo:true,repeat:1,ease:"sine.inOut"},2.12)
    .to(".point-arm",{rotation:-10,duration:.32,ease:"power2.out"},2.28)
    .to(".point-arm",{rotation:0,duration:.48,ease:"elastic.out(1,.55)"},2.6)
    .to(".point-hand",{rotation:8,duration:.2,yoyo:true,repeat:1},2.4)
    .to(".impact",{opacity:1,scale:1.12,duration:.24,ease:"back.out(3)"},2.48)
    .to(".impact",{opacity:0,scale:.78,duration:.35},3.1)

    // Close-up beat: cinematic push, reaction blink and speech.
    .to(camera,{scale:1.18,x:0,y:-8,duration:1.1,ease:"power2.inOut"},3.25)
    .to(hero,{y:-4,duration:.25,yoyo:true,repeat:1,ease:"power1.inOut"},3.6)
    .to(".pupil-left",{x:-2,y:0,duration:.18},3.5)
    .to(".pupil-right",{x:-2,y:0,duration:.18},3.5)
    .to(".brows",{rotation:2,duration:.2,yoyo:true,repeat:1},3.8)
    .to(camera,{scale:1.11,duration:.55,ease:"power1.out"},4.3)
    .to(".dust-a",{opacity:.7,scale:1.6,x:38,duration:1.2,ease:"sine.out"},4.25)
    .to(".dust-b",{opacity:.5,scale:1.8,x:52,duration:1.4,ease:"sine.out"},4.45)
    .to(".dust",{opacity:0,duration:.6},5.45)
    .to(camera,{scale:1.045,x:0,y:0,duration:1.4,ease:"power2.inOut"},5.6)

    // A small physical acting beat: shift weight and swing the free arm.
    .to(".left-arm",{rotation:-8,duration:.3,yoyo:true,repeat:1,ease:"sine.inOut"},5.9)
    .to(".front-leg",{rotation:3,duration:.3,yoyo:true,repeat:1,ease:"sine.inOut"},6.0)
    .to(".back-leg",{rotation:-2,duration:.3,yoyo:true,repeat:1,ease:"sine.inOut"},6.0)
    .to(hero,{rotation:-.8,duration:.28,yoyo:true,repeat:1,ease:"sine.inOut"},6.0)
    .to(".eyes",{scaleY:.07,duration:.075,yoyo:true,repeat:1},6.5)
    .to(".pupil-left",{x:0,y:0,duration:.2},6.7)
    .to(".pupil-right",{x:0,y:0,duration:.2},6.7)
    .call(()=>{caption.textContent="HEY, PARTNER!";captionSub.textContent="WELCOME TO THE WILD WEST";},2.55)
    .call(()=>{caption.textContent="THIS TOWN AIN'T BIG ENOUGH!";captionSub.textContent="...OR IS IT?";},4.25)
    .call(()=>{caption.textContent="JUST KIDDING.";captionSub.textContent="THE LITTLE OUTLAW";},6.1)
    .call(()=>{caption.textContent="";captionSub.textContent="A WESTERN STORY";},8.0);

  blink(1.35);
  blink(4.9);
  speak(2.55,1.0);
  speak(4.25,1.1);
  speak(6.1,.65);
  shot("WIDE ESTABLISHING",0);
  master.call(()=>gsap.to(".shot-label",{opacity:0,duration:.25}),null,1.8);
  master.call(()=>{shotLabel.textContent="CHARACTER CLOSE-UP";gsap.to(".shot-label",{opacity:1,duration:.2});},null,3.25);
  master.call(()=>gsap.to(".shot-label",{opacity:0,duration:.25}),null,5.5);
  master.call(()=>{shotLabel.textContent="MEDIUM SHOT";gsap.to(".shot-label",{opacity:1,duration:.2});},null,5.8);
  master.call(()=>gsap.to(".shot-label",{opacity:0,duration:.25}),null,7.6);

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

// Desktop mouse gaze and camera parallax. On touch screens the authored acting plays by itself.
stage.addEventListener("pointermove",e=>{
  if(window.matchMedia("(max-width:650px)").matches || paused) return;
  const r=stage.getBoundingClientRect();
  const nx=(e.clientX-r.left)/r.width-.5;
  const ny=(e.clientY-r.top)/r.height-.5;
  gsap.to(camera,{x:nx*8,y:ny*5,duration:.8,ease:"power2.out",overwrite:"auto"});
  gsap.to(".pupil-left",{x:nx*5,y:ny*3,duration:.22,ease:"power2.out",overwrite:"auto"});
  gsap.to(".pupil-right",{x:nx*5,y:ny*3,duration:.22,ease:"power2.out",overwrite:"auto"});
});
stage.addEventListener("pointerleave",()=>{
  if(!paused){
    gsap.to(camera,{x:0,y:0,duration:1,ease:"power2.out"});
    gsap.to(".pupil-left,.pupil-right",{x:0,y:0,duration:.3});
  }
});
