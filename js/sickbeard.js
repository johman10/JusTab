// Docs:
// http://sickbeard.com/api

serviceDataRefreshDone.then(function() {
  if (serviceData.SB.status) {
    document.querySelector('#sickbeard .panel-header .panel-header-foreground .bottom a').attr('href', serviceData.SB.url);
  }
});

document.querySelector("html").addEventListener('click', function(event) {
  if (event.target.classList.contains('sb-search-episode')) {
    searchEpisode($(this));
  }
  if (event.target.classList.contains('sb-mark-episode')) {
    markEpisode($(this));
  }
})

function sbShowData() {
  document.querySelector('#sickbeard .sb-missed').innerHTML = '';
  document.querySelector('#sickbeard .sb-today').innerHTML = '';
  document.querySelector('#sickbeard .sb-soon').innerHTML = '';
  document.querySelector('#sickbeard .sb-later').innerHTML = '';

  var url = serviceData.SB.apiUrl;
  checkError('sickbeard', 'Sickbeard_error');

  if (serviceData.SB.MissedHTML) {
    document.querySelector('.sb-missed').innerHTML = serviceData.SB.MissedHTML;
  }

  if (serviceData.SB.TodayHTML) {
    document.querySelector('.sb-today').innerHTML = serviceData.SB.TodayHTML;
  }

  if (serviceData.SB.SoonHTML) {
    document.querySelector('.sb-soon').innerHTML = serviceData.SB.SoonHTML;
  }

  if (serviceData.SB.LaterHTML) {
    document.querySelector('.sb-later').innerHTML = serviceData.SB.LaterHTML;
  }
}

function searchEpisode(clickedObject) {
  replaceContent(clickedObject, serviceData.spinner).then(function() {
    clickedObject.removeClass('search-icon');
    clickedObject.removeClass('error-icon');
  })

  var url = serviceData.SB.apiUrl;
  var searchApiUrl = url + "/?cmd=episode.search&tvdbid=" + clickedObject.data('tvdbid') + "&season=" + clickedObject.data('season') + "&episode=" + clickedObject.data('episode');

  ajax('GET', searchApiUrl).then(function(data) {
    replaceContent(clickedObject, '').then(function() {
      if (data.result == "failure") {
        clickedObject.classList.add('error-icon');
        clickedObject.setAttribute('title', data.message);
      } else {
        clickedObject.classList.add('done-icon');
      }
    })
  }, function(data) {
    replaceContent(clickedObject, '').then(function() {
      clickedObject.classList.add('error-icon');
      clickedObject.setAttribute('title', 'There was an error');
    })
  })
}

function markEpisode(clickedObject) {
  replaceContent(clickedObject, serviceData.spinner).then(function() {
    clickedObject.removeClass('search-icon');
    clickedObject.removeClass('error-icon');
  })

  var url = serviceData.SB.apiUrl;
  var markApiUrl = url + "/?cmd=episode.setstatus&tvdbid=" + clickedObject.data('tvdbid') + "&season=" + clickedObject.data('season') + "&episode=" + clickedObject.data('episode') + "&status=skipped";

  ajax('GET', markApiUrl).then(function(data) {
    replaceContent(clickedObject, '').then(function() {
      if (data.result == "failure") {
        clickedObject.setAttribute('class', 'icon-button error-icon sb-mark-episode waves-effect');
        clickedObject.setAttribute('title', data.message);
      } else {
        clickedObject.setAttribute('class', 'icon-button done-all-icon sb-mark-episode waves-effect');
      }
    })
  }, function(data) {
    replaceContent(clickedObject, '').then(function() {
      clickedObject.classList.add('error-icon');
      clickedObject.setAttribute('title', 'There was an error');
    })
  })
}
