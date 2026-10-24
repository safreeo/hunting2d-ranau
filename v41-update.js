/* HUNTING 2D RANAU V41 — WhatsApp result layout + keep only score keys large */
(function(){
  /* WhatsApp: compact two-line result per archer. */
  window.shareGroupAllH2D=function(){
    const list=rank(groupArchers());
    const d=new Date();
    const date=d.toLocaleDateString('en-GB');
    const day=d.toLocaleDateString('en-US',{weekday:'short'});
    const time=d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
    const cat=(list[0]&&list.every(x=>x.p.cat===list[0].p.cat))?list[0].p.cat:(Number(S.group)<=8?'Lelaki':'Wanita');
    const lines=[
      '🎯 *HUNTING 2D RANAU*',
      `${date} | ${day} | ${time}`,
      `Group ${S.group} (${cat})`,
      '--------------------------------------------------'
    ];
    list.forEach((x,i)=>{
      lines.push(`${i+1}. ${x.p.name} : ${x.m.pts} pts`);
      lines.push(`8:${x.m.c8} | 5:${x.m.c5} | 3:${x.m.c3}`);
      if(i<list.length-1)lines.push('');
    });
    window.open('https://wa.me/?text='+encodeURIComponent(lines.join('\n')),'_blank');
  };

  const css=document.createElement('style');
  css.textContent=`
    /* V40 enlarged too many buttons. Restore action buttons, keep 8/5/3/M large. */
    body>.score-fixed-bottom button{font-size:1rem!important;font-weight:900!important}
    body>.score-fixed-bottom button:nth-child(-n+4){font-size:1.55rem!important;font-weight:1000!important}
  `;
  document.head.appendChild(css);
})();
