/* HUNTING 2D RANAU V43 — sticky standard headers + borderless back button */
(function(){
  const css=document.createElement('style');
  css.textContent=`
    /* Normal page header stays visible while page content scrolls. */
    .v7-head{
      position:sticky!important;
      position:-webkit-sticky!important;
      top:0!important;
      z-index:1000!important;
    }

    /* Remove the box/border around the BACK control only. */
    .v7-head .v7-back,
    .v7-head button.v7-back{
      border:none!important;
      outline:none!important;
      box-shadow:none!important;
      background:transparent!important;
      border-radius:0!important;
      width:54px!important;
      min-width:54px!important;
      padding:0!important;
    }

    /* Keep Home control unchanged. */
  `;
  document.head.appendChild(css);
})();
