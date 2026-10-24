/* HUNTING 2D RANAU V30 — clear demo participants + robust scoring Group Result */
(function(){
  /* One-time clean slate for real participant upload. */
  const RESET_KEY='h2d-ranau-v30-participants-cleared';
  if(!localStorage.getItem(RESET_KEY)){
    S.participants=[];
    S.scores={};
    S.group=null;
    S.cp=1;
    S.startCP=1;
    selected=null;
    save();
    localStorage.setItem(RESET_KEY,'1');
  }

  function ensureV30ResultButton(){
    const dock=document.querySelector('body > .score-fixed-bottom');
    if(!dock)return;
    let r=document.getElementById('v30-group-result');
    if(!r){
      r=document.createElement('button');
      r.id='v30-group-result';
      r.type='button';
      r.textContent='GROUP RESULT';
      r.onclick=()=>groupResult();
      document.body.appendChild(r);
    }
    r.style.display='flex';
    dock.classList.add('v30-score-dock');
  }
  function removeV30ResultButton(){document.getElementById('v30-group-result')?.remove();}

  /* page() removes the scoring-only control on every normal navigation. */
  const pageV30=page;
  page=function(x){removeV30ResultButton();return pageV30(x);};

  /* scoring() always recreates it after all previous version overrides finish. */
  const scoringV30=scoring;
  scoring=function(keepY=null){
    scoringV30(keepY);
    requestAnimationFrame(()=>requestAnimationFrame(ensureV30ResultButton));
  };

  const css=document.createElement('style');
  css.textContent=`
    body>#v30-group-result{
      position:fixed!important;left:50%!important;right:auto!important;bottom:8px!important;
      transform:translateX(-50%)!important;width:54%!important;max-width:420px!important;
      height:40px!important;min-height:40px!important;margin:0!important;padding:0 16px!important;
      border:0!important;border-radius:12px!important;background:#159b68!important;color:#fff!important;
      font-size:1rem!important;font-weight:1000!important;align-items:center!important;justify-content:center!important;
      z-index:2147483000!important;box-shadow:0 3px 8px #0002!important;
    }
    body>.score-fixed-bottom.v30-score-dock{padding-bottom:58px!important;background:#0b4778!important}
  `;
  document.head.appendChild(css);
  home();
})();
