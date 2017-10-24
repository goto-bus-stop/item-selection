const base = {
  presets: [
    ['es2015', {
      modules: false,
      loose: true
    }]
  ]
}

module.exports = (api) => {
  api.cache.never()

  let config = Object.assign({}, base)

  if (process.env.NODE_ENV === 'example') {
    config.plugins = [
      ['transform-react-jsx', { pragma: 'element' }],
      ['transform-es2015-modules-commonjs']
    ]
  }

  return config
}
