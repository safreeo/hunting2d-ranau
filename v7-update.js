/* HUNTING 2D RANAU V7 — unified headers, Event Info, Start Scoring, Ranking */

/* One header format for every normal page: back | centered title | home. */
head=function(title,backFn='home()'){
  return `<div class="v7-head"><button class="v7-nav v7-back" onclick="${backFn}" aria-label="Back">‹</button><h2>${title}</h2><button class="v7-nav v7-home" onclick="home()" aria-label="Home">⌂</button></div>`;
};
h2dV6Head=function(title,backFn='home()'){return head(title,backFn)};

/* EVENT INFO — no row icons, colon labels, no bottom graphic. */
eventInfo=function(){
  page(`<div class="v7-page event-info-page">
    ${head('EVENT INFO')}
    <div class="v7-info-card">
      <h3>HUNTING 2D RANAU 2026</h3>
      <div class="v7-info-row"><span>Tarikh</span><i>:</i><b>25 October 2026 (Ahad)</b></div>
      <div class="v7-info-row"><span>Masa</span><i>:</i><b>7.30 pagi</b></div>
      <div class="v7-info-row"><span>Tempat</span><i>:</i><b>Sobou Range,<br>Kampung Lasing, Ranau.</b></div>
      <div class="v7-info-row"><span>Penganjur</span><i>:</i><b>Kinabalu Traditional Archery Club Ranau (KTACR)</b></div>
      <div class="v7-divider"></div>
      <h4>FORMAT PERTANDINGAN</h4>
      <div class="v7-format"><span>Kategori</span><i>:</i><b>Lelaki &amp; Wanita</b><span>Checkpoints</span><i>:</i><b>21</b><span>Arrows/CP</span><i>:</i><b>3</b><span>Distance</span><i>:</i><b>7 ~ 20 meter</b><span>Scoring Matrix</span><i>:</i><b>8, 5, 3, M</b><span>Tie-break</span><i>:</i><b>Points - 8 - 5 - 3</b></div>
    </div>
  </div>`);
};

/* START SCORING — remove Format statement; keep one Malay note. */
groupSetup=function(){
  const gs=groups();
  page(`${head('START SCORING')}<div class="card v7-setup-card"><label>Select Group</label><select id="g">${gs.map(g=>`<option value="${esc(g)}" ${String(g)===String(S.group)?'selected':''}>Group ${esc(g)}</option>`).join('')}</select><label>Starting Checkpoint</label><select id="scp">${Array.from({length:21},(_,i)=>`<option value="${i+1}" ${i+1===S.startCP?'selected':''}>CP ${i+1}</option>`).join('')}</select><button class="btn" onclick="begin()">CONTINUE</button></div><div class="card v7-note"><b>Nota</b><p class="muted">Setiap kumpulan boleh bermula dari mana-mana checkpoint. Selepas CP21, aplikasi akan bersambung semula dari CP1 sehingga semua checkpoint selesai.</p></div>`);
};

/* Rename Leaderboard to Ranking while retaining existing ranking logic. */
const v7Leaderboard=leaderboard;
leaderboard=function(){v7Leaderboard();const h=document.querySelector('.v7-head h2,.head h2');if(h)h.textContent='RANKING'};

/* Home label: LEADERBOARD -> RANKING, without changing the current home artwork/layout. */
const v7Home=home;
home=function(){v7Home();document.querySelectorAll('button').forEach(b=>{if(b.textContent.trim().toUpperCase()==='LEADERBOARD')b.textContent='RANKING'})};

/* WhatsApp group format queued by user: category shown in parentheses and no footer. */
shareGroupAllH2D=function(){
  const list=rank(groupArchers()),cats=[...new Set(groupArchers().map(p=>p.cat))],cat=cats.length===1?cats[0]:'Campuran',d=new Date(),date=d.toLocaleDateString('en-GB'),day=d.toLocaleDateString('en-US',{weekday:'short'}),time=d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}),lines=[`🎯 *HUNTING 2D RANAU*`,`${date} | ${day} | ${time}`,`Group: ${S.group} (${cat})`,'--------------------------------------------------'];
  list.forEach((x,i)=>lines.push(`${i+1}. ${x.p.name} : ${x.m.pts} pts | 8:${x.m.c8} | 5:${x.m.c5}`));
  window.open('https://wa.me/?text='+encodeURIComponent(lines.join('\n')),'_blank');
};

const v7Style=document.createElement('style');v7Style.textContent=`
.v7-head{height:58px;background:#0b3a69;color:#fff;border-radius:13px 13px 0 0;display:grid;grid-template-columns:54px 1fr 54px;align-items:center;padding:0 5px;box-shadow:0 2px 5px #0002}.v7-head h2{font-size:1.12rem;text-align:center;margin:0;letter-spacing:.03em}.v7-nav{border:0;background:transparent;color:#fff;font-weight:800;line-height:1}.v7-back{font-size:2.25rem}.v7-home{font-size:1.55rem}.v7-page{min-height:calc(100vh - 24px);background:linear-gradient(#eef8ff,#fff);border:1px solid #8cb4cf;border-radius:14px;overflow:hidden}.v7-info-card{margin:13px;background:#fff;border:1px solid #d2dbe5;border-radius:12px;padding:0 14px 16px;box-shadow:0 2px 7px #0b2f5b12}.v7-info-card h3{margin:0 -14px 10px;padding:12px 14px;background:#f0f3f6;border-radius:12px 12px 0 0;text-align:center;font-size:1.08rem}.v7-info-row{display:grid;grid-template-columns:105px 12px 1fr;gap:3px;align-items:start;padding:10px 0;border-bottom:1px solid #dce2e8;font-size:.91rem}.v7-info-row i,.v7-format i{font-style:normal}.v7-info-row b,.v7-format b{font-weight:600}.v7-divider{height:1px;background:#d6dde5;margin:9px 0 12px}.v7-info-card h4{margin:0 0 10px;font-size:1rem}.v7-format{display:grid;grid-template-columns:112px 12px 1fr;gap:6px 4px;font-size:.88rem}.v7-note b{font-size:1.05rem}.v7-note p{margin-bottom:0;line-height:1.45}.v6-mountain{display:none!important}
/* Apply the same header appearance to any legacy page that still renders .head. */
.head{height:58px!important;background:#0b3a69!important;color:#fff!important;border-radius:13px 13px 0 0!important;display:grid!important;grid-template-columns:1fr auto!important;align-items:center!important;padding:0 16px!important}.head h2{font-size:1.12rem!important;text-align:left!important;margin:0!important}.head .back{background:transparent!important;border:1px solid #9ab6cf!important;color:#fff!important;border-radius:9px!important;padding:8px 12px!important}
@media(max-width:390px){.v7-head{height:54px;grid-template-columns:48px 1fr 48px}.v7-head h2{font-size:1rem}.v7-info-row{grid-template-columns:86px 10px 1fr;font-size:.84rem}.v7-format{grid-template-columns:99px 10px 1fr;font-size:.81rem}}
`;document.head.appendChild(v7Style);

/* Re-render home after overrides are installed. */
home();
