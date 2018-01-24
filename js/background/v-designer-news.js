// Docs:
// http://developers.news.layervault.com/
import ajax from 'modules/ajax';
const badges = {
  ama: require('img/dn_badges/badge_ama.svg'),
  apple: require('img/dn_badges/badge_apple.svg'),
  ask: require('img/dn_badges/badge_ask.svg'),
  css: require('img/dn_badges/badge_css.svg'),
  design: require('img/dn_badges/badge_design.svg'),
  discussion: require('img/dn_badges/badge_discussion.svg'),
  pinned: require('img/dn_badges/badge_pinned.png'),
  podcast: require('img/dn_badges/badge_podcast.svg'),
  show: require('img/dn_badges/badge_show.svg'),
  sponsored: require('img/dn_badges/badge_sponsored.svg'),
  type: require('img/dn_badges/badge_type.svg'),
  video: require('img/dn_badges/badge_video.svg')
};

export default {
  computed: {
    designerNewsService () {
      return this.services.find(s => s.id === 6);
    }
  },
  methods: {
    designerNews () {
      localStorage.setItem('designerNewsError', false);
      return this.getStories()
        .then(this.designerNewsComponents)
        .catch((error) => {
          if (error) console.error(error); // eslint-disable-line no-console
          localStorage.setItem('designerNewsError', true);
        });
    },

    getStories () {
      var url = 'https://www.designernews.co/api/v2/';
      var apiCall = 'stories';
      var apiKey = '?client_id=e7c9f9422feb744c661cc25a248d3b7206962f0605e174ae30aab12a05fb107a';

      return ajax('GET', url + apiCall + apiKey);
    },

    designerNewsComponents (data) {
      let components = [];
      data.stories.forEach((story) => {
        let url = story.url || 'https://www.designernews.co/stories/' + story.id;
        let subUrl = `https://www.designernews.co/stories/${story.id}`;
        let badge;
        if (story.badge) {
          badge = {
            src: badges[story.badge],
            error: require('img/designernews_fallback.svg'),
            loading: require('img/designernews_fallback.svg')
          };
        }

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
