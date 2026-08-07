var BOOKING_URL = 'https://link.infinitygm.no/widget/bookings/discovery-callz-2026';

document.getElementById('year').textContent = new Date().getFullYear();

// Every "book a call" control resolves to one URL, so there's a single place
// to change it. The href stays real: without JS, or on middle-click /
// ctrl-click, the booking page still opens normally.
var bookLinks = document.querySelectorAll('.js-book');
bookLinks.forEach(function (el) {
  el.href = BOOKING_URL;
  el.target = '_blank';
  el.rel = 'noopener';
});

// ---------- Booking modal ----------
// Keeps the visitor on the page instead of handing them off mid-funnel.
var modal = document.getElementById('booking-modal');
var frame = document.getElementById('booking-frame');
// Not `status` — a global `var status` assigns to window.status, a legacy
// Window property that coerces its value to a string. The element would
// silently become "[object HTMLParagraphElement]" and every write below
// would be a no-op.
var bookingStatus = document.getElementById('booking-status');
var lastFocused = null;
var frameLoaded = false;

function openBooking() {
  // Load the widget on first open only — no third-party request on page load.
  if (!frameLoaded) {
    frame.src = BOOKING_URL;
    frameLoaded = true;
  }
  lastFocused = document.activeElement;
  modal.hidden = false;
  // Lock the page behind the modal without losing scroll position.
  document.body.style.top = '-' + window.scrollY + 'px';
  document.body.classList.add('booking-open');
  modal.querySelector('.booking-close').focus();
}

function closeBooking() {
  if (modal.hidden) return;
  modal.hidden = true;
  var y = Math.abs(parseInt(document.body.style.top || '0', 10));
  document.body.classList.remove('booking-open');
  document.body.style.top = '';
  // The page sits at scroll 0 while the body is fixed, so this is a jump back
  // to where they were — it has to be instant. Under the stylesheet's
  // `scroll-behavior: smooth` it would animate, flinging the whole page past
  // them on every close.
  var root = document.documentElement;
  var prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, y);
  root.style.scrollBehavior = prevBehavior;

  // preventScroll matters too: focus() scrolls its element into view by
  // default, which would drag the page back to whichever CTA was clicked.
  if (lastFocused && lastFocused.focus) lastFocused.focus({ preventScroll: true });
}

bookLinks.forEach(function (el) {
  el.addEventListener('click', function (e) {
    // Leave modified clicks alone so "open in new tab" keeps working.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    openBooking();
  });
});

modal.querySelectorAll('[data-close-booking]').forEach(function (el) {
  el.addEventListener('click', closeBooking);
});

document.addEventListener('keydown', function (e) {
  if (modal.hidden) return;
  if (e.key === 'Escape') { closeBooking(); return; }
  if (e.key !== 'Tab') return;
  // Trap focus: only the close button is focusable outside the iframe, so
  // Tab would otherwise walk off into the page behind the modal.
  var focusables = modal.querySelectorAll('button, [href], iframe');
  if (!focusables.length) return;
  var first = focusables[0];
  var last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

// If the widget is blocked or fails, say so and hand over a working link
// rather than leaving someone staring at "Loading…" forever.
frame.addEventListener('load', function () { bookingStatus.textContent = ''; });
setTimeout(function () {
  if (frameLoaded && bookingStatus.textContent) {
    bookingStatus.innerHTML = 'The calendar is taking a moment. <a href="' + BOOKING_URL +
      '" target="_blank" rel="noopener">Open it in a new tab</a>.';
  }
}, 8000);

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
