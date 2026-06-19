document.getElementById('year').textContent = new Date().getFullYear();

// TODO: replace with real Calendly link
document.getElementById('calendly-link').href = 'https://calendly.com/REPLACE-ME';

document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item = btn.closest('.accordion-item');
    var content = item.querySelector('.accordion-content');
    var isOpen = item.classList.contains('open');

    document.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-content').style.maxHeight = null;
      }
    });

    if (isOpen) {
      item.classList.remove('open');
      content.style.maxHeight = null;
    } else {
      item.classList.add('open');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});
