'use strict';

serviceDataRefreshDone.then(function () {
  // Restore options
  restore_options();

  // Drag services in sidebar
  dragula([document.getElementById('services-menu')], {
    moves: function moves(el, container, handle) {
      return handle.className === 'drag-handle';
    },
    direction: 'vertical'
  }).on('dragend', function (el, container, source) {
    var serviceOrder = [];
    var menuLinks = document.querySelectorAll('.options-menu-link');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = menuLinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var el = _step.value;

        var serviceId = el.getAttribute('data-service-id');
        if (serviceId) {
          serviceOrder.push(serviceId);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    localStorage.setItem('serviceOrder', serviceOrder);
  });

  // Sort services in menu on page load
  var serviceOrder = localStorage.getItem('serviceOrder');
  if (serviceOrder) {
    var serviceOrder = serviceOrder.split(',');
    var menu = document.querySelector('#services-menu');
    var serviceHTML;

    serviceOrder.forEach(function (val, index) {
      serviceHTML = menu.querySelector('[data-service-id="' + val + '"]');
      if (serviceHTML) {
        menu.appendChild(serviceHTML);
      }
    });
  }

  // Responsive menu
  document.querySelector('.options-menu-icon').addEventListener('click', function () {
    var menu = document.querySelector('.options-menu');
    if (menu.classList.contains('expanded')) {
      menu.classList.remove('expanded');
    } else {
      menu.classList.add('expanded');
    }
  });

  // Change view when clicked on object in menu
  var menuLinks = document.querySelectorAll('.options-menu-link');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = menuLinks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var menuLink = _step2.value;

      menuLink.addEventListener('click', switchOptionsView);
    }

    // Link to hash page
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  if (location.hash) {
    var serviceName = location.hash.split('#')[1].toLowerCase();
    document.querySelector('.options-menu-link[data-lowTitle="' + serviceName + '"]').click();
  }

  // Build list of calendars
  document.querySelector('.calendar-loading').innerHTML = serviceData.spinner;

  chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
    var url = "https://www.googleapis.com/calendar/v3/users/me/calendarList?oauth_token=" + token;
    var events = "";

    ajax('GET', url).then(function (data) {
      document.querySelector('.calendar-loading').style.display = 'none';

      var calendarsStorage = serviceData.GC.calendars;

      data.items.forEach(function (calendar) {
        if (calendarsStorage.indexOf(calendar.id) > -1) {
          document.querySelector('.calendar-select-container').insertAdjacentHTML('beforeend', "<div class='calendar-checkbox checkbox-container checked' data-id=" + calendar.id + ">" + "<div class='checkbox'>" + "<div class='checkbox-mark'></div>" + "</div>" + "<span class='checkbox-label'>" + calendar.summary + "</span>" + "</div>");
        } else {
          document.querySelector('.calendar-select-container').insertAdjacentHTML('beforeend', "<div class='calendar-checkbox checkbox-container' data-id=" + calendar.id + ">" + "<div class='checkbox'>" + "<div class='checkbox-mark'></div>" + "</div>" + "<span class='checkbox-label'>" + calendar.summary + "</span>" + "</div>");
        }
      });
    }, function (error) {
      console.log(error);
      document.querySelector('.calendar-loading').style.display = 'none';
      document.querySelector('.calendar-select-container').insertAdjacentHTML('beforeend', '<div>' + '<div class="error-icon"></div>' + '<p>' + 'Failed to connect to Google Calendar check your connection and refresh.' + '</p>' + '</div>');
    });
  });

  // Save options on change of fields
  var inputs = document.querySelectorAll('input, .checkbox-container');
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = inputs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var input = _step3.value;

      input.addEventListener('change', saveOptions);
    }

    // Switch change function
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var switches = document.querySelectorAll('.switch input[type=checkbox]');
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = switches[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var serviceSwitch = _step4.value;

      serviceSwitch.addEventListener('change', saveStatusOptions);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
});

