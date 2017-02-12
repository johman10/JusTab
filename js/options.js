import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import store from 'store/index';

import vOptions from 'options/v-options';
import vOptionsGoogleCalendar from 'options/v-options-google-calendar';
import vOptionsCouchPotato from 'options/v-options-couch-potato';

Vue.use(Vuex);
Vue.use(VueRouter);

const routes = [
  { path: '', component: vOptionsGoogleCalendar },
  { path: 'googlecalendar', component: vOptionsGoogleCalendar },
  { path: 'couchpotato', component: vOptionsCouchPotato },
];

const router = new VueRouter({
  routes
});

new Vue({
  el: '.options',
  store,
  router,
  beforeCreate () {
    this.$store.dispatch('loadServices');
  },
  render: h => h(vOptions)
});


// // serviceDataRefreshDone.then(function() {
//   // Restore options
//   restore_options();

//   // Drag services in sidebar
//   dragula(
//     [document.getElementById('services-menu')],
//     {
//       moves: function (el, container, handle) {
//         return handle.className === 'drag-handle';
//       },
//       direction: 'vertical'
//     }
//   ).on('dragend', function(el, container, source) {
//     var serviceOrder = [];
//     var menuLinks = document.querySelectorAll('.options-menu-link');
//     for(var el of menuLinks) {
//       var serviceId = el.getAttribute('data-service-id')
//       if (serviceId) {
//         serviceOrder.push(serviceId);
//       }
//     }
//     localStorage.setItem('serviceOrder', serviceOrder);
//   });

//   // Sort services in menu on page load
//   var serviceOrder = localStorage.getItem('serviceOrder');
//   if (serviceOrder) {
//     var serviceOrder = serviceOrder.split(',');
//     var menu = document.querySelector('#services-menu');
//     var serviceHTML;

//     serviceOrder.forEach(function(val, index) {
//       serviceHTML = menu.querySelector('[data-service-id="' + val + '"]');
//       if (serviceHTML) {
//         menu.appendChild(serviceHTML);
//       }
//     });
//   }

//   // Responsive menu
//   document.querySelector('.options-menu-icon').addEventListener('click', function() {
//     var menu = document.querySelector('.options-menu');
//     if (menu.classList.contains('expanded')) {
//       menu.classList.remove('expanded');
//     } else {
//       menu.classList.add('expanded');
//     }
//   });

//   // Change view when clicked on object in menu
//   var menuLinks = document.querySelectorAll('.options-menu-link')
//   for (var menuLink of menuLinks) {
//     menuLink.addEventListener('click', switchOptionsView);
//   }

//   // Link to hash page
//   if (location.hash) {
//     var serviceName = location.hash.split('#')[1].toLowerCase();
//     document.querySelector('.options-menu-link[data-lowTitle="' + serviceName + '"]').click();
//   }

//   // Build list of calendars
//   document.querySelector('.calendar-loading').innerHTML = serviceData.spinner;

//   chrome.identity.getAuthToken({ 'interactive': true },function (token) {
//     var url = "https://www.googleapis.com/calendar/v3/users/me/calendarList?oauth_token=" + token;
//     var checkboxContainer = document.querySelector('.calendar-select-container');
//     var events = "";

//     ajax('GET', url)
//     .then(function(data) {
//       document.querySelector('.calendar-loading').style.display = 'none';

//       var calendarsStorage = serviceData.GC.calendars;
//       var checked;

//       data.items.forEach(function(calendar) {
//         checked = calendarsStorage.indexOf(calendar.id) > -1;
//         checkboxContainer.insertAdjacentHTML('beforeend', checkboxTemplate(calendar, checked));
//       });

//       createEventListeners();
//     }, function(error) {
//       console.log(error);
//       document.querySelector('.calendar-loading').style.display = 'none';
//       checkboxContainer.insertAdjacentHTML('beforeend',
//         '<div>' +
//           '<div class="error-icon"></div>' +
//           '<p>' +
//             'Failed to connect to Google Calendar check your connection and refresh.' +
//           '</p>' +
//         '</div>'
//       );

//       createEventListeners();
//     });
//   });

// // });

// function createEventListeners() {
//   // Save options on change of fields
//   var inputs = document.querySelectorAll('input');
//   for (var input of inputs) {
//     input.addEventListener('change', saveOptions);
//   }

//   // Switch change function
//   var switches = document.querySelectorAll('.switch input[type=checkbox]');
//   for (var serviceSwitch of switches) {
//     serviceSwitch.addEventListener('change', saveStatusOptions);
//   }
// }

