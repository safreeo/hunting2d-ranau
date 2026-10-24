/* HUNTING 2D RANAU V42 — compact actions + centred scoring header with back + frozen headers */
(function(){
  /* Keep scoring header consistent with normal pages: back | centred title | home. */
  const prevScoringV42=scoring;
  scoring=function(keepY=null){
    prevScoringV42(keepY);
    requestAnimationFrame(()=>{
      const row=document.querySelector('.score-fixed-top .score-title-row');
      if(!row)return;
      const title=row.querySelector('.group-progress');
      const homeBtn=row.querySelector('.score-home');
      if(title) title.classList.add('v42-centred-progress');
      if(homeBtn) homeBtn.classList.add('v42-score-home');
      if(!row.querySelector('.v42-score-back')){
        const back=document.createElement('button');
        back.className='score-home v42-score-back';
        back.setAttribute('aria-label','Back');
        back.innerHTML='‹';
        back.onclick=function(){groupSetup()};
        row.insertBefore(back,row.firstChild);
      }
    });
  };

  const css=document.createElement('style');
  css.textContent=`
    /* UNDO / EDIT / SUBMIT back to the earlier compact size. */
    body>.score-fixed-bottom .score-actions button,
    .score-fixed-bottom .score-actions button{font-size:.92rem!important;font-weight:900!important;letter-spacing:0!important}

    /* Scoring top header: true 3-column layout so title stays exactly centred. */
    .score-fixed-top .score-title-row{display:grid!important;grid-template-columns:54px 1fr 54px!important;align-items:center!important;position:relative!important}
    .score-fixed-top .group-progress{grid-column:2!important;text-align:center!important;width:100%!important;margin:0!important;justify-self:center!important}
    .score-fixed-top .v42-score-back{grid-column:1!important;grid-row:1!important;justify-self:start!important;font-size:2rem!important;line-height:1!important}
    .score-fixed-top .v42-score-home{grid-column:3!important;grid-row:1!important;justify-self:end!important}

    /* Freeze every standard page header at the top while its content scrolls. */
    .v7-head{position:sticky!important;top:0!important;z-index:700!important}
    .score-fixed-top{position:fixed!important;top:0!important;z-index:720!important}
  `;
  document.head.appendChild(css);
  if(typeof scoring==='function' && document.querySelector('.scoring-shell')) scoring(window.scrollY||0);
})();
