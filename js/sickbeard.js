// Docs:
// http://sickbeard.com/api

$(document).ready(function() {
  chrome.storage.sync.get({
    SB_status: '',
    SB_address: '',
    SB_port: ''
  }, function(items) {
    if (items.SB_status === true) {
      sbShowData(items.SB_key, items.SB_address, items.SB_port);

      $('#sickbeard .refresh_sb').click(function(event) {
        if ($('#sickbeard .error:visible')) {
          $('#sickbeard .error:visible').slideUp(400);
        }
        $('#sickbeard .refresh_sb').fadeOut(400, function() {
          $('.loading_sb').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getSickBeardData(function() {
              $.when(sbShowData(items.SB_key, items.SB_address, items.SB_port)).done(function() {
                $('.loading_sb').attr('active', false);
                setTimeout(function() {
                  $('#sickbeard .refresh_sb').fadeIn(400);
                }, 400);
              });
            });
          });
        });
      });

      $('#sickbeard core-toolbar a').attr('href', items.SB_address + ':' + items.SB_port);

      $('#sickbeard').show();
      $('body').width($('body').width() + $('#sickbeard').width());
    }
  });
});

$("#sickbeard").on('click', ".sb_item", function(event) {
  var collapseItem = $(this).next('#sickbeard .sb_collapse');
  var collapseIcon = $(this).find('#sickbeard .sb_collapse_icon');
  if (collapseItem.attr('opened') == 'false') {
    $('#sickbeard .sb_collapse').attr('opened', false);
    $('#sickbeard .sb_item').css('background-color', '#fafafa');
    $('#sickbeard .sb_collapse_icon_container').css('background-color', '#fafafa');
    $('#sickbeard .sb_collapse_icon[icon=expand-less]').fadeOut(165, function() {
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

$("#sickbeard").on('click', ".sb_search_episode", function(event) {
  searchEpisode($(this));
});

function sbShowData(SB_key, SB_address, SB_port) {
  $('#sickbeard .sb_missed').empty();
  $('#sickbeard .sb_today').empty();
  $('#sickbeard .sb_soon').empty();
  $('#sickbeard .sb_later').empty();

  var url = SB_address + ":" + SB_port  + "/api/" + SB_key;
  var error = localStorage.getItem("Sickbeard_error");

  if (error == "true") {
    $('#sickbeard .error').slideDown('slow');
  }
  if (error == "false") {
    $('#sickbeard .error').slideUp('slow');
  }

  if (localStorage.Sickbeard) {
    data = JSON.parse(localStorage.getItem('Sickbeard'));

    // Episodes missed
    if (data.data.missed.length > 0) {
      $('#sickbeard .sb_missed').append('<h2>Missed</h2>');
      listSeries(data, data.data.missed, ".sb_missed");
    }

    // Episodes today
    if (data.data.today.length > 0) {
      $('#sickbeard .sb_today').append('<h2>Today</h2>');
      listSeries(data, data.data.today, ".sb_today");
    }

    // Episodes soon
    if (data.data.soon.length > 0) {
      $('#sickbeard .sb_soon').append('<h2>Soon</h2>');
      listSeries(data, data.data.soon, ".sb_soon");
    }

    // Episodes later
    if (data.data.later.length > 0) {
      $('#sickbeard .sb_later').append('<h2>Later</h2>');
      listSeries(data, data.data.later, ".sb_later");
    }
  }
}

function listSeries(data, query, parent) {
  chrome.storage.sync.get({
    SB_key: '',
    SB_address: '',
    SB_port: ''
  }, function(items) {
    // chrome.storage.local.clear();
    chrome.storage.local.get(function(images) {
      var SB_images;

      if (images.SB_images) {
        SB_images = JSON.parse(images.SB_images);
      }
      else {
        SB_images = [];
      }

      $.each(query, function(i, episodeData) {
        var tvdbid = episodeData.tvdbid,
            season = episodeData.season,
            episode = episodeData.episode,
            airdate = episodeData.airdate,
            showname = episodeData.show_name,
            date;

        posterUrl = items.SB_address + ":" + items.SB_port + "/api/" + items.SB_key + "/?cmd=show.getposter&tvdbid=" + tvdbid;

        // Need to start storing in chrome.storage.local - rest is working: https://developer.chrome.com/apps/storage#property-local
        if(!exists(tvdbid, SB_images)) {
          convertImgToBase64(posterUrl, function(base64Img){
            SB_images.push(
              {id: tvdbid, image: base64Img}
            );

            chrome.storage.local.set({"SB_images": JSON.stringify(SB_images)});
          });
        }

        if (moment(airdate).year() > moment().year()) {
          date = moment(airdate).format("MMM D, YYYY");
        }
        else {
          date = moment(airdate).format("MMM D");
        }
        var episodeString = " S" + (season<10?'0':'') + season + "E" + (episode<10?'0':'') + episode;
        $(parent).append(
          "<core-item label='" + showname + episodeString + "' class='sb_item'>" +
            "<div class='sb_collapse_icon_container'>" +
              "<core-icon class='sb_collapse_icon' icon='expand-more'></core-icon>" +
            "</div>" +
          "</core-item>" +
          "<core-collapse opened=false class='sb_collapse'>" +
            "<core-item>" +
              date +
              "<paper-icon-button class='sb_search_episode " + tvdbid + "' icon='search'>Search</paper-icon-button>" +
              "<paper-spinner class='sb_search_spinner'></paper-spinner>" +
            "</core-item>" +
          "</core-collapse>"
        );

        $.each(SB_images, function(i, image) {
          if (image.id == tvdbid && $(parent + ' .sb_item').last().find('.sb_poster').length === 0) {
            var append_image = "<core-image class='sb_poster' sizing='cover' src='" + image.image + "'></core-image>";
            // var append_image = new Image();
            // append_image.src = image.image;
            // append_image.className = 'sb_poster';
            $(parent + ' .sb_item').last().append(append_image);
          }
        });

        $('.' + tvdbid).data("episode", { tvdbid: tvdbid, season: season, episode: episode });
      });
   });
  });
}

function searchEpisode(clickedObject) {
  clickedObject.fadeOut(400, function() {
    clickedObject.next('paper-spinner').attr('active', true);
  });
  chrome.storage.sync.get({
    SB_key: '',
    SB_address: '',
    SB_port: ''
  }, function(items) {
    var url = items.SB_address + ":" + items.SB_port  + "/api/" + items.SB_key;
    var searchApiUrl = url + "/?cmd=episode.search&tvdbid=" + clickedObject.data("episode").tvdbid + "&season=" + clickedObject.data("episode").season + "&episode=" + clickedObject.data("episode").episode;

    $.ajax({
      url: searchApiUrl,
      success: function(data) {
        if (data.result == "failure") {
          clickedObject.attr('icon', 'error');
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

function convertImgToBase64(url, callback, outputFormat){
  var canvas = document.createElement('CANVAS');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function(){
    canvas.height = img.height;
    canvas.width = img.width;
      ctx.drawImage(img,0,0);
      var dataURL = canvas.toDataURL('image/jpeg');
      callback.call(this, dataURL);
        // Clean up
      canvas = null;
  };
  img.src = url;
}

function exists(obj, objs) {
  var objStr = JSON.stringify(obj);

  for(var i=0;i<objs.length; i++) {
    if(JSON.stringify(objs[i].id) == objStr) {
      return 1;
    }
  }

  return 0;
}