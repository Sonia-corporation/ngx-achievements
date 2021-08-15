const FS = require(`fs-extra`);
const _ = require(`lodash`);
const CHALK = require(`../chalk`);
const LOGGER = require(`../logger`);
const CONTEXT = `set-assets-urls`;
const LOCALES = ['en', 'fr'];
const ASSETS = ['favicon.ico'];
const FILES = ['index.html'];
const DEPLOY_URL_PREFIX = 'https://sonia-corporation.github.io/ngx-achievements/';

async function setAssetsUrls() {
  for (const locale of LOCALES) {
    LOGGER.log(CONTEXT, CHALK.text(`Handling ${CHALK.value(locale)}...`));

    const folderPath = `gh-pages/${locale}`;
    LOGGER.debug(CONTEXT, CHALK.text(`Reading ${CHALK.value(folderPath)}...`));
    const dir = await FS.readdir(folderPath);
    LOGGER.debug(CONTEXT, CHALK.text(`${CHALK.value(folderPath)} read`));

    for (const file of dir.filter((file) => file.includes(FILES))) {
      const filePath = `gh-pages/${locale}/${file}`;
      LOGGER.debug(CONTEXT, CHALK.text(`Reading ${CHALK.value(filePath)}...`));
      let updatedContent = await FS.readFile(filePath, {
        encoding: 'utf8',
      });
      LOGGER.debug(CONTEXT, CHALK.text(`${CHALK.value(filePath)} read`));

      LOGGER.debug(CONTEXT, CHALK.text(`Replacing assets for ${CHALK.value(filePath)}...`));

      for (const asset of ASSETS) {
        updatedContent = _.replace(updatedContent, new RegExp(asset, 'gm'), `${DEPLOY_URL_PREFIX}${locale}/${asset}`);
        LOGGER.debug(CONTEXT, CHALK.text(`Asset ${CHALK.value(asset)} replaced`));
      }

      await FS.writeFile(filePath, updatedContent);
      LOGGER.debug(CONTEXT, CHALK.text(`Assets replaced for ${CHALK.value(filePath)}`));
    }

    LOGGER.success(CONTEXT, CHALK.success(`${CHALK.value(locale)} handled`));
  }
}

return setAssetsUrls();
