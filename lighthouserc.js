// eslint-disable-next-line no-undef
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5173'],
      startServerCommand: 'npm run dev'
    },
    // collect: {
    //   staticDistDir: './dist'
    // },
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
