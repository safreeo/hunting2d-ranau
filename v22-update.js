/* HUNTING 2D RANAU V22 — repair scoring dock viewport anchoring + slimmer Group Result */
(function(){
  const css=document.createElement('style');
  css.textContent=`
    /* Detach frozen scoring controls from any transformed/limited parent. */
    body > .score-fixed-bottom{
      position:fixed!important;
      left:0!important;
      right:0!important;
      bottom:48px!important;
      width:100vw!important;
      max-width:100vw!important;
      min-width:100vw!important;
      box-sizing:border-box!important;
      margin:0!important;
      transform:none!important;
      border-radius:0!important;
      z-index:2000!important;
    }
    body > .score-fixed-bottom .keypad,
    body > .score-fixed-bottom .row{
      width:100%!important;
      max-width:none!important;
      box-sizing:border-box!important;
    }
    body > .v6-fixed-result{
      position:fixed!important;
      left:0!important;
      right:0!important;
      bottom:0!important;
      width:100vw!important;
      max-width:100vw!important;
      min-width:100vw!important;
      height:48px!important;
      min-height:48px!important;
      padding:0 14px!important;
      margin:0!important;
      transform:none!important;
      border-radius:0!important;
      box-sizing:border-box!important;
      z-index:2001!important;
    }
    .scoring-shell{padding-bottom:200px!important}
    html,body{overflow-x:hidden!important}
  `;
  document.head.appendChild(css);

  /* Critical fix: move the fixed dock to BODY so it cannot inherit a narrow/transformed scoring parent. */
  const prevScoring=scoring;
  scoring=function(keepY=null){
    prevScoring(keepY);
    requestAnimationFrame(()=>{
      const dock=document.querySelector('.score-fixed-bottom');
      const result=document.querySelector('.v6-fixed-result');
      if(dock && dock.parentElement!==document.body) document.body.appendChild(dock);
      if(result && result.parentElement!==document.body) document.body.appendChild(result);
    });
  };
})();
