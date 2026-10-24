/* HUNTING 2D RANAU V45 — latest roster refresh + sticky headers + clean back control */
(function(){
  /* Force all devices to refresh the latest official roster once for V45. */
  async function syncOfficialRosterV45(){
    const r=await fetch('official-participants.csv?v=45&t='+Date.now(),{cache:'no-store'});
    if(!r.ok)throw new Error('Unable to load official roster');
    const text=await r.text();
    const rows=[];let row=[],cell='',q=false;
    for(let i=0;i<text.length;i++){
      const c=text[i],n=text[i+1];
      if(q){if(c==='"'&&n==='"'){cell+='"';i++;}else if(c==='"')q=false;else cell+=c;}
      else if(c==='"')q=true;
      else if(c===','){row.push(cell);cell='';}
      else if(c==='\n'){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell='';}
      else cell+=c;
    }
    if(cell||row.length){row.push(cell);rows.push(row);}
    const list=rows.slice(1).map(x=>({no:String(x[0]||'').trim(),name:String(x[1]||'').trim(),club:String(x[2]||'').trim(),cat:String(x[3]||'').trim(),group:String(x[4]||'').trim(),active:true})).filter(p=>p.no&&p.name&&Number(p.group)>=1&&Number(p.group)<=12);
    if(!list.length)throw new Error('Official roster is empty');
    S.participants=list;save();localStorage.setItem('h2d-ranau-roster-version','45');
    return list;
  }

  const css=document.createElement('style');
  css.textContent=`
    /* Every standard page header stays at the top while content scrolls. */
    .v7-head{position:sticky!important;position:-webkit-sticky!important;top:0!important;z-index:3000!important}
    /* Back control: symbol only, no surrounding box. */
    .v7-head .v7-back,.v7-head button.v7-back{background:transparent!important;border:0!important;outline:0!important;box-shadow:none!important;border-radius:0!important;padding:0!important}
  `;
  document.head.appendChild(css);

  syncOfficialRosterV45().then(()=>{
    const title=(document.querySelector('.v7-head h2')?.textContent||'').trim();
    if(title==='START SCORING'&&typeof groupSetup==='function')groupSetup();
    else if(title==='PARTICIPANTS'&&typeof participants==='function')participants('Group');
  }).catch(console.error);
})();
