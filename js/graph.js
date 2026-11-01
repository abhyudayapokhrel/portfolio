(()=>{
const cv=document.getElementById('cv'),ctx=cv.getContext('2d'),NT=NOTES,tags=[...new Set(NT.flatMap(n=>n.tags))];
const nodes=[...NT.map(n=>({id:n.slug,label:n.title,t:'n',href:'note.html#'+n.slug})),...tags.map(t=>({id:'#'+t,label:'#'+t,t:'t'}))];
const ix=Object.fromEntries(nodes.map((n,i)=>[n.id,i])),E=[];
NT.forEach(n=>{n.tags.forEach(t=>E.push([ix[n.slug],ix['#'+t],1]));(n.links||[]).forEach(l=>ix[l]!=null&&E.push([ix[n.slug],ix[l],0]))});
nodes.forEach((n,i)=>{const a=i*2.4;n.x=Math.cos(a)*(40+i*8);n.y=Math.sin(a)*(40+i*8);n.vx=n.vy=0});
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
let show=true,k=1,ox=0,oy=0,W=0,H=0,hov=null,drag=null,al=1,moved=false;
const vis=n=>show||n.t==='n',nb=n=>new Set(E.flatMap(([a,b])=>nodes[a]===n?[b]:nodes[b]===n?[a]:[]));
function step(){al*=.985;const V=nodes.filter(vis);
 for(const a of V){for(const b of V)if(a!==b){let dx=a.x-b.x,dy=a.y-b.y,d=dx*dx+dy*dy+.1,f=900/d*al;a.vx+=dx*f;a.vy+=dy*f}a.vx-=a.x*.012*al;a.vy-=a.y*.012*al}
 for(const[i,j]of E){const a=nodes[i],b=nodes[j];if(!vis(a)||!vis(b))continue;let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1,f=(d-90)*.02;a.vx+=dx/d*f;a.vy+=dy/d*f;b.vx-=dx/d*f;b.vy-=dy/d*f}
 for(const n of V){if(n===drag)continue;n.vx*=.8;n.vy*=.8;n.x+=n.vx;n.y+=n.vy}}
const sx=x=>W/2+ox+x*k,sy=y=>H/2+oy+y*k;
function draw(){const r=devicePixelRatio||1;ctx.setTransform(r,0,0,r,0,0);ctx.clearRect(0,0,W,H);
 const hn=hov?nb(hov):null;
 for(const[i,j]of E){const a=nodes[i],b=nodes[j];if(!vis(a)||!vis(b))continue;const on=hov&&(a===hov||b===hov);
  ctx.strokeStyle=on?css('--accent'):css('--edge');ctx.globalAlpha=on?1:.7;ctx.lineWidth=on?1.5:1;ctx.beginPath();ctx.moveTo(sx(a.x),sy(a.y));ctx.lineTo(sx(b.x),sy(b.y));ctx.stroke();ctx.globalAlpha=1}
 ctx.font='11px Poppins,system-ui,sans-serif';ctx.textAlign='center';
 for(const n of nodes){if(!vis(n))continue;const dim=hov&&n!==hov&&!hn.has(ixOf(n)),R=(n.t==='n'?5:3.5)*Math.min(k,1.6);
  ctx.globalAlpha=dim?.25:1;ctx.fillStyle=n.t==='n'?css('--node-note'):css('--accent');ctx.beginPath();ctx.arc(sx(n.x),sy(n.y),R,0,7);ctx.fill();
  ctx.fillStyle=css('--text-muted');ctx.fillText(n.label,sx(n.x),sy(n.y)+R+14)}ctx.globalAlpha=1}
const ixOf=n=>nodes.indexOf(n);
function size(){const r=devicePixelRatio||1,b=cv.getBoundingClientRect();W=b.width;H=b.height;cv.width=W*r;cv.height=H*r}
function fit(){const V=nodes.filter(vis);if(!V.length)return;const xs=V.map(n=>n.x),ys=V.map(n=>n.y);const w=Math.max(...xs)-Math.min(...xs)+160,h=Math.max(...ys)-Math.min(...ys)+120;
 k=Math.min(W/w,H/h,2);ox=-(Math.max(...xs)+Math.min(...xs))/2*k;oy=-(Math.max(...ys)+Math.min(...ys))/2*k}
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
size();for(let i=0;i<300;i++)step();fit();
(function loop(){if(al>.01&&!reduce)step();draw();requestAnimationFrame(loop)})();
addEventListener('resize',()=>{size();fit()});
const pos=e=>{const b=cv.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top]};
const hit=e=>{const[x,y]=pos(e);return nodes.find(n=>vis(n)&&Math.hypot(sx(n.x)-x,sy(n.y)-y)<12)};
let last=null;
cv.onpointerdown=e=>{moved=false;cv.setPointerCapture(e.pointerId);const n=hit(e);if(n){drag=n;al=Math.max(al,.3)}else last=pos(e);cv.style.cursor='grabbing'};
cv.onpointermove=e=>{const[x,y]=pos(e);if(drag){moved=true;drag.x=(x-W/2-ox)/k;drag.y=(y-H/2-oy)/k;drag.vx=drag.vy=0}
 else if(last){moved=true;ox+=x-last[0];oy+=y-last[1];last=[x,y]}else{hov=hit(e)||null;cv.style.cursor=hov?'pointer':'grab'}};
const endPointer=()=>{if(drag&&!moved&&drag.href)location.href=drag.href;drag=null;last=null;cv.style.cursor='grab'};
cv.onpointerup=endPointer;cv.onpointercancel=endPointer;cv.onlostpointercapture=endPointer;
cv.onwheel=e=>{e.preventDefault();k=Math.min(4,Math.max(.3,k*(e.deltaY<0?1.1:.9)))};
document.getElementById('zi').onclick=()=>k=Math.min(4,k*1.2);document.getElementById('zo').onclick=()=>k=Math.max(.3,k/1.2);
document.getElementById('fit').onclick=fit;
const tg=document.getElementById('tg');tg.onclick=()=>{show=!show;tg.setAttribute('aria-pressed',show);al=.5;fit()};
document.getElementById('list').innerHTML=NT.map(n=>`<li><a href="note.html#${n.slug}">${n.title}</a> <span>${n.tags.map(t=>'#'+t).join(' ')}</span></li>`).join('');
})();
