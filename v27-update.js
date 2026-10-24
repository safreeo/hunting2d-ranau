/* HUNTING 2D RANAU V27 — compact centered Group Result scoring button */
(function(){
  const oldScoringV27=scoring;
  scoring=function(keepY=null){
    oldScoringV27(keepY);
    requestAnimationFrame(()=>{
      const r=document.querySelector('body > .v6-fixed-result');
      if(r) r.classList.add('v27-result-button');
    });
  };
  const css=document.createElement('style');
  css.textContent=`
    body > .v6-fixed-result.v27-result-button{
      left:50%!important;
      right:auto!important;
      transform:translateX(-50%)!important;
      width:calc(100% - 72px)!important;
      max-width:720px!important;
      height:46px!important;
      min-height:46px!important;
      bottom:8px!important;
      padding:0 14px!important;
      border-radius:13px!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      text-align:center!important;
      font-size:1.08rem!important;
      line-height:1!important;
    }
    body > .score-fixed-bottom{bottom:62px!important}
    .scoring-shell{padding-bottom:218px!important}
  `;
  document.head.appendChild(css);
  if(document.querySelector('.scoring-shell')) scoring();
})();
