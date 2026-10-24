/* HUNTING 2D RANAU V40 — larger score keys, clearer return-to-scoring label, one-page Group Result print */
(function(){
  /* Group Result: make the return action unambiguous for field users. */
  const prevGroupResultV40=groupResult;
  groupResult=function(){
    prevGroupResultV40();
    requestAnimationFrame(()=>{
      const card=document.querySelector('.v8-result-card');
      if(!card)return;
      const buttons=[...card.querySelectorAll('button')];
      const back=buttons.find(b=>/VIEW DETAILS/i.test((b.textContent||'').trim()));
      if(back){back.textContent='BACK TO SCORING';back.classList.add('v40-back-scoring');}
      card.classList.add('v40-print-card');
    });
  };

  const css=document.createElement('style');
  css.textContent=`
    /* Scoring keypad: 8 / 5 / 3 / M easier to read outdoors. */
    body>.score-fixed-bottom button:nth-child(-n+4),
    body>.score-fixed-bottom .score-pad button,
    body>.score-fixed-bottom .score-buttons button{
      font-size:1.55rem!important;
      font-weight:1000!important;
    }
    .v40-back-scoring{font-weight:1000!important}

    @media print{
      @page{size:auto;margin:8mm}
      html,body{height:auto!important;min-height:0!important;background:#fff!important;overflow:visible!important}
      body{margin:0!important;padding:0!important}
      #app{height:auto!important;min-height:0!important;margin:0!important;padding:0!important;overflow:visible!important}
      #app .v8-page{height:auto!important;min-height:0!important;margin:0!important;padding:0!important;background:#fff!important;overflow:visible!important}
      #app .v8-result-card.v40-print-card{height:auto!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important;break-after:avoid-page!important;page-break-after:avoid!important}
      #app .v8-result-table{margin:0!important;break-inside:avoid!important;page-break-inside:avoid!important}
      #app .v6-group-status,
      #app .v40-back-scoring,
      #app .v6-result-actions{display:none!important}
      body>.score-fixed-bottom,body>#v39-result-wrap,body>.v6-fixed-result{display:none!important}
      .v7-head{position:static!important;box-shadow:none!important}
      *{print-color-adjust:exact!important;-webkit-print-color-adjust:exact!important}
    }
  `;
  document.head.appendChild(css);
})();
