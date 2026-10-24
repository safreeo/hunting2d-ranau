/* HUNTING 2D RANAU V20 — refresh uploaded transparent KTACR logo */
(function(){
  const css=document.createElement('style');
  css.textContent=`
    .v18-home-logo{object-fit:contain!important;background:transparent!important}
  `;
  document.head.appendChild(css);

  const prevHome=home;
  home=function(){
    prevHome();
    const logo=document.querySelector('.v18-home-logo,.v15-logo img,.v16-logo img,.v17-logo img');
    if(logo){
      logo.src='ktacr-logo.png?v=20';
      logo.classList.add('v18-home-logo');
    }
  };
  home();
})();
