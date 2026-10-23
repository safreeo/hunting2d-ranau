/* HUNTING 2D SCORE V2 — Club field + dummy participant import */

// Backward compatibility for participants created in V1.
S.participants.forEach(p=>{ if(typeof p.club==='undefined') p.club=''; });
save();

const H2D_DUMMY_PARTICIPANTS = `No,Nama,Kelab,Kategori,Group
W001,Nur Aisyah,KTACR,Wanita,1
W002,Siti Hajar,ASSAFRA,Wanita,1
W003,Nurul Izzah,ATTRAC,Wanita,1
W004,Ain Syuhada,PANGLIMA,Wanita,1
W005,Noraini,TAPS,Wanita,1
W006,Farah Nabila,KMBR,Wanita,1
W007,Nur Amira,KTAK,Wanita,1
W008,Siti Mariam,PERMATA,Wanita,1
W009,Nur Fatin,KTACR,Wanita,2
W010,Alya Sofea,ASSAFRA,Wanita,2
W011,Nur Syafiqah,ATTRAC,Wanita,2
W012,Nadia Imani,PANGLIMA,Wanita,2
W013,Puteri Balqis,TAPS,Wanita,2
W014,Nur Athirah,KMBR,Wanita,2
W015,Siti Aina,KTAK,Wanita,2
W016,Nor Hazwani,PERMATA,Wanita,2
W017,Nur Adlina,KTACR,Wanita,3
W018,Siti Khadijah,ASSAFRA,Wanita,3
W019,Nur Aqilah,ATTRAC,Wanita,3
W020,Dayang Sofia,PANGLIMA,Wanita,3
W021,Nur Shahirah,TAPS,Wanita,3
W022,Siti Maisarah,KMBR,Wanita,3
W023,Nor Atikah,KTAK,Wanita,3
W024,Nur Damia,PERMATA,Wanita,3
W025,Nur Natasha,KTACR,Wanita,4
W026,Siti Nadhirah,ASSAFRA,Wanita,4
W027,Nur Alia,ATTRAC,Wanita,4
W028,Nor Sabrina,PANGLIMA,Wanita,4
W029,Nur Yasmin,TAPS,Wanita,4
W030,Siti Humaira,KMBR,Wanita,4
W031,Nur Hanisah,KTAK,Wanita,4
W032,Ainul Mardhiah,PERMATA,Wanita,4
W033,Nur Iman,KTACR,Wanita,5
W034,Siti Sarah,ASSAFRA,Wanita,5
W035,Nur Qistina,ATTRAC,Wanita,5
W036,Nor Afiqah,PANGLIMA,Wanita,5
W037,Nur Raihana,TAPS,Wanita,5
W038,Siti Zulaikha,KMBR,Wanita,5
W039,Nur Adibah,KTAK,Wanita,5
W040,Alya Humaira,PERMATA,Wanita,5
L001,Mohd Ali,KTACR,Lelaki,6
L002,Ahmad Faiz,ASSAFRA,Lelaki,6
L003,Mohd Firdaus,ATTRAC,Lelaki,6
L004,Azmi Rahman,PANGLIMA,Lelaki,6
L005,Hafiz Rosli,TAPS,Lelaki,6
L006,Mohd Rizal,KMBR,Lelaki,6
L007,Amir Hakim,KTAK,Lelaki,6
L008,Khairul Anwar,PERMATA,Lelaki,6
L009,Mohd Syafiq,KTACR,Lelaki,7
L010,Ahmad Zaki,ASSAFRA,Lelaki,7
L011,Faisal Rahman,ATTRAC,Lelaki,7
L012,Mohd Irfan,PANGLIMA,Lelaki,7
L013,Azlan Ismail,TAPS,Lelaki,7
L014,Shahrul Nizam,KMBR,Lelaki,7
L015,Hazwan Ali,KTAK,Lelaki,7
L016,Ridzuan Hamid,PERMATA,Lelaki,7
L017,Mohd Akmal,KTACR,Lelaki,8
L018,Ahmad Hafiz,ASSAFRA,Lelaki,8
L019,Firdaus Hakim,ATTRAC,Lelaki,8
L020,Mohd Azrul,PANGLIMA,Lelaki,8
L021,Faizal Karim,TAPS,Lelaki,8
L022,Amirul Naim,KMBR,Lelaki,8
L023,Mohd Arif,KTAK,Lelaki,8
L024,Khairul Azmi,PERMATA,Lelaki,8
L025,Mohd Farhan,KTACR,Lelaki,9
L026,Ahmad Syukri,ASSAFRA,Lelaki,9
L027,Mohd Nazri,ATTRAC,Lelaki,9
L028,Hafizuddin,PANGLIMA,Lelaki,9
L029,Azhar Rahman,TAPS,Lelaki,9
L030,Mohd Shahril,KMBR,Lelaki,9
L031,Amir Faisal,KTAK,Lelaki,9
L032,Roslan Karim,PERMATA,Lelaki,9
L033,Mohd Asyraf,KTACR,Lelaki,10
L034,Ahmad Fikri,ASSAFRA,Lelaki,10
L035,Mohd Hilmi,ATTRAC,Lelaki,10
L036,Azrul Nizam,PANGLIMA,Lelaki,10
L037,Faiz Hakimi,TAPS,Lelaki,10
L038,Mohd Adib,KMBR,Lelaki,10
L039,Shukri Rahman,KTAK,Lelaki,10
L040,Amir Azlan,PERMATA,Lelaki,10
L041,Mohd Iqbal,KTACR,Lelaki,11
L042,Ahmad Ridwan,ASSAFRA,Lelaki,11
L043,Mohd Fadli,ATTRAC,Lelaki,11
L044,Khairul Nizam,PANGLIMA,Lelaki,11
L045,Hafiz Hakim,TAPS,Lelaki,11
L046,Mohd Rafiq,KMBR,Lelaki,11
L047,Azmi Iskandar,KTAK,Lelaki,11
L048,Firdaus Ali,PERMATA,Lelaki,11
L049,Mohd Danial,KTACR,Lelaki,12
L050,Ahmad Haziq,ASSAFRA,Lelaki,12
L051,Mohd Aiman,ATTRAC,Lelaki,12
L052,Shahril Azman,PANGLIMA,Lelaki,12
L053,Amirul Hakim,TAPS,Lelaki,12
L054,Mohd Faiz,KMBR,Lelaki,12
L055,Azlan Rahim,KTAK,Lelaki,12
L056,Khairul Hafiz,PERMATA,Lelaki,12
L057,Mohd Ikhwan,KTACR,Lelaki,13
L058,Ahmad Firdaus,ASSAFRA,Lelaki,13
L059,Mohd Hafiz,ATTRAC,Lelaki,13
L060,Amir Nizam,PANGLIMA,Lelaki,13
L061,Faiz Rahman,TAPS,Lelaki,13
L062,Mohd Zulfadli,KMBR,Lelaki,13
L063,Azrul Hakim,KTAK,Lelaki,13
L064,Khairul Anuar,PERMATA,Lelaki,13`;

