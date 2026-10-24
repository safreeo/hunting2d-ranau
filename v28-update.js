/* HUNTING 2D RANAU V28 — scoring bottom blue extension + narrower Group Result; orange Home buttons */
(function(){
  const oldHomeV28=home;
  home=function(){
    oldHomeV28();
    requestAnimationFrame(()=>document.querySelector('.v25-home')?.classList.add('v28-home'));
  };

  const oldScoringV28=scoring;
  scoring=function(keepY=null){
    oldScoringV28(keepY);
    requestAnimationFrame(()=>{
      const r=document.querySelector('body > .v6-fixed-result');
      if(r) r.classList.add('v28-result-button');
      const dock=document.querySelector('body > .score-fixed-bottom');
      if(dock) dock.classList.add('v28-score-dock');
    });
  };

  const css=document.createElement('style');
  css.textContent=`
    /* Scoring: navy background continues behind Group Result to bottom edge. */
    body > .score-fixed-bottom.v28-score-dock{
      bottom:0!important;
      padding-bottom:66px!important;
      background:#0b3a69!important;
      box-sizing:border-box!important;
    }
    body > .v6-fixed-result.v27-result-button.v28-result-button{
      left:50%!important;
      right:auto!important;
      transform:translateX(-50%)!important;
      width:72%!important;
      max-width:560px!important;
      height:44px!important;
      min-height:44px!important;
      bottom:10px!important;
      border-radius:14px!important;
      z-index:1002!important;
    }
    .scoring-shell{padding-bottom:225px!important}

    /* Home: logo-orange buttons, black text, lower button block and soft shadow. */
    .v28-home .v25-menu{
      margin-top:48px!important;
      gap:11px!important;
    }
    .v28-home .v25-menu button{
      background:#f7b51b!important;
      color:#111!important;
      box-shadow:0 7px 14px rgba(20,48,76,.20)!important;
    }
    @media(max-height:760px){
      .v28-home .v25-menu{margin-top:27px!important;gap:8px!important}
    }
  `;
  document.head.appendChild(css);
  home();
})();
