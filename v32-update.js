/* HUNTING 2D RANAU V32 — official roster + groups 1-8 Lelaki / 9-12 Wanita + contact */
(function(){
  const G=Array.from({length:12},(_,i)=>String(i+1));
  const cat=g=>(+g>=9?'Wanita':'Lelaki');
  const cnt=g=>S.participants.filter(p=>p.active!==false&&String(p.group)===String(g)).length;
  const opts=(sel='1',category=null)=>{
    const a=category==='Lelaki'?G.slice(0,8):category==='Wanita'?G.slice(8):G;
    return a.map(g=>`<option value="${g}" ${String(sel)===g?'selected':''}>Group ${g} (${cat(g)}) — ${cnt(g)} orang</option>`).join('');
  };

  /* Official list is shipped with the PWA so every user sees the same initial participants. */
  const rosterKey='h2d-ranau-official-roster-v32';
  if(!localStorage.getItem(rosterKey)){
    fetch('official-participants.csv?v=32').then(r=>r.text()).then(t=>{
      const lines=t.replace(/\r/g,'').split('\n').slice(1).filter(Boolean);
      const list=lines.map(line=>{
        const x=line.split(','); return {no:x[0],name:x[1],club:x[2]||'',cat:x[3],group:String(x[4]),active:true};
      }).filter(p=>p.name&&p.group);
      if(list.length){S.participants=list;S.scores={};S.group=null;S.cp=1;S.startCP=1;selected=null;save();localStorage.setItem(rosterKey,'1');if(document.querySelector('.v26-part-list'))participants('Group');}
    }).catch(()=>{});
  }

  groupSetup=function(){const sg=G.includes(String(S.group))?String(S.group):'1';page(`${head('START SCORING')}<div class="card v29-group-setup"><label>Select Group</label><select id="g">${opts(sg)}</select><label>Starting Checkpoint</label><select id="scp">${Array.from({length:21},(_,i)=>`<option value="${i+1}" ${i+1===S.startCP?'selected':''}>CP ${i+1}</option>`).join('')}</select><button class="btn" onclick="begin()">CONTINUE</button><p class="muted v29-note">Setiap kumpulan boleh bermula dari mana-mana checkpoint. Selepas CP21, aplikasi akan bersambung semula dari CP1 sehingga semua checkpoint selesai.</p></div>`);};
  openGroupResultV25=function(){const sg=G.includes(String(S.group))?String(S.group):'1';page(`${head('GROUP RESULT')}<div class="card v25-group-picker"><label>Pilih Group</label><select id="v25group">${opts(sg)}</select><button class="btn green" onclick="selectGroupResultV25()">VIEW GROUP RESULT</button></div>`);};

  window.syncGroupOptionsV29=function(id,category,selected){const el=document.getElementById(id);if(el)el.innerHTML=opts(selected||'',category);};
  addP=function(){page(`${head('ADD PARTICIPANT','participants()')}<div class="card v10-form"><label>Nama</label><input id="pname" type="text" placeholder="Masukkan nama peserta"><label>Kelab</label><input id="pclub" type="text" placeholder="Masukkan nama kelab"><label>Kategori</label><select id="pcat" onchange="syncGroupOptionsV29('pgroup',this.value)"><option>Lelaki</option><option>Wanita</option></select><label>Group</label><select id="pgroup">${opts('1','Lelaki')}</select><button class="btn green" onclick="saveParticipantV10()">SAVE PARTICIPANT</button></div>`);};
  editP=function(i){const p=S.participants[i];if(!p)return;page(`${head('EDIT PARTICIPANT','participants()')}<div class="card v10-form v25-edit-form"><label>No. Peserta</label><input id="peno" value="${esc(p.no||'')}"><label>Nama</label><input id="pname" value="${esc(p.name||'')}"><label>Kelab</label><input id="pclub" value="${esc(p.club||'')}"><label>Kategori</label><select id="pcat" onchange="syncGroupOptionsV29('pgroup',this.value)"><option value="Lelaki" ${p.cat==='Lelaki'?'selected':''}>Lelaki</option><option value="Wanita" ${p.cat==='Wanita'?'selected':''}>Wanita</option></select><label>Group</label><select id="pgroup">${opts(String(p.group),p.cat)}</select><label class="v25-active-label"><input id="pactive" type="checkbox" ${p.active===false?'':'checked'}> Peserta Aktif</label><button class="btn green" onclick="saveEditParticipantV25(${i})">SAVE CHANGES</button><button class="btn soft" onclick="participants()">CANCEL</button><button class="btn v26-delete" onclick="confirmDeleteParticipantV26(${i})">DELETE PARTICIPANT</button></div>`);};

  const oldParticipants=participants;
  participants=function(view){if(view!=='Group')return oldParticipants(view);const ix=S.participants.map((p,i)=>({p,i}));const rows=a=>a.map(({p,i})=>`<div class="participant v26-participant"><b>${esc(p.no)}</b><div><b>${esc(p.name)}</b><div class="muted">${esc(p.club||'—')} • ${p.cat} • Group ${esc(p.group)}</div></div><button onclick="editP(${i})">Edit</button></div>`).join('');const body=G.map(g=>`<section class="v26-group-section"><div class="v26-group-title v29-group-title"><span>GROUP ${g} (${cat(g).toUpperCase()})</span><b>${cnt(g)} orang</b></div>${rows(ix.filter(x=>String(x.p.group)===g))||'<div class="v29-empty-group">Tiada peserta</div>'}</section>`).join('');page(`${head('PARTICIPANTS')}<div class="v26-part-tabs"><button onclick="participants('Lelaki')">Lelaki</button><button onclick="participants('Wanita')">Wanita</button><button class="active" onclick="participants('Group')">Group</button></div><div class="card v26-part-list">${body}</div><div class="v26-part-bottom"><button onclick="addP()">ADD PARTICIPANT</button><button onclick="openImportV26()">IMPORT LIST</button></div>`);};

  eventInfo=function(){page(`<div class="v7-page event-info-page">${head('EVENT INFO')}<div class="v7-info-card"><h3>HUNTING 2D RANAU 2026</h3><div class="v7-info-row"><span>Tarikh</span><i>:</i><b>25 October 2026 (Ahad)</b></div><div class="v7-info-row"><span>Masa</span><i>:</i><b>7.30 pagi</b></div><div class="v7-info-row"><span>Tempat</span><i>:</i><b>Sobou Range,<br>Kampung Lasing, Ranau.</b></div><div class="v7-info-row"><span>Penganjur</span><i>:</i><b>Kinabalu Traditional Archery Club Ranau (KTACR)</b></div><div class="v7-divider"></div><h4>FORMAT PERTANDINGAN</h4><div class="v7-format"><span>Kategori</span><i>:</i><b>Lelaki &amp; Wanita</b><span>Checkpoints</span><i>:</i><b>21</b><span>Arrows/CP</span><i>:</i><b>3</b><span>Distance</span><i>:</i><b>7 ~ 20 meter</b><span>Scoring Matrix</span><i>:</i><b>8, 5, 3, M</b><span>Tie-break</span><i>:</i><b>Points - 8 - 5 - 3</b></div><div class="v32-contact"><h4>PERTANYAAN</h4><b>Azmi Mohamad</b><span>Pengerusi Kelab KTACR</span><button onclick="window.open('https://wa.me/60103609336','_blank')">WHATSAPP</button></div></div></div>`);};

  const oldScoring=scoring;scoring=function(y=null){oldScoring(y);requestAnimationFrame(()=>{const dock=document.querySelector('body > .score-fixed-bottom');if(!dock)return;let r=document.getElementById('v30-group-result')||document.querySelector('body > .v6-fixed-result');if(!r){r=document.createElement('button');r.id='v30-group-result';document.body.appendChild(r);}r.textContent='GROUP RESULT';r.onclick=()=>groupResult();r.style.display='flex';dock.classList.add('v30-score-dock');});};

  const css=document.createElement('style');css.textContent=`.v32-contact{margin-top:20px;padding-top:14px;border-top:1px solid #d6dde5;display:flex;flex-direction:column;gap:4px}.v32-contact h4{margin:0 0 6px}.v32-contact span{color:#6b7785;font-size:.9rem}.v32-contact button{margin-top:12px;height:48px;border:0;border-radius:12px;background:#159b68;color:#fff;font-weight:950;font-size:1rem}body>#v30-group-result{display:flex!important;align-items:center!important;justify-content:center!important}`;document.head.appendChild(css);
})();