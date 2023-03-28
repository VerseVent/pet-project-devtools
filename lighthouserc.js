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
        'color-contrast': 'off',
        'categories:performance': ['error', {minScore: 0.9, aggregationMethod: 'median-run'}],
        'categories:accessibility': ['error', {minScore: 1, aggregationMethod: 'pessimistic'}],
        'categories:best-practices': ['error', {minScore: 1, aggregationMethod: 'pessimistic'}],
        'categories:seo': ['error', {minScore: 1, aggregationMethod: 'pessimistic'}]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
