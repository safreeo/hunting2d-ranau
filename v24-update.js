/* HUNTING 2D RANAU V24 — scoring dock must exist ONLY on scoring page */
(function(){
  function removeScoringDockV24(){
    document.querySelectorAll('body > .score-fixed-bottom, body > .v6-fixed-result').forEach(el=>el.remove());
  }

  /* Every normal page navigation first clears any scoring-only fixed controls. */
  const prevPageV24=page;
  page=function(x){
    removeScoringDockV24();
    prevPageV24(x);
  };

  /* Scoring recreates its own controls after page() has cleared old ones. */
  const prevScoringV24=scoring;
  scoring=function(keepY=null){
    removeScoringDockV24();
    prevScoringV24(keepY);
    requestAnimationFrame(()=>{
      const dock=document.querySelector('.score-fixed-bottom');
      const result=document.querySelector('.v6-fixed-result');
      if(dock && dock.parentElement!==document.body) document.body.appendChild(dock);
      if(result && result.parentElement!==document.body) document.body.appendChild(result);
    });
  };

  /* Extra safety: scoring controls are hidden whenever a normal V8 page/home is active. */
  const css=document.createElement('style');
  css.textContent=`
    body:has(#app .v8-page) > .score-fixed-bottom,
    body:has(#app .v8-page) > .v6-fixed-result,
    body:has(#app .v8-home) > .score-fixed-bottom,
    body:has(#app .v8-home) > .v6-fixed-result{display:none!important}
    body:has(#app .scoring-shell) > .score-fixed-bottom{display:block!important}
    body:has(#app .scoring-shell) > .v6-fixed-result{display:block!important}
  `;
  document.head.appendChild(css);
})();
