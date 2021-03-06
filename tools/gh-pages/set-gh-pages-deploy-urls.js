const FS = require(`fs-extra`);
const _ = require(`lodash`);
const CHALK = require(`../chalk`);
const LOGGER = require(`../logger`);
const CONTEXT = `set-gh-pages-deploy-urls`;
const LOCALES = ['en', 'fr'];
const FILES = ['index.html'];
const DEPLOY_URL_PREFIX = 'https://sonia-corporation.github.io/ngx-achievements/';

async function setGhPagesDeployUrls() {
  for (const locale of LOCALES) {
    LOGGER.log(CONTEXT, CHALK.text(`Handling ${CHALK.value(locale)}...`));

    const folderPath = `gh-pages/${locale}`;
    LOGGER.debug(CONTEXT, CHALK.text(`Reading ${CHALK.value(folderPath)}...`));
    const dir = await FS.readdir(folderPath);
    LOGGER.debug(CONTEXT, CHALK.text(`${CHALK.value(folderPath)} read`));

    for (const file of dir.filter((file) => FILES.includes(file))) {
      const filePath = `gh-pages/${locale}/${file}`;
      LOGGER.debug(CONTEXT, CHALK.text(`Reading ${CHALK.value(filePath)}...`));
      const content = await FS.readFile(filePath, {
        encoding: 'utf8',
      });
      LOGGER.debug(CONTEXT, CHALK.text(`${CHALK.value(filePath)} read`));

      LOGGER.debug(CONTEXT, CHALK.text(`Replacing deploy URLs for ${CHALK.value(filePath)}...`));
      const updatedContent = _.replace(content, /deploy-url-to-replace\//gm, `${DEPLOY_URL_PREFIX}${locale}/`);
      await FS.writeFile(filePath, updatedContent);
      LOGGER.debug(CONTEXT, CHALK.text(`Deploy URLs replaced for ${CHALK.value(filePath)}`));
    }

    LOGGER.success(CONTEXT, CHALK.success(`${CHALK.value(locale)} handled`));
  }
}

return setGhPagesDeployUrls();
