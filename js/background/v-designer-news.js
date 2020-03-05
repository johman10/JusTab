// Docs:
// http://developers.news.layervault.com/
import ajax from '~modules/ajax';
import badgeAma from '~img/dn_badges/badge_ama.svg';
import badgeApple from '~img/dn_badges/badge_apple.svg';
import badgeAsk from '~img/dn_badges/badge_ask.svg';
import badgeCss from '~img/dn_badges/badge_css.svg';
import badgeDesign from '~img/dn_badges/badge_design.svg';
import badgeDiscussion from '~img/dn_badges/badge_discussion.svg';
import badgePinned from '~img/dn_badges/badge_pinned.png';
import badgePodcast from '~img/dn_badges/badge_podcast.svg';
import badgeShow from '~img/dn_badges/badge_show.svg';
import badgeSponsored from '~img/dn_badges/badge_sponsored.svg';
import badgeType from '~img/dn_badges/badge_type.svg';
import badgeVideo from '~img/dn_badges/badge_video.svg';
import fallbackImage from '~img/designernews_fallback.svg';

const badges = {
  ama: badgeAma,
  apple: badgeApple,
  ask: badgeAsk,
  css: badgeCss,
  design: badgeDesign,
  discussion: badgeDiscussion,
  pinned: badgePinned,
  podcast: badgePodcast,
  show: badgeShow,
  sponsored: badgeSponsored,
  type: badgeType,
  video: badgeVideo
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
            error: fallbackImage,
            loading: fallbackImage
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
