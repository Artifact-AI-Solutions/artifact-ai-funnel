// TODO: replace with the real booking link before launch.
var BOOKING_URL = 'https://calendly.com/REPLACE-ME';

document.getElementById('year').textContent = new Date().getFullYear();

// Every "book a call" control points at one URL, so there's a single place to change it.
document.querySelectorAll('.js-book').forEach(function (el) {
  el.href = BOOKING_URL;
  el.target = '_blank';
  el.rel = 'noopener';
});

// Stats count up the first time they scroll into view.
var counters = document.querySelectorAll('[data-count-to]');
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function format(n) {
  return n.toLocaleString('en-US');
}

function countUp(el) {
  var target = parseInt(el.getAttribute('data-count-to'), 10);
  if (isNaN(target)) return;

  if (reduceMotion) {
    el.textContent = format(target);
    return;
  }

  var duration = 1400;
  var start = null;

  function frame(now) {
    if (start === null) start = now;
    var progress = Math.min((now - start) / duration, 1);
    // Ease-out so the number decelerates into its final value.
    var eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = format(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  counters.forEach(function (el) { observer.observe(el); });
} else {
  counters.forEach(countUp);
}

// FAQ: only one answer open at a time.
var faqItems = document.querySelectorAll('.f-list details');
faqItems.forEach(function (item) {
  item.addEventListener('toggle', function () {
    if (!item.open) return;
    faqItems.forEach(function (other) {
      if (other !== item) other.open = false;
    });
  });
});
