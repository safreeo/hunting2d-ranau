/* HUNTING 2D RANAU V31 — fix real Excel import + Continue */
(function(){
  const V31_GROUPS=Array.from({length:14},(_,i)=>String(i+1));
  const catForGroupV31=g=>(+g>=10?'Wanita':'Lelaki');
  const countGroupV31=g=>S.participants.filter(p=>p.active!==false&&String(p.group)===String(g)).length;
  const labelGroupV31=g=>`Group ${g} (${catForGroupV31(g)}) — ${countGroupV31(g)} orang`;
  const optionsV31=(selected='1')=>V31_GROUPS.map(g=>`<option value="${g}" ${String(selected)===g?'selected':''}>${esc(labelGroupV31(g))}</option>`).join('');

  /* V30 intentionally cleared demo data once. Import real list after that reset. */
  function dialogV31(title,text,action='closeV26Dialog()'){
    if(typeof v26Dialog==='function') return v26Dialog(title,text,[{label:'OK',action}]);
    document.querySelector('.v31-dialog')?.remove();
    const d=document.createElement('div');d.className='v31-dialog';d.innerHTML=`<div><b>${esc(title)}</b><p>${esc(text)}</p><button onclick="this.closest('.v31-dialog').remove();${action}">OK</button></div>`;document.body.appendChild(d);
  }

  function normalizeRowsV31(rows){
    if(!rows||!rows.length)return [];
    const h=rows[0].map(v=>String(v??'').trim().toLowerCase());
    const idx=(names,def)=>{const i=h.findIndex(x=>names.includes(x));return i>=0?i:def};
    const m={no:idx(['no.','no','number'],0),name:idx(['nama','name'],1),club:idx(['kelab','club'],2),cat:idx(['kategori','category'],3),group:idx(['group','kumpulan'],4)};
    const out=[];let l=0,w=0;
    for(let r=1;r<rows.length;r++){
      const x=rows[r];
      const name=String(x[m.name]??'').trim(),club=String(x[m.club]??'').trim(),group=String(x[m.group]??'').trim();
      if(!name||!group)continue;
      let cat=/wanita|female|women/i.test(String(x[m.cat]??''))?'Wanita':'Lelaki';
      /* Group convention is authoritative: 1-9 Lelaki, 10-14 Wanita. */
      if(+group>=1&&+group<=14)cat=catForGroupV31(group);
      const no=cat==='Wanita'?'W'+String(++w).padStart(3,'0'):'L'+String(++l).padStart(3,'0');
      out.push({no,name,club,cat,group:String(+group||group),active:true});
    }
    return out;
  }

  window.importFileV26=function(){
    const f=document.getElementById('v26file')?.files?.[0];
    if(!f){dialogV31('Import List','Please select a CSV or Excel file.');return;}
    const ext=(f.name.split('.').pop()||'').toLowerCase();
    const finish=rows=>{
      const list=normalizeRowsV31(rows);
      if(!list.length){dialogV31('Import List','Tiada peserta dapat dibaca daripada fail. Semak column No., Nama, Kelab, Kategori dan Group.');return;}
      S.participants=list;S.scores={};S.group=null;S.cp=1;S.startCP=1;selected=null;save();
      dialogV31('Import Complete',`${list.length} peserta berjaya diimport.\nLelaki: ${list.filter(p=>p.cat==='Lelaki').length}\nWanita: ${list.filter(p=>p.cat==='Wanita').length}`,'closeV26Dialog();participants(\'Group\')');
    };
    if(ext==='csv'){
      const rd=new FileReader();rd.onload=()=>finish(parseCsvV26(String(rd.result||'')));rd.onerror=()=>dialogV31('Import List','Unable to read CSV file.');rd.readAsText(f);return;
    }
    if(ext==='xlsx'||ext==='xls'){
      const readExcel=()=>{const rd=new FileReader();rd.onload=()=>{try{const wb=XLSX.read(rd.result,{type:'array'}),ws=wb.Sheets[wb.SheetNames[0]],rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});finish(rows);}catch(e){dialogV31('Import List','Unable to read Excel file.');}};rd.readAsArrayBuffer(f);};
      if(window.XLSX){readExcel();return;}
      const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';s.onload=readExcel;s.onerror=()=>dialogV31('Import List','Excel reader could not be loaded. Internet connection is required for first Excel import, or use CSV.');document.head.appendChild(s);return;
    }
    dialogV31('Import List','Only CSV, XLSX or XLS files are supported.');
  };

  /* Explicit begin handler so Continue always reads current controls and validates group members. */
  begin=function(){
    const g=document.getElementById('g')?.value||'1',cp=+(document.getElementById('scp')?.value||1);
    const members=S.participants.filter(p=>p.active!==false&&String(p.group)===String(g));
    if(!members.length){dialogV31('Start Scoring',`Group ${g} belum mempunyai peserta. Import atau tambah peserta dahulu.`);return;}
    S.group=String(g);S.startCP=cp;S.cp=cp;selected=null;save();scoring();
  };

  groupSetup=function(){
    const sg=V31_GROUPS.includes(String(S.group))?String(S.group):'1';
    page(`${head('START SCORING')}<div class="card v29-group-setup"><label>Select Group</label><select id="g">${optionsV31(sg)}</select><label>Starting Checkpoint</label><select id="scp">${Array.from({length:21},(_,i)=>`<option value="${i+1}" ${i+1===S.startCP?'selected':''}>CP ${i+1}</option>`).join('')}</select><button class="btn" onclick="begin()">CONTINUE</button><p class="muted v29-note">Setiap kumpulan boleh bermula dari mana-mana checkpoint. Selepas CP21, aplikasi akan bersambung semula dari CP1 sehingga semua checkpoint selesai.</p></div>`);
  };

  /* Group Result picker uses the same 14 groups/counts. */
  openGroupResultV25=function(){
    const sg=V31_GROUPS.includes(String(S.group))?String(S.group):'1';
    page(`${head('GROUP RESULT')}<div class="card v25-group-picker"><label>Pilih Group</label><select id="v25group">${optionsV31(sg)}</select><button class="btn green" onclick="selectGroupResultV25()">VIEW GROUP RESULT</button></div>`);
  };

  const css=document.createElement('style');css.textContent=`
    .v31-dialog{position:fixed;inset:0;z-index:99999;background:#0008;display:grid;place-items:center;padding:22px}.v31-dialog>div{width:min(380px,100%);box-sizing:border-box;background:#fff;border-radius:16px;padding:22px;color:#10365d}.v31-dialog p{white-space:pre-line;color:#596a79}.v31-dialog button{width:100%;height:46px;border:0;border-radius:10px;background:#0b3a69;color:#fff;font-weight:900}
  `;document.head.appendChild(css);
})();