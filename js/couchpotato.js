// Docs:
// http://nas.pxdesign.nl:5050/docs

// "media.list" lists all movies, "data.movies[i].status" returns the status of the movie
$(document).ready(function() {
  chrome.storage.sync.get({
    CP_status: '',
    CP_address: '',
    CP_port: ''
  }, function(items) {
    if (items.CP_status === true) {
      cpShowData();

      $('.refresh_cp').click(function() {
        if ($('#couchpotato .error:visible')) {
          $('#couchpotato .error:visible').slideUp(400);
        }
        $('.refresh_cp').fadeOut(400, function() {
          $('.loading_cp').attr('active', true);
          chrome.runtime.getBackgroundPage(function(backgroundPage) {
            backgroundPage.getCouchPotatoData(function() {
              $.when(cpShowData()).done(function() {
                $('.loading_cp').attr('active', false);
                setTimeout(function() {
                  $('.refresh_cp').fadeIn(400);
                }, 400);
              });
            });
          });
        });
      });

      $('#couchpotato core-toolbar a').attr('href', items.CP_address);

      // cpButtonContainerPosition();

      // $('#couchpotato').scroll(function(event) {
      //   cpButtonContainerPosition();
      // });

      // $(window).resize(function(event) {
      //   cpButtonContainerPosition();
      // });

      $('#couchpotato').show();
      $('body').width($('body').width() + $('#couchpotato').width());

      $('.cp_item').click(function(event) {
        var collapseItem = $(this).next('.cp_collapse');
        var collapseIcon = $(this).find('.cp_collapse_icon');
        if (collapseItem.attr('opened') == 'false') {
          collapseItem.attr('opened', true);
          collapseIcon.fadeOut(165, function() {
            collapseIcon.attr('icon', 'expand-less');
            collapseIcon.fadeIn(165);
          });
        }
        else {
          collapseItem.attr('opened', false);
          collapseIcon.fadeOut(165, function() {
            collapseIcon.attr('icon', 'expand-more');
            collapseIcon.fadeIn(165);
          });
        }
      });
    }
  });

  // $('.cp_add_button').click(function() {
  //   document.querySelector('#cp_form_container').toggle();
  // });

  // $('.cp_form_search').keyup(function(event) {
  //   // http://nas.pxdesign.nl:5050/api/[api_key]/movie.add/?identifier=tt1646971&?title=How%20to%20Train%20Your%20Dragon
  //   chrome.storage.sync.get({
  //     CP_address: '',
  //     CP_port: '',
  //     CP_key: ''
  //   }, function(items) {
  //     var url = '';

  //     if (items.CP_address.slice(0,7) == "http://") {
  //       url = items.CP_address + ":" + items.CP_port + "/";
  //     }
  //     else {
  //       url = "http://" + items.CP_address + ":" + items.CP_port + "/";
  //     }
  //     var apiKey = "api/" + items.CP_key + "/";
  //     var apiCall = "search/?q=";

  //     $.ajax({
  //       url: url + apiKey + apiCall + $('.cp_form_search').val(),
  //       dataType: 'json',
  //       async: true,
  //       success: function(data) {
  //         $('.cp_search_result').show('');
  //         $('.cp_search_result').html('');
  //         var titles = [];
  //         var posters = [];
  //         var imdbId = [];
  //         if (data.movies) {
  //           $.each(data.movies, function(index, movie) {
  //             titles.push(movie.original_title);
  //             if (movie.images.poster.length > 0) {
  //               posters.push(movie.images.poster[0]);
  //             }
  //             else {
  //               posters.push('http://ia.media-imdb.com/images/G/01/imdb/images/nopicture/32x44/film-3119741174._CB379391527_.png');
  //             }
  //             imdbId.push(movie.imdb);
  //           });

  //           $.each(titles, function(i) {
  //             $('.cp_search_result').append(
  //               '<div class="cp_search_movie">' +
  //                 '<div style="background-image:url(' + posters[i] + ');" class="cp_search_poster"></div>' +
  //                 '<span class="cp_search_title">' + titles[i] + '</span>' +
  //               '</div>'
  //             );
  //           });
  //         }
  //         else {
  //           $('.cp_search_result').append('No results for search');
  //         }
  //       },
  //       error: function() {
  //         console.log(url + apiKey + apiCall + $('.cp_form_search').val());
  //       }
  //     });
  //   });
  // });
});

function cpButtonContainerPosition() {
  $('.cp_button_container').css('top', $('#couchpotato')[0].prevScrollTop + $(window).height() - ($('.cp_button_container').height() + 128));
}

function cpShowData() {
  $('.wanted').empty();
  $('.snatched').empty();

  var error = localStorage.getItem('Couchpotato_error');

  if (error == "true") {
    $('#couchpotato .error').slideDown('slow');
  }
  if (error == "false") {
    $('#couchpotato .error').slideUp('slow');
  }

  if (localStorage.Couchpotato) {
    $('.snatched').append('<h2>Snatched and Available</h2>');
    $('.wanted').append('<h2>Wanted</h2>');

    data = JSON.parse(localStorage.getItem('Couchpotato'));

    // console.log(data);
    var snatched = [];
    $.each(data.movies, function(i) {
      $.each(data.movies[i].releases, function(l) {
        if (data.movies[i].releases[l].status === "snatched" || data.movies[i].releases[l].status === "downloaded" || data.movies[i].releases[l].status === "available") {
          snatched.push(data.movies[i].title);
          if ($('.snatched').html().indexOf(data.movies[i].title) == -1) {
            $('.snatched').append(
              "<core-item label='" + data.movies[i].title + "' class='cp_item'>" +
                "<div class='cp_collapse_icon_container'>" +
                  "<core-icon class='cp_collapse_icon' icon='expand-more'></core-icon>" +
                "</div>" +
              "</core-item>" +
              "<core-collapse opened=false class='cp_collapse'>" +
                "<core-item>" +
                  "<a class='cp_imdb_link' href='http://www.imdb.com/title/" + data.movies[i].identifiers.imdb + "' target='_blank'>" +
                    "<paper-icon-button class='cp_imdb_link_icon' icon='info-outline'></core-icon-button>" +
                  "</a>" +
                "</core-item>" +
              "</core-collapse"
            );
          }
        }
      });

      if (data.movies[i].status === "active") {
        $('.wanted').append(
          "<core-item label='" + data.movies[i].title + "' class='cp_item'>" +
            "<div class='cp_collapse_icon_container'>" +
              "<core-icon class='cp_collapse_icon' icon='expand-more'></core-icon>" +
            "</div>" +
          "</core-item>" +
          "<core-collapse opened=false class='cp_collapse'>" +
            "<core-item>" +
              "<a class='cp_imdb_link' href='http://www.imdb.com/title/" + data.movies[i].identifiers.imdb + "' target='_blank'>" +
                "<paper-icon-button class='cp_imdb_link_icon' icon='info-outline'></core-icon-button>" +
              "</a>" +
            "</core-item>" +
          "</core-collapse"
        );
      }
    });

    if (snatched.length <= 0) {
      $('.snatched').append("<core-item label='No snatched movies at this moment.'></core-item>");
    }
  }
}
