module.exports = {
    entry: {
      article: './scripts/templates/article.js',
      blog: './scripts/templates/blog.js',
      cart: './scripts/templates/cart.js',
      collection: './scripts/templates/collection.js',
      gift_card: './scripts/templates/gift_card.js',
      index: './scripts/templates/index.js',
      [`list-collections`]: './scripts/templates/list-collections.js',
      ['page.contact']: './scripts/templates/page.contact.js',
      product: './scripts/templates/product.js',
      page: './scripts/templates/page.js',
      search: './scripts/templates/search.js'
    },
    output: {
      filename: '[name]-compiled.js',
      path: __dirname + '/assets'
    }
  };
