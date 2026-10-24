/* HUNTING 2D RANAU V21 — larger event heading + repair frozen scoring dock width */
(function(){
  const css=document.createElement('style');
  css.textContent=`
    /* Home: slightly larger competition heading only */
    .v15-title-small,.v18-title-small,.v19-title-small,.v20-title-small,
    .v14-title-small,.v13-title-small,.v10-title-small{
      font-size:1.38rem!important;
      line-height:1.15!important;
      font-weight:900!important;
    }

    /* Scoring: force all frozen controls to the full viewport width.
       This prevents the dock shrinking/sliding to the left while scrolling. */
    .score-fixed-bottom{
      position:fixed!important;
      left:0!important;
      right:0!important;
      width:100%!important;
      max-width:none!important;
      box-sizing:border-box!important;
      margin:0!important;
      transform:none!important;
      z-index:1000!important;
    }
    .score-fixed-bottom .keypad,
    .score-fixed-bottom .row{
      width:100%!important;
      box-sizing:border-box!important;
    }
    .v6-fixed-result{
      position:fixed!important;
      left:0!important;
      right:0!important;
      width:100%!important;
      max-width:none!important;
      box-sizing:border-box!important;
      margin:0!important;
      transform:none!important;
      z-index:1001!important;
    }
    body{overflow-x:hidden!important}
  `;
  document.head.appendChild(css);
})();
