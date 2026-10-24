/* HUNTING 2D RANAU V39 — scoring repair + official roster refresh */
(function(){
  const GROUPS=Array.from({length:12},(_,i)=>String(i+1));
  const catFor=g=>Number(g)<=8?'Lelaki':'Wanita';
  const countFor=g=>S.participants.filter(p=>p.active!==false&&String(p.group)===String(g)).length;
  const options=(selected='1')=>GROUPS.map(g=>`<option value="${g}" ${String(selected)===g?'selected':''}>Group ${g} (${catFor(g)}) — ${countFor(g)} orang</option>`).join('');

  function parseCSV39(text){
    const rows=[];let row=[],cell='',q=false;
    for(let i=0;i<text.length;i++){
      const c=text[i],n=text[i+1];
      if(q){if(c==='"'&&n==='"'){cell+='"';i++;}else if(c==='"')q=false;else cell+=c;}
      else if(c==='"')q=true;else if(c===','){row.push(cell);cell='';}
      else if(c==='\n'){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell='';}
      else cell+=c;
    }
    if(cell||row.length){row.push(cell);rows.push(row);}return rows;
  }

  window.syncOfficialRosterV39=async function(){
    const r=await fetch('official-participants.csv?v=39&t='+Date.now(),{cache:'no-store'});
    if(!r.ok)throw new Error('Unable to load official roster');
    const rows=parseCSV39(await r.text()).slice(1);
    const list=rows.map(x=>({no:String(x[0]||'').trim(),name:String(x[1]||'').trim(),club:String(x[2]||'').trim(),cat:String(x[3]||'').trim(),group:String(x[4]||'').trim(),active:true})).filter(p=>p.no&&p.name&&GROUPS.includes(p.group));
    if(!list.length)throw new Error('Official roster is empty');
    S.participants=list;save();localStorage.setItem('h2d-ranau-roster-version','39');return list;
  };

  syncOfficialRosterV39().then(()=>{
    const title=(document.querySelector('.v7-head h2')?.textContent||'').trim();
    if(title==='START SCORING')groupSetup();
    else if(title==='PARTICIPANTS' && typeof participants==='function')participants('Group');
  }).catch(console.error);

  window.beginV39=async function(){
    const g=String(document.getElementById('g')?.value||'1');
    const cp=Number(document.getElementById('scp')?.value||1);
    try{await syncOfficialRosterV39();}catch(e){console.error(e);}
    const members=S.participants.filter(p=>p.active!==false&&String(p.group)===g);
    if(!members.length){
      if(typeof v26Dialog==='function')v26Dialog('Start Scoring',`Group ${g} belum mempunyai peserta.`,[{label:'OK',action:'closeV26Dialog()'}]);
      return;
    }
    S.group=g;S.startCP=cp;S.cp=cp;selected=null;save();scoring();
  };
  begin=beginV39;

  groupSetup=function(){
    const sg=GROUPS.includes(String(S.group))?String(S.group):'1';
    page(`${head('START SCORING')}<div class="card v29-group-setup"><label>Select Group</label><select id="g">${options(sg)}</select><label>Starting Checkpoint</label><select id="scp">${Array.from({length:21},(_,i)=>`<option value="${i+1}" ${i+1===Number(S.startCP||1)?'selected':''}>CP ${i+1}</option>`).join('')}</select><button class="btn v39-continue" type="button" onclick="beginV39()">CONTINUE</button><p class="muted v29-note">Setiap kumpulan boleh bermula dari mana-mana checkpoint. Selepas CP21, aplikasi akan bersambung semula dari CP1 sehingga semua checkpoint selesai.</p></div>`);
  };

  openGroupResultV25=function(){
    const sg=GROUPS.includes(String(S.group))?String(S.group):'1';
    page(`${head('GROUP RESULT')}<div class="card v25-group-picker"><label>Pilih Group</label><select id="v25group">${options(sg)}</select><button class="btn green" onclick="selectGroupResultV25()">VIEW GROUP RESULT</button></div>`);
  };

  function removeV39Result(){document.getElementById('v39-result-wrap')?.remove();}
  function installV39Result(){
    removeV39Result();
    document.getElementById('v38-group-result')?.remove();
    document.getElementById('v37-group-result')?.remove();
    document.querySelector('body > .v6-fixed-result')?.remove();
    const dock=document.querySelector('body > .score-fixed-bottom');if(!dock)return;
    const wrap=document.createElement('div');wrap.id='v39-result-wrap';
    const b=document.createElement('button');b.type='button';b.textContent='GROUP RESULT';b.onclick=()=>groupResult();
    wrap.appendChild(b);document.body.appendChild(wrap);dock.classList.add('v39-dock');
  }
  const oldPage39=page;
  page=function(x){removeV39Result();return oldPage39(x);};
  const oldScoring39=scoring;
  scoring=function(y=null){oldScoring39(y);requestAnimationFrame(()=>requestAnimationFrame(installV39Result));};

  const css=document.createElement('style');css.textContent=`
    .v39-continue{pointer-events:auto!important;cursor:pointer!important}
    body>.score-fixed-bottom.v39-dock{bottom:52px!important;background:#0b4778!important;padding-bottom:8px!important}
    body>#v39-result-wrap{position:fixed!important;left:0!important;right:0!important;bottom:0!important;height:60px!important;background:#0b4778!important;z-index:2147483639!important;display:flex!important;align-items:flex-start!important;justify-content:center!important;padding-top:4px!important;box-sizing:border-box!important}
    body>#v39-result-wrap button{width:42%!important;max-width:300px!important;height:40px!important;min-height:40px!important;border:0!important;border-radius:12px!important;background:#159b68!important;color:#fff!important;font-size:1rem!important;font-weight:1000!important;box-shadow:0 3px 8px #0003!important}
    .scoring-shell{padding-bottom:250px!important}
  `;document.head.appendChild(css);
})();
