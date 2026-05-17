// external js: draggabilly.pkgd.js

$(document).ready(function () {
  // Initialize all draggable items once to avoid duplicate instances.
  var allDraggableSelectors = '.draggable, .draggable1, .draggable2, .draggable3, .draggable4, .draggable5, .draggable6, .draggable7, .draggable8, .draggable9, .draggable10, .draggable11, .draggable12, .draggable13, .draggable14, .draggableA, .draggableB, .draggableC, .draggableD, .draggableE, .draggableF, .draggableG, .draggableg, .draggableH, .draggableJ';
  var collageSelectors = '.draggableA, .draggableB, .draggableC, .draggableD, .draggableE, .draggableF, .draggableG, .draggableg';

  $(allDraggableSelectors).draggabilly({
    containment: true
  });

  // While dragging, cursor must stay "grabbing" even if the pointer moves off the element.
  $(allDraggableSelectors).on('dragStart', function () {
    document.documentElement.classList.add('draggabilly-grabbing');
  });
  $(allDraggableSelectors).on('dragEnd', function () {
    document.documentElement.classList.remove('draggabilly-grabbing');
  });

  function clampTransformsToContainer() {
    var $containers = $('.container');
    if ($containers.length === 0) return;

    $containers.each(function () {
      var $container = $(this);
      var containerRect = this.getBoundingClientRect();

      $container.find(collageSelectors).each(function () {
        var el = this;
        var rect = el.getBoundingClientRect();

        // Ensure element is inside container after resizes.
        var dx = 0;
        var dy = 0;

        if (rect.left < containerRect.left) dx = containerRect.left - rect.left;
        if (rect.right > containerRect.right) dx = containerRect.right - rect.right;
        if (rect.top < containerRect.top) dy = containerRect.top - rect.top;
        if (rect.bottom > containerRect.bottom) dy = containerRect.bottom - rect.bottom;

        if (dx === 0 && dy === 0) return;

        var style = window.getComputedStyle(el);
        var transform = style.transform;
        var currentX = 0;
        var currentY = 0;

        if (transform && transform !== 'none') {
          var match = transform.match(/matrix\(([^)]+)\)/);
          if (match && match[1]) {
            var parts = match[1].split(',').map(function (p) { return parseFloat(p); });
            // matrix(a,b,c,d,tx,ty)
            if (parts.length >= 6) {
              currentX = parts[4] || 0;
              currentY = parts[5] || 0;
            }
          } else {
            var match3d = transform.match(/matrix3d\(([^)]+)\)/);
            if (match3d && match3d[1]) {
              var parts3d = match3d[1].split(',').map(function (p) { return parseFloat(p); });
              // matrix3d(..., tx, ty, tz) => indices 12,13,14
              if (parts3d.length >= 16) {
                currentX = parts3d[12] || 0;
                currentY = parts3d[13] || 0;
              }
            }
          }
        }

        var nextX = currentX + dx;
        var nextY = currentY + dy;
        el.style.transform = 'translate(' + nextX + 'px,' + nextY + 'px)';
      });
    });
  }

  var resizeTimer;
  $(window).on('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(clampTransformsToContainer, 80);
  });

  $(collageSelectors).on('dragStart dragMove', function () {
    $('.draggablee-tooltip').removeClass('is-visible');
  });

  var $tooltip = $('<div class="draggablee-tooltip">double click to open</div>');
  $('body').append($tooltip);

  $(collageSelectors)
    .on('mouseenter', function () {
      if ($(this).hasClass('is-dragging')) {
        return;
      }
      $tooltip.addClass('is-visible');
    })
    .on('mousemove', function (e) {
      $tooltip.css({
        left: (e.clientX + 14) + 'px',
        top: (e.clientY + 14) + 'px'
      });
    })
    .on('mouseleave mousedown touchstart pointerdown dragStart', function () {
      $tooltip.removeClass('is-visible');
    })
    .on('dblclick', function (e) {
      e.preventDefault();
      if ($(this).hasClass('draggableA')) {
        window.location.href = 'about.html';
        return;
      }
      if ($(this).hasClass('draggableF')) {
        window.location.href = 'contact.html';
        return;
      }
      window.location.href = 'works.html';
    })
    .on('auxclick', function (e) {
      if (e.button === 1) {
        e.preventDefault();
        if ($(this).hasClass('draggableA')) {
          window.open('about.html', '_blank');
          return;
        }
        if ($(this).hasClass('draggableF')) {
          window.open('contact.html', '_blank');
          return;
        }
        window.open('works.html', '_blank');
      }
    });

});

