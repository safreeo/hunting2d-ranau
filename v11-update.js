/* HUNTING 2D RANAU V11 — scenic home, all grey buttons, target-butt Start Scoring icon */
const V11_HOME_BG='https://commons.wikimedia.org/wiki/Special:Redirect/file/Gunung%20Kinabalu%20Sabah.jpg?width=1200';

home=function(){
  page(`<div class="v11-home">
    <div class="v11-shade"></div>
    <div class="v11-content">
      <img class="v11-logo" src="${V9_KTACR_LOGO}" alt="KTACR">
      <div class="v11-title-small">PERTANDINGAN MEMANAH</div>
      <div class="v11-title-big">HUNTING 2D</div>
      <div class="v11-title-year">RANAU 2026</div>
      <div class="v11-menu">
        <button onclick="groupSetup()"><span class="v11-targetbutt"><i></i></span><b>START SCORING</b><em>›</em></button>
        <button onclick="leaderboard()"><span class="v11-icon">🏆</span><b>RANKING</b><em>›</em></button>
        <button onclick="participants()"><span class="v11-icon">👥</span><b>PARTICIPANTS</b><em>›</em></button>
        <button onclick="eventInfo()"><span class="v11-info">i</span><b>EVENT INFO</b><em>›</em></button>
      </div>
    </div>
  </div>`);
};

const v11Style=document.createElement('style');v11Style.textContent=`
.v11-home{position:relative;min-height:100dvh;margin:-9px;background:#173d58 url('${V11_HOME_BG}') center/cover no-repeat;overflow:hidden;color:#fff}.v11-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(3,28,47,.08) 0%,rgba(2,26,35,.12) 36%,rgba(1,22,25,.52) 100%)}.v11-content{position:relative;z-index:1;min-height:100dvh;padding:24px 18px 24px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;text-align:center}.v11-logo{width:152px;height:152px;object-fit:contain;border-radius:50%;margin:0 auto 12px;filter:drop-shadow(0 5px 8px rgba(0,0,0,.38))}.v11-title-small{font-weight:1000;font-style:italic;font-size:1.22rem;line-height:1.1;text-shadow:0 3px 5px #000}.v11-title-big{font-weight:1000;font-style:italic;font-size:3rem;line-height:1;color:#ffd20a;-webkit-text-stroke:1px #4e1a08;text-shadow:4px 5px 0 #b52e13,0 5px 9px #000;margin-top:5px}.v11-title-year{font-weight:1000;font-style:italic;font-size:2.1rem;line-height:1;color:#fff;text-shadow:0 4px 6px #000;margin:8px 0 26px}.v11-menu{width:100%;margin-top:auto;display:grid;gap:10px;padding-bottom:4px}.v11-menu button{width:100%;height:66px;border:2px solid rgba(255,255,255,.95);border-radius:12px;background:linear-gradient(180deg,#f4f5f6,#d9dde1);color:#0b2f5b;display:grid;grid-template-columns:58px 1fr 28px;align-items:center;padding:0 15px;box-shadow:0 5px 12px rgba(0,0,0,.28);font-size:1.08rem;font-weight:900}.v11-menu button:active{transform:translateY(1px);filter:brightness(.94)}.v11-menu b{text-align:center}.v11-menu em{font-style:normal;font-size:2.15rem;font-weight:1000;line-height:1}.v11-icon{font-size:1.55rem;filter:grayscale(1)}.v11-info{width:30px;height:30px;border:4px solid #0b2f5b;border-radius:50%;display:grid;place-items:center;margin:auto;font-family:Georgia,serif;font-size:1.3rem;font-weight:1000;line-height:1}.v11-targetbutt{position:relative;width:38px;height:38px;border-radius:50%;margin:auto;background:radial-gradient(circle,#ffd31a 0 17%,#e33a35 18% 34%,#2d78c8 35% 52%,#f4f4f4 53% 70%,#172d48 71% 100%);box-shadow:0 1px 2px #0005}.v11-targetbutt:before,.v11-targetbutt:after{content:'';position:absolute;background:#0b2f5b;bottom:-9px;width:3px;height:13px;border-radius:2px}.v11-targetbutt:before{left:12px;transform:rotate(25deg)}.v11-targetbutt:after{right:12px;transform:rotate(-25deg)}.v11-targetbutt i{position:absolute;left:7px;right:7px;bottom:-9px;height:3px;background:#0b2f5b;border-radius:3px}.v11-home+.footer{display:none!important}
@media(max-width:390px){.v11-content{padding:18px 14px}.v11-logo{width:132px;height:132px}.v11-title-small{font-size:1.05rem}.v11-title-big{font-size:2.55rem}.v11-title-year{font-size:1.85rem;margin-bottom:20px}.v11-menu button{height:60px;font-size:1rem}}
`;document.head.appendChild(v11Style);
home();
