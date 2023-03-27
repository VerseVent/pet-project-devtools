// eslint-disable-next-line no-undef
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist'
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'offscreen-images': 'off',
        'uses-webp-images': 'off',
        'color-contrast': 'off'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
