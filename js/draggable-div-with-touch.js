// external js: draggabilly.pkgd.js

$(document).ready(function () {
  // Initialize all draggable items once to avoid duplicate instances.
  var allDraggableSelectors = '.draggable, .draggable1, .draggable2, .draggable3, .draggable4, .draggable5, .draggable6, .draggable7, .draggable8, .draggable9, .draggable10, .draggable11, .draggable12, .draggable13, .draggable14, .draggableA, .draggableB, .draggableC, .draggableD, .draggableE, .draggableF, .draggableG, .draggableg, .draggableH, .draggableJ';
  var collageSelectors = '.draggableA, .draggableB, .draggableC, .draggableD, .draggableE, .draggableF, .draggableG, .draggableg';

  $(allDraggableSelectors).draggabilly({
    containment: true
  });

  $('.draggable-eye').draggabilly({
    // Completely unrestricted movement across the entire screen!
  }).on('dragEnd', function () {
    var eyeEl = this;
    var parent = eyeEl.offsetParent;
    if (!parent) return;
    var parentRect = parent.getBoundingClientRect();
    var eyeRect = eyeEl.getBoundingClientRect();

    var pctX = (eyeRect.left - parentRect.left) / parentRect.width;
    var pctY = (eyeRect.top - parentRect.top) / parentRect.height;

    eyeEl.setAttribute('data-pct-x', pctX);
    eyeEl.setAttribute('data-pct-y', pctY);
  });

  // While dragging, cursor must stay "grabbing" even if the pointer moves off the element.
  var grabbingSelectors = allDraggableSelectors + ', .draggable-eye';
  $(grabbingSelectors).on('dragStart', function () {
    document.documentElement.classList.add('draggabilly-grabbing');
  });
  $(grabbingSelectors).on('dragEnd', function () {
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

  function handleResizeDraggableEye() {
    var $eye = $('.draggable-eye');
    if ($eye.length === 0) return;
    var eyeEl = $eye[0];

    var pctXStr = eyeEl.getAttribute('data-pct-x');
    var pctYStr = eyeEl.getAttribute('data-pct-y');
    if (pctXStr === null || pctYStr === null) return;

    var pctX = parseFloat(pctXStr);
    var pctY = parseFloat(pctYStr);

    var parent = eyeEl.offsetParent;
    if (!parent) return;
    var parentRect = parent.getBoundingClientRect();

    var isMobile = window.innerWidth <= 1024;
    var initPctX = isMobile ? 0.40 : 1.08;
    var initPctY = isMobile ? 1.02 : 0.02;

    var tx = (pctX - initPctX) * parentRect.width;
    var ty = (pctY - initPctY) * parentRect.height;

    eyeEl.style.transform = 'translate(' + tx + 'px, ' + ty + 'px)';

    var draggie = $eye.data('draggabilly');
    if (draggie) {
      draggie.position.x = tx;
      draggie.position.y = ty;
    }
  }

  var resizeTimer;
  $(window).on('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      clampTransformsToContainer();
      handleResizeDraggableEye();
    }, 80);
  });

  var $tooltip = $('<div class="draggablee-tooltip">click to open</div>');
  $('body').append($tooltip);

  var lastTouchTime = 0;
  function isTouchEventRecently() {
    return (Date.now() - lastTouchTime) < 1000;
  }

  function updateTooltipPosition(clientX, clientY) {
    $tooltip.css({
      left: (clientX + 14) + 'px',
      top: (clientY + 14) + 'px'
    });
  }

  $(collageSelectors)
    .on('mouseenter', function () {
      if (isTouchEventRecently() || $(this).hasClass('is-dragging')) {
        return;
      }
      $tooltip.addClass('is-visible');
    })
    .on('mousemove', function (e) {
      if (isTouchEventRecently()) {
        return;
      }
      updateTooltipPosition(e.clientX, e.clientY);
    })
    .on('mouseleave mousedown dragStart', function () {
      $tooltip.removeClass('is-visible');
    })
    .on('touchstart', function (e) {
      lastTouchTime = Date.now();
      if ($(this).hasClass('is-dragging')) {
        return;
      }
      var touch = e.originalEvent.touches[0];
      if (touch) {
        $tooltip.addClass('is-visible');
        updateTooltipPosition(touch.clientX, touch.clientY);
      }
    })
    .on('touchmove', function (e) {
      lastTouchTime = Date.now();
      var touch = e.originalEvent.touches[0];
      if (touch) {
        updateTooltipPosition(touch.clientX, touch.clientY);
      }
    })
    .on('touchend touchcancel dragEnd', function () {
      lastTouchTime = Date.now();
      $tooltip.removeClass('is-visible');
    })
    .on('dblclick staticClick', function (e) {
      e.preventDefault();
      if ($(this).hasClass('draggableA')) {
        window.location.href = 'about.html';
        return;
      }
      if ($(this).hasClass('draggableB')) {
        window.open('https://drive.google.com/file/d/10ii56-tnkABTpTJusGkihwxdihyR6zFY/view?usp=sharing', '_blank');
        return;
      }
      if ($(this).hasClass('draggableF')) {
        window.location.href = 'contact.html';
        return;
      }
      if ($(this).hasClass('draggableC')) {
        window.location.href = 'works.html?filter=web-development';
        return;
      }
      if ($(this).hasClass('draggableD')) {
        window.location.href = 'works.html?filter=video-editing';
        return;
      }
      if ($(this).hasClass('draggableE')) {
        window.location.href = 'works.html?filter=motion-graphics';
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
        if ($(this).hasClass('draggableB')) {
          window.open('https://drive.google.com/file/d/10ii56-tnkABTpTJusGkihwxdihyR6zFY/view?usp=sharing', '_blank');
          return;
        }
        if ($(this).hasClass('draggableF')) {
          window.open('contact.html', '_blank');
          return;
        }
        if ($(this).hasClass('draggableC')) {
          window.open('works.html?filter=web-development', '_blank');
          return;
        }
        if ($(this).hasClass('draggableD')) {
          window.open('works.html?filter=video-editing', '_blank');
          return;
        }
        if ($(this).hasClass('draggableE')) {
          window.open('works.html?filter=motion-graphics', '_blank');
          return;
        }
        window.open('works.html', '_blank');
      }
    });

});

