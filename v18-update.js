/* HUNTING 2D RANAU V18 — use real uploaded KTACR logo file */
(function(){
  const css=document.createElement('style');
  css.textContent=`
    .v18-home-logo{display:block;width:150px;height:150px;object-fit:contain;margin:0 auto 32px auto}
  `;
  document.head.appendChild(css);

  const oldHome=home;
  home=function(){
    oldHome();
    const logo=document.querySelector('.v15-logo img,.v16-logo img,.v17-logo img,.v15-logo,.v16-logo,.v17-logo');
    if(logo && logo.tagName==='IMG'){
      logo.src='ktacr-logo.png?v=18';
      logo.className='v18-home-logo';
      logo.removeAttribute('width');
      logo.removeAttribute('height');
    } else {
      const title=document.querySelector('.v15-title,.v14-title,.v13-title,.home-title');
      if(title){
        const img=document.createElement('img');
        img.src='ktacr-logo.png?v=18';
        img.alt='KTACR';
        img.className='v18-home-logo';
        title.parentNode.insertBefore(img,title);
      }
    }
  };
  home();
})();
