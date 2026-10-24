/* HUNTING 2D RANAU V6 — Event Info / Group Result / fixed Group Result */

function h2dHomeIcon(){return `<button class="v6-home" onclick="home()" aria-label="Home">⌂</button>`}
function h2dV6Head(title,backFn='home()'){return `<div class="v6-head"><button class="v6-back" onclick="${backFn}" aria-label="Back">‹</button><h2>${title}</h2>${h2dHomeIcon()}</div>`}

/* EVENT INFO — layout based on supplied reference, with organiser added. */
eventInfo=function(){
  page(`<div class="v6-page event-info-page">
    ${h2dV6Head('EVENT INFO')}
    <div class="v6-info-card">
      <h3>HUNTING 2D RANAU 2026</h3>
      <div class="v6-info-row"><span class="v6-info-icon">▣</span><span>Tarikh</span><b>25 October 2026 (Ahad)</b></div>
      <div class="v6-info-row"><span class="v6-info-icon">◷</span><span>Masa</span><b>7.30 pagi</b></div>
      <div class="v6-info-row"><span class="v6-info-icon">●</span><span>Tempat</span><b>Sobou Range,<br>Kampung Lasing, Ranau.</b></div>
      <div class="v6-info-row"><span class="v6-info-icon">★</span><span>Penganjur</span><b>Kinabalu Traditional Archery Club Ranau (KTACR)</b></div>
      <div class="v6-divider"></div>
      <h4>▤ &nbsp; FORMAT PERTANDINGAN</h4>
      <div class="v6-format"><span>Kategori</span><i>:</i><b>Lelaki &amp; Wanita</b><span>Checkpoints</span><i>:</i><b>21</b><span>Arrows/CP</span><i>:</i><b>3</b><span>Distance</span><i>:</i><b>7 ~ 20 meter</b><span>Scoring Matrix</span><i>:</i><b>8, 5, 3, M</b><span>Tie-break</span><i>:</i><b>Points - 8 - 5 - 3</b></div>
    </div>
    <div class="v6-mountain">▲ ▲▲ ▲</div>
  </div>`);
};

/* GROUP RESULT — single combined ranking, no Lelaki/Wanita buttons. */
groupResult=function(){
  const arch=groupArchers(),list=rank(arch),completed=Array.from({length:21},(_,i)=>i+1).filter(cp=>cpDone(cp)).length;
  const rows=list.map((x,i)=>`<tr><td>${i+1}</td><td class="name"><b>${esc(x.p.name)}</b><br><span class="v6-cat">${esc(x.p.cat)}</span></td><td><b>${x.m.pts}</b></td><td>${x.m.c8}</td><td>${x.m.c5}</td></tr>`).join('');
  const complete=completed===21;
  page(`<div class="v6-page result-page">
    ${h2dV6Head(`GROUP ${esc(S.group)} RESULT`,'scoring()')}
    <div class="v6-result-card">
      <table class="v6-result-table"><thead><tr><th>Rank</th><th class="name">Name</th><th>Points</th><th>8</th><th>5</th></tr></thead><tbody>${rows||'<tr><td colspan="5">No participants</td></tr>'}</tbody></table>
      <div class="v6-group-status"><b>Group Status:</b><div class="v6-progress"><span style="width:${Math.round(completed/21*100)}%"></span></div><b>${completed} / 21 CP</b><span class="v6-status-pill ${complete?'complete':''}">${complete?'COMPLETED':'IN PROGRESS'}</span></div>
      <button class="v6-wide soft" onclick="scoring()">VIEW DETAILS</button>
      <div class="v6-result-actions"><button class="v6-wide green" onclick="shareGroupAllH2D()">◉ &nbsp; SHARE WHATSAPP</button><button class="v6-wide soft" onclick="window.print()">▣ &nbsp; PRINT PDF</button></div>
    </div>
  </div>`);
};

function shareGroupAllH2D(){
  const list=rank(groupArchers()),d=new Date(),date=d.toLocaleDateString('en-GB'),day=d.toLocaleDateString('en-US',{weekday:'short'}),time=d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}),lines=[`🎯 *HUNTING 2D RANAU*`,`${date} | ${day} | ${time}`,`Group: ${S.group}`,'--------------------------------------------------'];
  list.forEach((x,i)=>lines.push(`${i+1}. *${x.p.name}* (${x.p.cat}): ${x.m.pts} pts | 8:${x.m.c8} | 5:${x.m.c5}`));
  lines.push('--------------------------------------------------','HUNTING 2D RANAU 2026');window.open('https://wa.me/?text='+encodeURIComponent(lines.join('\n')),'_blank');
}