function loadDummyList(){
  const box=document.getElementById('imp');
  if(box){ box.value=H2D_DUMMY_PARTICIPANTS; box.focus(); }
}

// V2 participant page: No | Nama | Kelab | Kategori | Group
participants=function(){
  let rows=S.participants.map((p,i)=>`<div class="participant"><b>${esc(p.no)}</b><div><b>${esc(p.name)}</b><div class="muted">${esc(p.club||'—')} • ${p.cat} • Group ${p.group} ${p.active===false?'• ABSENT':''}</div></div><button onclick="editP(${i})">Edit</button></div>`).join('');
  page(`${head('PARTICIPANTS')}<div class="card"><button class="btn" onclick="addP()">+ ADD PARTICIPANT</button><label>Quick Import</label><div class="muted" style="margin-bottom:8px">Format: No, Nama, Kelab, Kategori, Group</div><textarea id="imp" rows="7" placeholder="No,Nama,Kelab,Kategori,Group&#10;W001,Nur Aisyah,KTACR,Wanita,1"></textarea><button class="btn soft" onclick="loadDummyList()">LOAD DUMMY LIST (104)</button><button class="btn" onclick="importP()">IMPORT LIST</button></div><div class="card"><b>${S.participants.length} Participants</b>${rows||'<p class="muted">No participants yet.</p>'}</div>`);
};

