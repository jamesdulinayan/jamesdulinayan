// external js: draggabilly.pkgd.js

$(document).ready(function () {
  // Initialize all draggable items once to avoid duplicate instances.
  var allDraggableSelectors = '.draggable, .draggable1, .draggable2, .draggable3, .draggable4, .draggable5, .draggable6, .draggable7, .draggable8, .draggable9, .draggable10, .draggable11, .draggable12, .draggable13, .draggable14, .draggableA, .draggableB, .draggableC, .draggableD, .draggableE, .draggableF, .draggableG, .draggableg, .draggableH, .draggableJ';
  var collageSelectors = '.draggableA, .draggableB, .draggableC, .draggableD, .draggableE, .draggableF, .draggableG, .draggableg';
  var isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
  var isLongTapTriggered = false;

  // Make all items fully draggable on both touch devices and desktop!
  $(allDraggableSelectors).draggabilly({
    containment: true
  });

  // On touch devices, allow normal dragging but trigger simulated "right-click" (Action Sheet) on long-tap
  if (isTouchDevice) {
    var longTapTimeout;
    var touchStartX = 0;
    var touchStartY = 0;

    var actionSheetStyles = `
      .mobile-action-sheet-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 999999;
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        pointer-events: none;
      }
      .mobile-action-sheet-backdrop.is-visible {
        opacity: 1;
        pointer-events: auto;
      }
      .mobile-action-sheet {
        width: 100%;
        max-width: 500px;
        background: #ffffff;
        border-radius: 20px 20px 0 0;
        padding: 20px 24px 34px;
        box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.15);
        transform: translateY(100%);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        box-sizing: border-box;
      }
      body.dark .mobile-action-sheet {
        background: #1c1c1e;
        box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);
      }
      .mobile-action-sheet-backdrop.is-visible .mobile-action-sheet {
        transform: translateY(0);
      }
      .mobile-action-sheet-title {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-weight: 600;
        font-size: 14px;
        color: #8e8e93;
        text-align: center;
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .mobile-action-sheet-btn {
        display: block;
        width: 100%;
        padding: 16px;
        margin-bottom: 8px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.05);
        color: #000000;
        border: none;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-weight: 500;
        font-size: 16px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        box-sizing: border-box;
        transition: background 0.2s ease, transform 0.1s ease;
      }
      body.dark .mobile-action-sheet-btn {
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
      }
      .mobile-action-sheet-btn:active {
        transform: scale(0.98);
        background: rgba(0, 0, 0, 0.1);
      }
      body.dark .mobile-action-sheet-btn:active {
        background: rgba(255, 255, 255, 0.15);
      }
      .mobile-action-sheet-btn.cancel-btn {
        background: #ff3b30;
        color: #ffffff !important;
        margin-top: 12px;
        margin-bottom: 0;
        font-weight: 600;
      }
      .mobile-action-sheet-btn.cancel-btn:active {
        background: #e03126;
      }
      .mobile-action-sheet-toast {
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(0, 0, 0, 0.8);
        color: #ffffff;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        font-family: sans-serif;
        z-index: 1000000;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        pointer-events: none;
      }
      .mobile-action-sheet-toast.is-visible {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    `;
    $('<style>').text(actionSheetStyles).appendTo('head');

    function showActionSheet($el) {
      var href = $el.attr('href');
      if (!href) {
        if ($el.hasClass('draggableA')) href = 'about.html';
        else if ($el.hasClass('draggableB')) href = 'https://drive.google.com/file/d/10ii56-tnkABTpTJusGkihwxdihyR6zFY/view?usp=sharing';
        else if ($el.hasClass('draggableF')) href = 'contact.html';
        else if ($el.hasClass('draggableC')) href = 'works.html?filter=web-development';
        else if ($el.hasClass('draggableD')) href = 'works.html?filter=video-editing';
        else if ($el.hasClass('draggableE')) href = 'works.html?filter=motion-graphics';
        else href = 'works.html';
      }

      var absoluteUrl = new URL(href, window.location.href).href;
      var $backdrop = $('<div class="mobile-action-sheet-backdrop"></div>');
      var $sheet = $('<div class="mobile-action-sheet"></div>');
      
      var title = 'Link Options';
      if ($el.hasClass('draggableA')) title = 'James Dulinayan | About';
      else if ($el.hasClass('draggableB')) title = 'James Dulinayan | Resume (Google Drive)';
      else if ($el.hasClass('draggableC')) title = 'Works | Web Development';
      else if ($el.hasClass('draggableD')) title = 'Works | Video Editing';
      else if ($el.hasClass('draggableE')) title = 'Works | Motion Graphics';
      else if ($el.hasClass('draggableF')) title = 'James Dulinayan | Contact';

      $sheet.append('<div class="mobile-action-sheet-title">' + title + '</div>');
      
      var $openBtn = $('<button class="mobile-action-sheet-btn">Open Link</button>');
      var $openNewTabBtn = $('<button class="mobile-action-sheet-btn">Open in New Tab</button>');
      var $copyBtn = $('<button class="mobile-action-sheet-btn">Copy Link Address</button>');
      var $cancelBtn = $('<button class="mobile-action-sheet-btn cancel-btn">Cancel</button>');

      $sheet.append($openBtn, $openNewTabBtn, $copyBtn, $cancelBtn);
      $backdrop.append($sheet);
      $('body').append($backdrop);

      setTimeout(function() {
        $backdrop.addClass('is-visible');
      }, 10);

      $openBtn.on('click', function() {
        closeSheet(function() {
          window.location.href = href;
        });
      });

      $openNewTabBtn.on('click', function() {
        closeSheet(function() {
          window.open(href, '_blank');
        });
      });

      $copyBtn.on('click', function() {
        navigator.clipboard.writeText(absoluteUrl).then(function() {
          showToast('Link copied to clipboard!');
        });
        closeSheet();
      });

      $cancelBtn.on('click', function() {
        closeSheet();
      });

      $backdrop.on('click', function(e) {
        if (e.target === this) {
          closeSheet();
        }
      });

      function closeSheet(callback) {
        $backdrop.removeClass('is-visible');
        setTimeout(function() {
          $backdrop.remove();
          if (callback) callback();
        }, 300);
      }
    }

    function showToast(message) {
      var $toast = $('<div class="mobile-action-sheet-toast">' + message + '</div>');
      $('body').append($toast);
      setTimeout(function() {
        $toast.addClass('is-visible');
      }, 10);
      setTimeout(function() {
        $toast.removeClass('is-visible');
        setTimeout(function() {
          $toast.remove();
        }, 300);
      }, 2000);
    }

    $(collageSelectors)
      .on('touchstart', function (e) {
        lastTouchTime = Date.now();
        var touch = e.originalEvent.touches[0];
        if (!touch) return;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        isLongTapTriggered = false;

        // Show tooltip under finger immediately
        $tooltip.addClass('is-visible');
        updateTooltipPosition(touch.clientX, touch.clientY);

        // Clear any active timeout
        clearTimeout(longTapTimeout);

        var $el = $(this);
        longTapTimeout = setTimeout(function () {
          isLongTapTriggered = true;
          $tooltip.removeClass('is-visible'); // Hide tooltip when action sheet opens
          showActionSheet($el);
        }, 600); // 600ms hold triggers the right-click menu
      })
      .on('touchmove', function (e) {
        lastTouchTime = Date.now();
        var touch = e.originalEvent.touches[0];
        if (!touch) return;
        
        // If they move their finger more than 10px, they are dragging, so cancel the long tap timer AND hide the tooltip!
        if (Math.abs(touch.clientX - touchStartX) > 10 || Math.abs(touch.clientY - touchStartY) > 10) {
          clearTimeout(longTapTimeout);
          $tooltip.removeClass('is-visible');
        } else {
          // If they haven't dragged yet, update tooltip position
          updateTooltipPosition(touch.clientX, touch.clientY);
        }
      })
      .on('touchend touchcancel dragEnd', function () {
        lastTouchTime = Date.now();
        clearTimeout(longTapTimeout);
        $tooltip.removeClass('is-visible');
      })
      .on('click', function (e) {
        e.preventDefault();
      });
  }

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
    $tooltip.removeClass('is-visible');
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

  // Tooltip element creation (shared across desktop hover and mobile touch)
  var $tooltip = $('<div class="draggablee-tooltip">click to open</div>');
  $('body').append($tooltip);

  function updateTooltipPosition(clientX, clientY) {
    $tooltip.css({
      left: (clientX + 14) + 'px',
      top: (clientY + 14) + 'px'
    });
  }

  var lastTouchTime = 0;
  function isTouchEventRecently() {
    return (Date.now() - lastTouchTime) < 1000;
  }

  // Hover behaviors (only for desktop / mouse cursor)
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
    });

  // Unified click/navigation behavior for ALL devices (both desktop and mobile!)
  $(collageSelectors)
    .on('dblclick staticClick', function (e) {
      e.preventDefault();

      // On mobile, if a long-press Action Sheet was just triggered, skip navigation!
      if (isLongTapTriggered) {
        isLongTapTriggered = false;
        return;
      }

      var $el = $(this);
      var href = $el.attr('href');
      var target = $el.attr('target');
      
      if (!href) {
        if ($el.hasClass('draggableA')) href = 'about.html';
        else if ($el.hasClass('draggableB')) href = 'https://drive.google.com/file/d/10ii56-tnkABTpTJusGkihwxdihyR6zFY/view?usp=sharing';
        else if ($el.hasClass('draggableF')) href = 'contact.html';
        else if ($el.hasClass('draggableC')) href = 'works.html?filter=web-development';
        else if ($el.hasClass('draggableD')) href = 'works.html?filter=video-editing';
        else if ($el.hasClass('draggableE')) href = 'works.html?filter=motion-graphics';
        else href = 'works.html';
      }
      
      if (href) {
        if (target === '_blank' || $el.hasClass('draggableB')) {
          window.open(href, '_blank');
        } else {
          window.location.href = href;
        }
      }
    })
    .on('auxclick', function (e) {
      if (e.button === 1) {
        e.preventDefault();
        var $el = $(this);
        var href = $el.attr('href');
        if (!href) {
          if ($el.hasClass('draggableA')) href = 'about.html';
          else if ($el.hasClass('draggableB')) href = 'https://drive.google.com/file/d/10ii56-tnkABTpTJusGkihwxdihyR6zFY/view?usp=sharing';
          else if ($el.hasClass('draggableF')) href = 'contact.html';
          else if ($el.hasClass('draggableC')) href = 'works.html?filter=web-development';
          else if ($el.hasClass('draggableD')) href = 'works.html?filter=video-editing';
          else if ($el.hasClass('draggableE')) href = 'works.html?filter=motion-graphics';
          else href = 'works.html';
        }
        if (href) {
          window.open(href, '_blank');
        }
      }
    })
    .on('click', function (e) {
      e.preventDefault();
    });

});

