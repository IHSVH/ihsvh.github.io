/* IHSVH — the Tree, drawn once. Geometry: hexagonal grid, Tiphareth at origin. */
window.TREE=(function(){
const R=40,H=R*Math.sqrt(3)/2,XY=(q,row)=>[q*R,row*H];
const S=[
 {k:'kether',col:'#EDE6D3',colt:'white',lt:false,n:1,q:0,row:-4,heb:'כתר',lat:'Kether',mean:'Crown',pillar:'mild',triad:'Supernal',world:'Atziluth',div:'אהיה',divt:'Eheieh',arch:'Metatron',sphere:'Primum Mobile',glyph:'☉'},
 {k:'chokmah',col:'#8A857A',colt:'grey',lt:false,n:2,q:1.5,row:-3,heb:'חכמה',lat:'Chokmah',mean:'Wisdom',pillar:'force',triad:'Supernal',world:'Atziluth · Briah',div:'יה',divt:'Yah',arch:'Raziel',sphere:'Sphere of the zodiac',glyph:'✶'},
 {k:'binah',col:'#26231E',colt:'black',lt:true,n:3,q:-1.5,row:-3,heb:'בינה',lat:'Binah',mean:'Understanding',pillar:'form',triad:'Supernal',world:'Atziluth · Briah',div:'יהוה אלהים',divt:'YHVH Elohim',arch:'Tzaphkiel',sphere:'Saturn',glyph:'♄'},
 {k:'daath',n:0,q:0,row:-2,heb:'דעת',lat:'Daath',mean:'Knowledge',pillar:'mild',world:'Briah'},
 {k:'chesed',col:'#4F6F9E',colt:'blue',lt:true,n:4,q:1.5,row:-1,heb:'חסד',lat:'Chesed',mean:'Mercy',pillar:'force',triad:'Ethical',world:'Briah · Yetzirah',div:'אל',divt:'El',arch:'Tzadkiel',sphere:'Jupiter',glyph:'♃'},
 {k:'geburah',col:'#B3483F',colt:'red',lt:true,n:5,q:-1.5,row:-1,heb:'גבורה',lat:'Geburah',mean:'Severity',pillar:'form',triad:'Ethical',world:'Briah · Yetzirah',div:'אלהים גבור',divt:'Elohim Gibor',arch:'Kamael',sphere:'Mars',glyph:'♂'},
 {k:'tiphareth',col:'#D9B84A',colt:'yellow',lt:false,n:6,q:0,row:0,heb:'תפארת',lat:'Tiphareth',mean:'Beauty',pillar:'mild',triad:'Ethical',world:'Yetzirah',div:'יהוה אלוה ודעת',divt:'YHVH Eloah va-Daath',arch:'Raphael',sphere:'Sun',glyph:'☉'},
 {k:'netzach',col:'#5C8A5E',colt:'green',lt:true,n:7,q:1.5,row:1,heb:'נצח',lat:'Netzach',mean:'Victory',pillar:'force',triad:'Astral',world:'Yetzirah · Assiah',div:'יהוה צבאות',divt:'YHVH Tzabaoth',arch:'Haniel',sphere:'Venus',glyph:'♀'},
 {k:'hod',col:'#CF8244',colt:'orange',lt:false,n:8,q:-1.5,row:1,heb:'הוד',lat:'Hod',mean:'Splendor',pillar:'form',triad:'Astral',world:'Yetzirah · Assiah',div:'אלהים צבאות',divt:'Elohim Tzabaoth',arch:'Michael',sphere:'Mercury',glyph:'☿'},
 {k:'yesod',col:'#7D5C9A',colt:'violet',lt:true,n:9,q:0,row:2,heb:'יסוד',lat:'Yesod',mean:'Foundation',pillar:'mild',triad:'Astral',world:'Assiah',div:'שדי אל חי',divt:'Shaddai El Chai',arch:'Gabriel',sphere:'Moon',glyph:'☽'},
 {k:'malkuth',col:'#B7A23C,#6E7238,#8B4A2E,#26231E',colt:'citrine, olive, russet, black',lt:true,n:10,q:0,row:4,heb:'מלכות',lat:'Malkuth',mean:'Kingdom',pillar:'mild',triad:'—',world:'Assiah',div:'אדני הארץ',divt:'Adonai ha-Aretz',arch:'Sandalphon',sphere:'Sphere of the elements',glyph:'⊕'},
];
S[0].glyph='⊚'; // Kether: Primum Mobile has no planet glyph
const byK=Object.fromEntries(S.map(s=>[s.k,s]));
const PC={Air:['#D9B84A','yellow'],Mercury:['#D9B84A','yellow'],Moon:['#4F6F9E','blue'],Venus:['#5C8A5E','green'],Aries:['#B3483F','red'],Taurus:['#C4663F','red-orange'],Gemini:['#CF8244','orange'],Cancer:['#D6A048','orange-yellow'],Leo:['#D9B84A','yellow'],Virgo:['#9DA84E','yellow-green'],Jupiter:['#7D5C9A','violet'],Libra:['#5C8A5E','green'],Water:['#4F6F9E','blue'],Scorpio:['#4E8A84','blue-green'],Sagittarius:['#4F6F9E','blue'],Capricorn:['#5F5A96','blue-violet'],Mars:['#B3483F','red'],Aquarius:['#7D5C9A','violet'],Pisces:['#9A5279','red-violet'],Sun:['#CF8244','orange'],Fire:['#B3483F','red'],Saturn:['#5F5A96','blue-violet']};
/* Colors: Case/BOTA scale — spheres per the B.O.T.A. Tree; paths per the twelve-color wheel of the attributions. */
const P=[
 [11,'א','Aleph','Ox','kether','chokmah','Mother','Air','0 The Fool'],
 [12,'ב','Beth','House','kether','binah','Double','Mercury','1 The Magician'],
 [13,'ג','Gimel','Camel','kether','tiphareth','Double','Moon','2 The High Priestess'],
 [14,'ד','Daleth','Door','chokmah','binah','Double','Venus','3 The Empress'],
 [15,'ה','Heh','Window','chokmah','tiphareth','Simple','Aries','4 The Emperor'],
 [16,'ו','Vav','Nail','chokmah','chesed','Simple','Taurus','5 The Hierophant'],
 [17,'ז','Zain','Sword','binah','tiphareth','Simple','Gemini','6 The Lovers'],
 [18,'ח','Cheth','Fence','binah','geburah','Simple','Cancer','7 The Chariot'],
 [19,'ט','Teth','Serpent','chesed','geburah','Simple','Leo','8 Strength'],
 [20,'י','Yod','Hand','chesed','tiphareth','Simple','Virgo','9 The Hermit'],
 [21,'כ','Kaph','Palm','chesed','netzach','Double','Jupiter','10 The Wheel of Fortune'],
 [22,'ל','Lamed','Ox-goad','geburah','tiphareth','Simple','Libra','11 Justice'],
 [23,'מ','Mem','Water','geburah','hod','Mother','Water','12 The Hanged Man'],
 [24,'נ','Nun','Fish','tiphareth','netzach','Simple','Scorpio','13 Death'],
 [25,'ס','Samekh','Prop','tiphareth','yesod','Simple','Sagittarius','14 Temperance'],
 [26,'ע','Ayin','Eye','tiphareth','hod','Simple','Capricorn','15 The Devil'],
 [27,'פ','Peh','Mouth','netzach','hod','Double','Mars','16 The Tower'],
 [28,'צ','Tzaddi','Fish-hook','netzach','yesod','Simple','Aquarius','17 The Star'],
 [29,'ק','Qoph','Back of head','netzach','malkuth','Simple','Pisces','18 The Moon'],
 [30,'ר','Resh','Head','hod','yesod','Double','Sun','19 The Sun'],
 [31,'ש','Shin','Tooth','hod','malkuth','Mother','Fire','20 Judgement'],
 [32,'ת','Tav','Mark','yesod','malkuth','Double','Saturn','21 The World'],
].map(([n,l,name,mean,a,b,kind,attr,key])=>({n,l,name,mean,a,b,kind,attr,key,col:PC[attr][0],colt:PC[attr][1],
  along:(byK[a].pillar===byK[b].pillar&&byK[a].q===byK[b].q)?byK[a].pillar:null}));
const PN={form:'Form',force:'Force',mild:'Mildness'};
const NS='http://www.w3.org/2000/svg';
/* Palette sampled from the reference plate: ground #1E1B16, line/ring white, label gold-brown #786851;
   four gradient spheres — Binah teal, Chokmah red→amber, Tiphareth orange→gold→green, Malkuth teal→slate→wine. Others hollow. */
const GRAD={ /* Case's scale, each hue taken from the plate's own colors */
 chokmah:['#6B7B86','#495A65','#3A4750'],      /* grey  → the plate's slate */
 binah:['#3A3532','#262220','#1E1B16'],        /* black → the ground itself */
 chesed:['#16A2A4','#296C77','#1E4F5C'],       /* blue  → the plate's deep teal */
 geburah:['#BF3829','#9A2F22','#75271D'],      /* red   → the plate's red */
 tiphareth:['#E0D79D','#C8AC4D','#CB783A'],    /* yellow→ the plate's gold */
 netzach:['#60B27E','#50B68E','#3F8F6A'],      /* green → the plate's green */
 hod:['#CF8E49','#CB783A','#B85A2E'],          /* orange→ the plate's amber */
 yesod:['#7A4A5A','#5B3338','#3F2630'],        /* violet→ the plate's wine */
};
const QUART=['#C8AC4D','#5F7A55','#75271D','#262220']; /* Malkuth: citrine, olive, russet, black — from the same set */
let gid=0;
const el=(t,a={})=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e;};
const LBL={13:[.17,1],25:[.32,1],27:[.42,-1],19:[.42,-1],14:[.42,-1],21:[.5,-1],23:[.5,1]};

/* opts: interactive, sphereText: 'number'|'hebrew'|'glyph'|null, pathText: 'number'|'letter'|null, onSphere, onPath */
function build(svg,o={}){
  const uid='g'+(gid++);const defs=el('defs');
  Object.entries(GRAD).forEach(([k,cs])=>{const lg=el('linearGradient',{id:uid+k,x1:0,y1:0,x2:0,y2:1});cs.forEach((c,i)=>lg.appendChild(el('stop',{offset:(i/(cs.length-1)),'stop-color':c})));defs.appendChild(lg);});
  svg.appendChild(defs);
  const g=el('g',{class:'layer L-grid'});
  for(let row=-4;row<=4;row++){const off=(row%2)?.5:0;for(let i=-4;i<=4;i++){const [x,y]=XY(i+off,row);if(Math.hypot(x,y)>139)continue;g.appendChild(el('circle',{class:'grid',cx:x,cy:y,r:R}));}}
  svg.appendChild(g);
  svg.appendChild(el('circle',{class:'bound',cx:0,cy:0,r:138.564}));
  const gw=el('g',{class:'layer L-worlds'});
  const WR=2*H,WC=[['ATZILUTH',-4,'fire'],['BRIAH',-2,'water'],['YETZIRAH',0,'air'],['ASSIAH',2,'earth']];
  WC.forEach(([t,row,elm])=>{const [,cy]=XY(0,row);gw.appendChild(el('circle',{class:'world',cx:0,cy,r:WR}));
    if(o.interactive){const x=el('text',{class:'wl',x:-150,y:cy+2,'text-anchor':'start'});x.textContent=t;gw.appendChild(x);
      const up=elm==='fire'||elm==='air',ty=cy+10,pts=up?`-150,${ty+6} -142,${ty+6} -146,${ty-1}`:`-150,${ty-1} -142,${ty-1} -146,${ty+6}`;
      gw.appendChild(el('polygon',{class:'elm',points:pts}));
      if(elm==='air'||elm==='earth')gw.appendChild(el('line',{class:'elm',x1:-150.5,x2:-141.5,y1:up?ty+3.2:ty+1.8,y2:up?ty+3.2:ty+1.8}));}});
  if(o.interactive){[['AIN',-186],['AIN SOPH',-176],['AIN SOPH AUR',-166]].forEach(([t,y],i)=>{const r=WR+ (i+1)*0;
    gw.appendChild(el('path',{class:'veil',d:`M-70,${y+8}Q0,${y-6} 70,${y+8}`}));const x=el('text',{class:'wl veilt',x:0,y:y+2,'text-anchor':'middle'});x.textContent=t;gw.appendChild(x);});}
  [[-60,'−'],[60,'+']].forEach(([x,t])=>{gw.appendChild(el('rect',{class:'pband',x:x-9,y:-104,width:18,height:262}));if(o.interactive){const s=el('text',{class:'psign',x,y:168,'text-anchor':'middle'});s.textContent=t;gw.appendChild(s);}});
  svg.appendChild(gw);
  const gp=el('g',{class:'layer L-pillars'});
  [['form',-60],['mild',0],['force',60]].forEach(([p,x])=>gp.appendChild(el('line',{class:'pill',x1:x,x2:x,y1:x?-103.923:-138.564,y2:x?34.641:138.564,stroke:`var(--${p})`})));
  svg.appendChild(gp);
  const gt=el('g',{class:'layer L-triads'});
  ['0,-138.564 60,-103.923 -60,-103.923','60,-34.641 -60,-34.641 0,0','60,34.641 -60,34.641 0,69.282'].forEach(pt=>gt.appendChild(el('polygon',{class:'tri',points:pt})));
  svg.appendChild(gt);
  const gd=el('g',{class:'layer L-descent'});
  const order=['kether','chokmah','binah','chesed','geburah','tiphareth','netzach','hod','yesod','malkuth'];
  gd.appendChild(el('path',{class:'flash',d:order.map((k,i)=>{const [x,y]=XY(byK[k].q,byK[k].row);return(i?'L':'M')+x.toFixed(2)+','+y.toFixed(2);}).join('')}));
  svg.appendChild(gd);
  const gP=el('g');
  P.forEach(p=>{
    const [x1,y1]=XY(byK[p.a].q,byK[p.a].row),[x2,y2]=XY(byK[p.b].q,byK[p.b].row);
    gP.appendChild(el('line',{class:'path k-'+p.kind+(p.along?' along-'+p.along:''),x1,y1,x2,y2,'data-p':p.n,style:'--c:'+p.col}));
    if(o.interactive){
      const hit=el('line',{class:'hit',x1,y1,x2,y2});hit.addEventListener('click',()=>o.onPath&&o.onPath(p.n));gP.appendChild(hit);
      if(o.pathText){
        const [t0,side]=LBL[p.n]||[.5,(p.n%2?1:-1)],dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy),s=side*6.5;
        const t=el('text',{class:'pl k-'+p.kind+(o.pathText==='letter'?' let':''),x:x1+dx*t0-dy/len*s,y:y1+dy*t0+dx/len*s+(o.pathText==='letter'?2.4:1.6),'text-anchor':'middle'});
        t.textContent=o.pathText==='letter'?p.l:p.n;gP.appendChild(t);
      }
    }
  });
  svg.appendChild(gP);
  const gS=el('g');
  S.forEach(s=>{
    const [x,y]=XY(s.q,s.row);
    const g=el('g',{class:'sph p-'+s.pillar+(s.k==='daath'?' daath':'')+(s.k!=='tiphareth'&&s.k!=='kether'&&s.k!=='daath'?' lt':''),'data-k':s.k});
    if(s.k==='daath'){
      if(o.interactive)g.appendChild(el('circle',{cx:x,cy:y,r:12,fill:'transparent',stroke:'none'}));
      g.appendChild(el('circle',{cx:x,cy:y,r:4.5}));
      if(o.interactive){const l=el('text',{class:'sub',x:x+18,y:y+2,'text-anchor':'start'});l.textContent='Daath';g.appendChild(l);}
    }else{
      if(s.k==='malkuth'){const q=el('g',{class:'quart'}),a=9.9;
        [[-a,-a,a,-a],[-a,a,-a,-a],[a,-a,a,a],[a,a,-a,a]].forEach(([x1,y1,x2,y2],i)=>q.appendChild(el('path',{fill:QUART[i],d:`M${x},${y}L${x+x1},${y+y1}A14,14 0 0 1 ${x+x2},${y+y2}Z`})));
        g.appendChild(q);g.appendChild(el('circle',{cx:x,cy:y,r:14,class:'hollow',style:'fill:none'}));}
      else g.appendChild(el('circle',{cx:x,cy:y,r:14,class:GRAD[s.k]?'grad':'hollow',style:GRAD[s.k]?`fill:url(#${uid}${s.k})`:''}));
      if(o.interactive&&o.sphereText){
        const m=o.sphereText;
        const top=el('text',{class:m==='hebrew'?'heb':m==='glyph'?'glyph':'n',x,y:y+(m==='glyph'?2.2:1.2),'text-anchor':'middle'});
        top.textContent=m==='hebrew'?s.heb:m==='glyph'?s.glyph:s.n;g.appendChild(top);
        const side=x<0?-1:1,lx=x+side*18,an=side<0?'end':'start';
        const l=el('text',{class:'lat',x:lx,y:y+.5,'text-anchor':an});l.textContent=s.lat.toUpperCase();g.appendChild(l);
        const sub=el('text',{class:'sub',x:lx,y:y+6,'text-anchor':an});sub.textContent=s.sphere+' · '+s.mean;g.appendChild(sub);
      }
    }
    if(o.interactive){g.setAttribute('tabindex',0);g.setAttribute('role','button');g.setAttribute('aria-label',s.lat);
      g.addEventListener('click',()=>o.onSphere&&o.onSphere(s.k));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();o.onSphere&&o.onSphere(s.k);}});}
    gS.appendChild(g);
  });
  svg.appendChild(gS);
}

