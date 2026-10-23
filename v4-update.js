/* HUNTING 2D SCORE V4 — stable scroll + per-archer Submit CP */
let h2dPendingArcher=null;
function completedCPCountH2D(){let n=0;for(let c=1;c<=21;c++)if(cpDone(c))n++;return n}
function captureScrollH2D(){return window.scrollY||document.documentElement.scrollTop||0}
function restoreScrollH2D(y){requestAnimationFrame(()=>window.scrollTo({top:y,left:0,behavior:'auto'}))}

scoring=function(keepY=null){
  const arch=groupArchers();if(!arch.length){groupSetup();return}
  const cps=Array.from({length:21},(_,i)=>{const c=i+1;return `<button class="cp-mini ${cpDone(c)?'done':''} ${c===S.cp?'current':''}" onclick="goCP(${c})">${c}</button>`}).join('');
  const cards=arch.map((p,i)=>{const v=vals(p,S.cp),cpTotal=v.reduce((s,x)=>s+(+x||0),0),grand=archerTotalH2D(p);return `<div class="scorecard compact-scorecard" data-no="${esc(p.no)}"><div class="scoretop"><span>${esc(p.no)} • ${esc(p.name)}<small class="club-line">${esc(p.club||'—')}</small></span><span>${p.cat}</span></div><div class="score-labels"><span>A1</span><span>A2</span><span>A3</span><span>CP</span><span>Total</span></div><div class="score-five">${v.map((x,j)=>`<button class="arrow-mini ${scoreClassH2D(x)} ${selectedHereH2D(p,j)?'active-cell':''}" onclick="pickH2D(${i},${j},this)">${x||'—'}</button>`).join('')}<div class="cp-total">${cpTotal}</div><div class="grand-total">${grand}</div></div></div>`}).join('');
  page(`<div class="scoring-shell"><div class="score-fixed-top"><div class="score-title-row"><div class="group-progress">GROUP ${esc(S.group)} - ${completedCPCountH2D()}/21</div><button class="score-home" onclick="home()">⌂</button></div><div class="cp-strip">${cps}</div><div class="cp-legend"><span><i class="dot done-dot"></i>Completed</span><span><i class="dot current-dot"></i>Current CP</span><span><i class="dot incomplete-dot"></i>Incomplete</span></div></div><div class="score-body">${cards}</div><div class="score-fixed-bottom"><div class="keypad compact-keypad"><button class="key k8" onclick="keyH2D('8')">8</button><button class="key k5" onclick="keyH2D('5')">5</button><button class="key k3" onclick="keyH2D('3')">3</button><button class="key km" onclick="keyH2D('M')">M</button></div><div class="score-actions"><button class="mini-action" onclick="undoH2D()">UNDO</button><button class="mini-action ${editModeH2D?'editing':''}" onclick="toggleEditH2D()">EDIT</button><button class="mini-action submit" onclick="submitCPH2D()">SUBMIT CP</button></div></div></div>`);
  if(selected===null&&h2dPendingArcher===null){const ni=nextIncompleteArcherH2D();if(ni>=0)selectWithoutScrollH2D(ni)}
  if(keepY!==null)restoreScrollH2D(keepY);
};

keyH2D=function(v){
  if(!selected)return;const y=captureScrollH2D(),arch=groupArchers(),p=arch.find(x=>x.no===selected.no);if(!p)return;
  const a=vals(p,S.cp).slice();a[selected.idx]=v;S.scores[sid(p,S.cp)]=a;save();
  const ni=a.findIndex(x=>x==='');
  if(ni>=0){selected={no:p.no,idx:ni};h2dPendingArcher=null}else{selected={no:p.no,idx:2};h2dPendingArcher=p.no}
  scoring(y);
};

submitCPH2D=function(){
  const y=captureScrollH2D(),arch=groupArchers();
  if(h2dPendingArcher){
    const ai=arch.findIndex(p=>p.no===h2dPendingArcher);let next=null;
    for(let i=ai+1;i<arch.length;i++){if(!done(arch[i],S.cp)){next=arch[i];break}}
    if(!next){for(let i=0;i<ai;i++){if(!done(arch[i],S.cp)){next=arch[i];break}}}
    h2dPendingArcher=null;
    if(next){selected={no:next.no,idx:vals(next,S.cp).findIndex(x=>x==='')};scoring(y);return}
  }
  const missing=arch.filter(p=>!done(p,S.cp));
  if(missing.length){const first=missing[0],idx=arch.findIndex(p=>p.no===first.no);selected={no:first.no,idx:vals(first,S.cp).findIndex(x=>x==='')};scoring(y);return}
  editModeH2D=false;let c=S.cp;for(let n=0;n<21;n++){c=c===21?1:c+1;if(!cpDone(c)){S.cp=c;selected=null;h2dPendingArcher=null;save();scoring();return}}
  selected=null;h2dPendingArcher=null;save();groupResult();
};

goCP=function(c){S.cp=c;selected=null;h2dPendingArcher=null;editModeH2D=false;save();scoring()};

const v4Style=document.createElement('style');v4Style.textContent=`
.group-progress{font-size:1.18rem;font-weight:950;letter-spacing:.01em}.score-title-row{height:46px}.cp-strip{grid-template-columns:repeat(7,minmax(0,1fr));gap:4px}.cp-mini{height:34px;border-radius:7px;font-size:.76rem}.cp-mini.current{background:#8fc9ff!important;color:#082b4d!important;border-color:#4ba1ef!important;outline:none}.cp-legend{font-size:.75rem;gap:12px;margin-top:6px;white-space:nowrap}.dot{width:10px;height:10px}.current-dot{background:#8fc9ff;border:1px solid #4ba1ef}.score-fixed-top{padding-bottom:7px}.scoring-shell{padding-top:184px}.mini-action.submit{background:#178b5b;color:#fff}.score-five{grid-template-columns:repeat(3,minmax(0,1fr)) 48px 54px}.arrow-mini,.cp-total,.grand-total{height:36px}.compact-scorecard{scroll-margin-top:190px}
@media(max-width:390px){.group-progress{font-size:1.08rem}.cp-mini{height:32px;font-size:.72rem}.cp-legend{font-size:.69rem;gap:8px}.scoring-shell{padding-top:178px}}
`;document.head.appendChild(v4Style);
