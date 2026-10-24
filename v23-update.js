/* HUNTING 2D RANAU V23 — show 8/5/3 in Group Result and Ranking with auto-width score cells */
(function(){
  function resultRowsV23(list){
    return rank(list).map((x,i)=>`<tr><td>${i+1}</td><td class="name"><b>${esc(x.p.name)}</b><br><span class="v8-club">${esc(x.p.club||'—')}</span></td><td><b>${x.m.pts}</b></td><td>${x.m.c8}</td><td>${x.m.c5}</td><td>${x.m.c3}</td></tr>`).join('');
  }

  groupResult=function(){
    const arch=groupArchers(),list=rank(arch),completed=Array.from({length:21},(_,i)=>i+1).filter(cp=>cpDone(cp)).length,complete=completed===21;
    const rows=resultRowsV23(arch);
    page(`<div class="v8-page">${head(`GROUP ${esc(S.group)} RESULT`,'scoring()')}<div class="v8-result-card"><table class="v8-result-table v23-result-table"><colgroup><col class="rank-col"><col class="name-col"><col class="points-col"><col class="score-col"><col class="score-col"><col class="score-col"></colgroup><thead><tr><th>Rank</th><th class="name">Name</th><th>Points</th><th>8</th><th>5</th><th>3</th></tr></thead><tbody>${rows||'<tr><td colspan="6">No participants</td></tr>'}</tbody></table><div class="v6-group-status"><b>Group Status:</b><div class="v6-progress"><span style="width:${Math.round(completed/21*100)}%"></span></div><b>${completed} / 21 CP</b><span class="v6-status-pill ${complete?'complete':''}">${complete?'COMPLETED':'IN PROGRESS'}</span></div><button class="v6-wide soft" onclick="scoring()">VIEW DETAILS</button><div class="v6-result-actions"><button class="v6-wide green" onclick="shareGroupAllH2D()">SHARE WHATSAPP</button><button class="v6-wide soft" onclick="window.print()">PRINT PDF</button></div></div></div>`);
  };

  leaderboard=function(cat=v8RankCat){
    v8RankCat=cat;
    const active=S.participants.filter(p=>p.active!==false&&p.cat===cat),rows=resultRowsV23(active);
    page(`<div class="v8-page">${head('RANKING')}<div class="v8-rank-card"><div class="v8-tabs"><button class="${cat==='Lelaki'?'active':''}" onclick="leaderboard('Lelaki')">Lelaki</button><button class="${cat==='Wanita'?'active':''}" onclick="leaderboard('Wanita')">Wanita</button></div><table class="v8-result-table v23-result-table"><colgroup><col class="rank-col"><col class="name-col"><col class="points-col"><col class="score-col"><col class="score-col"><col class="score-col"></colgroup><thead><tr><th>Rank</th><th class="name">Name</th><th>Points</th><th>8</th><th>5</th><th>3</th></tr></thead><tbody>${rows||'<tr><td colspan="6">No results yet.</td></tr>'}</tbody></table><div class="v8-rank-note">Ranking ini menggunakan keputusan yang telah disimpan pada peranti ini.</div></div></div>`);
  };

  const css=document.createElement('style');
  css.textContent=`
    /* Auto-adjust compact numeric columns; give remaining width to Name. */
    .v23-result-table{table-layout:auto!important;width:100%!important}
    .v23-result-table .rank-col,.v23-result-table .points-col,.v23-result-table .score-col{width:1%!important}
    .v23-result-table .name-col{width:auto!important}
    .v23-result-table th:not(.name),.v23-result-table td:not(.name){white-space:nowrap!important}
    .v23-result-table th,.v23-result-table td{padding-left:5px!important;padding-right:5px!important}
    @media(max-width:390px){.v23-result-table th,.v23-result-table td{padding-left:3px!important;padding-right:3px!important;font-size:.76rem!important}}
  `;
  document.head.appendChild(css);
})();
