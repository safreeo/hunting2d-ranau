/* HUNTING 2D RANAU V26 — participant filters/nav, CSV/Excel import, delete dialog, frozen headers, UI refinements */
(function(){
  let v26ParticipantView='Lelaki';

  function v26Dialog(title,text,buttons){
    document.querySelector('.v26-dialog-overlay')?.remove();
    const d=document.createElement('div');d.className='v26-dialog-overlay';
    d.innerHTML=`<div class="v26-dialog"><h3>${esc(title)}</h3><div class="v26-dialog-text">${esc(text)}</div><div class="v26-dialog-actions">${buttons.map(b=>`<button class="${b.cls||''}" onclick="${b.action}">${esc(b.label)}</button>`).join('')}</div></div>`;
    document.body.appendChild(d);
  }
  window.closeV26Dialog=function(){document.querySelector('.v26-dialog-overlay')?.remove()};

  function participantRowsV26(list){
    return list.map(({p,i})=>`<div class="participant v26-participant"><b>${esc(p.no)}</b><div><b>${esc(p.name)}</b><div class="muted">${esc(p.club||'—')} • ${p.cat} • Group ${esc(p.group)} ${p.active===false?'• ABSENT':''}</div></div><button onclick="editP(${i})">Edit</button></div>`).join('');
  }

  function groupSortV26(a,b){const an=parseFloat(a),bn=parseFloat(b);return Number.isFinite(an)&&Number.isFinite(bn)?an-bn:String(a).localeCompare(String(b),undefined,{numeric:true});}

  participants=function(view){
    if(view)v26ParticipantView=view;
    const indexed=S.participants.map((p,i)=>({p,i}));
    let body='';
    if(v26ParticipantView==='Group'){
      const gs=[...new Set(S.participants.map(p=>String(p.group)))].sort(groupSortV26);
      body=gs.map(g=>`<section class="v26-group-section"><div class="v26-group-title">GROUP ${esc(g)}</div>${participantRowsV26(indexed.filter(x=>String(x.p.group)===g))}</section>`).join('')||'<div class="v26-empty">No participants yet.</div>';
    }else{
      body=participantRowsV26(indexed.filter(x=>x.p.cat===v26ParticipantView))||'<div class="v26-empty">No participants in this category.</div>';
    }
    page(`${head('PARTICIPANTS')}<div class="v26-part-tabs"><button class="${v26ParticipantView==='Lelaki'?'active':''}" onclick="participants('Lelaki')">Lelaki</button><button class="${v26ParticipantView==='Wanita'?'active':''}" onclick="participants('Wanita')">Wanita</button><button class="${v26ParticipantView==='Group'?'active':''}" onclick="participants('Group')">Group</button></div><div class="card v26-part-list">${body}</div><div class="v26-part-bottom"><button onclick="addP()">ADD PARTICIPANT</button><button onclick="openImportV26()">IMPORT LIST</button></div>`);
  };

  window.openImportV26=function(){
    page(`${head('IMPORT LIST','participants()')}<div class="card v26-import"><label>Select CSV or Excel file</label><input id="v26file" type="file" accept=".csv,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"><div class="muted">Columns: No, Nama/Name, Kelab/Club, Kategori/Category, Group</div><button class="btn green" onclick="importFileV26()">IMPORT FILE</button></div>`);
  };

  function parseCsvV26(text){
    const rows=[];let row=[],cell='',q=false;
    for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(c==='"'){if(q&&n==='"'){cell+='"';i++;}else q=!q;}else if(c===','&&!q){row.push(cell.trim());cell='';}else if((c==='\n'||c==='\r')&&!q){if(c==='\r'&&n==='\n')i++;row.push(cell.trim());cell='';if(row.some(Boolean))rows.push(row);row=[];}else cell+=c;}
    row.push(cell.trim());if(row.some(Boolean))rows.push(row);return rows;
  }

  function importRowsV26(rows){
    if(!rows.length){v26Dialog('Import List','File is empty.',[{label:'OK',action:'closeV26Dialog()'}]);return;}
    let start=0,map={no:0,name:1,club:2,cat:3,group:4};
    const h=rows[0].map(x=>String(x).trim().toLowerCase());
    if(h.some(x=>/^(no|no\.|number|participant no|nama|name|kelab|club|kategori|category|group)$/.test(x))){
      const find=(re,def)=>{const i=h.findIndex(x=>re.test(x));return i<0?def:i};
      map={no:find(/^(no|no\.|number|participant no)$/,0),name:find(/^(nama|name)$/,1),club:find(/^(kelab|club)$/,2),cat:find(/^(kategori|category)$/,3),group:find(/^group$/,4)};start=1;
    }
    let added=0,updated=0;
    for(let r=start;r<rows.length;r++){
      const x=rows[r];let no=String(x[map.no]??'').trim().toUpperCase(),name=String(x[map.name]??'').trim(),club=String(x[map.club]??'').trim(),cat=/wanita|female|women/i.test(String(x[map.cat]??''))?'Wanita':'Lelaki',group=String(x[map.group]??'').trim();
      if(!name||!group)continue;
      if(!no){const prefix=cat==='Wanita'?'W':'L',nums=S.participants.filter(p=>String(p.no).toUpperCase().startsWith(prefix)).map(p=>parseInt(String(p.no).replace(/\D/g,''),10)).filter(Number.isFinite);no=prefix+String((nums.length?Math.max(...nums):0)+1).padStart(3,'0');}
      const existing=S.participants.find(p=>String(p.no).toUpperCase()===no);
      if(existing){Object.assign(existing,{name,club,cat,group,active:true});updated++;}else{S.participants.push({no,name,club,cat,group,active:true});added++;}
    }
    save();v26Dialog('Import Complete',`Added: ${added}\nUpdated: ${updated}\nTotal: ${S.participants.length}`,[{label:'OK',action:"closeV26Dialog();participants()"}]);
  }

  window.importFileV26=function(){
    const f=document.getElementById('v26file')?.files?.[0];if(!f){v26Dialog('Import List','Please select a CSV or Excel file.',[{label:'OK',action:'closeV26Dialog()'}]);return;}
    const ext=(f.name.split('.').pop()||'').toLowerCase();
    if(ext==='csv'){
      const reader=new FileReader();reader.onload=()=>importRowsV26(parseCsvV26(String(reader.result||'')));reader.onerror=()=>v26Dialog('Import List','Unable to read file.',[{label:'OK',action:'closeV26Dialog()'}]);reader.readAsText(f);return;
    }
    if(ext==='xlsx'||ext==='xls'){
      if(window.XLSX){const reader=new FileReader();reader.onload=()=>{try{const wb=XLSX.read(reader.result,{type:'array'}),ws=wb.Sheets[wb.SheetNames[0]],rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});importRowsV26(rows);}catch(e){v26Dialog('Import List','Unable to read Excel file.',[{label:'OK',action:'closeV26Dialog()'}]);}};reader.readAsArrayBuffer(f);return;}
      const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';s.onload=()=>importFileV26();s.onerror=()=>v26Dialog('Import List','Excel reader could not be loaded. Please use CSV if offline.',[{label:'OK',action:'closeV26Dialog()'}]);document.head.appendChild(s);return;
    }
    v26Dialog('Import List','Only CSV, XLSX or XLS files are supported.',[{label:'OK',action:'closeV26Dialog()'}]);
  };

  const oldEditV26=editP;
  editP=function(i){oldEditV26(i);const form=document.querySelector('.v25-edit-form');if(form){const del=document.createElement('button');del.className='btn v26-delete';del.textContent='DELETE PARTICIPANT';del.onclick=()=>confirmDeleteParticipantV26(i);form.appendChild(del);}};
  window.confirmDeleteParticipantV26=function(i){const p=S.participants[i];if(!p)return;v26Dialog('Delete Participant',`Delete ${p.no} - ${p.name}? This participant and all saved scores for this participant will be removed.`,[{label:'CANCEL',action:'closeV26Dialog()'},{label:'DELETE',cls:'danger',action:`deleteParticipantV26(${i})`}]);};
  window.deleteParticipantV26=function(i){const p=S.participants[i];if(!p)return;const no=String(p.no);S.participants.splice(i,1);Object.keys(S.scores||{}).forEach(k=>{if(k.startsWith(no+'|'))delete S.scores[k];});save();closeV26Dialog();participants();};

  const oldHomeV26=home;
  home=function(){oldHomeV26();const footer=document.querySelector('.v25-footer');if(footer)footer.textContent='“Kerana Memanah, Kita Bersaudara”';};

  const oldScoringV26=scoring;
  scoring=function(keepY=null){oldScoringV26(keepY);requestAnimationFrame(()=>{const r=document.querySelector('body > .v6-fixed-result');if(r){r.classList.add('v26-result-button');}});};

  const css=document.createElement('style');css.textContent=`
  .head,.v6-head,.v7-head{position:sticky!important;top:0!important;z-index:900!important}
  .v25-menu{margin-top:42px!important}.v25-footer{padding:0 0 max(28px,env(safe-area-inset-bottom))!important;font-size:clamp(1.05rem,4.5vw,1.25rem)!important;font-weight:950!important}
  body>.v6-fixed-result.v26-result-button{left:18px!important;right:18px!important;width:auto!important;bottom:8px!important;height:58px!important;border-radius:14px!important;box-shadow:0 4px 12px #08294735!important;font-size:1.2rem!important}.score-fixed-bottom{bottom:74px!important}.scoring-shell{padding-bottom:230px!important}
  .v26-part-tabs{position:sticky;top:76px;z-index:850;display:grid;grid-template-columns:repeat(3,1fr);gap:7px;padding:9px 18px;background:#eef2f6}.v26-part-tabs button{height:46px;border:1px solid #b8c8d7;border-radius:10px;background:#fff;color:#0b3a69;font-weight:900;font-size:1rem}.v26-part-tabs button.active{background:#0b3a69;color:#fff;border-color:#0b3a69}.v26-part-list{margin-bottom:92px!important}.v26-group-section{margin-bottom:20px}.v26-group-title{position:sticky;top:131px;z-index:20;background:#e7eef5;color:#0b3a69;font-weight:1000;padding:9px 10px;border-radius:8px;margin-bottom:4px}.v26-empty{padding:24px 8px;text-align:center;color:#6c7885;font-weight:700}
  .v26-part-bottom{position:fixed;z-index:950;left:0;right:0;bottom:0;display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 18px max(10px,env(safe-area-inset-bottom));background:#0b3a69;box-shadow:0 -4px 14px #08294730}.v26-part-bottom button{height:52px;border:0;border-radius:11px;background:#fff;color:#0b3a69;font-weight:950;font-size:.96rem}.v26-part-bottom button:last-child{background:#159b68;color:#fff}
  .v26-import label{display:block;font-weight:900;color:#10365d;margin-bottom:10px}.v26-import input[type=file]{display:block;width:100%;box-sizing:border-box;padding:14px;border:1px solid #c5d2df;border-radius:10px;background:#f8fafc;margin-bottom:10px}.v26-import .btn{margin-top:18px}
  .v26-delete{background:#b42318!important;color:#fff!important;border-color:#b42318!important;margin-top:10px!important}
  .v26-dialog-overlay{position:fixed;inset:0;z-index:99999;background:#0008;display:grid;place-items:center;padding:22px}.v26-dialog{width:min(390px,100%);box-sizing:border-box;background:#fff;border-radius:18px;padding:22px;color:#10365d;box-shadow:0 14px 40px #0005}.v26-dialog h3{margin:0 0 12px;font-size:1.25rem}.v26-dialog-text{white-space:pre-line;line-height:1.45;color:#4e5f70;font-weight:650}.v26-dialog-actions{display:flex;gap:9px;margin-top:20px}.v26-dialog-actions button{flex:1;height:47px;border:0;border-radius:10px;background:#e8eef4;color:#0b3a69;font-weight:950}.v26-dialog-actions button.danger{background:#b42318;color:#fff}
  @media(max-height:760px){.v25-menu{margin-top:22px!important}.v25-footer{padding-bottom:12px!important;font-size:.95rem!important}}
  `;document.head.appendChild(css);home();
})();
