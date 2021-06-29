const path = require('path')
module.exports = {
    i18n: {
      locales: ['en', 'cn'],
      defaultLocale: 'en'
    },
    trailingSlash: true,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  }