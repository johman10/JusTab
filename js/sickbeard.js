// Docs:
// http://sickbeard.com/api

$(document).ready(function() {
  if (serviceData.SB.status) {
    window[serviceData.SB.feFunctionName]();

    $('#sickbeard .refresh_sb').click(function(event) {
      if ($('#sickbeard .error:visible')) {
        $('#sickbeard .error:visible').slideUp(400);
      }
      $('#sickbeard .refresh_sb').fadeOut(400, function() {
        $('.loading_sb').attr('active', true);
        chrome.runtime.getBackgroundPage(function(backgroundPage) {
          backgroundPage.getSickBeardData(function() {
            $('.loading_sb').attr('active', false);
            setTimeout(function() {
              $('#sickbeard .refresh_sb').fadeIn(400);
            }, 400);
          });
        });
      });
    });

    $('#sickbeard core-toolbar a').attr('href', serviceData.SB.url);

    $('#sickbeard, .sickbeard_info').show();
    $('body').width($('body').width() + $('#sickbeard').width());
    $('.bottom_bar_container').width($('.panel_container').width());
  }
});

$("html").on('click', ".sb_item", function(event) {
  var collapseItem = $(this).next('.sb_collapse');
  var collapseIcon = $(this).find('.sb_collapse_icon');
  if (collapseItem.attr('opened') == 'false') {
    $('.sb_collapse').attr('opened', false);
    $('.sb_item').css('background-color', '#fafafa');
    $('.sb_collapse_icon_container').css('background-color', '#fafafa');
    $('.sb_collapse_icon[icon=expand-less]').fadeOut(165, function() {
      $(this).attr('icon', 'expand-more');
      $(this).fadeIn(165);
    });
    $(this).css('background-color', '#eee');
    collapseIcon.parent().css('background-color', '#eee');
    collapseItem.attr('opened', true);
    collapseIcon.fadeOut(165, function() {
      collapseIcon.attr('icon', 'expand-less');
      collapseIcon.fadeIn(165);
    });
  }
  else {
    $(this).css('background-color', '#fafafa');
    collapseIcon.parent().css('background-color', '#fafafa');
    collapseItem.attr('opened', false);
    collapseIcon.fadeOut(165, function() {
      collapseIcon.attr('icon', 'expand-more');
      collapseIcon.fadeIn(165);
    });
  }
});

$("html").on('click', ".sb_search_episode", function(event) {
  searchEpisode($(this));
});

$("html").on('click', ".sb_mark_episode", function(event) {
  markEpisode($(this));
});

function sbShowData() {
  $('#sickbeard .sb_missed').empty();
  $('#sickbeard .sb_today').empty();
  $('#sickbeard .sb_soon').empty();
  $('#sickbeard .sb_later').empty();

  var url = serviceData.SB.apiUrl;
  var error = serviceData.SB.error;

  if (error == "true") {
    $('#sickbeard .error').slideDown('slow');
  }
  if (error == "false") {
    $('#sickbeard .error').slideUp('slow');
  }

  if (serviceData.SB.MissedHTML) {
    $('.sb_missed').append(serviceData.SB.MissedHTML);
  }

  if (serviceData.SB.TodayHTML) {
    $('.sb_today').append(serviceData.SB.TodayHTML);
  }

  if (serviceData.SB.SoonHTML) {
    $('.sb_soon').append(serviceData.SB.SoonHTML);
  }

  if (serviceData.SB.LaterHTML) {
    $('.sb_later').append(serviceData.SB.LaterHTML);
  }

  $('.sb_poster').unveil();
}

function searchEpisode(clickedObject) {
  clickedObject.fadeOut(400, function() {
    clickedObject.next('paper-spinner').attr('active', true);
  });

  var url = serviceData.SB.apiUrl;
  var searchApiUrl = url + "/?cmd=episode.search&tvdbid=" + clickedObject.data('tvdbid') + "&season=" + clickedObject.data('season') + "&episode=" + clickedObject.data('episode');

  $.ajax({
    url: searchApiUrl,
    success: function(data) {
      if (data.result == "failure") {
        clickedObject.attr('icon', 'error');
        clickedObject.attr('title', data.message);
      } else {
        clickedObject.attr('icon', 'done');
      }
      clickedObject.next('paper-spinner').attr('active', false);
      setTimeout(function() {
        clickedObject.show();
      }, 400);
    },
    error: function() {
      console.log("error");
    }
  });
}

function markEpisode(clickedObject) {
  var url = serviceData.SB.apiUrl;
  var markApiUrl = url + "/?cmd=episode.setstatus&tvdbid=" + clickedObject.data('tvdbid') + "&season=" + clickedObject.data('season') + "&episode=" + clickedObject.data('episode') + "&status=skipped";

  $.ajax({
    url: markApiUrl,
    success: function(data) {
      if (data.result == "failure") {
        clickedObject.attr('icon', 'error');
        clickedObject.attr('title', data.message);
      } else {
        clickedObject.attr('icon', 'done-all');
      }
    },
    error: function() {
      console.log("error");
    }
  });
}