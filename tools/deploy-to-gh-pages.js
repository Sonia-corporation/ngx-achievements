const ghPages = require('gh-pages');
const { config } = require('dotenv');

config();

ghPages.publish(
  'gh-pages',
  {
    message: 'chore(release): deploy new GitHub pages version',
    branch: 'gh-pages',
    src: '**/*',
    dest: '.',
    add: false,
    repo: `https://${process.env.GH_TOKEN}@github.com/sonia-corporation/ngx-achievements.git`,
  },
  (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info('Deployment successful');
      console.debug('https://sonia-corporation.github.io/ngx-achievements/en/');
    }
  }
);
