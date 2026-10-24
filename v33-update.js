/* HUNTING 2D RANAU V33 — corrected official roster */
(function(){
  const rosterKey='h2d-ranau-official-roster-v33';
  if(localStorage.getItem(rosterKey)) return;
  fetch('official-participants.csv?v=33',{cache:'no-store'}).then(r=>r.text()).then(t=>{
    const lines=t.replace(/\r/g,'').split('\n').slice(1).filter(Boolean);
    const list=lines.map(line=>{
      const x=line.split(',');
      return {no:(x[0]||'').trim(),name:(x[1]||'').trim(),club:(x[2]||'').trim(),cat:(x[3]||'').trim(),group:String(x[4]||'').trim(),active:true};
    }).filter(p=>p.no&&p.name&&p.group);
    if(!list.length)return;
    S.participants=list;
    S.scores={};
    S.group=null;
    S.cp=1;
    S.startCP=1;
    selected=null;
    save();
    localStorage.setItem(rosterKey,'1');
    if(typeof participants==='function' && document.querySelector('.v26-part-list')) participants('Group');
  }).catch(()=>{});
})();