/* HUNTING 2D RANAU V38 — robust official roster sync + scoring controls repair */
(function(){
  const GROUPS=Array.from({length:12},(_,i)=>String(i+1));
  const catFor=g=>(Number(g)<=8?'Lelaki':'Wanita');
  const countFor=g=>S.participants.filter(p=>p.active!==false&&String(p.group)===String(g)).length;
  const groupOptions=(selected='1')=>GROUPS.map(g=>`<option value="${g}" ${String(selected)===g?'selected':''}>Group ${g} (${catFor(g)}) — ${countFor(g)} orang</option>`).join('');

  function parseCSV38(text){
    const rows=[];let row=[],cell='',quoted=false;
    for(let i=0;i<text.length;i++){
      const c=text[i],n=text[i+1];
      if(quoted){if(c==='"'&&n==='"'){cell+='"';i++;}else if(c==='"')quoted=false;else cell+=c;}
      else if(c==='"')quoted=true;
      else if(c===','){row.push(cell);cell='';}
      else if(c==='\n'){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell='';}
      else cell+=c;
    }
    if(cell||row.length){row.push(cell);rows.push(row);}return rows;
  }

  window.syncOfficialRosterV38=async function(){
    const r=await fetch('official-participants.csv?v=38&t='+Date.now(),{cache:'no-store'});
    if(!r.ok)throw new Error('Unable to load official roster');
    const rows=parseCSV38(await r.text()).slice(1);
    const list=rows.map(x=>({no:String(x[0]||'').trim(),name:String(x[1]||'').trim(),club:String(x[2]||'').trim(),cat:String(x[3]||'').trim(),group:String(x[4]||'').trim(),active:true})).filter(p=>p.no&&p.name&&GROUPS.includes(p.group));
    if(list.length!==106)throw new Error('Official roster count: '+list.length);
    S.participants=list;save();localStorage.setItem('h2d-ranau-roster-version','38');return list;
  };

  /* Always refresh roster once for this release on every device, while keeping scores intact. */
  if(localStorage.getItem('h2d-ranau-roster-version')!=='38'||S.participants.length!==106){
    syncOfficialRosterV38().then(()=>{
      const title=(document.querySelector('.v7-head h2')?.textContent||'').trim();
      if(title==='START SCORING') groupSetup();
      else if(title==='PARTICIPANTS') participants('Group');
    }).catch(console.error);
  }

  window.beginV38=async function(){
    const g=String(document.getElementById('g')?.value||'1');
    const cp=Number(document.getElementById('scp')?.value||1);
    if(!S.participants.length||S.participants.length!==106){try{await syncOfficialRosterV38();}catch(e){console.error(e);}}
    const members=S.participants.filter(p=>p.active!==false&&String(p.group)===g);
    if(!members.length){
      if(typeof v26Dialog==='function')v26Dialog('Start Scoring',`Group ${g} belum mempunyai peserta.`,[{label:'OK',action:'closeV26Dialog()'}]);
      return;
    }
    S.group=g;S.startCP=cp;S.cp=cp;selected=null;save();scoring();
  };
  begin=beginV38;

  groupSetup=function(){
    const sg=GROUPS.includes(String(S.group))?String(S.group):'1';
    page(`${head('START SCORING')}<div class="card v29-group-setup"><label>Select Group</label><select id="g">${groupOptions(sg)}</select><label>Starting Checkpoint</label><select id="scp">${Array.from({length:21},(_,i)=>`<option value="${i+1}" ${i+1===Number(S.startCP||1)?'selected':''}>CP ${i+1}</option>`).join('')}</select><button class="btn v38-continue" type="button" onclick="beginV38()">CONTINUE</button><p class="muted v29-note">Setiap kumpulan boleh bermula dari mana-mana checkpoint. Selepas CP21, aplikasi akan bersambung semula dari CP1 sehingga semua checkpoint selesai.</p></div>`);
  };

  openGroupResultV25=function(){
    const sg=GROUPS.includes(String(S.group))?String(S.group):'1';
    page(`${head('GROUP RESULT')}<div class="card v25-group-picker"><label>Pilih Group</label><select id="v25group">${groupOptions(sg)}</select><button class="btn green" onclick="selectGroupResultV25()">VIEW GROUP RESULT</button></div>`);
  };

  function installResultButton(){
    document.getElementById('v37-group-result')?.remove();
    document.getElementById('v38-group-result')?.remove();
    const dock=document.querySelector('body > .score-fixed-bottom');
    if(!dock)return;
    const b=document.createElement('button');
    b.id='v38-group-result';b.type='button';b.textContent='GROUP RESULT';b.onclick=()=>groupResult();
    dock.appendChild(b);dock.classList.add('v38-dock');
  }
  const scoringBeforeV38=scoring;
  scoring=function(y=null){scoringBeforeV38(y);requestAnimationFrame(()=>requestAnimationFrame(installResultButton));};

  const css=document.createElement('style');css.textContent=`
    .v38-continue{cursor:pointer!important;pointer-events:auto!important}
    body>.score-fixed-bottom.v38-dock{box-sizing:border-box!important;padding-bottom:10px!important;background:#0b4778!important;height:auto!important;min-height:0!important}
    body>.score-fixed-bottom.v38-dock #v38-group-result{display:flex!important;align-items:center!important;justify-content:center!important;width:46%!important;max-width:330px!important;height:40px!important;min-height:40px!important;margin:10px auto 0!important;padding:0 14px!important;border:0!important;border-radius:12px!important;background:#159b68!important;color:#fff!important;font-size:1rem!important;font-weight:1000!important;box-shadow:0 3px 8px #0003!important}
  `;document.head.appendChild(css);
})();
