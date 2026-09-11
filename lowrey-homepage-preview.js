/* THE LOWREY GROUP — HOMEPAGE DESIGN PREVIEW
   Hosted asset. Load through the separate Lofty loader.
   Active ONLY at /?lowrey_preview=1. No content, links, forms or listing data are replaced.
*/
(function () {
  'use strict';
  if (location.pathname !== '/' || new URLSearchParams(location.search).get('lowrey_preview') !== '1') return;
  if (window.lowreyHomepagePreviewCleanup) window.lowreyHomepagePreviewCleanup();
  var root = document.documentElement, hero, video, frame, observer, timer, panel;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var oldVideo, hold = 0;
  var style = document.createElement('style');
  style.id = 'lowrey-homepage-preview-style';
  style.textContent = [
    'html.lowrey-homepage-preview{--lr-navy:#071827;--lr-paper:#f4f3ed;--lr-blue:#9bc8db}',
    '.lowrey-homepage-preview .md-header{background:#071827!important;color:white!important}',
    '.lowrey-homepage-preview .md-header a{color:white!important}',
    '.lowrey-homepage-preview .md-hero.layout1{height:100svh!important;min-height:620px!important;position:relative!important;transform:translate3d(0,var(--lr-hold,0px),0)!important;margin-bottom:var(--lr-space,0px)!important}',
    '.lowrey-homepage-preview .md-hero .banner{height:100%!important;min-height:100%!important;position:relative!important}',
    '.lowrey-homepage-preview .md-hero .banner-video,.lowrey-homepage-preview .md-hero video{height:100%!important;width:100%!important;object-fit:cover!important}',
    '.lowrey-homepage-preview .md-hero .banner-mask{background:linear-gradient(100deg,#071827c9,#07182740 65%,#07182780)!important;pointer-events:none}',
    '.lowrey-homepage-preview .md-hero .media-content-v2{position:absolute!important;inset:0!important;width:100%!important;max-width:none!important;height:100%!important;padding:110px 7% 85px!important;box-sizing:border-box}',
    '.lowrey-homepage-preview .md-hero .media-info{width:100%!important;max-width:1250px!important;margin:auto!important}',
    '.lowrey-homepage-preview .md-hero .title-text{perspective:900px;overflow:visible!important;text-align:left!important}',
    '.lowrey-homepage-preview .md-hero .site-title{text-align:left!important;width:100%!important;max-width:none!important;transform:translate3d(0,var(--lr-rise,0px),var(--lr-depth,0px)) rotateX(var(--lr-tilt,0deg));transform-origin:left center;text-shadow:0 2px 0 #07182766,0 18px 35px #0008}',
    '.lowrey-homepage-preview .md-hero h1{font-size:clamp(36px,5.3vw,78px)!important;line-height:1.04!important;max-width:22ch!important;margin:0 0 28px!important}',
    '.lowrey-homepage-preview .md-hero h1 *{font:inherit!important;letter-spacing:-.045em!important;color:white!important}',
    '.lowrey-homepage-preview .md-hero [aria-level="3"],.lowrey-homepage-preview .md-hero [aria-level="3"] *{font-family:Georgia,serif!important;font-size:clamp(25px,3.4vw,50px)!important;font-weight:400!important;line-height:1.12!important;color:#e5eff2!important}',
    '.lowrey-homepage-preview :is(.md-team,.md-cta,.md-team-desc,.md-house,.md-featured-area){position:relative}',
    '.lowrey-homepage-preview .md-team.layout10{background:#f4f3ed!important;padding:100px 5%!important}',
    '.lowrey-homepage-preview .md-team.layout10 .agent-name{font-size:clamp(32px,4vw,62px)!important;letter-spacing:-.04em;color:#071827!important}',
    '.lowrey-homepage-preview .md-team.layout10 .agent-headshot{box-shadow:22px 26px 0 #071827,0 30px 65px #07182733}',
    '.lowrey-homepage-preview .single-intro{font-size:17px!important;line-height:1.8!important}',
    '.lowrey-homepage-preview .md-cta.layout2{background:#071827!important;padding:100px 6%!important;color:white!important}',
    '.lowrey-homepage-preview .md-cta.layout2 .banner-mask{background:#071827e8!important}',
    '.lowrey-homepage-preview .md-cta.layout2 :is(h2,h3,.site-title,.site-p){color:white!important}',
    '.lowrey-homepage-preview :is(.md-cta,.md-team,.md-house,.md-featured-area) h2{font-size:clamp(32px,4.5vw,66px)!important;line-height:1.06!important;letter-spacing:-.04em!important}',
    '.lowrey-homepage-preview .md-team.layout8{background:white!important;padding:90px 5%!important}',
    '.lowrey-homepage-preview .md-cta.layout10{background:#e8eef0!important;padding:100px 5%!important}',
    '.lowrey-homepage-preview .md-cta.layout10 .img-content{box-shadow:20px 22px 0 #071827}',
    '.lowrey-homepage-preview .md-team-desc.layout7 .top-section{background:#071827!important;color:white!important;padding:100px 6%!important}',
    '.lowrey-homepage-preview .md-team-desc.layout7 .top-content{display:grid!important;grid-template-columns:minmax(200px,1fr) minmax(0,1.65fr);gap:6vw;align-items:start}',
    '.lowrey-homepage-preview .md-team-desc.layout7 :is(.site-title,.desc-intro){text-align:left!important;color:white!important;width:auto!important}',
    '.lowrey-homepage-preview .md-team-desc.layout7 h2{font-size:clamp(40px,5vw,74px)!important;line-height:1!important;color:white!important}',
    '.lowrey-homepage-preview .md-team-desc.layout7 .desc-intro p{color:#e0e8ec!important;font-size:17px!important;line-height:1.8!important}',
    '.lowrey-homepage-preview .md-team-desc.layout7 .desc-intro p:nth-child(odd){padding:24px 0;border-top:1px solid #ffffff40}',
    '.lowrey-homepage-preview .md-house.layout8{background:#f4f3ed!important;padding:85px 0!important}',
    '.lowrey-homepage-preview .md-house .house-info{background:white!important;color:#071827!important;padding:24px!important}',
    '.lowrey-homepage-preview .md-featured-area{background:#071827!important;padding-top:85px!important;padding-bottom:85px!important;color:white!important}',
    '.lowrey-homepage-preview .md-featured-area h2{color:white!important}',
    '.lowrey-homepage-preview .md-footer{background:#071827!important}',
    '#lowrey-preview-tools{position:fixed;bottom:16px;left:16px;z-index:999999;display:flex;gap:6px;max-width:calc(100vw - 32px);flex-wrap:wrap}',
    '#lowrey-preview-tools button{background:#071827;color:white;border:1px solid #9bc8db;padding:10px 13px;border-radius:3px;font:13px Arial;cursor:pointer;min-height:44px}',
    '@media(max-width:760px){.lowrey-homepage-preview .md-hero.layout1{min-height:600px!important}.lowrey-homepage-preview .md-hero .media-content-v2{padding:85px 7% 110px!important}.lowrey-homepage-preview .md-team-desc.layout7 .top-content{grid-template-columns:1fr;gap:30px}.lowrey-homepage-preview .md-team.layout10,.lowrey-homepage-preview .md-cta.layout10{padding:65px 7%!important}.lowrey-homepage-preview .md-team.layout10 .agent-headshot{box-shadow:9px 12px 0 #071827}}',
    '@media(prefers-reduced-motion:reduce){.lowrey-homepage-preview .md-hero .site-title{transform:none!important}}'
  ].join('\n');
  function update() {
    frame = null;
    if (!hero) return;
    var mobile = innerWidth <= 760;
    var distance = reduced.matches ? 0 : innerHeight * (mobile ? 0.4 : 0.65);
    var origin = hero.getBoundingClientRect().top + scrollY - hold;
    hold = Math.min(distance, Math.max(0, scrollY - origin));
    var progress = distance ? hold / distance : 0;
    hero.style.setProperty('--lr-space', distance + 'px');
    hero.style.setProperty('--lr-hold', hold + 'px');
    hero.style.setProperty('--lr-rise', -progress * 35 + 'px');
    hero.style.setProperty('--lr-depth', progress * (mobile ? 45 : 90) + 'px');
    hero.style.setProperty('--lr-tilt', -progress * (mobile ? 13 : 22) + 'deg');
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  function button(label, action) {
    var el = document.createElement('button'); el.type = 'button'; el.textContent = label;
    el.addEventListener('click', action); panel.appendChild(el); return el;
  }
  function install() {
    hero = document.querySelector('.md-hero.layout1');
    if (!hero || !hero.querySelector('h1')) return;
    observer.disconnect(); clearTimeout(timer);
    document.head.appendChild(style); root.classList.add('lowrey-homepage-preview');
    panel = document.createElement('div'); panel.id = 'lowrey-preview-tools';
    button('Design preview · Exit', function () { var url = new URL(location.href); url.searchParams.delete('lowrey_preview'); location.assign(url.href); });
    button('Skip hero', function () { var top = hero.getBoundingClientRect().top + scrollY - hold; scrollTo({top: top + hero.offsetHeight + (parseFloat(hero.style.getPropertyValue('--lr-space')) || 0), behavior: 'auto'}); });
    video = hero.querySelector('video');
    if (video) {
      oldVideo = {muted:video.muted,loop:video.loop,playsInline:video.playsInline,paused:video.paused};
      video.muted = true; video.loop = true; video.playsInline = true;
      var toggle = button('Play / Pause video', function () { if (video.paused) video.play().catch(function () { toggle.textContent = 'Video unavailable'; }); else video.pause(); });
      if (!reduced.matches && !(navigator.connection && navigator.connection.saveData)) video.play().catch(function () { toggle.textContent = 'Play video'; });
    }
    document.body.appendChild(panel);
    addEventListener('scroll', schedule, {passive:true}); addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule); schedule();
  }
  window.lowreyHomepagePreviewCleanup = function () {
    observer.disconnect(); clearTimeout(timer); cancelAnimationFrame(frame);
    removeEventListener('scroll', schedule); removeEventListener('resize', schedule); reduced.removeEventListener('change', schedule);
    root.classList.remove('lowrey-homepage-preview'); style.remove(); if (panel) panel.remove();
    if (hero) ['space','hold','rise','depth','tilt'].forEach(function (key) { hero.style.removeProperty('--lr-' + key); });
    if (video && oldVideo) { video.muted = oldVideo.muted; video.loop = oldVideo.loop; video.playsInline = oldVideo.playsInline; if (oldVideo.paused) video.pause(); }
  };
  observer = new MutationObserver(install); observer.observe(root, {childList:true,subtree:true});
  timer = setTimeout(function () { observer.disconnect(); }, 15000); install();
})();
