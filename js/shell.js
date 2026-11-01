/* Builds the tab bar, left rail, status bar and command palette. */
(()=>{
try{const theme=localStorage.getItem('desk-theme');if(theme)document.documentElement.dataset.theme=theme}catch(e){}
const here=location.pathname.split('/').pop()||'index.html';
const P=[['desk.html','desk','chip'],['graph.html','graph','graph'],['chat.html','chat','chat'],['media.html','media','film']];
const I={home:'<path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/>',graph:'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="8" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7l8 1M7 8l4 8M17 10l-4 6"/>',
chat:'<path d="M4 5h16v11H9l-5 4z"/>',film:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16M16 4v16M3 9h5M3 15h5M16 9h5M16 15h5"/>',
chip:'<rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',rss:'<path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16"/><circle cx="5" cy="19" r="1.5"/>',
doc:'<path d="M6 3h8l4 4v14H6z"/>'};
const svg=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const label=document.body.dataset.title||document.title;
const N=window.NOTES||[],T=new Set(N.flatMap(n=>n.tags));
let tabs=[];try{tabs=JSON.parse(sessionStorage.tabs||'[]')}catch(e){}
const key=here+location.hash;
if(!tabs.some(t=>t.u===key))tabs.push({u:key,t:label});
const save=()=>{try{sessionStorage.tabs=JSON.stringify(tabs)}catch(e){}};save();
const bar=document.createElement('nav');bar.id='tabs';bar.setAttribute('aria-label','open pages');
tabs.forEach((t,i)=>{const d=document.createElement('div');d.className='tab'+(t.u===key?' active':'');
 d.innerHTML=`${svg('doc')}<a href="${t.u}" style="color:inherit">${t.t}</a><button class="x" aria-label="close ${t.t}">&times;</button>`;
 d.querySelector('.x').onclick=()=>{tabs.splice(i,1);save();if(t.u===key)location.href=(tabs[Math.max(0,i-1)]||{u:'index.html'}).u;else location.reload()};bar.append(d)});
const rail=document.createElement('nav');rail.id='rail';rail.setAttribute('aria-label','sections');
rail.innerHTML=P.map(([h,n])=>`<a href="${h}" title="${n}" aria-label="${n}" class="${h===here?'active':''}">${svg(n)}</a>`).join('')+`<a href="#" title="rss" aria-label="rss">${svg('rss')}</a>`;
const st=document.createElement('footer');st.id='status';st.innerHTML=`<span id="url"></span><span>${N.length} notes · ${T.size} tags</span>`;
const m=document.querySelector('main');document.body.prepend(bar,rail,m,st);
document.addEventListener('mouseover',e=>{const a=e.target.closest('a[href]');document.getElementById('url').textContent=a?a.href:''});
const themeButton=document.querySelector('.desk-theme-toggle');
if(themeButton){
 const updateThemeLabel=()=>{const dark=document.documentElement.dataset.theme==='dark';themeButton.setAttribute('aria-pressed',String(dark));themeButton.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');themeButton.querySelector('.lamp-label').textContent=dark?'pull for light':'pull for dark'};
 const pull=themeButton.querySelector('.lamp-pull');let dragging=false;let moved=false;let startY=0;let suppressClick=false;
 const toggleTheme=()=>{const dark=document.documentElement.dataset.theme==='dark';const next=dark?'light':'dark';document.documentElement.dataset.theme=next;themeButton.classList.remove('pulling');void themeButton.offsetWidth;themeButton.classList.add('pulling');try{localStorage.setItem('desk-theme',next)}catch(e){}updateThemeLabel();setTimeout(()=>themeButton.classList.remove('pulling'),750)};
 pull.addEventListener('pointerdown',e=>{dragging=true;moved=false;startY=e.clientY;pull.setPointerCapture(e.pointerId);themeButton.classList.add('dragging');e.preventDefault()});
 pull.addEventListener('pointermove',e=>{if(!dragging)return;const distance=Math.max(0,Math.min(58,e.clientY-startY));if(distance>3)moved=true;themeButton.style.setProperty('--drag-distance',`${distance}px`)});
 const releasePull=e=>{if(!dragging)return;dragging=false;pull.releasePointerCapture(e.pointerId);themeButton.classList.remove('dragging');if(moved){suppressClick=true;if(parseFloat(themeButton.style.getPropertyValue('--drag-distance'))>=18)toggleTheme()}moved=false;themeButton.style.removeProperty('--drag-distance')};
 pull.addEventListener('pointerup',releasePull);pull.addEventListener('pointercancel',releasePull);
 themeButton.onclick=()=>{if(suppressClick){suppressClick=false;return}if(!moved)toggleTheme();moved=false};
 updateThemeLabel();
}
/* palette */
const pal=document.createElement('div');pal.id='pal';pal.setAttribute('role','dialog');pal.setAttribute('aria-label','search notes');
pal.innerHTML='<div class="box"><input placeholder="search notes" aria-label="search notes"><ul></ul><div class="hint"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div></div>';
document.body.append(pal);
const inp=pal.querySelector('input'),ul=pal.querySelector('ul');let sel=0,res=[];
const draw=()=>{const q=inp.value.toLowerCase();res=N.filter(n=>(n.title+n.desc+n.tags.join(' ')).toLowerCase().includes(q));sel=0;
 ul.innerHTML=res.length?res.map((n,i)=>`<li class="${i?'':'sel'}"><a href="note.html#${n.slug}">${n.title}</a></li>`).join(''):'<li style="padding:12px;color:var(--text-muted)">nothing yet. try another word.</li>'};
const mark=()=>[...ul.children].forEach((l,i)=>l.classList.toggle('sel',i===sel));
window.openPalette=()=>{pal.classList.add('open');inp.value='';draw();inp.focus()};
const close=()=>pal.classList.remove('open');
pal.onclick=e=>{if(e.target===pal)close()};inp.oninput=draw;
document.addEventListener('keydown',e=>{
 if(e.key==='/'&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();openPalette()}
 else if(e.key==='Escape')close();
 else if(pal.classList.contains('open')){
  if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(sel+1,res.length-1);mark()}
  if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(sel-1,0);mark()}
  if(e.key==='Enter'&&res[sel])location.href='note.html#'+res[sel].slug}});
window.coverFor=(s)=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))%360;const a=.12+(h%5)*.04;
 return `background:radial-gradient(circle at ${20+h%60}% ${30+h%40}%,rgba(139,157,255,${a}),transparent 60%),#202020`};
window.cardHTML=n=>`<a class="card" href="note.html#${n.slug}"><div class="cover" style="${coverFor(n.slug)}"></div><div class="body"><h3>${n.title}</h3><p>${n.desc}</p><div class="foot"><span class="d">${svg('doc').replace('M6 3h8l4 4v14H6z','M4 6h16v14H4zM4 10h16M8 3v4M16 3v4')}${n.date}</span><span class="tags">${n.tags.map(t=>`<span class="pill">#${t}</span>`).join('')}</span></div></div></a>`;
})();
