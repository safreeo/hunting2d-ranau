/* HUNTING 2D RANAU V25 — participant editor, Group Result home, footer, scoring result button */
(function(){
  function nextParticipantNoV25(cat,excludeIndex=-1){
    const prefix=cat==='Wanita'?'W':'L';
    const nums=S.participants.map((p,i)=>i===excludeIndex?null:((String(p.no||'').toUpperCase().startsWith(prefix))?parseInt(String(p.no).replace(/\D/g,''),10):null)).filter(Number.isFinite);
    return prefix+String((nums.length?Math.max(...nums):0)+1).padStart(3,'0');
  }

  /* New participants: use L/W numbering and never M for Lelaki. */
  saveParticipantV10=function(){
    const name=document.getElementById('pname').value.trim(),club=document.getElementById('pclub').value.trim(),cat=document.getElementById('pcat').value,group=document.getElementById('pgroup').value.trim();
    if(!name||!club||!group){document.querySelector('.v10-form')?.classList.add('v10-form-error');setTimeout(()=>document.querySelector('.v10-form')?.classList.remove('v10-form-error'),450);return}
    const no=nextParticipantNoV25(cat);
    S.participants.push({no,name,club,cat,group:String(group),active:true});save();participants();
  };

  /* Edit uses the same proper form as Add Participant — no browser prompt/confirm. */
  editP=function(i){
    const p=S.participants[i]; if(!p)return;
    page(`${head('EDIT PARTICIPANT','participants()')}<div class="card v10-form v25-edit-form">
      <label>No. Peserta</label><input id="peno" type="text" value="${esc(p.no||'')}" autocomplete="off">
      <label>Nama</label><input id="pname" type="text" value="${esc(p.name||'')}" autocomplete="off">
      <label>Kelab</label><input id="pclub" type="text" value="${esc(p.club||'')}" autocomplete="off">
      <label>Kategori</label><select id="pcat"><option value="Lelaki" ${p.cat==='Lelaki'?'selected':''}>Lelaki</option><option value="Wanita" ${p.cat==='Wanita'?'selected':''}>Wanita</option></select>
      <label>Group</label><input id="pgroup" type="text" inputmode="numeric" value="${esc(p.group||'')}">
      <label class="v25-active-label"><input id="pactive" type="checkbox" ${p.active===false?'':'checked'}> Peserta Aktif</label>
      <button class="btn green" onclick="saveEditParticipantV25(${i})">SAVE CHANGES</button>
      <button class="btn soft" onclick="participants()">CANCEL</button>
    </div>`);
  };

  window.saveEditParticipantV25=function(i){
    const p=S.participants[i]; if(!p)return;
    const no=document.getElementById('peno').value.trim().toUpperCase(),name=document.getElementById('pname').value.trim(),club=document.getElementById('pclub').value.trim(),cat=document.getElementById('pcat').value,group=document.getElementById('pgroup').value.trim(),active=document.getElementById('pactive').checked;
    if(!no||!name||!club||!group){document.querySelector('.v25-edit-form')?.classList.add('v10-form-error');setTimeout(()=>document.querySelector('.v25-edit-form')?.classList.remove('v10-form-error'),450);return}
    if(S.participants.some((x,n)=>n!==i&&String(x.no).toUpperCase()===no)){showV25Message('No. peserta sudah digunakan.');return}
    const oldNo=p.no;
    Object.assign(p,{no,name,club,cat,group:String(group),active});
    if(oldNo!==no){Object.keys(S.scores||{}).forEach(k=>{if(k.startsWith(String(oldNo)+'|')){S.scores[no+k.slice(String(oldNo).length)]=S.scores[k];delete S.scores[k];}});}
    save();participants();
  };

  function showV25Message(text){
    document.querySelector('.v25-dialog-overlay')?.remove();
    const d=document.createElement('div');d.className='v25-dialog-overlay';d.innerHTML=`<div class="v25-dialog"><div>${esc(text)}</div><button onclick="this.closest('.v25-dialog-overlay').remove()">OK</button></div>`;document.body.appendChild(d);
  }

  /* Home: Group Result replaces Ranking. Group Result asks for the group to view/share. */
  window.openGroupResultV25=function(){
    const gs=groups();
    if(!gs.length){showV25Message('Tiada kumpulan peserta.');return}
    page(`${head('GROUP RESULT')}<div class="card v25-group-picker"><label>Pilih Group</label><select id="v25group">${gs.map(g=>`<option value="${esc(g)}" ${String(g)===String(S.group)?'selected':''}>Group ${esc(g)}</option>`).join('')}</select><button class="btn green" onclick="selectGroupResultV25()">VIEW GROUP RESULT</button></div>`);
  };
  window.selectGroupResultV25=function(){const g=document.getElementById('v25group')?.value;if(!g)return;S.group=String(g);save();groupResult();};

  home=function(){
    page(`<section class="v25-home">
      <img class="v25-logo" src="ktacr-logo.png?v=25" alt="KTACR logo">
      <div class="v25-title"><div>PERTANDINGAN MEMANAH</div><strong>HUNTING 2D</strong><b>RANAU 2026</b></div>
      <div class="v25-menu">
        <button onclick="groupSetup()">START SCORING</button>
        <button onclick="openGroupResultV25()">GROUP RESULT</button>
        <button onclick="participants()">PARTICIPANTS</button>
        <button onclick="eventInfo()">EVENT INFO</button>
      </div>
      <div class="v25-footer">Kerana Memanah, Kita Bersaudara</div>
    </section>`);
  };

  /* Larger, proper button for Group Result on scoring page. */
  const prevScoringV25=scoring;
  scoring=function(keepY=null){
    prevScoringV25(keepY);
    requestAnimationFrame(()=>{const r=document.querySelector('body > .v6-fixed-result');if(r){r.classList.add('v25-result-button');r.textContent='GROUP RESULT';}});
  };

  const css=document.createElement('style');
  css.textContent=`
    .v25-home{box-sizing:border-box;width:100%;height:100dvh;min-height:0;background:#eef2f6;padding:20px 20px 12px;display:flex;flex-direction:column;align-items:center;text-align:center;color:#0b3157;overflow:hidden}
    .v25-logo{display:block;width:min(39vw,160px);height:min(39vw,160px);object-fit:contain;margin:4px auto 18px}
    .v25-title{font-weight:950;line-height:1.04}.v25-title div{font-size:clamp(1.12rem,4.8vw,1.48rem);font-weight:1000}.v25-title strong{display:block;margin:7px 0 5px;font-size:clamp(2.35rem,10vw,3.15rem)}.v25-title b{display:block;font-size:clamp(1.7rem,7vw,2.2rem)}
    .v25-menu{width:100%;display:grid;gap:9px;margin-top:30px}.v25-menu button{width:100%;height:clamp(57px,8.1vh,68px);border:0;border-radius:15px;background:#0b3a69;color:#fff;font-size:clamp(1.05rem,4.4vw,1.25rem);font-weight:950;box-shadow:0 4px 10px #183b5c20}
    .v25-footer{margin-top:auto;padding:12px 0 2px;font-size:clamp(.88rem,3.8vw,1.02rem);font-weight:850;color:#0b3a69}
    .v25-active-label{display:flex!important;align-items:center;gap:10px;margin:18px 0 2px!important}.v25-active-label input{width:22px!important;height:22px!important;margin:0!important}
    .v25-dialog-overlay{position:fixed;inset:0;z-index:9999;background:#0007;display:grid;place-items:center;padding:24px}.v25-dialog{width:min(360px,100%);box-sizing:border-box;background:#fff;border-radius:16px;padding:22px;color:#10365d;font-size:1rem;font-weight:750;box-shadow:0 12px 35px #0005}.v25-dialog button{display:block;width:100%;height:46px;margin-top:20px;border:0;border-radius:10px;background:#0b3a69;color:#fff;font-weight:900;font-size:1rem}
    .v25-group-picker label{display:block;margin-bottom:8px;font-weight:900;color:#10365d}.v25-group-picker select{width:100%;box-sizing:border-box;padding:14px 12px;border:1px solid #c5d2df;border-radius:9px;background:#f8fafc;font-size:1rem;color:#102f50}.v25-group-picker .btn{margin-top:16px}
    body > .v6-fixed-result.v25-result-button{height:56px!important;min-height:56px!important;bottom:0!important;padding:0 16px!important;border:0!important;border-radius:0!important;background:#159b68!important;color:#fff!important;font-size:1.08rem!important;font-weight:1000!important;display:flex!important;align-items:center!important;justify-content:center!important}
    body > .score-fixed-bottom{bottom:56px!important}.scoring-shell{padding-bottom:210px!important}
    @media(max-height:760px){.v25-home{padding-top:8px}.v25-logo{width:112px;height:112px;margin-bottom:8px}.v25-title div{font-size:1rem}.v25-title strong{font-size:2.25rem;margin:3px 0}.v25-title b{font-size:1.55rem}.v25-menu{margin-top:15px;gap:7px}.v25-menu button{height:50px}.v25-footer{padding-top:7px;font-size:.82rem}}
  `;
  document.head.appendChild(css);
  home();
})();
