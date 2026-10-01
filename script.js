const header=document.querySelector('header'),menu=document.getElementById('menu');menu.onclick=()=>header.classList.toggle('open-nav');document.querySelectorAll('nav a').forEach(a=>a.onclick=()=>header.classList.remove('open-nav'));
const assistant=document.getElementById('assistant');
const btn=document.getElementById('chatBtn');
const closeBtn=document.getElementById('close');
const chat=document.getElementById('chat');
const form=document.getElementById('form');
const input=document.getElementById('input');

// AI assistant controls are attached explicitly so the floating button remains
// reliable even if other page scripts or browser extensions interfere.
function openAssistant(){
  if(!assistant) return;
  assistant.classList.add('open');
  assistant.setAttribute('aria-hidden','false');
  document.body.classList.add('assistant-open');
  window.setTimeout(()=>input?.focus(),80);
}
function closeAssistant(){
  if(!assistant) return;
  assistant.classList.remove('open');
  assistant.setAttribute('aria-hidden','true');
  document.body.classList.remove('assistant-open');
}
btn?.addEventListener('click',openAssistant);
closeBtn?.addEventListener('click',closeAssistant);

function add(t,c){const p=document.createElement('p');p.textContent=t;if(c)p.className=c;chat.appendChild(p);chat.scrollTop=chat.scrollHeight}

const portfolioFacts={
  name:'Arianne Mae E. Apostol', preferred:'Yanny', title:'Information Technology Student / Aspiring Software Developer',
  tagline:'Connecting agriculture and technology for local communities.',
  education:'Yanny is a 4th Year Bachelor of Science in Information Technology student at Torres Capitol College, Inc. in Maramag, Bukidnon.',
  location:'San Jose, Quezon, Bukidnon, Philippines',
  skills:'PHP, Java, HTML, CSS, JavaScript, MySQL, Android Studio, GitHub, VS Code, XAMPP, computer troubleshooting, system documentation, database design, teamwork, communication, problem solving, and willingness to learn.',
  project:'AgriConnect is Yanny\'s featured school capstone: a web and mobile platform intended to connect local farmers in Bukidnon directly with buyers. She worked as Database Manager / Back-end Developer, handling MySQL database design, farmer and buyer registration, the product posting module, and system testing.',
  contact:'You can reach Yanny at arianneapostol19@gmail.com or 09050768830. Her GitHub is github.com/arianneapostol and her LinkedIn is linkedin.com/in/ariannemaeapostol.',
  interests:'Web development, mobile application development, graphic design, hardware installation, agriculture-focused technology, databases, and practical community solutions.'
};

function reply(raw){
  const q=raw.toLowerCase().trim();
  if(/^(hi|hello|hey|hiya|yo|good morning|good afternoon|good evening)\b/.test(q)) return 'Hiii ✿ I\'m Yanny\'s portfolio companion. What are you curious about — her work, skills, AgriConnect, or something completely random?';
  if(q.includes('who are you')||q.includes('what can you do')||q.includes('help')) return 'I\'m a tiny AI-style guide built into Yanny\'s portfolio ✿ I know the portfolio content and can also handle a few light general questions. I\'m not connected to a live search engine, so for very current facts I may not have the latest answer.';
  if(q.includes('who is yanny')||q.includes('about yanny')||q.includes('about her')||q.includes('about arianne')||q.includes('who is arianne')) return `${portfolioFacts.name}, who prefers to go by Yanny, is an ${portfolioFacts.title.toLowerCase()}. ${portfolioFacts.tagline}`;
  if(q.includes('name')) return `Her full name is ${portfolioFacts.name}, and she prefers the name Yanny.`;
  if(q.includes('agri')||q.includes('project')||q.includes('capstone')||q.includes('farmer')) return portfolioFacts.project;
  if(q.includes('role')||q.includes('what did she do')) return 'On AgriConnect, Yanny served as Database Manager / Back-end Developer. She handled the MySQL database design, registration, product posting, and system testing.';
  if(q.includes('skill')||q.includes('technology')||q.includes('tech stack')||q.includes('programming')) return `Her technical skills include ${portfolioFacts.skills}`;
  if(q.includes('education')||q.includes('school')||q.includes('college')||q.includes('course')||q.includes('degree')) return portfolioFacts.education;
  if(q.includes('contact')||q.includes('email')||q.includes('phone')||q.includes('reach')) return portfolioFacts.contact;
  if(q.includes('github')) return 'Her GitHub is github.com/arianneapostol ✿ That is where you can explore the public work she has chosen to share.';
  if(q.includes('linkedin')) return 'Her LinkedIn is linkedin.com/in/ariannemaeapostol.';
  if(q.includes('where')||q.includes('location')||q.includes('from')) return `Yanny is based in ${portfolioFacts.location}.`;
  if(q.includes('goal')||q.includes('career')||q.includes('future')) return 'Her goal is to become a professional Software Developer and create technology that supports Filipino farmers and local communities.';
  if(q.includes('interest')||q.includes('enjoy')||q.includes('what does she do')) return `She enjoys ${portfolioFacts.interests}`;
  if(q.includes('php')) return 'PHP is one of Yanny\'s programming skills, and she uses it alongside MySQL for web development.';
  if(q.includes('mysql')||q.includes('database')) return 'MySQL is one of Yanny\'s core technical skills. For AgriConnect, she worked on the database design and related back-end functionality.';
  if(q.includes('agriculture')||q.includes('farm')) return 'Agriculture is a major theme in Yanny\'s portfolio. Her AgriConnect project focuses on using technology to connect farmers and buyers in local communities.';
  if(q.includes('favorite color')||q.includes('colour')||q.includes('color')) return 'The portfolio gives me strong pink, rose, and soft lavender energy. ✿ As for Yanny\'s actual favorite color, that detail isn\'t listed here.';
  if(q.includes('joke')) return 'Why did the developer bring a ladder? Because the project had too many levels. 😌';
  if(q.includes('weather')) return 'I\'m cute, but I\'m not connected to live weather data. Try a weather app for the current forecast ✿';
  if(q.match(/^(what|who|where|when|why|how|can|do|does|is|are|tell me)\b/)) return 'Hmm, that one is outside the portfolio notes I have. ✿ I can chat about Yanny, her skills, education, AgriConnect, career goals, or a few light general topics. Try asking me something specific!';
  return 'Ooh, interesting! ✿ I don\'t have that detail in my little knowledge garden yet. Ask me about Yanny, her skills, education, AgriConnect, or try a light general question.';
}

