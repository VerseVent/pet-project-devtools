// eslint-disable-next-line no-undef
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5173'],
      staticDistDir: './dist'
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'offscreen-images': 'off',
        'uses-webp-images': 'off',
        'color-contrast': 'off',
        'categories:pwa': 'off'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
