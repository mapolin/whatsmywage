module.exports = {
  use: [
    'neutrino-preset-react',
    'neutrino-middleware-style-loader',
    'neutrino-middleware-sass',
    (neutrino) => neutrino.config.module
      .rule('style')
      .use('css')
      .options({ modules: true })
  ]
};