// function checkboxTemplate(calendar, checked) {
//   return "<div class='calendar-checkbox checkbox-container'>" +
//     "<input type='checkbox' value='" + calendar.id + "' id='checkbox-" + calendar.id + "' class='checkbox-actual'" + (checked ? " checked" : "") + ">" +
//     "<label for='checkbox-" + calendar.id + "'class='checkbox-label'>" +
//       "<div class='checkbox'>" +
//         "<div class='checkbox-mark'></div>" +
//       "</div>" +
//       calendar.summary +
//     "</label>" +
//   "</div>"
// }

// function switchOptionsView(event) {
//   var menuItem = event.target.closest('.options-menu-link');
//   var serviceName = menuItem.getAttribute('data-title');
//   var serviceColor = '#' + menuItem.getAttribute('data-color');
//   var optionsWindows = document.querySelectorAll('.options-window');
//   var menuLinks = document.querySelectorAll('.options-menu-link');

//   document.querySelector('.options-menu').classList.remove('expanded');
//   for (var optionsWindow of optionsWindows) {
//     optionsWindow.style.display = 'none';
//   }
//   document.querySelector('.' + serviceName).style.display = 'block';
//   for (var menuLink of menuLinks) {
//     menuLink.classList.remove('active');
//   }
//   menuItem.classList.add('active');
//   document.querySelector('.options-window-title').style.backgroundColor = serviceColor;
//   document.querySelector('.options-window-title-text').innerHTML = serviceName;
//   location.hash = '#' + serviceName.toLowerCase();
// }

// function saveStatusOptions() {
//   var checkboxes = document.querySelectorAll('input[type=checkbox]');
//   var hash = {};

//   for (var checkbox of checkboxes) {
//     var checkboxName = checkbox.getAttribute('name');
//     if (checkboxName && checkboxName.endsWith('_status')) {
//       hash[checkboxName] = checkbox.checked;
//     }
//   }

//   chrome.storage.sync.set(hash, function() {
//     refreshBackgroundServiceData().then(function(backgroundPage) {
//       backgroundPage.createAlarms();
//     })
//   });
// }

// // Saves options to chrome.storage
// function saveOptions() {
//   var calendars = [];
//   var checkboxes = document.querySelectorAll('.calendar-checkbox .checkbox-actual:checked');
//   for (var checkbox of checkboxes) {
//     calendars.push(checkbox.getAttribute('value'));
//   }

//   var CP_address = formatUrl('CP-address');
//   var SB_address = formatUrl('SB-address');
//   var SAB_address = formatUrl('SAB-address');
//   var NG_address = formatUrl('NG-address');
//   var SO_address = formatUrl('SO-address');

//   var hash = {
//     calendars: calendars,
//     DR_small_images: document.querySelector('.dr-small-images-checkbox').classList.contains('checked'),
//     DR_gifs: document.querySelector('.dr-gif-checkbox').classList.contains('checked'),
//     CP_address: CP_address,
//     SB_address: SB_address,
//     SAB_address: SAB_address,
//     NG_address: NG_address,
//     SO_address: SO_address,
//   }

//   var inputs = document.querySelectorAll('input[type=text], input[type=password], input[type=number]'),
//     value, id, key
//   for (var input of inputs) {
//     value = input.value;
//     key = input.getAttribute('name');
//     if (key && (typeof value !== 'undefined' || typeof value !== 'null')) {
//       hash.key = value;
//     }
//   }

//   chrome.storage.sync.set(hash, function() {
//     chrome.runtime.getBackgroundPage(function(backgroundPage) {
//       backgroundPage.refreshServiceData();
//       backgroundPage.createAlarms();
//     });

//     var status = document.querySelector('.status');
//     status.innerHTML = 'Options saved.';
//     status.style.bottom = '16px';
//     setTimeout(function() {
//       status.style.bottom = '-48px';
//       status.innerHTLM = '';
//     }, 1000);
//   });
// }

