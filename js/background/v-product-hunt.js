import ajax from 'modules/ajax';

export default {
  computed: {
    productHuntService() {
      return this.services.find(s => s.id === 9);
    },
  },

  methods: {
    productHunt() {
      localStorage.setItem('productHuntError', false);
      return this.productHuntToken()
        .then(this.productHuntPosts)
        .then(this.productHuntComponents)
        .catch(error => {
          if (error) console.error(error); // eslint-disable-line no-console
          localStorage.setItem('productHuntError', true);
        });
    },

    productHuntToken() {
      var url = 'https://api.producthunt.com/v2/oauth/token';
      return ajax(
        'POST',
        url,
        {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        '{"client_id" : "H01WZsxiAGjufYmbUdaBj_w1kD86cF-RtcqOeoG054Y", "client_secret" : "BcTB2jqoCFm9DvX0-g2lEcH4o5bvVgfT-CKEa-Nvd64", "grant_type" : "client_credentials"}',
      );
    },

    productHuntPosts(tokenData) {
      return ajax(
        'POST',
        'https://api.producthunt.com/v2/api/graphql',
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + tokenData.access_token,
        },
        '{ "query": "{posts(first:25){edges{node{url,name,website,commentsCount,votesCount}}}}" }',
      ).then(({ data }) => {
        return data.posts.edges.map(edge => edge.node);
      });
    },

    productHuntComponents(posts) {
      let components = [];
      if (posts.length) {
        posts.forEach(post => {
          components.push({
            name: 'v-panel-item',
            props: {
              url: post.website,
              title: post.name,
              subtitleUrl: post.url,
              subtitle: `${post.commentsCount} comments - ${post.votesCount} points`,
            },
          });
        });
      } else {
        components.push({
          name: 'v-panel-item',
          props: {
            title: 'There are no posts at the moment.',
          },
        });
      }

      localStorage.setItem('productHuntComponents', JSON.stringify(components));
    },
  },
};