function ask(q){if(!q.trim())return;add(q,'user');input.value='';setTimeout(()=>add(reply(q)),280)}
form?.addEventListener('submit',(e)=>{e.preventDefault();ask(input.value)});
document.querySelectorAll('.quick button').forEach(b=>b.addEventListener('click',()=>ask(b.dataset.q)));
input?.addEventListener('keydown',(e)=>{if(e.key==='Escape') closeAssistant();});


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


/* V11: AgriConnect gallery — clean thumbnails + real lightbox viewer */
(() => {
  const main = document.getElementById("agriGalleryImage");
  const count = document.getElementById("agriGalleryCount");
  const title = document.getElementById("agriGalleryTitle");
  const thumbs = [...document.querySelectorAll(".gallery-thumb")];
  const prev = document.querySelector(".gallery-arrow.prev");
  const next = document.querySelector(".gallery-arrow.next");

  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCount = document.getElementById("lightboxCount");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const close = document.querySelector(".lightbox-close");
  const lbPrev = document.querySelector(".lightbox-prev");
  const lbNext = document.querySelector(".lightbox-next");

  if (!main || !thumbs.length) return;

  let index = 0;

  function update(i) {
    index = (i + thumbs.length) % thumbs.length;
    const t = thumbs[index];
    main.src = t.dataset.src;
    main.alt = `${t.dataset.title} — AgriConnect`;
    title.textContent = t.dataset.title;
    count.textContent = `${String(index + 1).padStart(2,"0")} / ${String(thumbs.length).padStart(2,"0")}`;
    thumbs.forEach((x,n) => x.classList.toggle("active", n === index));

    if (lightbox.classList.contains("open")) {
      lightboxImage.src = t.dataset.src;
      lightboxImage.alt = `${t.dataset.title} — AgriConnect`;
      lightboxTitle.textContent = t.dataset.title;
      lightboxCount.textContent = count.textContent;
    }
  }

  function openLightbox() {
    const t = thumbs[index];
    lightboxImage.src = t.dataset.src;
    lightboxImage.alt = `${t.dataset.title} — AgriConnect`;
    lightboxTitle.textContent = t.dataset.title;
    lightboxCount.textContent = count.textContent;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  thumbs.forEach((t, i) => t.addEventListener("click", () => update(i)));
  prev?.addEventListener("click", (e) => { e.stopPropagation(); update(index - 1); });
  next?.addEventListener("click", (e) => { e.stopPropagation(); update(index + 1); });

  main.addEventListener("click", openLightbox);
  close?.addEventListener("click", closeLightbox);
  lbPrev?.addEventListener("click", (e) => { e.stopPropagation(); update(index - 1); });
  lbNext?.addEventListener("click", (e) => { e.stopPropagation(); update(index + 1); });

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") update(index - 1);
    if (e.key === "ArrowRight") update(index + 1);
  });

  update(0);
})();
