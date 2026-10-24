/* HUNTING 2D RANAU V35 — force corrected roster + fix UNDO order */
(function(){
  /* Always refresh the official roster for V35 so older phones receive corrections such as L008. Preserve scores. */
  const rosterKey='h2d-ranau-official-roster-v35';
  if(!localStorage.getItem(rosterKey)){
    fetch('official-participants.csv?v=35',{cache:'no-store'}).then(r=>r.text()).then(t=>{
      const lines=t.replace(/\r/g,'').split('\n').slice(1).filter(line=>line.trim());
      const list=lines.map(line=>{
        const x=line.split(',');
        return {no:(x[0]||'').trim(),name:(x[1]||'').trim(),club:(x[2]||'').trim(),cat:(x[3]||'').trim(),group:String(x[4]||'').trim(),active:true};
      }).filter(p=>p.no&&p.name&&p.group&&(p.cat==='Lelaki'||p.cat==='Wanita'));
      if(!list.length)return;
      S.participants=list;
      save();
      localStorage.setItem(rosterKey,'1');
      if(typeof participants==='function' && /PARTICIPANTS/i.test(document.body.innerText)) participants('Group');
      else if(typeof scoring==='function' && /GROUP\s+\d+\s+-\s+\d+\/21/i.test(document.body.innerText)) scoring(window.scrollY||0);
    }).catch(()=>{});
  }

  /* Undo must remove the most recently keyed arrow: 8,5,3 -> undo 3, then 5, then 8. */
  undoH2D=function(){
    const arch=groupArchers();
    let p=selected?arch.find(x=>x.no===selected.no):null;
    if(!p && h2dPendingArcher) p=arch.find(x=>x.no===h2dPendingArcher);
    if(!p) p=arch.slice().reverse().find(x=>vals(x,S.cp).some(v=>v!==''));
    if(!p)return;
    const a=vals(p,S.cp).slice();
    let i=-1;
    if(h2dPendingArcher===p.no && a[2]!=='') i=2;
    else if(selected && selected.no===p.no){
      const before=Math.min(2,Math.max(0,selected.idx-1));
      for(let j=before;j>=0;j--){if(a[j]!==''){i=j;break}}
      if(i<0) for(let j=2;j>=0;j--){if(a[j]!==''){i=j;break}}
    } else {
      for(let j=2;j>=0;j--){if(a[j]!==''){i=j;break}}
    }
    if(i<0)return;
    a[i]='';
    S.scores[sid(p,S.cp)]=a;
    selected={no:p.no,idx:i};
    h2dPendingArcher=null;
    save();
    scoring(window.scrollY||0);
  };
})();