/* views: [{id,label,cap,layers:['pillars',...]}] — one hero, thumbnails, exclusive */
function mount(page){
  const hero=document.getElementById('hero'),cap=document.getElementById('cap'),views=document.getElementById('views'),card=document.getElementById('card');
  const opts=Object.assign({interactive:true},page.draw);
  opts.onSphere=k=>page.sphere(k);opts.onPath=n=>page.path(n);
  build(hero,opts);
  const setLayers=(svg,v)=>['grid','pillars','triads','descent'].forEach(l=>svg.querySelector('.L-'+l).style.opacity=(v.layers||[]).includes(l)?1:0);
  function setView(id){
    const v=page.views.find(x=>x.id===id);
    hero.className.baseVal='hero v-'+id+(opts.pathColor?' c':'');setLayers(hero,v);
    if((v.layers||[]).includes('descent')){const f=hero.querySelector('.flash');f.style.animation='none';f.getBoundingClientRect();f.style.animation='';}
    cap.textContent=v.cap;views.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===id));
  }
  page.views.forEach(v=>{
    const b=document.createElement('button');b.type='button';b.dataset.v=v.id;b.setAttribute('aria-pressed','false');
    const sv=el('svg',{viewBox:'-100 -160 200 320',class:'v-'+v.id+(opts.pathColor?' c':''),'aria-hidden':'true'});build(sv,{});setLayers(sv,v);
    b.appendChild(sv);b.appendChild(document.createTextNode(v.label));b.addEventListener('click',()=>setView(v.id));views.appendChild(b);
  });
  setView(page.views[0].id);
  const clear=()=>hero.querySelectorAll('.on').forEach(e=>e.classList.remove('on'));
  const api={hero,card,clear,
    deselect(){clear();card.innerHTML='<p class="empty">Tap a sphere or a path.</p>';},
    markSphere(k){clear();hero.querySelector(`.sph[data-k="${k}"]`).classList.add('on');P.filter(p=>p.a===k||p.b===k).forEach(p=>hero.querySelector(`.path[data-p="${p.n}"]`).classList.add('on'));},
    markPath(n){clear();const p=P.find(x=>x.n===n);hero.querySelector(`.path[data-p="${n}"]`).classList.add('on');[p.a,p.b].forEach(k=>hero.querySelector(`.sph[data-k="${k}"]`).classList.add('on'));},
    head(title,heb,num){return `<div class="head"><div class="title">${title}<span class="hebrew">${heb}</span></div><div class="num">${num}</div></div>`;},
    dl(rows){return '<dl>'+rows.map(([t,d])=>`<dt>${t}</dt><dd>${d}</dd>`).join('')+'</dl>';},
  };
  api.deselect();
  document.addEventListener('click',e=>{if(e.target.closest('.sph,.hit,.card,.views,tr[data-k]'))return;if(hero.querySelector('.on'))api.deselect();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')api.deselect();});
  return api;
}
const daathCard=api=>api.head('Daath','דעת','—')+api.dl([
  ['Meaning','Knowledge'],
  ['What it is','A position, not an emanation: no number, no path, no name. The one grid-center on the middle pillar left empty, where the abyss lies between the supernal three and the seven below.'],
  ['Why marked','Chokmah and Binah meet here — knowledge is what wisdom and understanding produce in conjunction. Case reads it as a state of consciousness, not a sphere — documented.']]);
return {S,P,byK,PN,XY,build,mount,daathCard};
})();
