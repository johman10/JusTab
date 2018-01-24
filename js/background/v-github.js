import ajax from 'modules/ajax';

export default {
  computed: {
    githubService () {
      return this.services.find(s => s.id === 8);
    }
  },

  methods: {
    github () {
      localStorage.setItem('githubError', false);
      return this.githubRequest()
        .then(this.githubBuildJson)
        .then(this.githubComponents)
        .catch((error) => {
          if (error) console.error(error); // eslint-disable-line no-console
          localStorage.setItem('githubError', true);
        });
    },

    githubRequest () {
      var url = 'https://github.com/trending';
      return ajax('GET', url);
    },

    githubBuildJson (html) {
      return new Promise((resolve) => {
        var repos = [];
        var parsedDom = document.createElement('html');
        parsedDom.innerHTML = html;

        var repoListItems = parsedDom.querySelectorAll('.repo-list li');
        repoListItems.forEach((repoListItem) => {
          let languageElement = repoListItem.querySelector('[itemprop="programmingLanguage"]');
          let language = languageElement ? languageElement.innerText.trim() : null;
          let stars = repoListItem.querySelector('[href$="/stargazers"]').innerText.trim();
          let urlPath = repoListItem.querySelector('a').getAttribute('href');
          let title = urlPath.split('/')[urlPath.split('/').length - 1];
          let owner = urlPath.split('/')[1];
          let description = repoListItem.querySelector('.text-gray').innerText.trim();
          let url = 'https://github.com' + urlPath;

          repos.push({
            language,
            stars,
            title,
            owner,
            description,
            url
          });
        });

        resolve(repos);
      });
    },

    githubComponents (json) {
      let components = [];

      json.forEach((repo) => {
        let extraTitle = '';
        if (repo.language) {
          extraTitle += `${repo.language} - `;
        }
        extraTitle += `${repo.stars} Stars`;

        components.push({
          name: 'v-panel-item',
          props: {
            url: repo.url,
            title: `${repo.owner}/${repo.title}`,
            extraTitle,
            subtitle: repo.description
          }
        });
      });

      if (components.length === 0) {
        components.push({
          name: 'v-panel-item',
          props: {
            title: 'There are no repositories to show at the moment.'
          }
        });
      }

      localStorage.setItem('githubComponents', JSON.stringify(components));
    }
  }
};
