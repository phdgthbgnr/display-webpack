module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        corejs: '3.9.1',
        useBuiltIns: 'entry',
        modules: false,
        targets: {
          edge: '17',
          firefox: '60',
          chrome: '67',
          safari: '11.1',
          ie: '11',
        },
      },
    ],
  ];
  const plugins = [
    ['@babel/plugin-transform-runtime'],
    // ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    // ['@babel/plugin-proposal-class-properties', { loose: true }],
    // ['@babel/plugin-transform-arrow-functions', { spec: true }],
  ];
  return {
    presets,
    plugins,
  };
};