function switchOptionsView(event) {
  var menuItem = event.target.closest('.options-menu-link');
  var serviceName = menuItem.getAttribute('data-title');
  var serviceColor = '#' + menuItem.getAttribute('data-color');
  var optionsWindows = document.querySelectorAll('.options-window');
  var menuLinks = document.querySelectorAll('.options-menu-link');

  document.querySelector('.options-menu').classList.remove('expanded');
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = optionsWindows[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var optionsWindow = _step5.value;

      optionsWindow.style.display = 'none';
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  document.querySelector('.' + serviceName).style.display = 'block';
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = menuLinks[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var menuLink = _step6.value;

      menuLink.classList.remove('active');
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  menuItem.classList.add('active');
  document.querySelector('.options-window-title').style.backgroundColor = serviceColor;
  document.querySelector('.options-window-title-text').innerHTML = serviceName;
  location.hash = '#' + serviceName.toLowerCase();
}

function saveStatusOptions() {
  chrome.storage.sync.set({
    GC_status: document.querySelector('input[type=checkbox][name=GC_status]').checked,
    GM_status: document.querySelector('input[type=checkbox][name=GM_status]').checked,
    CP_status: document.querySelector('input[type=checkbox][name=CP_status]').checked,
    SB_status: document.querySelector('input[type=checkbox][name=SB_status]').checked,
    SAB_status: document.querySelector('input[type=checkbox][name=SAB_status]').checked,
    DN_status: document.querySelector('input[type=checkbox][name=DN_status]').checked,
    HN_status: document.querySelector('input[type=checkbox][name=HN_status]').checked,
    GH_status: document.querySelector('input[type=checkbox][name=GH_status]').checked,
    PH_status: document.querySelector('input[type=checkbox][name=PH_status]').checked,
    DR_status: document.querySelector('input[type=checkbox][name=DR_status]').checked,
    RD_status: document.querySelector('input[type=checkbox][name=RD_status]').checked,
    NG_status: document.querySelector('input[type=checkbox][name=NG_status]').checked,
    SO_status: document.querySelector('input[type=checkbox][name=SO_status]').checked
  }, function () {
    refreshBackgroundServiceData().then(function (backgroundPage) {
      backgroundPage.createAlarms();
    });
  });
}

// Saves options to chrome.storage
function saveOptions() {
  var calendars = [];
  var checkboxes = document.querySelectorAll('.calendar-checkbox.checked');
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = checkboxes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var checkbox = _step7.value;

      calendars.push(checkbox.getAttribute('data-id'));
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  var CP_address = formatUrl('CP-address');
  var SB_address = formatUrl('SB-address');
  var SAB_address = formatUrl('SAB-address');
  var NG_address = formatUrl('NG-address');
  var SO_address = formatUrl('SO-address');

  chrome.storage.sync.set({
    calendars: calendars,
    GC_days: document.querySelector('#GC-days').value,
    GC_width: document.querySelector('#GC-width').value,
    GC_refresh: document.querySelector('#GC-refresh').value,
    GM_width: document.querySelector('#GM-width').value,
    GM_refresh: document.querySelector('#GM-refresh').value,
    CP_address: CP_address,
    CP_port: document.querySelector('#CP-port').value,
    CP_key: document.querySelector('#CP-key').value,
    CP_width: document.querySelector('#CP-width').value,
    CP_refresh: document.querySelector('#CP-refresh').value,
    SB_address: SB_address,
    SB_port: document.querySelector('#SB-port').value,
    SB_key: document.querySelector('#SB-key').value,
    SB_width: document.querySelector('#SB-width').value,
    SB_refresh: document.querySelector('#SB-refresh').value,
    SAB_address: SAB_address,
    SAB_port: document.querySelector('#SAB-port').value,
    SAB_key: document.querySelector('#SAB-key').value,
    SAB_history: document.querySelector('#SAB-history').value,
    SAB_width: document.querySelector('#SAB-width').value,
    SABQ_refresh: document.querySelector('#SABQ-refresh').value,
    SABH_refresh: document.querySelector('#SABH-refresh').value,
    DN_width: document.querySelector('#DN-width').value,
    DN_refresh: document.querySelector('#DN-refresh').value,
    HN_width: document.querySelector('#HN-width').value,
    HN_refresh: document.querySelector('#HN-refresh').value,
    GH_width: document.querySelector('#GH-width').value,
    GH_refresh: document.querySelector('#GH-refresh').value,
    PH_width: document.querySelector('#PH-width').value,
    PH_refresh: document.querySelector('#PH-refresh').value,
    DR_small_images: document.querySelector('.dr-small-images-checkbox').classList.contains('checked'),
    DR_gifs: document.querySelector('.dr-gif-checkbox').classList.contains('checked'),
    DR_width: document.querySelector('#DR-width').value,
    DR_refresh: document.querySelector('#DR-refresh').value,
    RD_subreddit: document.querySelector('#RD-subreddit').value,
    RD_sorting: document.querySelector('#RD-sorting').value,
    RD_width: document.querySelector('#RD-width').value,
    RD_refresh: document.querySelector('#RD-refresh').value,
    NG_address: NG_address,
    NG_port: document.querySelector('#NG-port').value,
    NG_width: document.querySelector('#NG-width').value,
    NGQ_refresh: document.querySelector('#NGQ-refresh').value,
    NGH_refresh: document.querySelector('#NGH-refresh').value,
    NGH_length: document.querySelector('#NGH-length').value,
    NG_username: document.querySelector('#NG-username').value,
    NG_password: document.querySelector('#NG-password').value,
    SO_address: SO_address,
    SO_port: document.querySelector('#SO-port').value,
    SO_key: document.querySelector('#SO-key').value,
    SO_width: document.querySelector('#SO-width').value,
    SO_refresh: document.querySelector('#SO-refresh').value
  }, function () {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      backgroundPage.refreshServiceData();
      backgroundPage.createAlarms();
    });

    var status = document.querySelector('.status');
    status.innerHTML = 'Options saved.';
    status.style.bottom = '16px';
    setTimeout(function () {
      status.style.bottom = '-48px';
      status.innerHTLM = '';
    }, 1000);
  });
}

