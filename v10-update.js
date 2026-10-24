/* HUNTING 2D RANAU V10 — compact scoring dock, original clean home, sticky headers, participant form */

/* Home: return to the clean/original competition layout, no outer border. Use the full KTACR logo image already embedded in V9. */
home=function(){
  page(`<div class="v10-home"><img class="v10-logo" src="${V9_KTACR_LOGO}" alt="KTACR"><div class="v10-title-small">PERTANDINGAN MEMANAH</div><div class="v10-title-big">HUNTING 2D</div><div class="v10-title-year">RANAU 2026</div><div class="v10-menu"><button class="start" onclick="groupSetup()"><span>🎯</span><b>START SCORING</b><i>›</i></button><button class="rank" onclick="leaderboard()"><span>🏆</span><b>RANKING</b><i>›</i></button><button onclick="participants()"><span>👥</span><b>PARTICIPANTS</b><i>›</i></button><button onclick="eventInfo()"><span>ⓘ</span><b>EVENT INFO</b><i>›</i></button></div></div>`);
};

/* Add Participant: proper form instead of browser prompts. */
addP=function(){
  const existingGroups=groups();
  page(`${head('ADD PARTICIPANT')}<div class="card v10-form">
    <label>Nama</label><input id="pname" type="text" placeholder="Masukkan nama peserta" autocomplete="off">
    <label>Kelab</label><input id="pclub" type="text" placeholder="Masukkan nama kelab" autocomplete="off">
    <label>Kategori</label><select id="pcat"><option value="Lelaki">Lelaki</option><option value="Wanita">Wanita</option></select>
    <label>Group</label><input id="pgroup" type="text" inputmode="numeric" placeholder="Contoh: 1" value="${existingGroups[0]||''}">
    <button class="btn green" onclick="saveParticipantV10()">SAVE PARTICIPANT</button>
  </div>`);
};
function saveParticipantV10(){
  const name=document.getElementById('pname').value.trim(),club=document.getElementById('pclub').value.trim(),cat=document.getElementById('pcat').value,group=document.getElementById('pgroup').value.trim();
  if(!name||!club||!group){document.querySelector('.v10-form')?.classList.add('v10-form-error');setTimeout(()=>document.querySelector('.v10-form')?.classList.remove('v10-form-error'),450);return}
  const prefix=cat==='Wanita'?'W':'M',nums=S.participants.map(p=>parseInt(String(p.no||'').replace(/\D/g,''),10)).filter(Number.isFinite),next=String((nums.length?Math.max(...nums):0)+1).padStart(3,'0');
  S.participants.push({no:prefix+next,name,club,cat,group:String(group),active:true});save();participants();
}

/* Participant list: show club as well. */
participants=function(){let rows=S.participants.map((p,i)=>`<div class="participant"><b>${esc(p.no)}</b><div><b>${esc(p.name)}</b><div class="muted">${esc(p.club||'—')} • ${p.cat} • Group ${p.group} ${p.active===false?'• ABSENT':''}</div></div><button onclick="editP(${i})">Edit</button></div>`).join('');page(`${head('PARTICIPANTS')}<div class="card"><button class="btn" onclick="addP()">+ ADD PARTICIPANT</button><label>Quick Import</label><textarea id="imp" rows="4" placeholder="No, Name, Club, Category, Group"></textarea><button class="btn soft" onclick="importP()">IMPORT LIST</button></div><div class="card">${rows||'<p class="muted">No participants yet.</p>'}</div>`)};

/* Keep all page headers visible while content scrolls. */
const v10Style=document.createElement('style');v10Style.textContent=`
.head,.v6-head{position:sticky!important;top:0!important;z-index:120!important;box-shadow:0 3px 10px #0b2f5b22!important}.v8-page{overflow:visible!important}.wrap{overflow:visible!important}
.v10-home{min-height:calc(100vh - 18px);padding:34px 18px 24px;display:flex;flex-direction:column;align-items:center;text-align:center;background:#f5f7fa;color:#10365d}.v10-logo{display:block;width:150px;height:150px;object-fit:contain;border-radius:50%;margin:0 auto 22px;mix-blend-mode:multiply}.v10-title-small{font-weight:950;font-style:italic;font-size:1.18rem}.v10-title-big{font-size:2.8rem;line-height:1.02;font-weight:1000;font-style:italic;color:#f4a900;text-shadow:3px 3px 0 #b33a16}.v10-title-year{font-size:2rem;font-weight:1000;font-style:italic;margin:8px 0 30px}.v10-menu{width:100%;display:grid;gap:10px}.v10-menu button{height:64px;border:1px solid #c9d6e2;border-radius:12px;background:#fff;color:#10365d;display:grid;grid-template-columns:52px 1fr 30px;align-items:center;padding:0 15px;box-shadow:0 4px 10px #183b5c18;font-size:1.08rem}.v10-menu button span{font-size:1.5rem}.v10-menu button i{font-style:normal;font-size:2rem;font-weight:900}.v10-menu button.start{background:#a82019;color:#fff;border-color:#a82019}.v10-menu button.rank{background:#f7b916;color:#101820;border-color:#e7a800}.v10-form label{display:block;margin-top:12px;font-weight:850;color:#10365d}.v10-form input,.v10-form select{width:100%;box-sizing:border-box;margin-top:6px;padding:13px 12px;border:1px solid #c5d2df;border-radius:9px;background:#f8fafc;font-size:1rem;color:#102f50}.v10-form .btn{margin-top:20px}.v10-form-error{animation:v10shake .22s linear 2}@keyframes v10shake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
/* Scoring dock: one compact, deliberate frozen control panel instead of stacked floating bars. */
.score-fixed-bottom{bottom:64px!important;background:#0b3a69!important;padding:9px 12px 8px!important;border-radius:18px 18px 0 0!important;border:0!important;box-shadow:0 -5px 18px #08294738!important}.score-fixed-bottom .keypad{gap:7px!important;margin:0 0 7px!important;background:transparent!important}.score-fixed-bottom .key{min-height:54px!important;border-radius:10px!important}.score-fixed-bottom .row{gap:7px!important;margin:0!important}.score-fixed-bottom .row .btn{min-height:48px!important;margin:0!important;border-radius:10px!important}.v6-fixed-result{height:58px!important;bottom:6px!important;background:#159447!important;border:0!important;border-radius:0 0 16px 16px!important;box-shadow:0 5px 14px #08294730!important;color:#fff!important;font-weight:950!important}.scoring-shell{padding-bottom:205px!important}.v8-solid-bottom{background:#0b3a69!important}.v8-solid-result{background:#159447!important;border:0!important}
@media(max-width:390px){.v10-logo{width:132px;height:132px}.v10-title-big{font-size:2.45rem}.v10-title-year{font-size:1.8rem}.v10-menu button{height:59px}.score-fixed-bottom .key{min-height:50px!important}.score-fixed-bottom .row .btn{min-height:44px!important}}
`;document.head.appendChild(v10Style);

home();