addP=function(){
  const no=prompt('Participant No.'); if(!no)return;
  const name=prompt('Name'); if(!name)return;
  const club=prompt('Club',''); if(club===null)return;
  const cat=prompt('Category: Lelaki / Wanita','Lelaki');
  const group=prompt('Group No.','1');
  S.participants.push({no,name,club,cat:/wanita/i.test(cat)?'Wanita':'Lelaki',group:String(group||1),active:true});
  save();participants();
};

editP=function(i){
  const p=S.participants[i];
  const name=prompt('Name',p.name); if(name===null)return;
  const club=prompt('Club',p.club||''); if(club===null)return;
  const group=prompt('Group No.',p.group); if(group===null)return;
  const absent=confirm('Mark participant ABSENT?\nOK = Absent, Cancel = Active');
  Object.assign(p,{name,club,group:String(group),active:!absent});save();participants();
};

importP=function(){
  const text=document.getElementById('imp').value.trim(); if(!text)return;
  let added=0,updated=0;
  for(const line of text.split(/\n+/)){
    const x=line.split(/[,\t]/).map(v=>v.trim());
    if(x.length<5||/^no\.?$/i.test(x[0]))continue;
    const item={no:x[0],name:x[1],club:x[2],cat:/wanita/i.test(x[3])?'Wanita':'Lelaki',group:String(x[4]),active:true};
    const existing=S.participants.find(p=>String(p.no).toLowerCase()===String(item.no).toLowerCase());
    if(existing){Object.assign(existing,item);updated++;}else{S.participants.push(item);added++;}
  }
  save();
  alert(`Import complete.\nAdded: ${added}\nUpdated: ${updated}\nTotal: ${S.participants.length}`);
  participants();
};

// Show club on scoring cards and results without changing scoring logic.
const v1Scoring=scoring;
scoring=function(){
  v1Scoring();
  const arch=groupArchers();
  document.querySelectorAll('.scorecard .scoretop').forEach((el,i)=>{
    const p=arch[i]; if(!p)return;
    el.innerHTML=`<span>${esc(p.no)} • ${esc(p.name)}<small class="club-line">${esc(p.club||'—')}</small></span><span>${p.cat}</span>`;
  });
};

const v1GroupResult=groupResult;
groupResult=function(){
  v1GroupResult();
  document.querySelectorAll('table td.name').forEach(td=>{
    const bold=td.querySelector('b'); if(!bold)return;
    const name=bold.textContent;
    const p=groupArchers().find(x=>x.name===name);
    if(p&&p.club) bold.insertAdjacentHTML('afterend',`<br><span class="club-result">${esc(p.club)}</span>`);
  });
};

const v1Leaderboard=leaderboard;
leaderboard=function(){
  v1Leaderboard();
  document.querySelectorAll('table td.name').forEach(td=>{
    const bold=td.querySelector('b'); if(!bold)return;
    const p=S.participants.find(x=>x.name===bold.textContent);
    if(p&&p.club) bold.insertAdjacentHTML('afterend',`<br><span class="club-result">${esc(p.club)}</span>`);
  });
};

const v2Style=document.createElement('style');
v2Style.textContent=`.club-line{display:block;font-size:.76rem;color:#6c7885;font-weight:700;margin-top:3px}.club-result{font-size:.76rem;color:#6c7885;font-weight:700}`;
document.head.appendChild(v2Style);
