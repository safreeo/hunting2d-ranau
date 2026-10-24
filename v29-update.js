/* HUNTING 2D RANAU V29 — 14 fixed groups, category labels/counts, restore scoring Group Result */
(function(){
  const V29_GROUPS=Array.from({length:14},(_,i)=>String(i+1));
  const v29Cat=g=>(+g>=10?'Wanita':'Lelaki');
  const v29Count=g=>S.participants.filter(p=>p.active!==false&&String(p.group)===String(g)).length;
  const v29Label=(g,withCount=false)=>`Group ${g} (${v29Cat(g)})${withCount?` — ${v29Count(g)} orang`:''}`;
  const v29Options=(selected,withCount=false)=>V29_GROUPS.map(g=>`<option value="${g}" ${String(selected)===g?'selected':''}>${esc(v29Label(g,withCount))}</option>`).join('');

  /* Start Scoring: always show Group 1-14, category and current member count. */
  groupSetup=function(){
    const selectedGroup=V29_GROUPS.includes(String(S.group))?String(S.group):'1';
    page(`${head('START SCORING')}<div class="card v29-group-setup"><label>Select Group</label><select id="g">${v29Options(selectedGroup,true)}</select><label>Starting Checkpoint</label><select id="scp">${Array.from({length:21},(_,i)=>`<option value="${i+1}" ${i+1===S.startCP?'selected':''}>CP ${i+1}</option>`).join('')}</select><button class="btn" onclick="begin()">CONTINUE</button><p class="muted v29-note">Setiap kumpulan boleh bermula dari mana-mana checkpoint. Selepas CP21, aplikasi akan bersambung semula dari CP1 sehingga semua checkpoint selesai.</p></div>`);
  };

  /* Home Group Result picker: same fixed 14-group convention. */
  openGroupResultV25=function(){
    const selectedGroup=V29_GROUPS.includes(String(S.group))?String(S.group):'1';
    page(`${head('GROUP RESULT')}<div class="card v25-group-picker"><label>Pilih Group</label><select id="v25group">${v29Options(selectedGroup,true)}</select><button class="btn green" onclick="selectGroupResultV25()">VIEW GROUP RESULT</button></div>`);
  };

  /* Add Participant: group options are fixed to the category range. */
  addP=function(){
    page(`${head('ADD PARTICIPANT','participants()')}<div class="card v10-form">
      <label>Nama</label><input id="pname" type="text" placeholder="Masukkan nama peserta" autocomplete="off">
      <label>Kelab</label><input id="pclub" type="text" placeholder="Masukkan nama kelab" autocomplete="off">
      <label>Kategori</label><select id="pcat" onchange="syncGroupOptionsV29('pgroup',this.value)"><option value="Lelaki">Lelaki</option><option value="Wanita">Wanita</option></select>
      <label>Group</label><select id="pgroup">${V29_GROUPS.slice(0,9).map(g=>`<option value="${g}">${esc(v29Label(g,true))}</option>`).join('')}</select>
      <button class="btn green" onclick="saveParticipantV10()">SAVE PARTICIPANT</button>
    </div>`);
  };
  window.syncGroupOptionsV29=function(id,cat,selected){
    const el=document.getElementById(id);if(!el)return;
    const list=cat==='Wanita'?V29_GROUPS.slice(9):V29_GROUPS.slice(0,9);
    el.innerHTML=list.map(g=>`<option value="${g}" ${String(selected)===g?'selected':''}>${esc(v29Label(g,true))}</option>`).join('');
  };

  /* Edit Participant: same category-aware Group list; keep V26 delete button behavior. */
  const editBaseV29=editP;
  editP=function(i){
    const p=S.participants[i];if(!p)return;
    page(`${head('EDIT PARTICIPANT','participants()')}<div class="card v10-form v25-edit-form">
      <label>No. Peserta</label><input id="peno" type="text" value="${esc(p.no||'')}" autocomplete="off">
      <label>Nama</label><input id="pname" type="text" value="${esc(p.name||'')}" autocomplete="off">
      <label>Kelab</label><input id="pclub" type="text" value="${esc(p.club||'')}" autocomplete="off">
      <label>Kategori</label><select id="pcat" onchange="syncGroupOptionsV29('pgroup',this.value)"><option value="Lelaki" ${p.cat==='Lelaki'?'selected':''}>Lelaki</option><option value="Wanita" ${p.cat==='Wanita'?'selected':''}>Wanita</option></select>
      <label>Group</label><select id="pgroup"></select>
      <label class="v25-active-label"><input id="pactive" type="checkbox" ${p.active===false?'':'checked'}> Peserta Aktif</label>
      <button class="btn green" onclick="saveEditParticipantV25(${i})">SAVE CHANGES</button>
      <button class="btn soft" onclick="participants()">CANCEL</button>
      <button class="btn v26-delete" onclick="confirmDeleteParticipantV26(${i})">DELETE PARTICIPANT</button>
    </div>`);
    syncGroupOptionsV29('pgroup',p.cat,String(p.group));
  };

  /* Participants > Group: always show all 14 groups, category + live active count. */
  const oldParticipantsV29=participants;
  participants=function(view){
    if(view!=='Group')return oldParticipantsV29(view);
    const indexed=S.participants.map((p,i)=>({p,i}));
    const rows=list=>list.map(({p,i})=>`<div class="participant v26-participant"><b>${esc(p.no)}</b><div><b>${esc(p.name)}</b><div class="muted">${esc(p.club||'—')} • ${p.cat} • Group ${esc(p.group)} ${p.active===false?'• ABSENT':''}</div></div><button onclick="editP(${i})">Edit</button></div>`).join('');
    const body=V29_GROUPS.map(g=>{
      const list=indexed.filter(x=>String(x.p.group)===g);
      return `<section class="v26-group-section"><div class="v26-group-title v29-group-title"><span>GROUP ${g} (${v29Cat(g).toUpperCase()})</span><b>${v29Count(g)} orang</b></div>${rows(list)||'<div class="v29-empty-group">Tiada peserta</div>'}</section>`;
    }).join('');
    page(`${head('PARTICIPANTS')}<div class="v26-part-tabs"><button onclick="participants('Lelaki')">Lelaki</button><button onclick="participants('Wanita')">Wanita</button><button class="active" onclick="participants('Group')">Group</button></div><div class="card v26-part-list">${body}</div><div class="v26-part-bottom"><button onclick="addP()">ADD PARTICIPANT</button><button onclick="openImportV26()">IMPORT LIST</button></div>`);
  };

  /* Restore Group Result button after V28 and keep it inside the navy scoring dock. */
  const oldScoringV29=scoring;
  scoring=function(keepY=null){
    oldScoringV29(keepY);
    requestAnimationFrame(()=>{
      let r=document.querySelector('body > .v6-fixed-result');
      const dock=document.querySelector('body > .score-fixed-bottom');
      if(!r&&dock){r=document.createElement('button');r.className='v6-fixed-result v27-result-button v28-result-button v29-result-button';r.textContent='GROUP RESULT';r.onclick=()=>groupResult();document.body.appendChild(r);}
      if(r){r.style.display='flex';r.classList.add('v29-result-button');r.onclick=()=>groupResult();}
      if(dock)dock.classList.add('v28-score-dock','v29-score-dock');
    });
  };

  const css=document.createElement('style');
  css.textContent=`
    .v29-group-setup select,.v25-group-picker select,.v10-form select{width:100%;box-sizing:border-box}
    .v29-group-title{display:flex!important;align-items:center;justify-content:space-between;gap:12px}.v29-group-title>b{white-space:nowrap;font-size:.9rem}
    .v29-empty-group{padding:12px 8px 16px;color:#8994a0;font-weight:700}
    body>.v6-fixed-result.v29-result-button{display:flex!important;left:50%!important;right:auto!important;transform:translateX(-50%)!important;width:62%!important;max-width:480px!important;height:42px!important;min-height:42px!important;bottom:9px!important;border-radius:13px!important;align-items:center!important;justify-content:center!important;z-index:1005!important}
    body>.score-fixed-bottom.v29-score-dock{padding-bottom:62px!important}
    .v29-note{margin:15px 0 0;line-height:1.45}
  `;
  document.head.appendChild(css);
  home();
})();
