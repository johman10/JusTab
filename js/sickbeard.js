// Docs:
// http://sickbeard.com/api

chrome.storage.sync.get({
  SB_status: '',
  SB_address: '',
  SB_port: '',
  SB_key: ''
}, function(items) {
  $(document).ready(function() {
    if (items.SB_status === true) {
      sbShowData();

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

      $('#sickbeard core-toolbar a').attr('href', items.SB_address + ':' + items.SB_port);

      $('#sickbeard').show();
      $('body').width($('body').width() + $('#sickbeard').width());
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

  $("body").on('click', ".sb_search_episode", function(event) {
    searchEpisode($(this));
  });
});

function sbShowData() {
  chrome.storage.sync.get({
    SB_status: '',
    SB_address: '',
    SB_port: '',
    SB_key: ''
  }, function(items) {
    $('#sickbeard .sb_missed').empty();
    $('#sickbeard .sb_today').empty();
    $('#sickbeard .sb_soon').empty();
    $('#sickbeard .sb_later').empty();

    var url = items.SB_address + ":" + items.SB_port  + "/api/" + items.SB_key;
    var error = localStorage.getItem("Sickbeard_error");

    if (error == "true") {
      $('#sickbeard .error').slideDown('slow');
    }
    if (error == "false") {
      $('#sickbeard .error').slideUp('slow');
    }

    if (localStorage.SickbeardMissedHTML) {
      $('.sb_missed').append(localStorage.getItem('SickbeardMissedHTML'));
    }

    if (localStorage.SickbeardTodayHTML) {
      $('.sb_today').append(localStorage.getItem('SickbeardTodayHTML'));
    }

    if (localStorage.SickbeardSoonHTML) {
      $('.sb_soon').append(localStorage.getItem('SickbeardSoonHTML'));
    }

    if (localStorage.SickbeardLaterHTML) {
      $('.sb_later').append(localStorage.getItem('SickbeardLaterHTML'));
    }

    $('.sb_poster').unveil();
  });
}

function searchEpisode(clickedObject) {
  chrome.storage.sync.get({
    SB_status: '',
    SB_address: '',
    SB_port: '',
    SB_key: ''
  }, function(items) {
    clickedObject.fadeOut(400, function() {
      clickedObject.next('paper-spinner').attr('active', true);
    });

    var url = items.SB_address + ":" + items.SB_port  + "/api/" + items.SB_key;
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
  });
}