// function restore_options() {
//   if (serviceData.GC.status) {
//     document.querySelector('input[type=checkbox][name=GC_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#GC-days').value = serviceData.GC.days;
//   document.querySelector('#GC-width').value = serviceData.GC.panelWidth;
//   document.querySelector('#GC-refresh').value = serviceData.GC.refresh;
//   if (serviceData.GM.status) {
//     document.querySelector('input[type=checkbox][name=GM_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#GM-width').value = serviceData.GM.panelWidth;
//   document.querySelector('#GM-refresh').value = serviceData.GM.refresh;
//   if (serviceData.CP.status) {
//     document.querySelector('input[type=checkbox][name=CP_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#CP-address').value = serviceData.CP.address;
//   document.querySelector('#CP-port').value = serviceData.CP.port;
//   document.querySelector('#CP-key').value = serviceData.CP.key;
//   document.querySelector('#CP-width').value = serviceData.CP.panelWidth;
//   document.querySelector('#CP-refresh').value = serviceData.CP.refresh;
//   if (serviceData.SB.status) {
//     document.querySelector('input[type=checkbox][name=SB_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#SB-address').value = serviceData.SB.address;
//   document.querySelector('#SB-port').value = serviceData.SB.port;
//   document.querySelector('#SB-key').value = serviceData.SB.key;
//   document.querySelector('#SB-width').value = serviceData.SB.panelWidth;
//   document.querySelector('#SB-refresh').value = serviceData.SB.refresh;
//   if (serviceData.SAB.status) {
//     document.querySelector('input[type=checkbox][name=SAB_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#SAB-address').value = serviceData.SAB.address;
//   document.querySelector('#SAB-port').value = serviceData.SAB.port;
//   document.querySelector('#SAB-key').value = serviceData.SAB.key;
//   document.querySelector('#SAB-history').value = serviceData.SAB.history.length;
//   document.querySelector('#SAB-width').value = serviceData.SAB.panelWidth;
//   document.querySelector('#SABQ-refresh').value = serviceData.SAB.queue.refresh;
//   document.querySelector('#SABH-refresh').value = serviceData.SAB.history.refresh;
//   if (serviceData.DN.status) {
//     document.querySelector('input[type=checkbox][name=DN_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#DN-width').value = serviceData.DN.panelWidth;
//   document.querySelector('#DN-refresh').value = serviceData.DN.refresh;
//   if (serviceData.HN.status) {
//     document.querySelector('input[type=checkbox][name=HN_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#HN-width').value = serviceData.HN.panelWidth;
//   document.querySelector('#HN-refresh').value = serviceData.HN.refresh;
//   if (serviceData.GH.status) {
//     document.querySelector('input[type=checkbox][name=GH_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#GH-width').value = serviceData.GH.panelWidth;
//   document.querySelector('#GH-refresh').value = serviceData.GH.refresh;
//   if (serviceData.PH.status) {
//     document.querySelector('input[type=checkbox][name=PH_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#PH-width').value = serviceData.PH.panelWidth;
//   document.querySelector('#PH-refresh').value = serviceData.PH.refresh;
//   if (serviceData.DR.status) {
//     document.querySelector('input[type=checkbox][name=DR_status]').setAttribute('checked', 'true');
//   }
//   if (serviceData.DR.smallImages) { document.querySelector('.dr-small-images-checkbox').classList.add('checked'); }
//   if (serviceData.DR.gifs) { document.querySelector('.dr-gif-checkbox').classList.add('checked'); }
//   document.querySelector('#DR-width').value = serviceData.DR.panelWidth;
//   document.querySelector('#DR-refresh').value = serviceData.DR.refresh;
//   if (serviceData.RD.status) {
//     document.querySelector('input[type=checkbox][name=RD_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#RD-subreddit').value = serviceData.RD.subreddit;
//   document.querySelector('#RD-sorting').value = serviceData.RD.sorting;
//   document.querySelector('#RD-width').value = serviceData.RD.panelWidth;
//   document.querySelector('#RD-refresh').value = serviceData.RD.refresh;
//   if (serviceData.NG.status) {
//     document.querySelector('input[type=checkbox][name=NG_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#NG-address').value = serviceData.NG.address;
//   document.querySelector('#NG-port').value = serviceData.NG.port;
//   document.querySelector('#NG-width').value = serviceData.NG.panelWidth;
//   document.querySelector('#NGQ-refresh').value = serviceData.NG.queue.refresh;
//   document.querySelector('#NGH-refresh').value = serviceData.NG.history.refresh;
//   document.querySelector('#NGH-length').value = serviceData.NG.history.length;
//   document.querySelector('#NG-username').value = serviceData.NG.username;
//   document.querySelector('#NG-password').value = serviceData.NG.password;
//   if (serviceData.SO.status) {
//     document.querySelector('input[type=checkbox][name=SO_status]').setAttribute('checked', 'true');
//   }
//   document.querySelector('#SO-address').value = serviceData.SO.address;
//   document.querySelector('#SO-port').value = serviceData.SO.port;
//   document.querySelector('#SO-key').value = serviceData.SO.key;
//   document.querySelector('#SO-width').value = serviceData.SO.panelWidth;
//   document.querySelector('#SO-refresh').value = serviceData.SO.refresh;
// }

// function formatUrl(fieldname) {
//   var inputField = document.querySelector('#' + fieldname);
//   if (inputField.value.slice(0,8) == "https://" || inputField.value.slice(0,7) == "http://") {
//     return inputField.value;
//   }
//   else {
//     return "http://" + inputField.value;
//   }
// }
