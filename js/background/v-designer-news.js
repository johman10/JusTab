// Docs:
// http://developers.news.layervault.com/
import ajax from 'modules/ajax';

export default {
  methods: {
    designerNews () {
      return this.getStories()
        .then(this.designerNewsComponents)
        .catch((error) => {
          if (error) console.error(error);
          localStorage.setItem('designerNewsError', true);
        });
    },

    getStories () {
      return new Promise((resolve, reject) => {
        var url = 'https://www.designernews.co/api/v2/';
        var apiCall = 'stories';
        var apiKey = '?client_id=e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a';

        ajax('GET', url + apiCall + apiKey)
          .then(function(data) {
            localStorage.setItem('designerNewsError', false);
            resolve(data);
          })
          .catch(reject);
      });
    },

    designerNewsComponents (data) {
      let components = [];
      data.stories.forEach((story) => {
        let url = story.url || 'https://www.designernews.co/stories/' + story.id;
        let subUrl = `https://www.designernews.co/stories/${story.id}`;
        let badge = story.badge ? require(`img/dn_badges/badge_${story.badge}.png`) : false;

        components.push({
          name: 'v-panel-item',
          props: {
            image: badge,
            title: story.title,
            url: url,
            subtitle: story.comment_count + ' comments - ' + story.vote_count + ' points',
            subtitleUrl: subUrl
          }
        });
      });

      localStorage.setItem('designerNewsComponents', JSON.stringify(components));
    }
  }
};

// function getDesignerNewsData(callback) {
//   // Get stories from DesignerNews
//   var url = 'https://www.designernews.co/api/v2/';
//   var apiCall = "stories";
//   var apiKey = "?client_id=e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a";

//   ajax('GET', url + apiCall + apiKey).then(function(data) {
//     localStorage.setItem("Designernews_error", false);
//     serviceData.DN.error = false;
//     localStorage.setItem("Designernews", JSON.stringify(data));
//     serviceData.DN.JSON = data;
//     dnHTML();

//     if (callback) {
//       callback();
//     }
//   }, function() {
//     localStorage.setItem("Designernews_error", true);
//     serviceData.DN.error = true;

//     if (callback) {
//       callback();
//     }
//   })
// }

// function dnHTML() {
//   if (serviceData.DN.JSON) {
//     var data = serviceData.DN.JSON;
//     var dnLinks = '';

//     data.stories.forEach(function(story) {
//       if (!story.url) {
//         story.url = 'https://www.designernews.co/stories/' + story.id;
//       }

//       if (story.badge) {
//         dnLinks +=
//           '<div class="core-item waves-effect dn-link-container dn-link-with-badge">' +
//             '<img src="/img/dn_badges/badge_' + story.badge + '.png" class="dn-badge">';
//       }
//       else {
//         dnLinks += '<div class="core-item waves-effect dn-link-container">';
//       }

//       dnLinks +=
//           '<a href="' + story.url + '" class="dn-story-url service-link" target="_blank">' +
//             htmlEncode(story.title) +
//           '</a>' +
//           '<a href="https://www.designernews.co/stories/' + story.id + '" class="dn-comments-url" target="_blank">' +
//             htmlEncode(story.comment_count + ' comments - ' + story.vote_count + ' points') +
//           '</a>' +
//         '</div>';
//     });

//     localStorage.setItem('DesignernewsHTML', dnLinks);
//     serviceData.DN.HTML = dnLinks;
//   }
// }
