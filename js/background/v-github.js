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
          if (error) console.error(error);
          localStorage.setItem('githubError', true);
        });
    },

    githubRequest () {
      var url = 'https://github.com/trending';
      return ajax('GET', url);
    },

    githubBuildJson (html) {
      return new Promise((resolve, reject) => {
        var repos = [];
        var parsedDom = document.createElement('html');
        parsedDom.innerHTML = html;

        var repoListItems = parsedDom.querySelectorAll('.repo-list li');
        for (var i = 0; i < repoListItems.length; i++) {
          let repoListItem = repoListItems[i];
          let languageElement = repoListItem.querySelector('[itemprop="programmingLanguage"]');
          let language = languageElement ? languageElement.innerText.trim() : null;
          let stars = repoListItem.querySelector('[aria-label="Stargazers"]').innerText.trim();
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
        }

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

      localStorage.setItem('githubComponents', JSON.stringify(components));
    }
  }
};



function ghHTML() {
  if (serviceData.GH.JSON) {
    var dataEl = document.createElement('html');
    dataEl.innerHTML = serviceData.GH.JSON
    var repoListItems = dataEl.querySelectorAll('.repo-list-item')
    var GithubHTML = '';

    for(var repoListItem of repoListItems) {
      var titleEl = repoListItem.querySelector('.repo-list-name a');
      var linkEl = repoListItem.querySelector('.repo-list-name a');
      var descriptionEl = repoListItem.querySelector('.repo-list-description');
      var title = '';
      var link = '';
      var description = '';

      if (titleEl) {
        title = titleEl.text;
      }
      if (linkEl) {
        link = 'https://www.github.com' + linkEl.getAttribute('href');
      }
      if (descriptionEl) {
        description = descriptionEl.innerHTML
      }

      if (description === '') {
        description = "No description for this repository.";
      }

      GithubHTML +=
        '<div class="core-item waves-effect">' +
          '<a href="' + link + '" class="service-link" target="_blank">' +
            '<div class="gh-title">' +
              htmlEncode(title) +
            '</div>' +
            '<div class="gh-description">' +
              htmlEncode(description) +
            '</div>' +
          '</a>' +
        '</div>';
    };

    localStorage.setItem('GithubHTML', GithubHTML);
    serviceData.GH.HTML = GithubHTML;
  }
}
