/* ═══════════════════════════════════════════════════════
   BRECOTO SG International Limited — Shared JavaScript
   ═══════════════════════════════════════════════════════ */

/* ── 1. Navbar scroll ── */
(function(){
  var nav = document.getElementById('nav');
  if(!nav) return;
  function onScroll(){ nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

/* ── 2. Mobile menu ── */
function toggleMenu(){
  var mob = document.getElementById('mob-menu');
  var burger = document.getElementById('burger');
  if(!mob) return;
  var open = mob.classList.toggle('open');
  if(burger) burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
(function(){
  var mob = document.getElementById('mob-menu');
  if(!mob) return;
  mob.addEventListener('click', function(e){
    var t = e.target;
    if(t.classList.contains('nl') || t.classList.contains('nav-cta') || t.closest('.nav-cta')){
      toggleMenu();
    }
  });
})();

/* ── 3. Active nav link detection (URL-based) ── */
(function(){
  var path = window.location.pathname.split('/').pop() || 'index.html';
  if(path === '') path = 'index.html';
  var page = path.replace('.html', '') || 'index';
  document.querySelectorAll('.nl[data-page]').forEach(function(a){
    if(a.getAttribute('data-page') === page) a.classList.add('act');
  });
})();

/* ── 4. Scroll reveal (IntersectionObserver) ── */
(function(){
  if(!window.IntersectionObserver) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('in'); });
  }, {threshold: 0.1});
  document.querySelectorAll('.fi, .sl, .sr').forEach(function(el){ io.observe(el); });
})();

/* ── 5. Counter animation ── */
(function(){
  if(!window.IntersectionObserver) return;
  function animNum(el, target){
    var start = performance.now(), duration = 1600;
    function step(now){
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var t = parseInt(e.target.getAttribute('data-count'));
        if(!isNaN(t)) animNum(e.target, t);
        cio.unobserve(e.target);
      }
    });
  }, {threshold: 0.4});
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });
})();

/* ── 6. FAQ Accordion ── */
(function(){
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    if(!q) return;
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){ o.classList.remove('open'); });
      if(!isOpen) item.classList.add('open');
    });
  });
})();
