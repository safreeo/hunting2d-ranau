/* HUNTING 2D RANAU V5 — event organiser + footer cleanup */

/* Remove the generic footer from every rendered page. */
page=function(x){A.innerHTML=`<div class="wrap">${x}</div>`;scrollTo(0,0)};

/* Event Info: add organiser directly after venue. */
eventInfo=function(){
  page(`${head('EVENT INFO')}
    <div class="card">
      <h3>Hunting 2D Ranau 2026</h3>
      <p><b>Category:</b> Lelaki & Wanita</p>
      <p><b>Checkpoints:</b> 21</p>
      <p><b>Arrows / CP:</b> 3</p>
      <p><b>Distance:</b> 7 ~ 20 meter</p>
      <p><b>Scoring Matrix:</b> 8, 5, 3, M</p>
      <p><b>Tie-break:</b> Points → 8 → 5 → 3</p>
      <p><b>Tarikh:</b> 25 Oktober 2026</p>
      <p><b>Masa:</b> 7.30 pagi</p>
      <p><b>Tempat:</b> Soboh Range, Kampung Lasing, Ranau</p>
      <p><b>Anjuran:</b> Kinabalu Traditional Archery Club Ranau (KTACR)</p>
      <p class="muted">Scores are saved automatically on this device.</p>
    </div>`);
};
