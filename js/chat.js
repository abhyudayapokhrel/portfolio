/* Stub agent. Replace reply() with a fetch() to your own backend. */
const reply=t=>{t=t.toLowerCase();
 if(/graph/.test(t))return 'it is over <a href="graph.html">here</a>. drag stuff around.';
 if(/listen|music|playlist/.test(t))return 'mostly lo-fi when the build is red. check the <a href="media.html">media page</a>.';
 if(/film|movie/.test(t))return 'i keep a short list in <a href="note.html#films-2026">films i liked this year</a>.';
 if(/gray|grey|color|colour/.test(t))return 'fewer colors, fewer decisions. just one periwinkle for the good stuff.';
 const n=NOTES[Math.floor(Math.random()*NOTES.length)];return 'not sure, but you might like <a href="note.html#'+n.slug+'">'+n.title+'</a>.'};
const add=(h,me)=>{const d=document.createElement('div');d.className='msg'+(me?' me':'');d.innerHTML=h;m.append(d)};
const send=t=>{t=t.trim();if(!t)return;add(t.replace(/</g,'&lt;'),1);setTimeout(()=>add(reply(t)),350);q.value=''};
f.onsubmit=e=>{e.preventDefault();send(q.value)};
q.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(q.value)}};
document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>send(c.textContent));
