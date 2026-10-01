const header=document.querySelector('header'),menu=document.getElementById('menu');menu.onclick=()=>header.classList.toggle('open-nav');document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>header.classList.remove('open-nav'));
const assistant=document.getElementById('assistant'),btn=document.getElementById('chatBtn'),close=document.getElementById('close'),chat=document.getElementById('chat'),form=document.getElementById('form'),input=document.getElementById('input');btn.onclick=()=>assistant.classList.add('open');close.onclick=()=>assistant.classList.remove('open');
function add(t,c){const p=document.createElement('p');p.textContent=t;if(c)p.className=c;chat.appendChild(p);chat.scrollTop=chat.scrollHeight}function reply(q){q=q.toLowerCase();if(q.includes('agri')||q.includes('project'))return'Yanny’s featured project is AgriConnect, a web and mobile platform connecting local farmers in Bukidnon directly with buyers. She worked as Database Manager / Back-end Developer.';if(q.includes('skill')||q.includes('technology'))return'Her skills include PHP, Java, HTML, CSS, JavaScript, MySQL, Android Studio, GitHub, VS Code, XAMPP, troubleshooting, system documentation, and database design.';if(q.includes('education')||q.includes('school'))return'Yanny is a 4th Year BS Information Technology student at Torres Capitol College, Inc. in Maramag, Bukidnon.';if(q.includes('contact')||q.includes('email')||q.includes('phone'))return'You can contact Yanny at arianneapostol19@gmail.com or 09050768830. She is based in San Jose, Quezon, Bukidnon, Philippines.';if(q.includes('github'))return'Her GitHub is github.com/arianneapostol.';if(q.includes('linkedin'))return'Her LinkedIn is linkedin.com/in/ariannemaeapostol.';return'I'm Yanny’s portfolio assistant. I can answer questions about her background, skills, education, AgriConnect, and contact information.'}function ask(q){if(!q.trim())return;add(q,'user');setTimeout(()=>add(reply(q)),300)}form.onsubmit=e=>{e.preventDefault();ask(input.value);input.value=''};document.querySelectorAll('.quick button').forEach(b=>b.onclick=()=>ask(b.dataset.q));


// V5: subtle pointer parallax for the ambient background shapes.
if (window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) {
  let tx=0, ty=0, cx=0, cy=0;
  window.addEventListener('pointermove', (e)=>{
    tx=(e.clientX/window.innerWidth-.5)*10;
    ty=(e.clientY/window.innerHeight-.5)*8;
  }, {passive:true});
  const frame=()=>{
    cx += (tx-cx)*0.045; cy += (ty-cy)*0.045;
    document.documentElement.style.setProperty('--mx', `${cx}px`);
    document.documentElement.style.setProperty('--my', `${cy}px`);
    requestAnimationFrame(frame);
  };
  frame();
}

/* V8: restrained pointer glow for desktop, disabled on touch devices. */
if (window.matchMedia("(pointer:fine)").matches) {
  const hero = document.querySelector(".hero");
  const glow = document.createElement("span");
  glow.className = "cursor-glow";
  hero?.appendChild(glow);
  window.addEventListener("pointermove", (e) => {
    if (!hero) return;
    const r = hero.getBoundingClientRect();
    glow.style.transform = `translate3d(${e.clientX-r.left-110}px,${e.clientY-r.top-110}px,0)`;
  }, {passive:true});
}

/* V9: AgriConnect project gallery */
(() => {
  const main = document.getElementById("agriGalleryImage");
  const mainFrame = document.querySelector(".gallery-main");
  const count = document.getElementById("agriGalleryCount");
  const title = document.getElementById("agriGalleryTitle");
  const thumbs = [...document.querySelectorAll(".gallery-thumb")];
  const prev = document.querySelector(".gallery-arrow.prev");
  const next = document.querySelector(".gallery-arrow.next");
  if (!main || !thumbs.length) return;

  let index = 0;
  function show(i){
    index = (i + thumbs.length) % thumbs.length;
    const t = thumbs[index];
    main.src = t.dataset.src;
    main.alt = t.dataset.title + " — AgriConnect";
    title.textContent = t.dataset.title;
    count.textContent = String(index + 1).padStart(2,"0") + " / " + String(thumbs.length).padStart(2,"0");
    thumbs.forEach((x,n)=>x.classList.toggle("active",n===index));
  }
  thumbs.forEach((t,i)=>t.addEventListener("click",()=>show(i)));
  prev?.addEventListener("click",()=>show(index-1));
  next?.addEventListener("click",()=>show(index+1));
  main.addEventListener("click",()=>mainFrame.classList.toggle("zoomed"));
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape") mainFrame.classList.remove("zoomed");
    if(e.key==="ArrowLeft") show(index-1);
    if(e.key==="ArrowRight") show(index+1);
  });
})();
