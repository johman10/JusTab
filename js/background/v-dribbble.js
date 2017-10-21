import ajax from 'modules/ajax';

export default {
  computed: {
    dribbbleService () {
      return this.services.find(s => s.id === 10);
    }
  },

  data () {
    return {
      dribbblePage: 1
    };
  },

  methods: {
    dribbble (page) {
      this.dribbblePage = page || this.dribbblePage;
      localStorage.setItem('dribbbleError', false);
      return this.dribbbleData()
        .then(this.dribbbleComponents)
        .catch((error) => {
          if (error) console.error(error); // eslint-disable-line no-console
          localStorage.setItem('dribbbleError', true);
        });
    },

    dribbbleData () {
      let url = 'https://api.dribbble.com/v1/';
      let apiCall = `shots?per_page=${this.dribbbleService.perPage * this.dribbblePage}`;
      let apiKey = '&access_token=4236924e13782988c1cee5d251936fe5a985dbe06505a15cd16d0492890d62a4';
      return ajax('GET', url + apiCall + apiKey);
    },

    dribbbleComponents (stories) {
      let components = [];

      stories.forEach((story) => {
        components.push({
          name: 'v-panel-image',
          props: {
            url: story.html_url,
            gif: story.images.normal.match(/\.(gif)$/),
            image: this.dribbbleStoryImage(story),
            title: story.title,
            subTitle: `${story.likes_count} likes - ${story.buckets_count} buckets`,
            smallImages: this.dribbbleService.smallImages,
            panelWidth: this.dribbbleService.panelWidth
          }
        });
      });

      localStorage.setItem('dribbbleComponents', JSON.stringify(components));
    },

    dribbbleStoryImage (story) {
      if (this.dribbbleService.gifs && story.images.normal.match(/\.(gif)$/) && story.images.hidpi) {
        return story.images.hidpi;
      } else if (this.dribbbleService.smallImages) {
        return story.images.teaser;
      } else {
        return story.images.normal;
      }
    }
  }
};