function restore_options() {
  if (serviceData.GC.status) {
    document.querySelector('input[type=checkbox][name=GC_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#GC-days').value = serviceData.GC.days;
  document.querySelector('#GC-width').value = serviceData.GC.panelWidth;
  document.querySelector('#GC-refresh').value = serviceData.GC.refresh;
  if (serviceData.GM.status) {
    document.querySelector('input[type=checkbox][name=GM_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#GM-width').value = serviceData.GM.panelWidth;
  document.querySelector('#GM-refresh').value = serviceData.GM.refresh;
  if (serviceData.CP.status) {
    document.querySelector('input[type=checkbox][name=CP_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#CP-address').value = serviceData.CP.address;
  document.querySelector('#CP-port').value = serviceData.CP.port;
  document.querySelector('#CP-key').value = serviceData.CP.key;
  document.querySelector('#CP-width').value = serviceData.CP.panelWidth;
  document.querySelector('#CP-refresh').value = serviceData.CP.refresh;
  if (serviceData.SB.status) {
    document.querySelector('input[type=checkbox][name=SB_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#SB-address').value = serviceData.SB.address;
  document.querySelector('#SB-port').value = serviceData.SB.port;
  document.querySelector('#SB-key').value = serviceData.SB.key;
  document.querySelector('#SB-width').value = serviceData.SB.panelWidth;
  document.querySelector('#SB-refresh').value = serviceData.SB.refresh;
  if (serviceData.SAB.status) {
    document.querySelector('input[type=checkbox][name=SAB_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#SAB-address').value = serviceData.SAB.address;
  document.querySelector('#SAB-port').value = serviceData.SAB.port;
  document.querySelector('#SAB-key').value = serviceData.SAB.key;
  document.querySelector('#SAB-history').value = serviceData.SAB.history.length;
  document.querySelector('#SAB-width').value = serviceData.SAB.panelWidth;
  document.querySelector('#SABQ-refresh').value = serviceData.SAB.queue.refresh;
  document.querySelector('#SABH-refresh').value = serviceData.SAB.history.refresh;
  if (serviceData.DN.status) {
    document.querySelector('input[type=checkbox][name=DN_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#DN-width').value = serviceData.DN.panelWidth;
  document.querySelector('#DN-refresh').value = serviceData.DN.refresh;
  if (serviceData.HN.status) {
    document.querySelector('input[type=checkbox][name=HN_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#HN-width').value = serviceData.HN.panelWidth;
  document.querySelector('#HN-refresh').value = serviceData.HN.refresh;
  if (serviceData.GH.status) {
    document.querySelector('input[type=checkbox][name=GH_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#GH-width').value = serviceData.GH.panelWidth;
  document.querySelector('#GH-refresh').value = serviceData.GH.refresh;
  if (serviceData.PH.status) {
    document.querySelector('input[type=checkbox][name=PH_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#PH-width').value = serviceData.PH.panelWidth;
  document.querySelector('#PH-refresh').value = serviceData.PH.refresh;
  if (serviceData.DR.status) {
    document.querySelector('input[type=checkbox][name=DR_status]').setAttribute('checked', 'true');
  }
  if (serviceData.DR.smallImages) {
    document.querySelector('.dr-small-images-checkbox').classList.add('checked');
  }
  if (serviceData.DR.gifs) {
    document.querySelector('.dr-gif-checkbox').classList.add('checked');
  }
  document.querySelector('#DR-width').value = serviceData.DR.panelWidth;
  document.querySelector('#DR-refresh').value = serviceData.DR.refresh;
  if (serviceData.RD.status) {
    document.querySelector('input[type=checkbox][name=RD_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#RD-subreddit').value = serviceData.RD.subreddit;
  document.querySelector('#RD-sorting').value = serviceData.RD.sorting;
  document.querySelector('#RD-width').value = serviceData.RD.panelWidth;
  document.querySelector('#RD-refresh').value = serviceData.RD.refresh;
  if (serviceData.NG.status) {
    document.querySelector('input[type=checkbox][name=NG_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#NG-address').value = serviceData.NG.address;
  document.querySelector('#NG-port').value = serviceData.NG.port;
  document.querySelector('#NG-width').value = serviceData.NG.panelWidth;
  document.querySelector('#NGQ-refresh').value = serviceData.NG.queue.refresh;
  document.querySelector('#NGH-refresh').value = serviceData.NG.history.refresh;
  document.querySelector('#NGH-length').value = serviceData.NG.history.length;
  document.querySelector('#NG-username').value = serviceData.NG.username;
  document.querySelector('#NG-password').value = serviceData.NG.password;
  if (serviceData.SO.status) {
    document.querySelector('input[type=checkbox][name=SO_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#SO-address').value = serviceData.SO.address;
  document.querySelector('#SO-port').value = serviceData.SO.port;
  document.querySelector('#SO-key').value = serviceData.SO.key;
  document.querySelector('#SO-width').value = serviceData.SO.panelWidth;
  document.querySelector('#SO-refresh').value = serviceData.SO.refresh;
}

function formatUrl(fieldname) {
  var inputField = document.querySelector('#' + fieldname);
  if (inputField.value.slice(0, 8) == "https://" || inputField.value.slice(0, 7) == "http://") {
    return inputField.value;
  } else {
    return "http://" + inputField.value;
  }
}
