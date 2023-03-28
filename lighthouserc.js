// eslint-disable-next-line no-undef
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5173'],
      staticDistDir: './dist',
      settings: {
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
      }
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