/* Add a fixed GROUP RESULT button at the bottom of every scoring page. */
const v6Scoring=scoring;
scoring=function(keepY=null){
  v6Scoring(keepY);
  if(!document.querySelector('.scoring-shell'))return;
  document.querySelector('.v6-fixed-result')?.remove();
  const b=document.createElement('button');b.className='v6-fixed-result';b.textContent='GROUP RESULT';b.onclick=()=>groupResult();document.body.appendChild(b);
};

/* Remove fixed scoring action when navigating to any regular page. */
const v6Page=page;
page=function(x){document.querySelector('.v6-fixed-result')?.remove();v6Page(x)};

const v6Style=document.createElement('style');v6Style.textContent=`
.v6-page{min-height:calc(100vh - 24px);position:relative}.v6-head{height:50px;background:#0b2f5b;color:#fff;border-radius:13px 13px 0 0;display:grid;grid-template-columns:44px 1fr 44px;align-items:center;padding:0 5px;box-shadow:0 2px 5px #0002}.v6-head h2{font-size:1rem;text-align:center;margin:0;letter-spacing:.02em}.v6-back,.v6-home{border:0;background:transparent;color:#fff;font-size:2rem;font-weight:700;line-height:1}.v6-home{font-size:1.45rem}.event-info-page{background:linear-gradient(#eef7ff,#fff 72%,#d8ecf6);border:1px solid #8cb4cf;border-radius:14px;overflow:hidden;padding-bottom:88px}.v6-info-card{margin:12px;background:#fff;border:1px solid #d7dee7;border-radius:12px;padding:0 14px 14px;box-shadow:0 2px 7px #0b2f5b12}.v6-info-card h3{margin:0 -14px 7px;padding:10px 14px;background:#f0f3f6;border-radius:12px 12px 0 0;text-align:center;font-size:1.05rem}.v6-info-row{display:grid;grid-template-columns:30px 74px 1fr;gap:7px;align-items:start;padding:8px 0;border-bottom:1px solid #dce2e8;font-size:.88rem}.v6-info-row b{font-weight:500}.v6-info-icon{font-size:1.25rem;color:#0b2f5b;text-align:center}.v6-divider{height:1px;background:#d6dde5;margin:8px 0 10px}.v6-info-card h4{margin:0 0 9px;font-size:.95rem}.v6-format{display:grid;grid-template-columns:105px 10px 1fr;gap:5px 4px;font-size:.86rem}.v6-format i{font-style:normal}.v6-format b{font-weight:500}.v6-mountain{position:absolute;bottom:12px;left:0;right:0;text-align:center;font-size:3.2rem;letter-spacing:-.35em;color:#8db5d1;opacity:.55;overflow:hidden}.v6-result-card{background:#fff;border:1px solid #cfd9e4;border-radius:0 0 12px 12px;padding:10px}.v6-result-table{border:1px solid #cbd6e1;border-radius:8px;overflow:hidden}.v6-result-table th{background:#e7eef4!important;color:#102d4c!important;font-size:.76rem;padding:7px 4px;border:1px solid #cbd6e1}.v6-result-table td{font-size:.78rem;padding:7px 4px;border:1px solid #d6dfe7}.v6-cat{font-size:.65rem;color:#6c7885}.v6-group-status{display:grid;grid-template-columns:auto 1fr auto auto;gap:7px;align-items:center;font-size:.72rem;margin:9px 0}.v6-progress{height:9px;background:#dfe6ec;border-radius:8px;overflow:hidden}.v6-progress span{display:block;height:100%;background:#19a568;border-radius:8px}.v6-status-pill{background:#e7a827;color:#fff;border-radius:12px;padding:5px 8px;font-size:.65rem;font-weight:900}.v6-status-pill.complete{background:#149b62}.v6-wide{width:100%;border:0;border-radius:7px;padding:11px 8px;font-weight:900;color:#0b2f5b;margin:4px 0}.v6-wide.soft{background:#e9eef3}.v6-wide.green{background:#12a665;color:#fff}.v6-result-actions{display:grid;grid-template-columns:1.15fr 1fr;gap:7px}.v6-fixed-result{position:fixed;left:50%;transform:translateX(-50%);bottom:7px;z-index:50;width:min(calc(100% - 24px),736px);height:44px;border:0;border-radius:10px;background:#0b2f5b;color:#fff;font-weight:950;box-shadow:0 -2px 12px #0003}.scoring-shell{padding-bottom:60px!important}.score-fixed-bottom{bottom:56px!important}
@media(max-width:390px){.v6-info-row{grid-template-columns:27px 67px 1fr;font-size:.82rem}.v6-format{grid-template-columns:96px 9px 1fr;font-size:.80rem}.v6-group-status{gap:5px;font-size:.66rem}.v6-status-pill{padding:4px 6px}}
`;document.head.appendChild(v6Style);
