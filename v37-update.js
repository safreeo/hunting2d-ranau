/* HUNTING 2D RANAU V37 — repair roster load, Continue and scoring Group Result */
(function(){
  const GROUPS=Array.from({length:12},(_,i)=>String(i+1));
  const catFor=g=>(+g<=8?'Lelaki':'Wanita');
  const countFor=g=>S.participants.filter(p=>p.active!==false&&String(p.group)===String(g)).length;
  const options=(sel='1')=>GROUPS.map(g=>`<option value="${g}" ${String(sel)===g?'selected':''}>Group ${g} (${catFor(g)}) — ${countFor(g)} orang</option>`).join('');

  function parseCSV(text){
    const rows=[];let row=[],cell='',q=false;
    for(let i=0;i<text.length;i++){
      const c=text[i],n=text[i+1];
      if(q){if(c==='"'&&n==='"'){cell+='"';i++;}else if(c==='"')q=false;else cell+=c;}
      else if(c==='"')q=true;else if(c===','){row.push(cell);cell='';}else if(c==='\n'){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell='';}else cell+=c;
    }
    if(cell||row.length){row.push(cell);rows.push(row);}return rows;
  }
  function loadRoster(){
    return fetch('official-participants.csv?v=37',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('roster');return r.text();}).then(t=>{
      const rows=parseCSV(t).slice(1);const list=rows.map(x=>({no:String(x[0]||'').trim(),name:String(x[1]||'').trim(),club:String(x[2]||'').trim(),cat:String(x[3]||'').trim(),group:String(x[4]||'').trim(),active:true})).filter(p=>p.no&&p.name&&GROUPS.includes(p.group));
      if(list.length!==106)throw Error('count '+list.length);
      S.participants=list;save();localStorage.setItem('h2d-ranau-official-roster-v37','1');return list;
    });
  }
  if(!localStorage.getItem('h2d-ranau-official-roster-v37')||S.participants.length!==106){loadRoster().then(()=>{const t=document.body.innerText||'';if(/START SCORING/i.test(t))groupSetup();else if(/PARTICIPANTS/i.test(t))participants('Group');}).catch(console.error);}

  begin=function(){
    const g=String(document.getElementById('g')?.value||'1');const cp=+(document.getElementById('scp')?.value||1);
    const go=()=>{const members=S.participants.filter(p=>p.active!==false&&String(p.group)===g);if(!members.length){if(typeof v26Dialog==='function')v26Dialog('Start Scoring',`Group ${g} belum mempunyai peserta.`,[{label:'OK',action:'closeV26Dialog()'}]);return;}S.group=g;S.startCP=cp;S.cp=cp;selected=null;save();scoring();};
    if(!S.participants.length)loadRoster().then(go).catch(()=>go());else go();
  };
  groupSetup=function(){const sg=GROUPS.includes(String(S.group))?String(S.group):'1';page(`${head('START SCORING')}<div class="card v29-group-setup"><label>Select Group</label><select id="g">${options(sg)}</select><label>Starting Checkpoint</label><select id="scp">${Array.from({length:21},(_,i)=>`<option value="${i+1}" ${i+1===S.startCP?'selected':''}>CP ${i+1}</option>`).join('')}</select><button class="btn" type="button" onclick="begin()">CONTINUE</button><p class="muted v29-note">Setiap kumpulan boleh bermula dari mana-mana checkpoint. Selepas CP21, aplikasi akan bersambung semula dari CP1 sehingga semua checkpoint selesai.</p></div>`);};
  openGroupResultV25=function(){const sg=GROUPS.includes(String(S.group))?String(S.group):'1';page(`${head('GROUP RESULT')}<div class="card v25-group-picker"><label>Pilih Group</label><select id="v25group">${options(sg)}</select><button class="btn green" onclick="selectGroupResultV25()">VIEW GROUP RESULT</button></div>`);};

  function ensureResult(){const dock=document.querySelector('body > .score-fixed-bottom');if(!dock)return;let b=document.getElementById('v37-group-result');if(!b){document.getElementById('v30-group-result')?.remove();document.querySelector('body > .v6-fixed-result')?.remove();b=document.createElement('button');b.id='v37-group-result';b.textContent='GROUP RESULT';b.onclick=()=>groupResult();document.body.appendChild(b);}b.style.display='flex';dock.classList.add('v37-dock');}
  const oldPage=page;page=function(x){document.getElementById('v37-group-result')?.remove();return oldPage(x);};
  const oldScoring=scoring;scoring=function(y=null){oldScoring(y);requestAnimationFrame(()=>requestAnimationFrame(ensureResult));};

  const css=document.createElement('style');css.textContent=`
    body>#v37-group-result{position:fixed!important;left:50%!important;bottom:8px!important;transform:translateX(-50%)!important;width:48%!important;max-width:360px!important;height:42px!important;border:0!important;border-radius:12px!important;background:#159b68!important;color:#fff!important;font-size:1rem!important;font-weight:1000!important;display:flex;align-items:center;justify-content:center;z-index:2147483640!important;box-shadow:0 3px 8px #0003!important}
    body>.score-fixed-bottom.v37-dock{padding-bottom:58px!important;background:#0b4778!important}
  `;document.head.appendChild(css);
})();
