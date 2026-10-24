/* HUNTING 2D RANAU V19 — move competition title slightly upward */
(function(){
  const css=document.createElement('style');
  css.textContent=`
    .v18-home-logo{margin-bottom:20px!important}
    .v15-title,.v14-title,.v13-title,.home-title{transform:translateY(-8px)}
  `;
  document.head.appendChild(css);
  if(typeof home==='function') home();
})();
