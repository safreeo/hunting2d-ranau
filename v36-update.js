/* HUNTING 2D RANAU V36 — publish latest official roster to every device */
(function(){
  const rosterKey='h2d-ranau-official-roster-v36';
  if(!localStorage.getItem(rosterKey)){
    fetch('official-participants.csv?v=36',{cache:'no-store'})
      .then(r=>{if(!r.ok)throw new Error('Roster fetch failed');return r.text();})
      .then(t=>{
        const lines=t.replace(/\r/g,'').split('\n').slice(1).filter(x=>x.trim());
        const list=lines.map(line=>{
          const x=line.split(',');
          return {no:(x[0]||'').trim(),name:(x[1]||'').trim(),club:(x[2]||'').trim(),cat:(x[3]||'').trim(),group:String(x[4]||'').trim(),active:true};
        }).filter(p=>p.no&&p.name&&p.group&&(p.cat==='Lelaki'||p.cat==='Wanita'));
        if(list.length!==106) throw new Error('Unexpected roster count: '+list.length);
        S.participants=list;
        save();
        localStorage.setItem(rosterKey,'1');
        const text=document.body.innerText||'';
        if(typeof participants==='function' && /PARTICIPANTS/i.test(text)) participants('Group');
        else if(typeof groupSetup==='function' && /START SCORING/i.test(text)) groupSetup();
        else if(typeof scoring==='function' && /GROUP\s+\d+\s+-\s+\d+\/21/i.test(text)) scoring(window.scrollY||0);
      }).catch(err=>console.error('V36 roster:',err));
  }
})();
