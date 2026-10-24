/* HUNTING 2D RANAU V16 — repair logo presentation + spacing */
const v16css=document.createElement('style');
v16css.textContent=`
.v15-home{padding-top:22px!important;grid-template-rows:auto auto auto!important;align-content:start!important;row-gap:0!important}
.v15-logo{width:min(32vw,138px)!important;max-width:138px!important;height:138px!important;max-height:none!important;object-fit:contain!important;object-position:center!important;margin:14px auto 0!important;filter:none!important;display:block!important}
.v15-title{margin-top:30px!important;margin-bottom:0!important;font-style:normal!important}
.v15-menu{margin-top:38px!important;align-self:auto!important;padding-bottom:0!important;gap:10px!important}
@media(max-height:760px){
 .v15-home{padding-top:10px!important}
 .v15-logo{width:108px!important;height:108px!important;margin-top:8px!important}
 .v15-title{margin-top:22px!important}
 .v15-menu{margin-top:28px!important;gap:8px!important}
}
`;
document.head.appendChild(v16css);
home();