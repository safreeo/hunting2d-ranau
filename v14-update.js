/* HUNTING 2D RANAU V14 — basic one-screen home */
home=function(){
  page(`<section class="v14-home">
    <img class="v14-logo" src="${V12_KTACR_LOGO}" alt="KTACR logo">
    <div class="v14-title"><div>PERTANDINGAN MEMANAH</div><strong>HUNTING 2D</strong><b>RANAU 2026</b></div>
    <div class="v14-menu">
      <button onclick="groupSetup()"><span class="v14-icon v14-target">◎</span><b>START SCORING</b><em>›</em></button>
      <button onclick="leaderboard()"><span class="v14-icon v14-bars">▥</span><b>RANKING</b><em>›</em></button>
      <button onclick="participants()"><span class="v14-icon v14-people">♟</span><b>PARTICIPANTS</b><em>›</em></button>
      <button onclick="eventInfo()"><span class="v14-icon v14-calendar">▣</span><b>EVENT INFO</b><em>›</em></button>
    </div>
  </section>`);
};
const v14css=document.createElement('style');v14css.textContent=`
html,body{background:#eef2f6}.v14-home{box-sizing:border-box;width:100%;height:100dvh;min-height:0;background:#eef2f6;padding:12px 20px 18px;display:grid;grid-template-rows:minmax(100px,25vh) auto 1fr;align-items:center;color:#0b3157;text-align:center;overflow:hidden}.v14-logo{display:block;max-width:150px;width:min(36vw,150px);max-height:22vh;height:auto;object-fit:contain;margin:auto;filter:drop-shadow(0 2px 3px rgba(0,0,0,.12))}.v14-title{align-self:center;font-weight:900;font-style:italic;line-height:1.05}.v14-title div{font-size:clamp(.9rem,3.6vw,1.18rem)}.v14-title strong{display:block;margin:5px 0 4px;font-size:clamp(2rem,9vw,2.85rem);color:#0b3157}.v14-title b{display:block;font-size:clamp(1.35rem,6.4vw,2rem)}.v14-menu{align-self:end;width:100%;display:grid;gap:9px;padding-bottom:2px}.v14-menu button{box-sizing:border-box;width:100%;height:clamp(55px,8.2vh,68px);border:0;border-radius:13px;background:#0b3157;color:#fff;display:grid;grid-template-columns:58px 1fr 28px;align-items:center;padding:0 15px;box-shadow:0 3px 8px rgba(10,42,72,.18);font-size:clamp(.98rem,4.1vw,1.18rem);font-weight:900}.v14-menu button:active{transform:translateY(1px);background:#082744}.v14-menu b{text-align:center}.v14-menu em{font-style:normal;font-size:2.15rem;font-weight:900}.v14-icon{width:42px;height:42px;display:grid;place-items:center;margin:auto;color:#fff;font-style:normal;font-weight:900}.v14-target{font-size:2.7rem;line-height:1}.v14-bars{font-size:2.25rem;transform:rotate(90deg)}.v14-people{font-size:2.25rem;letter-spacing:-8px}.v14-calendar{font-size:2.4rem}.v14-home+.footer{display:none!important}.head,.v6-head,.v7-head{position:sticky!important;top:0!important;z-index:500!important}
@media(max-height:760px){.v14-home{padding-top:8px;grid-template-rows:minmax(82px,20vh) auto 1fr}.v14-logo{max-width:118px;max-height:18vh}.v14-title strong{margin:3px 0}.v14-menu{gap:7px}.v14-menu button{height:52px}.v14-icon{height:36px}.v14-target{font-size:2.3rem}.v14-bars,.v14-people,.v14-calendar{font-size:2rem}}
`;document.head.appendChild(v14css);home();